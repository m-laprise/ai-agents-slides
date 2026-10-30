// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';

const sources = {
  supervision: { label: 'Supervise: GitHub’s task guidance', href: 'https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results' },
  review: { label: 'Review: Google’s checklist', href: 'https://google.github.io/eng-practices/review/reviewer/looking-for.html' },
  git: { label: 'Learn Git: Software Carpentry', href: 'https://swcarpentry.github.io/git-novice/04-changes.html' },
  testing: { label: 'Learn unit testing: R Packages, ch. 13', href: 'https://r-pkgs.org/testing-basics.html' },
  expectations: { label: 'R reference: testthat expectations', href: 'https://testthat.r-lib.org/reference/equality-expectations.html' },
};

export const checkingWorkSlides = [
  {
    id: 'supervise-and-review',
    kind: 'checking-work checking-review',
    title: 'Supervise and review each change',
    summary: 'Keep tasks manageable, inspect the actual changes, and use Git to preserve checkpoints.',
    content: <>
      <p className="lead">AI can make convincing mistakes. You remain responsible for the code and the conclusions drawn from it.</p>
      <dl className="checking-rows">
        <div><dt>Supervise</dt><dd>Set a small task and agree on what success looks like. Review the plan and ask the agent to pause before expanding the work.</dd></div>
        <div><dt>Review</dt><dd>Read the changed lines (the <strong>diff</strong>) and inspect the outputs. Check data exclusions, joins, and model choices against the intended analysis.</dd></div>
        <div><dt>Use version control</dt><dd><strong>Git</strong> saves checkpoints called <strong>commits</strong>, so you can compare or recover versions. Save a baseline before editing and commit each checked change.</dd></div>
      </dl>
    </>,
    sources: [sources.supervision, sources.review, sources.git],
  },
  {
    id: 'test-code-and-results',
    kind: 'checking-work checking-tests',
    title: 'Test the code and check the results',
    summary: 'Decide what needs testing, establish expected answers, and inspect the analysis outputs.',
    content: <>
      <p className="lead">Code can run successfully and still be wrong. Verify the answers you expect.</p>
      <div className="checking-test-columns">
        <section>
          <h2>Unit tests</h2>
          <p>A unit test checks a function against an expected answer. Save tests to catch errors after later edits.</p>
          <div className="example">
            <div className="example-label">Example: test your recoding function</div>
            <pre>{`testthat::expect_equal(
  recode_binary(c(1, 2, NA)),
  c(0, 1, NA)
)`}</pre>
          </div>
          <p className="checking-example-note">Expected: 1 → 0, 2 → 1; NA stays missing.</p>
        </section>
        <section>
          <h2>Decide what needs testing</h2>
          <p>Identify the errors that could affect your results, then choose tests that would catch them. Work out the expected answers yourself, including how missing values and invalid inputs should be handled.</p>
          <h2>Check the full analysis</h2>
          <p>Rerun in a fresh R session. Compare sample sizes and key estimates with a trusted reference, and open the saved plots.</p>
        </section>
      </div>
    </>,
    sources: [sources.testing, sources.expectations, sources.review],
  },
];
