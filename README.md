# Habi

An installable PWA to buy and sell homes, with an Airbnb-style marketplace UX. Three roles:

- **Tenant**: end user who buys or publishes properties (not a renter; there are no rentals).
- **Admin**: platform operator who reviews properties and documents and oversees finances.
- **Broker**: field agent who shows properties and schedules notary appointments.

The MVP runs on **mock data only**: everything is seeded in the browser and persisted to `localStorage`. No backend, real auth or payments. The UI is in Spanish (es-CO) with prices in COP.

## Status (v0.1.0)

| Area | Ticket | State |
| --- | --- | --- |
| Next.js + PWA + CI scaffold | HB-3 | done |
| Design system + app shell (role-aware nav) | HB-4 | done |
| Domain model, business rules, mock data | HB-5 | done |
| Listings home: search, type bar, URL filters | HB-7 | done |
| Property detail: gallery, map, visit CTA | HB-8 | done |
| Mock auth, publish wizard, admin review, visits, broker agenda, finance | HB-6, HB-9 to HB-13 | planned |

Try it:

- `/`: approved properties; search a city (accent-insensitive, e.g. `medellin`), filter by type, price, bedrooms and bathrooms.
- `/properties/p-005`: property detail.
- User menu (avatar): switch the demo role (Tenant, Admin, Broker) or **reset demo data**.
- `/design`: base component gallery.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.
- Node 22: the exact version is in `.nvmrc` (22.14.0). From the repo root run `nvm install` (first time) and `nvm use`. pnpm refuses to install on a Node version outside `>=22 <23` (`engines` in `package.json`, `engineStrict: true` in `pnpm-workspace.yaml`).
- pnpm 11: pinned in the `packageManager` field of `package.json` (11.11.0). Enable it with `corepack enable` or install it globally.

Then install dependencies with `pnpm install`.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the Next.js dev server (http://localhost:3000 by default). |
| `pnpm build` | Creates the production build. |
| `pnpm start` | Serves the production build; run `pnpm build` first. |
| `pnpm lint` | Runs ESLint. |
| `pnpm typecheck` | Type-checks with TypeScript without emitting files. |
| `pnpm format` | Formats files with Prettier. |
| `pnpm format:check` | Checks formatting without writing. |
| `pnpm test` | Runs the Vitest suite once. |
| `pnpm test:watch` | Runs Vitest in watch mode. |

## Project layout

| Path | Contents |
| --- | --- |
| `src/app/` | Routes (App Router), layout, PWA manifest and service worker. |
| `src/components/ui/` | Base components (Button, Input, Select, Card, Badge, Modal, Avatar, EmptyState, Skeleton). |
| `src/components/shell/` | Header, search pill, user menu, bottom nav, role navigation (`nav.ts`). |
| `src/features/` | Feature modules: `listings`, `property-detail`, `session`. |
| `src/domain/` | Zod schemas, business rules (`rules.ts`), approximate geo. |
| `src/data/` | Seed, `localStorage` DB and async repositories (import from `@/data`). |
| `src/lib/` | Helpers (`cn`, COP and date formatting). |

Design tokens (brand `#E11D48`, Inter, radii, shadows) live in `src/app/globals.css` as CSS variables exposed to Tailwind via `@theme`.

### PWA

- The service worker is only built and registered in production. `pnpm dev` has no service worker; use `pnpm build && pnpm start` to test it.
- It is served at `/serwist/sw.js` (with `Service-Worker-Allowed: /`). Source: `src/app/sw.ts`; the route that compiles it: `src/app/serwist/[path]/route.ts`.
- `/offline` is precached on install. With no connection and no cached page, the browser shows the "Sin conexión" page.
- To test offline mode:
  1. Run `pnpm build && pnpm start` and open http://localhost:3000.
  2. In DevTools, open Application > Service workers and confirm the worker is active and controls the page.
  3. Visit `/` while the worker controls the page (reload after the first load). Pages visited before the worker took control are not cached.
  4. Tick "Offline" (or stop the server) and reload: `/` comes from the cache and a never-visited route shows "Sin conexión".
- When testing new builds in a browser, a previously installed worker may serve cached pages: reload twice or clear site data.

### CI

GitHub Actions (`.github/workflows/ci.yml`) runs on PRs to `master`, `development` and `feature/**`, and on pushes to `development`. It installs with `pnpm install --frozen-lockfile` and runs `format:check`, `lint`, `typecheck`, `test` and `build`.

---

## AI operating model

Project-agnostic AI operating model. Copy it into a new repository to get shared governance, business-source rules, multi-agent collaboration rules, Git/GitHub discipline, and a ticket lifecycle (start, continue, checkpoint, finish, review, PR feedback).

### Adopt In A New Project

1. Copy `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and `.ai/` into the repository root.
2. Fill in `.ai/context/project-profile.md`. It is the **only** file that must be customized; every other file reads its values from there.
3. Fill in `.ai/context/business-context.md` (domain, stakeholders, sources of truth, glossary).
4. Fill in the stack-specific section of `.ai/standards/code-standards.md` and `.ai/mcp/stack-tooling.md`.
5. Fill in the `Project Board`, `Delivery And Audit`, and `Subagents` sections of the profile (or set `Project board: None`). Discover board IDs with the commands in `.ai/mcp/project-board.md`.
6. Optionally start `.ai/context/feature-map.md` once the codebase has features.
7. Delete any provider entrypoint that the project does not use (see `.ai/entrypoints.md`), including `.claude/` if Claude Code is not approved.
8. Ask a human to run the one-time repository settings command in `.ai/mcp/github.md`.
9. Commit with `docs: adopt ai operating model`.

### Delivery Flow

```text
start-ticket <ID>          branch, ticket docs, Feature Plan, draft umbrella PR, card -> Planning
  deliver-checkpoint <ID>  per checkpoint N.M (main session = orchestrator):
    dev-agent   -> execute       card -> Executing
    review      -> review
    test-agent  -> test          card -> Testing
    (fail)      -> bugfix loop   card -> BugFixing -> back to test (bounded)
    doc-agent   -> document
    checkpoint-ticket            checkpoint PR into the feature branch
  human merges the checkpoint PR
  continue-ticket <ID>     marks N.M done, picks the next checkpoint
finish-ticket <ID>         umbrella PR ready for review
human merges               deploy comment, card -> Done, ticket closed
```

Every arrow that moves the card is preceded by an iteration audit comment (`.ai/standards/audit.md`).

### Layout

```text
AGENTS.md                         root shim -> .ai/AGENTS.md
CLAUDE.md                         root shim -> .ai/AGENTS.md
.github/copilot-instructions.md   shim -> .ai/AGENTS.md
.claude/agents/                   Claude Code subagent wrappers -> .ai/agents/
.claude/skills/                   Claude Code skill wrappers -> .ai/skills/
.ai/
  AGENTS.md                       canonical entrypoint
  README.md                       human index
  entrypoints.md                  provider entrypoint rules
  workflows.md                    reusable workflows + context-budget router
  skills.md                       skill index and conventions
  subagents.md                    specialist subagents + orchestrator
  agents/                         dev-agent, test-agent, doc-agent definitions
  context/                        project profile, business context, branching, feature map
  standards/                      governance, multi-agent, audit, code, quality, git, branch, docs
  mcp/                            issue tracker, GitHub, project board, stack tooling contracts
  skills/                         lifecycle skills (incl. deliver-checkpoint orchestrator)
  tickets/_template/              paired ticket doc templates
```

### Placeholder Convention

Values written as `<angle-bracket-name>` (for example `<integration-branch>`, `<TICKET-ID>`) are resolved from `.ai/context/project-profile.md`. Agents must read the profile instead of guessing them.
