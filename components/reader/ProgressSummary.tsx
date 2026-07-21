'use client'

import { useProgress } from '@/hooks/useProgress'

/**
 * Voyage progress. The bar fills green while underway and turns gold only on
 * completion — the earned state.
 */
export function ProgressSummary({ total }: { total: number }) {
  const { readCount, hydrated } = useProgress()
  if (!hydrated || total === 0) return null

  const pct = Math.round((readCount / total) * 100)
  const complete = readCount === total

  return (
    <div className="mt-[var(--s-7)] max-w-[420px]">
      <div className="mb-[var(--s-2)] flex items-baseline justify-between text-[12px]">
        <span className="text-[var(--ink-3)]">Your voyage</span>
        <span
          style={{ color: complete ? 'var(--gold)' : 'var(--ink-2)' }}
          className="font-serif"
        >
          {readCount} / {total} maps
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className="h-[6px] overflow-hidden rounded-full bg-[var(--bg-3)]"
      >
        <div
          className="h-full rounded-full transition-[width] duration-[var(--d-slow)] ease-[var(--ease)]"
          style={{
            width: `${pct}%`,
            background: complete ? 'var(--gold)' : 'var(--grad-green)',
          }}
        />
      </div>
    </div>
  )
}
