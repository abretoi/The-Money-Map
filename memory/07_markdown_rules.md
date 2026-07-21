# 07 · Markdown Rules

## File location

```
content/chapters/<chapter-slug>/chapter.mdx   # chapter intro (NOT _chapter.mdx)
content/chapters/<chapter-slug>/<lesson>.mdx   # one lesson per map
```

Velite treats `_`-prefixed files as partials and excludes them silently — this
cost a debugging cycle once. Do not prefix content files with `_`.

## Frontmatter is the schema

`velite.config.ts` is the single source of truth for shape. The build **fails**
on any violation — invalid frontmatter is an error, not a warning. Run
`npx velite --clean` to validate.

## Blocks live in frontmatter, not the body

Blocks are YAML under `blocks:`, not MDX components in the prose. This is
deliberate: Zod validates them at build time, and the PDF, flipbook, and search
generators consume typed JSON without parsing MDX.

## The eight block types

`timeline`, `comparison`, `buckets`, `flow`, `table`, `phases`, `stat`, `note`.
If a map genuinely does not fit, report it — do not invent a ninth type without
updating the schema, a component, and the search flattener together.

## YAML gotchas (learned the hard way)

- Quote any string containing `:` or starting with `$` or `"`. An unquoted
  `explanation: "X" says…` parses as a broken scalar.
- A list item containing `:` (`- Rebalance quarterly: check drift`) parses as an
  **object**, not a string. Quote it or use `>-`.
- Never write `$22,200` unquoted inside a flow array `[...]` — the comma splits
  it into two cells. Quote every figure inside inline arrays.

## Provenance

Every block: `source: extracted | authored`. Dated extracted blocks: `asOf`.
See [04_content_style](04_content_style.md).
