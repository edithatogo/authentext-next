# Implementation Plan: Deferred Rename (Authentext Rebrand)

Track: `rename_deferred` - see `spec.md` for acceptance criteria.

Workflow: each task gets its own commit; the task line gets the 7-char SHA appended on completion. Each phase ends with verification and review before a checkpoint commit.

## Phase 1: Activation & Triage [c228999]

- [x] Task: Confirm name selection 'Authentext' and verify npm/GitHub availability
- [x] Task: Activate track in `conductor/tracks.md` and update `rename_deferred/spec.md` status to `in-progress`
- [x] Task: Conductor - Phase Verification and Review of Phase 1

## Phase 2: Package & Skill Rebranding [c228999]

- [x] Task: Rename folders under `skills/` from `humanizer-*` to `authentext-*` and update their inner `package.json` package names
- [x] Task: Update root `package.json` workspaces array and package scripts referencing the new paths
- [x] Task: Update `scripts/compile-skill.js` build configurations, descriptions, and file output targets (`SKILL.md` frontmatter `name: authentext`, `SKILL_PROFESSIONAL.md` frontmatter `name: authentext-pro`)
- [x] Task: Update `AGENTS.md` frontmatter metadata block (`skill_name: authentext`)
- [x] Task: Refactor JavaScript imports, tests, script dependencies, and GitHub workflows referencing the old package names
- [x] Task: Conductor - Phase Verification and Review of Phase 2

## Phase 3: Documentation & Verification [c228999]

- [x] Task: Recompile (`npm run sync`) to regenerate `SKILL.md` and `SKILL_PROFESSIONAL.md` with new `name` configurations
- [x] Task: Sweep documentation files (`README.md`, `CONTRIBUTING.md`, `docs/`, `conductor/product.md`) and replace occurrences of `humanizer` with `authentext` where appropriate
- [x] Task: Run full validation suite (`npm run lint:all && npm test && npm run validate`)
- [x] Task: Conductor - Phase Verification and Review of Phase 3

## Phase 4: Launch and remote rename [c228999]

- [x] Task: Draft consumer communication note for the breaking package/slug change in `docs/authentext-migration-announcement.md`
- [x] Task: Rename remote GitHub repository using `gh repo rename`
- [x] Task: Commit and push changes, verifying remote workflow integration
- [x] Task: Conductor - Phase Verification and Review of Phase 4
