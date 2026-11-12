# Create Test Scenarios

Use to create, draft, or attach QA test scenarios under a parent ticket: `create-test-scenarios parent=<TICKET-ID>`.

## Purpose

Produce test coverage for a parent ticket in the form the profile's `Test issue type` defines:

- a tracker test issue (e.g. Jira `Test` linked with type `Tests`) titled `Test <parent summary>`, or
- when `None`, a scenarios comment on the parent ticket or a section in its ticket docs.

## Workflow

1. Read `../AGENTS.md`, `../skills.md`, `../mcp/issue-tracker.md`, and the profile.
2. Require `parent`; ask if missing and not safely inferable.
3. Load the parent: summary, description, ACs, type, status, priority, labels, components, epic, existing test links.
4. If a linked test already exists, inspect it and prefer updating/reporting it unless an additional one was requested.
5. Draft scenarios from the requirements and ACs.
6. Before any tracker write, show the proposed summary, description, and link target, and get explicit approval (unless already given in the same request).
7. Create the test artifact in the parent's project; match priority; copy labels/components only when clearly relevant.
8. Link it to the parent and verify the link is visible.
9. Report keys, AC-to-scenario coverage, skipped writes, or connector failures.

## Scenario Format

```markdown
Tests <parent story or requirement summary>

## Scenarios

### Scenario 1: <behavior>
Given <initial state>
When <action or event>
Then <expected result>
```

Prefer user-visible behavior. Cover positive, empty/loading, error, permission, navigation, and accessibility cases when relevant.

## Guardrails

- No duplicate test issues when an adequate one exists.
- No tracker writes without explicit approval; never transition the parent.
- Claim full AC coverage only when every AC maps to a scenario or is explicitly out of scope.
- Do not claim test-management fields were updated unless the operation succeeded.
