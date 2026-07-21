'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Doubloon } from '@/components/art/Icons'
import { DOUBLOONS_PER_MAP } from '@/lib/treasure'

/**
 * The reward moment. When a lesson is completed for the first time, a doubloon
 * toast rises, celebrating the collection. Honors reduced-motion (the toast
 * still appears; it just doesn't animate).
 *
 * `chestFilled` is passed when this completion also fills the chapter chest, so
 * the bounty is announced too.
 */
export function DoubloonAward({
  show,
  chestFilled,
}: {
  show: boolean
  chestFilled: boolean
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 4200)
    return () => clearTimeout(t)
  }, [show])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[var(--s-5)] left-1/2 z-40 -translate-x-1/2"
    >
      <Link
        href="/treasure"
        className="mm-award flex items-center gap-[var(--s-3)] rounded-full border px-[var(--s-5)] py-[var(--s-3)] no-underline shadow-[var(--shadow-3)]"
        style={{
          borderColor: 'color-mix(in oklab, var(--gold) 40%, transparent)',
          background: 'color-mix(in oklab, var(--gold) 14%, var(--bg-1))',
          color: 'var(--gold)',
        }}
      >
        <Doubloon className="mm-award-coin size-6" />
        <span className="text-[14px] font-semibold">
          +{DOUBLOONS_PER_MAP} doubloons
          {chestFilled && ' · chest filled +25'}
        </span>
        <span className="text-[12px] text-[var(--ink-2)]">View hoard →</span>
      </Link>

      <style>{`
        .mm-award { animation: mm-rise var(--d-slow) var(--ease) both; }
        .mm-award-coin { animation: mm-spin 900ms var(--ease); }
        @keyframes mm-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mm-spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mm-award, .mm-award-coin { animation: none; }
        }
      `}</style>
    </div>
  )
}
