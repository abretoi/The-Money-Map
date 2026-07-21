'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Compass, Bookmark, Scroll as ScrollIcon } from 'lucide-react'
import { ChapterNav } from './ChapterNav'
import type { OutlineChapter } from '@/lib/outline'

const UTILS = [
  { href: '/', label: 'The atlas', icon: Compass },
  { href: '/bookmarks', label: 'Saved maps', icon: Bookmark },
  { href: '/treasure', label: 'Treasure hall', icon: ScrollIcon },
] as const

/**
 * Mobile navigation: hamburger button + slide-in drawer. Rendered from the top
 * bar and shown only below `lg` (the desktop sidebar covers larger screens).
 * Uses a fixed overlay, so its position in the DOM does not matter.
 */
export function MobileNav({ outline }: { outline: OutlineChapter[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change and lock scroll while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] text-[var(--ink-2)] transition-colors duration-[var(--d-fast)] hover:text-[var(--ink-1)]"
      >
        <Menu size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col overflow-y-auto border-r border-[var(--line-2)] bg-[var(--bg-1)] p-[var(--s-5)] shadow-[var(--shadow-3)]">
            <div className="mb-[var(--s-5)] flex items-center justify-between">
              <Link href="/" className="no-underline">
                <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                  Navigate your journey
                </p>
                <span className="font-serif text-[20px] tracking-[-0.02em] text-[var(--ink-1)]">
                  The Money Map
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="grid size-9 place-items-center rounded-[var(--r-md)] border border-[var(--line-1)] text-[var(--ink-2)]"
              >
                <X size={16} />
              </button>
            </div>

            <ChapterNav outline={outline} />

            <nav
              aria-label="Utilities"
              className="mt-[var(--s-5)] border-t border-[var(--line-1)] pt-[var(--s-4)]"
            >
              <ul className="m-0 list-none space-y-px p-0">
                {UTILS.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-[var(--s-3)] rounded-[var(--r-md)] px-[var(--s-2)] py-[var(--s-2)] text-[13px] text-[var(--ink-2)] no-underline hover:bg-[var(--bg-2)]"
                    >
                      <Icon size={14} aria-hidden />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
