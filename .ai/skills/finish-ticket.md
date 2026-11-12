# Finish Ticket

Use before final handoff, PR readiness, or ticket completion. Invoked as `finish-ticket <TICKET-ID>`. Closes the Feature Plan: every phase `done` or explicitly deferred.

## Inputs

Required: ticket ID (infer from branch when safe). Optional: commit message, sign-off details, AC status, PR preferences, reviewer notes, screenshots, manual verification evidence.

## Context Budget

`Full`, proportional to the active ticket and changed surface.

## Required Context

Profile, `../standards/{branch-discipline,quality-threshold,git-standards}.md`, `../context/branching-strategy.md`, `../mcp/{issue-tracker,github}.md`, both ticket docs.

## Workflow

1. `git status --short`; confirm branch name, mapping, and base.
2. Refresh tracker, linked pages, and GitHub (PRs, reviews, threads, checks).
3. Review the Feature Plan: warn on any unchecked phase or checkpoint; require each to be finished, deferred with reason, or signed off.
4. Review AC coverage: warn on any unchecked AC; require coverage, deferral with reason, or sign-off.
5. Confirm all `in-review` checkpoint PRs merged; reconcile the log with commits/PRs; credit every human `peer-reviewer` (or `none`).
6. Resolve conflicts between tracker, GitHub, docs, and code.
7. Verify ACs by test, inspection, or explicit sign-off.
8. Run or confirm validation (plus codegen when relevant).
9. Update both docs: final scope, AC status, validation, PR and CI state, closed plan, residual risks, final implementation facts, guardrails; refresh traceability and workflow adherence.
10. Mark the umbrella draft PR ready (`gh pr ready`); create it only if missing. Refresh body and reviewers; confirm `<ai-label>`.
11. Post a tracker handoff note when the user asked to finish or hand off.
12. Transition the ticket only when the user names the target state or the project workflow defines it.
13. Prepare the semantic commit message; exclude or call out unrelated changes.

## PR Description Template

Title: `<TICKET-ID>: <concise summary>`.

```markdown
## Summary
- what changed and why

## References
- Ticket: <link>
- Context docs: `.ai/tickets/<TICKET-ID>/human-readable.md`, `.ai/tickets/<TICKET-ID>/agent-context.md`
- Knowledge base: <page link or parent status>
- Reference project: <used for ... | not used>

## Scope
- main areas, user-visible behavior, non-goals

## Acceptance Criteria
- [x] AC1 - <evidence: test | inspection | manual | sign-off>
- [ ] AC2 - deferred: <reason>

## Validation
- commands run and results; CI status; skipped checks with reasons

## Risks / Follow-Ups
- residual risks, rollout and rollback notes

## Review Notes
- where to start; screenshots for UI
```

Preserve useful human-authored content. Never claim validation, screenshots, or AC completion without current evidence.

## Acceptance Criteria Evidence

Each AC needs one of: passing automated test, manual verification note, code inspection note, explicit engineer/product sign-off, documented blocker or deferral.

## Output

Branch and base, ticket folder, changed files, AC status, plan completion and dispositions, lint and test results, tracker and KB handoff status, PR/review/check status, PR readiness, traceability, transition status, workflow adherence, commit message, skipped checks and risks, docs updated.

## Board And Audit

Marking the umbrella PR ready posts a `review` comment; the card stays in `Testing`. After the human merge, follow "After Merge" in `../mcp/github.md`: confirm merge and branch deletion, close the ticket if needed, check the Definition of Done (`../standards/quality-threshold.md`), post the `deploy` comment, then move the card to `Done` and record end date and end tokens.

Post the iteration audit comment (`../standards/audit.md`) before every board move (`../mcp/project-board.md`). Skip board steps when the profile says `Project board: None`.
