# Project Profile

The **single configuration file** for project facts. Every other `.ai/` file refers to these values as `<placeholder>`. Replace each `TBD`. Agents must ask when a needed value is still `TBD`, never guess.

## Identity

```text
Project name:            Habi (HabiTest)
Repository:              AndresNieto/habitest
Product summary:         PWA marketplace to buy and sell homes (Airbnb-style UX) with Tenant, Admin and Broker roles; MVP runs on mock data only
Reference projects:      None               # e.g. a legacy app this one ports; knowledge source, not a copy target
```

## Stack

```text
Language / framework:    TypeScript (strict) + Next.js App Router (latest stable at scaffold, HB-3) + React; Tailwind CSS; PWA via Serwist (@serwist/next); Node >= 20.9 (pinned in .nvmrc); package manager pnpm
Architecture:            feature-first (src/features/<feature>/{components,hooks,lib}) + shared UI (src/components/ui) + domain/data layer (src/domain types+zod, src/data repositories over mock storage). UI never touches mock storage directly; it calls repositories so a real API can replace them later
State management:        React Server/Client components; client state in Zustand stores (persist middleware -> localStorage for mock data and session); forms with React Hook Form + Zod. Libraries beyond Next.js/React/Tailwind/Serwist are proposed, confirmed by the user in HB-3 before install
Routing:                 Next.js App Router under src/app; route groups (public), (tenant), admin/, broker/; role guards in a client RoleGuard + layout checks (no real auth in MVP)
Generated code:          None               # Next.js/Serwist build output (.next/, public/sw.js) is generated and git-ignored
Data:                    mock only in MVP: seed in src/data/seed, persisted to localStorage; no backend, no database, no real auth
Source root:             src/
Test root:               colocated *.test.ts(x) next to source; e2e in e2e/ (Playwright, HB-14)
```

## Branching

```text
<release-branch>:        master             # production / release baseline (default branch)
<integration-branch>:    development        # base for feature, bugfix, task work
Remote:                  origin
Branch types:            feature | bugfix | task
Hotfix base:             master             # hotfixes need an explicit request
Worktree policy:         in-place           # in-place = branches in the main checkout | worktree = sibling git worktrees
```

## Tickets

```text
Issue tracker:           GitHub Issues (AndresNieto/habitest)
<TICKET-ID> format:      HB-<issue-number>  (regex: HB-[0-9]+); HB-12 == issue #12. Epic: HB-1
Tracker access:          gh CLI
Test issue type:         None               # e.g. Jira "Test" with link type "Tests"; None = scenarios in ticket comment
Transition rules:        user-named only    # never hardcode target statuses
```

## Knowledge Base

```text
Knowledge base:          None               # e.g. Confluence, Notion, GitHub Wiki
Stakeholder parent:      Not configured     # title + URL/ID of the parent page for generated stakeholder docs
Child page title:        <TICKET-ID>: <feature summary>
```

If `Stakeholder parent` is `Not configured`, agents must not create knowledge-base pages unless the user provides a parent or explicitly asks for a standalone page.

## GitHub

```text
GitHub access:           gh CLI             # gh CLI | GitHub MCP
<ai-label>:              ai-assisted        # applied to every PR an agent opens or updates
Required reviewers:      AndresNieto
Merge strategy:          squash             # agents never merge without explicit request
AI attribution:          label-only         # label-only | trailer | none ; whether commits/PRs mention the AI tool
Delete branch on merge:  no                 # not configured yet; verify by hand after merge (see mcp/github.md one-time settings)
Auto-close on merge:     no                 # PRs target development, default branch is master: close issues by hand naming the merge commit
```

## Project Board

See `../mcp/project-board.md`. Set `Project board: None` to opt out.

```text
Project board:           GitHub Projects - "Habi Board"
<board-owner>:           AndresNieto
<board-number>:          5
<board-node-id>:         PVT_kwHOAPjUeM4BrVtm
<status-field-id>:       PVTSSF_lAHOAPjUeM4BrVtmzhpo328
Status options:          Backlog=f75ad846 Planning=61e4505c("Ready") Executing=47fc9ee4("In progress") Testing=df73e18b("In review") BugFixing=47fc9ee4("In progress") Done=98236657
                         # board columns are Backlog/Ready/In progress/In review/Done; lifecycle names map onto them as shown (agreed 2026-11-12)
<start-date-field-id>:   PVTF_lAHOAPjUeM4BrVtmzhpo4Ec   # DATE project field
<target-date-field-id>:  PVTF_lAHOAPjUeM4BrVtmzhpo4Ek   # DATE project field
Other fields:            Priority=PVTSSF_lAHOAPjUeM4BrVtmzhpo4EM (P0=79628723 P1=0a877460 P2=da944a9c)
                         Size=PVTSSF_lAHOAPjUeM4BrVtmzhpo4EU (XS=6c6483d2 S=f784b110 M=7515a9f1 L=817d0097 XL=db339eb2)
                         Estimate=PVTF_lAHOAPjUeM4BrVtmzhpo4EY (NUMBER)
```

## Delivery And Audit

See `../standards/audit.md`.

```text
<delivery-phases>:       phase-1-setup | phase-2-core | phase-3-features | phase-4-release
Label taxonomy:          one phase-* · one type (bug|enhancement|documentation|refactor|test|chore) · one area/* · one priority/P0..P2
Areas:                   area/docs area/platform area/auth area/listings area/publish area/admin area/visits area/broker
Milestones:              one per phase (phase-1-setup #1 … phase-4-release #4); epic label: epic
<auditor>:               AndresNieto (project owner)
<audit-timezone>:        America/Bogota
<audit-utc-offset>:      GMT-05:00
<effort-source>:         Claude Code /cost per session (no token-tracking hook yet -> record "not available" and flag it)
<audit-label>:           None               # e.g. audit/blocked
```

## Subagents

See `../subagents.md`.

```text
Agent model tiers:       dev-agent=sonnet test-agent=sonnet doc-agent=haiku orchestrator=opus
Model fallback chain:    None               # e.g. primary -> fallback-1 -> fallback-2; record the effective model
Bugfix loop limit:       3                  # deliver-checkpoint stops and hands off after this many failed rounds
```

## Design Source

```text
Design source:           None (no Figma). Visual reference: Airbnb-style marketplace UX patterns (card grid, pill search, photo-first detail, sticky CTA, mobile bottom nav). Habi uses its own brand: never copy third-party logos, names, icons or assets
Design source owner:     AndresNieto
```

## Validation

```text
Format:                  pnpm format        # check: pnpm format:check   (available after HB-3)
Lint / analyze:          pnpm lint && pnpm typecheck
Test:                    pnpm test          # Vitest + Testing Library; e2e: pnpm test:e2e (Playwright, HB-14)
Coverage (on request):   pnpm test --coverage
Codegen (when models change): None
Build (release gate):    pnpm build
```

## AI Providers

```text
Approved AI providers:   Claude Code, Codex, GitHub Copilot (shims present in repo)
Integrations available:  gh CLI (issues, PRs, Projects)
```
