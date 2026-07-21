'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'mm-progress'

/**
 * Local-first reading progress.
 *
 * Shape is deliberately a plain serialisable record keyed by lesson URL so a
 * future sync layer (Milestone 5+) can adopt it without a migration.
 * localStorage is used rather than IndexedDB while the payload is this small;
 * the interface here is what callers depend on, so swapping the store later
 * does not touch consumers.
 */
export interface ProgressState {
  read: Record<string, number>
  bookmarks: string[]
}

const EMPTY: ProgressState = { read: {}, bookmarks: [] }

function load(): ProgressState {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return { read: parsed.read ?? {}, bookmarks: parsed.bookmarks ?? [] }
  } catch {
    return EMPTY
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY)
  const [hydrated, setHydrated] = useState(false)

  // Read after mount so server and client markup match on first paint.
  useEffect(() => {
    setState(load())
    setHydrated(true)
  }, [])

  const persist = useCallback((next: ProgressState) => {
    setState(next)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable (private mode, quota) — progress is non-critical */
    }
  }, [])

  const markRead = useCallback(
    (url: string) => {
      setState((prev) => {
        if (prev.read[url]) return prev
        const next = { ...prev, read: { ...prev.read, [url]: Date.now() } }
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next))
        } catch {
          /* non-critical */
        }
        return next
      })
    },
    []
  )

  const toggleBookmark = useCallback(
    (url: string) => {
      const has = state.bookmarks.includes(url)
      persist({
        ...state,
        bookmarks: has
          ? state.bookmarks.filter((b) => b !== url)
          : [...state.bookmarks, url],
      })
    },
    [state, persist]
  )

  const isRead = useCallback(
    (url: string) => hydrated && Boolean(state.read[url]),
    [state.read, hydrated]
  )

  const isBookmarked = useCallback(
    (url: string) => hydrated && state.bookmarks.includes(url),
    [state.bookmarks, hydrated]
  )

  return {
    hydrated,
    readCount: Object.keys(state.read).length,
    isRead,
    isBookmarked,
    markRead,
    toggleBookmark,
  }
}
