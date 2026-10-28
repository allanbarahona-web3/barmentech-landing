export type ApiConfiguration = {
  nodeEnv: string;
  port: number;
  publicWebOrigins: string[];
  trustProxy: false | "loopback";
};

const DEFAULT_PORT = 3001;

function getPort(value: string | undefined): number {
  if (value === undefined) {
    return DEFAULT_PORT;
  }

  const normalizedValue = value.trim();
  if (!/^\d+$/.test(normalizedValue)) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  const port = Number(normalizedValue);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
}

function parseOrigin(value: string): string {
  if (value.includes("*")) {
    throw new Error("PUBLIC_WEB_ORIGINS must not contain wildcard origins.");
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("PUBLIC_WEB_ORIGINS contains an invalid origin.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("PUBLIC_WEB_ORIGINS origins must use http or https.");
  }

  if (url.username || url.password) {
    throw new Error("PUBLIC_WEB_ORIGINS origins must not contain credentials.");
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      "PUBLIC_WEB_ORIGINS values must be origins without paths, queries, or fragments.",
    );
  }

  return url.origin;
}

export function parsePublicWebOrigins(value: string | undefined): string[] {
  if (value === undefined || value.trim() === "") {
    return [];
  }

  const origins = value.split(",").map((origin) => origin.trim());
  if (origins.some((origin) => origin === "")) {
    throw new Error("PUBLIC_WEB_ORIGINS must not contain empty origins.");
  }

  return [...new Set(origins.map(parseOrigin))];
}

function requiresSecurePublicOrigins(nodeEnv: string): boolean {
  return nodeEnv !== "development" && nodeEnv !== "test";
}

function assertSecurePublicOrigins(origins: string[], nodeEnv: string): void {
  if (!requiresSecurePublicOrigins(nodeEnv)) {
    return;
  }

  for (const origin of origins) {
    const url = new URL(origin);
    if (url.protocol !== "https:") {
      throw new Error(
        "PUBLIC_WEB_ORIGINS must use https outside development and test.",
      );
    }

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      throw new Error(
        "PUBLIC_WEB_ORIGINS must not use a local hostname outside development and test.",
      );
    }
  }
}

function getTrustProxy(value: string | undefined): false | "loopback" {
  if (value === undefined || value.trim() === "") {
    return false;
  }

  if (value.trim() !== "loopback") {
    throw new Error('TRUST_PROXY must be "loopback" when configured.');
  }

  return "loopback";
}

export function getApiConfiguration(
  environment: NodeJS.ProcessEnv = process.env,
): ApiConfiguration {
  const nodeEnv = environment.NODE_ENV?.trim() || "development";
  const publicWebOrigins = parsePublicWebOrigins(environment.PUBLIC_WEB_ORIGINS);

  if (nodeEnv === "production" && publicWebOrigins.length === 0) {
    throw new Error("PUBLIC_WEB_ORIGINS is required in production.");
  }

  assertSecurePublicOrigins(publicWebOrigins, nodeEnv);

  return {
    nodeEnv,
    port: getPort(environment.PORT),
    publicWebOrigins,
    trustProxy: getTrustProxy(environment.TRUST_PROXY),
  };
}
