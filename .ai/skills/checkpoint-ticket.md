# Checkpoint Ticket

Use to mark a milestone (checkpoint `N.M`) inside an in-progress feature without finishing the ticket. Invoked as `checkpoint-ticket <TICKET-ID>`; `N.M` is derived from the active phase unless overridden.

## Purpose

Close a reviewable increment with full discipline while the ticket stays open: scoped commit, one PR, updated paired docs and Feature Plan, knowledge-base update, tracker comment. Identical whether the agent proposes it or the user requests it. A checkpoint that does not update the plan is incomplete.

Marking opens its PR and sets `in-review`; it becomes `done` only when the PR merges (usually confirmed on the next `continue-ticket`).

## Inputs

Required: ticket ID. Optional: scope summary, `N.M` override, target phase, commit message, PR preferences, re-chunking instructions.

## Context Budget

`Full`, scoped to the active ticket, branch, checkpoint PR, and changed files.

## Required Context

Profile, `../standards/{branch-discipline,quality-threshold,git-standards,documentation-standards}.md`, `../context/branching-strategy.md`, `../mcp/{issue-tracker,github}.md`, both ticket docs. Stop if the Feature Plan is missing.

## Branch And PR Model

- Feature branch: `feature/<TICKET-ID>[-slug]`, umbrella draft PR into `<integration-branch>` (stays draft until `finish-ticket`).
- Checkpoint branch: `task/<TICKET-ID>-<checkpoint-slug>` from `origin/<integration-branch>`, PR into the feature branch.
- Checkpoint PRs merge before the next checkpoint starts unless the user asks for stacking.

## Workflow

1. `git status --short`; confirm branch, mapping, and base.
2. Read docs and plan; compute `N.M`; re-chunk not-yet-done items if needed with plan history.
3. Identify covered ACs or `foundational - no direct AC`.
4. Refresh tracker and GitHub context.
5. Deliver on the checkpoint branch (record drift if the user asked to work off-model).
6. Run validation per the quality threshold (plus codegen when generated sources changed).
7. Stage only the checkpoint scope; semantic commit with `N.M` in the body.
8. Update the Feature Plan in both docs: `N.M` -> `in-review` with commit, PR, ACs, validation, date; peer-reviewers pending; phase stays `in-progress`; boxes unchecked until merge.
9. Refresh traceability, sync, workflow adherence, lifecycle status.
10. Push; create/update the checkpoint PR with `<ai-label>`, framed as a checkpoint (id, phase, ACs, delivered, remaining).
11. Sync the umbrella draft PR description; keep it draft.
12. Update the stakeholder page if the KB parent is configured and the user wants it.
13. Post a tracker comment: id, what shipped, ACs, validation, PR link, plan status, deferred items.
14. Never transition the ticket to done and never run finish steps.

## Output

Ticket ID, `N.M` and phase status, branch and PR target, commit identity, covered ACs, changed files, commit message, lint/test results, plan update, PR status, umbrella sync, KB and tracker status, workflow adherence, excluded changes, remaining work.

## Board And Audit

After opening the checkpoint PR, post the `review` comment (checkpoint id, PR link) and keep or move the card to `Testing`. Never move it to `Done` here.

Post the iteration audit comment (`../standards/audit.md`) before every board move (`../mcp/project-board.md`). Skip board steps when the profile says `Project board: None`.
