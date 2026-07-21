# 12 · Search

## How it works

`scripts/build-search-index.mjs` flattens every block of every lesson to plain
text and writes `public/search-index.json`. `SearchTrigger` (⌘K) fetches it
lazily and runs Fuse.js client-side.

This is the payoff of extracting the infographics: the ~90k words that were
locked inside JPEG pixels are now full-text searchable. Verified — searching
"roth conversion" surfaces five relevant maps by body content, not just titles.

## Fuse config (`lib/search.ts`)

- `threshold: 0.34` — typo tolerance without noise.
- Weighted keys: title 0.4, tags 0.2, summary 0.2, full text 0.2.
- `ignoreLocation` so matches anywhere in a long field count.

## Keeping the flatteners in sync

`flattenBlock` exists twice: `lib/search.ts` (typed, for app code) and
`scripts/build-search-index.mjs` (plain JS, for the build). Adding a block type
means updating **both**. This duplication is deliberate — the script has no
TypeScript/bundler dependency — but it is the one place drift can hide.
