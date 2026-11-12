# HB-3: Agent Context

Human summary: [human-readable.md](human-readable.md)

## Sources

| Fact | Owner | Reference |
| --- | --- | --- |
| Scope / ACs | Tracker | GitHub issue #3 |
| Stack, layout, commands | Engineer decision | `.ai/context/project-profile.md` |
| Design | none | n/a (HB-4) |
| Implementation | Code | repo root (no app code before this ticket) |

- Last tracker refresh: 2026-11-12
- Sync status: tracker current, knowledge base n/a, GitHub current, local code clean
- Lifecycle write status: start note posted; board Backlog -> Ready -> In progress
- Workflow adherence: On workflow

## Branch

- Branch: `feature/HB-3-nextjs-pwa-scaffold`
- Base: `origin/development`
- Feature PR: #16 (draft)
- Checkpoint branches: `task/HB-3-1.1-base-tooling`, `task/HB-3-1.2-pwa-ci` -> PR into the feature branch

## Objective

Bootstrap the Next.js PWA with the stack, layout and validation commands declared in the profile, so feature tickets start on a validated base.

## Target Files And Symbols

- `package.json`, `pnpm-lock.yaml`, `.nvmrc`, `pnpm-workspace.yaml` (build-script allow list) - tooling, scripts `dev build start lint typecheck format format:check test test:watch`; `.npmrc` with `engine-strict=true` in 1.2
- `tsconfig.json` (strict, `@/*` -> `src/*`), `next.config.ts`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `vitest.config.mts`, `vitest.setup.ts` (no postcss config: Tailwind v4 via `@tailwindcss/turbopack` loader in `next.config.ts`)
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` - minimal placeholder page (Spanish copy, `lang="es"`)
- `src/app/page.test.tsx` - smoke test
- 1.2: `src/app/manifest.ts`, `src/app/sw.ts`, `src/app/offline/page.tsx`, `public/icons/*`, `.github/workflows/ci.yml`
- `.gitignore` - add Next/pnpm/Serwist outputs (`.next/`, `node_modules/`, `public/sw.js`, `public/swe-worker-*.js`, coverage)

## Constraints And Non-Goals

- No product features, design tokens, or app shell (HB-4); no domain/mock data (HB-5).
- No Zustand / React Hook Form / Zod yet.
- Do not edit `.ai/`, `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.github/copilot-instructions.md`.
- Use the existing `README.md` content; do not overwrite it (doc-agent may append a "Run locally" section).
- Third-party brand assets are forbidden; icons are generated placeholders with Habi initials/colors.

## Implementation Sequence

1. 1.1 tooling and smoke test.
2. 1.2 PWA + CI.

## Feature Plan

| Phase | Checkpoint | Scope | Status | Commit / PR | ACs | Peer-reviewers | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 - Runnable, validated base (in-progress) | 1.1 | Next.js + TS strict + Tailwind + ESLint/Prettier + Node pin + Vitest smoke | in-review | 3f16878 / #17 | AC1 AC2 AC3 AC4 AC6 | pending | install, format:check, lint, typecheck, test, build, dev |
| 1 - Runnable, validated base (in-progress) | 1.2 | PWA (manifest, icons, Serwist, offline) + CI + engine-strict | not-started | - | AC5 AC7 (AC6 re-check) | - | - |

Acceptance criteria coverage:

- [ ] AC1 - covered by 1.1 (in-review)
- [ ] AC2 - covered by 1.1 (in-review)
- [ ] AC3 - covered by 1.1 (in-review)
- [ ] AC4 - covered by 1.1 (in-review)
- [ ] AC5 - not yet covered
- [ ] AC6 - covered by 1.1 (in-review; re-verified in 1.2)
- [ ] AC7 - not yet covered

Plan history:
- 2026-11-12 - initial plan accepted
- 2026-11-12 - 1.1 in-review (3f16878, #17); engine-strict added to 1.2

## Validation Commands

See `Validation` in `.ai/context/project-profile.md`. Run with Node 22: `source ~/.nvm/nvm.sh && nvm use` first.

## Branch Discipline Checklist

See `.ai/standards/branch-discipline.md`.
