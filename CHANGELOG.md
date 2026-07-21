# Changelog

All notable changes to The Money Map. Format follows
[Keep a Changelog](https://keepachangelog.com/); versioning is semver.

## [0.5.0] — 2026-07-21

Treasure-map progress, in-outline restart, a prominent Reset button, and
print-corrected PDFs.

### Added

- **The voyage as an actual treasure map** (`components/treasure/TreasureMapProgress.tsx`)
  — a dashed sea route winding past the eleven island chapters to buried
  treasure ("A rich life", X-marks-the-spot) at the end. A gold ship sails to
  your exact progress; the charted route behind it is solid gold, the route
  ahead faint. Islands glow gold as their chapter completes. On the treasure
  hall (and it recalculates live).
- **Clickable outline checkmarks.** Each completed map shows a gold check in the
  sidebar that you can click to un-complete it — a per-section restart. Unread
  maps show an inert marker: you can only *remove* a check once the map has
  actually been charted (`markUnread` on the shared store).
- **Reset button in the top bar**, next to Save, in the matching gold style,
  with an inline confirm — so restarting the whole journey is one obvious click
  (the sidebar reset control remains too).

### Changed

- **PDF margins corrected for print.** Both the guide and the e-book now use
  20–22 mm page margins with the cover/chapter bleeds kept in sync, and friezes
  sized to fit — text and imagery sit cleanly within print-safe margins with
  proper gutters, verified in a PDF viewer.
- More cinematic backdrops (e.g. a treasure-map motif on the bookmarks page).

## [0.4.0] — 2026-07-21

Cinematic treasure art — the pirate imagery re-cut from flat line-icons to
struck-gold reliefs, guided by the ui-ux-pro-max skill's skeuomorphic /
hyperreal direction.

### Changed

- **All pirate art is now dimensional metallic gold** (`components/art/Pirate.tsx`).
  Filled silhouettes painted with a multi-stop gold gradient, dark engraving
  outlines, and a drop-shadow relief filter — struck coins, heraldic seals, a
  real galleon, a gleaming compass rose — instead of thin uniform strokes that
  read as cartoon. New shared paint defs in `components/art/GoldDefs.tsx`
  (`url(#mm-gold)`, `#mm-gold-radial`, `#mm-relief`), mounted once in the layout.
- **Cinematic atmosphere** — deep vignette, gold-dust light sources, and a fixed
  film-grain overlay give the dark theme chiaroscuro; friezes and backdrops sit
  at higher opacity now that the emblems hold up as dimensional gold.
- **PDFs re-cut to match** — both the Launch Guide and the e-book open on a
  full-bleed **dark, gold-lit cover**; the e-book's chapter dividers are dramatic
  dark plates, with content on warm parchment for readability. Gold-gradient art
  throughout (`scripts/pdf-art.mjs` now emits filled reliefs + a shared `<defs>`).
- Richer gold token ramp (`--gold-shadow` → `--gold-highlight`) for the metallic
  gradient.

### Fixed

- Corrected a malformed light-mode `body::before` selector introduced with the
  atmosphere layer.

## [0.3.0] — 2026-07-21

Garamond, bold pirate identity, progress management, and PDF outputs.

### Added

- **Two generated PDFs** (`npm run pdf`, via headless Chrome — no new
  dependency): a 4-page **Launch Guide**
  (`generated/pdf/The-Money-Map-Launch-Guide.pdf`) and the full **228-page
  e-book** of all 92 maps with their blocks and matching pirate imagery
  (`The-Money-Map-Ebook.pdf`). Generators in `scripts/build-guide-pdf.mjs`,
  `scripts/build-ebook-pdf.mjs`, shared art in `scripts/pdf-art.mjs`.
- **Large pirate art library** (`components/art/Pirate.tsx`) — crest, pirate
  ship, Jolly Roger, rum, gold pile, cannon, crossed swords, lighthouse, jewel,
  pirate hat, treasure map, ship's wheel. Plus `PirateFrieze` / `PirateBackdrop`
  scene helpers (`components/art/PirateScene.tsx`), woven prominently across the
  home, chapter, lesson, and treasure pages.
- **Full-page hero** — the title now spans the viewport at a new `--text-display`
  scale, over ship/lighthouse/compass backdrops.
- **Progress management** — Save progress (download a backup), Load a saved
  voyage (restore), and Reset progress, in the sidebar's *Your Voyage* menu; a
  matching gold **Save** chip in the top bar beside the doubloon counter.
- **Green/white/black hover gradient** on cards and interactive rows
  (`.card`, `.hover-gradient`).

### Changed

- **All typography is now Garamond** — a single `--font-garamond` stack drives
  both the sans and serif tokens.
- Home reframed as "the eleven islands"; chapter cards carry per-island motifs
  and chest chips.

### Fixed

- The sidebar compass watermark overlapped the chapter titles — removed; the
  brand header now uses a Jolly Roger mark that stays clear of the outline.

## [0.2.0] — 2026-07-21

Full content, gamification, and pirate/cartographic identity.

### Added

- **All 92 maps extracted.** The atlas is complete — 92 lessons across 11
  chapters, 607 typed blocks (235 buckets, 164 notes, 75 tables, 51 flows, 38
  stats, 22 comparisons, 16 phase bands, 6 timelines). Every lesson has
  takeaways, action steps, and a quiz.
- **The doubloon economy** (`lib/treasure.ts`, `hooks/useTreasure.ts`). Each map
  read earns 10 doubloons; filling a chapter's chest pays a 25-doubloon bounty;
  the full voyage is worth 1,195. Ranks from Stowaway to Master Cartographer.
- **Voyage certificate.** Mints when all 92 maps are charted — printable,
  personalised, gold-sealed (`components/treasure/Certificate.tsx`).
- **Treasure hall** (`/treasure`) — hoard total, rank, chapter-chest grid, and
  the certificate. **Saved maps** page (`/bookmarks`).
- **Reward moment.** Completing a map fires a doubloon award toast and, when it
  fills a chest, announces the bounty. Sidebar and chapter rows show gold
  completion checks.
- **Cartographic + pirate imagery** — inline SVG compass rose, doubloon, treasure
  chest, anchor, map-X, and scroll (`components/art/Icons.tsx`), woven through
  the hero, sidebar, chapter cards, treasure hall, and certificate.
- **Mobile navigation** — a slide-in drawer with the full chapter outline
  (`components/reader/MobileNav.tsx`); the sidebar was previously desktop-only.
- **Sidebar utility nav** — atlas / saved maps / treasure hall links.

### Changed

- **Progress is now a shared external store** (`lib/progress-store.ts` +
  `useSyncExternalStore`). Every surface — doubloon counter, sidebar, lesson
  meta, treasure hall — updates the instant a map is completed and syncs across
  tabs. Replaces per-component `useState`, which did not sync live.
- Home hero and progress summary reframed around the voyage: doubloons, chests,
  and the certificate.

### Fixed

- **13 tables across the corpus** had rows split by unquoted commas inside cells
  (misaligned columns). All corrected; a row-width check was added to
  `audit:provenance` so it fails closed if it recurs — a class of bug Velite's
  schema does not catch.

### Verified

- Production build: 108 static pages, TypeScript clean.
- Browser: the full doubloon loop (award toast → counter → sidebar checks →
  chest fill → certificate mint at 100%), treasure hall, both themes.

## [0.1.0] — 2026-07-20

Milestone 1: content pipeline + design system + reader website.

### Added

- **Content pipeline** — Velite + Zod. MDX → typed JSON → search index. Build
  fails closed on any schema violation.
- **Block schema (8 types)** — `timeline`, `comparison`, `buckets`, `flow`,
  `table`, `phases`, `stat`, `note`. Locked against three exemplar
  infographics before batch extraction.
- **Provenance system** — every block tagged `extracted` | `authored`;
  `audit:provenance` hard-fails when a fact-asserting figure is not grounded in
  extracted content.
- **Content** — 62 of 92 lessons extracted (the rest followed in 0.2.0).
- **Design system** — black/white/green tokens with gold reserved for treasure.
  8pt grid, Apple spring motion, light/dark parity, `prefers-reduced-motion`.
- **Reader** — three-panel shell; static chapter/lesson routes; sidebar with
  progress; ⌘K full-text search; interactive quiz; local-first progress +
  bookmarks; original-map download.
- **Docs** — memory knowledge base, `CLAUDE.md`, `README.md`, `PRODUCT_SPEC.md`,
  `ROADMAP.md`, design spec, extraction guide.

### Stack notes

- Contentlayer → **Velite** (Contentlayer unmaintained since 2023).
- react-pageflip → **CSS 3D transforms** planned for the flipbook (M2).
