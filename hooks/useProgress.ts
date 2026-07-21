'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { progressStore } from '@/lib/progress-store'

/**
 * Reading progress + bookmarks, backed by the shared module-level store so
 * every consumer updates the instant a lesson is completed. See
 * lib/progress-store.ts for the storage and cross-tab-sync details.
 */
export function useProgress() {
  const state = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot
  )

  // `hydrated` gates first paint so server and client markup match: on the
  // server (and the very first client render) it is false, and we treat
  // progress as unknown until the store has read localStorage.
  const hydrated = useSyncExternalStore(
    progressStore.subscribe,
    () => progressStore.isHydrated(),
    () => false
  )

  const isRead = useCallback(
    (url: string) => hydrated && Boolean(state.read[url]),
    [state.read, hydrated]
  )
  const isBookmarked = useCallback(
    (url: string) => hydrated && state.bookmarks.includes(url),
    [state.bookmarks, hydrated]
  )

  const markRead = useCallback((url: string) => progressStore.markRead(url), [])
  const toggleBookmark = useCallback(
    (url: string) => progressStore.toggleBookmark(url),
    []
  )
  const reset = useCallback(() => progressStore.reset(), [])
  const serialize = useCallback(() => progressStore.serialize(), [])
  const restore = useCallback((json: string) => progressStore.restore(json), [])

  return {
    hydrated,
    readCount: Object.keys(state.read).length,
    isRead,
    isBookmarked,
    markRead,
    toggleBookmark,
    reset,
    serialize,
    restore,
  }
}
