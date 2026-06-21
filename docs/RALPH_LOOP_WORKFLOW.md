# Ralph Loop Self-Improvement Workflow

**Purpose:** Automated self-improvement using the official Ralph Loop extension

**Frequency:** Weekly (Mondays at 9:00 AM)

**Extension:** <https://github.com/gemini-cli-extensions/ralph>

---

## Installation

**Install the Ralph Loop extension:**

```bash
gemini extensions install https://github.com/gemini-cli-extensions/ralph --auto-update
```

**Configure `~/.gemini/settings.json`:**

```json
{
  "hooksConfig": {
    "enabled": true
  },
  "context": {
    "includeDirectories": ["~/.gemini/extensions/ralph"]
  }
}
```

**Recommended Security Settings** (`.gemini/settings.json`):

```json
{
  "tools": {
    "exclude": ["run_shell_command(git push)"],
    "allowed": [
      "run_shell_command(git commit)",
      "run_shell_command(git add)",
      "run_shell_command(git diff)",
      "run_shell_command(git status)"
    ]
  }
}
```

---

## Weekly Self-Improvement Cycles

### Cycle 1: AI Pattern Detection & Cleanup

**Command:**

```bash
/ralph:loop "Analyze SKILL.md and SKILL_PROFESSIONAL.md for AI writing patterns:

1. Scan for: 'stands as', 'testament to', 'crucial', 'pivotal', 'vibrant', 'showcasing'
2. For each pattern found:
   - Note the location (file:line)
   - Identify pattern type
   - Rewrite to remove AI-ism while preserving meaning
   - Add before/after example if helpful

3. After each iteration:
   - Run: npm test
   - Run: npm run validate
   - Count remaining AI patterns

4. Continue until:
   - AI pattern count is reduced by 50% OR
   - No further improvements identified OR
   - 5 iterations reached

When complete, output: <promise>AI_PATTERNS_CLEANED</promise>" \
--max-iterations 5 \
--completion-promise "AI_PATTERNS_CLEANED"
```

**Expected Duration:** 30-45 minutes

**Deliverables:**

- Reduced AI pattern count
- Improved pattern clarity
- Updated examples

---

### Cycle 2: Pattern Clarity & Example Quality

**Command:**

```bash
/ralph:loop "Review all pattern definitions in SKILL.md:

1. For each pattern (1-27):
   - Is description clear and actionable? (Rate 1-5)
   - Do before/after examples work? (Rate 1-5)
   - Is there overlap with other patterns? (Yes/No)
   - Is severity appropriate? (Critical/High/Medium/Low)

2. Improve patterns rated <4:
   - Clarify descriptions
   - Add missing examples
   - Merge redundant patterns
   - Adjust severity if needed

3. After each iteration:
   - Run: npm test
   - Run: npm run sync
   - Run: npm run validate

4. Continue until:
   - All patterns rated >=4 OR
   - No further improvements OR
   - 5 iterations reached

When complete, output: <promise>PATTERNS_CLARIFIED</promise>" \
--max-iterations 5 \
--completion-promise "PATTERNS_CLARIFIED"
```

**Expected Duration:** 45-60 minutes

**Deliverables:**

- Pattern quality ratings
- Improved descriptions
- Better examples

---

### Cycle 3: Architecture & Organization

**Command:**

```bash
/ralph:loop "Analyze repository structure and organization:

1. Review file organization:
   - Are related files grouped logically?
   - Any orphaned files?
   - Is structure intuitive?

2. Check module structure (ADR-001):
   - Do module references match actual files?
   - Are modules properly separated by concern?
   - Is compile process clear?

3. Review documentation:
   - Is all functionality documented?
   - Are examples current?
   - Is onboarding clear?

4. Analyze scripts:
   - Are scripts well-organized?
   - Is error handling adequate?
   - Are scripts tested?

5. After each iteration:
   - Run: npm test
   - Run: npm run validate
   - Document improvements made

6. Continue until:
   - All issues addressed OR
   - No further improvements OR
   - 5 iterations reached

When complete, output: <promise>ARCHITECTURE_IMPROVED</promise>" \
--max-iterations 5 \
--completion-promise "ARCHITECTURE_IMPROVED"
```

**Expected Duration:** 45-60 minutes

**Deliverables:**

- Reorganized files (if needed)
- Updated documentation
- Fixed broken references

---

### Cycle 4: Upstream Alignment

**Command:**

```bash
/ralph:loop "Compare with upstream blader/humanizer:

1. Review open PRs:
   - #49 (Claude compatibility)
   - #39 (patterns #25-27)
   - #16 (AI-signatures fix)
   - #17 (offline robustness)
   - #44 (Wikipedia sync - security review)

2. For each PR:
   - Assess benefit to our implementation
   - Estimate implementation effort
   - Identify breaking changes
   - Create adoption plan or rejection rationale

3. Implement high-value, low-risk adopt ions:
   - Patterns #25-27 (if quality is good)
   - AI-signatures fix (if aligns with Technical Module)
   - Offline robustness patterns

4. After each iteration:
   - Run: npm test
   - Run: npm run sync
   - Run: npm run validate

5. Continue until:
   - All critical PRs assessed OR
   - High-value PRs implemented OR
   - 5 iterations reached

When complete, output: <promise>UPSTREAM_ALIGNED</promise>" \
--max-iterations 5 \
--completion-promise "UPSTREAM_ALIGNED"
```

**Expected Duration:** 60-90 minutes

**Deliverables:**

- Upstream adoption decisions
- Implemented patterns (if applicable)
- Security review notes

---

## Validation After Each Cycle

**Run full validation suite:**

```bash
# Tests
npm test

# Linting
npm run lint:all

# Compile and validate maintained surface
npm run sync
npm run validate

# File size check
wc -l SKILL.md SKILL_PROFESSIONAL.md references/core-patterns.md

# AI pattern count
grep -c -i "stands as\|testament to\|crucial\|pivotal\|vibrant\|showcasing" SKILL.md SKILL_PROFESSIONAL.md
```

**Quality Gates:**

- [ ] All tests passing
- [ ] No linting errors
- [ ] `npm run sync` and `npm run validate` pass
- [ ] SKILL.md under 500 lines; 39-pattern catalog in `src/modules/SKILL_CORE_PATTERNS.md`
- [ ] AI pattern count reduced

---

## Documentation & Commit

**After each cycle:**

```bash
# Create summary
cat > docs/self-improvement/$(date +%Y-%m-%d)-cycle-N-summary.md << EOF
# Self-Improvement Cycle N - $(date +%Y-%m-%d)

## Ralph Loop Command
[command used]

## Changes Made
- [list changes]

## Metrics
- AI patterns: before → after
- Pattern clarity: before → after
- Test pass rate: X/X

## Lessons Learned
[what worked, what didn't]
EOF

# Commit
git add -A
git commit -m "self-improvement(cycle-N): [brief summary]

- Ralph Loop iterations: N
- Patterns improved: M
- Documentation: X files
- Tests: X/X passing

Track: conductor/self-improvement
Cycle: weekly-$(date +%Y-%m-%d)"

# Create PR
gh pr create --title "Self-Improvement Cycle N - $(date +%Y-%m-%d)" \
  --body "Weekly Ralph Loop self-improvement. See docs for details." \
  --base main
```

---

## Scheduling

### Manual Weekly Execution

**Every Monday at 9:00 AM:**

```bash
# Choose cycle based on current needs
/ralph:loop "[cycle command]" --max-iterations 5 --completion-promise "[PROMISE]"
```

### Automated with GitHub Actions

**Workflow:** `.github/workflows/ralph-loop-weekly.yml`

```yaml
name: Weekly Ralph Loop Self-Improvement

on:
  schedule:
    - cron: '0 9 * * 1'  # Mondays at 9 AM UTC
  workflow_dispatch:

jobs:
  ralph-loop:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Install Ralph Loop Extension
        run: gemini extensions install https://github.com/gemini-cli-extensions/ralph
      
      - name: Run Ralph Loop Cycle
        run: |
          # Note: Ralph Loop requires interactive Gemini CLI session
          # This step documents the command for manual execution
          echo "Ralph Loop requires interactive session"
          echo "Run manually: /ralph:loop \"[command]\" --max-iterations 5"
      
      - name: Run Validation
        run: |
          npm test
          npm run validate
```

**Note:** Ralph Loop requires an interactive Gemini CLI session. The GitHub Actions workflow can prepare the environment and run validation, but the actual loop should be run manually.

---

## Completion Criteria

**Cycle is complete when:**

1. Ralph Loop completes with completion promise
2. All validation passes (100% test rate)
3. Metrics improved or stable
4. Documentation updated
5. PR created and reviewed

**Maximum Iterations:** 5 per cycle

**Stop Conditions:**

- Completion promise output
- No further improvements identified
- Max iterations reached
- Validation failures (requires manual intervention)

---

## Metrics Dashboard

| Metric | Baseline | Target | Current |
| --- | --- | --- | --- |
| SKILL.md lines | ~180 | <500 | - |
| SKILL_PROFESSIONAL.md lines | ~96 | <500 | - |
| Pattern catalog count | 39 | 39+ | - |
| AI patterns (count) | [count] | -10% | - |
| Pattern clarity (avg) | 4.0 | >4.5 | - |
| Test pass rate | 100% | 100% | - |
| Upstream triage | manual | `npm run check:upstream` | - |

---

## Troubleshooting

### Ralph Loop Stuck in Infinite Cycle

**Symptom:** Keeps iterating beyond max iterations

**Fix:**

```bash
# Cancel the loop
/ralph:cancel

# Review prompt - may be too open-ended
# Tighten completion criteria
# Reduce max iterations to 3
```

### Low Improvement Rate

**Symptom:** <5 improvements per cycle

**Fix:**

1. Review prompt specificity
2. Add more context about goals
3. Include examples of acceptable changes
4. Adjust focus areas

### Validation Failures

**Symptom:** Tests fail after Ralph Loop changes

**Fix:**

1. Review changes made
2. Revert problematic changes
3. Adjust prompt to prevent similar issues
4. Add validation to completion criteria

---

## Best Practices

### Prompt Writing

1. **Clear Completion Criteria** - Define verifiable "done" conditions
2. **Use Safety Hatches** - Always set `--max-iterations`
3. **Encourage Self-Correction** - Structure for work→verify→debug cycles
4. **Include Validation** - Run tests after each iteration

### Safety

1. **Run in Sandbox Mode:**

   ```bash
   gemini -s -y
   ```

2. **Restrict Dangerous Tools:**

   ```json
   {
     "tools": {
       "exclude": ["run_shell_command(git push)"]
     }
   }
   ```

3. **Review Before Merging:**
   - Always review PR before merging
   - Run full validation suite
   - Test on sample texts

---

*Workflow Version: 2.0 (Ralph Loop Extension)*
*Created: 2026-03-03*
*Updated: 2026-03-03*
*Next Review: 2026-04-03*
