'use client'

import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { CompassRose, Scroll, Anchor, Doubloon } from '@/components/art/Icons'

const NAME_KEY = 'mm-navigator-name'

/**
 * The voyage certificate. Locked until every map is charted; when earned it
 * becomes a printable, personalised award. Gold throughout — this is the
 * ultimate earned state.
 */
export function Certificate({
  earned,
  rank,
  doubloons,
}: {
  earned: boolean
  rank: string
  doubloons: number
}) {
  const [name, setName] = useState('')

  useEffect(() => {
    setName(window.localStorage.getItem(NAME_KEY) ?? '')
  }, [])

  function onName(v: string) {
    setName(v)
    try {
      window.localStorage.setItem(NAME_KEY, v)
    } catch {
      /* non-critical */
    }
  }

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (!earned) {
    return (
      <section className="mt-[var(--s-6)] flex items-center gap-[var(--s-4)] rounded-[var(--r-xl)] border border-dashed border-[var(--line-2)] bg-[var(--bg-2)] p-[var(--s-6)]">
        <Lock size={20} className="shrink-0 text-[var(--ink-3)]" aria-hidden />
        <div>
          <h2 className="m-0 font-serif text-[var(--text-h3)] text-[var(--ink-1)]">
            The voyage certificate awaits
          </h2>
          <p className="m-0 mt-[var(--s-1)] text-[13px] text-[var(--ink-2)]">
            Chart all the maps to mint your certificate of completion. Keep
            collecting doubloons — the scroll is sealed until the atlas is
            complete.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-[var(--s-6)]">
      <div className="mb-[var(--s-3)] flex flex-wrap items-center justify-between gap-[var(--s-3)]">
        <div className="flex items-center gap-[var(--s-2)] text-[var(--gold)]">
          <Scroll className="size-5" />
          <span className="text-[13px] font-semibold">Certificate minted</span>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-[var(--r-md)] border border-[color-mix(in_oklab,var(--gold)_32%,var(--line-1))] bg-[var(--gold-soft)] px-[var(--s-4)] py-[var(--s-2)] text-[13px] text-[var(--gold)] transition-transform duration-[var(--d-fast)] hover:-translate-y-px"
        >
          Print / save as PDF
        </button>
      </div>

      {/* The certificate itself — id lets a print stylesheet isolate it. */}
      <article
        id="mm-certificate"
        className="relative overflow-hidden rounded-[var(--r-xl)] border-2 p-[clamp(1.5rem,1rem+3vw,3.5rem)] text-center"
        style={{
          borderColor: 'color-mix(in oklab, var(--gold) 45%, transparent)',
          background:
            'radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--gold) 10%, var(--bg-2)), var(--bg-2) 70%)',
        }}
      >
        <CompassRose className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 text-[var(--gold)] opacity-[0.05]" />

        <div className="relative">
          <div className="mb-[var(--s-4)] flex justify-center text-[var(--gold)]">
            <CompassRose className="size-12" />
          </div>

          <p className="m-0 text-[11px] uppercase tracking-[0.24em] text-[var(--gold)]">
            The Money Map · Certificate of Completion
          </p>

          <p className="mx-auto mt-[var(--s-5)] mb-0 max-w-[30ch] text-[13px] text-[var(--ink-2)]">
            This certifies that
          </p>

          <input
            value={name}
            onChange={(e) => onName(e.target.value)}
            placeholder="Your name, navigator"
            aria-label="Your name"
            className="mx-auto mt-[var(--s-2)] block w-full max-w-[24ch] border-0 border-b border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-transparent pb-[var(--s-2)] text-center font-serif text-[clamp(1.5rem,1rem+2vw,2.5rem)] text-[var(--ink-1)] outline-none placeholder:text-[var(--ink-3)]"
          />

          <p className="mx-auto mt-[var(--s-5)] mb-0 max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-2)]">
            has charted every map in the atlas — from money mindset through
            taxes, retirement, housing, and legacy — and is hereby ranked
            <span className="font-serif text-[var(--gold)]"> {rank}</span>.
          </p>

          <div className="mt-[var(--s-6)] flex flex-wrap items-center justify-center gap-x-[var(--s-6)] gap-y-[var(--s-3)]">
            <span className="inline-flex items-center gap-[var(--s-2)] font-serif text-[15px] text-[var(--gold)]">
              <Doubloon className="size-5" />
              {doubloons.toLocaleString()} doubloons
            </span>
            <span className="text-[13px] text-[var(--ink-3)]">{today}</span>
          </div>

          <div className="mt-[var(--s-6)] flex items-center justify-center gap-[var(--s-2)] text-[var(--ink-3)]">
            <Anchor className="size-4" />
            <span className="text-[11px] italic">
              Navigate Your Journey to Financial Freedom
            </span>
          </div>
        </div>
      </article>
    </section>
  )
}
