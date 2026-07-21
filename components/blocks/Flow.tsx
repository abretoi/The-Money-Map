import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'flow' }>

/** Ordered steps. Sequence is the meaning here — withdrawal order and payoff
 *  order change outcomes — so the numbering is content, not decoration. */
export function Flow({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <ol className="list-none space-y-[var(--s-2)] p-0">
        {block.steps.map((s, i) => (
          <li key={i} className="card flex gap-[var(--s-4)] p-[var(--s-4)]">
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-2)] font-serif text-[14px] font-semibold text-[var(--green-3)]"
              aria-hidden
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="m-0 text-[14px] font-medium leading-snug text-[var(--ink-1)]">
                {s.label}
              </p>
              {s.detail && (
                <p className="mt-[var(--s-1)] mb-0 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {s.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </BlockShell>
  )
}
