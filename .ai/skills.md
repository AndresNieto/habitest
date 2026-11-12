# AI Skills

Skills capture repeatable procedures. Docs reference skills; they do not duplicate skill bodies.

## Invocation Awareness

Providers expose skills differently (auto-loaded metadata, explicit file references, plain docs). This project does not depend on one mechanism: the canonical definitions are `.ai/skills/*.md`.

Agents:

- start from `.ai/AGENTS.md` and discover skills here;
- load `.ai/skills/<skill>.md` before applying it;
- prefer project-local skills over global or provider skills with similar names;
- treat provider wrappers (`.codex/skills/`, `.claude/skills/`, `.github/skills/`, `.github/prompts/`) as pointers only.

## Context Budget

Load progressively: the matching skill first, then standards, integration docs, ticket docs, code, or external context only as the skill path and risk require. `checkpoint-ticket` and `finish-ticket` default to `Full`. The budget never weakens branch discipline, validation, traceability, or human-in-the-loop gates.

## Ticket Identity

The ticket ID (`<TICKET-ID>`, format defined in the profile) is the identifier across branch, docs folder, Feature Plan, commits, PRs, and handoffs.

```text
start-ticket <TICKET-ID>
continue-ticket <TICKET-ID>
deliver-checkpoint <TICKET-ID>
checkpoint-ticket <TICKET-ID>
finish-ticket <TICKET-ID>
```

Checkpoints are not invoked by their own id: `checkpoint-ticket` derives the next `N.M` from the active phase. When the ticket ID is omitted, infer it from the branch when safe; otherwise ask.

## Skill Index

| Skill | Use when | Entrypoint |
| --- | --- | --- |
| Start Ticket | starting ticket work: branch, paired docs, Feature Plan, scaffolding commit, draft feature PR | `skills/start-ticket.md` |
| Continue Ticket | resuming ticket work; reconciles checkpoint merge state and plan | `skills/continue-ticket.md` |
| Deliver Checkpoint | orchestrating the next checkpoint through `dev-agent`, review, `test-agent`, bugfix loop and `doc-agent`, ending in `checkpoint-ticket` | `skills/deliver-checkpoint.md` |
| Checkpoint Ticket | marking a milestone `N.M` mid-feature | `skills/checkpoint-ticket.md` |
| Finish Ticket | final handoff; gates on plan and AC checkboxes; marks PR ready | `skills/finish-ticket.md` |
| Review PR | reviewing a pull request; blockers / nice-to-have / nitpicks | `skills/review-pr.md` |
| Address PR Feedback | responding to PR review feedback with human-in-the-loop dismissal | `skills/address-pr-feedback.md` |
| Create Test Scenarios | drafting QA test scenarios linked to a parent ticket | `skills/create-test-scenarios.md` |

Integration contracts (not skills, but referenced by them): `mcp/issue-tracker.md`, `mcp/github.md`, `mcp/project-board.md`, `mcp/stack-tooling.md`.

Specialist subagents (not skills; launched by `deliver-checkpoint`): see `subagents.md`.

## Patterns

### Dual-Track Ticket Docs

```text
.ai/tickets/<TICKET-ID>/
  human-readable.md   intent, scope, plan, risks, validation (for people)
  agent-context.md    paths, symbols, commands, constraints, plan table (for agents)
```

Ticket ID in both titles; cross-linked; only for ticket/feature work. Seeds live in `tickets/_template/`.

### Feature Plan

- Phases are buildable, deliverable, independently reviewable slices; checkpoints `N.M` are reviewable increments under a phase.
- Checkpoint `in-review` while its PR is open; `done` only on merge.
- Phase `done` only when its exit criteria are met.
- Re-chunk freely except merged checkpoints; record plan history.
- Record commit identity (id, hash, PR), covered ACs, and peer-reviewers.
- Schema: `standards/documentation-standards.md`.

## Adding A Skill

1. Clear name and trigger condition.
2. Concise, procedural body with Inputs, Context Budget, Workflow, Output.
3. Register it in the index above and link related workflows.
4. Add provider wrappers only if the provider needs them, pointing back here.
