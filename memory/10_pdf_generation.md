# 10 · PDF Generation — Milestone 3 (not yet built)

## Principle

The PDF is an **output**, generated from the same typed JSON as the website. It
never re-embeds the source JPEGs. Each block renders through a print-styled
variant of its component.

## Planned approach

- Render lessons to static HTML with a print stylesheet (`@page`, running
  headers/footers, page numbers), then Playwright `page.pdf()`.
- Clickable TOC and cross-references via internal anchors.
- Glossary and index generated from tags and definitions.
- Print-optimized: no dark surfaces, hairlines become light rules, figures keep
  their exact strings.

## Not decided yet

- React-PDF vs. print-CSS + headless Chromium. Lean print-CSS: it reuses the
  block components rather than re-implementing them.

Deferred until Milestone 1 content is complete. Its own spec first.
