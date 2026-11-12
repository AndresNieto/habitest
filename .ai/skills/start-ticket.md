# Start Ticket

Use when starting ticket-based work. Invoked as `start-ticket <TICKET-ID>`.

## Purpose

Create the ticket branch and paired docs. For feature work, record the accepted Feature Plan, commit the scaffolding, and open the draft feature PR so work is trackable from day one.

## Inputs

Required: ticket ID; branch type (`feature` | `bugfix` | `task`). Ask if missing.
Optional: slug; source request, story, or ACs.

## Context Budget

`Expanded` by default. `Full` when the ticket has broad architecture impact, unclear ACs, codegen implications, design dependencies, or external handoff expectations. Never load other tickets' folders.

## Required Context

`../context/project-profile.md`, `../context/branching-strategy.md`, `../mcp/issue-tracker.md`, `../mcp/github.md`, `../mcp/stack-tooling.md` (when stack constraints matter), design source (UI work).

## Workflow

1. `git status --short`; preserve unrelated changes.
2. Load the ticket, comments, links, and linked knowledge-base pages.
3. Check the knowledge-base `Stakeholder parent` before creating any page; create one only when configured and the user wants it.
4. Check GitHub for an existing remote branch or open PR for the ticket.
5. Build the branch name `[type]/<TICKET-ID>[-slug]` (slug normalized per branching strategy).
6. Create the branch from a freshly fetched `origin/<integration-branch>` following the profile's worktree policy.
7. Create `.ai/tickets/<TICKET-ID>/human-readable.md` and `agent-context.md` from `../tickets/_template/` if missing; seed tracker, knowledge-base, GitHub, and stack details, ACs, assumptions; cross-link.
8. Propose a phased Feature Plan (see below); record the accepted plan in both docs with AC coverage checklist.
9. Seed source traceability, KB parent status, sync status, source ownership, lifecycle note status, and `Workflow adherence: On workflow`.
10. Feature work: commit only the ticket docs as `docs(<TICKET-ID>): scaffold ticket context and feature plan`.
11. Feature work: push and open the feature PR into `<integration-branch>` as **draft** with `<ai-label>` and a plan-oriented description. Record the PR number in both docs.
12. Post a tracker start note (branch, docs path, draft PR) when the user asked to start or automate the lifecycle.

## Feature Plan Proposal

1. Derive phases from ticket intent, ACs, linked pages, and the feature map.
2. Each phase: goal, exit criteria, independently reviewable, buildable and validating on its own, usually a bit larger than one checkpoint.
3. Present the phases as a proposal; adopt the user's chunking when given.
4. Record before substantial implementation. Do not block branch creation on acceptance.

## Output

Branch, base, ticket folder, docs created/updated, tracker and GitHub context loaded, traceability and sync status, tracker note status, scaffolding commit and draft PR (feature work), missing source details.

## Board And Audit

Add the ticket to the board if it is missing; set `Start date`. Post the `planning` comment, then move the card to `Planning`. When implementation starts, set `Target date`, post the `execute` comment, and move it to `Executing`.

Post the iteration audit comment (`../standards/audit.md`) before every board move (`../mcp/project-board.md`). Skip board steps when the profile says `Project board: None`.
