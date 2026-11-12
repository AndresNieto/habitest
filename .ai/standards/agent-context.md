# Agent Context

Documentation standards: [documentation-standards.md](documentation-standards.md)

## Canonical Entrypoint

Start at the root shim and `.ai/AGENTS.md`. Provider files are shims only. `.ai/skills/` is canonical regardless of how a provider invokes skills.

## Repository Facts

All repository facts (stack, source/test roots, generated code, branches, ticket format, integrations, validation) live in `.ai/context/project-profile.md`. Do not restate them elsewhere.

## Ticket Documentation Pattern

When a request has a ticket ID:

1. Read `.ai/mcp/issue-tracker.md`; also `.ai/mcp/github.md` and `.ai/mcp/stack-tooling.md` when relevant.
2. Load the ticket, comments, links, and linked knowledge-base pages.
3. Create or update `.ai/tickets/<TICKET-ID>/human-readable.md` and `agent-context.md` from `.ai/tickets/_template/`.
4. Ticket ID in both titles; cross-link them.
5. Human doc: concise and outcome-oriented. Agent doc: explicit paths, symbols, commands, constraints, validation.

Without a ticket ID: ask for one if the work is ticket-based; project-level docs go under `.ai/` with no `human-readable.md` sibling.

## Workflow Selection

Classify before acting:

- Planning only: inspect and document, no code edits.
- Implementation: inspect, edit, validate, summarize.
- Review: findings, risks, regressions, missing tests.
- Documentation: paired docs for tickets; `.ai/` for project-level.
- Multi-agent: follow `multi-agent.md`.
- Git/handoff: follow `git-standards.md` and `branch-discipline.md`.

## Guardrails

- Preserve unrelated working-tree changes; avoid destructive Git commands.
- Never hand-edit generated files; regenerate with the profile's codegen command.
- Prefer existing patterns over new conventions.
- Avoid invisible or unintended Unicode (e.g. BOM); keep non-ASCII intentional.
- Never invent endpoints, models, repositories, services, routes, or schemas; ask.
- Never disable tests or suppress warnings to pass a check.
- Never commit, push, or merge without explicit direction (see `governance.md`).
