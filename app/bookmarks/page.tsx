import type { Metadata } from 'next'
import { allLessons } from '@/lib/content'
import { BookmarksList } from '@/components/reader/BookmarksList'
import { PirateBackdrop } from '@/components/art/PirateScene'

export const metadata: Metadata = {
  title: 'Saved Maps',
  description: 'The maps you have marked to return to.',
}

export default function BookmarksPage() {
  // Lightweight lookup: the client filters this by the bookmarked URLs in
  // localStorage. Only url/title/summary/chapter cross the boundary.
  const index = allLessons().map((l) => ({
    url: l.url,
    title: l.title,
    summary: l.summary,
    chapter: l.chapter,
  }))

  return (
    <div className="relative mx-auto max-w-[820px] overflow-hidden px-[var(--s-5)] py-[var(--s-8)]">
      <PirateBackdrop motif="map" className="-right-10 top-[1vh] h-[32vh] w-auto" opacity={0.08} />
      <h1 className="relative m-0 font-serif text-[var(--text-h2)] tracking-[-0.03em] text-[var(--ink-1)]">
        Saved maps
      </h1>
      <p className="mt-[var(--s-3)] mb-[var(--s-7)] text-[var(--text-lede)] text-[var(--ink-2)]">
        The maps you’ve marked to return to.
      </p>
      <BookmarksList index={index} />
    </div>
  )
}
