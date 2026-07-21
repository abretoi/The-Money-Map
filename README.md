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
  housing, and legacy.
- 🧩 **8 typed content blocks** — timeline, comparison, buckets, flow, table,
  phase bands, stat strip, note — one source, many render targets.
- 🔎 **Instant ⌘K search** — full-text across every figure and label.
- 🌓 **Light & dark**, keyboard-accessible, reduced-motion aware.
- 🏴‍☠️ **Progress as a voyage** — islands, completion, earned-gold milestones.

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
| `npm run generate` | Regenerate JSON + search index from MDX |
| `npm run generate:search` | Rebuild only the search index |
| `npm run audit:provenance` | Verify every fact-asserting figure is grounded |
| `npx velite --clean` | Validate content against the schema (fails closed) |

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
components/reader/     sidebar, search palette, quiz, progress, theme
lib/                   content access + search flattening
hooks/                 useProgress (local-first)
scripts/               search index + provenance audit
styles/tokens.css      design tokens (black/white/green; gold = treasure)
generated/             DISPOSABLE — velite output, never hand-edited
public/infographics/   original maps, retained as downloadable artifacts
data/                  canonical outline (survives velite --clean)
memory/                14-file knowledge base — load these first
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
