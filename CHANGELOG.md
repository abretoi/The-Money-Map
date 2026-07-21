# Changelog

All notable changes to The Money Map. Format follows
[Keep a Changelog](https://keepachangelog.com/); versioning is semver.

## [0.1.0] — 2026-07-20

Milestone 1: content pipeline + design system + reader website.

### Added

- **Content pipeline** — Velite + Zod. MDX → typed JSON → search index. Build
  fails closed on any schema violation.
- **Block schema (8 types)** — `timeline`, `comparison`, `buckets`, `flow`,
  `table`, `phases`, `stat`, `note`. Locked against three exemplar
  infographics before batch extraction.
- **Provenance system** — every block tagged `extracted` | `authored`;
  `audit:provenance` hard-fails when a fact-asserting figure (quiz answer,
  explanation, authored block) is not grounded in extracted content, and
  reports derived/distractor figures for review.
- **Content** — 62 of 92 lessons extracted across all 11 chapters. 412 typed
  blocks (159 buckets, 117 notes, 42 tables, 35 flows, 28 stats, 15
  comparisons, 10 phase bands, 6 timelines). Every lesson has takeaways,
  action steps, and a quiz.
- **Design system** — black/white/green token system with gold reserved for
  treasure (earned states + cartographic labels). 8pt grid, Apple spring
  motion, light/dark parity, global `prefers-reduced-motion`.
- **Reader** — three-panel shell; chapter and lesson routes (static); sidebar
  outline with live progress; ⌘K full-text search (lazy-loaded Fuse.js index);
  interactive quiz; local-first progress + bookmarks; original-map download.
- **Docs** — 14-file `memory/` knowledge base, `CLAUDE.md`, `README.md`,
  `PRODUCT_SPEC.md`, `ROADMAP.md`, design spec, extraction guide.

### Verified

- Production build: 76 static pages, TypeScript clean.
- Browser: home, lesson (all block types), ⌘K search, light + dark — all
  confirmed rendering. Search surfaces lessons by extracted body content, not
  just titles.

### Known gaps

- **30 of 92 lessons remain to extract** — the parallel extraction run was cut
  short by an external session limit. Purely additive; procedure in
  `docs/EXTRACTION_GUIDE.md`, list derivable from `data/outline.json`.
- Flipbook, PDF, and calculators are scoped (see `ROADMAP.md`) but not built.

### Stack notes

- Contentlayer → **Velite** (Contentlayer unmaintained since 2023).
- react-pageflip → **CSS 3D transforms** planned for the flipbook (M2);
  react-pageflip unmaintained since 2022.
