# Multi-Agent Collaboration

Rules for work shared by several agents: sub-agents spawned by one session, parallel sessions, different providers, or an agent handing off to a human and back.

## Roles

- **Orchestrator**: the session the user is talking to. Owns the Feature Plan, ticket docs, branch, commits, PRs, and every shared-system write. Integrates and verifies worker output.
- **Worker**: a sub-agent or parallel session with a narrow brief. Reads freely within its scope; writes only inside its assigned files/areas; never commits, pushes, or writes to shared systems unless the orchestrator's brief explicitly delegates it.
- **Reviewer**: an agent asked for an independent read. Gets the code, not the orchestrator's conclusion, so its judgment is not anchored.
- **Specialist workers**: `dev-agent`, `test-agent`, and `doc-agent`, defined in `../subagents.md` and orchestrated by the `deliver-checkpoint` skill.

The orchestrator is always the main session. Subagents cannot launch other subagents, so orchestration never lives in an agent definition; it lives in a skill the main session runs.

## When To Split Work

Split only when pieces are genuinely independent (different files, modules, or research questions) or an independent review is wanted. Do not delegate a lookup the orchestrator can do in a few steps; every handoff loses detail.

## Writing A Brief

Each worker brief states:

1. Goal and the definition of done.
2. Ticket ID and the active checkpoint `N.M`, if any.
3. Exact scope: files/directories it may change, and what it must not touch.
4. What is already known or ruled out.
5. Which `.ai/` standards and skills apply.
6. Expected output format (findings list, changed files + validation result, etc.).

## Ownership And Conflicts

- One owner per file per moment. Two agents never edit the same file concurrently.
- Parallel workers on the same branch must have disjoint scopes; otherwise serialize, or use separate branches only if the profile's worktree policy allows it.
- Only the orchestrator edits `.ai/tickets/<TICKET-ID>/` docs, to avoid plan conflicts. Workers report facts; the orchestrator records them.
- A worker that discovers it needs to go outside its scope stops and reports instead of expanding.

## Verification

- Worker output is a claim, not a fact. The orchestrator verifies changed files, reruns validation, and checks for regressions before integrating.
- Never report a worker's result to the user as verified unless the orchestrator verified it.
- Never fabricate or predict a pending worker's result.
- When a worker's report and the diff disagree, the diff wins.

## Handoffs

- Durable handoffs (between sessions, providers, or people) go through the paired ticket docs: current checkpoint, next step, open questions, validation state. Chat history and tool memory are not handoff channels.
- A resuming agent uses `continue-ticket` and treats docs that contradict the code as stale.

## Cross-Ticket Isolation

- Each agent loads only its active ticket folder.
- Cross-ticket research happens only on explicit user request with concrete criteria, reading only the named tickets.

## Budget

- Keep the number of parallel agents proportional to the task; the user pays for every agent.
- Prefer one well-briefed worker over several vague ones.
