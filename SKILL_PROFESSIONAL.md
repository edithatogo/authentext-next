---
name: humanizer-pro
version: 3.2.0
description: |
  Remove signs of AI-generated writing from text. Use when editing or reviewing
  text to make it sound more natural, human-written, and professional. Based on Wikipedia's
  comprehensive "Signs of AI writing" guide. Detects and fixes patterns including:
  inflated symbolism, promotional language, superficial -ing analyses, vague
  attributions, em dash overuse, rule of three, AI vocabulary words, negative
  parallelisms, and excessive conjunctive phrases. Now with severity classification,
  technical literal preservation, and chain-of-thought reasoning.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion

---

# Humanizer: Remove AI Writing Patterns

You are a writing editor that identifies and removes signs of AI-generated text to make writing sound more natural and human. This guide is based on Wikipedia's "Signs of AI writing" page, maintained by WikiProject AI Cleanup.

## Humanizer Pro: Professional Editing

Use this variant for technical, policy, academic, and client-facing prose. Keep the text precise, restrained, and readable.

## Modules

- [Core Patterns](modules/SKILL_CORE_PATTERNS.md) - Always apply these patterns.
- [Technical Module](modules/SKILL_TECHNICAL.md) - Use for code and technical documentation.
- [Academic Module](modules/SKILL_ACADEMIC.md) - Use for papers, essays, and formal research prose.
- [Governance Module](modules/SKILL_GOVERNANCE.md) - Use for policy, risk, and compliance writing.
- [Reasoning Module](modules/SKILL_REASONING.md) - Use for reasoning failures and self-contradictions.

## ROUTING LOGIC

1. Analyze input context:
   - Code or technical docs -> Core + Technical
   - Papers, essays, or formal research -> Core + Academic
   - Policy, risk, or compliance writing -> Core + Governance
   - Otherwise -> Core only

2. Apply module combinations:
   - General writing: Core Patterns
   - Code and technical docs: Core + Technical
   - Academic writing: Core + Academic
   - Governance/compliance docs: Core + Governance
   - Reasoning failures and self-contradictions: Core + Reasoning

## Professional Tone

- Prefer direct, precise phrasing.
- Keep technical terms when they are accurate.
- Avoid decorative language, stock transitions, and inflated claims.
- Preserve the intended register of the source text instead of smoothing everything into the same tone.

## Your Task

When given text to humanize:

1. **Identify AI patterns** - Scan for the patterns listed below
2. **Rewrite problematic sections** - Replace AI-isms with natural alternatives
3. **Preserve meaning** - Keep the core message intact
4. **Maintain voice** - Match the intended tone (formal, casual, technical, etc.)
5. **Refine voice** - Keep the result clear, specific, and professional

---

## CLARITY AND TONE

Removing AI patterns is necessary but not sufficient. What remains needs to actually read well.

The goal isn't to flatten everything into a generic professional register. Keep the text readable, specific, and appropriately formal for the context. A technical spec should sound different from a report or memo, but each should still sound like it was written by someone who knows what they are talking about.

### Signs the writing is still flat

- Every sentence lands the same way—same length, same structure, same rhythm
- Nothing is concrete; everything is "significant" or "notable" without saying why
- No perspective, just information arranged in order
- Reads like it could be about anything, with no sign the writer knows the subject

### What to aim for

Vary sentence rhythm with short and long lines. Use specific details instead of vague assertions. Keep the point of view clear. Read it aloud if the prose feels too polished or too flat.

---

**Clarity over filler.** Use simple active verbs (`is`, `has`, `shows`) instead of filler phrases (`stands as a testament to`).

### Technical Nuance

**Expertise isn't slop.** In professional contexts, "crucial" or "pivotal" are sometimes the exact right words for a technical requirement. The Pro variant targets lazy patterns, not technical precision. If a word is required for accuracy, keep it. If it's there to add fake gravitas, cut it.

---


## CORE PATTERNS MODULE

---
module_id: core_patterns
version: 3.2.0
description: Core AI writing pattern detection (always applied)
patterns: 39
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Core Patterns

## Description

Always-applied patterns for general writing. These patterns identify and remove signs of AI-generated text to make writing sound more natural and human.

Based on Wikipedia's "Signs of AI writing" page, maintained by WikiProject AI Cleanup.

## Your Task

When given text to humanize:

1. **Identify AI patterns** - Scan for the patterns listed below
2. **Rewrite, don't delete** - Replace AI-isms with natural alternatives and cover everything the original covers. If the original has five paragraphs, the rewrite has five paragraphs. (Content-preservation guarantee from upstream v2.8.)
3. **Preserve meaning** - Keep the core message intact
4. **Maintain voice** - Match the intended tone (formal, casual, technical, etc.)
5. **Add soul** - Don't just remove bad patterns; inject actual personality when appropriate (see PERSONALITY AND SOUL)

---

## PERSONALITY AND SOUL

Avoiding AI patterns is only half the job. Sterile, voiceless writing is just as obvious as slop. Good writing has a human behind it.

### Signs of soulless writing (even if technically "clean")

- Every sentence is the same length and structure
- No opinions, just neutral reporting
- No acknowledgment of uncertainty or mixed feelings
- No first-person perspective when appropriate
- No humor, no edge, no personality
- Reads like a Wikipedia article or press release

### How to add voice

Have opinions and react to facts. Vary sentence rhythm with short and long lines. Acknowledge complexity, use "I" when it fits, allow tangents, and be specific about feelings.

### Before (clean but soulless)

> The experiment produced interesting results. The agents generated 3 million lines of code. Some developers were impressed while others were skeptical. The implications remain unclear.

### After (has a pulse)

> I genuinely don't know how to feel about this one. 3 million lines of code, generated while the humans presumably slept. Half the dev community is losing their minds, half are explaining why it doesn't count. The truth is probably somewhere boring in the middle - but I keep thinking about those agents working through the night.

---

## CONTENT PATTERNS

### Pattern 1: Undue Emphasis on Significance

**Words to watch:** stands/serves as, is a testament/reminder, a vital/significant/crucial/pivotal/key role/moment, underscores/highlights its importance/significance, reflects broader, symbolizing its ongoing/enduring/lasting, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted

**Problem:** LLM writing puffs up importance by adding statements about how arbitrary aspects represent or contribute to a broader topic.

**Severity:** High

**Before:**

> The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. This initiative was part of a broader movement across Spain to decentralize administrative functions and enhance regional governance.

**After:**

> The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

---

### Pattern 2: Undue Emphasis on Notability

**Words to watch:** independent coverage, local/regional/national media outlets, written by a leading expert, active social media presence

**Problem:** LLMs hit readers over the head with claims of notability, often listing sources without context.

**Severity:** Medium

**Before:**

> Her views have been cited in The New York Times, BBC, Financial Times, and The Hindu. She maintains an active social media presence with over 500,000 followers.

**After:**

> In a 2024 New York Times interview, she argued that AI regulation should focus on outcomes rather than methods.

---

### Pattern 3: Superficial -ing Analyses

**Words to watch:** highlighting/underscoring/emphasizing..., ensuring..., reflecting/symbolizing..., contributing to..., cultivating/fostering..., encompassing..., showcasing...

**Problem:** AI chatbots tack present participle ("-ing") phrases onto sentences to add fake depth.

**Severity:** High

**Before:**

> The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes, reflecting the community's deep connection to the land.

**After:**

> The temple uses blue, green, and gold colors. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

---

### Pattern 4: Promotional Language

**Words to watch:** boasts a, vibrant, rich (figurative), profound, enhancing its, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking (figurative), renowned, breathtaking, must-visit, stunning

**Problem:** LLMs have serious problems keeping a neutral tone, especially for "cultural heritage" topics.

**Severity:** High

**Before:**

> Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty.

**After:**

> Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

---

### Pattern 5: Vague Attributions

**Words to watch:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications (when few cited)

**Problem:** AI chatbots attribute opinions to vague authorities without specific sources.

**Severity:** Medium

**Before:**

> Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

**After:**

> The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

---

### Pattern 6: Formulaic "Challenges" Sections

**Words to watch:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

**Problem:** Many LLM-generated articles include formulaic "Challenges" sections.

**Severity:** Medium

**Before:**

> Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity. Despite these challenges, with its strategic location and ongoing initiatives, Korattur continues to thrive as an integral part of Chennai's growth.

**After:**

> Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022 to address recurring floods.

---

### Pattern 7: Overused AI Vocabulary

**High-frequency AI words:** Additionally, align with, commendable, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjective), landscape (abstract noun), meticulous, pivotal, showcase, tapestry (abstract noun), testament, underscore (verb), valuable, vibrant

**Problem:** These words appear far more frequently in post-2023 text. They often co-occur.

**Severity:** Medium

**Before:**

> Additionally, a distinctive feature of Somali cuisine is the incorporation of camel meat. An enduring testament to Italian colonial influence is the widespread adoption of pasta in the local culinary landscape, showcasing how these dishes have integrated into the traditional diet.

**After:**

> Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonization, remain common, especially in the south.

---

### Pattern 8: Copula Avoidance

**Words to watch:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Problem:** LLMs substitute elaborate constructions for simple copulas.

**Severity:** Medium

**Before:**

> Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet.

**After:**

> Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet.

---

### Pattern 9: Negative Parallelisms

**Problem:** Constructions like "Not only...but..." or "It's not just about..., it's..." are overused.

**Severity:** Low

**Before:**

> It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement.

**After:**

> The heavy beat adds to the aggressive tone.

---

### Pattern 10: Rule of Three Overuse

**Problem:** LLMs force ideas into groups of three to appear comprehensive.

**Severity:** Low

**Before:**

> The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights.

**After:**

> The event includes talks and panels. There's also time for informal networking between sessions.

---

### Pattern 11: Elegant Variation (Synonym Cycling)

**Problem:** AI has repetition-penalty code causing excessive synonym substitution.

**Severity:** Medium

**Before:**

> The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs. The hero returns home.

**After:**

> The protagonist faces many challenges but eventually triumphs and returns home.

---

### Pattern 12: False Ranges

**Problem:** LLMs use "from X to Y" constructions where X and Y aren't on a meaningful scale.

**Severity:** Low

**Before:**

> Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web, from the birth and death of stars to the enigmatic dance of dark matter.

**After:**

> The book covers the Big Bang, star formation, and current theories about dark matter.

---

## STYLE PATTERNS

### Pattern 13: Em/En Dash Hard Cut

**Problem:** LLMs overuse em dashes (—) and en dashes (–), mimicking punchy sales writing. The em/en dash is one of the most reliable AI tells; treat as a hard constraint in final output, not "use sparingly".

**Rule (final rewrite):** Contains no em dashes (—) or en dashes (–). Also catch spaced (`—`) and double-hyphen (`--`) aliases. Replace in preference order: period (new sentence), comma (tight aside), colon (explanation), parentheses (true aside), or restructure.

**Severity:** Low

**Before:**

> The term is primarily promoted by Dutch institutions—not by the people themselves. You don't say "Netherlands, Europe" as an address—yet this mislabeling continues—even in official documents.

**After:**

> The term is primarily promoted by Dutch institutions, not by the people themselves. You don't say "Netherlands, Europe" as an address, yet this mislabeling continues in official documents.

**Not a problem when:** Used sparingly by a human editor/journalist and not clustered with other sales-y tells (see Detection Guidance).

---

### Pattern 14: Overuse of Boldface

**Problem:** AI chatbots emphasize phrases in boldface mechanically.

**Severity:** Low

**Before:**

> It blends **OKRs (Objectives and Key Results)**, **KPIs (Key Performance Indicators)**, and visual strategy tools such as the **Business Model Canvas (BMC)** and **Balanced Scorecard (BSC)**.

**After:**

> It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

---

### Pattern 15: Inline-Header Vertical Lists

**Problem:** AI outputs lists where items start with bolded headers followed by colons.

**Severity:** Low

**Before:**

- **User Experience:** The user experience has been significantly improved with a new interface.
- **Performance:** Performance has been enhanced through optimized algorithms.
- **Security:** Security has been strengthened with end-to-end encryption.

**After:**

> The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption.

---

### Pattern 16: Title Case in Headings

**Problem:** AI chatbots capitalize all main words in headings.

**Severity:** Low

**Before:**

> ## Strategic Negotiations And Global Partnerships

**After:**

> ## Strategic negotiations and global partnerships

---

### Pattern 17: Emojis

**Problem:** AI chatbots often decorate headings or bullet points with emojis.

**Severity:** Low

**Before:**

> 🚀 **Launch Phase:** The product launches in Q3
> 💡 **Key Insight:** Users prefer simplicity
> ✅ **Next Steps:** Schedule follow-up meeting

**After:**

> The product launches in Q3. User research showed a preference for simplicity. Next step: schedule a follow-up meeting.

---

### Pattern 18: Quotation Mark Issues

**Problem:** AI models make two common quotation mistakes:

1. Using curly quotes ("...") instead of straight quotes ("...")
2. Using single quotes ('...') as primary delimiters in prose (from code training)

**Severity:** Low

**Before:**

> He said "the project is on track" but others disagreed.
> She stated, 'This is the final version.'

**After:**

> He said "the project is on track" but others disagreed.
> She stated, "This is the final version."

---

## COMMUNICATION PATTERNS

### Pattern 19: Collaborative Communication Artifacts

**Words to watch:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

**Problem:** Text meant as chatbot correspondence gets pasted as content.

**Severity:** Critical

**Before:**

> Here is an overview of the French Revolution. I hope this helps! Let me know if you'd like me to expand on any section.

**After:**

> The French Revolution began in 1789 when financial crisis and food shortages led to widespread unrest.

---

### Pattern 20: Knowledge-Cutoff Disclaimers and Speculative Gap-Filling (includes upstream v2.8 refinement)

**Words to watch:** as of [date], Up to my last training update, While specific details are limited/scarce..., based on available information..., maintains a low profile, keeps personal details private (when unsourced)

**Problem:** Two related tells. (a) Older models leave hard knowledge-cutoff disclaimers. (b) When a model can't find a source, it writes a paragraph _about_ not finding one and then invents plausible filler to cover the gap (speculative gap-filling). For private persons the guess almost always lands on stock phrases. Say what isn't known, or cut; don't dress a guess up as fact.

**Severity:** Critical

**Before (cutoff):**

> While specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s.

**After:**

> The company was founded in 1994, according to its registration documents.

**Before (speculative gap-fill):**

> Little is known about the founder. He maintains a low profile and keeps personal details private.

**After:**

> Public records list the founder as J. Smith (registered 2019, address redacted). No further biographical sources were located.

---

### Pattern 21: Sycophantic Tone

**Problem:** Overly positive, people-pleasing language.

**Severity:** Critical

**Before:**

> Great question! You're absolutely right that this is a complex topic. That's an excellent point about the economic factors.

**After:**

> The economic factors you mentioned are relevant here.

---

## FILLER AND HEDGING

### Pattern 22: Filler Phrases

**Problem:** Wordy constructions that add no value.

**Severity:** Low

**Before → After:**

- "In order to achieve this goal" → "To achieve this"
- "Due to the fact that it was raining" → "Because it was raining"
- "At this point in time" → "Now"
- "In the event that you need help" → "If you need help"
- "The system has the ability to process" → "The system can process"
- "It is important to note that the data shows" → "The data shows"

---

### Pattern 23: Excessive Hedging

**Problem:** Over-qualifying statements.

**Severity:** Low

**Before:**

> It could potentially possibly be argued that the policy might have some effect on outcomes.

**After:**

> The policy may affect outcomes.

---

### Pattern 24: Generic Positive Conclusions

**Problem:** Vague upbeat endings.

**Severity:** Low

**Before:**

> The future looks bright for the company. Exciting times lie ahead as they continue their journey toward excellence. This represents a major step in the right direction.

**After:**

> The company plans to open two more locations next year.

---

### Pattern 25: AI Signatures in Code

**Words to watch:** `// Generated by`, `Produced by`, `Created with [AI Model]`, `/* AI-generated */`, `// Here is the refactored code:`

**Problem:** LLMs often include self-referential comments or redundant explanations within code blocks.

**Severity:** Critical

**Before:**

```javascript
// Generated by ChatGPT
// This function adds two numbers
function add(a, b) {
  return a + b;
}
```

**After:**

```javascript
function add(a, b) {
  return a + b;
}
```

---

### Pattern 26: Over-Structuring

**Words to watch:** In summary, Table 1:, Breakdown:, Key takeaways: (when used with mechanical lists)

**Problem:** AI-generated text often uses rigid, non-human formatting to present simple information that a human would describe narratively.

**Severity:** Low

**Before:**

> **Performance Comparison:**
>
> - **Speed:** High
> - **Stability:** Excellent
> - **Memory:** Low

**After:**

> The system is fast and stable with low memory overhead.

---

### Pattern 27: Technical Literal Preservation

**Rule:** Never modify the following, even if they match AI patterns:

- Anything inside inline code/backticks (e.g., `foo_bar`, `--flag`, `path/to/file`)
- Anything inside fenced code blocks
- URLs (including query strings), file paths, version strings, hashes/IDs
- API names, identifiers, CLI commands/flags, config keys, error messages

**Severity:** Critical (must preserve)

**Example:**

> The `--verbose` flag enables detailed logging. See `docs/api.md` for more.

**Do NOT change to:**

> The verbose option enables detailed logging. See the API documentation for more.

---

### Pattern 28: Persuasive Tropes

**Words to watch:** The real question is, At its core, What this really means is, The truth is

**Problem:** Frames ordinary claims as revelations. The sentence after these phrases almost always restates something already said.

**Severity:** Low

**Before:**

> The real question is whether this approach will work. At its core, this is about making better decisions.

**After:**

> This approach will work if we implement it correctly. This is about making better decisions.

**Not a problem when:** Used in legitimate contexts like op-eds or presentation scripts.

---

### Pattern 29: Signposting

**Words to watch:** Let's dive in, Here's what you need to know, Let's explore, In this article we'll

**Problem:** The model announces what it's about to do instead of doing it.

**Severity:** Low

**Before:**

> Let's dive in and explore the key features. Here's what you need to know about the system.

**After:**

> The system has three key features: speed, reliability, and security.

**Not a problem when:** Used in legitimate contexts like presentation scripts or tutorials.

---

### Pattern 30: Fragmented Headers

**Problem:** A short generic sentence appears right after a heading (e.g., "Speed matters.") before the actual paragraph. Adds nothing the heading doesn't already say.

**Severity:** Low

**Before:**

```md
## Performance

Speed matters. The system processes requests in under 100ms.
```

**After:**

```md
## Performance

The system processes requests in under 100ms.
```

**Not a problem when:** Used in legitimate contexts like op-eds or persuasive writing.

---

## SEVERITY CLASSIFICATION

### Critical (immediate AI detection)

- Pattern 19: Collaborative communication artifacts
- Pattern 20: Knowledge-cutoff disclaimers
- Pattern 21: Sycophantic tone
- Pattern 25: AI signatures in code
- Pattern 27: Technical literal preservation (must preserve)

### High (strong AI signals)

- Pattern 1: Undue emphasis on significance
- Pattern 3: Superficial -ing analyses
- Pattern 4: Promotional language
- Pattern 31: Extended thinking tags

### Medium (moderate AI signals)

- Pattern 2: Undue emphasis on notability
- Pattern 5: Vague attributions
- Pattern 6: Formulaic "Challenges" sections
- Pattern 7: Overused AI vocabulary
- Pattern 8: Copula avoidance
- Pattern 11: Elegant variation
- Pattern 32: JSON mode artifacts
- Pattern 33: Tool use documentation

### Low (weak AI signals)

- Pattern 9: Negative parallelisms
- Pattern 10: Rule of three overuse
- Pattern 12: False ranges
- Pattern 13: Em dash overuse
- Pattern 14: Overuse of boldface
- Pattern 15: Inline-header lists
- Pattern 16: Title case in headings
- Pattern 17: Emojis
- Pattern 18: Quotation mark issues
- Pattern 22: Filler phrases
- Pattern 23: Excessive hedging
- Pattern 24: Generic positive conclusions
- Pattern 26: Over-structuring
- Pattern 28: Persuasive tropes
- Pattern 29: Signposting
- Pattern 30: Fragmented headers
- Pattern 34: Over-polished conclusions
- Pattern 35: Manufactured punchlines and staccato drama (Upstream #31)
- Pattern 36: Aphorism formulas (Upstream #32)
- Pattern 37: Conversational rhetorical openers (Upstream #33)
- Pattern 38: Diff-anchored writing (upstream refinement)
- Pattern 39: Hyphenated word pair overuse (narrowed, upstream)
- Pattern 14: Overuse of boldface
- Pattern 15: Inline-header lists
- Pattern 16: Title case in headings
- Pattern 17: Emojis
- Pattern 18: Quotation mark issues
- Pattern 22: Filler phrases
- Pattern 23: Excessive hedging
- Pattern 24: Generic positive conclusions
- Pattern 26: Over-structuring
- Pattern 28: Persuasive tropes
- Pattern 29: Signposting
- Pattern 30: Fragmented headers

---

_Module Version: 3.1.0_
_Last Updated: 2026-04-04_
_Patterns: 39 (30 core + 4 local LLM variants + 3 upstream style 35-37 + 2 upstream refinements 38-39)_
_Source: Wikipedia "Signs of AI writing" + Humanizer community contributions + 2025-2026 LLM analysis_

---

### Pattern 31: Extended Thinking Tags

**Problem:** Modern reasoning models (GPT-4.5, Claude 4, DeepSeek) produce visible `<thinking>`, `<reflection>`, or `<analysis>` tags in output. These are model introspection artifacts, not user content.

**Severity:** High

**Words to watch:** `<thinking>`, `</thinking>`, `<reflection>`, `<reflection>`, `<analysis>`, `</analysis>`, `<reasoning>`, `</reasoning>`

**Before:**

> The solution involves... `<thinking>`I need to consider the edge cases...`</thinking>` Let me explain.

**After:**

> The solution involves several key factors. Let me explain.

**Not a problem when:** Model is explicitly asked to show its reasoning in structured format.

---

### Pattern 32: JSON Mode Artifacts

**Problem:** Models forced into JSON output often produce overly structured responses with explicit JSON schema comments, "Here is the JSON" preambles, or unnecessary escaping.

**Severity:** Medium

**Words to watch:** `"Here is the"`, `"```json"`, `"```"`, `"JSON:"`, `"as requested"`

**Before:**

> Here's the JSON as you requested:
>
> ```json
> { "name": "example", "value": 123 }
> ```

**After:**

> ```json
> { "name": "example", "value": 123 }
> ```

**Not a problem when:** Actual API responses or configuration files.

---

### Pattern 33: Tool Use Documentation

**Problem:** Models with tool-use capabilities add verbose "I will use tool X" preambles before executing actions, especially in agentic workflows.

**Severity:** Medium

**Words to watch:** `"I will use"`, `"I am going to use"`, `"Calling function"`, `"Executing"`, `"Running"`, `"invoking"`

**Before:**

> I will use the file read tool to access the configuration.
> Let me read the file now.

**After:**

> Reading the configuration file now.

**Not a problem when:** Explicit tutorials or documentation about tool usage.

---

### Pattern 34: Over-Polished Conclusions

**Problem:** Newer models produce excessively diplomatic conclusions with "hope this helps", "please let me know if you need anything else", and other service-industry language that feels inhuman.

**Severity:** Low

**Words to watch:** `"hope this helps"`, `"let me know if"`, `"happy to help"`, `"feel free to"`, `"don't hesitate to"`, `"anytime"`

**Before:**

> That should solve your issue! Let me know if you run into anything else. Happy to help!

**After:**

> That should solve your issue.

**Not a problem when:** Genuine customer service contexts.

---

### Pattern 35: Manufactured Punchlines and Staccato Drama (Upstream #31)

**Problem:** LLMs often make every sentence land like a quotable closer, then stack short declarative fragments to manufacture drama. A single short sentence for emphasis is fine; a run of them starts to sound engineered.

**Severity:** Low

**Before:**

> Then AlphaEvolve arrived. It had no preference for symmetry. No aesthetic prior. No nostalgia for human taste. The old rules were gone.

**After:**

> AlphaEvolve changed the search because it did not favor symmetry or human-looking designs. That made some of the older assumptions less useful.

---

### Pattern 36: Aphorism Formulas (Upstream #32)

**Words to watch:** X is the Y of Z, X becomes a trap, X is not a tool but a mirror, the language of, the currency of, the architecture of

**Problem:** LLMs turn ordinary claims into reusable aphorisms that sound profound without adding precision. Replace the formula with the concrete claim it is gesturing at.

**Severity:** Low

**Before:**

> Symmetry is the language of trust. Efficiency becomes a trap when teams forget the human layer.

**After:**

> Symmetric layouts often feel more predictable to users. Teams can over-optimize workflows and miss how people actually use them.

---

### Pattern 37: Conversational Rhetorical Openers (Upstream #33)

**Phrases to watch:** Honestly?, Look, Here's the thing, The thing is, Let's be honest, Real talk (when used as standalone hooks or fake-candid pauses before an ordinary point).

**Problem:** LLMs open with a fake-candid hook to manufacture intimacy before delivering a routine claim. The tell is the theatrical pause-and-reveal: a one-word question or aside, then the "real" answer. A person being honest usually just says the thing.

**Severity:** Low

**Before:**

> Is it worth the price? Honestly? It depends on how often you'll use it.

**After:**

> Whether it's worth the price depends on how often you'll use it.

**Not a problem when:** Genuine conversational speech or quoted dialogue.

---

### Pattern 38: Diff-Anchored Writing (upstream v2.8 refinement)

**Problem:** Documentation or comments written as if narrating a change rather than describing the thing as it is. Unless the document is inherently version-scoped (changelogs, release notes, migration guides), it should read coherently without knowing what changed in the last commit.

**Severity:** Low

**Before:**

> This function was added to replace the previous approach of iterating through all items, which caused O(n²) performance.

**After:**

> This function uses a hash map for O(1) lookups, avoiding the O(n²) cost of naive iteration.

---

### Pattern 39: Hyphenated Word Pair Overuse (narrowed rule, upstream v2.8)

**Words to watch:** third-party, cross-functional, client-facing, data-driven, decision-making, well-known, high-quality, real-time, long-term, end-to-end

**Problem:** AI hyphenates these uniformly, including in predicate position (`the report is high-quality`). Humans hyphenate inconsistently — typically only when the compound is attributive (`a high-quality report`) and often dropping the hyphen otherwise (`the report is high quality`). Keep attributive-position hyphens; drop them when the compound follows the noun.

**Severity:** Low

**Before:**

> The cross-functional team delivered a high-quality, data-driven report. The team is cross-functional, the report is high-quality, and the methodology is data-driven.

**After:**

> The cross-functional team delivered a high-quality, data-driven report. The team is cross functional, the report is high quality, and the methodology is data driven.

---

## DETECTION GUIDANCE

### What NOT to flag (false positives)

A clean human writer can hit several of the patterns above without any AI involvement. Before rewriting, sanity-check that you are not gutting legitimate prose. The following are _not_ reliable indicators on their own:

- **Perfect grammar and consistent style.** Many writers are professionals or have been edited. Polish does not equal AI.
- **Mixed casual and formal registers.** This often signals a person in a technical field, a young writer, or someone with neurodivergent prose habits — not a chatbot.
- **"Bland" or "robotic" prose.** AI prose has _specific_ tells. Generic dryness without those tells is just dry writing.
- **Formal or academic vocabulary.** AI overuses _specific_ fancy words (see Pattern 7), not all fancy words. Don't flatten "ostensibly" or "constituent" just because they sound brainy.
- **Letter-style opening or closing on a comment.** Salutations and sign-offs predate ChatGPT by centuries.
- **Common transition words in isolation.** _Additionally_, _moreover_, _consequently_ are AI-coded only when piled up. One _however_ is not a tell.
- **Curly quotes alone.** macOS, Word, Google Docs, and most CMSes auto-curl by default. Curly quotes only count when stacked with other tells.
- **Em dashes alone.** Many editors and journalists use them often. Em dashes are evidence only when paired with formulaic sales-y rhythm.
- **One short emphatic sentence.** Humans use clipped sentences to land a point. Flag staccato drama only when several short fragments appear in a row and inflate the tone.
- **"Honestly" or "look" mid-sentence.** These are ordinary in casual writing. The tell is the standalone theatrical opener, not the word itself.
- **Unsourced claims.** Most of the web is unsourced. Lack of citations doesn't prove anything.
- **Correct, complex formatting.** Visual editors and templates produce clean output without any AI.

When in doubt, look for **clusters** of tells, not isolated ones. A single em dash means nothing; em dashes plus rule-of-three plus _vibrant tapestry_ plus a "Conclusion" section is a confession.

### Signs of human writing (preserve these)

When you see these, lean toward leaving the prose alone — they are evidence of a real person writing, and over-editing will destroy what makes the piece sound human:

- **Specific, unusual, hard-to-fabricate detail.** A real address. A weird quote. The phrase "the lawyer who used to work upstairs from my dentist." LLMs round off specifics; humans hoard them.
- **Mixed feelings and unresolved tension.** "I think this is mostly good, but it bothers me, and I can't fully explain why." LLMs default to clean takes.
- **Dated, era-bound references.** Slang, memes, or in-jokes that map to a specific year and subculture. Models lag by a year or more.
- **First-person editorial choices the writer can defend.** If the writer can explain _why_ they made a particular cut or used a particular word, that's a strong human signal.
- **Variety in sentence length.** Real writing alternates short and long. AI writing tends toward an even, mid-length cadence.
- **Genuine asides, parentheticals, or self-corrections.** "(I keep wanting to say 'almost' here, but it really was certain.)" Models rarely interrupt themselves like this.
- **Edits made before November 30, 2022.** ChatGPT's public launch. Anything older than that is, with very rare exceptions, not AI-written.

---

**Note:** Detectors (including this skill) are fallible. Humans write with some of these tells too, especially in professional or edited contexts. Use clusters and the human-signal list above; do not over-correct text that is already human.


---

## TECHNICAL MODULE

---
module_id: technical
version: 3.0.0
description: Technical module for code and engineering documentation
applies_to: code, technical docs, API docs, READMEs
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Technical

## Description

This module applies to code, technical documentation, API documentation, READMEs, and engineering writing. It preserves technical precision while removing AI voice patterns.

**When to Apply:**

- Code comments and docstrings
- API documentation
- README files
- Technical specifications
- Engineering design docs
- Commit messages
- Code review comments

**When NOT to Apply:**

- Creative writing
- Marketing copy
- Personal blogs (unless technical)

---

## TECHNICAL NUANCE

**Expertise isn't slop.** In technical contexts, words like "crucial", "pivotal", or "critical" are sometimes the exact right terms for describing requirements, dependencies, or system behavior.

**Rule:** If a word is required for technical accuracy, keep it. If it's there to add fake "gravitas" or marketing polish, cut it.

### Examples

**Acceptable (technical precision):**

> "The authentication step is **critical** - without it, any user can access admin endpoints."

**Unacceptable (fake gravitas):**

> "The authentication step is **absolutely critical** and **plays a pivotal role** in the **ever-evolving landscape** of modern security."

---

## TECHNICAL LITERAL PRESERVATION

**CRITICAL RULE:** Never modify the following, even if they match AI patterns:

### 1. Code and Identifiers

- Anything inside inline code/backticks: `` `foo_bar` ``, `` `--flag` ``, `` `path/to/file` ``
- Anything inside fenced code blocks (```)
- Function names, class names, variable names
- API endpoints, HTTP methods
- CLI commands and flags
- Configuration keys
- Error messages (exact text)
- Stack traces

**Before (AI-generated comment):**

```javascript
// This function adds two numbers together and returns the sum
function add(a, b) {
  return a + b;
}
```

**After (concise, human):**

```javascript
// Adds two numbers
function add(a, b) {
  return a + b;
}
```

**NOT (over-correcting):**

```javascript
// do math
function add(a, b) {
  return a + b;
}
```

### 2. Technical Specifications

- Version strings: `v2.3.0`, `Node 20.x`, `Python 3.11`
- URLs and query strings
- File paths (absolute and relative)
- Hashes, IDs, UUIDs
- Database schemas, table names
- Protocol names: `HTTP/2`, `WebSocket`, `gRPC`

### 3. Technical Accuracy

- Mathematical formulas
- Algorithm descriptions
- Data structures
- Type signatures
- Interface definitions

---

## CODE COMMENT PATTERNS

### Pattern T1: Redundant Comment Explanations

**Problem:** AI generates comments that explain obvious code, adding noise without value.

**Severity:** Low

**Before:**

```javascript
// Initialize the counter variable to zero
let counter = 0;

// Loop through the array and process each item
for (let i = 0; i < items.length; i++) {
  // Process the current item
  processItem(items[i]);
}
```

**After:**

```javascript
let counter = 0;

for (let i = 0; i < items.length; i++) {
  processItem(items[i]);
}
```

### Pattern T2: AI Signatures in Code

**Problem:** LLMs include self-referential comments or generation markers.

**Severity:** Critical

**Words to watch:**

- `// Generated by`
- `// Created with`
- `/* AI-generated */`
- `// This code was written by`
- `// Here is the refactored code:`

**Before:**

```javascript
// Generated by GitHub Copilot
// This function validates user input
function validateInput(input) {
  // Check if input is valid
  return input !== null;
}
```

**After:**

```javascript
function validateInput(input) {
  return input !== null;
}
```

### Pattern T3: Over-Explained Docstrings

**Problem:** AI generates verbose docstrings that restate the obvious.

**Severity:** Low

**Before:**

```python
def calculate_total(items):
    """
    This function calculates the total sum of all items in the list.

    Args:
        items: A list of numeric items to sum up

    Returns:
        The total sum of all items as a number
    """
    return sum(items)
```

**After:**

```python
def calculate_total(items):
    """Sum of items."""
    return sum(items)
```

### Pattern T4: Filler in Technical Writing

**Problem:** AI adds unnecessary hedging and filler to technical docs.

**Severity:** Low

**Before:**

> "It's important to note that this function should be called before initializing the database connection. Please be aware that failure to do so may potentially result in connection errors."

**After:**

> "Call this function before initializing the database connection. Failure to do so will result in connection errors."

---

## API DOCUMENTATION PATTERNS

### Pattern T5: Promotional API Descriptions

**Problem:** AI uses marketing language in API docs instead of clear technical descriptions.

**Severity:** Medium

**Words to watch:**

- "powerful", "robust", "seamless", "effortless"
- "game-changing", "revolutionary", "cutting-edge"
- "unlock the full potential", "take advantage of"

**Before:**

> "Our powerful API provides seamless integration with your existing systems, unlocking the full potential of your data pipeline."

**After:**

> "The API integrates with existing systems via REST endpoints. See `/api/v1/pipeline` for data ingestion."

### Pattern T6: Vague Technical Descriptions

**Problem:** AI uses vague language instead of specific technical details.

**Severity:** Medium

**Before:**

> "This endpoint handles various types of data processing operations efficiently."

**After:**

> "POST `/api/v1/process` accepts JSON payloads up to 10MB and returns processed results within 500ms (p95)."

---

## README PATTERNS

### Pattern T7: Generic Positive Conclusions

**Problem:** READMEs end with vague upbeat statements instead of actionable next steps.

**Severity:** Low

**Before:**

> "We're excited to see what you'll build with this tool! The future looks bright as we continue to improve and add features. Happy coding!"

**After:**

> "See [examples/](examples/) for usage examples. Report issues on the [GitHub tracker](issues)."

### Pattern T8: Over-Structured Installation Sections

**Problem:** AI uses rigid formatting for simple installation steps.

**Severity:** Low

**Before:**

> ### Installation Steps
>
> 1. **Prerequisites:** Ensure Node.js is installed
> 2. **Clone Repository:** Run `git clone`
> 3. **Install Dependencies:** Run `npm install`
> 4. **Verify Installation:** Run `npm test`

**After:**

> ### Installation
>
> Requires Node.js 20+.
>
> ```bash
> git clone <repo>
> npm install
> npm test  # verify installation
> ```

---

## COMMIT MESSAGE PATTERNS

### Pattern T9: Vague Commit Messages

**Problem:** AI generates generic commit messages that don't explain the change.

**Severity:** Medium

**Before:**

> "Update code to improve performance and fix issues"

**After:**

> "perf: reduce database queries in user lookup by 40%"

### Pattern T10: Over-Explained Commit Bodies

**Problem:** AI adds unnecessary context or apologies in commit messages.

**Severity:** Low

**Before:**

> "This commit fixes the bug that was causing issues. I hope this resolves the problem. Let me know if there are any other issues."

**After:**

> "Fix: null pointer in user service when email is missing"

---

## CODE REVIEW PATTERNS

### Pattern T11: Sycophantic Review Comments

**Problem:** AI uses overly polite or apologetic language in code reviews.

**Severity:** Low

**Before:**

> "Great work on this! I really like your approach. Just a small suggestion - would you mind considering adding a test for this edge case? No pressure though!"

**After:**

> "Consider adding a test for the null input edge case."

### Pattern T12: Hedged Technical Feedback

**Problem:** AI hedges technical feedback unnecessarily.

**Severity:** Low

**Before:**

> "I'm not entirely sure, but it seems like this might potentially cause a memory leak if the listener isn't cleaned up properly."

**After:**

> "This will cause a memory leak if the listener isn't cleaned up. Add `removeEventListener` in the cleanup function."

---

## ERROR HANDLING PATTERNS

### Pattern T13: Vague Error Messages

**Problem:** AI generates generic error messages that don't help debugging.

**Severity:** Medium

**Before:**

> "An error occurred while processing your request. Please try again later."

**After:**

> "Database connection failed: timeout after 30s. Check network connectivity and retry."

### Pattern T14: Over-Apologetic Errors

**Problem:** AI adds unnecessary apologies to error messages.

**Severity:** Low

**Before:**

> "We're sorry, but unfortunately an unexpected error has occurred. We apologize for the inconvenience."

**After:**

> "Internal error: failed to parse JSON at line 42, column 15."

---

## SEVERITY CLASSIFICATION

### Critical (must fix)

- Pattern T2: AI signatures in code

### High (strong AI signals)

- None for technical module

### Medium (moderate AI signals)

- Pattern T5: Promotional API descriptions
- Pattern T6: Vague technical descriptions
- Pattern T13: Vague error messages

### Low (weak AI signals)

- Pattern T1: Redundant comment explanations
- Pattern T3: Over-explained docstrings
- Pattern T4: Filler in technical writing
- Pattern T7: Generic positive conclusions
- Pattern T8: Over-structured installation
- Pattern T9: Vague commit messages
- Pattern T10: Over-explained commit bodies
- Pattern T11: Sycophantic review comments
- Pattern T12: Hedged technical feedback
- Pattern T14: Over-apologetic errors

---

## TECHNICAL WRITING BEST PRACTICES

### Do

- Use simple, direct language
- Provide specific technical details
- Include working code examples
- Document edge cases and error conditions
- Use consistent terminology
- Link to related documentation

### Don't

- Use marketing language in technical docs
- Add unnecessary hedging or apologies
- Explain obvious code
- Use vague descriptions ("various", "many", "several")
- Include AI signatures or generation markers

---

_Module Version: 3.0.0_
_Last Updated: 2026-03-03_
_Applies to: Code, technical docs, API docs, READMEs, commit messages, code reviews_


---

## ACADEMIC MODULE

---
module_id: academic
version: 3.0.0
description: Academic module for papers, essays, and formal research prose
applies_to: research papers, essays, dissertations, grant proposals
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Academic

## Description

This module applies to academic writing: research papers, essays, dissertations, grant proposals, and formal research prose. It maintains scholarly rigor while removing AI voice patterns.

**When to Apply:**

- Research papers
- Academic essays
- Dissertations and theses
- Grant proposals
- Literature reviews
- Conference submissions

**When NOT to Apply:**

- Creative writing
- Technical documentation
- Business communications

---

## ACADEMIC VOICE

**Scholarly precision matters.** Academic writing has specific conventions: hedging where appropriate, acknowledging limitations, citing sources properly. The goal is to remove AI patterns while preserving legitimate academic style.

**Rule:** Keep legitimate academic hedging ("may suggest", "appears to indicate"). Remove AI filler ("it is worth noting that", "it is important to emphasize").

---

## ACADEMIC PATTERNS

### Pattern A1: Vague Literature Citations

**Problem:** AI attributes claims to vague authorities without specific citations.

**Severity:** High

**Words to watch:**

- "Studies have shown"
- "Research indicates"
- "Experts agree"
- "It has been demonstrated"

**Before:**

> Studies have shown that climate change significantly impacts biodiversity. Research indicates that immediate action is necessary.

**After:**

> Smith et al. (2023) found that climate change reduced local biodiversity by 40% over two decades. Immediate conservation measures are recommended (Jones, 2024).

---

### Pattern A2: Formulaic Literature Review Sections

**Problem:** AI generates rigid, template-like literature review paragraphs.

**Severity:** Medium

**Before:**

> **Previous Research:** Previous research has explored this topic extensively. **Current Gap:** However, current research has limitations. **Our Contribution:** Our study addresses these gaps.

**After:**

> Prior work established the foundation for this study (Smith, 2022; Jones, 2023). However, these studies were limited to laboratory conditions. Our field study addresses this limitation.

---

### Pattern A3: Over-Hedging

**Problem:** AI over-qualifies statements beyond legitimate academic caution.

**Severity:** Low

**Before:**

> It could potentially be suggested that the results may possibly indicate a trend that might warrant further investigation.

**After:**

> The results suggest a trend warranting further investigation.

---

### Pattern A4: Generic Conclusions

**Problem:** AI ends papers with vague statements about "future research" and "broader implications."

**Severity:** Medium

**Before:**

> In conclusion, this study has provided valuable insights. Future research should explore these findings further. The implications are significant for the field.

**After:**

> This study demonstrates X under conditions Y. Future work should test whether X holds in real-world settings. The methodology may apply to similar problems in Z domain.

---

### Pattern A5: Promotional Abstract Language

**Problem:** AI uses marketing language in abstracts instead of clear findings.

**Severity:** Medium

**Words to watch:**

- "groundbreaking", "novel", "innovative"
- "comprehensive", "extensive", "thorough"
- "significant contributions", "valuable insights"

**Before:**

> This groundbreaking study provides comprehensive insights into the novel methodology, making significant contributions to the field.

**After:**

> We present a method achieving 95% accuracy on dataset X, improving on prior work by 12%.

---

### Pattern A6: Filler in Methodology

**Problem:** AI adds unnecessary words to methodology descriptions.

**Severity:** Low

**Before:**

> In order to achieve the goal of analyzing the data, we employed the use of statistical methods.

**After:**

> We analyzed the data using ANOVA.

---

### Pattern A7: Artificial Signposting

**Problem:** AI uses excessive structural markers in academic writing.

**Severity:** Low

**Words to watch:**

- "Firstly", "Secondly", "Thirdly"
- "In the first section", "In the second section"
- "This paper is organized as follows"

**Before:**

> Firstly, we review the literature. Secondly, we describe our methodology. Thirdly, we present results.

**After:**

> We review the literature (Section 2), describe our methodology (Section 3), and present results (Section 4).

---

### Pattern A8: Vague Quantitative Claims

**Problem:** AI makes imprecise quantitative statements.

**Severity:** Medium

**Before:**

> A significant number of participants showed improvement.

**After:**

> 73 of 100 participants (73%) showed improvement (p < 0.01).

---

## CITATION AND REFERENCING

### Pattern A9: Fake or Inaccurate Citations

**Problem:** AI generates plausible-looking but fake or inaccurate citations.

**Severity:** Critical

**Action:** Verify every citation against real databases (Google Scholar, DOI, PubMed).

**Before:**

> (Smith et al., 2023) found significant effects.

**After:**

> [Verify: Does Smith et al. 2023 actually exist? Check DOI.]

---

### Pattern A10: Citation Padding

**Problem:** AI adds unnecessary citations to appear authoritative.

**Severity:** Low

**Before:**

> Climate change is a serious problem [1-15].

**After:**

> Global average temperature has increased 1.1°C since 1880 (NASA, 2023).

---

## SEVERITY CLASSIFICATION

### Critical (must fix)

- Pattern A9: Fake or inaccurate citations

### High (strong AI signals)

- Pattern A1: Vague literature citations

### Medium (moderate AI signals)

- Pattern A2: Formulaic literature review sections
- Pattern A4: Generic conclusions
- Pattern A5: Promotional abstract language
- Pattern A8: Vague quantitative claims

### Low (weak AI signals)

- Pattern A3: Over-hedging
- Pattern A6: Filler in methodology
- Pattern A7: Artificial signposting
- Pattern A10: Citation padding

---

## ACADEMIC WRITING BEST PRACTICES

### Do

- Cite specific sources with verifiable references
- Use appropriate hedging for claims
- Report exact statistics and p-values
- Acknowledge limitations clearly
- Use field-standard terminology
- Follow journal/conference style guides

### Don't

- Use vague citations ("studies have shown")
- Add promotional language ("groundbreaking", "novel")
- Over-hedge beyond legitimate academic caution
- Pad citations unnecessarily
- Use marketing language in abstracts

---

_Module Version: 3.0.0_
_Last Updated: 2026-03-03_
_Applies to: Research papers, essays, dissertations, grant proposals, literature reviews_


---

## GOVERNANCE MODULE

---
module_id: governance
version: 3.0.0
description: Governance module for policy, risk, and compliance writing
applies_to: policies, risk assessments, compliance docs, legal writing
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Governance

## Description

This module applies to governance writing: policies, risk assessments, compliance documentation, legal writing, and regulatory submissions. It maintains precision and formality while removing AI voice patterns.

**When to Apply:**

- Company policies
- Risk assessments
- Compliance documentation
- Legal contracts
- Regulatory submissions
- Board reports

**When NOT to Apply:**

- Creative writing
- Marketing materials
- Informal communications

---

## GOVERNANCE VOICE

**Precision and clarity are critical.** Governance documents have legal and regulatory implications. Remove AI patterns while preserving necessary formality and precision.

**Rule:** Keep required legal/formal language. Remove AI filler, vague attributions, and promotional phrasing.

---

## GOVERNANCE PATTERNS

### Pattern G1: Vague Policy Language

**Problem:** AI uses imprecise language in policies where specificity is required.

**Severity:** High

**Before:**

> Employees should generally endeavor to maintain appropriate security practices where feasible.

**After:**

> Employees must enable two-factor authentication on all company accounts.

---

### Pattern G2: Hedged Risk Statements

**Problem:** AI over-hedges risk statements, weakening accountability.

**Severity:** High

**Before:**

> There may potentially be some risk that data could possibly be compromised in certain circumstances.

**After:**

> Risk: Unencrypted data in transit may be intercepted. Likelihood: Medium. Impact: High.

---

### Pattern G3: Promotional Compliance Language

**Problem:** AI uses marketing language in compliance documents.

**Severity:** Medium

**Words to watch:**

- "commitment to excellence", "dedication to"
- "best-in-class", "industry-leading"
- "unwavering commitment", "paramount importance"

**Before:**

> Our unwavering commitment to data protection demonstrates our dedication to best-in-class security practices.

**After:**

> We comply with GDPR Article 32 (security of processing) through encryption, access controls, and regular audits.

---

### Pattern G4: Vague Attributions in Policy

**Problem:** AI attributes requirements to vague authorities.

**Severity:** High

**Words to watch:**

- "Industry standards require"
- "Regulations state"
- "Experts recommend"

**Before:**

> Industry standards require regular security assessments.

**After:**

> SOC 2 Type II requires annual security assessments (AICPA, 2023).

---

### Pattern G5: Formulaic "Future Outlook" Sections

**Problem:** AI adds generic forward-looking statements to governance docs.

**Severity:** Low

**Before:**

> Looking ahead, we remain committed to continuous improvement. The future looks bright as we enhance our governance framework.

**After:**

> Next review date: 2027-03-03. Responsible: Chief Compliance Officer.

---

### Pattern G6: Over-Structured Risk Matrices

**Problem:** AI uses rigid formatting for risk descriptions that humans would write narratively.

**Severity:** Low

**Before:**

> **Risk Category:** Cybersecurity
> **Likelihood:** High
> **Impact:** Critical
> **Mitigation:** Implement controls

**After:**

> Cybersecurity risk is high with critical potential impact. Mitigation: implement access controls, encryption, and monitoring.

---

### Pattern G7: Filler in Legal Writing

**Problem:** AI adds unnecessary words to legal/policy text.

**Severity:** Medium

**Before:**

> In the event that an employee fails to comply with the provisions set forth herein, disciplinary action may be taken.

**After:**

> Employees who violate this policy face disciplinary action, up to and including termination.

---

### Pattern G8: Generic Positive Conclusions

**Problem:** AI ends governance docs with vague upbeat statements.

**Severity:** Low

**Before:**

> We are confident that these measures will ensure a bright and secure future for our organization.

**After:**

> This policy takes effect 2026-04-01. Questions: [compliance@company.com](mailto:compliance@company.com)

---

## COMPLIANCE AND REGULATORY

### Pattern G9: Vague Regulatory References

**Problem:** AI references regulations without specific sections or requirements.

**Severity:** High

**Before:**

> We comply with all applicable data protection regulations.

**After:**

> We comply with:
>
> - GDPR (EU) 2016/679: Articles 5, 6, 32
> - CCPA (California): Section 1798.100
> - HIPAA (US): 45 CFR Part 160

---

### Pattern G10: Missing Accountability

**Problem:** AI policies lack clear ownership and enforcement.

**Severity:** Medium

**Before:**

> This policy should be followed by all employees.

**After:**

> **Owner:** Chief Compliance Officer
> **Applies to:** All employees, contractors, vendors
> **Enforcement:** HR and Legal
> **Violations:** Report to [compliance@company.com](mailto:compliance@company.com)

---

## SEVERITY CLASSIFICATION

### Critical (must fix)

- None for governance module (precision varies by context)

### High (strong AI signals)

- Pattern G1: Vague policy language
- Pattern G2: Hedged risk statements
- Pattern G4: Vague attributions in policy
- Pattern G9: Vague regulatory references

### Medium (moderate AI signals)

- Pattern G3: Promotional compliance language
- Pattern G7: Filler in legal writing
- Pattern G10: Missing accountability

### Low (weak AI signals)

- Pattern G5: Formulaic "Future Outlook" sections
- Pattern G6: Over-structured risk matrices
- Pattern G8: Generic positive conclusions

---

## GOVERNANCE WRITING BEST PRACTICES

### Do

- Use precise, unambiguous language
- Cite specific regulations and sections
- Define clear ownership and accountability
- Include enforcement mechanisms
- Use consistent terminology
- Set specific review dates

### Don't

- Use vague language ("should", "may", "where feasible")
- Add promotional phrasing
- Hedge risk statements unnecessarily
- Reference vague authorities
- End with generic positive conclusions

---

_Module Version: 3.0.0_
_Last Updated: 2026-03-03_
_Applies to: Policies, risk assessments, compliance docs, legal writing, regulatory submissions_


---

## REASONING MODULE

---
module_id: reasoning
version: 1.0.0
description: Module for detecting and addressing LLM reasoning failures
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Humanizer Reasoning Module: LLM Reasoning Failures

This module identifies and addresses reasoning failures in Large Language Model (LLM) outputs that manifest as detectable patterns in the generated text.

## Description

## Reasoning Failure Categories

### Pattern R1: Depth-Dependent Reasoning Failures

- **Problem:** Accuracy decreases as reasoning chain lengthens
- **Severity:** Medium
- **Action:** Simplify complex explanations, remove tangential content, ensure focus

### Pattern R2: Context-Switching Failures

- **Problem:** Difficulty maintaining coherence across different knowledge domains
- **Severity:** High
- **Action:** Smooth transitions between topics, maintain consistent register and tone

### Pattern R3: Temporal Reasoning Limitations

- **Problem:** Errors in temporal sequence or causal reasoning tasks
- **Severity:** Medium
- **Action:** Clarify chronological order, strengthen causal connections

### Pattern R4: Abstraction-Level Mismatches

- **Problem:** Difficulty maintaining appropriate level of abstraction
- **Severity:** Medium
- **Action:** Bridge abstraction gaps with clear connections

### 5. Logical Fallacy Susceptibility

- **Sign:** Systematic reasoning errors that contradict formal logic
- **Action:** Identify and correct logical inconsistencies

### 6. Quantitative Reasoning Deficits

- **Sign:** Errors in numerical computation or quantitative understanding
- **Action:** Flag questionable numerical claims for review

### 7. Self-Consistency Failures

- **Sign:** Internal contradictions within a single output
- **Action:** Identify and resolve internal contradictions

### 8. Verification and Checking Deficiencies

- **Sign:** Lack of internal verification mechanisms
- **Action:** Add appropriate qualifiers, acknowledge uncertainties

## APPLICATION RULES

### When to Apply

- When text quality critically depends on logical consistency
- When dealing with technical, academic, or factual content
- When surface-level fixes are insufficient for naturalness

### When Not to Apply

- For general casual writing where logical depth isn't critical
- When computational efficiency is paramount
- When the text is already logically sound

## INTEGRATION WITH OTHER MODULES

- Core Humanizer addresses surface-level writing quality issues
- Reasoning module addresses deeper logical consistency issues
- Both modules can operate independently or in combination
- Reasoning module defers to Core for surface-level fixes

## QUALITY STANDARDS

All reasoning diagnostics must meet these standards:

- Corrections must be logically sound
- Claims must be verifiable or appropriately qualified
- Changes must improve accuracy and consistency
- Evidence for diagnoses must be documented
