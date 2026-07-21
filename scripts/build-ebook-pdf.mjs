#!/usr/bin/env node
/**
 * Build the full e-book: all 92 maps rendered from the generated JSON (blocks)
 * plus the raw MDX prose, into a print-styled, self-contained HTML file, then
 * to PDF via headless Chrome. Pirate imagery throughout.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import * as art from './pdf-art.mjs'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'generated/pdf')
const HTML = path.join(OUT_DIR, 'ebook.html')
const PDF = path.join(OUT_DIR, 'The-Money-Map-Ebook.pdf')
const CHROME =
  process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const esc = (s) =>
  String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

/** Minimal, safe Markdown → HTML for the short framing prose. */
function proseToHtml(md) {
  const paras = md.trim().split(/\n\s*\n/)
  return paras
    .map((p) => {
      let t = esc(p.replace(/\n/g, ' ').trim())
      t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      t = t.replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, '$1<em>$2</em>')
      return t ? `<p>${t}</p>` : ''
    })
    .join('')
}

/** Extract the Markdown body (after frontmatter) from a raw .mdx file. */
async function rawBody(chapter, slug) {
  const f = path.join(ROOT, 'content/chapters', chapter, `${slug}.mdx`)
  try {
    const raw = await readFile(f, 'utf8')
    const parts = raw.split('---')
    return parts.slice(2).join('---')
  } catch {
    return ''
  }
}

/* ---- Block → HTML (mirrors components/blocks, print-styled) ---- */
const blockTitle = (b) =>
  b.title ? `<h4 class="bt">${esc(b.title)}${b.asOf ? `<span class="asof">${b.asOf}</span>` : ''}</h4>` : ''

function renderBlock(b) {
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
        .map(
          (s) =>
            `<li><strong>${esc(s.label)}</strong>${s.detail ? ` — ${esc(s.detail)}` : ''}</li>`
        )
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

async function main() {
  const chapters = JSON.parse(
    await readFile(path.join(ROOT, 'generated/json/chapters.json'), 'utf8')
  ).sort((a, b) => a.order - b.order)
  const lessons = JSON.parse(
    await readFile(path.join(ROOT, 'generated/json/lessons.json'), 'utf8')
  )

  const byChapter = (slug) =>
    lessons.filter((l) => l.chapter === slug).sort((a, b) => a.order - b.order)

  // Cover + TOC
  let body = `
  <section class="cover">
    <div class="rose">${art.compassRose()}</div>
    <div class="kicker">The Complete Atlas</div>
    <h1>The Money Map</h1>
    <div class="tag">Navigate Your Journey to Financial Freedom</div>
    ${art.frieze(art.gold, 0.6)}
    <div class="sub">${lessons.length} maps · ${chapters.length} chapters</div>
  </section>
  <section class="toc">
    <h2>The Chapters</h2>
    <ol>${chapters
      .map(
        (c) =>
          `<li><span class="isle">${esc(c.island || '')}</span> ${esc(c.title)} <span class="n">${byChapter(c.slug).length} maps</span></li>`
      )
      .join('')}</ol>
  </section>`

  const motifs = [art.pirateShip, art.lighthouse, art.goldPile, art.crossedSwords, art.jollyRoger, art.cannon, art.rum, art.jewel, art.compassRose, art.treasureChest, art.pirateShip]

  for (const [ci, c] of chapters.entries()) {
    const motif = motifs[ci % motifs.length]()
    body += `
    <section class="chapter-open">
      <div class="cmotif">${motif}</div>
      <div class="kicker">${esc(c.island || `Chapter ${c.order}`)}</div>
      <h2 class="ctitle">${esc(c.title)}</h2>
      <p class="cintro">${esc(c.intro)}</p>
    </section>`

    for (const l of byChapter(c.slug)) {
      const prose = proseToHtml(await rawBody(l.chapter, l.slug))
      const blocks = (l.blocks || []).map(renderBlock).join('')
      const takeaways = (l.keyTakeaways || []).length
        ? `<h4 class="bt">Key takeaways</h4><ul class="bullets">${l.keyTakeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
        : ''
      const actions = (l.actionSteps || []).length
        ? `<h4 class="bt">Action steps</h4><ol class="bullets">${l.actionSteps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>`
        : ''
      body += `
      <section class="lesson">
        <div class="lhead"><span>${esc(c.title)}</span><span>Map ${l.sourcePage}</span></div>
        <h3>${esc(l.title)}</h3>
        <p class="summary">${esc(l.summary)}</p>
        <div class="prose">${prose}</div>
        ${blocks}
        ${takeaways}
        ${actions}
      </section>`
    }
    body += art.frieze(art.gold, 0.4)
  }

  const css = `
    @page { size: Letter; margin: 16mm 15mm; }
    * { box-sizing: border-box; }
    body { font-family: Garamond,'EB Garamond','Adobe Garamond Pro',Georgia,serif; color:${art.ink}; background:${art.cream}; margin:0; font-size:11pt; line-height:1.5; }
    h1{ font-size:44pt; text-transform:uppercase; margin:6mm 0 3mm; line-height:1; }
    h2{ font-size:22pt; }
    h3{ font-size:17pt; margin:0 0 2mm; }
    .kicker{ letter-spacing:.26em; text-transform:uppercase; color:${art.gold}; font-size:10pt; }
    .cover{ text-align:center; padding:45mm 0 0; page-break-after:always; }
    .cover .rose{ width:140px; margin:0 auto 12mm; }
    .cover .tag{ font-style:italic; font-size:15pt; color:#4a4a3f; }
    .cover .sub{ margin-top:6mm; letter-spacing:.1em; color:#7a7461; }
    .toc{ page-break-after:always; }
    .toc h2{ border-bottom:2px solid ${art.gold}; padding-bottom:2mm; }
    .toc ol{ list-style:none; padding:0; }
    .toc li{ padding:2.4mm 0; border-bottom:1px solid #e3dcc7; }
    .toc .isle{ color:${art.gold}; text-transform:uppercase; font-size:8.5pt; letter-spacing:.14em; margin-right:3mm; }
    .toc .n{ float:right; color:#8a8471; font-size:9pt; }
    .chapter-open{ page-break-before:always; text-align:center; padding:30mm 0 8mm; }
    .cmotif{ width:120px; margin:0 auto 8mm; opacity:.85; }
    .ctitle{ margin:3mm 0; }
    .cintro{ max-width:150mm; margin:4mm auto 0; font-size:12pt; color:#3a382d; }
    .lesson{ page-break-inside:auto; margin:0 0 8mm; padding-top:6mm; border-top:1px solid #e3dcc7; }
    .lhead{ display:flex; justify-content:space-between; font-size:8.5pt; text-transform:uppercase; letter-spacing:.12em; color:#9a917a; margin-bottom:2mm; }
    .summary{ font-size:12.5pt; font-style:italic; color:#3a382d; margin:0 0 3mm; }
    .prose p{ margin:0 0 2.4mm; }
    .bt{ font-size:12pt; margin:5mm 0 2mm; color:#2a281d; }
    .asof{ float:right; font-size:8.5pt; color:#9a917a; border:1px solid #d9cfb4; border-radius:10px; padding:0 6px; }
    .grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; }
    .grid.two{ grid-template-columns:repeat(2,1fr); }
    .grid.four{ grid-template-columns:repeat(4,1fr); }
    .grid.cols{ grid-template-columns:repeat(3,1fr); }
    .tile{ border:1px solid #d9cfb4; border-radius:6px; padding:2.6mm 3mm; page-break-inside:avoid; background:#fffdf6; }
    .tlabel{ font-weight:600; font-size:10.5pt; }
    .tval{ font-size:10pt; margin-top:1mm; }
    .tsub,.tdet,.row{ font-size:9pt; color:#4a4738; margin-top:1mm; }
    .range{ color:${art.gold}; font-size:9.5pt; }
    .hi{ margin-top:2mm; border-top:1px dotted #d9cfb4; padding-top:1.5mm; }
    .hi span{ display:block; font-size:7.5pt; text-transform:uppercase; letter-spacing:.1em; color:#9a917a; }
    .hi strong{ font-size:13pt; color:#0a5c3e; }
    .chips{ display:flex; flex-wrap:wrap; gap:2mm; }
    .chip{ border:1px solid #d9cfb4; border-radius:20px; padding:1mm 3mm; font-size:9pt; background:#fffdf6; }
    .flow{ padding-left:5mm; } .flow li{ margin:1.4mm 0; font-size:10pt; }
    .bullets{ padding-left:5mm; } .bullets li{ margin:1.2mm 0; font-size:10pt; }
    table{ width:100%; border-collapse:collapse; font-size:9pt; page-break-inside:avoid; margin-top:1mm; }
    th{ text-align:left; border-bottom:1.5px solid ${art.gold}; padding:1.6mm 2mm; text-transform:uppercase; font-size:8pt; letter-spacing:.08em; color:#8a6b1f; }
    td{ border-bottom:1px solid #e3dcc7; padding:1.6mm 2mm; vertical-align:top; }
    .stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(38mm,1fr)); gap:2mm; }
    .stat{ border:1px solid #d9cfb4; border-radius:6px; padding:2.4mm; text-align:center; background:#fffdf6; page-break-inside:avoid; }
    .fig{ font-size:16pt; color:#0a5c3e; font-weight:600; }
    .slabel{ font-size:8.5pt; color:#4a4738; margin-top:1mm; }
    .fn{ font-size:7.5pt; color:#9a917a; }
    .note{ border:1px solid #d9cfb4; border-left:3px solid ${art.gold}; border-radius:4px; padding:2.4mm 3mm; margin:3mm 0; font-size:10pt; background:#fbf6e8; page-break-inside:avoid; }
    .note.disclaimer{ border-left-color:#9a917a; color:#5a5445; font-size:9pt; }
    .note.warning{ border-left-color:#c07000; }
    .note.insight{ border-left-color:${art.gold}; font-style:italic; }
    .frieze{ display:flex; align-items:center; justify-content:center; gap:8mm; height:18mm; margin:6mm 0; }
    .frieze svg{ height:100%; width:auto; }
  `

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(HTML, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`)

  if (!existsSync(CHROME)) {
    console.error(`[ebook] Chrome not found at ${CHROME}. Set CHROME_BIN. HTML written to ${HTML}.`)
    return
  }
  execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${PDF}`, `file://${HTML}`],
    { stdio: 'ignore' }
  )
  console.log(`[ebook] ${path.relative(ROOT, PDF)} · ${lessons.length} maps`)
}

main()
