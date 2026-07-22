#!/usr/bin/env node
/**
 * Build the launch / setup guide as a self-contained HTML file, then render it
 * to PDF with headless Chrome. No new npm dependency — uses the system Chrome.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import * as art from './pdf-art.mjs'
import { coverInner, sections } from './guide-content.mjs'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'generated/pdf')
// Print-only intermediate; the interactive flipbook owns launch-guide.html.
const HTML = path.join(OUT_DIR, 'launch-guide-print.html')
const PDF = path.join(OUT_DIR, 'The-Money-Map-Launch-Guide.pdf')

const CHROME =
  process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const css = `
  /* Chrome's --print-to-pdf CLI ignores @page margins, so cushion is created
     by the .sheet spacer table below (thead/tfoot repeat top/bottom margin on
     every page; td padding gives left/right). @page margin stays 0. */
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; }
  body {
    font-family: Garamond, 'EB Garamond', 'Adobe Garamond Pro', Georgia, serif;
    color: ${art.ink}; background: ${art.cream}; margin: 0;
    font-size: 12pt; line-height: 1.55;
  }
  .sheet { width: 100%; border-collapse: collapse; }
  .sheet > thead td, .sheet > tfoot td { height: 16mm; }        /* top/bottom margin, every page */
  .sheet > tbody > tr > td { padding: 0 20mm; }                  /* left/right margin, every page */
  /* Cover: a dark matted plate within the page margin (print-safe — home
     printers cannot bleed to the edge anyway). */
  .cover { text-align: center; padding: 42mm 10mm; page-break-after: always;
    background: radial-gradient(ellipse 80% 60% at 50% 30%, #1a1b13 0%, ${art.darkbg} 70%);
    color: ${art.cream}; border-radius: 14px; min-height: 232mm; }
  .cover .rose { width: 160px; margin: 0 auto 14mm; }
  .kicker { letter-spacing: .28em; text-transform: uppercase; color: ${art.gold}; font-size: 11pt; }
  .cover h1 { color: #f6edd6; }
  h1 { font-size: 42pt; margin: 6mm 0 4mm; line-height: 1; text-transform: uppercase; letter-spacing: -.01em; }
  .cover .tag { font-style: italic; font-size: 15pt; color: #cbb98a; }
  .cover .lead { color: #b9ad8e; }
  h2 { font-size: 20pt; margin: 10mm 0 3mm; border-bottom: 2px solid ${art.gold}; padding-bottom: 2mm; }
  h3 { font-size: 14pt; margin: 6mm 0 2mm; color: #2a2a20; }
  code, pre { font-family: 'SF Mono', ui-monospace, monospace; font-size: 10.5pt; }
  pre { background: #efe9d9; border: 1px solid #d9cfb4; border-radius: 6px; padding: 4mm 5mm; overflow-x: auto; page-break-inside: avoid; }
  code { background: #efe9d9; padding: 1px 4px; border-radius: 3px; }
  ul, ol { padding-left: 6mm; }
  li { margin: 1.5mm 0; }
  .frieze { display: flex; align-items: center; justify-content: center; gap: 7mm; height: 17mm; margin: 9mm 0; max-width: 100%; }
  .frieze svg { height: 100%; width: auto; }
  .card { border: 1px solid #d9cfb4; border-radius: 8px; padding: 4mm 6mm; margin: 3mm 0; page-break-inside: avoid; }
  .card svg { height: 26px; vertical-align: middle; margin-right: 4mm; }
  .lead { font-size: 13.5pt; }
  .foot { text-align: center; color: #7a7461; font-size: 10pt; font-style: italic; margin-top: 10mm; }
`

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
${art.goldDefs()}
<table class="sheet"><thead><tr><td></td></tr></thead><tfoot><tr><td></td></tr></tfoot><tbody><tr><td>
<section class="cover">${coverInner}</section>
${sections}
</td></tr></tbody></table>
</body></html>`

await mkdir(OUT_DIR, { recursive: true })
await writeFile(HTML, html)

if (!existsSync(CHROME)) {
  console.error(`[guide] Chrome not found at ${CHROME}. Set CHROME_BIN. HTML written to ${HTML}.`)
  process.exit(0)
}

execFileSync(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${PDF}`,
    `file://${HTML}`,
  ],
  { stdio: 'ignore' }
)
console.log(`[guide] ${path.relative(ROOT, PDF)}`)
