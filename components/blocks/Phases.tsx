import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'phases' }>

/** Life-stage bands. The green ramp across the bands encodes progression
 *  through the phase, which is why the gradient is positional rather than
 *  a flat accent. */
export function Phases({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <div className="grid gap-[var(--s-2)] sm:grid-cols-2 lg:grid-cols-4">
        {block.bands.map((b, i) => {
          const t = block.bands.length > 1 ? i / (block.bands.length - 1) : 0
          return (
            <article
              key={i}
              className="card overflow-hidden p-[var(--s-4)]"
              style={{
                background: `color-mix(in oklab, var(--green-2) ${6 + t * 14}%, var(--bg-2))`,
              }}
            >
              <h4 className="m-0 text-[14px] font-semibold text-[var(--ink-1)]">
                {b.label}
              </h4>
              {b.range && (
                <p className="mt-[2px] mb-0 font-serif text-[13px] text-[var(--gold)]">
                  {b.range}
                </p>
              )}
              {b.detail && (
                <p className="mt-[var(--s-2)] mb-0 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {b.detail}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </BlockShell>
  )
}
