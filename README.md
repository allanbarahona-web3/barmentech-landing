# Barmentech web workspace

This pnpm workspace prepares two independent Next.js commercial websites while the legacy static site remains unchanged.

## Requirements

- Node.js `22.22.3` (declared in `.nvmrc`; the root engine range is Node 22)
- pnpm `11.5.2` (declared in the root `packageManager` field)

Node 22 is used because the installed Next.js 16.4.1 declares Node `>=20.9.0`, the Nest toolchain in the lockfile supports Node 22, and `22.22.3` is the runtime used to validate this workspace.

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

## Reproducible build and Prisma generation

Use the following commands after a fresh, lockfile-respecting install:

```bash
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm validate:formation:isolated-build
```

`pnpm prisma:generate` copies only the API Prisma schema to a temporary directory and runs `prisma generate` there with process-scoped, non-production placeholder database variables. It generates the client without applying migrations, inspecting a database, or reading an application `.env` file. Migrations remain a separately controlled deployment operation.

pnpm permits only the required `@prisma/engines` install-time hook. The Prisma CLI preinstall and Prisma Client postinstall are explicitly disabled because the Client hook would implicitly discover a project schema and generate a client. The explicit root generation command is the sole supported client-generation path for local development, CI, QA, and production.

`pnpm validate:formation:isolated-build` creates a temporary workspace containing only Formation and shared-UI build inputs, then invokes the existing Formation production build with non-secret public configuration. It copies no environment files and deletes only that temporary validation workspace after the command finishes. QA and production runtime configuration must instead be supplied from protected server or CI secret storage.

## Durable lead email delivery

Public-lead acceptance commits the lead, a content-bound `Idempotency-Key`, and two PostgreSQL outbox tasks in one transaction. The HTTP API never sends provider email. Run the separate worker from the same API image/SHA with `pnpm --filter @barmentech/api start:lead-email-worker` after an approved additive migration.

Runtime tuning is server-only: `PUBLIC_LEAD_RATE_LIMIT_MAX_ATTEMPTS` (default `12`) and `PUBLIC_LEAD_RATE_LIMIT_WINDOW_SECONDS` (default `900`). Twelve submissions per 15 minutes is a bounded allowance for a small office/NAT while retaining a finite abuse control; it cannot substitute for proxy repair. The worker uses `LEAD_EMAIL_WORKER_POLL_INTERVAL_MS`, `LEAD_EMAIL_WORKER_LEASE_SECONDS`, `LEAD_EMAIL_WORKER_SEND_TIMEOUT_MS`, `LEAD_EMAIL_WORKER_MAX_ATTEMPTS`, and `LEAD_EMAIL_WORKER_SHUTDOWN_TIMEOUT_MS`.

Visitor confirmations are independently limited by `LEAD_VISITOR_CONFIRMATION_MAX_PER_RECIPIENT` (default `3`) in `LEAD_VISITOR_CONFIRMATION_WINDOW_SECONDS` (default `86400`). Sent confirmations and unexpired leased confirmation tasks both count, so concurrent workers reserve the bounded recipient capacity. The lead and internal notification remain durable; a capped visitor task becomes visibly failed with a non-sensitive policy reason for operations, rather than silently dropping the inquiry. This is distinct from a provider failure, which remains retryable until its maximum attempts. The worker uses PostgreSQL leases and retries, plus Resend provider idempotency for 24 hours where available; neither mechanism promises exactly-once delivery. API idempotency keys are retained with their submission record and have no automatic expiry in this release, so a reused key remains content-bound; provider idempotency is only a 24-hour retry guard.

QA activation order: apply the reviewed additive migration with a migration-only credential; deploy compatible API and Formation from one SHA; start the worker with runtime-only credentials; then run a non-email smoke test. Roll back applications without rolling back the additive migration or deleting pending outbox tasks. The Nginx real-IP candidate is limited to the Formation QA vhost and must first verify that local cloudflared supplies `CF-Connecting-IP`; never use global proxy trust or visitor-controlled forwarding headers.

The non-active QA candidates are `ops/qa/compose.lead-worker.candidate.yml` and `ops/qa/deploy-lead-worker.candidate.sh`. The worker publishes no ports and requires an immutable API image reference that includes the approved SHA. Its protected runtime environment must contain only runtime database and email credentials; neither API nor worker receives `MIGRATION_DATABASE_URL`. The deployment candidate refuses to start unless a separately provided `QA_MIGRATION_APPROVED_SHA` equals `DEPLOY_SHA`. Keep the existing automatic push workflow from invoking this candidate: approve and apply the QA migration manually for the exact SHA first, then enable the API/Formation/worker deployment step. Roll back images only; retain additive tables and pending tasks.

## Shared foundation

`packages/ui` exports `Container`, `ActionLink`, `SiteHeader` and `SiteFooter`. `ActionLink` and the responsive header use `lucide-react`; both Next applications transpile this workspace package and each Tailwind v4 stylesheet explicitly scans `packages/ui/src` with `@source`.

Content, metadata, locale messages and future brand configuration remain inside each application. `packages/contracts` and `apps/api` remain available but are not required by either commercial site foundation.

## Visual shell

`packages/ui/src/foundation.css` holds the initial visual tokens for text, muted text, surfaces, borders, brand, focus, spacing, radii and control height. It also establishes the system font stack: `ui-sans-serif`, SF Pro on Apple platforms, and Segoe UI where available. This avoids remote font downloads while retaining a professional native reading experience.

Both commercial apps provide their own locale-specific navigation labels and page content, then pass that configuration to the shared `SiteHeader` and `SiteFooter`. The shell includes a skip link, visible keyboard focus, a keyboard-operable services menu, a responsive disclosure navigation, and a locale selector that retains the current equivalent path. The current pages are expressly development placeholders, not approved commercial copy.

The original Barmentech PNG remains untouched under `assets/images/`. Identical copies are served from each app's `public/images/` folder to preserve its 2:1 aspect ratio without relying on legacy static paths.

No contact address, phone number or email is presented in the new shell. The legacy pages contain historical and potentially inconsistent company/contact and jurisdiction references; those details require an approved content and legal review before they are carried into either commercial site.

## Domain and deployment architecture

Technology will be independently built and deployed from this repository to its own still-undecided production domain.

Formation's approved production origin is `https://formation.barmentech.com`. This records the intended production origin only; it does not indicate that the domain is deployed, connected, or publicly accessible.

The existing static HTML files, `assets/`, and `.github/workflows/deploy.yml` remain the current production path. That workflow does not deploy either Next.js application. A future deployment story must provision an independent runtime or explicitly configure static export for each app before any cutover.

## Formation information architecture (future)

The future Formation site will have independent pages for Home, Business Formation, Bookkeeping, Taxes, Business Services, About, Contact, Privacy and Terms. It may include a “How we work” home-page anchor; internal pages will link to the home page of the active locale plus that anchor. These routes are intentionally not implemented in this foundation.
