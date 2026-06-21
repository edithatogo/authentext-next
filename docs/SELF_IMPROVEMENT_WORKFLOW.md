# Self-Improvement Workflow

**Purpose:** Automated self-improvement for the Humanizer repository

**Frequency:** Weekly (Mondays at 9:00 AM)

**Primary Tool:** Ralph Loop Extension (<https://github.com/gemini-cli-extensions/ralph>)

**Alternative:** Manual process (if Ralph Loop unavailable)

---

## Quick Start

### With Ralph Loop Extension (Recommended)

**Install:**

```bash
gemini extensions install https://github.com/gemini-cli-extensions/ralph --auto-update
```

**Run Cycle:**

```bash
/ralph:loop "[cycle command]" --max-iterations 5 --completion-promise "[PROMISE]"
```

**See:** [`RALPH_LOOP_WORKFLOW.md`](./RALPH_LOOP_WORKFLOW.md) for detailed Ralph Loop cycles.

---

## Manual Alternative (If Ralph Loop Unavailable)

Follow the manual process in the original workflow documentation.

---

## Weekly Self-Improvement Cycle

### Step 1: Preparation (15 minutes)

**Create Working Branch:**

```bash
git checkout -b self-improvement-YYYY-MM-DD
```

**Gather Metrics:**

```bash
# Count AI patterns in skill files
grep -c "stands as\|testament to\|crucial\|pivotal" SKILL.md SKILL_PROFESSIONAL.md

# Check file sizes
wc -l SKILL.md SKILL_PROFESSIONAL.md references/core-patterns.md

# Upstream triage
npm run check:upstream
```

**Document Baseline:**
Create `docs/self-improvement/YYYY-MM-DD-baseline.md` with:

- Current file sizes
- AI pattern count
- Known issues
- Goals for this cycle

---

### Step 2: Analysis Pass 1 - AI Pattern Detection (30 minutes)

**Prompt:**

```markdown
Scan SKILL.md and SKILL_PROFESSIONAL.md for AI writing patterns:

1. Significance inflation: "stands as", "testament to", "pivotal", "crucial"
2. Superficial -ing analyses: "highlighting", "underscoring", "emphasizing"
3. Promotional language: "vibrant", "rich", "profound", "showcasing"
4. Vague attributions: "experts argue", "observers note"
5. Em dash overuse
6. Rule of three forcing
7. Collaborative artifacts: "I hope this helps", "Certainly!"

For each pattern found:
- Location (file:line)
- Pattern type
- Suggested fix
- Severity (Critical/High/Medium/Low)

Output as a table.
```

**Action:**

- Review findings
- Apply high-confidence fixes
- Flag uncertain cases for manual review

---

### Step 3: Analysis Pass 2 - Pattern Clarity (30 minutes)

**Prompt:**

```markdown
Review all pattern definitions in SKILL.md:

1. Is the pattern description clear and actionable?
2. Do before/after examples effectively demonstrate the issue?
3. Are there redundant or overlapping patterns?
4. Is the severity classification appropriate?
5. Would a newcomer understand this pattern?

For each pattern, rate:
- Clarity: 1-5
- Example Quality: 1-5
- Necessity: Essential/Useful/Optional

Flag patterns needing improvement.
```

**Action:**

- Improve low-rated patterns
- Add missing examples
- Clarify ambiguous descriptions
- Merge redundant patterns

---

### Step 4: Analysis Pass 3 - Architecture & Organization (30 minutes)

**Prompt:**

```markdown
Analyze the repository structure:

1. **File Organization:**
   - Are related files grouped logically?
   - Are there orphaned files?
   - Is the structure intuitive?

2. **Module Structure:**
   - Do module references match actual files?
   - Are modules properly separated by concern?
   - Is the compile process clear?

3. **Documentation:**
   - Is all functionality documented?
   - Are examples current and accurate?
   - Is onboarding clear for new contributors?

4. **Automation:**
   - Are scripts well-organized?
   - Is error handling adequate?
   - Are scripts tested?

List specific improvements for each category.
```

**Action:**

- Reorganize files if needed
- Update documentation
- Fix broken references
- Improve script error handling

---

### Step 5: Analysis Pass 4 - Upstream Alignment (30 minutes)

**Check Upstream:**

```bash
# Fetch latest from upstream
git fetch upstream main

# Check for new PRs
# Visit: https://github.com/blader/humanizer/pulls

# Review new patterns or features
```

**Prompt:**

```markdown
Compare current implementation with upstream blader/humanizer:

1. Are there new patterns we haven't adopted?
2. Are there architectural improvements?
3. Are there bug fixes we need?
4. Are there features that would benefit users?

For each potential adoption:
- Benefit to our users
- Implementation effort
- Breaking changes
- Recommendation (Adopt/Defer/Reject)
```

**Action:**

- Create adoption plan for high-value items
- Document deferrals with rationale
- Close loop with upstream if rejecting

---

### Step 6: Validation & Testing (30 minutes)

**Run Full Validation:**

```bash
# Linting
npm run lint:all

# Tests
npm test

# Compile and validate maintained surface
npm run sync
npm run validate

# File size check
wc -l SKILL.md SKILL_PROFESSIONAL.md references/core-patterns.md
```

**Quality Gates:**

- [ ] All tests passing
- [ ] No linting errors
- [ ] `npm run sync` and `npm run validate` pass
- [ ] SKILL.md under 500 lines; pattern catalog at 39 patterns in `src/modules/SKILL_CORE_PATTERNS.md`
- [ ] AI pattern count reduced from baseline

---

### Step 7: Documentation & Commit (15 minutes)

**Create Summary:**
Create `docs/self-improvement/YYYY-MM-DD-summary.md`:

- Changes made
- Patterns improved
- Architecture changes
- Upstream adoptions
- Metrics before/after
- Lessons learned

**Commit:**

```bash
git add -A
git commit -m "self-improvement(YYYY-MM-DD): [brief summary]

- Pattern improvements: N patterns updated
- Documentation: M files updated
- Architecture: [changes]
- Upstream: [adoptions]

Track: conductor/self-improvement
Cycle: weekly-YYYY-MM-DD"

git push -u origin self-improvement-YYYY-MM-DD
```

**Create PR:**

```bash
gh pr create --title "Self-Improvement Cycle YYYY-MM-DD" \
  --body "Weekly self-improvement cycle. See docs/self-improvement/YYYY-MM-DD-summary.md for details." \
  --base main
```

---

## Completion Criteria

**Cycle is complete when:**

1. All 7 steps completed
2. Validation passes (100% test pass rate)
3. AI pattern count reduced or stable
4. Documentation updated
5. PR created and reviewed
6. Lessons learned documented

**Maximum Iterations:** 5 passes per analysis type

**Stop Conditions:**

- No further improvements identified
- Diminishing returns (<5 improvements per pass)
- Time budget exceeded (3 hours)

---

## Metrics to Track

| Metric | Baseline | Target | Current |
| --- | --- | --- | --- |
| SKILL.md lines | ~180 | <500 | - |
| SKILL_PROFESSIONAL.md lines | ~96 | <500 | - |
| references/core-patterns.md lines | catalog | stable | - |
| Pattern catalog count | 39 | 39+ | - |
| AI patterns (count) | - | -10% | - |
| Pattern clarity (avg) | - | >4.0 | - |
| Test pass rate | 100% | 100% | - |
| Upstream triage | manual | `npm run check:upstream` | - |

---

## Guardrails

### Never Auto-Change

- YAML frontmatter `version:` field
- `allowed-tools:` without security review
- Module references without ADR
- Core patterns (1-24) without testing
- Adapter bundles (removed; Agent Skills + `references/` is the distribution model)
- CI/CD configuration without testing

### Always Require Human Review

- Security-related changes
- Breaking changes to skill interface
- New external dependencies
- Major architectural changes
- Release version bumps

---

## Schedule

**Weekly Cycle:**

- **When:** Mondays, 9:00 AM - 12:00 PM
- **Duration:** 3 hours max
- **Owner:** Rotating (assign in weekly planning)
- **PR Review:** Within 24 hours

**Monthly Retrospective:**

- **When:** Last Friday of month
- **Duration:** 1 hour
- **Focus:** Trends, patterns, process improvements
- **Output:** Monthly self-improvement report

---

## Tools & Scripts

### Pattern Counter

```bash
#!/bin/bash
# scripts/count-ai-patterns.sh

echo "=== AI Pattern Count ==="
echo ""
echo "SKILL.md:"
grep -c -i "stands as\|testament to\|crucial\|pivotal\|vibrant\|showcasing" SKILL.md || echo "0"
echo ""
echo "SKILL_PROFESSIONAL.md:"
grep -c -i "stands as\|testament to\|crucial\|pivotal\|vibrant\|showcasing" SKILL_PROFESSIONAL.md || echo "0"
```

### File Size Monitor

```bash
#!/bin/bash
# scripts/check-file-sizes.sh

echo "=== File Size Check ==="
echo ""
wc -l SKILL.md SKILL_PROFESSIONAL.md references/core-patterns.md
echo ""
echo "Limits: SKILL.md <500, SKILL_PROFESSIONAL.md <500 (Agent Skills spec)"
```

### Upstream Triage

```bash
npm run check:upstream
```

---

## Continuous Improvement

**After Each Cycle:**

1. What worked well?
2. What could be improved?
3. What patterns keep appearing?
4. Are we making progress on long-term goals?

**Monthly:**

- Review all weekly cycles
- Identify recurring issues
- Adjust prompts and process
- Update this workflow document

---

*Workflow Version: 2.0*
*Updated: 2026-06-10 (Agent Skills migration, conductor/self-improvement paths)*
