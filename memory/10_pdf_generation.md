# 10 · PDF Generation — built

Two PDFs are generated from the same content JSON, via **headless system
Chrome** (`--headless=new --print-to-pdf`) — no puppeteer/playwright dependency.

## Commands

- `npm run pdf` — generate both (runs `generate` first).
- `npm run pdf:guide` · `npm run pdf:ebook` — one at a time.
- `CHROME_BIN` overrides the Chrome path (defaults to macOS Google Chrome).

## Outputs (`generated/pdf/`)

- **The-Money-Map-Launch-Guide.pdf** — short illustrated setup/launch guide.
  Generator: `scripts/build-guide-pdf.mjs`.
- **The-Money-Map-Ebook.pdf** — the full atlas (~228 pages): cover, TOC, and
  every one of the 92 maps rendered from `generated/json` blocks + the raw MDX
  prose. Generator: `scripts/build-ebook-pdf.mjs`.

## How it works

Each generator builds one self-contained HTML string (print CSS with `@page`,
Garamond, cream stock, page breaks per chapter) and Chrome prints it to PDF.
Block → HTML renderers in the ebook script **mirror** `components/blocks`; if a
block type changes shape, update the ebook renderer too. Shared inline-SVG
pirate art lives in `scripts/pdf-art.mjs` (kept visually consistent with
`components/art`, but duplicated because a plain Node script can't import the
React components).

## Not the same as the website print path

This is a standalone export, not the reader's own print styles. Both stay light
(cream, hairlines) and preserve figures verbatim. A future in-app "print this
lesson" could reuse the block components directly.
