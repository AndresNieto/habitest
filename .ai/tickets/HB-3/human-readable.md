# HB-3: Scaffold de la PWA en Next.js

Agent context: [agent-context.md](agent-context.md)

## Source Traceability

- Ticket: [#3](https://github.com/AndresNieto/habitest/issues/3) (HB-3), epic [#1](https://github.com/AndresNieto/habitest/issues/1)
- Knowledge-base pages: None identified
- Knowledge-base parent: Not configured
- Last tracker refresh: 2026-11-12
- Status / priority / assignee: open / P0 / AndresNieto; labels phase-1-setup, chore, area/platform, priority/P0; milestone phase-1-setup
- Local sync: current
- Lifecycle notes: start posted, pickup skipped, handoff deferred, transition deferred
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

`create-next-app` equivalent setup with pnpm on Node 22 LTS, `src/` layout per the profile, Tailwind, ESLint (Next config) + Prettier, Vitest with jsdom and Testing Library. PWA via `@serwist/next` (service worker built only in production), `src/app/manifest.ts`, generated placeholder icons, `/offline` route used as precache fallback. CI in `.github/workflows/ci.yml`.

## Feature Plan

Status legend: not-started | in-progress | in-review | done | deferred. Done means merged.

- [ ] Phase 1 - Runnable, validated base - not-started
  - Goal: an installable, tested, CI-checked Next.js app shell with no product features
  - Exit criteria: all ACs covered; `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass locally and in CI
  - Checkpoints:
    - [ ] 1.1 - Next.js + TS strict + Tailwind + ESLint/Prettier + Node pin + Vitest smoke test - not-started
    - [ ] 1.2 - PWA (manifest, icons, Serwist SW, offline page) + GitHub Actions CI - not-started

Acceptance criteria coverage:

- [ ] AC1 - not yet covered (1.1)
- [ ] AC2 - not yet covered (1.1)
- [ ] AC3 - not yet covered (1.1)
- [ ] AC4 - not yet covered (1.1)
- [ ] AC5 - not yet covered (1.2)
- [ ] AC6 - not yet covered (1.1, re-verified in 1.2)
- [ ] AC7 - not yet covered (1.2)

Plan history:
- 2026-11-12 - initial plan accepted (2 checkpoints, Node 22 LTS) by AndresNieto

## Pull Requests

- Feature PR (draft): pending
- Checkpoint PRs: none yet

## Risks, Assumptions, Open Questions

- Local default Node is 18.20; the project pins 22 via `.nvmrc` (`nvm use`). Developers must switch.
- Serwist needs a webpack build; if the Next.js version defaults to Turbopack for `build`, the build script must opt into webpack. Verified in 1.2.
- App libraries (Zustand, React Hook Form, Zod) are **not** installed here; confirmed later in HB-5/HB-9.

## Validation Plan

- 1.1: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm dev` boots.
- 1.2: same + production build emits the service worker, the manifest is served, `/offline` renders; CI green on the checkpoint PR.

## Handoff

Filled at finish-ticket.
