'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import Fuse from 'fuse.js'
import { FUSE_OPTIONS, type SearchDoc } from '@/lib/search'

/**
 * ⌘K search palette.
 *
 * The index is fetched lazily on first open, so the ~90k words of extracted
 * content never enter the initial bundle. Fuse is constructed once per index
 * load, not per keystroke.
 */
export function SearchTrigger() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [docs, setDocs] = useState<SearchDoc[] | null>(null)
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open || docs) return
    fetch('/search-index.json')
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => setDocs([]))
  }, [open, docs])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    else {
      setQuery('')
      setCursor(0)
    }
  }, [open])

  const fuse = useMemo(
    () => (docs ? new Fuse(docs, FUSE_OPTIONS) : null),
    [docs]
  )

  const results = useMemo(() => {
    if (!fuse || query.trim().length < 2) return []
    return fuse.search(query).slice(0, 8)
  }, [fuse, query])

  function go(url: string) {
    setOpen(false)
    router.push(url)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    }
    if (e.key === 'Enter' && results[cursor]) {
      go(results[cursor].item.url)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-[var(--s-2)] rounded-[var(--r-md)] border border-[var(--line-1)] bg-[var(--bg-2)] px-[var(--s-3)] py-[7px] text-[13px] text-[var(--ink-3)] transition-all duration-[var(--d-fast)] ease-[var(--ease)] hover:border-[var(--line-2)] hover:text-[var(--ink-2)]"
      >
        <Search size={14} aria-hidden />
        <span className="hidden sm:inline">Search maps</span>
        <kbd className="ml-[var(--s-3)] hidden rounded border border-[var(--line-1)] px-[5px] py-px font-sans text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-[var(--s-4)] pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-[560px] overflow-hidden rounded-[var(--r-xl)] border border-[var(--line-2)] bg-[var(--bg-1)] shadow-[var(--shadow-3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-[var(--s-3)] border-b border-[var(--line-1)] px-[var(--s-5)] py-[var(--s-4)]">
              <Search size={16} aria-hidden className="text-[var(--ink-3)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setCursor(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Search 92 maps…"
                className="w-full border-0 bg-transparent text-[15px] text-[var(--ink-1)] outline-none placeholder:text-[var(--ink-3)]"
              />
            </div>

            {results.length > 0 && (
              <ul className="m-0 max-h-[52vh] list-none overflow-y-auto p-[var(--s-2)]">
                {results.map((r, i) => (
                  <li key={r.item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => go(r.item.url)}
                      className="w-full rounded-[var(--r-md)] px-[var(--s-3)] py-[var(--s-3)] text-left transition-colors duration-[var(--d-fast)]"
                      style={{
                        background:
                          i === cursor ? 'var(--bg-3)' : 'transparent',
                      }}
                    >
                      <span className="block text-[14px] text-[var(--ink-1)]">
                        {r.item.title}
                      </span>
                      <span className="mt-[2px] block line-clamp-1 text-[12px] text-[var(--ink-3)]">
                        {r.item.summary}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <p className="m-0 px-[var(--s-5)] py-[var(--s-6)] text-center text-[13px] text-[var(--ink-3)]">
                No maps match “{query}”.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
