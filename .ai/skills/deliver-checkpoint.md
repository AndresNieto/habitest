# Deliver Checkpoint

Orchestrates one checkpoint `N.M` from implementation to an open checkpoint PR, using the specialist subagents. Invoked as `deliver-checkpoint <TICKET-ID>`; `N.M` is the next unchecked checkpoint in the Feature Plan unless overridden.

## Purpose

Run the `execute -> review -> test -> bugfix -> document` loop with `dev-agent`, `test-agent`, and `doc-agent`, keeping the board and audit trail in sync, and close with `checkpoint-ticket`. The main session runs this skill and is the orchestrator: it briefs, verifies, commits, and writes to shared systems; the subagents do the specialist work.

## Inputs

Required: ticket ID. Optional: `N.M` override, bugfix-loop limit (default: profile `Bugfix loop limit`), extra review focus.

## Context Budget

`Full`, scoped to the active ticket, branch, and checkpoint.

## Required Context

Profile, `../subagents.md`, `../standards/{multi-agent,audit,quality-threshold,branch-discipline}.md`, `../mcp/{github,project-board,issue-tracker}.md`, both ticket docs.

## Preconditions (stop and report if any fails)

- `start-ticket` already ran: both ticket docs exist, the Feature Plan is accepted, the umbrella draft PR exists.
- The previous checkpoint is `done` (merged) unless the user asked for stacking.
- The checkpoint has a scope and covered ACs (or is marked `foundational`).
- `git status --short` is clean apart from changes the user asked to keep; they are excluded from the checkpoint.

## Workflow

1. **Prepare.** Resolve `N.M`. Cut `task/<TICKET-ID>-<checkpoint-slug>` from a fresh `origin/<integration-branch>` (see `../context/branching-strategy.md`). Set `N.M` to `in-progress` in both ticket docs.
2. **Execute.** Post the `execute` iteration audit comment, then move the card to the profile's `Executing` status. Launch `dev-agent` with a full brief (`../standards/multi-agent.md`). On return, verify: read `git diff --stat`, rerun validation, and trust the diff over the report when they disagree.
3. **Review.** Review the diff yourself with `review-pr` criteria (or launch an independent reviewer that gets the code, not your conclusion). Blockers become defects for step 5.
4. **Test.** Post the `test` iteration audit comment, then move the card to `Testing`. Launch `test-agent` with the covered ACs and the known baseline failures. Read its verdict per AC.
5. **Bugfix loop.** If review or testing produced defects: post the `bugfix` comment, move the card to `BugFixing`, relaunch `dev-agent` with only the defects and reproduction steps, then return to step 4. Stop after the loop limit; post a comment with what still fails and hand off to the user.
6. **Document.** Launch `doc-agent` with the `test-agent` report. Apply its ticket-doc drafts yourself (only the orchestrator edits `.ai/tickets/`); review the project-doc edits it made.
7. **Checkpoint.** Run `checkpoint-ticket <TICKET-ID>`: scoped commit with `N.M` in the body, push, checkpoint PR into the feature branch with `<ai-label>` and the description `doc-agent` drafted, umbrella sync, tracker comment. Post the `review` iteration audit comment with the PR link; the card stays in `Testing`.
8. **Hand off.** Stop. Merging is a human action.

## Rules

- Post every iteration audit comment **before** moving the card (`../standards/audit.md`).
- Never do specialist work to make a step pass: send code back to `dev-agent`, tests to `test-agent`, docs to `doc-agent`.
- Never merge, force-push, retarget, delete branches, or transition the ticket.
- Never report an agent's result as verified unless you verified it. Never predict a pending agent's result.
- Record `Drifted from workflow` in both ticket docs if the user asks to skip a step.

## Output

Ticket ID, `N.M`, branch and PR (URL, target, CI state), verdict per covered AC, agents run with their effective models, bugfix rounds used, files changed, validation results, iteration comments posted, board status, tokens per the profile's effort source, open defects or decisions needed, next step (await merge, then `continue-ticket`).
