// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';

const sources = {
  interfaces: { label: 'Anthropic: interfaces', href: 'https://code.claude.com/docs/en/overview' },
  api: { label: 'MDN: APIs explained', href: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction#what_are_apis' },
  cli: { label: 'Codex: local CLI work', href: 'https://learn.chatgpt.com/docs/codex/cli' },
  commands: { label: 'Codex: commands and settings', href: 'https://learn.chatgpt.com/docs/cli/slash-commands' },
  approvals: { label: 'Codex: sandbox and approvals', href: 'https://learn.chatgpt.com/docs/agent-approvals-security' },
  permissions: { label: 'Codex: scope of permissions', href: 'https://learn.chatgpt.com/docs/permissions#scope-and-enforcement' },
  docker: { label: 'Docker: containers', href: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/' },
  mounts: { label: 'Docker: shared folders', href: 'https://docs.docker.com/engine/storage/bind-mounts/' },
  dockerSecurity: { label: 'Docker: security', href: 'https://docs.docker.com/engine/security/' },
  logs: { label: 'Codex: local transcripts', href: 'https://learn.chatgpt.com/docs/reference/troubleshooting#feedback-and-logs' },
  account: { label: 'Codex: accounts and data policies', href: 'https://learn.chatgpt.com/docs/auth#openai-authentication' },
};

export const toolsOverviewSlides = [
  {
    id: 'interfaces-and-apis',
    kind: 'tools-overview interfaces-overview',
    title: 'Interfaces and APIs',
    summary: 'Web, desktop, and CLI applications use APIs to communicate with model services.',
    content: <>
      <p className="lead">You can use the same AI tool through several interfaces.</p>
      <table className="overview-table">
        <thead><tr><th>Interface</th><th>How you use it</th></tr></thead>
        <tbody>
          <tr><td>Web</td><td>Open the tool’s webpage in a browser.</td></tr>
          <tr><td>Desktop</td><td>Work in an application installed on your computer.</td></tr>
          <tr><td>Command-line interface (CLI)</td><td>Launch the tool in a terminal and enter prompts or commands.</td></tr>
        </tbody>
      </table>
      <p className="overview-note">An <strong>application programming interface (API)</strong> specifies how software sends requests to a service and receives responses. Web, desktop, and CLI applications commonly use APIs to communicate with model services behind the scenes. Your own R script can also call a model API directly.</p>
    </>,
    sources: [sources.interfaces, sources.api],
  },
  {
    id: 'where-work-happens',
    kind: 'tools-overview work-locations',
    title: 'Where Codex CLI works',
    summary: 'Codex runs commands in the local project while OpenAI runs the model.',
    content: <>
      <p className="lead">Our workshop uses Codex CLI on your computer, signed in with your ChatGPT account.</p>
      <table className="overview-table">
        <thead><tr><th>Part of the work</th><th>Where it happens</th></tr></thead>
        <tbody>
          <tr><td>Codex CLI</td><td>Runs in your terminal, starting in the folder where you launch <code>codex</code>.</td></tr>
          <tr><td>Files and commands</td><td>Codex reads and edits your local <code>code.R</code>. Running an analysis uses your computer’s R installation and resources.</td></tr>
          <tr><td>Language model</td><td>OpenAI runs the model, which receives your prompt and context and generates a response or tool request.</td></tr>
        </tbody>
      </table>
      <p className="overview-note">Use <code>/pwd</code> to check the active folder, then open it in RStudio or your file explorer to inspect the work.</p>
    </>,
    sources: [sources.cli, sources.commands, sources.account],
  },
  {
    id: 'instructions-permissions-approvals',
    kind: 'tools-overview access-overview',
    title: 'Instructions, permissions, and approvals',
    summary: 'Instructions guide the work, permissions limit tool access, and approvals let you assess specific exceptions.',
    content: <>
      <table className="access-concepts">
        <thead><tr><th>Concept</th><th>What it does and why you need it</th><th>In Codex CLI</th></tr></thead>
        <tbody>
          <tr><td>Instructions</td><td>Describe the task and your standards, so the agent’s choices fit your research goals.</td><td>Write a prompt or put recurring rules in <code>AGENTS.md</code>.</td></tr>
          <tr><td>Permissions</td><td>Set enforceable limits on what tools can do, helping protect your files and control access to external services.</td><td>Choose a preset in <code>/permissions</code> and check <code>/status</code>.</td></tr>
          <tr><td>Approvals</td><td>Let you review a specific action before it proceeds, so you can decide whether to grant additional access.</td><td>Read the request, then approve or deny it.</td></tr>
        </tbody>
      </table>
    </>,
    sources: [sources.commands, sources.approvals],
  },
  {
    id: 'sandboxes',
    kind: 'tools-overview sandbox-overview',
    title: 'What is a sandbox?',
    summary: 'Sandboxes limit the damage an agent can cause by restricting what it can access or change.',
    content: <>
      <p className="lead">A <strong>sandbox</strong> limits what an agent can access or change. It helps protect your computer when the agent misunderstands a request, edits the wrong files, or runs a damaging command.<br /><strong>Docker</strong> runs software and its dependencies in a separate environment called a <strong>container</strong>.</p>
      <table className="overview-table">
        <thead><tr><th>Ways to contain execution</th><th>What it protects and when to choose it</th></tr></thead>
        <tbody>
          <tr><td>1. Built-in sandbox</td><td>Limits local commands’ access to files and networks. Choose it to set boundaries around everyday work with little setup; adjust access in <code>/permissions</code>.</td></tr>
          <tr><td>2. Add Docker for R</td><td>Ask Codex to run R in a separate Docker environment to contain the analysis. Codex itself stays outside Docker and keeps its access to your computer.</td></tr>
          <tr><td>3. Put Codex in Docker</td><td>Run the CLI and its commands inside Docker. Choose this to give the agent more freedom within a limited workspace while protecting the rest of your computer.</td></tr>
        </tbody>
      </table>
      <p className="overview-note">Protection depends on configuration. Broadly shared folders, network access, or elevated privileges can undo Docker’s added protection.</p>
    </>,
    sources: [sources.permissions, sources.docker, sources.mounts, sources.dockerSecurity],
  },
  {
    id: 'where-data-goes',
    kind: 'tools-overview data-overview',
    title: 'Where Codex CLI keeps and sends data',
    summary: 'Project files and session transcripts are local, while model requests send context to OpenAI.',
    content: <>
      <dl className="overview-rows">
        <div><dt>Project files</dt><dd><code>code.R</code> and <code>header.R</code> stay in your local clone. Plots are saved where the script writes them, such as <code>figures/</code>.</dd></div>
        <div><dt>Sent to OpenAI</dt><dd>Codex sends your prompt, conversation context, and the file contents or command output included in a model request.</dd></div>
        <div><dt>Local history</dt><dd>Transcripts can contain prompts and tool output. They are stored under <code>~/.codex/sessions/</code> by default. The <code>~</code> means your home folder.</dd></div>
        <div><dt>Provider records</dt><dd>OpenAI may retain request content under the data policies of the ChatGPT account you used to sign in.</dd></div>
      </dl>
      <p className="overview-note">The training opt-out in the preassignment affects model improvement. OpenAI still processes your requests, and storage follows its retention policy.</p>
    </>,
    sources: [sources.logs, sources.account, sources.permissions],
  },
];
