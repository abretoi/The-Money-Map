import { Info, TriangleAlert, Scale, Compass } from 'lucide-react'
import type { Block } from '@/lib/content'

type T = Extract<Block, { type: 'note' }>

const VARIANTS = {
  info: { icon: Info, accent: 'var(--green-3)', label: 'Note' },
  warning: { icon: TriangleAlert, accent: 'var(--warn)', label: 'Caution' },
  disclaimer: { icon: Scale, accent: 'var(--ink-3)', label: 'Disclaimer' },
  insight: { icon: Compass, accent: 'var(--gold)', label: 'Core lesson' },
} as const

/**
 * `insight` is the one place gold appears outside earned states — it marks the
 * closing "core lesson" the maps end on, which is the reader's payoff for
 * finishing the lesson. That reading of gold-as-reward is consistent with the
 * gold rule rather than an exception to it.
 */
export function Note({ block }: { block: T }) {
  const v = VARIANTS[block.variant]
  const Icon = v.icon
  const isInsight = block.variant === 'insight'

  return (
    <aside
      className="my-[var(--s-6)] flex gap-[var(--s-3)] rounded-[var(--r-lg)] border p-[var(--s-4)]"
      style={{
        borderColor: `color-mix(in oklab, ${v.accent} 30%, var(--line-1))`,
        background: `color-mix(in oklab, ${v.accent} 6%, var(--bg-2))`,
      }}
      data-source={block.source}
    >
      <Icon
        size={17}
        aria-hidden
        className="mt-[2px] shrink-0"
        style={{ color: v.accent }}
      />
      <div className="min-w-0">
        <p
          className="m-0 mb-[2px] text-[10px] uppercase tracking-[0.14em]"
          style={{ color: v.accent }}
        >
          {block.title ?? v.label}
        </p>
        <p
          className={
            'm-0 leading-relaxed text-[var(--ink-2)] ' +
            (isInsight ? 'font-serif text-[15px] italic' : 'text-[13px]')
          }
        >
          {block.body}
        </p>
      </div>
    </aside>
  )
}
