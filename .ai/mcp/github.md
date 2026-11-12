# GitHub Workflow

Contract for repository, branch, PR, review, issue, and CI operations. Access method (`gh` CLI or GitHub MCP) is declared in the profile. GitHub explains remote collaboration state; the local repository defines working-tree reality.

## Default Assumption

Assume access works. If a call fails: state it, continue with local Git when safe, ask only for missing remote details, never silently skip PR/review/CI context during handoff.

## Read Behavior

Collect when relevant:

- owner, repo, default branch
- current local branch and its remote counterpart
- open PR for the branch: title, body, base, head, draft state, labels, reviewers, assignees, linked issues
- changed files, review comments, unresolved threads, requested changes
- check runs and statuses for the head commit
- recent commits on the branch

Useful `gh` commands:

```text
gh repo view --json nameWithOwner,defaultBranchRef
gh pr list --head <branch> --state open --json number,title,isDraft,url
gh pr view <n> --json title,body,baseRefName,headRefName,isDraft,labels,reviews,reviewRequests,files,statusCheckRollup
gh pr diff <n>
gh pr checks <n>
gh api repos/{owner}/{repo}/pulls/<n>/comments          # inline review comments
gh api graphql -f query='...reviewThreads...'           # unresolved threads
```

## Write Behavior

Writes only when the request implies lifecycle automation (start, checkpoint, finish, review, feedback, handoff). Before any write: inspect current branch/PR/check state, avoid duplicates, preserve unrelated changes, and make sure docs and validation back the claim.

Allowed:

- create a branch when starting work and it does not exist
- create or update a PR (`gh pr create --draft --label <ai-label>`, `gh pr edit`)
- apply `<ai-label>` to every PR an agent opens or updates
- update title, body, draft state (`gh pr ready`), reviewers, labels when intent is clear
- add concise PR comments for validation, blockers, or handoff
- reply to or resolve threads when a code change directly addresses them and intent is clear
- request review when asked or the workflow calls for it

Never without explicit request: merge, close PRs, delete branches, force-push, dismiss reviews, approve or request changes, retarget to `<release-branch>`.

## Lifecycle Hooks

| Skill | GitHub action |
| --- | --- |
| start-ticket | check for existing remote branch/PR; after scaffolding commit, push and open draft feature PR into `<integration-branch>` with `<ai-label>` |
| continue-ticket | refresh PRs, reviews, threads, checks; check whether the current checkpoint PR merged |
| checkpoint-ticket | push task branch; PR into feature branch with `<ai-label>`; sync umbrella draft description |
| deliver-checkpoint | create the task branch; read diff and checks; open the checkpoint PR through `checkpoint-ticket` |
| finish-ticket | mark umbrella PR ready (create only if missing); refresh body and reviewers; read checks |
| after human merge | confirm merge strategy and branch deletion; close the ticket by hand when auto-close does not apply |

Board moves that accompany these steps follow `project-board.md`; the iteration audit comment always comes first.

## After Merge

Merging is human. Once the user confirms a merge:

```text
gh pr view <n> --json state,mergeCommit,mergedAt                         # confirm merged + commit
gh api repos/{owner}/{repo}/branches/<head-branch>                        # 404 = branch deleted
gh issue close <issue> --comment "Merged in <merge-commit> via #<n>."    # when auto-close does not apply
```

Then post the `deploy` iteration audit comment and move the card to Done (`project-board.md`), only if the Definition of Done in `../standards/quality-threshold.md` holds.

## One-Time Repository Settings (human-run)

So "squash and delete the branch" does not depend on who presses the merge button:

```text
gh repo edit <owner>/<repo> --enable-squash-merge --enable-merge-commit=false \
  --enable-rebase-merge=false --delete-branch-on-merge
```

Agents surface this command; a human runs it.
| review-pr | read-only unless write-back requested |
| address-pr-feedback | replies/resolutions only with user approval for anything dismissive |

## Local Sync

Record branch, PR URL, PR state, reviewers, CI status in `human-readable.md`; remote branch, base, changed files, unresolved threads, check failures, handoff constraints in `agent-context.md`.

Conflicts: local Git wins for working-tree facts; GitHub wins for remote PR, review, and CI facts. Surface conflicts that affect handoff.

## Guardrails

- No secrets or sensitive values in PRs or comments.
- No unrelated working-tree changes in descriptions.
- No claimed checks unless run locally or reported by GitHub.
- Never overwrite a human-authored PR body without preserving useful content.
- Never create a duplicate PR for the same branch.
- Never dismiss, resolve, or argue against human feedback without explicit user approval.
