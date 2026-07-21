'use client'

import Link from 'next/link'
import { useTreasure } from '@/hooks/useTreasure'
import { rankFor } from '@/lib/treasure'
import { Doubloon, TreasureChest } from '@/components/art/Icons'

/**
 * Home-page hoard summary. The voyage bar fills green underway and turns gold
 * on completion; the doubloon count and rank make progress feel like treasure,
 * and the whole card links into the treasure hall.
 */
export function ProgressSummary() {
  const t = useTreasure()
  if (!t.hydrated) return null

  const complete = t.certificateEarned

  return (
    <Link
      href="/treasure"
      className="card mt-[var(--s-7)] block max-w-[460px] p-[var(--s-5)] no-underline"
      data-earned={complete ? 'true' : undefined}
    >
      <div className="flex items-center justify-between gap-[var(--s-3)]">
        <span className="inline-flex items-center gap-[var(--s-2)] text-[13px] text-[var(--ink-2)]">
          <TreasureChest
            open={t.chestsFilled > 0}
            className="size-5"
            style={{ color: t.chestsFilled > 0 ? 'var(--gold)' : 'var(--ink-3)' }}
          />
          Your voyage · <span className="text-[var(--gold)]">{rankFor(t.percent)}</span>
        </span>
        <span className="inline-flex items-center gap-[var(--s-1)] font-serif text-[15px] font-semibold text-[var(--gold)] tabular-nums">
          <Doubloon className="size-[18px]" />
          {t.doubloons.toLocaleString()}
        </span>
      </div>

      <div className="mt-[var(--s-3)] h-[6px] overflow-hidden rounded-full bg-[var(--bg-3)]">
        <div
          className="h-full rounded-full transition-[width] duration-[var(--d-slow)] ease-[var(--ease)]"
          style={{
            width: `${t.percent}%`,
            background: complete ? 'var(--gold)' : 'var(--grad-green)',
          }}
        />
      </div>

      <p className="m-0 mt-[var(--s-2)] text-[12px] text-[var(--ink-3)] tabular-nums">
        {t.mapsCollected} / {t.totalMaps} maps charted · {t.chestsFilled} / {t.chests.length} chests filled
      </p>
    </Link>
  )
}
