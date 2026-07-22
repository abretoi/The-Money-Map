#!/usr/bin/env node
/**
 * Build the e-book as a pirate flipbook (generated/pdf/ebook.html) — a
 * self-contained, page-turning reader of all 92 maps. Reuses the shared block
 * renderers (ebook-content.mjs) and the flipbook engine (flipbook.mjs).
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import * as art from './pdf-art.mjs'
import { ebookParts, esc } from './ebook-content.mjs'
import { flipbookHTML } from './flipbook.mjs'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'generated/pdf/ebook.html')

const parts = await ebookParts()

// Cover plate (its own leaf). Gold defs are injected separately (visible DOM).
const coverHTML = `<div class="cover">
  <div class="rose">${art.compassStar()}</div>
  <div class="kicker">The Complete Atlas</div>
  <h1>The Money Map</h1>
  <div class="tag">Navigate Your Journey to Financial Freedom</div>
  ${art.frieze(0.9)}
  <div class="sub">${parts.totalMaps} maps · ${parts.chapters.length} chapters</div>
</div>`

// Table-of-contents plate.
const tocHTML = `<div class="toc-page"><h2>The Chapters</h2><ol>${parts.chapters
  .map((c) => `<li><span class="isle">${esc(c.island)}</span> ${esc(c.title)} <span class="n">${c.count} maps</span></li>`)
  .join('')}</ol></div>`

// Chapter dividers (dark plates, carry TOC anchors) + flowing lesson content.
let flow = tocHTML
for (const c of parts.chapters) {
  flow += `<div class="chapter-open" data-chapter="${esc(c.slug)}" data-title="${esc(c.title)}" data-island="${esc(c.island)}">
    <div class="cmotif">${c.motif}</div>
    <div class="kicker">${esc(c.island)}</div>
    <h2 class="ctitle">${esc(c.title)}</h2>
    <p class="cintro">${esc(c.intro)}</p>
  </div>`
  for (const l of c.lessons) {
    // fb-soft forces a new leaf for each map; its blocks then flow and split.
    flow += `<div class="fb-soft"></div>${l.headerHTML}${l.bodyHTML}`
  }
}

const html = flipbookHTML({
  title: 'The Money Map — The Complete Atlas',
  favicon: '🧭',
  kicker: 'Flipbook',
  defsHTML: art.goldDefs(),
  coverHTML,
  flowHTML: flow,
})

await mkdir(path.dirname(OUT), { recursive: true })
await writeFile(OUT, html)
console.log(`[flipbook] ${path.relative(ROOT, OUT)} · ${parts.totalMaps} maps`)
