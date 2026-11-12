# Documentation Standards

## Document Types

- **Agentic resources**: reusable instructions under `.ai/` (standards, workflows, skills, context, integration contracts, entrypoints). Concise, operational, link instead of duplicate, never paired with `human-readable.md`.
- **Ticket docs**: paired deliverable context under `.ai/tickets/<TICKET-ID>/`.

## Ticket Doc Scope

- Load only the active ticket's folder.
- Cross-ticket reading only on explicit user request with concrete criteria, and only the named tickets.
- Other tickets' plans, decisions, and risks are stale by default for the current task.

## Paired Ticket Docs

```text
.ai/tickets/<TICKET-ID>/
  human-readable.md
  agent-context.md
```

Start from `.ai/tickets/_template/`. Both titles include the ticket ID; each links to the other.

`human-readable.md`: source traceability and sync status, thin stakeholder summary, tracker and knowledge-base links, story/summary, acceptance criteria, proposed solution, Feature Plan, risks and assumptions, validation plan, handoff.

`agent-context.md`: source ownership of key facts, lifecycle write status, files and symbols, architecture constraints, implementation sequence, data-flow notes, validation commands, guardrails and non-goals, Feature Plan table.

### Source Traceability (both docs)

- ticket URL or key; linked knowledge-base pages or `None identified`
- knowledge-base parent status (from the profile)
- last tracker refresh date
- ticket status, priority, assignee, reporter, components, labels, links (when available)
- local sync status with tracker and knowledge base
- lifecycle note status: start, pickup, handoff, transition (`posted` / `skipped` / `deferred`)
- source ownership labels: `Tracker`, `Knowledge base`, `Code`, `GitHub`, `Design source`, `Reference project`, `Engineer decision`
- workflow adherence: `On workflow` or `Drifted from workflow - <date> - <reason>`

Durable stakeholder content lives in the knowledge base; implementation-ready context lives in the ticket folder, versioned with the code. Link, do not duplicate. `human-readable.md` stays present even when a full knowledge-base page exists.

## Feature Plan

Lives only inside the paired ticket docs; no separate plan file.

- **Phase** `N`: top-level milestone with goal and exit criteria; a buildable, deliverable, independently reviewable slice that passes validation on its own, usually a bit larger than one checkpoint.
- **Checkpoint** `N.M`: a reviewable increment under phase `N`, marked with `checkpoint-ticket`.

Statuses: `not-started`, `in-progress`, `in-review` (PR open), `done` (PR merged), `deferred`.

Rules:

- Check a box only when the item is `done`. A phase is done when its checkpoints are done and exit criteria met.
- Proposed at `start-ticket`, accepted or re-chunked by the user, recorded before substantial implementation.
- Living plan: re-chunk any not-yet-done item; never renumber a merged checkpoint. One-line plan-history note per change.
- Each checkpoint records covered ACs or `foundational`, plus commit identity (id, hash, PR) and peer-reviewers.
- AC coverage checklist mirrors the tracker; an AC is checked when a merged checkpoint satisfies it.
- `finish-ticket` warns on any unchecked phase, checkpoint, or AC and requires completion, deferral with reason, or sign-off.

Human-readable form:

```markdown
## Feature Plan

Status legend: not-started | in-progress | in-review | done | deferred. Done means merged.

- [ ] Phase 1 - <title> - in-progress
  - Goal: <goal>
  - Exit criteria: <criteria>
  - Checkpoints:
    - [x] 1.1 - <scope> - done - <commit> / <PR #> / <date> - peer-reviewers: <name>, <name>
    - [ ] 1.2 - <scope> - in-review - <PR #>

Acceptance criteria coverage:

- [x] AC1 - <text> - covered by 1.1
- [ ] AC2 - <text> - not yet covered
- Foundational work without a direct AC: 1.2

Plan history:
- <date> - initial plan accepted
```

Agent form:

```markdown
## Feature Plan

| Phase | Checkpoint | Scope | Status | Commit / PR | ACs | Peer-reviewers | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 - <title> (in-progress) | 1.1 | <scope> | done | <hash> / <PR #> | AC1 | <name> | lint+test |
| 1 - <title> (in-progress) | 1.2 | <scope> | in-review | <PR #> | foundational | - | lint+test |

Plan history:
- <date> - <change>
```

## Work Without A Ticket ID

Ask for one. If the user proceeds without, use `.ai/tickets/no-ticket-<short-name>/`.

## Maintenance

- Durable project facts -> `.ai/context/`.
- Reusable process rules -> `.ai/standards/` or `.ai/workflows.md`.
- Ticket plans -> `.ai/tickets/<TICKET-ID>/`.
- Link standards from ticket docs; never copy them.
- Keep file names stable so agents can discover them.
