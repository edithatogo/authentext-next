# Implementation Plan: Deferred Rename (Authentext Rebrand)

Track: `rename_deferred` - see `spec.md` for acceptance criteria.

Workflow: each task gets its own commit; the task line gets the 7-char SHA appended on completion. Each phase ends with verification and review before a checkpoint commit.

## Phase 1: Activation & Triage

- [x] Task: Confirm name selection 'Authentext' and verify npm/GitHub availability
- [ ] Task: Activate track in `conductor/tracks.md` and update `rename_deferred/spec.md` status to `in-progress`
- [ ] Task: Conductor - Phase Verification and Review of Phase 1

## Phase 2: Package & Skill Rebranding

- [ ] Task: Rename folders under `skills/` from `humanizer-*` to `authentext-*` and update their inner `package.json` package names
- [ ] Task: Update root `package.json` workspaces array and package scripts referencing the new paths
- [ ] Task: Update `scripts/compile-skill.js` build configurations, descriptions, and file output targets (`SKILL.md` frontmatter `name: authentext`, `SKILL_PROFESSIONAL.md` frontmatter `name: authentext-pro`)
- [ ] Task: Update `AGENTS.md` frontmatter metadata block (`skill_name: authentext`)
- [ ] Task: Refactor JavaScript imports, tests, script dependencies, and GitHub workflows referencing the old package names
- [ ] Task: Conductor - Phase Verification and Review of Phase 2

## Phase 3: Documentation & Verification

- [ ] Task: Recompile (`npm run sync`) to regenerate `SKILL.md` and `SKILL_PROFESSIONAL.md` with new `name` configurations
- [ ] Task: Sweep documentation files (`README.md`, `CONTRIBUTING.md`, `docs/`, `conductor/product.md`) and replace occurrences of `humanizer` with `authentext` where appropriate
- [ ] Task: Run full validation suite (`npm run lint:all && npm test && npm run validate`)
- [ ] Task: Conductor - Phase Verification and Review of Phase 3

## Phase 4: Launch and remote rename

- [ ] Task: Draft consumer communication note for the breaking package/slug change in `docs/authentext-migration-announcement.md`
- [ ] Task: Rename remote GitHub repository using `gh repo rename`
- [ ] Task: Commit and push changes, verifying remote workflow integration
- [ ] Task: Conductor - Phase Verification and Review of Phase 4
