# Code Standards

Use when implementing or reviewing code. Part 1 is language-agnostic and always applies. Part 2 is the project's stack-specific section; fill it in on adoption.

## Part 1 - Universal

### Style

- Functions: single responsibility, descriptive names, minimal nesting, early returns.
- Classes: single responsibility, minimal public API, prefer immutability.
- Avoid boolean parameters that switch behavior; prefer named/enum parameters or separate functions.
- Follow the project's formatter and linter configuration; do not fight it.

### Architecture

- Respect the architecture declared in the profile and existing module boundaries.
- Keep business rules out of UI/view code when a domain/service layer is the better owner.
- Map external DTOs to domain models at the boundary; keep domain models free of transport concerns.
- Obtain dependencies through the project's DI mechanism; do not instantiate collaborators inside business logic. Do not add a second DI or state-management framework without explicit agreement.

### Size Guidelines (signals, not blockers)

- Files: prefer < 300 lines; 400+ means extract.
- Classes: prefer < 150; decompose past 200.
- Functions: prefer < 20; extract past 30 (builders, switch expressions, generated code excepted).
- UI components: prefer < 100; split past 150.

When a file outgrows these, extract sibling modules (area-grouped components, shared helpers, mappers) and leave the original as composition/orchestration.

### Reference Projects

If the profile lists reference projects, use them to understand behavior, domain language, and integrations, not as code to copy. Translate concepts into this project's architecture and cite imported assumptions in ticket docs.

### Error Handling

- Convert infrastructure errors into domain/UI-facing failures at boundaries; never surface raw transport errors to users.
- No empty catch blocks: every caught error is recovered, propagated, or logged.

### Logging

- Use the project logger, not print/console.
- Never log secrets, tokens, auth headers, or personal data.

### Comments

- Prefer self-explanatory code. Comment the why, business rules, and non-obvious constraints.
- No commented-out code, no TODO/FIXME as a substitute for finishing, no placeholder implementations in shipping code.
- Comments never carry history: no ticket or PR numbers, dates, "v2", "new flow", "supersedes", who changed what, or contrasts with removed code ("NOT X"). That belongs in commits, PRs, and ticket docs. `TODO(<TICKET-ID>): ...` is the one allowed reference, because it points to open work.
- Test before committing: could a teammate who never saw the ticket understand the comment in one read? If not, rewrite or delete it. When touching a file, fix existing comments that break this rule.

### Dependencies

Before adding one, verify it is necessary, maintained, license-compatible, compatible with current SDK/runtime constraints, and not already covered by an existing dependency.

### Generated Code

Never hand-edit generated files. Change the source and rerun the profile's codegen command, then lint and test.

### UI (when applicable)

- Use existing theme tokens; no hardcoded colors/sizes that belong in the theme.
- Responsive layouts; support dark mode, text scaling, and screen readers; label icon-only controls; keep contrast adequate.
- Follow the design source when one is configured.

### Tests

- Add or update tests when behavior changes.
- Prefer domain/unit tests for business rules; component/integration tests for visible behavior.
- Assert observable behavior, not private structure.

## Part 2 - Stack-Specific (fill in)

```text
Linter config:            TBD
Language conventions:     TBD   # quotes, typing, immutability keywords
Folder layout:            TBD   # e.g. core/, features/<f>/{domain,data,presentation}
State management rules:   TBD
Routing rules:            TBD
Error / failure types:    TBD
Logging helper:           TBD
Localization:             TBD
```
