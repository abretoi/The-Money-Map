import { defineConfig, defineCollection, s } from 'velite'

/* ------------------------------------------------------------------ *
 * Provenance
 *
 * Every block declares where its content came from.
 *   extracted — verbatim from the source infographic. Frozen facts.
 *   authored  — pedagogy written around those facts.
 *
 * Quiz and exercise generation reads ONLY extracted blocks, so authored
 * content can never introduce a financial figure absent from the source.
 * ------------------------------------------------------------------ */
const provenance = s.object({
  source: s.enum(['extracted', 'authored']),
  /** Year the figures are current as of. Lets stale numbers be flagged
   *  for review rather than silently aging. */
  asOf: s.number().optional(),
})

const base = { ...provenance.shape, title: s.string().optional() }

/* ------------------------------------------------------------------ *
 * The eight block types.
 *
 * Derived from structural analysis of all 92 infographics. Each block is
 * a Zod schema here, a React component in components/blocks, and a
 * flattener in lib/search. Adding a block means adding all three.
 * ------------------------------------------------------------------ */

const timeline = s.object({
  type: s.literal('timeline'),
  ...base,
  nodes: s
    .array(
      s.object({
        label: s.string(), // "Age 62"
        value: s.string().optional(), // "Earliest Social Security"
        detail: s.string().optional(), // "Reduced benefit available."
      })
    )
    .min(2),
})

const comparisonCards = s.object({
  type: s.literal('comparison'),
  ...base,
  options: s
    .array(
      s.object({
        label: s.string(),
        subtitle: s.string().optional(),
        rows: s.array(s.string()).default([]),
        highlight: s.string().optional(), // the headline figure
        highlightLabel: s.string().optional(),
      })
    )
    .min(2)
    .max(4),
})

const buckets = s.object({
  type: s.literal('buckets'),
  ...base,
  items: s
    .array(
      s.object({
        label: s.string(),
        // Optional: some maps use bare label chips with no body copy
        // ("Practical Money Map Takeaways" on page_010).
        description: s.string().optional(),
        icon: s.string().optional(),
      })
    )
    .min(2),
  /** `chips` renders compact label-only pills; `cards` renders full tiles. */
  layout: s.enum(['cards', 'chips']).default('cards'),
})

const orderedFlow = s.object({
  type: s.literal('flow'),
  ...base,
  steps: s
    .array(
      s.object({
        label: s.string(),
        detail: s.string().optional(),
      })
    )
    .min(2),
})

const dataTable = s.object({
  type: s.literal('table'),
  ...base,
  headers: s.array(s.string()).min(2),
  rows: s.array(s.array(s.string())).min(1),
})

const phaseBands = s.object({
  type: s.literal('phases'),
  ...base,
  bands: s
    .array(
      s.object({
        label: s.string(),
        range: s.string().optional(), // "~60-64"
        detail: s.string().optional(),
      })
    )
    .min(2),
})

/** A strip of headline figures. Many maps open with a 4-6 figure banner
 *  (page_049: median home price, mortgage rate, income baseline, 28% rule).
 *  Figures are strings, never numbers — "$412,400" and "6.23%" must survive
 *  the pipeline without being re-formatted or rounded. */
const statCallout = s.object({
  type: s.literal('stat'),
  ...base,
  stats: s
    .array(
      s.object({
        figure: s.string(),
        label: s.string(),
        footnote: s.string().optional(),
      })
    )
    .min(1),
})

const note = s.object({
  type: s.literal('note'),
  ...base,
  // `insight` carries the closing "core lesson" many maps end on.
  variant: s.enum(['info', 'warning', 'disclaimer', 'insight']).default('info'),
  body: s.string(),
})

const block = s.union([
  timeline,
  comparisonCards,
  buckets,
  orderedFlow,
  dataTable,
  phaseBands,
  statCallout,
  note,
])

/* ------------------------------------------------------------------ *
 * Collections
 * ------------------------------------------------------------------ */

const chapters = defineCollection({
  name: 'Chapter',
  // NOTE: not `_chapter.mdx` — Velite treats underscore-prefixed files as
  // partials and silently excludes them from the collection.
  pattern: 'chapters/*/chapter.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.slug('chapters'),
      order: s.number(),
      intro: s.string(),
      summary: s.string().optional(),
      /** Treasure-map island label used by the gamification layer (M5). */
      island: s.string().optional(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/chapters/${data.slug}` })),
})

const lessons = defineCollection({
  name: 'Lesson',
  pattern: 'chapters/*/!(chapter).mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      chapter: s.string(),
      order: s.number(),
      summary: s.string(),
      tags: s.array(s.string()).default([]),

      // Provenance of the source infographic
      sourceImage: s.string(),
      sourcePage: s.number(),

      readingMinutes: s.number().default(5),

      /** Structured content, extracted from the infographic.
       *  Blocks live in frontmatter (not as MDX components in the body) so
       *  that Zod validates them at build time and the PDF, flipbook, and
       *  search generators can consume typed JSON without parsing MDX. */
      blocks: s.array(block).default([]),

      /** Authored pedagogy. Never contains figures absent from `blocks`. */
      keyTakeaways: s.array(s.string()).default([]),
      actionSteps: s.array(s.string()).default([]),
      quiz: s
        .array(
          s.object({
            question: s.string(),
            options: s.array(s.string()).min(2),
            answer: s.number(),
            explanation: s.string().optional(),
          })
        )
        .default([]),

      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/chapters/${data.chapter}/${data.slug}`,
      originalMap: `/infographics/${data.sourceImage}`,
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: 'generated/json',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
  collections: { chapters, lessons },
})
