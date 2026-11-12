# Issue Tracker And Knowledge Base Workflow

Tool-neutral contract for ticket lifecycle context. The concrete tracker, knowledge base, and access method (MCP, CLI, API) are declared in `../context/project-profile.md`.

The tracker and knowledge base explain **intent**; the repository defines **implementation reality**. Never use them as a substitute for inspecting code.

## Default Assumption

Assume the configured access method works. If a call fails:

- state the failure plainly;
- continue with local context when safe;
- ask only for the missing details needed to avoid guessing;
- never silently skip tracker context during ticket work.

## Read Behavior

Before creating or updating ticket docs, collect:

- key, summary, description, acceptance criteria, status
- assignee, reporter, labels, components, priority, version/sprint (when available)
- parent/epic, blockers, related issues, linked knowledge-base pages
- relevant comments, especially recent product, QA, design, or engineering clarifications

From the knowledge base: linked requirement/design pages (title, stable URL), decisions, constraints, open questions, handoff notes.

## Write Behavior

Writes are purposeful, traceable, and only when the request implies lifecycle automation (start, pickup, checkpoint, finish, handoff). Inspect current state first and never duplicate notes.

Allowed tracker writes:

- start note: branch, docs path, draft PR link
- pickup note: current state, next steps, blockers
- checkpoint comment: checkpoint id, what shipped, covered ACs, validation, PR link, plan status, deferred items
- handoff note: scope, validation, skipped checks, residual risks, PR
- status transition: only to a state the user names or the project workflow defines. Never hardcode target statuses; they are tracker-specific.

Allowed knowledge-base writes:

- create stakeholder pages only under the configured `Stakeholder parent` (or a more specific page the ticket links)
- update implementation/delivery notes only on pages clearly intended for that
- never overwrite stakeholder-authored requirements unless explicitly asked

## Local Sync

Reflect tracker context in `.ai/tickets/<TICKET-ID>/`: requirements and ACs in `human-readable.md`; status, links, constraints, validation expectations, open questions in `agent-context.md`. Refresh the source-traceability block each time (see `../standards/documentation-standards.md`).

Conflicts: prefer code for implementation facts, tracker/knowledge base for product intent, unless the user says otherwise. Surface the conflict in the response and the docs.

## Lifecycle Hooks

| Skill | Tracker action |
| --- | --- |
| start-ticket | read ticket + linked pages; check KB parent; seed docs; start note if lifecycle automation requested |
| continue-ticket | refresh ticket and comments; update docs if scope changed; pickup note when useful |
| checkpoint-ticket | checkpoint comment; update stakeholder page if configured; never transition to done |
| finish-ticket | verify ACs; handoff note; transition only to a named target |

## Guardrails

- No secrets or sensitive environment values in tickets or pages.
- No unrelated working-tree changes in comments.
- No claimed test results without evidence; no AC marked complete without evidence or sign-off.
- Keep comments concise and useful for product, QA, and engineering.

## Adapter Notes

Fill in tool-specific details on adoption (e.g. for Jira: cloud ID, custom field IDs for acceptance criteria/story points, link type for tests; for GitHub Issues: label conventions, project board).

```text
Adapter:                 TBD
Acceptance-criteria field: TBD
Notes:                   TBD
```

### GitHub Issues Adapter

When the tracker is GitHub Issues:

- **Creation:** title `<type>(<scope>): <what>`; exactly one phase, one type, one area, and one priority label (taxonomy in the profile); milestone = phase; assignee by GitHub handle; then add it to the board (`project-board.md`).
- **Acceptance criteria** are `- [ ]` checkboxes in the issue body and are live state: tick each to `- [x]` as it is verified. A comment saying "all ACs met" does not update what readers see.
- **Audit fields** (`../standards/audit.md`) live in an `## Audit` table in the issue body.
- **Iteration audit comments** are issue comments: `gh issue comment <n> --body "<block>"`.
- **Closing:** `Closes #<n>` only auto-closes when the PR targets the default branch; otherwise close by hand naming the merge commit (`github.md`).
- Create missing labels once: `gh label create "<label>" --color <hex>`.

Issue body seed:

```markdown
## Context
<why this exists; link to the ticket docs>

## Acceptance criteria
- [ ] AC1 - …

## Audit
| Field | Value |
| --- | --- |
| Phase | <phase> |
| Area | <area> |
| Start date | YYYY-MM-DD |
| Target date | YYYY-MM-DD |
| Actual end date | YYYY-MM-DD |
| Branch | <branch> |
| PR | #… |
| Model tier | … |
| Start tokens | … |
| End tokens | … |
| Tokens (Δ) | … |
```
