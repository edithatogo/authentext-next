# Track Specification: Deferred Rename (Follow-On)

**Track ID:** `rename_deferred`

**Status:** stub (not scheduled)

**Priority:** deferred

**Created:** 2026-06-10

**Parent context:** Deferred from [`modernization_20260610`](../archive/modernization_20260610/spec.md) so the bleeding-edge migration could ship without a breaking rename.

---

## Overview

Evaluate renaming the repository and skill away from the generic **humanizer** slug. This track is intentionally **out of scope** for the modernization release; it exists to preserve vetted candidates and document blast radius before any rename attempt.

## Vetted name candidates (low-collision shortlist)

| Candidate      | Rationale                                    | Risk notes                                      |
| -------------- | -------------------------------------------- | ----------------------------------------------- |
| **TellStrip**  | Action-oriented; suggests stripping AI tells | Verify npm/GitHub/skill registry availability   |
| **Authentext** | Emphasizes authentic text output             | Close to generic "authentic" SEO noise          |
| **HumanWeave** | Human + craft metaphor                       | Longer slug; check trademark clutter            |
| **SlopScrub**  | Direct, memorable anti-slop positioning      | Informal tone may not fit enterprise hosts      |
| **DeAIify**    | Clear purpose statement                      | Similar to existing "humanizer" ecosystem names |

## Blast radius (must revisit before execution)

- GitHub repository rename and redirect window
- npm workspace package names (`humanizer-next`, `humanizer-orchestrate`, etc.)
- MCP server registry IDs and installed consumer configs
- Agent Skills `name:` frontmatter and skills.sh listing slug
- External docs, forks, and `edithatogo/humanizer-next` downstream references
- Conductor track IDs and archived history paths (cosmetic only)

## Acceptance criteria (when activated)

- [ ] Candidate selected with availability checks (GitHub, npm, skills registry)
- [ ] Migration plan for repo slug, package names, and skill frontmatter
- [ ] Consumer communication note (breaking change) drafted
- [ ] Redirect or deprecation period defined for old slug

## Out of scope until activation

- Executing the rename during `modernization_20260610`
- Rebranding skill content or pattern taxonomy
- Publishing to external registries under a new name

---

_Stub only — do not implement without a dedicated track activation and maintainer sign-off._
