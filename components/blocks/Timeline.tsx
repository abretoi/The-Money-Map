import { BlockShell } from './BlockShell'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'timeline' }>

/**
 * Horizontal rail on wide viewports, vertical spine on narrow.
 * The source infographics render these as a single wide row that becomes
 * unreadable below ~900px; reflowing to a spine is the whole point of
 * extracting them out of the image.
 */
export function Timeline({ block }: { block: T }) {
  return (
    <BlockShell title={block.title} source={block.source} asOf={block.asOf}>
      <ol className="relative grid gap-[var(--s-3)] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {block.nodes.map((n, i) => (
          <li key={i} className="card p-[var(--s-4)]">
            <div className="mb-[var(--s-2)] flex items-center gap-[var(--s-2)]">
              <span
                className="grid size-6 shrink-0 place-items-center rounded-full border border-[var(--line-2)] text-[11px] font-semibold text-[var(--green-3)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="font-serif text-[15px] font-semibold tracking-wide text-[var(--gold)]">
                {n.label}
              </span>
            </div>
            {n.value && (
              <p className="m-0 text-[14px] font-medium leading-snug text-[var(--ink-1)]">
                {n.value}
              </p>
            )}
            {n.detail && (
              <p className="mt-[var(--s-2)] mb-0 text-[13px] leading-relaxed text-[var(--ink-2)]">
                {n.detail}
              </p>
            )}
          </li>
        ))}
      </ol>
    </BlockShell>
  )
}
