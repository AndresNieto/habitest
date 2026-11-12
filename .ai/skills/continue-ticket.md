# Continue Ticket

Use when resuming or iterating on ticket work. Invoked as `continue-ticket <TICKET-ID>`; infer the ID from the branch when safe, else ask.

## Context Budget

`Standard` for small continuations; `Expanded` for lifecycle reconciliation, plan updates, or validation/PR claims; `Full` for high-risk work, codegen, checkpoint reconciliation, or handoff readiness.

## Required Context

`../AGENTS.md`, `../context/project-profile.md`, `../standards/branch-discipline.md`, `../context/branching-strategy.md`, `../mcp/issue-tracker.md`, `../mcp/github.md`, both ticket docs. Feature map and design source when relevant.

If either ticket doc is missing, stop and ask whether to run `start-ticket` or create them.

## Workflow

1. `git status --short`; identify branch and ticket ID; confirm the mapping to `.ai/tickets/<TICKET-ID>/` and the correct base.
2. Refresh tracker, linked pages, and GitHub (umbrella draft PR, checkpoint PRs, reviews, threads, checks). If the umbrella PR is missing, note it and open it as a draft.
3. Read both docs and the Feature Plan. Resolve the current checkpoint (latest not `done`):
   - `in-review` and merged: set `done`, check its box and covered ACs, record commit identity and every human `peer-reviewer` (or `none`), check the phase if its exit criteria are met.
   - `in-review` and not merged: not done; decide with the user whether to await or address review before new work.
4. Identify the active phase, last done checkpoint, and next unchecked increment.
5. Compare tracker, GitHub, docs, and code; call out stale or conflicting facts. Code beats docs on implementation facts.
6. Inspect relevant code paths; state a short continuation plan anchored to the next checkpoint before editing.
7. Re-chunk if the plan no longer matches reality (never renumber merged checkpoints); add plan history.
8. When an increment is ready, use `checkpoint-ticket`.
9. Record any user-requested deviation as `Drifted from workflow` in both docs.
10. Refresh traceability, sync status, workflow adherence, and lifecycle note status; update docs after changes.
11. Post a tracker pickup note when useful or requested.

## Output

Ticket ID, branch, expected base, objective, current checkpoint and merge state, active phase and next checkpoint, next steps, refresh results (tracker, GitHub, stack), sync status, workflow adherence, blockers.

## Board And Audit

Reconcile the card with reality: when a checkpoint merged and the next one starts, post the `execute` comment and move the card to `Executing`. A card ahead of or behind the real state is corrected with a comment first.

Post the iteration audit comment (`../standards/audit.md`) before every board move (`../mcp/project-board.md`). Skip board steps when the profile says `Project board: None`.
