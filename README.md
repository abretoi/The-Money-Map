<div align="center">

# 🧭 The Money Map

**Navigate Your Journey to Financial Freedom.**

A local-first personal finance education platform where Markdown is the source
of truth and the website, flipbook, PDF, and search index are all generated
from one content tree.

</div>

---

## What it is

The Money Map turns a 92-map personal-finance infographic series into a premium,
searchable, responsive reading experience. Each infographic was **extracted**
into structured content — typed blocks that render natively, reflow on mobile,
and are fully full-text searchable — rather than shipped as a flat image.

- 📚 **11 chapters, 92 lessons** — from money mindset through taxes, retirement,
  housing, and legacy. Every map is extracted, not just an image.
- 🧩 **8 typed content blocks** — timeline, comparison, buckets, flow, table,
  phase bands, stat strip, note — one source, many render targets.
- 🔎 **Instant ⌘K search** — full-text across every figure and label.
- 🪙 **The doubloon economy** — chart a map to earn doubloons, fill a chapter's
  treasure chest for a bounty, and mint the **voyage certificate** at 100%.
- 🧭 **Cartographic identity** — compass roses, chests, and gold reserved
  strictly for treasure.
- 🌓 **Light & dark**, keyboard-accessible, reduced-motion aware, mobile drawer.

## Quick start

```bash
npm install
npm run generate      # build content JSON + search index
npm run dev           # http://localhost:3000
```

## Commands

| command | what it does |
|---|---|
| `npm run dev` | Velite watch + Next dev server |
| `npm run build` | Validate content, then production build (static) |
| `npm run generate` | Regenerate JSON + search + treasure manifest from MDX |
| `npm run pdf` | Regenerate the launch guide + full e-book PDFs |
| `npm run audit:provenance` | Verify figures grounded + table integrity |
| `npx velite --clean` | Validate content against the schema (fails closed) |

## PDF & flipbook outputs

`npm run pdf` renders two self-contained PDFs into `generated/pdf/` using your
system Chrome (no extra dependency):

- **The-Money-Map-Launch-Guide.pdf** — a short, illustrated setup guide.
- **The-Money-Map-Ebook.pdf** — the complete atlas, all 92 maps with their
  blocks and pirate imagery, ready to read or print.

`npm run flipbook` renders two **pirate flipbooks** — self-contained,
page-turning HTML you can open in any browser (no server):

- **generated/pdf/launch-guide.html** — the guide as a flipbook.
- **generated/pdf/ebook.html** — the whole atlas as a flipbook (TOC, progress,
  keyboard / swipe / fullscreen).

Set `CHROME_BIN` if Chrome lives somewhere non-standard (PDFs only).

## Writing content

One lesson = one MDX file at `content/chapters/<chapter>/<lesson>.mdx`.
Frontmatter carries the typed, extracted **blocks**; the body and pedagogy are
authored. Full rules in [`docs/EXTRACTION_GUIDE.md`](docs/EXTRACTION_GUIDE.md)
and `memory/07_markdown_rules.md`. The build fails on any schema violation, so a
green `npx velite --clean` means the content is valid.

## Project layout

```
content/chapters/     MDX source — the source of truth (11 chapters × lessons)
components/blocks/     one React component per block type
components/reader/     sidebar, search palette, quiz, progress, theme, mobile nav
components/treasure/   doubloon counter, treasure hall, chests, certificate, award
components/art/        cartographic + pirate SVG iconography
lib/                   content access, search, treasure economy, progress store
hooks/                 useProgress (shared store), useTreasure
scripts/               search index + provenance/table audit
styles/tokens.css      design tokens (black/white/green; gold = treasure)
generated/             DISPOSABLE — velite output, never hand-edited
public/infographics/   original maps, retained as downloadable artifacts
public/treasure-map.json  chapter→lesson manifest for the doubloon economy
data/                  canonical outline (survives velite --clean)
memory/                knowledge base (00–15) — load these first
docs/                  design spec + extraction guide
```

## Generating other formats

The flipbook (Milestone 2), PDF (Milestone 3), and calculators (Milestone 4)
are generated from the same content JSON. They are scoped but not yet built —
see [`ROADMAP.md`](ROADMAP.md). Each is generated, never a re-embedded image.

## Design & architecture

- Product spec: [`PRODUCT_SPEC.md`](PRODUCT_SPEC.md)
- Design decisions: [`docs/superpowers/specs/2026-07-20-money-map-design.md`](docs/superpowers/specs/2026-07-20-money-map-design.md)
- For contributors using Claude Code: [`CLAUDE.md`](CLAUDE.md)

## Content source & disclaimer

Built from *The Money Map — A Personal Finance Knowledge Map*. All content is
**educational, not financial advice**; each lesson preserves its source advisor
disclaimer. Figures are reproduced verbatim from the source and dated with an
`asOf` year.
