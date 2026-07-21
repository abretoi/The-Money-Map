import type { Block, Lesson } from './content'

/**
 * Flatten a block to plain text for the search index.
 *
 * This is why blocks live in frontmatter rather than as MDX components in the
 * body: every figure, label, and cell is reachable as data, so the ~90,000
 * words locked inside the source JPEGs become fully searchable.
 */
export function flattenBlock(block: Block): string {
  const parts: string[] = [block.title ?? '']

  switch (block.type) {
    case 'timeline':
      parts.push(
        ...block.nodes.map((n) =>
          [n.label, n.value, n.detail].filter(Boolean).join(' ')
        )
      )
      break
    case 'comparison':
      parts.push(
        ...block.options.map((o) =>
          [o.label, o.subtitle, ...o.rows, o.highlightLabel, o.highlight]
            .filter(Boolean)
            .join(' ')
        )
      )
      break
    case 'buckets':
      parts.push(
        ...block.items.map((i) => [i.label, i.description].filter(Boolean).join(' '))
      )
      break
    case 'flow':
      parts.push(
        ...block.steps.map((s) => [s.label, s.detail].filter(Boolean).join(' '))
      )
      break
    case 'table':
      parts.push(block.headers.join(' '), ...block.rows.map((r) => r.join(' ')))
      break
    case 'phases':
      parts.push(
        ...block.bands.map((b) =>
          [b.label, b.range, b.detail].filter(Boolean).join(' ')
        )
      )
      break
    case 'stat':
      parts.push(
        ...block.stats.map((s) =>
          [s.figure, s.label, s.footnote].filter(Boolean).join(' ')
        )
      )
      break
    case 'note':
      parts.push(block.body)
      break
  }

  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}

export interface SearchDoc {
  id: string
  title: string
  chapter: string
  summary: string
  tags: string[]
  url: string
  /** Full flattened text of every block, for full-text matching. */
  text: string
}

export function toSearchDoc(lesson: Lesson): SearchDoc {
  return {
    id: `${lesson.chapter}/${lesson.slug}`,
    title: lesson.title,
    chapter: lesson.chapter,
    summary: lesson.summary,
    tags: lesson.tags,
    url: lesson.url,
    text: lesson.blocks.map(flattenBlock).join(' · '),
  }
}

import type { IFuseOptions } from 'fuse.js'

/** Fuse.js options. Threshold 0.34 gives typo tolerance without matching noise. */
export const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.34,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'tags', weight: 0.2 },
    { name: 'summary', weight: 0.2 },
    { name: 'text', weight: 0.2 },
  ],
}
