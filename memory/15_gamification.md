# 15 · Gamification (the doubloon economy)

The reading experience is a voyage. Charting maps earns treasure; completing the
atlas mints a certificate. Pulled forward from Milestone 5 because it is what
makes the reader *want* to finish.

## The economy (`lib/treasure.ts`)

- **10 doubloons** per map read (`DOUBLOONS_PER_MAP`).
- **25-doubloon bounty** for filling a chapter chest, i.e. reading every map in
  it (`CHAPTER_CHEST_BOUNTY`).
- Maximum hoard = 92 × 10 + 11 × 25 = **1,195 doubloons**.
- The **voyage certificate** mints when all 92 maps are charted. It is printable
  and personalised (`components/treasure/Certificate.tsx`).
- Ranks by percent: Stowaway → Deckhand → Navigator → First Mate → Ship's
  Captain → Master Cartographer (`rankFor`).

All constants live in `lib/treasure.ts`. Pure functions there; React surface in
`hooks/useTreasure.ts`. The chapter→lesson-URL manifest is emitted to
`public/treasure-map.json` by the search-index script.

## State (critical)

Progress is a **single module-level store** (`lib/progress-store.ts`) surfaced
through `useSyncExternalStore` in `hooks/useProgress.ts`. This is load-bearing:
the doubloon counter, sidebar, lesson meta, and treasure hall must all update the
instant a map is completed. An earlier per-`useState` version did NOT sync across
component instances — the counter stayed at 0 until reload. Do not reintroduce
per-component progress state.

`markRead(url)` returns `true` only on first completion, which drives the
one-time doubloon award toast (`components/treasure/DoubloonAward.tsx`).

## Gold discipline

Doubloons, chests, checks, and the certificate are all **earned states**, so
gold is correct everywhere in this system. See [02_brand](02_brand.md).

## Surfaces

- `/treasure` — the hall: hoard total, rank, chest grid, certificate.
- `/bookmarks` — saved maps.
- Top-bar `DoubloonCounter` (gold, links to the hall).
- Home `ProgressSummary`, chapter `ChapterChest`, lesson award toast + `LessonRow` checks.

## Future (Milestone 5 proper)

Cloud sync (the store shape already anticipates it), per-badge achievements
beyond chests, and accounts. Not yet built.
