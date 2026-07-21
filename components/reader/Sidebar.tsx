import Link from 'next/link'
import { buildOutline } from '@/lib/outline'
import { ChapterNav } from './ChapterNav'
import { SidebarFooter } from './SidebarFooter'
import { ProgressControls } from '@/components/treasure/ProgressControls'
import { JollyRoger } from '@/components/art/Pirate'

/**
 * Desktop sidebar (server). Builds the slim outline and hands it to the client
 * nav — the full lesson set with all blocks must never reach the browser bundle.
 * The mobile equivalent is MobileNav, rendered from the top bar.
 *
 * NOTE: no decorative watermark sits over the outline. An earlier compass
 * watermark overlapped the chapter titles; any imagery here must stay clear of
 * the nav text.
 */
export function Sidebar() {
  const outline = buildOutline()
  const total = outline.reduce((n, c) => n + c.lessons.length, 0)

  return (
    <aside className="sticky top-0 z-20 hidden h-dvh flex-col overflow-y-auto border-r border-[var(--line-1)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] p-[var(--s-5)] backdrop-blur-xl lg:flex">
      <Link href="/" className="block no-underline">
        <span className="flex items-center gap-[var(--s-2)]">
          <JollyRoger className="h-6 w-auto text-[var(--gold)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
            Navigate your journey
          </span>
        </span>
        <h1 className="m-0 mt-[var(--s-2)] font-serif text-[26px] leading-none tracking-[-0.03em] text-[var(--ink-1)]">
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
      <ProgressControls variant="menu" />
    </aside>
  )
}
