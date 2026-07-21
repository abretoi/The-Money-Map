'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Bookmark, Scroll as ScrollIcon } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'The atlas', icon: Compass },
  { href: '/bookmarks', label: 'Saved maps', icon: Bookmark },
  { href: '/treasure', label: 'Treasure hall', icon: ScrollIcon },
] as const

/** Persistent utility links at the foot of the sidebar. */
export function SidebarFooter() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Utilities"
      className="mt-[var(--s-6)] border-t border-[var(--line-1)] pt-[var(--s-4)]"
    >
      <ul className="m-0 list-none space-y-px p-0">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className="flex items-center gap-[var(--s-3)] rounded-[var(--r-md)] px-[var(--s-2)] py-[var(--s-2)] text-[13px] no-underline transition-colors duration-[var(--d-fast)] hover:bg-[var(--bg-2)]"
                style={{ color: active ? 'var(--green-3)' : 'var(--ink-2)' }}
              >
                <Icon size={14} aria-hidden />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
