# The Money Map — Design Spec

**Date:** 2026-07-20
**Status:** Approved
**Scope:** Content pipeline + design system + reader website (Milestone 1 of 5)

---

## 1. Problem

The existing Money Map is a 66 MB single-file HTML flipbook wrapping 92 base64-embedded JPEG infographics. The infographics are excellent — dense, well-designed, information-rich. But as a product they have hard ceilings:

- **Search** reaches ~1,200 words (titles and section intros). The other ~90,000 words are pixels.
- **Mobile** is unusable. These are portrait A4-density compositions; on a 375px viewport the 11pt table text renders at roughly 3pt.
- **Accessibility** fails outright. No text layer, no headings, no semantics.
- **Performance** cannot reach the stated Lighthouse targets. 92 × ~600 KB of eagerly-decoded JPEG is a ~57 MB payload.
- **Every output re-embeds the same JPEGs.** The PDF, the flipbook, and the website are three containers for one immutable asset. Nothing is actually generated.

The goal is a platform where Markdown is genuinely the source of truth and the website, flipbook, PDF, and search index are all derived artifacts.

## 2. Core decision: extraction, not wrapping

Each infographic is not a picture. It is a **structured document that was rendered as an image**. "The Retirement Map" (page_037) decomposes cleanly into: a 7-node age timeline, 3 comparison cards, 4 bucket cards, a 5-step ordered flow, a 5-row stage/action table, and 4 phase bands.

So extraction is not OCR-to-prose. It is **parsing each image into typed blocks** that render as real React components. This is what makes one source drive four outputs:

| Target | How blocks render |
|---|---|
| Website | Interactive components, responsive reflow |
| PDF | Print-styled, paginated, page-numbered |
| Flipbook | Paginated into fixed-height spreads |
| Search | Flattened to indexed text |

The original JPEG is retained per lesson as a downloadable "original map" artifact. It becomes an *output*, not the source.

## 3. Content model

```
content/chapters/<chapter-slug>/<lesson-slug>.mdx
```

**11 chapters (islands) × 92 lessons.** Mirrors the source hierarchy, gives gamification a natural unlock structure, and keeps URLs shallow:

```
/chapters/retirement-fire-benefits/the-retirement-map
```

| # | Chapter | Lessons |
|---|---|---|
| 1 | purpose-money-mindset-behavioral-finance | 22 |
| 2 | cash-flow-savings-net-worth-wealth-stages | 13 |
| 3 | debt-credit-financial-safety | 3 |
| 4 | investing-markets-portfolio-strategy | 8 |
| 5 | taxes-capital-gains-account-buckets | 6 |
| 6 | retirement-fire-benefits | 9 |
| 7 | insurance-healthcare-protection-planning | 5 |
| 8 | housing-real-estate | 3 |
| 9 | family-couples-kids-college-planning | 9 |
| 10 | income-entrepreneurship-alternative-assets | 7 |
| 11 | life-morality-meaning-legacy | 7 |

### Frontmatter (Zod-validated)

```yaml
title: The Retirement Map
chapter: retirement-fire-benefits
order: 3
summary: One-sentence lesson abstract.
tags: [retirement, social-security, withdrawal-strategy]
sourceImage: page_037.jpg
sourcePage: 37
readingMinutes: 6
```

Validation is a **build gate**. Invalid frontmatter fails the build; it does not warn.

## 4. Block schema

Eight block types cover the corpus. Each is a Zod schema, an MDX component, and a search-flattener.

| Block | Shape | Typical use |
|---|---|---|
| `Timeline` | ordered nodes with label, value, detail | Age milestones, wealth stages |
| `ComparisonCards` | 2–4 parallel options with rows | Claim at 62 / FRA / 70 |
| `Buckets` | n categories with title + description | Account types, income buckets |
| `OrderedFlow` | numbered steps with arrow semantics | Withdrawal order, payoff sequence |
| `DataTable` | headers + rows, optional row icons | Stage → key actions |
| `PhaseBands` | horizontal life-stage bands | Accumulation → Legacy |
| `StatCallout` | figure + label + optional footnote | "$5,181 / month" |
| `Note` | info / warning / disclaimer | Advisor disclaimers |

### Provenance — the safety property

Every block carries:

```ts
source: "extracted" | "authored"
```

- **`extracted`** — verbatim from the infographic. Frozen facts. Never paraphrased, never rounded.
- **`authored`** — pedagogy written around those facts (action steps, exercises, quiz items).

**Constraint: quiz and exercise generation reads only `extracted` blocks.** Authored content may restate, sequence, or question extracted figures, but may never introduce a figure that is not present in the source image. This is what makes AI-authored pedagogy safe on top of financial content with hard numbers in it.

The UI surfaces this distinction, and a `pnpm audit:provenance` script reports the extracted/authored ratio per lesson.

### Numeric currency

Source figures are dated (the retirement map cites 2026 Social Security maximums). Extracted numeric blocks carry `asOf: 2026` so figures can be flagged for review rather than silently aging.

## 5. Pipeline

```
content/**/*.mdx
   → Velite (Zod validate + typed JSON)
      → generated/json/{chapters,lessons,outline}.json
         ├→ generated/search/index.json   (Fuse.js)
         ├→ website   (Next.js static)
         ├→ generated/pdf/                (Milestone 3)
         └→ generated/html/               (static export)
```

Single command: `pnpm generate`. Fully deterministic. No hand-maintained artifacts anywhere in `generated/`.

### Stack corrections from the original brief

- **Contentlayer → Velite.** Contentlayer's last publish was 2023-06-29; it is unmaintained and breaks on modern Next.js. Velite (published 2026-06) is the maintained successor with the same architecture: content dir → Zod-validated typed JSON.
- **react-pageflip → CSS 3D transforms.** Last published 2022-05; ~4 years stale and unmaintained at the center of a headline feature. A CSS 3D page-turn is ~200 lines, animates only `transform`/`opacity` (compositor-friendly, per the performance rules), and removes the dependency risk. Deferred to Milestone 2.

Everything else in the original stack is current and retained.

## 6. Design system

Derived from the `dashboard-design` skill — surface ladder, hairline outlines, card treatment, 8pt grid, spring motion, strict token discipline — with the palette narrowed as directed.

### Palette

Black → white surface ladder. **Green is the single semantic accent**, expressed as a gradient range rather than one value.

```
--bg      #000000     page
--bg-1    #0a0b0a     shell
--bg-2    #121412     card
--bg-3    #1b1e1b     chip
--line-1  rgba(255,255,255,.08)
--line-2  rgba(255,255,255,.14)

--green-1 #0b3d2c     deep
--green-2 #12805a     mid
--green-3 #30d158     bright
--gold    #d9b86b     earned states only
```

Light mode inverts the ladder and steps green down to `#00654a` for AA contrast on white. Both modes ship; parity is required, not optional.

### The gold rule

**Gold is reserved exclusively for earned states** — progress, unlocks, milestones, completion, badges. It never appears as decoration, never in navigation chrome, never in body text.

This single constraint is what keeps the pirate theme from going cheesy. Because gold only ever marks achievement, it reads as *treasure* rather than *ornament*. Compasses, map contours, and depth-sounding motifs appear as low-opacity texture in the surface layer, never as literal illustration.

### Motion

Apple spring `cubic-bezier(.32,.72,0,1)`, durations 150/280/450ms, capped at 300ms for interaction feedback. `transform` and `opacity` only. `prefers-reduced-motion` collapses all transitions to 0.01ms.

## 7. Reader architecture

Three panels, collapsible to one on mobile:

- **Left** — chapter/lesson outline, search entry, bookmarks, progress, recently viewed.
- **Center** — lesson prose and rendered blocks. Typography is the product; measure capped at 68ch.
- **Right** — reading progress, definitions surfaced from the glossary, related lessons, the original-map download.

State (progress, bookmarks, notes) is local-first in IndexedDB with a serializable shape that a future sync layer can adopt without migration.

## 8. Non-goals for this milestone

Explicitly deferred, each to its own spec:

| Milestone | Scope |
|---|---|
| 2 | Flipbook engine (CSS 3D page-turn) |
| 3 | PDF + print pipeline |
| 4 | 12 interactive calculators |
| 5 | Gamification (islands, badges, XP) — and only then, SaaS foundation |

The original brief described roughly eight independent subsystems. Built in one pass, the calculators and badges would be half-finished and the content thin. Content pipeline first: every other deliverable is downstream of it.

## 9. Testing and acceptance

- **Schema:** Zod validation over all 92 lessons passes in CI; build fails on violation.
- **Provenance:** every block resolves to `extracted` or `authored`; no quiz item references a figure absent from its lesson's extracted blocks.
- **Visual regression:** 320 / 768 / 1024 / 1440, both themes.
- **Accessibility:** automated axe pass, keyboard traversal of the full reader, reduced-motion verified.
- **Performance:** Lighthouse ≥ 95 on a representative lesson page; JS budget < 150 KB gzipped.
- **Verification is by observation.** Claims of completion require driving the running app, not a green typecheck.

## 10. Risks

| Risk | Mitigation |
|---|---|
| Extraction drifts from source figures | Schema locked on 3 exemplars first; provenance audit script; `asOf` stamping |
| 8 block types prove insufficient | Exemplars deliberately span the most structurally diverse infographics |
| Authored pedagogy introduces bad financial advice | Quiz generation restricted to extracted blocks; advisor disclaimer preserved per lesson |
| 92 vision passes are costly | Batched parallel extraction; schema locked before batch to avoid re-runs |
