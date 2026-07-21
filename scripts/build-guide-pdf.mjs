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

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'generated/pdf')
const HTML = path.join(OUT_DIR, 'launch-guide.html')
const PDF = path.join(OUT_DIR, 'The-Money-Map-Launch-Guide.pdf')

const CHROME =
  process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const css = `
  @page { size: Letter; margin: 20mm 18mm; }
  * { box-sizing: border-box; }
  body {
    font-family: Garamond, 'EB Garamond', 'Adobe Garamond Pro', Georgia, serif;
    color: ${art.ink}; background: ${art.cream}; margin: 0;
    font-size: 12.5pt; line-height: 1.55;
  }
  .cover { text-align: center; padding: 50mm 14mm 30mm; page-break-after: always;
    background: radial-gradient(ellipse 80% 60% at 50% 30%, #1a1b13 0%, ${art.darkbg} 70%);
    color: ${art.cream}; margin: -20mm -18mm 0; min-height: 239mm; }
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
  .frieze { display: flex; align-items: center; justify-content: center; gap: 10mm; height: 22mm; margin: 8mm 0; }
  .frieze svg { height: 100%; width: auto; }
  .card { border: 1px solid #d9cfb4; border-radius: 8px; padding: 4mm 5mm; margin: 3mm 0; page-break-inside: avoid; }
  .card svg { height: 30px; vertical-align: middle; margin-right: 3mm; }
  .lead { font-size: 13.5pt; }
  .foot { text-align: center; color: #7a7461; font-size: 10pt; font-style: italic; margin-top: 10mm; }
`

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
${art.goldDefs()}
<section class="cover">
  <div class="rose">${art.compassStar()}</div>
  <div class="kicker">Launch Guide</div>
  <h1>The Money Map</h1>
  <div class="tag">Navigate Your Journey to Financial Freedom</div>
  ${art.frieze(0.9)}
  <p class="lead">A local-first atlas of personal finance — 92 maps, a doubloon economy,<br/>and a voyage certificate. This guide gets it running in minutes.</p>
</section>

<h2>What you are launching</h2>
<p class="lead">The Money Map is a Next.js application where <strong>Markdown is the source of truth</strong>. Ninety-two infographics have been extracted into structured, searchable content that renders as an interactive website — and powers a flipbook, PDF, and search index from one source.</p>
<div class="card">${art.treasureChest()} <strong>Gamified:</strong> reading a map earns doubloons; filling a chapter chest pays a bounty; charting all 92 mints your certificate.</div>
<div class="card">${art.compassStar()} <strong>Themed:</strong> a black / white / green design system with gold reserved for treasure, in Garamond throughout.</div>

<h2>Requirements</h2>
<ul>
  <li><strong>Node.js 20+</strong> — check with <code>node -v</code></li>
  <li><strong>npm</strong> (ships with Node)</li>
  <li>A modern browser (Chrome, Safari, Firefox, or Edge)</li>
</ul>

<h2>Launch in three commands</h2>
<pre>cd The-Money-Map
npm install
npm run dev</pre>
<p>Then open <code>http://localhost:3000</code>. That's the whole voyage — the content pipeline builds automatically as the dev server starts.</p>

<h2>Everyday commands</h2>
<pre>npm run dev        # develop (content watch + Next dev server)
npm run build      # production build (static, 108 pages)
npm run start      # serve the production build
npm run generate   # rebuild content JSON + search + treasure manifest
npm run audit:provenance   # verify figures + table integrity
npm run pdf        # regenerate this guide and the e-book</pre>

${art.frieze(0.85)}

<h2>Adding or editing a map</h2>
<p>Every lesson is one Markdown file at <code>content/chapters/&lt;chapter&gt;/&lt;lesson&gt;.mdx</code>. Frontmatter holds the typed content blocks; the body is short framing prose. After editing:</p>
<pre>npx velite --clean   # validate — the build fails closed on any error</pre>
<p>No code change is needed to add content unless you introduce a new block type.</p>

<h2>Deploying</h2>
<ol>
  <li>Run <code>npm run build</code> — output is fully static.</li>
  <li>Deploy the app to any Node host (Vercel, Netlify, a container), or export static HTML.</li>
  <li>Progress, bookmarks, and doubloons live in the browser (local-first) — no server or database required.</li>
</ol>

<h2>Where things live</h2>
<ul>
  <li><code>content/</code> — the source of truth (Markdown maps)</li>
  <li><code>components/</code> — blocks, reader, treasure, and pirate art</li>
  <li><code>scripts/</code> — search index, provenance audit, PDF generators</li>
  <li><code>memory/</code> — the project knowledge base (load these first)</li>
  <li><code>generated/</code> — disposable build output (never hand-edit)</li>
</ul>

<div class="frieze">${art.pirateShip()}${art.lighthouse()}${art.goldPile()}${art.compassStar()}</div>
<p class="foot">Educational content, not financial advice. Fair winds and following seas.</p>
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
