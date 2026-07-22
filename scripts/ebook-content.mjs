/**
 * Shared e-book content: block → HTML renderers (mirroring components/blocks)
 * and a structured parts builder. Consumed by both the PDF generator
 * (build-ebook-pdf.mjs) and the flipbook generator (build-ebook-flipbook.mjs),
 * so the two stay in lockstep. The class names are theme-agnostic; each builder
 * supplies its own CSS (print vs. flipbook parchment).
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import * as art from './pdf-art.mjs'

const ROOT = process.cwd()

export const esc = (s) =>
  String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

/** Minimal, safe Markdown → HTML for the short framing prose. */
export function proseToHtml(md) {
  return md
    .trim()
    .split(/\n\s*\n/)
    .map((p) => {
      let t = esc(p.replace(/\n/g, ' ').trim())
      t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      t = t.replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
      return t ? `<p>${t}</p>` : ''
    })
    .join('')
}

export async function rawBody(chapter, slug) {
  try {
    const raw = await readFile(
      path.join(ROOT, 'content/chapters', chapter, `${slug}.mdx`),
      'utf8'
    )
    return raw.split('---').slice(2).join('---')
  } catch {
    return ''
  }
}

const blockTitle = (b) =>
  b.title
    ? `<h4 class="bt">${esc(b.title)}${b.asOf ? `<span class="asof">${b.asOf}</span>` : ''}</h4>`
    : ''

export function renderBlock(b) {
  switch (b.type) {
    case 'timeline':
      return `${blockTitle(b)}<div class="grid">${b.nodes
        .map(
          (n, i) =>
            `<div class="tile"><div class="tlabel">${i + 1}. ${esc(n.label)}</div>${n.value ? `<div class="tval">${esc(n.value)}</div>` : ''}${n.detail ? `<div class="tdet">${esc(n.detail)}</div>` : ''}</div>`
        )
        .join('')}</div>`
    case 'comparison':
      return `${blockTitle(b)}<div class="grid cols">${b.options
        .map(
          (o) =>
            `<div class="tile"><div class="tlabel">${esc(o.label)}</div>${o.subtitle ? `<div class="tsub">${esc(o.subtitle)}</div>` : ''}${(o.rows || []).map((r) => `<div class="row">${esc(r)}</div>`).join('')}${o.highlight ? `<div class="hi">${o.highlightLabel ? `<span>${esc(o.highlightLabel)}</span>` : ''}<strong>${esc(o.highlight)}</strong></div>` : ''}</div>`
        )
        .join('')}</div>`
    case 'buckets':
      return `${blockTitle(b)}<div class="${b.layout === 'chips' ? 'chips' : 'grid two'}">${b.items
        .map((i) =>
          b.layout === 'chips'
            ? `<span class="chip">${esc(i.label)}</span>`
            : `<div class="tile"><div class="tlabel">${esc(i.label)}</div>${i.description ? `<div class="tdet">${esc(i.description)}</div>` : ''}</div>`
        )
        .join('')}</div>`
    case 'flow':
      return `${blockTitle(b)}<ol class="flow">${b.steps
        .map((s) => `<li><strong>${esc(s.label)}</strong>${s.detail ? ` — ${esc(s.detail)}` : ''}</li>`)
        .join('')}</ol>`
    case 'table':
      return `${blockTitle(b)}<table><thead><tr>${b.headers
        .map((h) => `<th>${esc(h)}</th>`)
        .join('')}</tr></thead><tbody>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table>`
    case 'phases':
      return `${blockTitle(b)}<div class="grid four">${b.bands
        .map(
          (x) =>
            `<div class="tile"><div class="tlabel">${esc(x.label)}</div>${x.range ? `<div class="range">${esc(x.range)}</div>` : ''}${x.detail ? `<div class="tdet">${esc(x.detail)}</div>` : ''}</div>`
        )
        .join('')}</div>`
    case 'stat':
      return `${blockTitle(b)}<div class="stats">${b.stats
        .map(
          (s) =>
            `<div class="stat"><div class="fig">${esc(s.figure)}</div><div class="slabel">${esc(s.label)}</div>${s.footnote ? `<div class="fn">${esc(s.footnote)}</div>` : ''}</div>`
        )
        .join('')}</div>`
    case 'note':
      return `<div class="note ${b.variant}">${b.title ? `<strong>${esc(b.title)}</strong> ` : ''}${esc(b.body)}</div>`
    default:
      return ''
  }
}

const MOTIFS = [
  art.pirateShip, art.lighthouse, art.goldPile, art.crossedSwords, art.jollyRoger,
  art.cannon, art.rum, art.jewel, art.compassStar, art.treasureChest, art.pirateShip,
]

/**
 * Structured parts for the whole e-book. Each lesson's `html` is the block +
 * pedagogy markup WITHOUT a page wrapper, so a paginating flipbook can split it
 * and the PDF can wrap it in a print section.
 */
export async function ebookParts() {
  const chapters = JSON.parse(
    await readFile(path.join(ROOT, 'generated/json/chapters.json'), 'utf8')
  ).sort((a, b) => a.order - b.order)
  const lessons = JSON.parse(
    await readFile(path.join(ROOT, 'generated/json/lessons.json'), 'utf8')
  )
  const byChapter = (slug) =>
    lessons.filter((l) => l.chapter === slug).sort((a, b) => a.order - b.order)

  const out = { totalMaps: lessons.length, chapters: [] }

  for (const [ci, c] of chapters.entries()) {
    const chapterLessons = []
    for (const l of byChapter(c.slug)) {
      const prose = proseToHtml(await rawBody(l.chapter, l.slug))
      const blocks = (l.blocks || []).map(renderBlock).join('')
      const takeaways = (l.keyTakeaways || []).length
        ? `<h4 class="bt">Key takeaways</h4><ul class="bullets">${l.keyTakeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
        : ''
      const actions = (l.actionSteps || []).length
        ? `<h4 class="bt">Action steps</h4><ol class="bullets">${l.actionSteps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>`
        : ''
      chapterLessons.push({
        title: l.title,
        sourcePage: l.sourcePage,
        chapterTitle: c.title,
        headerHTML: `<div class="lhead"><span>${esc(c.title)}</span><span>Map ${l.sourcePage}</span></div><h3>${esc(l.title)}</h3><p class="summary">${esc(l.summary)}</p>`,
        bodyHTML: `<div class="prose">${prose}</div>${blocks}${takeaways}${actions}`,
      })
    }
    out.chapters.push({
      slug: c.slug,
      title: c.title,
      island: c.island || `Chapter ${c.order}`,
      intro: c.intro,
      motif: MOTIFS[ci % MOTIFS.length](),
      count: chapterLessons.length,
      lessons: chapterLessons,
    })
  }
  return out
}
