// Copyright (C) 2026 Marie-Lou Laprise. SPDX-License-Identifier: GPL-3.0-only

import { cp, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const target = process.argv[2];
if (!target) throw new Error('Usage: npm run stage:hugo -- /path/to/hugo-project');
const hugoRoot = path.resolve(target);
if (!(await stat(path.join(hugoRoot, 'static'))).isDirectory()) {
  throw new Error('The Hugo project must contain a static directory.');
}
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
if (!html.includes('<meta name="robots" content="noindex">')) {
  throw new Error('Build is missing noindex. Run npm run build before staging.');
}
const destination = path.join(hugoRoot, 'static/ai-agents');
await mkdir(destination, { recursive: true });
await cp(path.join(root, 'dist'), destination, { recursive: true });
console.log(`Staged deck and licence notices in ${destination}`);
console.log('Menus, content pages, and publication state were not changed.');
