# CLAUDE.md — The Money Map

> Load `memory/00_identity.md` through `memory/14_future_features.md` first.
> They are the detailed source of truth; this file is the map to them.

## What this is

A local-first personal finance education platform. **Markdown is the source of
truth** — the website, and (later) the flipbook, PDF, and search index are all
generated from one MDX content tree. Built from a 92-map infographic series that
was *extracted* into structured, searchable, responsive content.

Tagline: **"Navigate Your Journey to Financial Freedom."**

## Architecture

```
content/**/*.mdx  →  velite (Zod)  →  generated/json  →  ┬→ search index
                                                          ├→ website (Next.js)
                                                          ├→ [M2] flipbook
                                                          └→ [M3] PDF
```

- **Next.js 16** (App Router, static generation) · **TypeScript** · **Tailwind v4**
- **Velite** for content (not Contentlayer — unmaintained) · **Zod** schema
- **Fuse.js** search · **Framer Motion** · **Lucide** icons

## The four rules that matter most

1. **Markdown is the source of truth.** Everything in `generated/` is
   disposable. A fact that exists only in a generated artifact is a bug.
   → `memory/09_generation_pipeline.md`
2. **Provenance.** Every content block is `extracted` (verbatim from a source
   map) or `authored` (pedagogy). Authored content asserting a fact may never
   introduce a financial figure absent from extracted blocks. `npm run
   audit:provenance` enforces it (and checks table-row widths).
   → `memory/04`, `memory/05`, `memory/07`
3. **The gold rule.** Gold marks treasure only — earned states and cartographic
   labels — never generic UI chrome. Green is the accent. → `memory/02_brand.md`
4. **Progress is one shared store.** `lib/progress-store.ts` via
   `useSyncExternalStore` — so the doubloon counter, sidebar, and treasure hall
   update the instant a map is completed. → `memory/15_gamification.md`

## Content model

11 chapters (islands) × 92 lessons (maps). Eight block types cover the corpus:
`timeline`, `comparison`, `buckets`, `flow`, `table`, `phases`, `stat`, `note`.
Adding a block type touches three files together: the Zod schema
(`velite.config.ts`), a component (`components/blocks/`), and both search
flatteners (`lib/search.ts` + `scripts/build-search-index.mjs`).

## Commands

```bash
npm run dev                # velite --watch + next dev
npm run generate           # velite + search index
npm run build              # velite + next build (76 static pages)
npm run audit:provenance   # figure-grounding audit
npx velite --clean         # validate content only (fails closed)
```

## Checklists

**Before complete:** velite validates · provenance passes · production build
green · driven in a browser (home, a rich lesson, search, both themes).
Verification is by observation, not a green typecheck. → `memory/13`.

**Accessibility:** semantic HTML, full keyboard traversal, visible focus rings,
`prefers-reduced-motion` honored globally, light/dark parity. → `memory/03`.

**Performance:** static generation, JS budget < 150 KB gzipped, compositor-only
motion (`transform`/`opacity`), search index lazy-loaded. → `memory/03`.

## Status

Milestone 1 is **complete — all 92 maps extracted**. The gamification core
(doubloon economy + voyage certificate) was pulled forward from Milestone 5 and
is built — see `memory/15_gamification.md`. Production build: 108 static pages.

Progress is a **shared external store** (`lib/progress-store.ts` +
`useSyncExternalStore`); never reintroduce per-component progress `useState` — it
breaks live updates across the doubloon counter, sidebar, and treasure hall.

Do not build Milestones 2–4 (flipbook, PDF, calculators) ahead of their specs.
→ `memory/14`.
