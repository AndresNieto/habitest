# Stack Tooling Workflow

Contract for framework/language tooling (SDK docs, package metadata, analyzer, diagnostics, codegen, test tooling), whether via an MCP server, CLI, or documentation. Fill in on adoption.

```text
Tooling:                 TBD   # e.g. Dart/Flutter MCP, TypeScript language server, Python tooling
Covers:                  TBD   # SDK/framework docs, package lookup, analyzer, diagnostics, codegen
```

## Rules

1. Inspect local project files and existing patterns before relying on framework examples.
2. Use the tooling for version-sensitive SDK, framework, package, analyzer, codegen, and test questions.
3. Preserve the project's architecture and conventions declared in the profile and code standards.
4. Local validation commands are the source of truth; tooling interprets failures, it does not replace running them.
5. Update ticket docs when tooling context changes constraints, validation status, risks, or codegen requirements.
6. If tooling is unavailable, mention it only when it affects the work and continue with local code and installed tools when safe.
