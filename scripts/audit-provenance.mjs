#!/usr/bin/env node
/**
 * Provenance audit — the pipeline's safety property for financial figures.
 *
 * The risk model is specific: a figure a reader will take as FACT must be
 * grounded in the source infographic. A figure the reader understands as a
 * candidate or an illustration is not the same hazard.
 *
 * HARD FAIL (exit non-zero) — asserts a fact:
 *   - a quiz's correct-answer option
 *   - any figure inside a quiz explanation
 *   - any figure inside an `authored` block
 * These may only contain figures present in the lesson's `extracted` blocks.
 *
 * SOFT REPORT (warn, exit zero) — for human review, not auto-blocked:
 *   - figures in keyTakeaways / actionSteps (often correct derived arithmetic,
 *     e.g. "$2,445 − $2,027 ≈ a $418/month gap")
 *   - quiz distractors (deliberately plausible wrong options)
 *   A regex cannot tell correct arithmetic from a fabricated number, so these
 *   are surfaced rather than silently passed or hard-failed.
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const LESSONS = path.join(process.cwd(), 'generated/json/lessons.json')

if (!existsSync(LESSONS)) {
  console.error('[provenance] lessons.json not found — run `velite` first.')
  process.exit(1)
}

const lessons = JSON.parse(await readFile(LESSONS, 'utf8'))

// Currency, percentages, and large grouped numbers. Anchored so a trailing
// comma or period in prose is not captured as part of the figure.
const FIGURE = /\$\d{1,3}(?:,\d{3})*(?:\.\d+)?|\b\d+(?:\.\d+)?%|\b\d{1,3}(?:,\d{3})+\b/g
const figs = (s) => new Set(String(s ?? '').match(FIGURE) ?? [])

function extractedFigures(lesson) {
  const ex = (lesson.blocks ?? []).filter((b) => b.source === 'extracted')
  return figs(JSON.stringify(ex))
}

let hardFail = 0
let softWarn = 0
let extractedBlocks = 0
let authoredBlocks = 0

for (const l of lessons) {
  const known = extractedFigures(l)
  const ungrounded = (text) => [...figs(text)].filter((f) => !known.has(f))

  // Structural integrity: a table row must match its header width. Velite's
  // schema does not enforce this, and an unquoted comma inside a cell silently
  // splits it — so guard it here (hard failure).
  for (const b of l.blocks ?? []) {
    if (b.type === 'table') {
      const w = b.headers.length
      b.rows.forEach((r, i) => {
        if (r.length !== w) {
          console.error(
            `[HARD] ${l.chapter}/${l.slug}: table "${b.title ?? ''}" row ${i} has ${r.length} cells, expected ${w}`
          )
          hardFail++
        }
      })
    }
  }

  for (const b of l.blocks ?? []) {
    if (b.source === 'extracted') {
      extractedBlocks++
    } else {
      authoredBlocks++
      for (const f of ungrounded(JSON.stringify(b))) {
        console.error(`[HARD] ${l.chapter}/${l.slug}: authored block cites "${f}"`)
        hardFail++
      }
    }
  }

  for (const q of l.quiz ?? []) {
    const correct = q.options?.[q.answer]
    for (const f of ungrounded(correct)) {
      console.error(
        `[HARD] ${l.chapter}/${l.slug}: quiz correct answer cites ungrounded "${f}"`
      )
      hardFail++
    }
    for (const f of ungrounded(q.explanation)) {
      console.error(
        `[HARD] ${l.chapter}/${l.slug}: quiz explanation cites ungrounded "${f}"`
      )
      hardFail++
    }
    // distractors — soft
    ;(q.options ?? []).forEach((opt, i) => {
      if (i === q.answer) return
      softWarn += ungrounded(opt).length
    })
  }

  for (const t of [...(l.keyTakeaways ?? []), ...(l.actionSteps ?? [])]) {
    softWarn += ungrounded(t).length
  }
}

const total = extractedBlocks + authoredBlocks
const pct = total ? Math.round((extractedBlocks / total) * 100) : 0

console.log(
  `\n[provenance] ${lessons.length} lessons · ${extractedBlocks} extracted / ${authoredBlocks} authored blocks (${pct}% extracted)`
)
console.log(
  `[provenance] ${softWarn} derived/distractor figure(s) flagged for review (not blocking)`
)

if (hardFail > 0) {
  console.error(`[provenance] FAILED — ${hardFail} fact-asserting figure(s) lack an extracted source.`)
  process.exit(1)
}
console.log('[provenance] PASS — every fact-asserting figure is grounded in the source.')
