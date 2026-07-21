import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allChapters, chapterBySlug, lessonsInChapter } from '@/lib/content'
import { ChapterChest } from '@/components/treasure/ChapterChest'
import { LessonRow } from '@/components/reader/LessonRow'
import { PirateBackdrop, PirateFrieze, type MotifName } from '@/components/art/PirateScene'

const CHAPTER_MOTIFS: MotifName[] = [
  'compass', 'gold', 'ship', 'map', 'crest', 'jewel',
  'lighthouse', 'hat', 'flag', 'swords', 'wheel',
]

export function generateStaticParams() {
  return allChapters().map((c) => ({ chapter: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>
}): Promise<Metadata> {
  const { chapter } = await params
  const c = chapterBySlug(chapter)
  if (!c) return {}
  return { title: c.title, description: c.intro.slice(0, 160) }
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>
}) {
  const { chapter } = await params
  const c = chapterBySlug(chapter)
  if (!c) notFound()

  const lessons = lessonsInChapter(c.slug)

  const motif = CHAPTER_MOTIFS[(c.order - 1) % CHAPTER_MOTIFS.length]

  return (
    <div className="relative mx-auto max-w-[900px] overflow-hidden px-[var(--s-5)] py-[var(--s-9)]">
      <PirateBackdrop motif={motif} className="-right-8 top-[2vh] h-[36vh] w-auto" opacity={0.07} />
      <p className="relative m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
        {c.island ?? `Chapter ${c.order}`}
      </p>
      <h1 className="mt-[var(--s-2)] mb-0 font-serif text-[var(--text-h2)] leading-tight tracking-[-0.03em] text-[var(--ink-1)]">
        {c.title}
      </h1>
      <p className="mt-[var(--s-4)] max-w-[68ch] text-[var(--text-lede)] leading-relaxed text-[var(--ink-2)]">
        {c.intro}
      </p>

      <ChapterChest slug={c.slug} />

      <ol className="mt-[var(--s-7)] m-0 list-none space-y-[var(--s-2)] p-0">
        {lessons.map((l, i) => (
          <LessonRow
            key={l.slug}
            index={i + 1}
            url={l.url}
            title={l.title}
            summary={l.summary}
            readingMinutes={l.readingMinutes}
          />
        ))}
      </ol>

      <PirateFrieze className="mt-[var(--s-9)] h-20" />
    </div>
  )
}
