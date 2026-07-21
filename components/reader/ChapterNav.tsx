'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

export interface OutlineChapter {
  slug: string
  title: string
  island: string
  order: number
  lessons: { slug: string; title: string; url: string }[]
}

export function ChapterNav({ outline }: { outline: OutlineChapter[] }) {
  const pathname = usePathname()
  const { isRead, markUnread } = useProgress()
  const activeChapter = pathname.split('/')[2] ?? ''
  const [open, setOpen] = useState<string | null>(activeChapter)

  return (
    <ul className="m-0 list-none space-y-[2px] p-0">
      {outline.map((c) => {
        const expanded = open === c.slug
        const done = c.lessons.filter((l) => isRead(l.url)).length
        const complete = done === c.lessons.length && done > 0

        return (
          <li key={c.slug}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : c.slug)}
              aria-expanded={expanded}
              className="flex w-full items-start gap-[var(--s-2)] rounded-[var(--r-md)] px-[var(--s-2)] py-[var(--s-2)] text-left transition-colors duration-[var(--d-fast)] hover:bg-[var(--bg-2)]"
            >
              <ChevronRight
                size={14}
                aria-hidden
                className="mt-[3px] shrink-0 text-[var(--ink-3)] transition-transform duration-[var(--d-fast)] ease-[var(--ease)]"
                style={{ transform: expanded ? 'rotate(90deg)' : 'none' }}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] leading-snug text-[var(--ink-1)]">
                  {c.title}
                </span>
                <span
                  className="mt-[2px] block text-[11px]"
                  /* Gold only once the chapter is fully complete — an earned state. */
                  style={{
                    color: complete ? 'var(--gold)' : 'var(--ink-3)',
                  }}
                >
                  {c.island} · {done}/{c.lessons.length}
                </span>
              </span>
            </button>

            {expanded && (
              <ul className="m-0 mb-[var(--s-2)] ml-[var(--s-5)] list-none space-y-px border-l border-[var(--line-1)] p-0 pl-[var(--s-2)]">
                {c.lessons.map((l) => {
                  const active = pathname === l.url
                  const read = isRead(l.url)
                  return (
                    <li key={l.slug} className="flex items-start">
                      {/* Completion check. A read map shows a gold check that can
                          be clicked to un-complete it (restart that section). An
                          unread map shows an inert marker — you can't manually
                          complete one without reading it. */}
                      {read ? (
                        <button
                          type="button"
                          onClick={() => markUnread(l.url)}
                          aria-label={`Mark "${l.title}" not charted — restart this map`}
                          title="Charted — click to restart"
                          className="group mt-[5px] grid size-[15px] shrink-0 place-items-center rounded-full border transition-colors duration-[var(--d-fast)]"
                          style={{
                            borderColor: 'color-mix(in oklab, var(--gold) 55%, transparent)',
                            background: 'var(--gold-soft)',
                          }}
                        >
                          <Check size={10} style={{ color: 'var(--gold)' }} aria-hidden />
                        </button>
                      ) : (
                        <span
                          className="mt-[5px] size-[15px] shrink-0 rounded-full border border-[var(--line-1)]"
                          aria-hidden
                        />
                      )}
                      <Link
                        href={l.url}
                        aria-current={active ? 'page' : undefined}
                        className="flex flex-1 items-start gap-[var(--s-2)] rounded-[var(--r-sm)] px-[var(--s-2)] py-[6px] text-[12px] leading-snug no-underline transition-colors duration-[var(--d-fast)] hover:bg-[var(--bg-2)]"
                        style={{
                          color: active ? 'var(--green-3)' : read ? 'var(--gold)' : 'var(--ink-2)',
                          background: active ? 'var(--bg-2)' : undefined,
                        }}
                      >
                        {l.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
