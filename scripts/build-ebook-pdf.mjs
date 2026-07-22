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
import { esc, proseToHtml, rawBody, renderBlock } from './ebook-content.mjs'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'generated/pdf')
// Print-only intermediate; the interactive flipbook owns ebook.html.
const HTML = path.join(OUT_DIR, 'ebook-print.html')
const PDF = path.join(OUT_DIR, 'The-Money-Map-Ebook.pdf')
const CHROME =
  process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// Block renderers, prose, and rawBody are shared with the flipbook via
// ebook-content.mjs — one source of truth for the block → HTML markup.

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
  ${art.goldDefs()}
  <section class="cover">
    <div class="rose">${art.compassStar()}</div>
    <div class="kicker">The Complete Atlas</div>
    <h1>The Money Map</h1>
    <div class="tag">Navigate Your Journey to Financial Freedom</div>
    ${art.frieze(0.9)}
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

  const motifs = [art.pirateShip, art.lighthouse, art.goldPile, art.crossedSwords, art.jollyRoger, art.cannon, art.rum, art.jewel, art.compassStar, art.treasureChest, art.pirateShip]

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
    body += art.frieze(0.85)
  }

  const css = `
    /* Chrome's --print-to-pdf CLI ignores @page margins; the .sheet spacer
       table creates cushion on every page instead (thead/tfoot = top/bottom,
       td padding = left/right). @page margin stays 0. */
    @page { size: Letter; margin: 0; }
    * { box-sizing: border-box; }
    body { font-family: Garamond,'EB Garamond','Adobe Garamond Pro',Georgia,serif; color:${art.ink}; background:${art.cream}; margin:0; font-size:11pt; line-height:1.5; }
    .sheet { width:100%; border-collapse:collapse; }
    .sheet > thead td, .sheet > tfoot td { height:15mm; }
    .sheet > tbody > tr > td { padding:0 20mm; }
    h1{ font-size:44pt; text-transform:uppercase; margin:6mm 0 3mm; line-height:1; }
    h2{ font-size:22pt; }
    h3{ font-size:17pt; margin:0 0 2mm; }
    .kicker{ letter-spacing:.26em; text-transform:uppercase; color:${art.gold}; font-size:10pt; }
    .cover{ text-align:center; padding:46mm 10mm; page-break-after:always;
      background:radial-gradient(ellipse 80% 60% at 50% 32%, #1a1b13 0%, ${art.darkbg} 72%);
      color:${art.cream}; border-radius:14px; min-height:234mm; }
    .cover .rose{ width:150px; margin:0 auto 12mm; }
    .cover h1{ color:#f6edd6; }
    .cover .tag{ font-style:italic; font-size:15pt; color:#cbb98a; }
    .cover .sub{ margin-top:6mm; letter-spacing:.1em; color:#a99b78; }
    .toc{ page-break-after:always; }
    .toc h2{ border-bottom:2px solid ${art.gold}; padding-bottom:2mm; }
    .toc ol{ list-style:none; padding:0; }
    .toc li{ padding:2.4mm 0; border-bottom:1px solid #e3dcc7; }
    .toc .isle{ color:${art.gold}; text-transform:uppercase; font-size:8.5pt; letter-spacing:.14em; margin-right:3mm; }
    .toc .n{ float:right; color:#8a8471; font-size:9pt; }
    .chapter-open{ page-break-before:always; text-align:center; padding:40mm 12mm;
      background:radial-gradient(ellipse 80% 60% at 50% 30%, #1a1b13 0%, ${art.darkbg} 74%);
      color:${art.cream}; border-radius:14px; min-height:210mm; margin:4mm 0; }
    .chapter-open .kicker{ color:${art.gold}; }
    .cmotif{ width:130px; margin:0 auto 10mm; }
    .ctitle{ margin:3mm 0; color:#f6edd6; }
    .cintro{ max-width:150mm; margin:6mm auto 0; font-size:12.5pt; color:#c3b790; }
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
    .frieze{ display:flex; align-items:center; justify-content:center; gap:5mm; height:15mm; margin:7mm 0; max-width:100%; overflow:hidden; }
    .frieze svg{ height:100%; width:auto; }
  `

  // `goldDefs` is emitted at the very start of `body`; keep it outside the
  // spacer table (it is a 0-size <svg defs>), then wrap the flowing content so
  // every printed page gets margins.
  const defsEnd = body.indexOf('</svg>') + '</svg>'.length
  const defs = body.slice(0, defsEnd)
  const content = body.slice(defsEnd)
  const wrapped = `${defs}<table class="sheet"><thead><tr><td></td></tr></thead><tfoot><tr><td></td></tr></tfoot><tbody><tr><td>${content}</td></tr></tbody></table>`

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(HTML, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${wrapped}</body></html>`)

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
