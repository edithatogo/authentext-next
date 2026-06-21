#!/usr/bin/env node

import { execSync } from 'child_process';
import {
  getLocalFullName,
  getLocalPatternCount,
  getUpstreamFullName,
  getUpstreamUrl,
  PATHS,
  UPSTREAM,
  countPatternsInMarkdown,
} from './lib/repo-config.js';
import { formatTriageTable, triageUpstreamItem } from './lib/upstream-triage.js';

/**
 * @param {string} cmd
 * @returns {string}
 */
function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe', cwd: process.cwd() }).trim();
  } catch {
    return '';
  }
}

/**
 * @param {string[]} args
 * @returns {unknown|null}
 */
function runGhJson(args) {
  try {
    const output = execSync(`gh ${args.join(' ')}`, {
      encoding: 'utf8',
      stdio: 'pipe',
      shell: true,
    });
    return JSON.parse(output);
  } catch {
    return null;
  }
}

/**
 * @param {string} cmd
 * @returns {string}
 */
function runGhRaw(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe', shell: true }).trim();
  } catch {
    return '';
  }
}

/**
 * Fetch upstream SKILL.md via GitHub CLI and count patterns.
 * @returns {number|null}
 */
function getUpstreamPatternCount() {
  const repo = getUpstreamFullName();
  const ref = UPSTREAM.defaultBranch;
  const rawMarkdown = runGhRaw(
    `gh api "repos/${repo}/contents/SKILL.md?ref=${ref}" -H "Accept: application/vnd.github.raw"`
  );

  if (rawMarkdown) {
    return countPatternsInMarkdown(rawMarkdown);
  }

  const encoded = runGhJson(['api', `repos/${repo}/contents/SKILL.md`, '-f', `ref=${ref}`]);

  if (encoded && typeof encoded.content === 'string') {
    const markdown = Buffer.from(encoded.content.replace(/\n/g, ''), 'base64').toString('utf8');
    return countPatternsInMarkdown(markdown);
  }

  return null;
}

function printPatternDiff() {
  const localCount = getLocalPatternCount();
  const upstreamCount = getUpstreamPatternCount();

  console.log('=== Pattern catalog ===\n');
  console.log(`Local module:  ${PATHS.skillCoreModule}`);
  console.log(`Local patterns:  ${localCount ?? 'unknown'}`);
  console.log(`Upstream SKILL:  ${getUpstreamFullName()}/${UPSTREAM.defaultBranch}`);
  console.log(`Upstream patterns: ${upstreamCount ?? 'unknown (gh unavailable or fetch failed)'}`);

  if (localCount !== null && upstreamCount !== null && localCount !== upstreamCount) {
    const delta = localCount - upstreamCount;
    const direction = delta > 0 ? 'ahead' : 'behind';
    console.log(
      `\nDelta: local is ${Math.abs(delta)} pattern(s) ${direction} of upstream SKILL.md`
    );
  } else if (localCount !== null && upstreamCount !== null) {
    console.log('\nPattern counts match between local catalog and upstream SKILL.md');
  }
}

function printGhTriage() {
  if (!run('gh --version')) {
    console.log('\n=== Upstream triage ===\n');
    console.log('GitHub CLI (gh) not available. Install gh to list open PRs/issues.');
    return;
  }

  const repoFlag = `-R ${getUpstreamFullName()}`;
  const openPrs =
    runGhJson([
      'pr',
      'list',
      repoFlag,
      '--state',
      'open',
      '--limit',
      '15',
      '--json',
      'number,title',
    ]) || [];
  const openIssues =
    runGhJson([
      'issue',
      'list',
      repoFlag,
      '--state',
      'open',
      '--limit',
      '15',
      '--json',
      'number,title',
    ]) || [];

  const triageRows = [
    ...openPrs.map((pr) => triageUpstreamItem(pr, 'pr')),
    ...openIssues.map((issue) => triageUpstreamItem(issue, 'issue')),
  ];

  console.log('\n=== Upstream triage (open PRs and issues) ===\n');
  console.log(formatTriageTable(triageRows));
  console.log(
    '\nRecord explicit adopt/defer/reject decisions in conductor/self-improvement/upstream-decision-log.md'
  );
}

function getUpstreamHeadCommit() {
  const upstreamUrl = getUpstreamUrl();
  try {
    const output = execSync(`git ls-remote ${upstreamUrl} ${UPSTREAM.defaultBranch}`, {
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
    const firstLine = output.split('\n')[0] || '';
    return firstLine.split(/\s+/)[0] || '';
  } catch {
    return '';
  }
}

function printGitHeadComparison() {
  const upstreamUrl = getUpstreamUrl();
  const upstreamCommit = getUpstreamHeadCommit();
  const localCommit = run('git rev-parse HEAD');

  console.log('=== Humanizer Upstream Check ===\n');
  console.log(`Local repository: ${getLocalFullName()}`);
  console.log(`Upstream:       ${upstreamUrl}`);
  console.log(`Upstream HEAD:  ${upstreamCommit ? upstreamCommit.slice(0, 7) : 'unknown'}`);
  console.log(`Local HEAD:     ${localCommit ? localCommit.slice(0, 7) : 'unknown'}`);

  if (!upstreamCommit) {
    console.log('\nCould not fetch upstream HEAD. Skipping git diff recommendations.');
    return;
  }

  if (upstreamCommit === localCommit) {
    console.log('\nLocal HEAD matches upstream main (same commit).');
  } else {
    console.log('\nLocal HEAD differs from upstream main.');
    console.log('\nSuggested review commands:');
    console.log(`  gh repo view ${getUpstreamFullName()}`);
    console.log(`  git fetch ${upstreamUrl} ${UPSTREAM.defaultBranch}`);
    console.log(`  git log ${upstreamUrl}/${UPSTREAM.defaultBranch} --oneline -10`);
  }
}

function printSelfImprovementHint() {
  console.log('\n=== Self-improvement cycle ===');
  console.log('Gather live repo intelligence:');
  console.log('  node scripts/gather-repo-data.js');
  console.log('  node scripts/render-self-improvement-issue.js');
  console.log('\nValidate maintained surface:');
  console.log('  npm run sync && npm run validate && npm test');
}

function main() {
  printGitHeadComparison();
  printPatternDiff();
  printGhTriage();
  printSelfImprovementHint();
}

main();
