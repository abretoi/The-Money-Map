import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'buckets' }>

/** Unordered categories. `layout: chips` renders compact label-only pills for
 *  the takeaway rows several maps close on. */
export function Buckets({ block }: { block: T }) {
  const chips = block.layout === 'chips'

  if (chips) {
    return (
      <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
        <ul className="flex list-none flex-wrap gap-[var(--s-2)] p-0">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="rounded-full border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-4)] py-[var(--s-2)] text-[13px] text-[var(--ink-1)]"
            >
              {it.label}
            </li>
          ))}
        </ul>
      </BlockShell>
    )
  }

  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <div className="grid gap-[var(--s-3)] sm:grid-cols-2">
        {block.items.map((it, i) => (
          <article key={i} className="card p-[var(--s-5)]">
            <h4 className="m-0 mb-[var(--s-2)] text-[14px] font-semibold text-[var(--ink-1)]">
              {it.label}
            </h4>
            {it.description && (
              <p className="m-0 text-[13px] leading-relaxed text-[var(--ink-2)]">
                {it.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </BlockShell>
  )
}
