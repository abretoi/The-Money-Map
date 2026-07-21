# Roadmap

Each milestone gets its own spec (`docs/superpowers/specs/`) before any code.
Do not build ahead.

## ✅ Milestone 1 — Content pipeline + design system + reader

**Built.**

- Velite + Zod content pipeline; 8-block schema locked on exemplars.
- Design system: black/white/green tokens, gold-as-treasure, 8pt grid, spring
  motion, light/dark parity, reduced-motion.
- Reader: three-panel shell, chapter/lesson routing, sidebar outline, ⌘K
  full-text search, quiz, local-first progress + bookmarks, original-map
  download.
- Provenance audit; production build (76 static pages); browser-verified.

**Remaining in M1:** extract the final **30 of 92 lessons** (the first 62 are
done). Procedure in [`docs/EXTRACTION_GUIDE.md`](docs/EXTRACTION_GUIDE.md); the
list is derivable from `data/outline.json` minus existing files. Purely additive
— write MDX, validate, done. No code changes.

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
