import Link from 'next/link'
import { buildOutline } from '@/lib/outline'
import { ChapterNav } from './ChapterNav'
import { SidebarFooter } from './SidebarFooter'
import { CompassRose } from '@/components/art/Icons'

/**
 * Desktop sidebar (server). Builds the slim outline and hands it to the client
 * nav — the full lesson set with all blocks must never reach the browser bundle.
 * The mobile equivalent is MobileNav, rendered from the top bar.
 */
export function Sidebar() {
  const outline = buildOutline()
  const total = outline.reduce((n, c) => n + c.lessons.length, 0)

  return (
    <aside className="sticky top-0 z-20 hidden h-dvh overflow-y-auto border-r border-[var(--line-1)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] p-[var(--s-5)] backdrop-blur-xl lg:block">
      <Link href="/" className="group relative block overflow-hidden no-underline">
        {/* faint compass watermark — cartographic texture, not illustration */}
        <CompassRose
          className="pointer-events-none absolute -right-6 -top-6 size-24 text-[var(--gold)] opacity-[0.07] transition-opacity duration-[var(--d-slow)] group-hover:opacity-[0.12]"
        />
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

      <SidebarFooter />
    </aside>
  )
}
