# AI agents for social science

An editable, 55-slide React presentation for Methods Camp 2026, by Marie-Lou Laprise. Developed in collaboration with GPT-6-Astra.

- [View the deck](https://m-laprise.github.io/ai-agents/)
- [Source repository](https://github.com/m-laprise/ai-agents-slides)

The deck covers agent fundamentals, tool interfaces and permissions, Codex CLI, context engineering, Markdown project files, verification, and research pitfalls. All teaching content appears on the slides. There are no speaker notes.

## Build and present

Requires Node.js 18 or later and npm.

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173, or open `dist/index.html` directly. The HTML embeds the viewer, styles, and figures, so presenting does not require a network connection. External reference links require internet access. The complete distribution, including licence notices, is in `dist/`.

Use the arrow keys or Page Up/Page Down to navigate, O for the outline, and F for full screen. Home and End jump to the first and last slides. Print exports the complete deck, one slide per page; enable background graphics and disable browser headers and footers in print settings.

## Edit

- `src/deck.jsx` defines the title and section order.
- The other topic-specific JSX files hold slide text, examples, and source links.
- `src/main.jsx` implements the viewer. `src/styles.css` controls the 16:9 layout.
- `reference-images/` contains the original Ai2 and HumanLayer figures and source records.
- `scripts/build.mjs` creates the self-contained presentation and copies the licence notices.

Rebuild after editing. Stable slide IDs allow links such as `/ai-agents/#context-engineering`. Teal “Try it now” boxes are classroom exercises; dark example boxes and “Demonstration” labels identify illustrations.

The CLI material reflects the teaching installation checked on 2026-10-29. Recheck product-specific commands before reusing the workshop.

## Host on the academic Hugo site

```sh
npm run build
npm run stage:hugo -- /path/to/hugo-academic
```

This copies the distribution to `static/ai-agents/`. It does not change menus or content pages, commit, push, or publish the site. Hugo copies this directory to `/ai-agents/` without adding a content-page entry to its search index or sitemap.

The generated HTML contains `<meta name="robots" content="noindex">`. Keep the page crawlable so search engines can read that directive; do not add a robots.txt disallow for this path. The deck is public at its direct URL, but is not linked from the site's homepage or navigation.

For this site's existing published-output repository, copy the same distribution to `ai-agents/` on its `main` branch, commit only that directory, and push through the established GitHub Pages deployment. Keep the Hugo source copy and its `public` submodule reference in sync.

## Licence

Copyright © 2026 Marie-Lou Laprise.

- **Original teaching content**, in both editable sources and the published slides: [CC BY-SA 4.0](LICENSE-CONTENT).
- **Viewer, styles, and build scripts**: [GNU GPL version 3](LICENSE), GPL-3.0-only.
- **Third-party figures, quotations, and dependencies** retain their own rights and notices.

See [licensing scope](LICENSING.md) and [third-party notices](THIRD_PARTY_NOTICES.md). The software licence does not replace the licence of the teaching content, and neither licence grants additional rights in third-party material.
