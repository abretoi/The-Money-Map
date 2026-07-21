'use client'

import { useEffect } from 'react'
import { Bookmark, Clock } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

/** Meta row plus the read-marking side effect for this lesson. */
export function LessonMeta({
  url,
  readingMinutes,
  tags,
  originalMap,
}: {
  url: string
  readingMinutes: number
  tags: string[]
  originalMap: string
}) {
  const { markRead, toggleBookmark, isBookmarked } = useProgress()

  // Opening a lesson marks it read. Deliberately not scroll-gated: these are
  // reference maps people dip into, and a partial read still counts as visited.
  useEffect(() => {
    markRead(url)
  }, [url, markRead])

  const saved = isBookmarked(url)

  return (
    <div className="mt-[var(--s-5)] flex flex-wrap items-center gap-[var(--s-3)] border-y border-[var(--line-1)] py-[var(--s-3)]">
      <span className="inline-flex items-center gap-[var(--s-2)] text-[12px] text-[var(--ink-3)]">
        <Clock size={13} aria-hidden />
        {readingMinutes} min read
      </span>

      <button
        type="button"
        onClick={() => toggleBookmark(url)}
        aria-pressed={saved}
        className="inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-sm)] px-[var(--s-2)] py-[3px] text-[12px] transition-colors duration-[var(--d-fast)] hover:bg-[var(--bg-2)]"
        style={{ color: saved ? 'var(--gold)' : 'var(--ink-3)' }}
      >
        <Bookmark size={13} aria-hidden fill={saved ? 'currentColor' : 'none'} />
        {saved ? 'Saved' : 'Save'}
      </button>

      <div className="flex flex-1 flex-wrap justify-end gap-[var(--s-2)]">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--line-1)] px-[var(--s-2)] py-[2px] text-[11px] text-[var(--ink-3)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
