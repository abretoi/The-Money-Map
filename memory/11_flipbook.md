# 11 · Flipbook — Milestone 2 (not yet built)

## Principle

An Apple Books-style reading experience generated from the same content. Pages
are paginated block sequences, not the source JPEGs.

## Approach (decided in the M1 spec)

- **CSS 3D page-turn**, not `react-pageflip` (last published 2022, unmaintained
  at the center of a headline feature). ~200 lines, animates only `transform`
  and `opacity` (compositor-friendly), no dependency risk.
- Fixed-height spreads; blocks flow into pages by a measured pagination pass.
- Keyboard (←/→), touch/drag, fullscreen, TOC, progress, bookmarks.
- Respects `prefers-reduced-motion` — page turns collapse to a cross-fade.

Deferred until Milestone 1 content is complete. Its own spec first.
