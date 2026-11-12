# Quality Threshold

Decides whether a change is ready to hand back.

## Default Bar

A change is complete only when it is:

- aligned with the declared architecture;
- minimal and scoped to the request;
- readable by the next engineer;
- covered by tests when behavior changes;
- validated with the profile's commands;
- documented when ticket-level or when it changes `.ai/` standards;
- on the correct branch and base per `branching-strategy.md`.

## Required Checks

Run the profile's `Validation` commands:

1. Format.
2. Lint / analyze.
3. Test.
4. Codegen, then lint and test again, when generated sources changed.
5. Coverage only when requested or when test posture meaningfully changes (a visibility metric unless a ticket or CI defines a threshold).

Integration tooling may help interpret failures; it never replaces running the commands. If a command cannot run, report why and what risk remains.

## Review Criteria

- Auth and routing behavior preserved?
- No reverted unrelated work? No hand-edited generated files?
- Layer responsibilities kept separate?
- No hardcoded environment values or logged secrets?
- UI responsive and accessible?
- Ticket docs updated when scope, behavior, or plan changed?
- Branch ticket ID maps to an updated `.ai/tickets/<TICKET-ID>/`?
- Semantic commit message ready or used?

## Definition Of Done

A ticket is Done, and its board card may move to Done, only when all of these hold:

- [ ] Every Feature Plan phase and checkpoint is `done` (merged) or explicitly deferred with reason or sign-off.
- [ ] Every AC is checked with evidence (test, inspection, manual note, or sign-off) in both ticket docs and the ticket itself.
- [ ] The umbrella PR is merged with the profile's `Merge strategy`, CI green, and its branch deleted (verify by hand when `Delete branch on merge` is `no`).
- [ ] No declared architecture rule broken; no hand-edited generated files.
- [ ] Project docs touched by the change are updated and merged.
- [ ] The ticket is closed (by hand, naming the merge commit, when `Auto-close on merge` is `no`).
- [ ] Board fields match the ticket's audit fields; no placeholder values left (`audit.md`).
- [ ] A `deploy` iteration audit comment was posted before the card moved to Done.
- [ ] Labels are correct: one phase, one type, one area, one priority.

## Risk Reporting

Final responses state: checks run, checks not run, files changed, residual risks, decisions needed from the user, and whether ticket docs were updated. Never hide validation gaps.
