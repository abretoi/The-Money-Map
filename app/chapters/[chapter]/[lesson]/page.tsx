import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import {
  allLessons,
  chapterBySlug,
  lessonBySlug,
  neighbours,
} from '@/lib/content'
import { Blocks } from '@/components/blocks'
import { MDXContent } from '@/components/MDXContent'
import { LessonMeta } from '@/components/reader/LessonMeta'
import { Quiz } from '@/components/reader/Quiz'

export function generateStaticParams() {
  return allLessons().map((l) => ({ chapter: l.chapter, lesson: l.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string; lesson: string }>
}): Promise<Metadata> {
  const { chapter, lesson } = await params
  const l = lessonBySlug(chapter, lesson)
  if (!l) return {}
  return {
    title: l.title,
    description: l.summary,
    openGraph: { title: l.title, description: l.summary },
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ chapter: string; lesson: string }>
}) {
  const { chapter, lesson } = await params
  const l = lessonBySlug(chapter, lesson)
  if (!l) notFound()

  const c = chapterBySlug(chapter)
  const { prev, next, position, total } = neighbours(l)

  return (
    <article className="mx-auto max-w-[820px] px-[var(--s-5)] py-[var(--s-8)]">
      <nav className="mb-[var(--s-5)] text-[12px]" aria-label="Breadcrumb">
        <Link
          href={`/chapters/${chapter}`}
          className="text-[var(--ink-3)] no-underline hover:text-[var(--green-3)]"
        >
          {c?.title ?? chapter}
        </Link>
        <span className="mx-[var(--s-2)] text-[var(--ink-3)]" aria-hidden>
          ·
        </span>
        <span className="text-[var(--ink-3)]">
          Map {position} of {total}
        </span>
      </nav>

      <h1 className="m-0 font-serif text-[var(--text-h2)] leading-tight tracking-[-0.03em] text-[var(--ink-1)]">
        {l.title}
      </h1>
      <p className="mt-[var(--s-3)] max-w-[68ch] text-[var(--text-lede)] leading-relaxed text-[var(--ink-2)]">
        {l.summary}
      </p>

      <LessonMeta
        url={l.url}
        chapter={l.chapter}
        readingMinutes={l.readingMinutes}
        tags={l.tags}
      />

      <div className="prose mt-[var(--s-7)]">
        <MDXContent code={l.body} />
      </div>

      <Blocks blocks={l.blocks} />

      {l.keyTakeaways.length > 0 && (
        <section className="my-[var(--s-8)]">
          <h2 className="mb-[var(--s-3)] font-serif text-[var(--text-h3)] text-[var(--ink-1)]">
            Key takeaways
          </h2>
          <ul className="m-0 list-none space-y-[var(--s-2)] p-0">
            {l.keyTakeaways.map((t, i) => (
              <li
                key={i}
                className="flex gap-[var(--s-3)] text-[14px] leading-relaxed text-[var(--ink-2)]"
              >
                <span
                  className="mt-[9px] size-[5px] shrink-0 rounded-full bg-[var(--green-3)]"
                  aria-hidden
                />
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {l.actionSteps.length > 0 && (
        <section className="my-[var(--s-8)]">
          <h2 className="mb-[var(--s-3)] font-serif text-[var(--text-h3)] text-[var(--ink-1)]">
            Action steps
          </h2>
          <ol className="m-0 list-none space-y-[var(--s-2)] p-0">
            {l.actionSteps.map((t, i) => (
              <li
                key={i}
                className="card flex gap-[var(--s-3)] p-[var(--s-4)] text-[14px] leading-relaxed text-[var(--ink-2)]"
              >
                <span
                  className="font-serif text-[13px] text-[var(--gold)]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </section>
      )}

      {l.quiz.length > 0 && <Quiz items={l.quiz} lessonUrl={l.url} />}

      <a
        href={l.originalMap}
        download
        className="my-[var(--s-8)] inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-4)] py-[var(--s-3)] text-[13px] text-[var(--ink-2)] no-underline transition-all duration-[var(--d-fast)] ease-[var(--ease)] hover:border-[var(--line-2)] hover:text-[var(--ink-1)]"
      >
        <Download size={14} aria-hidden />
        Download the original map (page {l.sourcePage})
      </a>

      <nav
        className="mt-[var(--s-8)] flex gap-[var(--s-3)] border-t border-[var(--line-1)] pt-[var(--s-5)]"
        aria-label="Lesson navigation"
      >
        {prev && (
          <Link
            href={prev.url}
            className="card flex flex-1 items-center gap-[var(--s-3)] p-[var(--s-4)] no-underline"
          >
            <ArrowLeft size={15} aria-hidden className="text-[var(--ink-3)]" />
            <span className="min-w-0">
              <span className="block text-[11px] text-[var(--ink-3)]">
                Previous
              </span>
              <span className="block truncate text-[13px] text-[var(--ink-1)]">
                {prev.title}
              </span>
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={next.url}
            className="card flex flex-1 items-center justify-end gap-[var(--s-3)] p-[var(--s-4)] text-right no-underline"
          >
            <span className="min-w-0">
              <span className="block text-[11px] text-[var(--ink-3)]">Next</span>
              <span className="block truncate text-[13px] text-[var(--ink-1)]">
                {next.title}
              </span>
            </span>
            <ArrowRight size={15} aria-hidden className="text-[var(--ink-3)]" />
          </Link>
        )}
      </nav>
    </article>
  )
}
