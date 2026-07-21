import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'comparison' }>

/** 2–4 parallel options. The `highlight` figure is the visual anchor of each
 *  column and is never re-formatted — it renders exactly as extracted. */
export function Comparison({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <div
        className="grid gap-[var(--s-3)]"
        style={{
          gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,240px),1fr))`,
        }}
      >
        {block.options.map((o, i) => (
          <article key={i} className="card flex flex-col p-[var(--s-5)]">
            <h4 className="m-0 font-serif text-[17px] leading-tight text-[var(--ink-1)]">
              {o.label}
            </h4>
            {o.subtitle && (
              <p className="mt-[var(--s-1)] mb-0 text-[13px] text-[var(--ink-2)]">
                {o.subtitle}
              </p>
            )}

            {o.rows.length > 0 && (
              <ul className="my-[var(--s-4)] flex-1 list-none space-y-[var(--s-2)] border-t border-dotted border-[var(--line-1)] p-0 pt-[var(--s-4)]">
                {o.rows.map((r, j) => (
                  <li
                    key={j}
                    className="text-[13px] leading-relaxed text-[var(--ink-2)]"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}

            {o.highlight && (
              <div className="mt-auto rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-3)] p-[var(--s-3)] text-center">
                {o.highlightLabel && (
                  <div className="mb-[2px] text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                    {o.highlightLabel}
                  </div>
                )}
                <div className="font-serif text-[20px] font-semibold text-[var(--green-3)]">
                  {o.highlight}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </BlockShell>
  )
}
