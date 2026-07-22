/**
 * Shared launch-guide content — sections as flowable HTML, consumed by both the
 * PDF generator (build-guide-pdf.mjs) and the flipbook (build-guide-flipbook.mjs).
 * Each section is preceded by an `fb-soft` marker so the flipbook starts it on a
 * fresh leaf; the marker is inert in print.
 */
import * as art from './pdf-art.mjs'

export const coverInner = `
  <div class="rose">${art.compassStar()}</div>
  <div class="kicker">Launch Guide</div>
  <h1>The Money Map</h1>
  <div class="tag">Navigate Your Journey to Financial Freedom</div>
  ${art.frieze(0.9)}
  <p class="lead cover-lead">A local-first atlas of personal finance — 92 maps, a doubloon economy, and a voyage certificate. This guide gets it running in minutes.</p>`

/** The body sections (everything after the cover). */
export const sections = `
<div class="fb-soft"></div>
<h2>What you are launching</h2>
<p class="lead">The Money Map is a Next.js application where <strong>Markdown is the source of truth</strong>. Ninety-two infographics have been extracted into structured, searchable content that renders as an interactive website — and powers a flipbook, PDF, and search index from one source.</p>
<div class="card">${art.treasureChest()} <strong>Gamified:</strong> reading a map earns doubloons; filling a chapter chest pays a bounty; charting all 92 mints your certificate.</div>
<div class="card">${art.compassStar()} <strong>Themed:</strong> a black / white / green design system with gold reserved for treasure, in Garamond throughout.</div>

<div class="fb-soft"></div>
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

<div class="fb-soft"></div>
<h2>Everyday commands</h2>
<pre>npm run dev        # develop (content watch + Next dev server)
npm run build      # production build (static, 108 pages)
npm run start      # serve the production build
npm run generate   # rebuild content JSON + search + treasure manifest
npm run audit:provenance   # verify figures + table integrity
npm run pdf        # regenerate the guide + e-book PDFs
npm run flipbook   # regenerate the guide + e-book flipbooks</pre>

<div class="fb-soft"></div>
<h2>Adding or editing a map</h2>
<p>Every lesson is one Markdown file at <code>content/chapters/&lt;chapter&gt;/&lt;lesson&gt;.mdx</code>. Frontmatter holds the typed content blocks; the body is short framing prose. After editing:</p>
<pre>npx velite --clean   # validate — the build fails closed on any error</pre>
<p>No code change is needed to add content unless you introduce a new block type.</p>

<div class="fb-soft"></div>
<h2>Deploying</h2>
<ol>
  <li>Run <code>npm run build</code> — output is fully static.</li>
  <li>Deploy the app to any Node host (Vercel, Netlify, a container), or export static HTML.</li>
  <li>Progress, bookmarks, and doubloons live in the browser (local-first) — no server or database required.</li>
</ol>

<div class="fb-soft"></div>
<h2>Where things live</h2>
<ul>
  <li><code>content/</code> — the source of truth (Markdown maps)</li>
  <li><code>components/</code> — blocks, reader, treasure, and pirate art</li>
  <li><code>scripts/</code> — search index, provenance audit, PDF + flipbook generators</li>
  <li><code>memory/</code> — the project knowledge base (load these first)</li>
  <li><code>generated/</code> — disposable build output (never hand-edit)</li>
</ul>
<div class="frieze">${art.pirateShip()}${art.lighthouse()}${art.goldPile()}${art.compassStar()}</div>
<p class="foot">Educational content, not financial advice. Fair winds and following seas.</p>`
