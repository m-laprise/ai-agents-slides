// Copyright (C) 2026 Marie-Lou Laprise. SPDX-License-Identifier: GPL-3.0-only

import { build } from 'esbuild';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const bundle = await build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  write: false,
  format: 'iife',
  minify: true,
  legalComments: 'inline',
  banner: { js: '/*! Viewer software: Copyright (C) 2026 Marie-Lou Laprise. GPL-3.0-only, without warranty. Original teaching content: CC-BY-SA-4.0. Third-party material excluded. Source and licensing: https://github.com/m-laprise/ai-agents-slides */' },
  loader: { '.svg': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"production"' },
});
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
const js = bundle.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>AI agents for social science · Methods Camp 2026</title><meta name="author" content="Marie-Lou Laprise"><link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/"><meta name="description" content="AI tools, workflows, and scientific judgment: a Methods Camp 2026 workshop."><style>${css}</style></head><body><div id="root"></div><noscript>This React presentation requires JavaScript.</noscript><script>${js}</script></body></html>`;
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), html);
await mkdir(path.join(root, 'dist/legal'), { recursive: true });
for (const name of ['LICENSE', 'LICENSE-CONTENT', 'LICENSING.md', 'THIRD_PARTY_NOTICES.md']) {
  await copyFile(path.join(root, name), path.join(root, 'dist/legal', name));
}
console.log('Built dist/index.html (self-contained; no network required to present).');
