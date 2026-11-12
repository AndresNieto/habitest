# Review PR

Use when reviewing a GitHub pull request. Classifies findings as blockers, nice-to-have, or nitpicks. Reviewing is part of delivery: an unreviewed checkpoint PR is an unfinished checkpoint.

## Inputs

Required: PR number, URL, or enough branch context to identify it (ask if unclear).
Optional: review focus (security, architecture, tests, UI, regression risk); whether to post to GitHub; whether approve/request-changes is allowed.

## Context Budget

`Standard`; `Expanded` when ticket-linked, unclear, UI with a design source, or meaningful CI/review history; `Full` for large PRs, finish gates, codegen, auth/routing/data/security risk, or formal posted reviews.

## Required Context

`../AGENTS.md`, `../mcp/github.md`, `../standards/code-standards.md`, `../standards/quality-threshold.md`; `../mcp/issue-tracker.md` and ticket docs when ticket-linked; design source for UI; feature map when ownership matters.

## Workflow

1. Resolve owner, repo, PR number, base, head.
2. Read metadata, body, linked ticket, changed files, reviews, comments, draft state, checks.
3. Classify the PR: checkpoint PR (`task/*` into a feature branch, id `N.M`) or umbrella feature PR (feature into `<integration-branch>`, usually draft = progress review, not a merge gate).
4. A thin description is review-context risk, not a code defect.
5. Read ticket context and the Feature Plan; compare with the diff.
6. Inspect changed files locally; do not rely only on the file list.
7. Evaluate correctness, regressions, architecture fit, state, routing, data flow, error handling, security, accessibility, validation, tests. If it ports behavior from a reference project, check behavior parity without copying its architecture.
8. Classify:
   - `Blocker`: likely bug, regression, data loss, security issue, broken AC, missing required validation, unsafe architecture.
   - `Nice-to-have`: maintainability, test depth, structure, performance, resilience, UX polish.
   - `Nitpick`: naming, formatting, minor readability.
9. Concrete findings with file:line; state uncertainty explicitly.
10. Capture every human reviewer for peer-reviewer credit on merge.
11. No approve, request-changes, or comments unless write-back was requested; avoid duplicate comments.

## Output

Findings first (Blockers, Nice-to-have, Nitpicks) with file/line, issue, risk, suggested fix. Then: PR type and checkpoint/feature scope, human peer-reviewers, description quality, validation and CI, docs/plan sync, residual risks. If no findings, say so and list unverified areas.
