# Business Context

Durable product and domain facts agents need to make correct decisions. Keep it short; link to the knowledge base for long-form material.

## Product

- Purpose: TBD
- Primary users / personas: TBD
- Key user journeys: TBD

## Sources Of Truth

| Concern | Owner | Notes |
| --- | --- | --- |
| Scope and acceptance criteria | Issue tracker | the ticket is authoritative for intent |
| Durable decisions, stakeholder docs | Knowledge base | link, do not duplicate |
| Visual and interaction design | Design source (profile) | when configured |
| Implementation reality | Code | wins on implementation facts |
| Remote PR / review / CI state | GitHub | wins on remote state |
| Working-tree state | Local Git | wins on unstaged/unpushed facts |
| Trade-offs not covered above | Engineer decision | record who and when |

Conflict rule: prefer code for implementation facts and the tracker/knowledge base for product intent, unless the user says otherwise. Surface every conflict in the response and the ticket docs; never silently pick one. When a design and an acceptance criterion conflict, ask.

## Stakeholders

| Role | Name / team | Cares about |
| --- | --- | --- |
| Product owner | TBD | scope, priority |
| QA | TBD | test scenarios, AC evidence |
| Engineering lead | TBD | architecture, review |

## Business Rules

Domain invariants agents must never break. One line each, with source.

- TBD

## Glossary

| Term | Meaning |
| --- | --- |
| TBD | TBD |

## Non-Goals

- TBD
