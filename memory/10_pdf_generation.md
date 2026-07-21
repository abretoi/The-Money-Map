# 10 · PDF Generation — built

Two PDFs are generated from the same content JSON, via **headless system
Chrome** (`--headless=new --print-to-pdf`) — no puppeteer/playwright dependency.

## Commands

- `npm run pdf` — generate both (runs `generate` first).
- `npm run pdf:guide` · `npm run pdf:ebook` — one at a time.
- `CHROME_BIN` overrides the Chrome path (defaults to macOS Google Chrome).

## Outputs (`generated/pdf/`)

- **The-Money-Map-Launch-Guide.pdf** — short illustrated setup/launch guide (3pp).
  Generator: `scripts/build-guide-pdf.mjs`.
- **The-Money-Map-Ebook.pdf** — the full atlas (~193 pages): cover, TOC, every
  one of the 92 maps rendered from `generated/json` blocks + the raw MDX prose.
  Generator: `scripts/build-ebook-pdf.mjs`.

## Print margins — the important gotcha

**Chrome's `--print-to-pdf` CLI ignores CSS `@page { margin }` entirely** — it
renders at 0 page margin no matter what (margin params are only reachable via
the DevTools protocol, not the CLI flag; `--no-pdf-header-footer` does not
change this). Verified empirically: a 25mm `@page` margin produced 0mm cushion.

So margins are baked into the layout with a **spacer table**, the standard
Chrome-print technique:

```html
<table class="sheet">
  <thead><tr><td></td></tr></thead>   <!-- repeats → top margin every page -->
  <tfoot><tr><td></td></tr></tfoot>   <!-- repeats → bottom margin every page -->
  <tbody><tr><td> …all content… </td></tr></tbody>
</table>
```
```css
@page { margin: 0 }
.sheet > thead td, .sheet > tfoot td { height: 15–16mm }  /* top/bottom */
.sheet > tbody > tr > td { padding: 0 20mm }               /* left/right */
```

`thead`/`tfoot` repeat on every page a table spans, so the vertical cushion is
per-page (not just first/last). `page-break-before/after` on block children
inside the `td` works (chapter dividers land on their own pages). Do **not**
reintroduce `@page` margins or negative-margin bleeds — they silently do nothing
in this pipeline.

Covers and chapter dividers are dark **matted plates within the margin**
(rounded, not full-bleed) — the print-correct choice, since consumer printers
cannot bleed to the paper edge anyway.

## How the rest works

Each generator builds one self-contained HTML string (Garamond, cream stock,
print CSS) and Chrome prints it. Block → HTML renderers in the ebook script
**mirror** `components/blocks`; if a block type changes shape, update the ebook
renderer too. Shared inline-SVG gold art + the paint `<defs>` live in
`scripts/pdf-art.mjs` (duplicated from `components/art` because a plain Node
script can't import the React components).

## Verifying margins

`sips`/PIL rasterisation of these PDFs is unreliable (renders garbage). Verify
by serving `generated/pdf/` over `python3 -m http.server` and opening the PDF in
a browser's PDF viewer — that is accurate.
