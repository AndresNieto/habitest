# Address PR Feedback

Use when responding to PR review feedback. Dismissal or resolution of human feedback is always human-in-the-loop.

## Inputs

Required: PR number, URL, or branch context. Optional: specific reviewer/comment/file/thread; implement now or plan only; whether to post replies after approval.

## Context Budget

`Standard`; `Expanded` when feedback changes scope, validation, docs, or ticket/PR state; `Full` for codegen, auth, routing, data, security, architecture, or formal write-back with readiness claims.

## Workflow

1. `git status --short`; preserve unrelated changes.
2. Read PR metadata, files, reviews, comments, unresolved threads, checks.
3. Read ticket context when ticket-linked.
4. Group feedback by topic, file, reviewer, action.
5. Classify each item: `Fix`, `Discuss`, `Recommend dismiss`, `Nitpick accepted`.
6. For fixes and accepted nitpicks: inspect, then make the smallest coherent change; add tests when behavior or regression risk is involved.
7. Run validation.
8. Update ticket docs when scope, facts, validation, PR state, or risks changed.
9. Prepare a resolution summary mapping each comment to its outcome.
10. Show proposed text and get explicit approval before posting any disagreement, dismissal, or resolution.
11. Post non-dismissive replies only when approved or write-back was requested.

## Human-In-The-Loop Rules

- Never dismiss or resolve comments without explicit approval.
- Never post arguments against feedback without explicit approval.
- Never mark requested changes addressed unless code, tests, docs, or an approved response address them.
- If feedback conflicts with the tracker or docs, surface it and ask unless the correct source is explicit.

## Output

PR and branch, items reviewed, items fixed, files changed, validation, items needing decisions, proposed responses, write-back status, remaining risks.

## Board And Audit

When feedback requires code changes, post the `bugfix` comment and move the card to `BugFixing`; when the fixes are pushed and green, post a `test` comment and move it back to `Testing`.

Post the iteration audit comment (`../standards/audit.md`) before every board move (`../mcp/project-board.md`). Skip board steps when the profile says `Project board: None`.
