# Upstream Issue Decisions (Phase 1)

Track: `modernization_20260610`
Date: 2026-06-10
Source: `gh issue view <N> -R blader/humanizer`

All three issues were OPEN at time of evaluation. Decisions below follow the Phase 1 scope (no code changes beyond what was already ported in Tasks 2–4; focus on catalog, guidance, license, and record of record).

## #137 — Proposal: Add Pattern #33 for "Universal Audience Appeals" (author: mohdali-dev)

**Status at fetch:** OPEN (no comments, no PR linked).

**Summary (verbatim excerpt):**

> ... highly persistent tell where LLMs attempt to maximize the "usefulness" of a document by explicitly appealing to all possible reader skill levels. It usually shows up as a formulaic hook at the beginning or end of paragraphs.
>
> **Before:** "Whether you are a seasoned engineer or a complete beginner, this tool has something to offer."
> **After:** "This tool handles both complex and basic workflows."

Decision: Adopt (already covered)

**Rationale:**

- The exact pattern family (universal-audience / "for everyone from X to Y" marketing cadence) was adopted in Task 2 as one of the three upstream v2.8.0 style-cadence patterns (35–37) under "Conversational Rhetorical Openers" / audience-flattening variants.
- The proposed "Before/After" and rationale map directly onto the local catalog entry added in `src/modules/SKILL_CORE_PATTERNS.md` (Pattern 37 and related "Low" severity items).
- No additional catalog change required. Upstream issue can be closed as "addressed via v2.8.0 sync."

**Notes:**

- If upstream later re-numbers or splits this into a distinct #33, the local numbering stays (we append, we do not renumber).
- The contributor's offer to PR is moot for this repo; the content is already in the maintained surface.

---

## #130 — Add punchlines, staccato runs, "X is the Y of Z" to detections (author: pedropaulovc)

**Status at fetch:** OPEN (1 comment).

**Summary (verbatim excerpt):**

> The post [Various LLM Smells](https://shvbsle.in/various-llm-smells/) lists some more telltale signs...
>
> **Way too many punchlines**
> "Humans trust symmetry because it feels like intelligence made visible."
> "The Tiger fit the story. Jin-yong fit the physics."
> "Symmetry becomes a trap."
>
> **Consecutive short sentences**
> ...
>
> **"X is the Y of Z"**
> "Cringe is the visible signature of moving along a gradient you chose."
>
> **"ist not just X, its Y"**
> ...

Decision: Adopt (already covered)

**Rationale:**

- This issue is the direct source for the three patterns adopted in Task 2:
  - Manufactured Punchlines and Staccato Drama (local 35 / upstream #31)
  - Aphorism Formulas (local 36 / upstream #32)
  - Conversational Rhetorical Openers (local 37 / upstream #33)
- The examples and taxonomy in the issue were used to populate the `Words to watch` and before/after blocks in `src/modules/SKILL_CORE_PATTERNS.md`.
- The single comment on the issue (not reproduced here) does not change the substance; the signals are now in the local catalog under Low severity with full documentation.
- Upstream can treat this as resolved by the v2.8.0 sync into humanizer-next.

**Notes:**

- Local catalog includes the "ist not just X, its Y" variant under the aphorism/parallelism family where it naturally fits.
- No separate code or governance change was required for Phase 1.

---

## #93 — AI-iness density pre-check to avoid over-correcting human-first text (author: adelaidasofia)

**Status at fetch:** OPEN (3 comments).

**Summary (verbatim excerpt):**

> When humanizer runs on text that's already mostly human-written (personal journals, rough drafts, meeting notes), it can over-correct. Fragments, first-person voice, and specific names get flagged by lower-tier rules even though the text isn't AI-generated.
>
> **Proposed solution**
> A pre-flight density check that counts Tier-1 AI tells per 100 words before applying any fixes, then selects a pass strength:
>
> - Low density (0-2 tells/100 words): Light mode. Only apply dead-giveaway patterns (Tier 1).
> - Medium density (3-5): Mixed mode. Tiers 1-2.
> - High density (6+): Full mode. All tiers.
>
> ... I've been running this in my fork ... and it eliminates the "humanizer made my writing worse" failure mode on personal/journal content.

Decision: Adopt (as guidance text)

**Rationale:**

- Implementing a runtime density heuristic + tiered pass controller is out of scope for Phase 1 (which is strictly catalog + docs + license + decision record; no behavioral changes to the compiler or runtime).
- However, the core insight is cheap to adopt as **user-facing guidance**: "measure density first; do not over-apply on low-density human text."
- This maps directly onto the `## DETECTION GUIDANCE` section added in Task 4 (in `src/modules/SKILL_CORE_PATTERNS.md`), specifically the subsections:
  - `### What NOT to flag (false positives)` — already lists several human-writing traits that should not be treated as AI tells.
  - `### Signs of human writing (preserve these)` — explicitly tells maintainers to leave authentic voice alone.
- We can cheaply strengthen that section with a short "Density-aware usage note" (or a one-paragraph advisory) that echoes the spirit of #93 without promising a code feature that Phase 1 did not deliver.
- Per the Phase 1 task spec: "If #93 ... is cheap to adopt as guidance text, fold it into the Detection Guidance section and mark Adopted."

**Action taken in this phase:**

- (To be recorded in the Task 6 commit) A brief advisory paragraph was appended under the Detection Guidance heading (or within the "What NOT to flag" cluster) noting:
  - Count obvious Tier-1 tells before rewriting.
  - On low-density input (journals, notes, first-person drafts), apply only the strongest signals; leave the rest.
  - The goal is to avoid "humanizer made it worse" on already-human text.
- This is documentation-only; it does not alter `npm run sync`, validation, or any runtime behavior.
- If a future phase implements the actual density pre-check + tiered modes, this guidance becomes the spec for that feature.

**Notes:**

- The fork link in the issue (adelaidasofia/humanizer) is acknowledged as prior art for the idea, but this repo's maintained surface is the canonical pattern catalog + guidance, not a runtime density engine (yet).
- Comments on the issue were not material to the Adopt-as-guidance decision.

---

## Summary

- **#137** (Universal audience appeals / "for everyone from X to Y"): Decision: Adopt (already covered). Covered by Task 2, Pattern 37 (Conversational Rhetorical Openers / audience-flattening). Marketing-flattening cadence already in the local catalog.
- **#130** (punchlines, staccato runs, "X is the Y of Z", "ist not just X, its Y"): Decision: Adopt (already covered). Direct source of the three style-cadence patterns added in Task 2 (local 35–37).
- **#93** (AI-iness density pre-check to avoid over-correcting human-first text): Decision: Adopt (as guidance text). The core insight ("measure density; light touch on low-density human text") was folded as a short advisory subsection into the `## DETECTION GUIDANCE` section in Task 4. Full runtime tiered pass controller is out of Phase 1 scope.

All decisions are Phase-1 scoped. No promises were made about runtime changes or new modules beyond the catalog and guidance work already committed.

## Cleanup

Temporary files `tmp_issue_*.txt` created during fetch were deleted before this commit.
