'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

/**
 * A lesson row in the chapter listing. Shows a gold check once the map is
 * charted, so a chapter reads as a checklist of collected treasure.
 */
export function LessonRow({
  index,
  url,
  title,
  summary,
  readingMinutes,
}: {
  index: number
  url: string
  title: string
  summary: string
  readingMinutes: number
}) {
  const { isRead, hydrated } = useProgress()
  const read = hydrated && isRead(url)

  return (
    <li>
      <Link
        href={url}
        className="card flex items-start gap-[var(--s-4)] p-[var(--s-4)] no-underline"
        data-earned={read ? 'true' : undefined}
      >
        <span
          className="grid size-8 shrink-0 place-items-center rounded-full border font-serif text-[13px]"
          style={{
            borderColor: read ? 'var(--gold)' : 'var(--line-2)',
            color: read ? 'var(--gold)' : 'var(--ink-3)',
          }}
          aria-hidden
        >
          {read ? <Check size={15} /> : index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-snug text-[var(--ink-1)]">
            {title}
          </span>
          <span className="mt-[var(--s-1)] block text-[13px] leading-relaxed text-[var(--ink-2)]">
            {summary}
          </span>
        </span>
        <span className="shrink-0 self-center text-[12px] text-[var(--ink-3)]">
          {read ? 'charted' : `${readingMinutes} min`}
        </span>
      </Link>
    </li>
  )
}
