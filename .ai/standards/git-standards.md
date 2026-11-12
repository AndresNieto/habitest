# Git Standards

Use when creating branches, preparing commits, opening PRs, or writing handoffs. Branch roles and bases: `../context/branching-strategy.md`. GitHub operations: `../mcp/github.md`.

## Branch Naming

```text
[feature|bugfix|task]/<TICKET-ID>[-<optional-slug>]
```

Examples: `feature/ABC-123`, `feature/ABC-123-executive-landing`, `bugfix/ABC-123-empty-state`, `task/ABC-123-update-ai-context`.

## Semantic Commits

```text
<type>(<TICKET-ID>): <summary>     # ticket work
<type>: <summary>                  # non-ticket work
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `build`, `ci`. Use `feat`, never `feature` (branch types still use `feature`).

Summary: lowercase imperative, under ~72 chars, no trailing period, one logical change per commit.

Good: `feat(ABC-123): wire dashboard summary`, `fix(ABC-123): handle empty summary`, `chore: update lint settings`.
Avoid: `updated files`, `fix stuff`, `WIP`.

Trailers and AI attribution follow the profile's `AI attribution` setting.

## Checkpoint Commits

- Normal ticket scope in the subject; checkpoint id `N.M` in the body.
- One checkpoint = one scoped commit (or small series) + one PR into the parent feature branch.
- Record id, hash, and PR in the Feature Plan of both ticket docs.

## Commit Hygiene

- `git status --short` before committing; review the staged diff.
- Stage explicit paths; never sweep unrelated changes in.
- Do not amend, rebase, reset, or force-push unless explicitly requested.
- If the tree was dirty before starting, preserve it and mention it in the handoff.

## Ticket Traceability

The ticket ID appears in: branch names, `.ai/tickets/<TICKET-ID>/`, commit scopes, PR titles, and checkpoint bodies (`N.M`).

## Pull Requests

Title: `<TICKET-ID>: <concise summary>`; never `updates` / `fixes` / `WIP`.

Label: `<ai-label>` on every PR an agent opens or updates.

Description (see `../skills/finish-ticket.md` for the full template): summary, ticket link, context docs paths, knowledge-base link or parent status, scope and non-goals, AC with evidence, validation (commands + CI), risks / rollback for risky changes, review notes and screenshots for UI.

Preserve useful human-authored description content; replace only stale sections.

## Handoff Summary

Branch, ticket folder, changed files, validation run and skipped, pre-existing unrelated changes, PR URL, review state, check status.
