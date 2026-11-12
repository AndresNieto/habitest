# Project Profile

The **single configuration file** for project facts. Every other `.ai/` file refers to these values as `<placeholder>`. Replace each `TBD`. Agents must ask when a needed value is still `TBD`, never guess.

## Identity

```text
Project name:            TBD
Repository:              TBD                # <owner>/<repo>
Product summary:         TBD                # one sentence
Reference projects:      None               # e.g. a legacy app this one ports; knowledge source, not a copy target
```

## Stack

```text
Language / framework:    TBD
Architecture:            TBD                # e.g. feature-first + lightweight Clean Architecture
State management:        TBD
Routing:                 TBD
Generated code:          None               # e.g. codegen tools and file globs that must never be hand-edited
Source root:             TBD                # e.g. src/, lib/
Test root:               TBD                # e.g. test/, tests/
```

## Branching

```text
<release-branch>:        main               # production / release baseline
<integration-branch>:    development        # base for feature, bugfix, task work
Remote:                  origin
Branch types:            feature | bugfix | task
Hotfix base:             main               # hotfixes need an explicit request
Worktree policy:         in-place           # in-place = branches in the main checkout | worktree = sibling git worktrees
```

## Tickets

```text
Issue tracker:           TBD                # e.g. Jira, GitHub Issues, Linear, Azure Boards
<TICKET-ID> format:      TBD                # e.g. ABC-1234 (regex: [A-Z]+-[0-9]+)
Tracker access:          TBD                # e.g. Atlassian MCP, gh CLI, Linear MCP
Test issue type:         None               # e.g. Jira "Test" with link type "Tests"; None = scenarios in ticket comment
Transition rules:        user-named only    # never hardcode target statuses
```

## Knowledge Base

```text
Knowledge base:          None               # e.g. Confluence, Notion, GitHub Wiki
Stakeholder parent:      Not configured     # title + URL/ID of the parent page for generated stakeholder docs
Child page title:        <TICKET-ID>: <feature summary>
```

If `Stakeholder parent` is `Not configured`, agents must not create knowledge-base pages unless the user provides a parent or explicitly asks for a standalone page.

## GitHub

```text
GitHub access:           gh CLI             # gh CLI | GitHub MCP
<ai-label>:              ai-assisted        # applied to every PR an agent opens or updates
Required reviewers:      TBD                # people or teams
Merge strategy:          TBD                # squash | merge | rebase (agents never merge without explicit request)
AI attribution:          label-only         # label-only | trailer | none ; whether commits/PRs mention the AI tool
Delete branch on merge:  TBD                # yes = repo setting auto-deletes head branches; no = verify by hand after merge
Auto-close on merge:     TBD                # yes only when PRs target the default branch; otherwise close tickets by hand naming the merge commit
```

## Project Board

See `../mcp/project-board.md`. Set `Project board: None` to opt out.

```text
Project board:           None               # e.g. GitHub Projects
<board-owner>:           TBD                # org or user that owns the board
<board-number>:          TBD
<board-node-id>:         TBD                # from gh project view --format json
<status-field-id>:       TBD
Status options:          Backlog=TBD Planning=TBD Executing=TBD Testing=TBD BugFixing=TBD Done=TBD   # name=option-id
<start-date-field-id>:   TBD
<target-date-field-id>:  TBD
Other fields:            None               # e.g. Tokens=<id> Model tier=<id> Priority=<id>
```

## Delivery And Audit

See `../standards/audit.md`.

```text
<delivery-phases>:       phase-1-setup | phase-2-core | phase-3-features | phase-4-release
Label taxonomy:          one phase-* · one type (bug|enhancement|documentation|refactor|test|chore) · one area/* · one priority/P0..P2
<auditor>:               TBD                # e.g. CEO, CTO, engineering manager
<audit-timezone>:        TBD                # IANA name, e.g. America/Bogota
<audit-utc-offset>:      TBD                # e.g. GMT-05:00
<effort-source>:         TBD                # e.g. token-tracking hook metrics file, /cost, provider usage dashboard
<audit-label>:           None               # e.g. audit/blocked
```

## Subagents

See `../subagents.md`.

```text
Agent model tiers:       dev-agent=sonnet test-agent=sonnet doc-agent=haiku orchestrator=opus
Model fallback chain:    None               # e.g. primary -> fallback-1 -> fallback-2; record the effective model
Bugfix loop limit:       3                  # deliver-checkpoint stops and hands off after this many failed rounds
```

## Design Source

```text
Design source:           None               # e.g. ../<repo>-designs, Figma file URL
Design source owner:     TBD
```

## Validation

```text
Format:                  TBD                # e.g. dart format . / prettier --write . / ruff format
Lint / analyze:          TBD
Test:                    TBD
Coverage (on request):   TBD
Codegen (when models change): None
Build (release gate):    TBD
```

## AI Providers

```text
Approved AI providers:   TBD                # e.g. Codex, Claude Code, GitHub Copilot
Integrations available:  TBD                # e.g. Atlassian MCP, GitHub MCP, framework MCP
```
