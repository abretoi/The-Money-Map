'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('mm-theme') as Theme | null
    const system = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
    setTheme(stored ?? system)
  }, [])

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      window.localStorage.setItem('mm-theme', next)
    } catch {
      /* non-critical */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="grid size-9 place-items-center rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] text-[var(--ink-2)] transition-all duration-[var(--d-fast)] ease-[var(--ease)] hover:border-[var(--line-2)] hover:text-[var(--ink-1)]"
    >
      {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  )
}
