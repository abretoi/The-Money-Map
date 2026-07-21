'use client'

import { TreasureChest } from '@/components/art/Icons'
import { useTreasure } from '@/hooks/useTreasure'
import { CHAPTER_CHEST_BOUNTY } from '@/lib/treasure'

/**
 * Per-chapter treasure chest with fill progress. Two variants:
 *  - `banner` — a full-width bar for the chapter page header.
 *  - `chip` — a compact indicator for chapter cards on the home atlas.
 */
export function ChapterChest({
  slug,
  variant = 'banner',
}: {
  slug: string
  variant?: 'banner' | 'chip'
}) {
  const t = useTreasure()
  if (!t.hydrated) return null

  const chest = t.chests.find((c) => c.slug === slug)
  if (!chest) return null

  const pct = chest.total ? Math.round((chest.collected / chest.total) * 100) : 0
  const gold = chest.complete

  if (variant === 'chip') {
    return (
      <span className="inline-flex items-center gap-[var(--s-2)] text-[12px] tabular-nums text-[var(--ink-3)]">
        <TreasureChest
          open={gold}
          className="size-[18px]"
          style={{ color: gold ? 'var(--gold)' : 'var(--ink-3)' }}
        />
        {chest.collected}/{chest.total}
      </span>
    )
  }

  return (
    <div
      className="card mt-[var(--s-5)] flex items-center gap-[var(--s-4)] p-[var(--s-4)]"
      data-earned={gold ? 'true' : undefined}
    >
      <TreasureChest
        open={gold}
        className="size-9 shrink-0"
        style={{ color: gold ? 'var(--gold)' : 'var(--ink-3)' }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-[var(--s-3)] text-[13px]">
          <span className="text-[var(--ink-2)]">
            {gold ? 'Chest filled — bounty collected' : 'Chapter chest'}
          </span>
          <span
            className="font-serif tabular-nums"
            style={{ color: gold ? 'var(--gold)' : 'var(--ink-2)' }}
          >
            {chest.collected}/{chest.total}
            {gold && ` · +${CHAPTER_CHEST_BOUNTY}`}
          </span>
        </div>
        <div className="mt-[var(--s-2)] h-[6px] overflow-hidden rounded-full bg-[var(--bg-3)]">
          <div
            className="h-full rounded-full transition-[width] duration-[var(--d-slow)] ease-[var(--ease)]"
            style={{
              width: `${pct}%`,
              background: gold ? 'var(--gold)' : 'var(--grad-green)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
