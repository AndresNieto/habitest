# AI Subagents

Specialist subagents are workers with one job each. The canonical definitions live in `.ai/agents/*.md`; provider files (for example `.claude/agents/<agent>.md`) are thin wrappers that point back here. Roles, briefs, ownership, and verification follow [Multi-Agent Collaboration](standards/multi-agent.md).

> This index is named `subagents.md`, not `agents.md`: on case-insensitive file systems (macOS, Windows) `agents.md` would collide with the canonical `AGENTS.md`.

## Agent Index

| Agent | Phase | Owns | Never touches | Definition |
| --- | --- | --- | --- | --- |
| `dev-agent` | execute, bugfix | production code and the unit tests next to it | ticket docs, commits, pushes, PRs, shared systems | `agents/dev-agent.md` |
| `test-agent` | test | verification tests, fixtures, the pass/fail verdict per AC | production code, ticket docs, commits, shared systems | `agents/test-agent.md` |
| `doc-agent` | document | project docs (READMEs, `context/feature-map.md`, changelog, API/setup docs); drafts of ticket-doc updates, PR body, audit comment | production code, tests, ticket docs (drafts only), shared systems | `agents/doc-agent.md` |

## Orchestrator

The orchestrator is **the main session the user is talking to**, running the [`deliver-checkpoint`](skills/deliver-checkpoint.md) skill. It is not an agent definition: subagents cannot launch other subagents, so an "orchestrator agent" could never call the specialists.

The orchestrator owns everything the specialists do not: the Feature Plan, ticket docs, branch, commits, PRs, board moves, iteration audit comments, and every shared-system write. It briefs each agent, verifies what comes back, and hands the PR to a human.

| Who | Owns |
| --- | --- |
| Person | picks the ticket, accepts the Feature Plan, answers questions, merges |
| Orchestrator (main session + `deliver-checkpoint`) | preconditions, briefs, verification against the diff, review, bugfix loop, commits, PRs, ticket docs, board, audit comments, hand-off |
| `dev-agent` | implementation |
| `test-agent` | verification |
| `doc-agent` | documentation and drafts |

## Rules For Every Agent

1. The `.ai/` standards bind agents exactly as they bind people. Read `.ai/AGENTS.md` and the profile first.
2. One agent, one job. A specialist that needs to go outside its scope stops and reports.
3. Agents only know their brief. The orchestrator passes the brief fields from `standards/multi-agent.md` (goal, ticket ID, checkpoint `N.M`, exact scope, what is ruled out, applicable standards, output format).
4. Agents verify, then report: files changed, commands run with their results, what is left. Failures are reported as failures, with output.
5. Agents never commit, push, open PRs, move board cards, transition tickets, or write to shared systems. Those belong to the orchestrator, under [Governance](standards/governance.md).
6. Agent output is a claim. The orchestrator verifies it before integrating or reporting it.
7. Each completed phase produces an iteration audit comment ([Audit](standards/audit.md)) naming the agent and its effective model, posted by the orchestrator.

## Model Tiers

Suggested tiers come from the profile (`Agent model tiers`). Record the effective model, including any fallback, in the iteration audit comment.

## Adding An Agent

1. Confirm a specialist is really needed; prefer extending a skill when the work is a procedure rather than a separate role.
2. Write `.ai/agents/<agent>.md` with: Purpose, Inputs (brief), Scope (may change / must not touch), Workflow, Rules, Output.
3. Register it in the index above.
4. Add a thin provider wrapper only for approved providers that need one (see `entrypoints.md`).
5. Test it on one small, real ticket; tune its wrapper `description` until the provider delegates to it at the right moments.
6. Merge through its own `docs` / `chore` PR, as for any `.ai/` change.
