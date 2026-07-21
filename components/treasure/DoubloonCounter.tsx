'use client'

import Link from 'next/link'
import { Doubloon } from '@/components/art/Icons'
import { useTreasure } from '@/hooks/useTreasure'

/**
 * Running doubloon total in the top bar. Gold, because doubloons are treasure.
 * Links to the treasure hall. Renders nothing until hydrated to avoid a
 * flash of an empty hoard.
 */
export function DoubloonCounter() {
  const { doubloons, hydrated, certificateEarned } = useTreasure()
  if (!hydrated) return null

  return (
    <Link
      href="/treasure"
      aria-label={`${doubloons} doubloons collected. Open the treasure hall.`}
      className="group inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border px-[var(--s-3)] py-[7px] text-[13px] no-underline transition-all duration-[var(--d-fast)] ease-[var(--ease)]"
      style={{
        borderColor: 'color-mix(in oklab, var(--gold) 32%, var(--line-1))',
        background: 'var(--gold-soft)',
        color: 'var(--gold)',
      }}
    >
      <Doubloon
        className="size-[16px] transition-transform duration-[var(--d-mid)] ease-[var(--ease)] group-hover:rotate-[18deg]"
      />
      <span className="font-serif tabular-nums font-semibold">{doubloons}</span>
      {certificateEarned && <span className="hidden sm:inline">· minted</span>}
    </Link>
  )
}
