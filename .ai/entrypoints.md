# AI Entrypoints

One canonical source: `.ai/AGENTS.md`. Provider entrypoints exist only to route agents there.

The project standard is the canonical resource location, not the discovery mechanism.

## Canonical

- `.ai/AGENTS.md`
- `.ai/README.md` (human index)

## Supported Entrypoints

List the providers approved for this project in `context/project-profile.md` (`Approved AI providers`). Typical shims:

| Provider | Entrypoint |
| --- | --- |
| Codex / OpenAI agents | root `AGENTS.md` |
| Claude Code | root `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Copilot Chat prompts | `.github/prompts/<skill>.prompt.md` (one thin wrapper per skill) |
| Copilot CLI skills | `.github/skills/<skill>/SKILL.md` (one thin wrapper per skill) |
| Codex skills | `.codex/skills/<skill>/SKILL.md` (one thin wrapper per skill) |
| Claude Code skills | `.claude/skills/<skill>/SKILL.md` (one thin wrapper per skill) |
| Claude Code subagents | `.claude/agents/<agent>.md` (frontmatter `name`, `description`, `tools`, `model` + a pointer to `.ai/agents/<agent>.md`) |

Delete shims for providers the project does not approve.

## Rules

- Do not duplicate standards in entrypoint files. Keep them short and point to `.ai/AGENTS.md`.
- Do not encode provider-specific skill behavior in entrypoints. Skill behavior belongs in `.ai/skills/`.
- Skill wrappers only point to `.ai/skills/<skill>.md` and `.ai/AGENTS.md`; they are committed repo files, not developer-local setup.
- Subagent wrappers carry only what the provider needs to discover and sandbox the agent (name, trigger description, tools, model) and point to `.ai/agents/<agent>.md`.

## Onboarding A Provider

1. Confirm the provider is approved (see Governance).
2. Add only the minimal entrypoint the provider requires.
3. Point it back to `.ai/AGENTS.md`.
4. Update this file and the profile's `Approved AI providers`.
5. Do not fork workflows, skills, standards, integration docs, or context for the provider.
