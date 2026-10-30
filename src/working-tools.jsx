// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';
import compactionFigure from '../reference-images/humanlayer-intentional-compaction.png';
import subagentsFigure from '../reference-images/humanlayer-sub-agents.png';
import workflowFigure from '../reference-images/humanlayer-workflow.png';

const sources = {
  context: { label: 'HumanLayer: context engineering', href: 'https://www.humanlayer.dev/blog/advanced-context-engineering' },
  markdown: { label: 'HumanLayer: writing instruction files', href: 'https://www.humanlayer.dev/blog/writing-a-good-claude-md' },
  factors: { label: '12-Factor Agents: context', href: 'https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-03-own-your-context-window.md' },
  errors: { label: '12-Factor Agents: error recovery', href: 'https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-09-compact-errors.md' },
  small: { label: '12-Factor Agents: focused agents', href: 'https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-10-small-focused-agents.md' },
  anthropic: { label: 'Anthropic: context engineering', href: 'https://www.anthropic.com/research/effective-context-engineering-for-ai-agents' },
  discovery: { label: 'Codex: instruction files', href: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md' },
  roles: { label: 'OpenAI: instruction priority', href: 'https://developers.openai.com/cookbook/articles/openai-harmony' },
  messageRoles: { label: 'OpenAI: message roles', href: 'https://developers.openai.com/api/docs/guides/prompt-engineering#message-roles-and-instruction-following' },
  injection: { label: 'Codex: instruction loading', href: 'https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide' },
  memory: { label: 'Claude: instructions and memory', href: 'https://code.claude.com/docs/en/memory' },
  mcp: { label: 'MCP: connecting tools', href: 'https://modelcontextprotocol.io/docs/getting-started/intro' },
  prompts: { label: 'Claude: task guidance', href: 'https://code.claude.com/docs/en/best-practices' },
  commands: { label: 'Codex: context controls', href: 'https://learn.chatgpt.com/docs/developer-commands' },
  subagents: { label: 'Codex: subagents', href: 'https://learn.chatgpt.com/docs/agent-configuration/subagents' },
  format: { label: 'AGENTS.md format guide', href: 'https://agents.md/' },
  workflow: { label: 'OpenAI: project documents', href: 'https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex' },
  maintenance: { label: 'OpenAI: maintaining instructions', href: 'https://learn.chatgpt.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra' },
  study: { label: 'Study: do context files help?', href: 'https://arxiv.org/abs/2602.11988v3' },
};

function SourceFigure({ src, alt, asset, children }) {
  return <>
    <figure className="working-source-figure">
      <div className="working-image-area"><img src={src} alt={alt} /></div>
      <figcaption>Dex Horthy / HumanLayer, 2025. <a href={asset} target="_blank" rel="noreferrer">Original illustration</a>.</figcaption>
    </figure>
    <p className="working-figure-reading">{children}</p>
  </>;
}

export const workingToolsSlides = [
  {
    id: 'context-loading',
    kind: 'working-tools working-loading',
    title: 'What goes into the context window',
    summary: 'The information available to the model for its next response.',
    content: <>
      <p className="lead"><strong>Context window:</strong> the information a model can use at once, up to a size limit.</p>
      <table className="working-loading-table">
        <thead><tr><th>Source</th><th>How it enters context</th></tr></thead>
        <tbody>
          <tr><td>System and app instructions</td><td>Supplied by the provider and application.</td></tr>
          <tr><td>Personal instruction files</td><td>Your rules across projects, such as <code>~/.codex/AGENTS.md</code>.</td></tr>
          <tr><td>Project instruction files</td><td>Rules from files such as <code>AGENTS.md</code> in the current project.</td></tr>
          <tr><td>Project files</td><td>Code and documents the agent reads with tools.</td></tr>
          <tr><td>Conversation history</td><td>Earlier messages and tool results, sometimes summarized.</td></tr>
          <tr><td>Memories</td><td>Saved facts or preferences carried between conversations, if enabled.</td></tr>
          <tr><td>Current prompt</td><td>The request you give the agent.</td></tr>
        </tbody>
      </table>
      <p className="working-note">File contents enter context when loaded or returned by a tool. A read may include only part of a file.</p>
    </>,
    sources: [sources.discovery, sources.memory, sources.factors],
  },
  {
    id: 'instruction-priority',
    kind: 'working-tools',
    title: 'Which instructions take priority',
    summary: 'How Codex resolves conflicting instructions.',
    content: <>
      <div className="working-columns">
        <section>
          <h2>Highest priority first</h2>
          <ol className="working-priority">
            <li><strong>System</strong><span>Rules from the model provider, e.g., OpenAI.</span></li>
            <li><strong>Developer</strong><span>Rules from the app’s creator: OpenAI for Codex CLI.</span></li>
            <li><strong>User</strong><span>Your requests and project rules.</span></li>
          </ol>
          <p>Conflicts follow this order. Codex treats <code>AGENTS.md</code> as user instructions.</p>
        </section>
        <section>
          <h2>Rules by folder in Codex</h2>
          <ul className="working-list">
            <li>Personal rules apply across projects.</li>
            <li>Project and subfolder rules take priority over broader rules.</li>
            <li><code>AGENTS.override.md</code> replaces <code>AGENTS.md</code> in the same folder.</li>
          </ul>
          <p>Your current request can override older file guidance, subject to system and developer rules.</p>
        </section>
      </div>
      <p className="working-note">Code comments and past answers are not instructions by default.</p>
    </>,
    sources: [sources.messageRoles, sources.injection, sources.discovery],
  },
  {
    id: 'input-quality',
    kind: 'working-tools working-brief',
    title: 'Input quality shapes output quality',
    summary: 'Check the inputs and make the request specific.',
    content: <>
      <div className="working-brief-columns">
        <section>
          <h2>Check the inputs</h2>
          <dl className="working-brief-list">
            <div><dt>Correct</dt><dd>Use the right files and versions. Fix mistaken assumptions.</dd></div>
            <div><dt>Complete</dt><dd>Name the task or output and give essential background.</dd></div>
            <div><dt>Relevant</dt><dd>Include only the code and passages needed.</dd></div>
            <div><dt>Clear</dt><dd>State the goal, limits, and expected result.</dd></div>
          </dl>
        </section>
        <div className="example working-prompt">
          <div className="example-label">Example request</div>
          <p>Trace how <code>code.R</code> produces <code>figures/fig-dynamic-HC.png</code>. Check any code it uses from <code>header.R</code>.</p>
          <p>Explain the simulation settings and calculations. Cite the relevant code lines. List questions that require consulting the paper.</p>
          <p>Do not edit files, install packages, or run the analysis.</p>
        </div>
      </div>
    </>,
    sources: [sources.context, sources.prompts, sources.factors],
  },
  {
    id: 'context-engineering',
    kind: 'working-tools working-context',
    title: 'From prompt engineering to context engineering',
    summary: 'Manage the information used for each step, including the history created by the agent’s work.',
    content: <>
      <p className="lead"><strong>Prompt engineering:</strong> write clear instructions and specify the expected result.<br /><strong>Context engineering:</strong> manage those instructions and the information used at every step.</p>
      <div className="working-columns working-context-columns">
        <section>
          <h2>An agent changes its own context</h2>
          <p>Each model call uses the context the app supplies. Earlier findings remain available only if the app carries them forward.</p>
          <p>File searches, code, edits, and test output accumulate as the agent works.</p>
          <p>A long conversation can retain incorrect assumptions and failed approaches, even after you correct them.</p>
        </section>
        <section>
          <h2>Manage what carries forward</h2>
          <ul className="working-list">
            <li><strong>Preserve useful findings and decisions.</strong> Keep constraints and source locations so the agent can check details.</li>
            <li><strong>Summarize lengthy exploration.</strong> Leave out irrelevant output and resolved errors. Preserve open problems.</li>
            <li><strong>Review before reuse.</strong> A summary that drops a key fact or preserves a false assumption can misdirect later work.</li>
          </ul>
        </section>
      </div>
    </>,
    sources: [sources.context, sources.factors],
  },
  {
    id: 'context-decisions',
    kind: 'working-tools working-decisions',
    title: 'Continue, restart, compact, or delegate',
    summary: 'Choose based on the task and accumulated history.',
    content: <>
      <table className="working-decision-table">
        <thead><tr><th>Situation</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>The task is still clear</td><td><strong>Continue</strong> in the same conversation.</td></tr>
          <tr><td>Wrong assumption or changed goal</td><td><strong>Restart:</strong> open a new conversation with the corrected request.</td></tr>
          <tr><td>Progress buried in a long conversation</td><td><strong>Compact:</strong> replace the long history with a summary of findings and next steps.</td></tr>
          <tr><td>A separate question needs extensive searching</td><td><strong>Delegate:</strong> ask another agent (a subagent) to investigate and report back with sources.</td></tr>
        </tbody>
      </table>
      <p className="working-tmux"><strong>Tip: tmux</strong> keeps terminal sessions running through disconnections while the computer stays on. <a href="https://tmux.github.io/" target="_blank" rel="noreferrer">Project</a> and <a href="https://man.openbsd.org/tmux" target="_blank" rel="noreferrer">manual</a>.</p>
    </>,
    sources: [sources.commands, sources.small],
  },
  {
    id: 'intentional-compaction',
    kind: 'working-tools working-figure',
    title: 'Compaction: summarizing the conversation',
    summary: 'Summarize progress for a fresh session.',
    content: <><SourceFigure src={compactionFigure}
      asset="https://www.humanlayer.dev/blog/advanced-context-engineering/intentional-compaction.png"
      alt="HumanLayer diagram showing a long conversation distilled into progress.md, which a new context reads before continuing.">
      The app can summarize history within the current conversation. A <strong>handoff</strong> is a saved summary that a new conversation reads: goal, findings with sources, open questions, and next steps. Saving it alone does not clear context.
      <br /><strong>Diagram labels:</strong> <code>CLAUDE.md</code> stores instructions. <strong>MCP</strong> (Model Context Protocol) is a standard for connecting tools. <code>Read()</code>/<code>Write()</code> read or change files.
    </SourceFigure>
      <p className="working-compaction-note"><strong>Avoid waiting for automatic compaction</strong>, when the app summarizes a nearly full context. It can omit details you still need. Save and check a handoff at a natural stopping point, then start fresh.</p>
    </>,
    sources: [sources.context, sources.anthropic, sources.mcp],
  },
  {
    id: 'bounded-subagents',
    kind: 'working-tools working-figure',
    title: 'Subagents: assigning a separate task',
    summary: 'Investigate separate questions and return findings with sources.',
    content: <SourceFigure src={subagentsFigure}
      asset="https://www.humanlayer.dev/blog/advanced-context-engineering/sub-agents.png"
      alt="HumanLayer diagram showing a parent agent delegating a search to a subagent and receiving the relevant file location.">
      A <strong>subagent</strong> handles part of the task in its own conversation and reports back. Check which instructions and background the main agent passes to it.
      <br />Parallel agents can cost more. Simultaneous edits to the same files can conflict.
    </SourceFigure>,
    sources: [sources.context, sources.subagents, sources.small],
  },
  {
    id: 'research-plan-implement',
    kind: 'working-tools working-figure',
    title: 'Research, planning, and implementation',
    summary: 'Review findings and plans before the next phase.',
    content: <SourceFigure src={workflowFigure}
      asset="https://www.humanlayer.dev/blog/advanced-context-engineering/workflow.png"
      alt="HumanLayer workflow linking research.md to plan.md and implementation, with human review between phases.">
      <strong>Research:</strong> inspect code and sources. <strong>Planning:</strong> decide the changes. <strong>Implementation:</strong> make and check them. Review findings and plans before proceeding.
      <br />The illustration uses custom HumanLayer commands. They are not built-in Codex commands.
    </SourceFigure>,
    sources: [sources.context, sources.workflow],
  },
  {
    id: 'markdown-format',
    kind: 'working-tools working-files',
    title: 'Markdown project files',
    summary: 'The Markdown format and the purpose of common project files.',
    content: <>
      <p className="lead"><strong>Markdown</strong> uses simple marks for headings, lists, and links in <code>.md</code> text files.</p>
      <table className="working-file-table">
        <thead><tr><th>File</th><th>Contents</th></tr></thead>
        <tbody>
          <tr><td><code>AGENTS.md</code></td><td>Rules reused across tasks.</td></tr>
          <tr><td><code>README.md</code></td><td>What the project does and which files to start with.</td></tr>
          <tr><td><code>GOALS.md</code></td><td>Goal and how to tell when it is met.</td></tr>
          <tr><td><code>research.md</code></td><td>Findings, sources, and open questions.</td></tr>
          <tr><td><code>plan.md</code></td><td>Planned changes and checks.</td></tr>
          <tr><td><code>progress.md</code></td><td>Completed work and next steps.</td></tr>
        </tbody>
      </table>
      <p className="working-note">Codex loads recognized instruction files automatically. Tell it to read other documents. The last four filenames are suggestions. Combine documents when separate files add no value.</p>
    </>,
    sources: [sources.workflow, sources.format],
  },
  {
    id: 'useful-agents-file',
    kind: 'working-tools',
    title: 'Writing and maintaining AGENTS.md',
    summary: 'What to include, what to link, and what to keep current.',
    content: <>
      <dl className="working-rows">
        <div><dt>Project facts</dt><dd>Purpose, files to start with, research choices, and commands you have checked.</dd></div>
        <div><dt>Reusable rules</dt><dd>Include rules used across tasks. Keep temporary limits in the current prompt.</dd></div>
        <div><dt>Detailed guides</dt><dd>Link to longer guides instead of copying them. Say when the agent should read them.</dd></div>
        <div><dt>Updates</dt><dd>Check file locations and commands. Remove outdated or conflicting rules.</dd></div>
      </dl>
    </>,
    sources: [sources.markdown, sources.maintenance, sources.study],
  },
];
