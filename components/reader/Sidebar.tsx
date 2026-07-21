import Link from 'next/link'
import { allChapters, lessonsInChapter } from '@/lib/content'
import { ChapterNav } from './ChapterNav'

/**
 * Server component. Builds a slim outline and hands it to the client nav —
 * the full lesson set with all blocks must never reach the browser bundle.
 */
export function Sidebar() {
  const outline = allChapters().map((c) => ({
    slug: c.slug,
    title: c.title,
    island: c.island ?? '',
    order: c.order,
    lessons: lessonsInChapter(c.slug).map((l) => ({
      slug: l.slug,
      title: l.title,
      url: l.url,
    })),
  }))

  const total = outline.reduce((n, c) => n + c.lessons.length, 0)

  return (
    <aside className="sticky top-0 z-20 hidden h-dvh overflow-y-auto border-r border-[var(--line-1)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] p-[var(--s-5)] backdrop-blur-xl lg:block">
      <Link href="/" className="block no-underline">
        <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
          Navigate your journey
        </p>
        <h1 className="m-0 mt-[var(--s-1)] font-serif text-[26px] leading-none tracking-[-0.03em] text-[var(--ink-1)]">
          The Money Map
        </h1>
        <p className="mt-[var(--s-2)] mb-0 text-[12px] text-[var(--ink-3)]">
          {outline.length} chapters · {total} maps
        </p>
      </Link>

      <nav aria-label="Chapters" className="mt-[var(--s-6)]">
        <ChapterNav outline={outline} />
      </nav>
    </aside>
  )
}
