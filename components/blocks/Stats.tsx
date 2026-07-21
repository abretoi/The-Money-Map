import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'stat' }>

/** Headline figure strip. Figures render exactly as extracted — no locale
 *  formatting, no rounding. `$412,400` and `6.23%` are strings end to end. */
export function Stats({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <dl className="card m-0 grid gap-px overflow-hidden bg-[var(--line-1)] p-0 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {block.stats.map((s, i) => (
          <div key={i} className="bg-[var(--bg-2)] p-[var(--s-5)] text-center">
            <dd className="m-0 font-serif text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] font-semibold leading-none text-[var(--green-3)]">
              {s.figure}
            </dd>
            <dt className="mt-[var(--s-2)] text-[12px] leading-snug text-[var(--ink-2)]">
              {s.label}
            </dt>
            {s.footnote && (
              <p className="mt-[var(--s-1)] mb-0 text-[11px] text-[var(--ink-3)]">
                {s.footnote}
              </p>
            )}
          </div>
        ))}
      </dl>
    </BlockShell>
  )
}
