// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';

const sources = {
  silentErrors: { label: 'DAPLab: silent failures', href: 'https://daplab.cs.columbia.edu/general/2026/09/18/flowcheck-catching-silent-failures.html' },
  karpathy: { label: 'Karpathy: coding with agents', href: 'https://x.com/karpathy/status/2015883857489522876' },
  verbosity: { label: 'Ronacher: Content for Content’s Sake', href: 'https://lucumr.pocoo.org/2026/5/4/content-for-contents-sake/' },
  scope: { label: 'Hashimoto: My AI Adoption Journey', href: 'https://mitchellh.com/writing/my-ai-adoption-journey' },
  rewardHacking: { label: 'METR: observed reward hacking', href: 'https://metr.org/blog/2025-06-05-recent-reward-hacking/' },
  email: { label: 'Summer Yue: an email agent incident', href: 'https://simonwillison.net/2026/Feb/23/summer-yue/' },
  injection: { label: 'Willison: the lethal trifecta', href: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/' },
  researchData: { label: 'Princeton: research data security', href: 'https://ria.princeton.edu/research-data-security' },
  taste: { label: 'Air Street: Can AI learn scientific taste?', href: 'https://press.airstreet.com/p/ai-scientific-taste' },
  design: { label: 'Draux: Coherent, plausible, and wrong', href: 'https://researchmusings.substack.com/p/coherent-plausible-and-wrong-input' },
  understanding: { label: 'Messeri & Crockett: illusions of understanding', href: 'https://www.nature.com/articles/s41586-024-07146-0' },
  explanations: { label: 'Willison: interactive explanations', href: 'https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/' },
  workflow: { label: 'Ronacher: Agent Psychosis', href: 'https://lucumr.pocoo.org/2026/1/18/agent-psychosis/' },
  review: { label: 'Willison: anti-patterns', href: 'https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/' },
  instructions: { label: 'Codex: AGENTS.md', href: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md' },
  permissions: { label: 'Codex: access settings', href: 'https://learn.chatgpt.com/docs/agent-approvals-security' },
};

function Points({ items, className = '' }) {
  return <dl className={`pitfall-points ${className}`}>{items.map(([title, text]) =>
    <div key={title}><dt>{title}</dt><dd>{text}</dd></div>
  )}</dl>;
}

function Case({ label, children }) {
  return <div className="pitfall-case"><p className="pitfall-caption">{label}</p>{children}</div>;
}

function Advice({ groups, items }) {
  return <aside className="pitfall-advice" aria-label="Advice">
    <span className="pitfall-advice-label">Advice</span>
    {items ? <ul className="advice-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul> :
    <ul className="advice-groups">{groups.map(([label, items], i) =>
      <li key={i}><strong>{label}</strong><ul>{items.map((item, j) => <li key={j}>{item}</li>)}</ul></li>
    )}</ul>}
  </aside>;
}

const pitfallsContent = [
  {
    id: 'hallucinations-and-silent-errors',
    bucket: 'Quality',
    title: 'Hallucinations and silent errors',
    summary: 'Plausible answers and successful runs can hide incorrect results.',
    content: <>
      <div className="pitfall-columns">
        <Points items={[
          ['Hallucinations', 'Made-up citations, nonexistent functions, or explanations that do not match the code.'],
          ['Silent errors', 'The code runs, but drops observations by mistake, never saves an output, or hides an error.'],
        ]} />
        <Case label="Example from DAPLab, 2026">
          <p>In DAPLab’s example, an agent adds promo codes to an online shop. Entering a valid code produces “Discount applied!”</p>
          <p>The code calculates a discount, but never saves it or updates the displayed total.</p>
        </Case>
      </div>
      <Advice groups={[
        ['Code + debugger', [
          'Test the function with an input whose expected output you know.',
          'Step through one case in the debugger.',
          'Open the saved output and compare it with the expected result.',
        ]],
        ['Sources', [
          'Verify that the cited source supports the claim or contains the named function.',
        ]],
      ]} />
    </>,
    sources: [sources.silentErrors],
  },
  {
    id: 'slop-verbosity-complexity',
    bucket: 'Quality',
    title: 'Slop, verbosity, and unnecessary complexity',
    summary: 'More output and more elaborate software can make work harder to assess.',
    content: <>
      <Points className="pitfall-rows" items={[
          ['Slop and verbosity', 'Reports, slides, and apps can fill up with generic prose, redundant features, and repetitive or obsolete code left in place.'],
          ['Software engineering bias', 'An agent may build a package or add layers of helper functions for a task that only needs a short script.'],
          ['Form over substance', 'Asking for a polished report can shift attention from reasoning to layout. The content may lose nuance or become less accurate while looking better.'],
      ]} />
      <Advice groups={[
        ['Prompt', [
          'Ask for a script unless a package is needed.',
          'Draft findings in plain text before requesting a formatted report.',
        ]],
        ['Fresh agent', [
          'In a fresh session, ask an agent to cut redundant prose, unused code, and unnecessary features while preserving substance and behavior.',
        ]],
      ]} />
    </>,
    sources: [sources.verbosity, sources.karpathy],
  },
  {
    id: 'scope-and-follow-through',
    bucket: 'Control',
    title: 'Scope and follow-through',
    summary: 'Agents may stop early, change unrelated work, or continue past the requested boundary.',
    content: <>
      <Case label="Example">
        <p>You ask: “Fix the date-parsing error and rerun the script.”</p>
        <div className="pitfall-columns pitfall-case-columns">
          <Points items={[
            ['Stops too soon', 'It edits the code and says “fixed,” but never reruns the script.'],
          ]} />
          <Points items={[
            ['Goes too far', 'It rewrites the cleaning pipeline and changes which observations are kept.'],
          ]} />
        </div>
      </Case>
      <p className="body-note">Earlier instructions can also get lost as a conversation grows.</p>
      <Advice groups={[
        ['Prompt', [
          'Name the files to change and the test command to run.',
          'For an unclear task, ask for a plan before edits.',
        ]],
        [<><code>AGENTS.md</code> + code</>, [
          <>Save rules and test commands in <code>AGENTS.md</code>.</>,
          <>Add a <strong>regression test</strong>: an automated test that catches a bug if a later change brings it back.</>,
        ]],
      ]} />
    </>,
    sources: [sources.karpathy, sources.scope, sources.instructions],
  },
  {
    id: 'reward-hacking',
    bucket: 'Control',
    title: 'Reward hacking',
    summary: 'Meeting a visible success criterion while undermining the intended task.',
    content: <>
      <p className="lead">Reward hacking means finding a way to score well without doing the job.</p>
      <Case label="Reported examples · METR evaluations, 2025">
        <div className="pitfall-columns reward-examples">
          <div>
            <p><strong>Task:</strong> Write a fast calculation function.</p>
            <p><strong>Score:</strong> Shorter runtime earns a higher score.</p>
            <p><strong>Agent’s action:</strong> Changed the timer to report shorter runtimes, without speeding up the function.</p>
          </div>
          <div>
            <p><strong>Task:</strong> Write a program to solve coding problems.</p>
            <p><strong>Score:</strong> Fraction of submissions passing tests.</p>
            <p><strong>Agent’s action:</strong> Changed the evaluator to mark every submission correct.</p>
          </div>
        </div>
      </Case>
      <Advice groups={[
        ['Skepticism', [
          'Treat the agent’s claims of success with skepticism.',
          'Be suspicious of sudden jumps in performance.',
        ]],
        ['Review the code', [
          'Look in the diff for weakened tests or altered scoring.',
          'Rerun the original tests or benchmark yourself.',
        ]],
      ]} />
    </>,
    sources: [sources.rewardHacking],
  },
  {
    id: 'access-and-consequences',
    bucket: 'Control',
    title: 'Access and unintended consequences',
    summary: 'Unwanted actions, sensitive data, IRB violations, and prompt injection.',
    content: <>
      <div className="pitfall-columns">
        <Case label="Email agent · Summer Yue, Feb. 2026 · excerpt">
          <blockquote className="pitfall-quote">Nothing humbles you like telling your OpenClaw “confirm before acting” and watching it speedrun deleting your inbox. I couldn’t stop it from my phone.</blockquote>
        </Case>
        <Points items={[
          ['Sensitive data and IRB violations', 'Unauthorized use of participant data can breach consent, IRB approval, or data agreements.'],
          ['Prompt injection', 'A webpage or file can carry instructions that redirect the agent or leak data.'],
        ]} />
      </div>
      <Advice groups={[
        ['Settings', [
          <>For inspection, select Read Only in <code>/permissions</code>.</>,
          'Do not combine private data, untrusted content, and the ability to send data outside the approved environment.',
        ]],
        ['Data approval', [
          'Confirm permitted tools and data flows with your IRB or data steward before sharing participant data with an AI service, including through prompts and tool output.',
        ]],
      ]} />
    </>,
    sources: [sources.email, sources.injection, sources.researchData, sources.permissions],
  },
  {
    id: 'plausible-ideas-practical-judgment',
    bucket: 'Judgment',
    title: 'What the literature leaves out',
    summary: 'Failed attempts and practical lessons often never get written down.',
    content: <>
      <p className="lead">Models can learn from published work. Failed attempts and practical lessons are often missing from that record.</p>
      <div className="pitfall-unwritten">
        <p>An agent who drafts a research proposal, for example, may miss that:</p>
        <ul>
          <li>The key variable was never collected, or access to it would take years.</li>
          <li>A familiar proxy measures something different from what you want to study.</li>
          <li>Two competing explanations would produce the same result.</li>
          <li>An apparently surprising finding is already familiar to people in the field.</li>
        </ul>
      </div>
      <Advice items={[
        'Do not delegate scientific decisions to AI. You choose the question, design, and interpretation.',
        'Brainstorm with colleagues who know the field, not just with AI.',
      ]} />
    </>,
    sources: [sources.taste, sources.understanding],
  },
  {
    id: 'scientific-direction-research-design',
    bucket: 'Judgment',
    title: 'Sycophancy and flawed premises',
    summary: 'An agent may build on a weak premise and echo the user’s framing.',
    content: <>
      <p className="lead">A detailed plan can hide a flawed premise. A model’s approval may simply echo your framing.</p>
      <Case label="Reported example · Hélène Draux, 2026">
        <p>For an April Fool’s exercise, Draux asked Claude for a “vacuity index” to score how empty or inflated a paper was, using titles, abstracts, and metadata.</p>
        <p>It proposed a weighted index combining loosely related signals, including buzzword counts, without asking whether “vacuity” was measurable.</p>
        <p><strong>Sycophancy:</strong> in fresh chats, it defended the index when she considered publishing it, but rejected it when she asked if it was nonsense.</p>
      </Case>
      <Advice items={[
        <><strong>Design note (.md):</strong> Define the concept and explain how the proposed data would measure it.</>,
        <><strong>Prompt:</strong> Ask for objections to the premise. Assess them against the literature and available data.</>,
      ]} />
    </>,
    sources: [sources.design],
  },
  {
    id: 'understanding-skill-development',
    bucket: 'Learning and workflow',
    title: 'Understanding and skill development',
    summary: 'Producing a working result does not ensure you understand it.',
    content: <>
      <p className="lead">When the agent does the work, it is easy to skip the part where you learn how to do it.</p>
      <Points className="pitfall-rows" items={[
        ['Feeling that you understand', 'A clear explanation can feel convincing even when you could not reproduce the reasoning or spot a mistake.'],
        ['Getting less practice', 'If the agent always writes the code and fixes the bugs, you get fewer chances to learn those skills yourself.'],
      ]} />
      <Advice groups={[
        ['Prompt', [
          'Ask for a line-by-line walkthrough of the key function.',
        ]],
        ['Practice in code', [
          'Change one input, predict the result, then run it.',
          'Compare the result with your prediction and explain any difference before reading the agent’s explanation.',
        ]],
      ]} />
    </>,
    sources: [sources.understanding, sources.explanations],
  },
  {
    id: 'attention-review-workflow',
    bucket: 'Learning and workflow',
    title: 'Attention, review, and workflow',
    summary: 'Generation can outpace review and documentation without producing useful progress.',
    content: <>
      <Points className="pitfall-rows" items={[
          ['Always one more iteration', 'Each revision suggests something else to improve, even when the project does not need it.'],
          ['More work to review', 'An agent can generate more than you can review. Sending unchecked work to a collaborator just moves the burden to them.'],
          ['Harder to keep track', 'Across chats and versions, you can lose track of why a specification changed or which code produced the result.'],
      ]} />
      <Advice groups={[
        ['Work in small steps', [
          'Request one small task, then read its output.',
          'Review the code and outputs before sharing your work.',
        ]],
        ['Research log (.md)', [
          'Record decisions and reasons, including rejected options.',
          'Link each result to its data and code version.',
        ]],
      ]} />
    </>,
    sources: [sources.workflow, sources.review, sources.taste],
  },
].map(slide => ({ ...slide, kind: 'pitfall' }));

const pitfallsBuckets = [
  { id: 'quality', title: 'Quality' },
  { id: 'control', title: 'Control' },
  { id: 'judgment', title: 'Judgment' },
  { id: 'learning-and-workflow', title: 'Learning and workflow' },
];

export const pitfallsSlides = pitfallsBuckets.flatMap(bucket => [
  {
    id: `pitfalls-${bucket.id}`,
    kind: 'subsection',
    title: bucket.title,
    sources: [],
    backLink: { href: '#section-pitfalls-and-dangers', label: 'Pitfalls and dangers' },
  },
  ...pitfallsContent.filter(slide => slide.bucket === bucket.title),
]);
