# AI Workflows

Read after `.ai/AGENTS.md` and before substantive work.

## Workflow Adherence

These workflows and their skills are the default path. Do not let an ad hoc request pull work off them unless the user explicitly asks. When they do, record `Drifted from workflow` with date and reason in the ticket docs, then proceed.

## Context Budget Router

| Request type | Workflow | Default context | Escalate when |
| --- | --- | --- | --- |
| quick question, status check, tiny doc edit | Direct answer / Documentation | Minimal | the answer affects ticket, PR, validation, or shared-system state |
| plan or investigation | Planning | Standard | scope unclear, ticket active, tracker defines intent |
| implementation or fix | Implementation | Standard | architecture, auth, routing, data, generated code, or validation claims |
| checkpoint | Checkpoint | Full | always full: commit, PR, docs, tracker, knowledge base |
| review | Review | Standard | large, risky, UI/design-driven, ticket-linked, CI history matters |
| PR feedback | PR Feedback | Standard | feedback changes scope, risk, validation, docs, or needs GitHub write-back |
| finish / handoff / PR-ready | Git And Handoff | Full | always full: readiness and validation claims |
| work split across agents | Multi-Agent | Standard | agents share files, branches, or shared-system writes |
| deliver a checkpoint with specialist agents | Agent Delivery | Full | always full: briefs, verification, board, audit |

When a workflow says to read a standard, integration, or context file, it is required for that path. Do not deep-read unrelated docs or ticket folders for small tasks.

## Planning

1. Read `context/project-profile.md` and inspect the relevant files.
2. Identify architecture and ownership boundaries.
3. Map the request to concrete files, modules, data models, and tests.
4. Document assumptions and risks.
5. Ticket work: read `mcp/issue-tracker.md` and load tracker and knowledge-base context.
6. Branch/PR/CI work: read `mcp/github.md`.
7. Stack-specific planning: read `mcp/stack-tooling.md`.
8. UI with a design source: inspect the design source named in the profile.
9. Feature work: propose a phased Feature Plan (schema in `standards/documentation-standards.md`); let the user accept or re-chunk it.
10. Starting a ticket: use `skills/start-ticket.md`.
11. Do not change code unless asked to implement.

## Implementation

1. Check working-tree status.
2. Read `standards/code-standards.md`; on ticket branches also `standards/branch-discipline.md` and `context/branching-strategy.md`.
3. Refresh tracker context (ticket work) and GitHub context (branch/PR work).
4. Resuming? Use `skills/continue-ticket.md`: confirm whether the current checkpoint PR merged, then pick the next unchecked increment.
5. Inspect files before editing; preserve unrelated changes.
6. Make the smallest coherent change; add or update tests.
7. Run validation from `standards/quality-threshold.md`.
8. Keep the Feature Plan current; re-chunk with a plan-history note when scope shifts.
9. Update paired ticket docs when scope, behavior, validation, plan, or risks changed.
10. Summarize changed files, validation, residual risk.

## Checkpoint

1. Use `skills/checkpoint-ticket.md`.
2. Read git, quality, branch-discipline standards and the branching strategy.
3. Compute checkpoint id `N.M`; re-chunk only not-yet-done items.
4. Record covered ACs or mark it foundational.
5. Deliver on a task branch; one PR per checkpoint into the parent feature branch.
6. Meet the quality threshold; scoped semantic commit referencing `N.M` in the body.
7. Set checkpoint `in-review` with commit identity in both ticket docs; leave its box unchecked until merge.
8. Update knowledge-base page and post a tracker comment; sync the umbrella draft PR description.
9. Never close the ticket here; use `finish-ticket` for the final phase.

## Documentation

1. Decide: project-level or ticket-level.
2. Read `standards/documentation-standards.md`.
3. Project-level docs live under `.ai/` without `human-readable.md` siblings.
4. Ticket docs live under `.ai/tickets/<TICKET-ID>/` as a pair, active ticket only, seeded from tracker context.
5. Keep root shims thin; `.ai/AGENTS.md` stays canonical.

## Review

1. Use `skills/review-pr.md` for PRs.
2. Criteria: `standards/code-standards.md`, `standards/quality-threshold.md`.
3. Findings first, by severity, with file and line references; summary second.
4. If no findings, say so and list residual risks.

## PR Feedback

1. Use `skills/address-pr-feedback.md`.
2. Fix valid feedback with the smallest coherent change.
3. Ask the user before dismissing, resolving, or arguing against human feedback.
4. Report fixed items, pending decisions, validation, and write-back status.

## Git And Handoff

1. Read `standards/git-standards.md`, `standards/branch-discipline.md`, `context/branching-strategy.md`, `mcp/github.md`, and (ticket work) `mcp/issue-tracker.md`.
2. Use `checkpoint-ticket` mid-feature or `finish-ticket` to close.
3. Check `git status --short`; keep unrelated changes out; semantic commits with ticket scope.
4. Ensure ticket docs reflect tracker, knowledge base, PR, review, and CI state.
5. Report changed files, validation, skipped checks, residual risks.

## Multi-Agent

Use when work is split across sub-agents, parallel sessions, or different providers. Follow `standards/multi-agent.md`:

1. One orchestrator owns the plan, ticket docs, commits, and shared-system writes.
2. Each worker gets an explicit, non-overlapping file/area scope and a written brief.
3. Workers report results; the orchestrator verifies before integrating or claiming completion.
4. Handoffs go through ticket docs, never only through chat or tool memory.

## Agent Delivery

Use to take a checkpoint from code to PR with the specialist subagents.

1. Use `skills/deliver-checkpoint.md`; read `subagents.md` and `standards/audit.md`.
2. The main session is the orchestrator: it briefs `dev-agent`, `test-agent`, and `doc-agent`, verifies each result against the diff, and owns commits, PRs, ticket docs, board moves, and audit comments.
3. Each phase boundary: iteration audit comment first, then the board move (`mcp/project-board.md`).
4. The bugfix loop is bounded by the profile's `Bugfix loop limit`; past it, hand off to the user.
5. Stop at the open checkpoint PR. Merge is human.

## Audit

Every lifecycle skill that changes ticket state follows `standards/audit.md`: iteration audit comment at each phase boundary, as it happens, before the board card moves; effort read from the profile's effort source; never back-dated.

## Skill Authoring

1. Decide whether the skill is global or project-local.
2. Keep it concise and procedural with a clear trigger.
3. Register it in `skills.md`; do not duplicate its body elsewhere.
