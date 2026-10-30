// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';
import olmoFlow from '../reference-images/olmo3-model-flow.svg';
import tuluPipeline from '../reference-images/tulu3-pipeline.png';
import tuluReward from '../reference-images/tulu3-rlvr.jpg';

const sources = {
  agents: { label: 'Anthropic: how an agent works', href: 'https://code.claude.com/docs/en/how-claude-code-works' },
  chatProjects: { label: 'Anthropic: chat projects', href: 'https://support.claude.com/en/articles/9517075-what-are-projects' },
  olmo: { label: 'Ai2: Olmo 3 model flow', href: 'https://allenai.org/blog/olmo3' },
  olmoFigure: { label: 'Ai2: Olmo 3 report, Figure 2', href: 'https://arxiv.org/html/2512.13961v1#S2.F2' },
  tulu: { label: 'Ai2: Tülu 3 technical overview', href: 'https://allenai.org/blog/tulu-3-technical' },
  midtraining: { label: 'NVIDIA: agentic midtraining (2026)', href: 'https://arxiv.org/abs/2610.22019' },
  posttraining: { label: 'NVIDIA: posttraining (2026)', href: 'https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Ultra-Technical-Report.pdf' },
  rewards: { label: 'METR: observed reward hacking', href: 'https://metr.org/blog/2025-06-05-recent-reward-hacking/' },
  trainingRisks: { label: 'Anthropic: reward hacking in training', href: 'https://www.anthropic.com/research/emergent-misalignment-reward-hacking' },
  workflows: { label: 'Anthropic: choosing a workflow', href: 'https://www.anthropic.com/research/building-effective-agents' },
};

function SourceFigure({ src, alt, caption, className = '' }) {
  return <figure className={`training-source-figure ${className}`}>
    <div className="training-image-area"><img src={src} alt={alt} /></div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export const bigPictureSlides = [
  {
    id: 'agent-components',
    kind: 'big-picture',
    title: 'What an AI agent is made of',
    summary: 'A language model takes inputs and generates outputs within an environment, connected by a repeated working cycle.',
    content: <>
      <p className="lead">At the center: a <strong>language model</strong> takes inputs and generates outputs.</p>
      <dl className="agent-system">
        <div>
          <dt>Environment<span>Where it operates</span></dt>
          <dd>
            <p>Files, applications, and tools, such as a terminal or browser</p>
            <p>Permissions governing access, changes, and required approvals</p>
          </dd>
        </div>
        <div>
          <dt>Input<span>What the model receives</span></dt>
          <dd>
            <p>Instructions, the user’s task, and conversation history</p>
            <p>Relevant material from documents and tool results</p>
          </dd>
        </div>
        <div>
          <dt>Output<span>What the model generates</span></dt>
          <dd>
            <p>Text: answers, drafts, explanations</p>
            <p>Tool requests: search, read or edit files, run an analysis</p>
          </dd>
        </div>
      </dl>
      <div className="agent-cycle">
        <p><strong>The working cycle</strong></p>
        <p>Input → model output → tool action in the environment → result returned as new input → repeat.</p>
      </div>
    </>,
    sources: [sources.agents],
  },
  {
    id: 'model-training-overview',
    kind: 'training-overview',
    title: 'How the model is trained',
    summary: 'Pretraining, midtraining, and the stages within posttraining.',
    content: <>
      <dl className="training-stages">
        <div><dt><span>1</span> Pretraining</dt><dd>Learn broad patterns by predicting text across large collections of documents and code.</dd></div>
        <div><dt><span>2</span> Midtraining</dt><dd>Continue with a more targeted data mix, developing skills such as reasoning, tool use, and handling long documents.</dd></div>
        <div className="posttraining-stage"><dt><span>3</span> Posttraining</dt><dd>
          <dl className="posttraining-methods">
            <div><dt>Supervised fine-tuning</dt><dd>Learn from examples of desired answers and actions.</dd></div>
            <div><dt>Preference tuning</dt><dd>Favor responses rated more highly by people or AI judges.</dd></div>
            <div><dt>Reinforcement learning</dt><dd>Attempt tasks, receive scores, and update the model.</dd></div>
            <div><dt>Distillation</dt><dd>Learn from stronger or specialist models.</dd></div>
          </dl>
        </dd></div>
      </dl>
      <p className="training-note">Recipes combine and repeat these stages.<br />Training changes the model’s learned parameters, or <strong>weights</strong>. An ordinary session changes its context.</p>
    </>,
    sources: [sources.olmo, sources.midtraining, sources.posttraining],
  },
  {
    id: 'olmo-training-figure',
    kind: 'training-figure',
    title: 'Olmo 3: the complete training process',
    summary: 'Ai2’s original diagram separates base-model training from several posttraining paths.',
    content: <>
      <SourceFigure
        src={olmoFlow}
        alt="Ai2 Olmo 3 model flow: pretraining, midtraining, and long-context training lead to Think, Instruct, and RL-Zero posttraining paths. Think and Instruct include SFT, DPO, and RLVR."
        caption={<>Figure: Ai2, <em>Olmo 3</em> technical report (2025), Figure 2. Original diagram.</>}
      />
      <p className="figure-reading">Pink: base-model training. Teal: posttraining paths for different uses.<br /><strong>SFT:</strong> supervised fine-tuning. <strong>DPO:</strong> direct preference optimization.<br /><strong>RLVR:</strong> reinforcement learning with verifiable rewards.</p>
    </>,
    sources: [sources.olmoFigure, sources.olmo],
  },
  {
    id: 'tulu-posttraining-figure',
    kind: 'training-figure',
    title: 'Tülu 3: a closer look at posttraining',
    summary: 'Ai2’s original posttraining pipeline shows the role of examples, preferences, rewards, and evaluation.',
    content: <>
      <SourceFigure
        src={tuluPipeline}
        alt="Ai2 Tülu 3 posttraining pipeline: curated prompts and a base model feed supervised fine-tuning, direct preference optimization, and RL with verifiable rewards, alongside development and unseen evaluations."
        caption={<>Figure: Ai2, <em>Tülu 3: The next era in open post-training</em> (2024), “Tülu 3 Recipe.” Original diagram.</>}
      />
      <p className="figure-reading">The starting point here is an already pretrained model. “Evals” means evaluations.</p>
    </>,
    sources: [sources.tulu],
  },
  {
    id: 'tulu-reward-figure',
    kind: 'training-figure reward-figure',
    title: 'Reinforcement learning and the reward',
    summary: 'Ai2’s reward loop, followed by behaviors to watch for when a success measure can be gamed.',
    content: <>
      <div className="reward-figure-layout">
        <SourceFigure
          src={tuluReward}
          alt="Ai2 RLVR diagram: training prompts enter the model, completions receive a verifiable reward, and that score feeds a policy update."
          caption={<>Figure: Ai2, <em>Tülu 3</em> technical blog (2024), “Reinforcement Learning on Verifiable Rewards.” Original diagram.</>}
        />
        <div className="reward-reading">
          <p>The model learns from the score assigned to its attempts. In the diagram, <strong>policy</strong> means the model and <strong>completions</strong> are its generated answers.</p>
          <h2>Behaviors to watch for</h2>
          <ul>
            <li>Changing the check used to judge success.</li>
            <li>Finding a shortcut that defeats the purpose of the task.</li>
            <li>Reporting success that the underlying work does not support.</li>
          </ul>
        </div>
      </div>
      <p className="figure-reading">The reward measures success imperfectly. Optimizing it can encourage reward hacking.</p>
    </>,
    sources: [sources.tulu, sources.rewards, sources.trainingRisks],
  },
  {
    id: 'ways-to-accomplish-a-task',
    kind: 'task-strategies',
    title: 'How to accomplish a research task',
    summary: 'Factors favoring doing the work yourself, using AI, or using a deterministic tool. These strategies can be combined.',
    content: <>
      <p className="lead">Your own work, AI assistance, and other tools can play different roles in the same project.</p>
      <table className="strategy-table">
        <thead><tr><th>Strategy</th><th>Some factors favoring it</th><th>Some factors weighing against it</th></tr></thead>
        <tbody>
          <tr><td>Do it yourself</td><td>Field knowledge or substantive judgment is central. Doing the work helps you learn or develop the question.</td><td>Most effort goes into routine execution. The volume exceeds available time and attention.</td></tr>
          <tr><td>Work with AI</td><td>You can assess the result, but producing it is laborious.</td><td>Errors are hard for you to detect. The burden of review, risks to files or sensitive data, or lost practice outweigh the time saved.</td></tr>
          <tr><td>Use another tool<span className="strategy-examples">Calculators, spreadsheet formulas, statistical software, scripts, linters</span></td><td>A suitable tool already exists for the calculation or operation. Exact, repeatable execution matters.</td><td>Setting up or adapting the tool would cost more effort than it saves.</td></tr>
        </tbody>
      </table>
    </>,
    sources: [sources.workflows],
  },
  {
    id: 'choosing-an-ai-tool',
    kind: 'ai-tool-choice',
    title: 'Chatbots and coding agents',
    summary: 'Applications organized around sustained conversation or direct work in a project’s file system.',
    content: <>
      <table className="ai-choice-table">
        <thead><tr><th></th><th>Chatbot</th><th>Coding agent</th></tr></thead>
        <tbody>
          <tr><td>Designed around</td><td><strong>Sustained conversation.</strong> Explore a question through discussion, follow-ups, and revisions.</td><td><strong>Direct work on project files.</strong> Read and edit files, and run programs to carry out a task.</td></tr>
          <tr><td>Access to your work</td><td>Text, uploaded files, and connected sources you make available to the conversation.</td><td>Direct access to the project’s file system, bounded by permissions.</td></tr>
          <tr><td>What you review</td><td>Answers and drafts in the conversation, plus generated files.</td><td>Changes to actual project files, commands it ran, and saved outputs.</td></tr>
        </tbody>
      </table>
      <p className="ai-choice-note">Capabilities overlap and depend on the application and its permissions.</p>
    </>,
    sources: [sources.chatProjects, sources.agents],
  },
];
