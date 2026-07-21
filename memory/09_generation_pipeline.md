# 09 · Generation Pipeline

```
content/**/*.mdx
  → velite (Zod validate + typed JSON)     generated/json/{chapters,lessons}.json
    → scripts/build-search-index.mjs        public/search-index.json
    → next build                            static site (76 pages)
    → [M2] flipbook  · [M3] PDF · [M4] calculators
```

## Commands

| command | does |
|---|---|
| `npm run generate` | velite + search index |
| `npm run build` | velite + next build |
| `npm run audit:provenance` | figure-grounding audit (gates on hard failures) |
| `npx velite --clean` | validate content only |

## Invariants

- Everything in `generated/` is disposable. Never hand-edit it.
- `velite --clean` wipes `generated/json`. Anything that must survive a rebuild
  (e.g. the source outline) lives in `data/`, not `generated/`.
- The build fails closed: invalid content stops the build.

## Source extraction (one-time, tooling in `data/`)

The 92 infographics were extracted from the original flipbook's embedded
base64. `data/source-book.json` and `data/outline.json` hold the canonical
title/section/page map. Re-derivable from the source `index.html` if lost.
