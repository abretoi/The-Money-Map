#!/usr/bin/env node
/**
 * Build the launch guide as a pirate flipbook (generated/pdf/launch-guide.html).
 */
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import * as art from './pdf-art.mjs'
import { flipbookHTML } from './flipbook.mjs'
import { coverInner, sections } from './guide-content.mjs'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'generated/pdf/launch-guide.html')

// Guide-specific typography for the parchment pages.
const extraCSS = `
  .leaf-inner h2 { font-size:1.5rem; margin:0 0 .5rem; border-bottom:2px solid var(--gold); padding-bottom:.3rem; }
  .leaf-inner .lead { font-size:1.02rem; line-height:1.55; }
  .leaf-inner p { line-height:1.55; margin:0 0 .7rem; }
  .leaf-inner ul, .leaf-inner ol { padding-left:1.2rem; margin:.3rem 0 .7rem; }
  .leaf-inner li { margin:.3rem 0; }
  .leaf-inner code { font-family:'SF Mono',ui-monospace,monospace; font-size:.82em; background:#eadfbf; padding:1px 5px; border-radius:4px; }
  .leaf-inner pre { font-family:'SF Mono',ui-monospace,monospace; font-size:.8rem; background:#efe6cd; border:1px solid #d9cfb4; border-radius:8px; padding:.7rem .9rem; overflow-x:auto; line-height:1.5; }
  .leaf-inner .card { border:1px solid #cdb87f; border-radius:8px; padding:.6rem .8rem; margin:.5rem 0; background:#fbf4de; }
  .leaf-inner .card svg { height:26px; vertical-align:middle; margin-right:.5rem; }
  .leaf-inner .foot { text-align:center; color:#8a7a4c; font-style:italic; font-size:.85rem; margin-top:1rem; }
  .cover .cover-lead { color:#b9ad8e; max-width:38ch; margin:1rem auto 0; font-size:.95rem; line-height:1.5; }
`

const html = flipbookHTML({
  title: 'The Money Map — Launch Guide',
  favicon: '🧭',
  kicker: 'Guide',
  defsHTML: art.goldDefs(),
  coverHTML: `<div class="cover">${coverInner}</div>`,
  flowHTML: sections,
  extraCSS,
})

await mkdir(path.dirname(OUT), { recursive: true })
await writeFile(OUT, html)
console.log(`[flipbook] ${path.relative(ROOT, OUT)}`)
