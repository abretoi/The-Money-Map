# 11 · Flipbook — built (standalone HTML)

Both generated HTML deliverables are now **self-contained pirate flipbooks** —
a page-turning reader, not print-flow HTML. (The website's in-app flipbook mode,
Milestone 2 proper, is still separate.)

## Outputs

- `generated/pdf/ebook.html` — the full atlas as a flipbook (~517 leaves).
- `generated/pdf/launch-guide.html` — the launch guide as a flipbook (7 leaves).

Both are committed (the `-print.html` PDF intermediates are gitignored).

## Build

- `npm run flipbook` — both (runs `generate` first).
- `npm run flipbook:ebook` · `npm run flipbook:guide`.

## Engine — `scripts/flipbook.mjs`

`flipbookHTML({ title, favicon, defsHTML, coverHTML, flowHTML, kicker, extraCSS })`
returns one self-contained HTML document. Zero dependencies, CSP-safe (all art
inline SVG; grain/textures are data-URI SVG noise).

- **Single-page 3D page-turn.** A centred parchment page on a dark leather desk;
  turning animates only `transform`/`opacity` (compositor-friendly) with a
  moving shade. Robust across content lengths and mobile.
- **Runtime pagination.** The hidden `#source` flow is measured and split into
  fixed-size leaves at load. Class rules:
  - `cover` / `chapter-open` / `toc-page` → their own full-page **plate** leaf
    (dark plates for cover & chapter dividers). Carry `data-chapter` /
    `data-title` for the TOC.
  - `fb-soft` → start a new leaf (each lesson begins fresh; its blocks then flow
    and split).
  - everything else → measured and packed into leaves.
- **Chrome:** TOC drawer (from chapter plates), prev/next + page counter,
  progress bar, click zones, keyboard (←/→/space/Home/End/F), swipe, fullscreen,
  `#pN` deep links, debounced re-pagination on resize.

### Gotchas

- **Gold defs must live in the visible DOM.** SVG gradients defined inside a
  `display:none` ancestor do **not** resolve as paint servers — pass
  `art.goldDefs()` as `defsHTML` (rendered in a 0-size visible div), never inside
  the hidden `#source`.
- **Dark-plate text needs specificity.** Content rules like `.leaf-inner h2`
  out-specify a bare `.ctitle`; scope plate titles as `.chapter-open .ctitle`.

## Shared content

`scripts/ebook-content.mjs` (block renderers + `ebookParts()`) and
`scripts/guide-content.mjs` (guide sections) are the single source of the markup
— consumed by both the PDF and flipbook builders, so the two never drift. The
PDF builders wrap the same content in the print spacer table (see
[10_pdf_generation](10_pdf_generation.md)); the flipbook builders wrap it in the
engine above.

## Future (Milestone 2 proper)

An in-app `/flipbook` route reusing the React block components and `useProgress`
(bookmarks, resume). The standalone HTML flipbooks here are the offline/portable
form.
