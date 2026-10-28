import { cp, mkdir, mkdtemp, readdir, readFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = await mkdtemp(join(tmpdir(), "barmentech-formation-build-"));

function run(command, arguments_, options) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, arguments_, options);
    child.once("error", rejectRun);
    child.once("exit", (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`${command} exited with code ${code ?? "unknown"}.`));
    });
  });
}

async function containsSourceMaps(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory() && (await containsSourceMaps(entryPath))) {
      return true;
    }
    if (entry.isFile() && entry.name.endsWith(".map")) {
      return true;
    }
  }

  return false;
}

async function containsForbiddenBuildData(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory() && (await containsForbiddenBuildData(entryPath))) {
      return true;
    }
    if (entry.isFile()) {
      const content = await readFile(entryPath);
      if (
        content.includes("postgresql://") ||
        content.includes("postgres://") ||
        content.includes("DATABASE_URL") ||
        content.includes("MIGRATION_DATABASE_URL")
      ) {
        return true;
      }
    }
  }

  return false;
}

async function copyRequired(source, destination) {
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, {
    recursive: true,
    dereference: false,
    verbatimSymlinks: true,
  });
}

try {
  for (const relativePath of ["package.json", "pnpm-workspace.yaml", "pnpm-lock.yaml"]) {
    await copyRequired(join(repositoryRoot, relativePath), join(temporaryRoot, relativePath));
  }

  for (const relativePath of [
    "app",
    "next.config.ts",
    "next-env.d.ts",
    "package.json",
    "postcss.config.mjs",
    "tsconfig.json",
  ]) {
    await copyRequired(
      join(repositoryRoot, "apps", "formation", relativePath),
      join(temporaryRoot, "apps", "formation", relativePath),
    );
  }

  await copyRequired(
    join(repositoryRoot, "apps", "formation", "public", "images"),
    join(temporaryRoot, "apps", "formation", "public", "images"),
  );

  for (const relativePath of ["package.json", "src", "tsconfig.json"]) {
    await copyRequired(
      join(repositoryRoot, "packages", "ui", relativePath),
      join(temporaryRoot, "packages", "ui", relativePath),
    );
  }

  await symlink(join(repositoryRoot, "node_modules"), join(temporaryRoot, "node_modules"), "dir");
  await copyRequired(
    join(repositoryRoot, "apps", "formation", "node_modules"),
    join(temporaryRoot, "apps", "formation", "node_modules"),
  );
  await copyRequired(
    join(repositoryRoot, "packages", "ui", "node_modules"),
    join(temporaryRoot, "packages", "ui", "node_modules"),
  );
  await rm(join(temporaryRoot, "apps", "formation", "node_modules", "@barmentech", "ui"), {
    force: true,
  });
  await symlink(
    "../../../../packages/ui",
    join(temporaryRoot, "apps", "formation", "node_modules", "@barmentech", "ui"),
    "dir",
  );

  // This is the exact command defined by the existing Formation build script.
  // Invoking the copied workspace binary directly avoids pnpm trying to repair
  // the intentionally temporary node_modules layout.
  await run(
    join(temporaryRoot, "apps", "formation", "node_modules", ".bin", "next"),
    ["build", "--webpack"],
    {
      cwd: join(temporaryRoot, "apps", "formation"),
      env: {
        PATH: process.env.PATH ?? "",
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
        NEXT_PUBLIC_API_BASE_URL: "https://formation-qa.example.invalid/api",
      },
      stdio: "inherit",
    },
  );

  const buildOutput = join(temporaryRoot, "apps", "formation", ".next");
  if (await containsSourceMaps(buildOutput)) {
    throw new Error("The isolated production build emitted source maps.");
  }
  if (await containsForbiddenBuildData(buildOutput)) {
    throw new Error("The isolated production build contains database configuration.");
  }

  console.log("Isolated Formation production build passed.");
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
