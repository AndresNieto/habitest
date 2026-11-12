# Audit

How delivery stays auditable without extra reporting: effort tracking, iteration audit comments, phases with dates, and the audit protocol. Values in `<angle-brackets>` come from the `Delivery And Audit` section of `../context/project-profile.md`.

Rule of thumb: if it is not a ticket on the board, with a branch, dates, a phase label, and effort accounting, it did not happen.

## Effort Tracking

- AI-assisted work is measured in **tokens** (input + output) read from `<effort-source>`; derived dollar figures drift with pricing and are supplementary at most.
- Read the numbers for **the session that did the work**, not the newest file you find.
- `not available` is allowed only when no source exists for that session. A missing tracker is itself an audit finding.
- Session-wide banners or warnings from tracking hooks are informational; they never stop already-authorized work.

## Iteration Audit Comment

Every phase boundary produces one comment on the ticket, posted **as it happens** and **before** the board card moves. The comment is the evidence; the board column is only the claim.

```text
### Iter N — <phase>
- when: <YYYY-MM-DD HH:MM> <audit-utc-offset>
- model: <effective model or tier>  (fallback: <– | model used instead>)
- agent: <orchestrator | dev-agent | test-agent | doc-agent | human>
- tokens_in: <n>   tokens_out: <n>   cum: <n>
- checkpoint: <N.M or gate validated>
- action: <what was done>
- next: <next phase / next step>
```

- `when` uses `<audit-timezone>` regardless of the machine: `TZ=<audit-timezone> date "+%Y-%m-%d %H:%M <audit-utc-offset>"`. Never back-date it.
- Record the **effective** model, including fallbacks.
- Phases: `planning`, `enhance`, `execute`, `review`, `test`, `bugfix`, `deploy`. Their board statuses are in `../mcp/project-board.md`.
- Where the comment goes: the issue tracker ticket (`../mcp/issue-tracker.md`). With GitHub Issues: `gh issue comment <n> --body "<block>"`.

## Ticket Audit Fields

Each ticket carries, in its description or tracker fields: phase, area, start date, target date, actual end date, branch, PR, model tier, start tokens, end tokens, Δ tokens. Fields that also exist on the board must match.

## Phases And Milestones

Delivery is split into the phases named in `<delivery-phases>`. Each phase is a milestone with a start date, end date, owner, cards in scope, and total effort. Every ticket carries exactly one phase label and its own start and target dates. Always write absolute dates (`YYYY-MM-DD`).

## Audit Protocol

`<auditor>` can audit any ticket, phase, or contributor at any time from the board and the tickets.

| Dimension | Where | Pass condition |
| --- | --- | --- |
| Effort | ticket audit fields + iteration comments | start/end tokens and Δ recorded |
| Dates | board fields + milestone | start and end set; slips explained |
| Labels | ticket labels | one phase, one type, one area, one priority |
| Branch and commits | PR | correct base, semantic commits, ticket ID in scope |
| Plan and ACs | ticket docs + PR | every AC checked with evidence, deferred, or signed off |
| Board hygiene | board status + iteration comments | moved in real time, each move backed by a comment; Done = merged and closed |
| Agent use | iteration comments | agent and effective model recorded; human checkpoints respected |

Cadence: a gate review at each phase end date plus a weekly board sweep. A ticket that reached Done with missing data is reopened as an audit finding (label `<audit-label>` when configured).
