# Upstream Diff: blader/humanizer v2.8.0 → local modules (humanizer-next)

**Date:** 2026-06-10
**Upstream version:** 2.8.0 (33 patterns)
**Local state:** SKILL_CORE_PATTERNS.md frontmatter claims 34 patterns (30 core + 4 local LLM-variant patterns 31-34); local numbering includes local-only extensions and does not match upstream exactly after ~#12.

Fetched via `gh api repos/blader/humanizer/contents/SKILL.md` (base64 decoded), plus README.md and LICENSE.

## Upstream Patterns 31-33 (new in v2.8.0; style cadence patterns)

These are the adoptable delta for style. Upstream numbering; map to local by appending (do not renumber existing local 1-34 destructively).

### 31. Manufactured Punchlines and Staccato Drama (Upstream #31)

**Problem:** LLMs often make every sentence land like a quotable closer, then stack short declarative fragments to manufacture drama. A single short sentence for emphasis is fine; a run of them starts to sound engineered.

**Before:**

> Then AlphaEvolve arrived. It had no preference for symmetry. No aesthetic prior. No nostalgia for human taste. The old rules were gone.

**After:**

> AlphaEvolve changed the search because it did not favor symmetry or human-looking designs. That made some of the older assumptions less useful.

**Words to watch (implied):** short punchy declaratives in runs after a setup sentence; "The X was gone/over/done."

### 32. Aphorism Formulas (Upstream #32)

**Words to watch:** X is the Y of Z, X becomes a trap, X is not a tool but a mirror, the language of, the currency of, the architecture of

**Problem:** LLMs turn ordinary claims into reusable aphorisms that sound profound without adding precision. Replace the formula with the concrete claim it is gesturing at.

**Before:**

> Symmetry is the language of trust. Efficiency becomes a trap when teams forget the human layer.

**After:**

> Symmetric layouts often feel more predictable to users. Teams can over-optimize workflows and miss how people actually use them.

### 33. Conversational Rhetorical Openers (Upstream #33)

**Phrases to watch:** Honestly?, Look, Here's the thing, The thing is, Let's be honest, Real talk (when used as standalone hooks or fake-candid pauses before an ordinary point).

**Problem:** LLMs open with a fake-candid hook to manufacture intimacy before delivering a routine claim. The tell is the theatrical pause-and-reveal: a one-word question or aside, then the "real" answer. A person being honest usually just says the thing.

**Before:**

> Is it worth the price? Honestly? It depends on how often you'll use it.

**After:**

> Whether it's worth the price depends on how often you'll use it.

## Refinements present upstream but missing/incomplete locally

- **Em/en-dash hard cut rule (Upstream §14 + process):** "The final rewrite contains no em dashes (—) or en dashes (–). ... treat this as a hard constraint, not a 'use sparingly' preference." Replacement preference order: period, comma, colon, parentheses, or restructure. Local only has Pattern 13 "Em Dash Overuse" (soft "overuse", examples use commas); no en-dash mention, no blanket "no dashes in final" rule, no replacement guidance in process. Upstream also calls out spaced em and `--` aliases.

- **Gap-filling tell (Upstream Pattern 21 "Knowledge-Cutoff Disclaimers and Speculative Gap-Filling"):** Explicitly pairs cutoff disclaimers with the behavior of inventing plausible filler ("maintains a low profile", "keeps personal details private") when sources are absent. Local Pattern 20 only covers cutoff disclaimers; no gap-filling language or examples.

- **Diff-anchored writing (Upstream Pattern 30):** Full pattern: "Documentation or comments written as if narrating a change rather than describing the thing as it is." (Example contrasts "This function was added to replace..." vs present-tense description of current behavior.) Local has no equivalent (local Pattern 30 is "Fragmented Headers"; diff-anchored is absent from all modules).

- **Narrowed hyphen rule (Upstream Pattern 26 "Hyphenated Word Pair Overuse"):** Specific: "Humans hyphenate inconsistently — typically only when the compound is attributive (`a high-quality report`) and often dropping the hyphen otherwise (`the report is high quality`). Keep attributive-position hyphens; drop them when the compound follows the noun." Local has zero hyphen guidance.

- **Content-preservation guarantees ("Rewrite, don't delete"):** Upstream Your Task #2: "Replace AI-isms with natural alternatives, and cover everything the original covers. If the original has five paragraphs, the rewrite has five paragraphs." Local Task only says "Preserve meaning - Keep the core message intact" (weaker; no length/structure parity).

- **Detection Guidance section (full, after patterns in upstream):** Dedicated `## DETECTION GUIDANCE` with two subsections:
  - "What NOT to flag (false positives)": 12+ specific items (perfect grammar ok, mixed registers ok, bland != AI, em dashes alone ok if not clustered, one short sentence ok, etc.). "When in doubt, look for clusters of tells."
  - "Signs of human writing (preserve these)": 7 items (specific hard-to-fabricate detail, mixed feelings/unresolved tension, dated references, first-person editorial choices, variety in sentence length, genuine asides/self-corrections, pre-2022-11-30 edits).
    Local has only scattered "Not a problem when" notes on individual patterns; no consolidated false-positive/human-signal guidance or "clusters" directive.

## Items already covered locally (or partially mapped)

- Core content/style/communication/filler patterns 1-29 largely overlap (local numbering mostly tracks upstream 1-29 with minor reordering/renames around passive/hyphen/em; local Pattern 13=em only, upstream 13=passive fragments; local 21= cutoff only).
- Local-only LLM-variant patterns (31-34 in current local numbering): Extended Thinking Tags, JSON Mode Artifacts, Tool Use Documentation, Over-Polished Conclusions. These are absent from upstream SKILL.md (upstream focuses on general prose tells; no `<thinking>`, JSON preambles, or tool-use meta in its 33).
- "Technical literal preservation" (local Pattern 27) and module-specific rules in SKILL_TECHNICAL.md are local extensions (not in upstream core).
- Some "Not a problem when" caveats in local patterns partially anticipate upstream's false-positive list, but lack the consolidated section and specific calls (e.g. no "em dashes alone" carve-out, no "pre-2022 edits").
- Upstream README table lists 33 patterns with a compact summary; local claims "34 patterns" in multiple places (frontmatter, footer, README references) due to the 4 local additions.
- Voice calibration section exists in both (upstream more detailed; local covers in core).

## Other notes

- Upstream frontmatter now includes Agent-Skills-style fields (name, version 2.8.0, license: MIT, compatibility, allowed-tools). Local root manifests are generated; source modules use different frontmatter.
- Upstream LICENSE is standard MIT (copyright Siqi Chen 2025).
- No changes to local numbering convention for existing patterns 1-34; new upstream patterns will be appended with " (Upstream #N)" attribution per plan.
- Diff generated from full upstream SKILL.md (623 lines) + cross-check against local `src/modules/SKILL_CORE_PATTERNS.md` (and siblings for technical/academic/governance fit of refinements like diff-anchored).

**Next steps (per plan):** Adopt 31-33 (as local 35+), port listed refinements (strengthen existing where partial overlap), add Detection Guidance (likely to CORE_PATTERNS or GOVERNANCE), add LICENSE (MIT with local copyright), evaluate issues, recompile + count bumps, verify.
