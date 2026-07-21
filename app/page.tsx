import Link from 'next/link'
import { allChapters, lessonsInChapter, readingOrder } from '@/lib/content'
import { ProgressSummary } from '@/components/reader/ProgressSummary'
import { CompassRose } from '@/components/art/Icons'

export default function Home() {
  const chapters = allChapters()
  const total = readingOrder().length

  return (
    <div className="mx-auto max-w-[1100px] px-[var(--s-5)] py-[var(--s-9)]">
      <section className="relative mb-[var(--s-10)]">
        {/* Compass watermark — cartographic atmosphere behind the hero. */}
        <CompassRose className="pointer-events-none absolute -right-8 -top-16 -z-1 hidden size-[340px] text-[var(--gold)] opacity-[0.06] md:block" />

        <p className="m-0 inline-flex items-center gap-[var(--s-2)] rounded-full border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-3)] py-[5px] text-[11px] uppercase tracking-[0.16em] text-[var(--ink-2)]">
          <span
            className="size-[6px] rounded-full bg-[var(--green-3)]"
            aria-hidden
          />
          {chapters.length} chapters · {total} maps · chart them all for the certificate
        </p>

        <h1 className="mt-[var(--s-5)] mb-0 max-w-[16ch] font-serif text-[var(--text-h1)] leading-[0.95] tracking-[-0.04em] text-[var(--ink-1)]">
          Navigate your journey to{' '}
          <em
            className="not-italic"
            style={{
              background: 'var(--grad-green)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            financial freedom
          </em>
          .
        </h1>

        <p className="mt-[var(--s-5)] max-w-[62ch] text-[var(--text-lede)] leading-relaxed text-[var(--ink-2)]">
          A topic-sorted atlas of personal finance — from money psychology and
          cash flow through taxes, retirement, housing, and legacy. Chart each
          map to collect doubloons, fill your chapter chests, and earn the
          voyage certificate.
        </p>

        <ProgressSummary />
      </section>

      <section aria-labelledby="chapters-heading">
        <div className="mb-[var(--s-5)] flex items-baseline gap-[var(--s-4)]">
          <h2
            id="chapters-heading"
            className="m-0 font-serif text-[var(--text-h2)] tracking-[-0.02em] text-[var(--ink-1)]"
          >
            The chapters
          </h2>
          <span className="h-px flex-1 bg-[var(--line-1)]" aria-hidden />
        </div>

        <div className="grid gap-[var(--s-3)] sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => {
            const count = lessonsInChapter(c.slug).length
            return (
              <Link
                key={c.slug}
                href={c.url}
                className="card flex flex-col p-[var(--s-5)] no-underline"
              >
                <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
                  {c.island ?? `Chapter ${c.order}`}
                </span>
                <h3 className="mt-[var(--s-2)] mb-[var(--s-3)] font-serif text-[17px] leading-tight text-[var(--ink-1)]">
                  {c.title}
                </h3>
                <p className="m-0 line-clamp-3 flex-1 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {c.intro}
                </p>
                <span className="mt-[var(--s-4)] text-[12px] text-[var(--ink-3)]">
                  {count} {count === 1 ? 'map' : 'maps'}
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
