'use client'

import Link from 'next/link'
import { useTreasure } from '@/hooks/useTreasure'
import { rankFor } from '@/lib/treasure'

/**
 * The voyage rendered as an actual treasure map: a dashed sea route winding
 * past eleven island chapters to the buried treasure at the end. A ship sails
 * along the route at exactly your progress (maps charted / total), so every map
 * read moves you visibly closer to the X — discovery, and a rich life.
 *
 * Islands you've cleared glow gold; the route behind the ship is charted (solid
 * gold), the route ahead is faint. Deterministic geometry (a serpentine of the
 * linear progress fraction) so it renders identically on server and client.
 */

const W = 960
const H = 380
const MX = 70 // horizontal margin
const AMP = 66 // wave amplitude
const WAVES = 2.35

function pointAt(f: number): [number, number] {
  const x = MX + f * (W - 2 * MX)
  const y = H / 2 + AMP * Math.sin(f * WAVES * Math.PI * 2 - Math.PI / 2)
  return [x, y]
}

function routePath(from: number, to: number, samples = 90): string {
  const pts: string[] = []
  for (let i = 0; i <= samples; i++) {
    const f = from + ((to - from) * i) / samples
    const [x, y] = pointAt(f)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

export function TreasureMapProgress() {
  const t = useTreasure()
  if (!t.hydrated) return null

  // Cumulative end-fraction for each chapter island (arrive when chapter done).
  let acc = 0
  const islands = t.chests.map((c) => {
    acc += c.total
    return { ...c, f: t.totalMaps ? acc / t.totalMaps : 0 }
  })

  const shipF = t.totalMaps ? t.mapsCollected / t.totalMaps : 0
  const [shipX, shipY] = pointAt(shipF)
  const [startX, startY] = pointAt(0)
  const [treasureX, treasureY] = pointAt(1)
  const done = t.certificateEarned

  return (
    <section className="card relative overflow-hidden p-[var(--s-5)]" data-earned={done ? 'true' : undefined}>
      <div className="mb-[var(--s-3)] flex flex-wrap items-baseline justify-between gap-[var(--s-2)]">
        <h2 className="m-0 font-serif text-[var(--text-h3)] text-[var(--ink-1)]">
          The voyage to buried treasure
        </h2>
        <span className="font-serif text-[13px] text-[var(--gold)]">
          {rankFor(t.percent)} · {t.percent}% charted
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label={`Treasure map: ${t.mapsCollected} of ${t.totalMaps} maps charted, sailing toward the buried treasure.`}
        >
          {/* aged chart field */}
          <rect x="6" y="6" width={W - 12} height={H - 12} rx="14" fill="url(#mm-gold-radial)" opacity="0.5" />
          <rect
            x="6" y="6" width={W - 12} height={H - 12} rx="14"
            fill="none" stroke="url(#mm-gold-rim)" strokeWidth="2" strokeOpacity="0.5"
          />

          {/* decorative swell lines (sea texture) */}
          {[0.22, 0.5, 0.78].map((yy, i) => (
            <path
              key={i}
              d={`M40 ${H * yy} q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0`}
              fill="none" stroke="var(--gold)" strokeWidth="1" strokeOpacity="0.12"
            />
          ))}

          {/* route ahead — faint dashed */}
          <path d={routePath(0, 1)} fill="none" stroke="var(--gold)" strokeOpacity="0.28" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
          {/* route charted — solid bright up to the ship */}
          {shipF > 0.001 && (
            <path d={routePath(0, shipF)} fill="none" stroke="url(#mm-gold-rim)" strokeWidth="3.5" strokeLinecap="round" filter="url(#mm-relief)" />
          )}

          {/* start harbour */}
          <g transform={`translate(${startX} ${startY})`}>
            <circle r="7" fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="1.5" />
            <text x="0" y="24" textAnchor="middle" className="fill-[var(--ink-2)]" style={{ font: '600 12px var(--font-garamond)' }}>
              Set sail
            </text>
          </g>

          {/* island chapters */}
          {islands.map((c, i) => {
            const [x, y] = pointAt(c.f)
            const reached = c.complete
            const above = i % 2 === 0
            return (
              <g key={c.slug} transform={`translate(${x} ${y})`}>
                {/* landmass */}
                <path
                  d="M-16 4 Q-18 -6 -8 -8 Q-2 -14 6 -9 Q17 -10 16 2 Q18 9 6 9 Q-4 13 -16 4 Z"
                  fill={reached ? 'url(#mm-gold)' : 'var(--bg-3)'}
                  stroke={reached ? '#2a1e06' : 'var(--line-2)'}
                  strokeWidth="1.4"
                  filter={reached ? 'url(#mm-relief)' : undefined}
                  opacity={reached ? 1 : 0.7}
                />
                {reached && <path d="M-3 -3 L-1 1 L-4 3 Z" fill="#2a1e06" />}
                {/* number */}
                <text x="0" y="1" textAnchor="middle" dominantBaseline="middle"
                  style={{ font: `700 10px var(--font-garamond)`, fill: reached ? '#2a1e06' : 'var(--ink-3)' }}>
                  {i + 1}
                </text>
                {/* label */}
                <text
                  x="0" y={above ? -22 : 30} textAnchor="middle"
                  style={{ font: '600 11px var(--font-garamond)', fill: reached ? 'var(--gold)' : 'var(--ink-3)' }}
                >
                  {c.island}
                </text>
                <text
                  x="0" y={above ? -10 : 42} textAnchor="middle"
                  style={{ font: '10px var(--font-garamond)', fill: 'var(--ink-3)' }}
                >
                  {c.collected}/{c.total}
                </text>
              </g>
            )
          })}

          {/* buried treasure at the end */}
          <g transform={`translate(${treasureX} ${treasureY})`}>
            <circle r="26" fill="url(#mm-gold-radial)" opacity={done ? 0.9 : 0.4} />
            {/* X marks the spot */}
            <path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#2a1e06" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
            {/* chest */}
            <g filter="url(#mm-relief)" transform="translate(-13 -6) scale(0.66)">
              {done && (
                <>
                  <circle cx="12" cy="8" r="3" fill="url(#mm-gold)" />
                  <circle cx="20" cy="6" r="3" fill="url(#mm-gold)" />
                  <circle cx="28" cy="8" r="3" fill="url(#mm-gold)" />
                </>
              )}
              <path d={done ? 'M2 14 Q2 2 20 2 Q38 2 38 14' : 'M2 14 Q2 6 20 6 Q38 6 38 14'} fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="1.6" />
              <rect x="2" y="14" width="36" height="16" rx="2" fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="1.6" />
              <line x1="2" y1="20" x2="38" y2="20" stroke="#2a1e06" strokeWidth="1.6" />
              <rect x="17" y="17" width="6" height="6" rx="1" fill="#2a1e06" />
            </g>
            <text x="0" y="42" textAnchor="middle"
              style={{ font: '600 12px var(--font-garamond)', fill: done ? 'var(--gold)' : 'var(--ink-2)' }}>
              {done ? 'A rich life — claimed' : 'A rich life'}
            </text>
          </g>

          {/* the ship, at your exact progress */}
          <g transform={`translate(${shipX} ${shipY})`}>
            <g filter="url(#mm-relief)" transform="translate(-15 -20) scale(0.5)">
              <path d="M40 10 V64 M72 4 V64" stroke="#2a1e06" strokeWidth="2" />
              <path d="M40 14 C22 18 20 34 26 48 L40 44 Z" fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="1.4" />
              <path d="M72 8 C52 13 50 32 56 50 L72 46 Z" fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="1.4" />
              <path d="M72 4 L86 7 L72 11 Z" fill="#2a1e06" />
              <path d="M14 64 L106 64 C100 84 84 92 60 92 C36 92 20 84 14 64 Z" fill="url(#mm-gold)" stroke="#2a1e06" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>

      <p className="m-0 mt-[var(--s-3)] text-center text-[12px] text-[var(--ink-3)]">
        {done ? (
          'X marks the spot — every map charted. The treasure is yours.'
        ) : (
          <>
            {t.totalMaps - t.mapsCollected} maps from the treasure ·{' '}
            <Link href="/" className="text-[var(--green-3)] no-underline">
              chart the next island
            </Link>
          </>
        )}
      </p>
    </section>
  )
}
