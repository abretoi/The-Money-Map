# 13 · Release Process

Before shipping any change:

1. `npx velite --clean` — content validates (build fails closed on violation).
2. `npm run generate` — JSON + search index rebuild cleanly.
3. `npm run audit:provenance` — no fact-asserting figure is ungrounded.
4. `npm run build` — production build passes, all pages statically generate.
5. Drive the running app in a browser — home, a rich lesson, search, both
   themes. Verification is by observation, not by a green typecheck.
6. Update `CHANGELOG.md`.

## Content additions

Adding lessons is: write MDX → `velite --clean` → verify the page renders.
No code change needed unless a new block type is required (then: schema +
component + both search flatteners, together).

## Commits

Conventional commits (`feat:`, `fix:`, `content:`, `docs:`). Branch off main;
never commit generated artifacts except `public/search-index.json` and the
`public/infographics/` originals, which are served assets.
