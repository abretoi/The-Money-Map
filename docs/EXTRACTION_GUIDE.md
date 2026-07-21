# Infographic → MDX Extraction Guide

You are converting one Money Map infographic (a JPEG) into one MDX lesson file.

The infographic is **not a picture**. It is a structured document that happens to
have been rendered as an image. Your job is to parse it back into typed blocks.

## Non-negotiable rules

1. **Figures are frozen.** Copy every number, currency amount, and percentage
   **exactly** as printed: `$412,400`, `6.23%`, `$5,181 / month`. Never round,
   re-format, convert, or "clean up" a figure. They are strings in the schema
   for this reason.
2. **Never invent content.** If the infographic does not state it, it does not
   go in an `extracted` block. Do not fill gaps from your own finance knowledge.
3. **Provenance is mandatory.** Every block declares `source: extracted` or
   `source: authored`.
   - `extracted` — verbatim from the image.
   - `authored` — pedagogy you wrote (prose body, takeaways, action steps, quiz).
4. **Quiz items may only reference figures present in `extracted` blocks.** This
   is the safety property of the whole pipeline. A quiz answer that introduces a
   number not on the map is a defect.
5. **Stamp `asOf: 2026`** on any extracted block containing dated figures
   (contribution limits, benefit maximums, rates, median prices).
6. **Preserve the advisor disclaimer** at the foot of the map as a
   `note` block with `variant: disclaimer`.

## The eight block types

| Block | `type` | Use when the map shows… |
|---|---|---|
| Timeline | `timeline` | An ordered progression of ages, stages, or dates |
| Comparison | `comparison` | 2–4 parallel options set side by side |
| Buckets | `buckets` | A set of categories/tips with no inherent order |
| Ordered flow | `flow` | Numbered steps, usually with arrows between them |
| Table | `table` | A header row plus data rows |
| Phase bands | `phases` | Horizontal life-stage bands across the bottom |
| Stat strip | `stat` | A banner of headline figures (often 4–6 across the top) |
| Note | `note` | Callouts, footnotes, disclaimers, closing "core lesson" |

Notes:
- `buckets` items may omit `description` for label-only chips; set
  `layout: chips` when the map renders them as compact pills.
- `note` variants: `info`, `warning`, `disclaimer`, `insight`. Use `insight`
  for the closing core-lesson line many maps end on.
- `stat` holds an **array** of figures, even when there is only one.

## Required frontmatter

```yaml
title:          # exact map title, without "THE MONEY MAP" prefix
slug:           # given to you
chapter:        # given to you
order:          # given to you
summary:        # one or two sentences, authored
tags:           # 3-6 lowercase kebab-case topic tags
sourceImage:    # e.g. page_037.jpg
sourcePage:     # e.g. 37
readingMinutes: # 4-8, judged by density
blocks:         # extracted structure
keyTakeaways:   # 3-5, authored, grounded in extracted blocks
actionSteps:    # 3-5, authored, concrete and doable
quiz:           # 2-3 items; `answer` is a 0-based index
```

The MDX body below the frontmatter is 2–4 short authored paragraphs framing the
map. Do not restate the blocks — add the connective reasoning the image cannot.

## Reference exemplars

Read these two before starting. They are validated and canonical:

- `content/chapters/retirement-fire-benefits/the-retirement-map.mdx`
  (timeline, comparison, buckets, flow, table, phases, notes)
- `content/chapters/housing-real-estate/home-affordability.mdx`
  (stat strip, comparison with highlights, table, chip buckets, disclaimer)

## Validate before you finish

```bash
npx velite --clean
```

The build **fails** on schema violation. A passing build is required before you
report done. If a map genuinely does not fit the eight block types, report that
rather than forcing it — do not invent a ninth type.
