'use client'

import Link from 'next/link'
import { useTreasure } from '@/hooks/useTreasure'
import { rankFor, DOUBLOONS_PER_MAP, CHAPTER_CHEST_BOUNTY } from '@/lib/treasure'
import { Doubloon, TreasureChest, CompassRose } from '@/components/art/Icons'
import { Certificate } from './Certificate'

export function TreasureHall() {
  const t = useTreasure()

  if (!t.hydrated) {
    return (
      <div className="mx-auto max-w-[1000px] px-[var(--s-5)] py-[var(--s-10)] text-[var(--ink-3)]">
        Counting the hoard…
      </div>
    )
  }

  const rank = rankFor(t.percent)

  return (
    <div className="mx-auto max-w-[1000px] px-[var(--s-5)] py-[var(--s-8)]">
      {/* ---- Hoard header ---- */}
      <section className="relative overflow-hidden rounded-[var(--r-xl)] border border-[color-mix(in_oklab,var(--gold)_26%,var(--line-1))] bg-[var(--bg-2)] p-[var(--s-7)]">
        <CompassRose className="pointer-events-none absolute -right-10 -top-10 size-56 text-[var(--gold)] opacity-[0.06]" />

        <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
          Your rank · {rank}
        </p>

        <div className="mt-[var(--s-3)] flex flex-wrap items-end gap-x-[var(--s-5)] gap-y-[var(--s-3)]">
          <div className="flex items-center gap-[var(--s-3)]">
            <Doubloon className="size-11 text-[var(--gold)]" />
            <span className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4rem)] font-semibold leading-none text-[var(--ink-1)] tabular-nums">
              {t.doubloons.toLocaleString()}
            </span>
          </div>
          <span className="mb-[6px] text-[14px] text-[var(--ink-3)]">
            of {t.maxDoubloons.toLocaleString()} doubloons
          </span>
        </div>

        {/* progress rail */}
        <div className="mt-[var(--s-5)] h-[8px] overflow-hidden rounded-full bg-[var(--bg-3)]">
          <div
            className="h-full rounded-full transition-[width] duration-[var(--d-slow)] ease-[var(--ease)]"
            style={{
              width: `${t.percent}%`,
              background: t.certificateEarned ? 'var(--gold)' : 'var(--grad-green)',
            }}
          />
        </div>
        <div className="mt-[var(--s-3)] flex flex-wrap gap-x-[var(--s-5)] gap-y-[var(--s-1)] text-[13px] text-[var(--ink-2)]">
          <span>
            <strong className="text-[var(--ink-1)]">{t.mapsCollected}</strong> / {t.totalMaps} maps charted
          </span>
          <span>
            <strong className="text-[var(--ink-1)]">{t.chestsFilled}</strong> / {t.chests.length} chests filled
          </span>
        </div>

        <p className="mt-[var(--s-4)] mb-0 text-[12px] text-[var(--ink-3)]">
          Every map read earns {DOUBLOONS_PER_MAP} doubloons; filling a chapter’s
          chest pays a {CHAPTER_CHEST_BOUNTY}-doubloon bounty.
        </p>
      </section>

      {/* ---- Certificate ---- */}
      <Certificate earned={t.certificateEarned} rank={rank} doubloons={t.doubloons} />

      {/* ---- Chest grid ---- */}
      <section className="mt-[var(--s-8)]">
        <div className="mb-[var(--s-4)] flex items-baseline gap-[var(--s-4)]">
          <h2 className="m-0 font-serif text-[var(--text-h3)] text-[var(--ink-1)]">
            Chapter chests
          </h2>
          <span className="h-px flex-1 bg-[var(--line-1)]" aria-hidden />
        </div>

        <div className="grid gap-[var(--s-3)] sm:grid-cols-2 lg:grid-cols-3">
          {t.chests.map((c) => (
            <Link
              key={c.slug}
              href={`/chapters/${c.slug}`}
              className="card flex items-center gap-[var(--s-4)] p-[var(--s-5)] no-underline"
              data-earned={c.complete ? 'true' : undefined}
            >
              <TreasureChest
                open={c.complete}
                className="size-9 shrink-0"
                style={{ color: c.complete ? 'var(--gold)' : 'var(--ink-3)' }}
              />
              <div className="min-w-0 flex-1">
                <p
                  className="m-0 text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: c.complete ? 'var(--gold)' : 'var(--ink-3)' }}
                >
                  {c.island}
                </p>
                <p className="m-0 truncate text-[14px] text-[var(--ink-1)]">
                  {c.title}
                </p>
                <p className="m-0 mt-[2px] text-[12px] text-[var(--ink-2)] tabular-nums">
                  {c.collected}/{c.total} maps
                  {c.complete && ' · +25'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
