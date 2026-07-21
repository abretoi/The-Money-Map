# Roadmap

Each milestone gets its own spec (`docs/superpowers/specs/`) before any code.
Do not build ahead.

## ✅ Milestone 1 — Content pipeline + design system + reader

**Complete — all 92 maps.**

- Velite + Zod content pipeline; 8-block schema locked on exemplars.
- **All 92 lessons extracted** across 11 chapters (607 typed blocks).
- Design system: black/white/green tokens, gold-as-treasure, 8pt grid, spring
  motion, light/dark parity, reduced-motion.
- Reader: three-panel shell, chapter/lesson routing, sidebar outline, mobile
  drawer, ⌘K full-text search, quiz, local-first progress + bookmarks,
  original-map download.
- Provenance + table-width audit; production build (108 static pages);
  browser-verified.

## ✅ Milestone 5 (core) — Gamification, pulled forward

**Built.** The doubloon economy landed early because it is what makes the reader
want to finish the atlas.

- 10 doubloons per map, 25 per chapter chest, 1,195 for the full voyage.
- Treasure hall (`/treasure`), chapter chests, saved maps (`/bookmarks`).
- Printable voyage certificate, minted at 100%.
- Shared progress store so every surface updates live.
- See [`memory/15_gamification.md`](memory/15_gamification.md).

**Remaining in M5:** cloud sync + accounts (the store shape already anticipates
this), and achievement badges beyond chapter chests.

## Milestone 2 — Flipbook

Apple Books-style reader. CSS 3D page-turn (not react-pageflip). Paginated block
spreads, keyboard/touch/fullscreen, TOC, progress, reduced-motion cross-fade.
→ `memory/11_flipbook.md`.

## Milestone 3 — PDF + print

Print-CSS + headless Chromium from the same JSON. Clickable TOC, running
headers/footers, page numbers, glossary, index. Never re-embeds source JPEGs.
→ `memory/10_pdf_generation.md`.

## Milestone 4 — Calculators (12)

Compound interest, retirement, mortgage, debt payoff, savings rate, FIRE,
budget, net worth, withdrawal, inflation, asset allocation, investment. Pure
calculation modules + components, embeddable via a new `calculator` block. They
compute; they never recommend. → `memory/14_future_features.md`.

## Milestone 5 — Gamification, then SaaS foundation

Islands unlock on chapter completion; badges; financial XP; treasure-map
progress view (gold is the reward currency). Then accounts + cloud sync —
`useProgress`'s shape already anticipates this. Newsletter, premium, and
Plaid/Stripe are further out and unscoped.

## Explicitly deferred (YAGNI)

AI tutor, brokerage/bank integrations, and community are not on the near roadmap.
Build a great atlas and great calculators first.
