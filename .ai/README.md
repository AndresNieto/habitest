# AI Resource Index

Project-level AI operating model. Start at `.ai/AGENTS.md`.

## What Lives Here

- `AGENTS.md`: canonical agent entrypoint.
- `entrypoints.md`: provider entrypoint map and onboarding rule.
- `workflows.md`: reusable workflows and the context-budget router.
- `skills.md`: skill index and conventions; `skills/` holds definitions.
- `subagents.md`: specialist subagents (`dev-agent`, `test-agent`, `doc-agent`) and the orchestrator; `agents/` holds definitions.
- `context/project-profile.md`: the single configuration file for project facts.
- `context/business-context.md`: domain, stakeholders, sources of truth, glossary.
- `context/branching-strategy.md`: branch roles, bases, PR targeting.
- `context/feature-map.md`: feature ownership and navigation.
- `standards/`: governance, multi-agent, audit, code, quality, documentation, git, branch discipline.
- `mcp/`: integration contracts (issue tracker / knowledge base, GitHub, project board, stack tooling).
- `tickets/`: one folder per ticket with paired docs; `_template/` holds the seeds.

## Core Principle

All agents converge on the same project resources instead of separate instructions, memory, or undocumented conventions. New providers are onboarded by adding a thin entrypoint that points back to `.ai/AGENTS.md`.
