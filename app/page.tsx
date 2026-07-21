import Link from 'next/link'
import { allChapters, lessonsInChapter, readingOrder } from '@/lib/content'
import { ProgressSummary } from '@/components/reader/ProgressSummary'
import { ChapterChest } from '@/components/treasure/ChapterChest'
import { PirateFrieze, PirateBackdrop } from '@/components/art/PirateScene'
import { CompassRose } from '@/components/art/Icons'

// Rotating backdrop motif per chapter card, so the grid feels illustrated.
const CARD_MOTIFS = [
  'compass', 'gold', 'ship', 'map', 'crest', 'jewel',
  'lighthouse', 'hat', 'flag', 'swords', 'wheel',
] as const

export default function Home() {
  const chapters = allChapters()
  const total = readingOrder().length

  return (
    <div>
      {/* ================= HERO — spans the full page ================= */}
      <section className="relative flex min-h-[86vh] flex-col justify-center overflow-hidden px-[var(--s-5)] py-[var(--s-9)] text-center">
        <PirateBackdrop motif="ship" className="left-[-6%] top-[6%] h-[42vh] w-auto" opacity={0.07} />
        <PirateBackdrop motif="lighthouse" className="right-[2%] top-[8%] h-[40vh] w-auto" opacity={0.07} />
        <CompassRose
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[125vmin] w-[125vmin] -translate-x-1/2 -translate-y-1/2 text-[var(--gold)] opacity-[0.05]"
        />

        <div className="relative mx-auto flex max-w-[1500px] flex-col items-center">
          <p className="m-0 inline-flex items-center gap-[var(--s-2)] rounded-full border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-4)] py-[6px] text-[11px] uppercase tracking-[0.18em] text-[var(--ink-2)]">
            <span className="size-[6px] rounded-full bg-[var(--green-3)]" aria-hidden />
            {chapters.length} chapters · {total} maps · chart them all for the certificate
          </p>

          <h1 className="mt-[var(--s-6)] mb-0 font-serif font-medium uppercase leading-[0.92] tracking-[-0.03em] text-[var(--ink-1)]"
              style={{ fontSize: 'var(--text-display)' }}>
            Navigate your journey to{' '}
            <span
              className="italic"
              style={{
                background: 'var(--grad-green)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              financial freedom
            </span>
            .
          </h1>

          <p className="mx-auto mt-[var(--s-6)] max-w-[64ch] text-[var(--text-lede)] leading-relaxed text-[var(--ink-2)]">
            A topic-sorted atlas of personal finance — from money psychology and
            cash flow through taxes, retirement, housing, and legacy. Chart each
            map to collect doubloons, fill your chapter chests, and earn the
            voyage certificate.
          </p>

          <div className="mt-[var(--s-7)] flex flex-wrap justify-center gap-[var(--s-3)]">
            <Link
              href={`/chapters/${chapters[0].slug}`}
              className="hover-gradient rounded-[var(--r-md)] border border-[color-mix(in_oklab,var(--green-3)_40%,var(--line-2))] bg-[var(--bg-2)] px-[var(--s-6)] py-[var(--s-3)] text-[15px] text-[var(--ink-1)] no-underline"
            >
              Begin the voyage
            </Link>
            <Link
              href="/treasure"
              className="hover-gradient rounded-[var(--r-md)] border border-[color-mix(in_oklab,var(--gold)_36%,var(--line-1))] bg-[var(--gold-soft)] px-[var(--s-6)] py-[var(--s-3)] text-[15px] text-[var(--gold)] no-underline"
            >
              Treasure hall
            </Link>
          </div>

          <ProgressSummary />
        </div>
      </section>

      <PirateFrieze className="my-[var(--s-6)] h-24" />

      {/* ================= CHAPTERS ================= */}
      <section aria-labelledby="chapters-heading" className="mx-auto max-w-[1100px] px-[var(--s-5)] pb-[var(--s-10)]">
        <div className="mb-[var(--s-5)] flex items-baseline gap-[var(--s-4)]">
          <h2
            id="chapters-heading"
            className="m-0 font-serif text-[var(--text-h2)] tracking-[-0.02em] text-[var(--ink-1)]"
          >
            The eleven islands
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
                className="card relative flex flex-col overflow-hidden p-[var(--s-5)] no-underline"
              >
                <PirateBackdrop
                  motif={CARD_MOTIFS[(c.order - 1) % CARD_MOTIFS.length]}
                  className="-right-4 -top-4 h-24 w-auto"
                  opacity={0.08}
                />
                <span className="relative text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
                  {c.island ?? `Chapter ${c.order}`}
                </span>
                <h3 className="relative mt-[var(--s-2)] mb-[var(--s-3)] font-serif text-[19px] leading-tight text-[var(--ink-1)]">
                  {c.title}
                </h3>
                <p className="relative m-0 line-clamp-3 flex-1 text-[13px] leading-relaxed text-[var(--ink-2)]">
                  {c.intro}
                </p>
                <span className="relative mt-[var(--s-4)] flex items-center justify-between">
                  <span className="text-[12px] text-[var(--ink-3)]">
                    {count} {count === 1 ? 'map' : 'maps'}
                  </span>
                  <ChapterChest slug={c.slug} variant="chip" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
