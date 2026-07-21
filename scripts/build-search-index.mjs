#!/usr/bin/env node
/**
 * Build the Fuse.js search index from Velite output.
 *
 * Run after `velite`. Flattens every block in every lesson to plain text so
 * the content that used to be locked inside the source JPEGs is searchable.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const LESSONS = path.join(ROOT, 'generated/json/lessons.json')
const CHAPTERS = path.join(ROOT, 'generated/json/chapters.json')
const OUT_PUBLIC = path.join(ROOT, 'public/search-index.json')
const OUT_GEN = path.join(ROOT, 'generated/search/index.json')
const OUT_TREASURE = path.join(ROOT, 'public/treasure-map.json')

function flattenBlock(b) {
  const parts = [b.title ?? '']
  switch (b.type) {
    case 'timeline':
      parts.push(...b.nodes.map((n) => [n.label, n.value, n.detail].filter(Boolean).join(' ')))
      break
    case 'comparison':
      parts.push(
        ...b.options.map((o) =>
          [o.label, o.subtitle, ...(o.rows ?? []), o.highlightLabel, o.highlight]
            .filter(Boolean)
            .join(' ')
        )
      )
      break
    case 'buckets':
      parts.push(...b.items.map((i) => [i.label, i.description].filter(Boolean).join(' ')))
      break
    case 'flow':
      parts.push(...b.steps.map((s) => [s.label, s.detail].filter(Boolean).join(' ')))
      break
    case 'table':
      parts.push(b.headers.join(' '), ...b.rows.map((r) => r.join(' ')))
      break
    case 'phases':
      parts.push(...b.bands.map((x) => [x.label, x.range, x.detail].filter(Boolean).join(' ')))
      break
    case 'stat':
      parts.push(...b.stats.map((s) => [s.figure, s.label, s.footnote].filter(Boolean).join(' ')))
      break
    case 'note':
      parts.push(b.body)
      break
  }
  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}

if (!existsSync(LESSONS)) {
  console.error('[search] generated/json/lessons.json not found — run `velite` first.')
  process.exit(1)
}

const lessons = JSON.parse(await readFile(LESSONS, 'utf8'))

const docs = lessons.map((l) => ({
  id: `${l.chapter}/${l.slug}`,
  title: l.title,
  chapter: l.chapter,
  summary: l.summary,
  tags: l.tags ?? [],
  url: l.url,
  text: (l.blocks ?? []).map(flattenBlock).join(' · '),
}))

await mkdir(path.dirname(OUT_PUBLIC), { recursive: true })
await mkdir(path.dirname(OUT_GEN), { recursive: true })

const json = JSON.stringify(docs)
await writeFile(OUT_PUBLIC, json)
await writeFile(OUT_GEN, json)

const words = docs.reduce((n, d) => n + d.text.split(/\s+/).filter(Boolean).length, 0)
const kb = Math.round(Buffer.byteLength(json) / 1024)

console.log(`[search] ${docs.length} lessons indexed · ~${words.toLocaleString()} words · ${kb} KB`)

/* ---- Treasure manifest: chapter → lesson URLs, for the doubloon economy ---- */
const chapters = existsSync(CHAPTERS)
  ? JSON.parse(await readFile(CHAPTERS, 'utf8'))
  : []

const treasure = {
  totalMaps: lessons.length,
  chapters: chapters
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      island: c.island ?? '',
      lessonUrls: lessons
        .filter((l) => l.chapter === c.slug)
        .sort((a, b) => a.order - b.order)
        .map((l) => l.url),
    })),
}

await writeFile(OUT_TREASURE, JSON.stringify(treasure))

const doubloons = treasure.totalMaps * 10 + treasure.chapters.length * 25
console.log(
  `[treasure] ${treasure.totalMaps} maps · ${treasure.chapters.length} chests · ${doubloons} doubloons at 100%`
)
