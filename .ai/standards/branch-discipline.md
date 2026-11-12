# Branch Discipline

Ties branch naming, validation, commits, and ticket context into one standard for feature, bugfix, and task branches. Read `../context/branching-strategy.md` first.

Lifecycle: `start-ticket` -> `continue-ticket` -> `checkpoint-ticket` (repeat) -> `finish-ticket`.

## Branch To Ticket Mapping

`[feature|bugfix|task]/<TICKET-ID>[-slug]` maps to `.ai/tickets/<TICKET-ID>/` (no slug in the folder name). Both `human-readable.md` and `agent-context.md` must exist and be current before handoff.

## Checkpoint Model

- Feature work lives on `feature/<TICKET-ID>[-slug]`; its umbrella PR into `<integration-branch>` is a draft from `start-ticket` until `finish-ticket`.
- Each checkpoint is delivered on `task/<TICKET-ID>-<checkpoint-slug>` with one PR into the feature branch.
- A checkpoint is `done` only when its PR merges. Checkpoint PRs merge before the next checkpoint starts unless the user asks for stacking.
- On merge, credit every human reviewer by name as `peer-reviewer`; record `peer-reviewer: none` when nobody reviewed.

## Readiness Checklist

Before commit or handoff:

- [ ] branch name and base follow the strategy
- [ ] ticket ID maps to `.ai/tickets/<TICKET-ID>/`
- [ ] `human-readable.md` has current scope, plan, risks, validation
- [ ] `agent-context.md` has current files, commands, constraints, guardrails
- [ ] Feature Plan and AC checkboxes reflect reality; every item done (merged) or explicitly deferred before final handoff
- [ ] merged checkpoints list their peer-reviewers
- [ ] lint and test status known
- [ ] semantic commit message prepared
- [ ] unrelated changes excluded or called out

## Validation

Run the profile's validation commands. If validation cannot run, document why in the handoff and the ticket docs.

## Handoff

Branch, ticket folder, changed files, lint result, test result, commit message (if not committed), unresolved risks or skipped checks.
