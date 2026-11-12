# HB-3: Scaffold de la PWA en Next.js

Agent context: [agent-context.md](agent-context.md)

## Source Traceability

- Ticket: [#3](https://github.com/AndresNieto/habitest/issues/3) (HB-3), epic [#1](https://github.com/AndresNieto/habitest/issues/1)
- Knowledge-base pages: None identified
- Knowledge-base parent: Not configured
- Last tracker refresh: 2026-11-12
- Status / priority / assignee: open / P0 / AndresNieto; labels phase-1-setup, chore, area/platform, priority/P0; milestone phase-1-setup
- Local sync: current
- Lifecycle notes: start posted, pickup skipped, handoff deferred, transition deferred; merges into feature/development authorized by AndresNieto 2026-11-12
- Workflow adherence: On workflow

## Summary

Create the technical base of the Habi PWA: Next.js (App Router) + TypeScript strict, Tailwind, lint/format, unit tests, installable PWA with offline fallback, and CI. No product features.

## Acceptance Criteria

- AC1 - Next.js project (App Router, TypeScript strict) in `src/` with pnpm; `pnpm dev` starts the app.
- AC2 - Tailwind CSS configured.
- AC3 - ESLint + Prettier with `lint`, `format`, `format:check` scripts.
- AC4 - Vitest + Testing Library with a smoke test; `test` script.
- AC5 - Installable PWA: web manifest (name, icons, theme color), Serwist service worker, offline fallback page.
- AC6 - `pnpm build` passes; Node version pinned (`.nvmrc` / `engines`).
- AC7 - GitHub Actions CI runs format:check, lint, test and build on PRs to `development`.

## Proposed Solution

`create-next-app` equivalent setup with pnpm on Node 22 LTS, `src/` layout per the profile, Tailwind, ESLint (Next config) + Prettier, Vitest with jsdom and Testing Library. PWA via `@serwist/turbopack` (SW built by a route handler, served at `/serwist/sw.js`, registered only in production; `@serwist/next` was rejected because it is webpack-only), `src/app/manifest.ts`, generated placeholder icons, `/offline` route used as precache fallback. CI in `.github/workflows/ci.yml`.

## Feature Plan

Status legend: not-started | in-progress | in-review | done | deferred. Done means merged.

- [ ] Phase 1 - Runnable, validated base - in-progress
  - Goal: an installable, tested, CI-checked Next.js app shell with no product features
  - Exit criteria: all ACs covered; `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass locally and in CI
  - Checkpoints:
    - [x] 1.1 - Next.js + TS strict + Tailwind + ESLint/Prettier + Node pin + Vitest smoke test - done - d6a2c77 / PR #17 / 2026-11-12 - peer-reviewers: none (agent-merged under user authority)
    - [ ] 1.2 - PWA (manifest, icons, Serwist SW, offline page) + GitHub Actions CI + engine-strict - in-review - 9d127e8 / PR #18 / 2026-11-12 - peer-reviewers: pending

Acceptance criteria coverage:

- [x] AC1 - covered by 1.1 (merged d6a2c77)
- [x] AC2 - covered by 1.1 (merged d6a2c77)
- [x] AC3 - covered by 1.1 (merged d6a2c77)
- [x] AC4 - covered by 1.1 (merged d6a2c77)
- [ ] AC5 - covered by 1.2 (in-review; headless Chrome CDP, 2 profiles)
- [x] AC6 - covered by 1.1 (merged d6a2c77; re-verified in 1.2)
- [ ] AC7 - covered by 1.2 (in-review; confirmed by first CI run on the PR)

Plan history:
- 2026-11-12 - initial plan accepted (2 checkpoints, Node 22 LTS) by AndresNieto
- 2026-11-12 - 1.1 in-review; AC1 AC2 AC3 AC4 AC6 covered; `engine-strict` added to 1.2 scope (test-agent finding)
- 2026-11-12 - 1.1 merged (d6a2c77, squash, agent-merged under user authority); 1.2 in-progress
- 2026-11-12 - 1.2 in-review after 1 bugfix round (D1 offline fallback → setCatchHandler)

## Pull Requests

- Feature PR (draft): #16
- Checkpoint PRs: 1.1 - #17 (merged d6a2c77); 1.2 - #18 (in-review, CI green) (into `feature/HB-3-nextjs-pwa-scaffold`)

## Risks, Assumptions, Open Questions

- Local default Node is 18.20; the project pins 22 via `.nvmrc` (`nvm use`). Developers must switch.
- Resolved in 1.2: `@serwist/turbopack` keeps the Turbopack build. pnpm resolves two `serwist` instances (peer variation), so `fallbacks` (instanceof-based) is replaced by `setCatchHandler` in `src/app/sw.ts`.
- Offline `/` only works after a visit under SW control (`/` is not precached); first-visit-then-offline shows `/offline`.
- `engines` is not enforced without `engine-strict`; `.npmrc` with `engine-strict=true` lands in 1.2.
- `src/app/globals.css` references undefined `--font-geist-sans/mono`; deferred to HB-4 (design tokens).
- `next.config.ts` keeps `agentRules: false` (Next 16 `next dev` otherwise rewrites root `AGENTS.md`) and `turbopack.root` (stray lockfiles in the home dir).
- App libraries (Zustand, React Hook Form, Zod) are **not** installed here; confirmed later in HB-5/HB-9.

## Validation Plan

- 1.1: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm dev` boots.
- 1.1 evidence (2026-11-12, Node 22.14.0): install --frozen-lockfile, format:check, lint, typecheck, test 1/1, build all pass (orchestrator re-run + test-agent); dev server served `/` with `lang="es"` and the heading; lint/prettier negative probes failed as expected.
- 1.2 evidence (2026-11-12): orchestrator re-ran install/format:check/lint/typecheck/test 2/2/build — pass; test-agent headless Chrome 157 (2 fresh profiles, server killed): SW scope `/`, installability errors `[]`, online unknown path → 404, offline never-visited → "Sin conexión", offline `/` after controlled visit → home; install with Node 20.19.6 refused.
- 1.2 plan: same + production build emits the service worker, the manifest is served, `/offline` renders; CI green on the checkpoint PR.

## Handoff

Filled at finish-ticket.
