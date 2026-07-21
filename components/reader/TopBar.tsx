import { SearchTrigger } from './SearchTrigger'
import { ThemeToggle } from './ThemeToggle'
import { MobileNav } from './MobileNav'
import { DoubloonCounter } from '@/components/treasure/DoubloonCounter'
import { ProgressControls } from '@/components/treasure/ProgressControls'
import type { OutlineChapter } from '@/lib/outline'

/** Frosted sticky header. Canonical recipe from the dashboard-design system. */
export function TopBar({ outline }: { outline: OutlineChapter[] }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-[var(--s-3)] border-b border-[var(--line-1)] bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] px-[var(--s-4)] py-[var(--s-3)] backdrop-blur-xl backdrop-saturate-150 sm:px-[var(--s-5)]">
      <MobileNav outline={outline} />
      <span className="font-serif text-[15px] tracking-[-0.01em] text-[var(--ink-1)] lg:hidden">
        The Money Map
      </span>
      <div className="flex-1" />
      <DoubloonCounter />
      <ProgressControls variant="chip" />
      <SearchTrigger />
      <ThemeToggle />
    </header>
  )
}
