# Barmentech web workspace

This pnpm workspace prepares two independent Next.js commercial websites while the legacy static site remains unchanged.

## Requirements

- Node.js `22.22.3` (declared in `.nvmrc`; the root engine range is Node 22)
- pnpm `11.5.2` (declared in the root `packageManager` field)

Node 22 is used because the installed Next.js 16.3.0 declares Node `>=20.9.0`, the Nest toolchain in the lockfile supports Node 22, and `22.22.3` is the runtime used to validate this workspace.

## Applications

| Application | Package | Development URL | Purpose |
| --- | --- | --- | --- |
| Technology | `@barmentech/web` | `http://localhost:3000` | Web development, software, SaaS and automation |
| Formation | `@barmentech/formation` | `http://localhost:3002` | Business formation, bookkeeping, taxes and business services |
| API | `@barmentech/api` | `http://localhost:3001` | Existing API foundation; not expanded by this setup |

Both web applications currently expose `/en` and `/es`. `/` resolves to the preferred browser language when the Next proxy is active, with `/en` as the server-page fallback. Unsupported locale segments are rejected by the locale layout.

```bash
pnpm dev:web
pnpm dev:formation
pnpm type-check:web
pnpm type-check:formation
pnpm build:web
pnpm build:formation
```

Run builds sequentially to limit memory use.

The app build scripts explicitly select Webpack and Next's TypeScript API. This avoids Turbopack's internal-port requirement and the TypeScript CLI child-process issue observed in the constrained validation environment; application type checks remain explicit root commands.

## Shared foundation

`packages/ui` exports only `Container` and `ActionLink`. The latter uses `lucide-react`; both Next applications transpile this workspace package and each Tailwind v4 stylesheet explicitly scans `packages/ui/src` with `@source`.

Content, metadata, locale messages and future brand configuration remain inside each application. `packages/contracts` and `apps/api` remain available but are not required by either commercial site foundation.

## Domain and deployment architecture

Technology and Formation will be independently built and deployed from this repository, each to its own still-undecided production domain. No canonical URL or production domain is configured here.

The existing static HTML files, `assets/`, and `.github/workflows/deploy.yml` remain the current production path. That workflow does not deploy either Next.js application. A future deployment story must provision an independent runtime or explicitly configure static export for each app before any cutover.

## Formation information architecture (future)

The future Formation site will have independent pages for Home, Business Formation, Bookkeeping, Taxes, Business Services, About, Contact, Privacy and Terms. It may include a “How we work” home-page anchor; internal pages will link to the home page of the active locale plus that anchor. These routes are intentionally not implemented in this foundation.
