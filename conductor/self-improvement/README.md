# Self-improvement outputs

This directory holds **live** artifacts from the weekly self-improvement workflow and manual `gather-repo-data.js` runs.

It replaces the archived conductor track at `conductor/tracks/archive/repo-self-improvement_20260303/`.

## Files

| File                       | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `repo-data.json`           | Snapshot of local and upstream GitHub PR/issue intelligence      |
| `upstream-decision-log.md` | Maintainer Adopt / Reject / Defer record refreshed by automation |

## Commands

```bash
node scripts/gather-repo-data.js
node scripts/render-self-improvement-issue.js
npm run check:upstream
```

Repository defaults come from `scripts/lib/repo-config.js` (local repo from `git remote`, upstream `blader/humanizer`).
