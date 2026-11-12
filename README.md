# AI Project Template

Project-agnostic AI operating model. Copy it into a new repository to get shared governance, business-source rules, multi-agent collaboration rules, Git/GitHub discipline, and a ticket lifecycle (start, continue, checkpoint, finish, review, PR feedback).

## Adopt In A New Project

1. Copy `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and `.ai/` into the repository root.
2. Fill in `.ai/context/project-profile.md`. It is the **only** file that must be customized; every other file reads its values from there.
3. Fill in `.ai/context/business-context.md` (domain, stakeholders, sources of truth, glossary).
4. Fill in the stack-specific section of `.ai/standards/code-standards.md` and `.ai/mcp/stack-tooling.md`.
5. Fill in the `Project Board`, `Delivery And Audit`, and `Subagents` sections of the profile (or set `Project board: None`). Discover board IDs with the commands in `.ai/mcp/project-board.md`.
6. Optionally start `.ai/context/feature-map.md` once the codebase has features.
7. Delete any provider entrypoint that the project does not use (see `.ai/entrypoints.md`), including `.claude/` if Claude Code is not approved.
8. Ask a human to run the one-time repository settings command in `.ai/mcp/github.md`.
9. Commit with `docs: adopt ai operating model`.

## Delivery Flow

```text
start-ticket <ID>          branch, ticket docs, Feature Plan, draft umbrella PR, card -> Planning
  deliver-checkpoint <ID>  per checkpoint N.M (main session = orchestrator):
    dev-agent   -> execute       card -> Executing
    review      -> review
    test-agent  -> test          card -> Testing
    (fail)      -> bugfix loop   card -> BugFixing -> back to test (bounded)
    doc-agent   -> document
    checkpoint-ticket            checkpoint PR into the feature branch
  human merges the checkpoint PR
  continue-ticket <ID>     marks N.M done, picks the next checkpoint
finish-ticket <ID>         umbrella PR ready for review
human merges               deploy comment, card -> Done, ticket closed
```

Every arrow that moves the card is preceded by an iteration audit comment (`.ai/standards/audit.md`).

## Layout

```text
AGENTS.md                         root shim -> .ai/AGENTS.md
CLAUDE.md                         root shim -> .ai/AGENTS.md
.github/copilot-instructions.md   shim -> .ai/AGENTS.md
.claude/agents/                   Claude Code subagent wrappers -> .ai/agents/
.claude/skills/                   Claude Code skill wrappers -> .ai/skills/
.ai/
  AGENTS.md                       canonical entrypoint
  README.md                       human index
  entrypoints.md                  provider entrypoint rules
  workflows.md                    reusable workflows + context-budget router
  skills.md                       skill index and conventions
  subagents.md                    specialist subagents + orchestrator
  agents/                         dev-agent, test-agent, doc-agent definitions
  context/                        project profile, business context, branching, feature map
  standards/                      governance, multi-agent, audit, code, quality, git, branch, docs
  mcp/                            issue tracker, GitHub, project board, stack tooling contracts
  skills/                         lifecycle skills (incl. deliver-checkpoint orchestrator)
  tickets/_template/              paired ticket doc templates
```

## Placeholder Convention

Values written as `<angle-bracket-name>` (for example `<integration-branch>`, `<TICKET-ID>`) are resolved from `.ai/context/project-profile.md`. Agents must read the profile instead of guessing them.
