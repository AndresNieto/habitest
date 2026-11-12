# AGENTS.md

Canonical AI entrypoint for this repository. Every supported assistant, coding agent, sub-agent, and automation starts here.

## Project

Project facts (name, stack, architecture, branches, ticket key, validation commands, integrations) are **not** written here. They live in [context/project-profile.md](context/project-profile.md). Read it before any task that depends on a project fact. Never guess a value the profile defines; if the profile says `TBD`, ask.

## Required Reading Order

This is a routing map, not permission to load everything. Read this file first, then load the smallest set of resources that safely supports the task. Expand only when size, uncertainty, lifecycle state, external writes, validation claims, or risk require it.

1. This file.
2. [Project Profile](context/project-profile.md) — project facts and configuration.
3. [Governance](standards/governance.md) — authority, approvals, human-in-the-loop, security.
4. [Multi-Agent Collaboration](standards/multi-agent.md) — when more than one agent or session works on the repo.
5. [Documentation Standards](standards/documentation-standards.md).
6. [Agent Context](standards/agent-context.md) — guardrails and workflow selection.
7. [Code Standards](standards/code-standards.md) — before implementation or review.
8. [Quality Threshold](standards/quality-threshold.md) — before handing work back.
9. [Git Standards](standards/git-standards.md) — before branches, commits, PRs.
10. [Branch Discipline](standards/branch-discipline.md) — during ticket branch work.
11. [Workflows](workflows.md) — before planning, implementing, reviewing, documenting.
12. [Skills](skills.md) — before creating or using skills.
13. [Entrypoints](entrypoints.md) — when adding or auditing provider entrypoints.
14. [Issue Tracker Workflow](mcp/issue-tracker.md) — before ticket lifecycle work.
15. [GitHub Workflow](mcp/github.md) — before branch, PR, review, CI work.
16. [Stack Tooling Workflow](mcp/stack-tooling.md) — before stack-specific implementation, diagnostics, or validation.
17. [Business Context](context/business-context.md) — when product intent, domain rules, or stakeholders matter.
18. [Branching Strategy](context/branching-strategy.md) — before any branch work.
19. [Feature Map](context/feature-map.md) — when navigating feature ownership.
20. [Audit](standards/audit.md) — before any lifecycle step that moves a ticket or claims effort.
21. [Project Board Workflow](mcp/project-board.md) — before adding tickets to or moving cards on the board.
22. [Subagents](subagents.md) — before launching, briefing, or acting as `dev-agent`, `test-agent`, or `doc-agent`.
23. Lifecycle skills: [start](skills/start-ticket.md), [continue](skills/continue-ticket.md), [deliver checkpoint](skills/deliver-checkpoint.md), [checkpoint](skills/checkpoint-ticket.md), [finish](skills/finish-ticket.md), [review PR](skills/review-pr.md), [address PR feedback](skills/address-pr-feedback.md), [test scenarios](skills/create-test-scenarios.md).
24. For ticket work, read `.ai/tickets/<TICKET-ID>/human-readable.md` and `agent-context.md` for the **active ticket only**.

## Context Budget

Token usage scales with task size, uncertainty, and risk.

- `Minimal`: tiny doc edits, status checks, direct answers. This file plus the directly relevant file.
- `Standard`: small/medium implementation, docs, or review. Add the selected workflow or skill, relevant standards, files being changed.
- `Expanded`: ticket lifecycle, PR coordination, external-source reconciliation, unclear scope. Add active ticket docs, relevant integration docs, focused external context.
- `Full`: checkpoint, finish, high-risk review, broad architecture, generated code, auth, routing, data integrity, security, release posture. Reconcile all relevant local, external, validation, and handoff context.

Escalate when:

- shared-system writes are needed (tracker, knowledge base, GitHub);
- the response will claim acceptance-criteria coverage, validation, PR readiness, or handoff readiness;
- the task touches generated code, auth, routing, persistence, security, CI, or architecture;
- local docs, code, and external systems conflict or look stale;
- the user asks for historical, stakeholder, cross-ticket, or cross-system context.

Stop loading once you can name the relevant files, lifecycle obligations, risks, validation needs, and next safe action.

## Core Rules

- Preserve unrelated working-tree changes. Never revert user changes unless asked.
- Prefer small, testable changes aligned with the existing architecture.
- Keep project facts in repository docs, not only in tool memory.
- Provider entrypoints are shims pointing here; `.ai/skills/` is the canonical skill source.
- The ticket ID is the canonical identifier for branches, docs, plans, commits, PRs, and handoffs. Invoke lifecycle skills by ticket ID: `start-ticket <TICKET-ID>`. Branch slugs are labels only.
- For feature work, propose a phased Feature Plan, let the user accept or re-chunk it, and mark milestones as checkpoints `N.M`.
- `start-ticket` records the plan, commits scaffolding, and opens a draft feature PR into `<integration-branch>` labelled `<ai-label>`; `finish-ticket` marks it ready.
- A checkpoint is `done` only when its PR merges; until then it is `in-review`.
- Track the Feature Plan and acceptance-criteria coverage as checkboxes in paired ticket docs; gate `finish-ticket` on them.
- Stay on the defined workflows. Deviate only when the user explicitly asks, and record `Drifted from workflow` with date and reason in the ticket docs.
- Meet the [Quality Threshold](standards/quality-threshold.md) before reporting completion.
- Load only the active ticket's folder. Never treat `.ai/tickets/` as shared context.
- Post an iteration audit comment at every phase boundary, before the board card moves ([Audit](standards/audit.md)). The comment is the evidence; the column is only the claim.
- Specialist work goes through the subagents in [Subagents](subagents.md); the main session orchestrates with `deliver-checkpoint` and owns every commit and shared-system write.
- Never commit, push, merge, transition tickets, or write to shared systems without the authority defined in [Governance](standards/governance.md).

## Validation

Validation commands are defined in the profile under `Validation`. Run them; do not claim results you did not observe.
