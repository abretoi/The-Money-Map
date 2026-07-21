# 04 · Content Style

## Lesson anatomy

Frontmatter (`blocks`) is **extracted**. Body prose, `keyTakeaways`,
`actionSteps`, and `quiz` are **authored**. Every block declares which.

- **Summary** — one or two sentences. What this map is for.
- **Body** — 2–4 short paragraphs that add the connective reasoning the image
  cannot. Do not restate the blocks.
- **Blocks** — the extracted structure. Verbatim figures.
- **Key takeaways** — 3–5. Grounded in the blocks; derived arithmetic is fine
  ("the gap is ~$418/month") but gets flagged for review by the audit.
- **Action steps** — 3–5. Concrete and doable this week.
- **Quiz** — 2–3. The correct answer and every explanation must be grounded in
  extracted figures. Distractors may be plausible inventions.

## Provenance discipline

See [07_markdown_rules](07_markdown_rules.md). The one rule that must never
break: authored content that asserts a fact may not introduce a financial
figure absent from the extracted blocks. `npm run audit:provenance` enforces
the hard half of this and reports the soft half.
