'use client'

import Link from 'next/link'
import { Bookmark } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

interface LessonRef {
  url: string
  title: string
  summary: string
  chapter: string
}

export function BookmarksList({ index }: { index: LessonRef[] }) {
  const { isBookmarked, hydrated } = useProgress()

  if (!hydrated) {
    return <p className="text-[var(--ink-3)]">Loading your saved maps…</p>
  }

  const saved = index.filter((l) => isBookmarked(l.url))

  if (saved.length === 0) {
    return (
      <div className="card flex items-center gap-[var(--s-4)] p-[var(--s-6)]">
        <Bookmark size={20} className="shrink-0 text-[var(--ink-3)]" aria-hidden />
        <p className="m-0 text-[14px] text-[var(--ink-2)]">
          No saved maps yet. Tap <strong className="text-[var(--ink-1)]">Save</strong>{' '}
          on any map to mark it for later — it will appear here.
        </p>
      </div>
    )
  }

  return (
    <ul className="m-0 list-none space-y-[var(--s-2)] p-0">
      {saved.map((l) => (
        <li key={l.url}>
          <Link
            href={l.url}
            className="card flex items-start gap-[var(--s-3)] p-[var(--s-4)] no-underline"
          >
            <Bookmark
              size={15}
              className="mt-[2px] shrink-0"
              style={{ color: 'var(--gold)' }}
              fill="currentColor"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block text-[15px] leading-snug text-[var(--ink-1)]">
                {l.title}
              </span>
              <span className="mt-[var(--s-1)] block text-[13px] leading-relaxed text-[var(--ink-2)]">
                {l.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
