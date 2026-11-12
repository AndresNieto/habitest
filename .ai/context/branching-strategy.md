# Branching Strategy

Read before starting, continuing, finishing, or reviewing branch work. Branch names come from `project-profile.md`.

## Branch Roles

- `<release-branch>`: production baseline. Never target normal work here unless a hotfix or release is explicitly requested.
- `<integration-branch>`: base for feature and non-production bugfix work.
- `feature/*`: ticket-scoped features from `<integration-branch>`.
- `bugfix/*`: non-production fixes from `<integration-branch>`.
- `task/*`: tasks and checkpoint branches from `<integration-branch>`; checkpoint PRs target the parent feature branch.
- hotfix: from `<release-branch>`, only on explicit request.

## Branch Pattern

```text
[feature|bugfix|task]/<TICKET-ID>[-<optional-slug>]
```

Slug: lowercase, spaces/underscores to hyphens, no unsafe punctuation, collapse repeated hyphens, trim ends. The ticket folder uses only the ticket ID, never the slug.

## Base Branch Rules

- Always branch from a freshly fetched remote: `git fetch origin` then base on `origin/<integration-branch>`, never the current local branch or a stale local copy.
- Never branch from a dirty working tree without preserving unrelated changes first.

## Working Copy Policy

Follow `Worktree policy` in the profile.

`in-place` (default):

```text
git status --short          # preserve unrelated changes first
git fetch origin
git switch -c <branch> origin/<integration-branch>
```

`worktree`:

```text
git fetch origin
git worktree add ../<repo>-<TICKET-ID> -b <branch> origin/<integration-branch>
```

Never delete, move, prune, or reuse a worktree with uncommitted changes unless explicitly asked.

## PR Targeting

- Feature and non-production bugfix PRs target `<integration-branch>`.
- Checkpoint (task) PRs target their parent feature branch.
- Discussion-only drafts may target the integration branch but must state that merge is blocked until sign-off.
- Never retarget a PR to `<release-branch>` without explicit release/hotfix intent.

## Guardrails

- Preserve unrelated working-tree changes.
- No rebase, reset, force-push, or retarget without explicit approval.
- Keep the ticket ID aligned between branch and `.ai/tickets/<TICKET-ID>/`.
- Update ticket docs before handoff, commit, or PR creation.
