'use client'

import { useEffect, useRef, useState } from 'react'
import { Bookmark, Clock } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { useTreasure } from '@/hooks/useTreasure'
import { DoubloonAward } from '@/components/treasure/DoubloonAward'

/**
 * Meta row + the completion reward flow for this lesson.
 *
 * On first visit the lesson is marked read and a doubloon toast fires. We
 * capture whether it was already read *before* marking, so revisiting a
 * charted map does not re-award. If this completion also fills the chapter
 * chest, the bounty is announced.
 */
export function LessonMeta({
  url,
  chapter,
  readingMinutes,
  tags,
}: {
  url: string
  chapter: string
  readingMinutes: number
  tags: string[]
}) {
  const { markRead, toggleBookmark, isBookmarked, hydrated } = useProgress()
  const treasure = useTreasure()

  const [award, setAward] = useState(false)
  const [chestFilled, setChestFilled] = useState(false)
  const handled = useRef(false)

  useEffect(() => {
    if (!hydrated || handled.current) return
    handled.current = true

    // Read the chest state *before* marking read, so we can tell whether this
    // completion is the one that fills the chapter chest.
    const chest = treasure.chests.find((c) => c.slug === chapter)
    const wouldFill = Boolean(chest && chest.collected + 1 === chest.total)

    const newlyRead = markRead(url)
    if (newlyRead) {
      setChestFilled(wouldFill)
      setAward(true)
    }
  }, [hydrated, url, chapter, markRead, treasure.chests])

  const saved = isBookmarked(url)

  return (
    <>
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

      <DoubloonAward show={award} chestFilled={chestFilled} />
    </>
  )
}
