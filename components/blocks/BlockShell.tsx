import type { ReactNode } from 'react'

/**
 * Wrapper shared by every block.
 *
 * Carries the block title and the provenance affordance. Extracted blocks are
 * marked so a reader can tell a figure taken verbatim from the source map from
 * pedagogy written around it — this distinction is load-bearing for financial
 * content and must stay visible in the UI.
 */
export function BlockShell({
  title,
  source,
  asOf,
  children,
}: {
  title?: string
  source: 'extracted' | 'authored'
  asOf?: number
  children: ReactNode
}) {
  return (
    <section
      className="my-[var(--s-7)]"
      data-source={source}
      aria-label={title}
    >
      {title && (
        <header className="mb-[var(--s-4)] flex items-baseline gap-[var(--s-3)]">
          <h3 className="font-serif text-[var(--text-h3)] tracking-[-0.01em] text-[var(--ink-1)]">
            {title}
          </h3>
          <span className="h-px flex-1 bg-[var(--line-1)]" aria-hidden />
          {asOf && (
            <span
              className="shrink-0 rounded-full border border-[var(--line-1)] px-[var(--s-2)] py-[2px] text-[11px] tracking-wide text-[var(--ink-3)]"
              title={`Figures current as of ${asOf}`}
            >
              {asOf}
            </span>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
