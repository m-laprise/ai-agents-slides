// Copyright (C) 2026 Marie-Lou Laprise. SPDX-License-Identifier: GPL-3.0-only

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 4173);
const file = new URL('../dist/index.html', import.meta.url);
createServer(async (req, res) => {
  if (req.url !== '/' && req.url !== '/index.html') {
    res.writeHead(404); res.end('Not found'); return;
  }
  try {
    const html = await readFile(file);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(html);
  } catch {
    res.writeHead(500); res.end('Run npm run build first.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Slides: http://127.0.0.1:${port}`));
