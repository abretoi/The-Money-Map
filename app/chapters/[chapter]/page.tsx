import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allChapters, chapterBySlug, lessonsInChapter } from '@/lib/content'

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

  return (
    <div className="mx-auto max-w-[900px] px-[var(--s-5)] py-[var(--s-9)]">
      <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
        {c.island ?? `Chapter ${c.order}`}
      </p>
      <h1 className="mt-[var(--s-2)] mb-0 font-serif text-[var(--text-h2)] leading-tight tracking-[-0.03em] text-[var(--ink-1)]">
        {c.title}
      </h1>
      <p className="mt-[var(--s-4)] max-w-[68ch] text-[var(--text-lede)] leading-relaxed text-[var(--ink-2)]">
        {c.intro}
      </p>

      <ol className="mt-[var(--s-8)] m-0 list-none space-y-[var(--s-2)] p-0">
        {lessons.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={l.url}
              className="card flex items-start gap-[var(--s-4)] p-[var(--s-4)] no-underline"
            >
              <span
                className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line-2)] font-serif text-[13px] text-[var(--ink-3)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] leading-snug text-[var(--ink-1)]">
                  {l.title}
                </span>
                <span className="mt-[var(--s-1)] block text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {l.summary}
                </span>
              </span>
              <span className="shrink-0 self-center text-[12px] text-[var(--ink-3)]">
                {l.readingMinutes} min
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
