// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';

const docs = {
  cli: 'https://learn.chatgpt.com/docs/codex/cli',
  commands: 'https://learn.chatgpt.com/docs/cli/slash-commands',
  reference: 'https://learn.chatgpt.com/docs/cli/reference',
  permissions: 'https://learn.chatgpt.com/docs/agent-approvals-security',
  practice: 'https://learn.chatgpt.com/guides/best-practices',
  keymap: 'https://learn.chatgpt.com/docs/config-file/config-sample',
};

export function Code({ children }) {
  return <code>{children}</code>;
}

function Example({ label, children }) {
  return <div className="example"><div className="example-label">Example: {label}</div><pre>{children}</pre></div>;
}

function DoNow({ children }) {
  return <section className="do-now" aria-label="Try it now"><p className="do-now-label">Try it now</p><div>{children}</div></section>;
}

function Table({ headings, rows, className = '' }) {
  return <table className={className}>
    <thead><tr>{headings.map(heading => <th key={heading}>{heading}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
  </table>;
}

function Takeaway({ children }) {
  return <p className="takeaway">{children}</p>;
}

// Export this array to insert the subsection into a larger React presentation.
// Each slide includes a stable id, editable JSX, and sources.
export const cliSlides = [
  {
    id: 'where-you-type',
    title: 'Where you are typing',
    summary: 'Shell commands, prompts, slash commands, and shell shortcuts.',
    content: <>
      <Table className="typing-table" headings={['Where', 'Example', 'Meaning']} rows={[
        ['Ordinary terminal prompt', <><Code>codex</Code><br /><Code>codex resume</Code></>, 'Launch or manage Codex.'],
        ['Inside Codex, ordinary text', <span className="prompt-text">“Explain how this script handles missing values.”</span>, 'Give the agent a task.'],
        ['Inside Codex, slash command', <><Code>/status</Code><br /><Code>/permissions</Code></>, 'Operate the Codex interface.'],
        ['Inside Codex, shell shortcut', <Code>!git status</Code>, 'Run a local command under the current permissions.'],
      ]} />
      <Takeaway><Code>/exit</Code> returns you to the shell.</Takeaway>
    </>,
    sources: [{ label: 'CLI reference', href: docs.reference }],
  },
  {
    id: 'project-directory',
    title: 'The project directory',
    summary: 'Understand which folder Codex works in and how to change it.',
    content: <>
      <p className="lead">By default, a new Codex session uses your terminal’s current folder.</p>
      <Example label="At the shell prompt">{'cd "/path/to/competing-declines-code"\ncodex'}</Example>
      <div className="text-pair">
        <p><Code>/pwd</Code> shows the session’s current folder.</p>
        <p><Code>/cd "/path/to/project"</Code> changes it inside Codex while the session is idle.</p>
      </div>
      <Takeaway>To choose the folder at launch: <Code>codex -C "/path/to/project"</Code></Takeaway>
    </>,
    sources: [{ label: 'Working directory commands', href: docs.commands }, { label: 'Launch options', href: docs.reference }],
  },
  {
    id: 'finding-controls',
    title: 'Finding the controls',
    summary: 'Discover commands and inspect the active session.',
    content: <>
      <Table headings={['Control', 'What it helps you do']} rows={[
        [<Code>/</Code>, 'Browse the commands available inside Codex.'],
        [<Code>?</Code>, 'See keyboard shortcuts.'],
        [<Code>/status</Code>, 'Check the model, permissions, and context usage.'],
        [<Code>/model</Code>, 'Choose a model and, where available, its reasoning-effort setting.'],
        [<Code>codex --help</Code>, 'Look up launch options at the shell prompt.'],
      ]} />
    </>,
    sources: [{ label: 'Commands and shortcuts', href: docs.reference }],
  },
  {
    id: 'permissions',
    kind: 'cli-exercise cli-permissions',
    title: 'Instructions and permissions in Codex',
    summary: 'Write an instruction in the prompt and choose a permissions preset.',
    content: <>
      <Example label="instruction typed in the prompt">{'Explain code.R without changing any files.'}</Example>
      <Table className="compact-table" headings={['Choice in /permissions', 'What Codex can do']} rows={[
        ['Read Only', 'Read files and run inspection commands. File writes need additional permission.'],
        ['Auto', 'Read, edit, and run commands in the workspace. Actions beyond its limits need approval.'],
      ]} />
      <p className="takeaway">A prompt does not change permissions. State “do not run the analysis” when execution is outside the task.</p>
      <DoNow>Open <Code>/permissions</Code>, select <strong>Read Only</strong>, then confirm with <Code>/status</Code>.</DoNow>
    </>,
    sources: [{ label: 'The permissions menu', href: docs.commands + '#update-permissions-with-permissions' }, { label: 'Permission presets', href: docs.permissions }],
  },
  {
    id: 'file-context',
    title: 'Adding a file to a prompt',
    summary: 'Demonstration: use the @ file picker while composing a message.',
    content: <>
      <div className="demonstration">
        <p className="demo-label">Demonstration</p>
        <ol className="steps">
          <li>Type <Code>@</Code> and part of a filename in the prompt box.</li>
          <li>Select <Code>code.R</Code> from the matching files.</li>
          <li>Complete the message with your question.</li>
        </ol>
      </div>
      <Example label="a question with a file mention">{'Which lines in @code.R set the simulation parameters?'}</Example>
      <Takeaway>The file picker inserts a path into the message you are writing.</Takeaway>
    </>,
    sources: [{ label: 'File mentions', href: docs.reference }, { label: 'Context and prompts', href: docs.practice }],
  },
  {
    id: 'steering',
    title: 'Interrupting and sending follow-ups',
    summary: 'Steer the current turn, queue a follow-up, or interrupt.',
    content: <>
      <p className="lead">While a turn is running:</p>
      <Table headings={['Key', 'What happens']} rows={[
        [<Code>Esc</Code>, 'Interrupts the active turn.'],
        [<Code>Enter</Code>, 'Sends the text you have typed as a correction to the current task.'],
        [<Code>Tab</Code>, 'Queues the text you have typed for the next turn.'],
      ]} />
      <Takeaway>Interrupting stops the active turn. Completed file edits remain.</Takeaway>
    </>,
    sources: [{ label: 'Interactive shortcuts', href: docs.reference }],
  },
  {
    id: 'actions-and-edits',
    title: 'Where to inspect the work',
    summary: 'Open the transcript, inspect the diff, and find changed files.',
    content: <>
      <Table className="inspection-table" headings={['Access', 'What you can inspect']} rows={[
        [<Code>Ctrl+T</Code>, <>Opens the transcript. Scroll through file reads, commands, and their displayed output. <Code>Esc</Code> closes the view.</>],
        [<Code>/diff</Code>, 'Shows current Git changes, including added and removed lines.'],
        [<Code>!git status</Code>, 'Lists changed and untracked files in the repository.'],
        ['Open the file in RStudio', 'Use the reported path to find and inspect the code or output file.'],
      ]} />
      <Takeaway>Transcript output may be truncated. A diff may include changes made before the current task.</Takeaway>
    </>,
    sources: [{ label: 'Transcript key binding', href: docs.keymap }, { label: 'Diff command', href: docs.commands }, { label: 'Verification', href: docs.practice }],
  },
  {
    id: 'session-continuity',
    kind: 'cli-exercise',
    title: 'Leaving and returning',
    summary: 'Start fresh or resume a saved conversation.',
    content: <>
      <Table className="compact-table" headings={['What you want', 'Command']} rows={[
        ['Start a fresh conversation', <Code>/new</Code>],
        ['Choose a saved conversation', <><Code>/resume</Code> inside Codex</>],
        ['Resume from the shell', <Code>codex resume</Code>],
        ['Resume the latest in this directory', <Code>codex resume --last</Code>],
        ['Return to the shell', <Code>/exit</Code>],
      ]} />
      <Takeaway>Resuming restores conversation history, not an earlier version of the files. Starting fresh does not undo edits.</Takeaway>
      <DoNow>Run <Code>/resume</Code> and reopen your preassignment conversation.<br />Find the last question you asked.</DoNow>
    </>,
    sources: [{ label: 'Session commands', href: docs.commands }, { label: 'Resume options', href: docs.reference }],
  },
  {
    id: 'longer-conversations',
    title: 'Side questions and new conversations',
    optional: true,
    summary: 'Optional: /btw for a temporary detour and /fork for a saved branch.',
    content: <>
      <p className="lead">Both begin with context from the current conversation.</p>
      <Table className="branch-table" headings={['Command', 'Use it for', 'What happens']} rows={[
        [<Code>/btw &lt;question&gt;</Code>, 'A short side question.', 'Temporary side chat. Its transcript stays separate from the main chat.'],
        [<Code>/fork</Code>, 'A new direction to keep.', 'New saved conversation with a copy of the history, ready to continue separately.'],
      ]} />
      <Example label="a side question">{'/btw What does a random seed do?'}</Example>
    </>,
    sources: [{ label: 'Side chats (/btw is an alias of /side)', href: docs.commands + '#start-a-side-chat-with-side' }, { label: 'Forking a conversation', href: docs.commands + '#fork-the-current-chat-with-fork' }],
  },
  {
    id: 'further-resources',
    title: 'Finding and saving useful text',
    optional: true,
    summary: 'Optional: reuse prompts, copy responses, name chats, and export a transcript.',
    content: <>
      <Table className="utility-table" headings={['Control', 'What it does']} rows={[
        [<Code>Ctrl+R</Code>, 'Searches earlier prompts. Select a match to reuse or edit it.'],
        [<Code>/copy</Code>, 'Copies the latest completed response to the clipboard.'],
        [<Code>/rename &lt;name&gt;</Code>, 'Names the current conversation so it is easier to find with /resume.'],
        [<Code>/export session.md</Code>, 'Saves the conversation as a Markdown file you can read or share.'],
      ]} />
    </>,
    sources: [{ label: 'Prompt history shortcuts', href: docs.reference }, { label: 'Copy, rename, and export', href: docs.commands }],
  },
];
