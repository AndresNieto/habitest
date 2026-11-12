# Project Board Workflow

Contract for the project board (GitHub Projects by default): adding tickets, moving status, and keeping board fields in sync with the ticket. Board identity, field IDs, and status option IDs live in the `Project Board` section of `../context/project-profile.md`. If the profile says `Project board: None`, skip this file.

The board is the real-time view for people and the auditor. It never runs ahead of its evidence: every status change is preceded by an iteration audit comment (`../standards/audit.md`).

## Status Lifecycle

```text
Backlog -> Planning -> Executing -> Testing -> BugFixing -> Done
```

Use the status names the profile defines; never invent new ones.

Habi Board has the columns `Backlog / Ready / In progress / In review / Done`. Lifecycle statuses map to them as listed in the profile: Planning -> Ready, Executing -> In progress, Testing -> In review, BugFixing -> In progress (the iteration comment says `bugfix`), Done -> Done.

| Audit phase | Board status | Moved by |
| --- | --- | --- |
| `planning` | Backlog (not picked up) or Planning | `start-ticket` |
| `enhance` | Planning | `start-ticket` / user |
| `execute` | Executing | `deliver-checkpoint`, `continue-ticket` |
| `review`, `test` | Testing | `deliver-checkpoint`, `checkpoint-ticket` |
| `bugfix` | BugFixing | `deliver-checkpoint`, `address-pr-feedback` |
| `deploy` | Done | after the human merge, via `finish-ticket` follow-up |

| Transition | Also required |
| --- | --- |
| Backlog -> Planning | labels (phase, type, area, priority), milestone, board `Start date` |
| Planning -> Executing | branch exists, assignee set, start tokens recorded, board `Target date` |
| Executing -> Testing | pushed, PR open, CI running |
| Testing -> BugFixing | defects listed in the iteration comment |
| Testing -> Done | merged, Definition of Done met (`../standards/quality-threshold.md`), end date and end tokens recorded |

A card in Done while its ticket is still open is a mismatch: comment what was found, then move it back to the status that reflects reality.

## Discovering IDs (once, on adoption)

```text
gh project list --owner <board-owner>
gh project view <board-number> --owner <board-owner> --format json            # node id
gh project field-list <board-number> --owner <board-owner> --format json      # field ids, status option ids, field types
```

Record the results in the profile. Verify each date field's `type` before relying on `--date`: some boards expose dates as repository issue fields instead of project fields, and `item-edit` fails on those.

## Commands

```text
# add a ticket to the board (on creation)
gh project item-add <board-number> --owner <board-owner> --url <issue-url>

# find the item id of an issue
gh project item-list <board-number> --owner <board-owner> --format json --limit 500 \
  | jq -r '.items[] | select(.content.number == <issue-number>) | .id'

# move status (after posting the iteration audit comment)
gh project item-edit --project-id <board-node-id> --id <item-id> \
  --field-id <status-field-id> --single-select-option-id <status-option-id>

# set a date field
gh project item-edit --project-id <board-node-id> --id <item-id> \
  --field-id <start-date-field-id> --date <YYYY-MM-DD>
```

## Write Rules

- Board writes follow the same authority as other shared-system writes (`../standards/governance.md`): only during lifecycle skills or on explicit request.
- Only the orchestrator moves cards; subagents never do.
- Board fields that exist must match the ticket's audit fields. Fields the board lacks stay in the ticket until someone creates them (a one-time admin action in the board settings).
- Never move a card to Done before the PR is merged and the Definition of Done is met.

## Guardrails

- Inspect the current status before moving; never skip back and forth to fake progress.
- Record each board write (posted / skipped / deferred) in the ticket docs' lifecycle status.
