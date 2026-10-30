// Copyright (C) 2026 Marie-Lou Laprise
// Software portions: GPL-3.0-only. Original teaching content: CC-BY-SA-4.0.
// Third-party material is excluded. See LICENSING.md.

import React from 'react';
import { cliSlides } from './slides.jsx';
import { pitfallsSlides } from './pitfalls.jsx';
import { bigPictureSlides } from './big-picture.jsx';
import { toolsOverviewSlides } from './tools-overview.jsx';
import { checkingWorkSlides } from './checking-work.jsx';
import { workingToolsSlides } from './working-tools.jsx';

export const workshopTitle = 'AI agents for social science';

// Add content slides to each section as the workshop develops.
// Titles and subtitles also populate the opening outline and section dividers.
export const workshopSections = [
  {
    id: 'big-picture',
    title: 'Big picture',
    subtitle: 'What are AI agents, and what can we delegate to them?',
    slides: bigPictureSlides,
  },
  {
    id: 'ai-tools-overview',
    title: 'AI tools overview',
    subtitle: 'Interfaces, permissions, and data',
    slides: toolsOverviewSlides,
  },
  {
    id: 'codex-cli',
    title: 'Codex CLI',
    subtitle: 'Navigating the interface and working in a project',
    slides: cliSlides,
  },
  {
    id: 'working-with-ai-tools',
    title: 'Working with AI tools',
    subtitle: 'Giving context, setting tasks, and steering the work',
    slides: workingToolsSlides,
  },
  {
    id: 'checking-ai-work',
    title: 'Checking AI’s work',
    subtitle: 'Supervising changes and verifying results',
    slides: checkingWorkSlides,
  },
  {
    id: 'pitfalls-and-dangers',
    title: 'Pitfalls and dangers',
    subtitle: 'Recognizing failure modes and exercising scientific judgment',
    slides: pitfallsSlides,
  },
];

const openingSlides = [
  {
    id: 'workshop-title',
    kind: 'cover',
    sectionLabel: 'Methods Camp 2026',
    title: workshopTitle,
    displayTitle: <>AI agents for<br />social science</>,
    author: 'Marie-Lou Laprise',
    credit: 'This slide deck was developed and assembled by Marie-Lou Laprise in collaboration with GPT-6-Astra.',
    license: { label: 'CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/', year: 2026 },
    summary: 'Methods Camp 2026',
    sources: [],
  },
  {
    id: 'workshop-outline',
    kind: 'agenda',
    sectionLabel: 'Methods Camp 2026 / AI agents',
    title: 'Roadmap',
    summary: 'Six sections: from understanding agents to evaluating their work.',
    content: <ol className="workshop-agenda">{workshopSections.map((section, i) =>
      <li key={section.id}>
        <a href={`#section-${section.id}`}>
          <span className="agenda-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div><h2>{section.title}</h2><p>{section.subtitle}</p></div>
        </a>
      </li>
    )}</ol>,
    sources: [],
  },
];

export const workshopSlides = [
  ...openingSlides,
  ...workshopSections.flatMap((section, i) => [
    {
      id: `section-${section.id}`,
      kind: 'section',
      sectionLabel: `AI agents / Section ${String(i + 1).padStart(2, '0')}`,
      title: section.title,
      subtitle: section.subtitle,
      summary: section.subtitle,
      sources: [],
    },
    ...section.slides.map(slide => ({ ...slide, sectionLabel: slide.bucket ? `${section.title} / ${slide.bucket}` : section.title })),
  ]),
];
