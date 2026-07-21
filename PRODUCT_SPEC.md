# The Money Map — Product Specification

## Vision

A premium educational *operating system* for personal finance, not an ebook or
blog. One Markdown source drives a website, flipbook, PDF, and search index. The
experience feels like Apple Books met Obsidian met a treasure map — elegant,
sophisticated, never cheesy.

## Mission

Make personal finance feel navigable. Most people do not lack information; they
lack a map of how the pieces connect. The Money Map is that atlas: topic-sorted,
sequenced, and honest about trade-offs.

## Target audience

U.S. households, primarily 25–45, financially literate but without a coherent
map. Not beginners seeking definitions — capable people who need sequencing,
trade-offs, and the connective reasoning between decisions.

### Personas

- **The Optimizer** — has accounts and a budget, wants to know withdrawal order,
  tax sequencing, and what to do next.
- **The Planner** — approaching a decision (home, kids, retirement) and wants
  the whole map before committing.
- **The Learner** — building literacy deliberately, chapter by chapter, and
  values a sense of progress.

## Business goals

1. A best-in-class free reading experience that earns trust.
2. A maintainable, AI-first content pipeline (one source, many outputs).
3. A foundation that extends to calculators, accounts, and premium features
   without re-architecture.

## Feature matrix

| Feature | M1 (now) | Later |
|---|---|---|
| Reader website | ✅ | — |
| Typed content blocks (8) | ✅ | +calculator block (M4) |
| ⌘K full-text search | ✅ | — |
| Progress / bookmarks (local) | ✅ | cloud sync (M5) |
| Light / dark, a11y, reduced-motion | ✅ | — |
| Original-map download | ✅ | — |
| Flipbook | — | M2 |
| PDF / print | — | M3 |
| Calculators (12) | — | M4 |
| Gamification (islands, XP, badges) | partial (progress) | M5 |
| Accounts, sync, premium | — | M5+ |

## Technical architecture

```
content/**/*.mdx → velite (Zod) → generated/json → { search, site, flipbook, pdf }
```

- **Next.js 16** App Router, static generation · **TypeScript** · **Tailwind v4**
- **Velite** (Zod-validated typed content) · **Fuse.js** · **Framer Motion**
- Local-first state in `useProgress`, shaped for a future sync layer.
- Stack corrections from the original brief: Contentlayer → Velite (maintained);
  react-pageflip → CSS 3D transforms (M2). Rationale in the design spec.

## Information architecture

11 chapters (islands) × 92 lessons (maps). Chapter → lesson → blocks. URLs are
shallow: `/chapters/<chapter>/<lesson>`. Flat reading order powers prev/next and
progress across the whole book.

## UI architecture

Three panels collapsing to one on mobile: outline+search (left), reading
(center, 68ch measure), context (right, folds into body below `lg`). Design
system from the dashboard-design language — surface ladder, hairlines, 8pt grid,
Apple spring motion — with a black/white/green palette and gold reserved for
treasure. Full detail in `memory/03_ui.md` and `memory/02_brand.md`.

## Component library

Eight block components (one per type) + reader components (sidebar, search,
quiz, progress, meta, theme). Exhaustive block registry enforced at the type
level. See `memory/08_components.md`.

## Content provenance (non-functional, safety-critical)

Every block is `extracted` or `authored`. Authored content asserting a fact may
not introduce a financial figure absent from the extracted source. Enforced by
`audit:provenance`. Figures are verbatim strings, dated with `asOf`.

## Non-functional requirements

- **Performance** — static generation; JS budget < 150 KB gzipped; Lighthouse
  ≥ 95 on lesson pages; compositor-only motion; lazy search index.
- **Accessibility** — WCAG AA; full keyboard traversal; visible focus; reduced
  motion; light/dark parity.
- **SEO** — per-page metadata + OpenGraph; static HTML; semantic structure.
- **Security** — CSP-ready headers set; no unsanitized HTML; no secrets.

## Publishing workflow

Author MDX → `velite --clean` validates → `generate` builds artifacts → verify
in browser → commit. Content additions need no code change unless a new block
type is introduced. See `memory/13_release_process.md`.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md). Milestones 2–5 each get their own spec before
implementation.
