/**
 * Shared progress store.
 *
 * Reading progress and bookmarks are read by many components at once (the
 * doubloon counter, the sidebar, the lesson meta, the treasure hall). They must
 * all reflect a completion the instant it happens, so state cannot live in a
 * per-component useState — it lives here, in one module-level store, surfaced
 * through useSyncExternalStore. Writes notify every subscriber and persist to
 * localStorage; a `storage` event keeps other tabs in sync too.
 *
 * The shape is deliberately a plain serialisable record keyed by lesson URL, so
 * a future cloud-sync layer can adopt it without a migration.
 */

const KEY = 'mm-progress'

export interface ProgressState {
  read: Record<string, number>
  bookmarks: string[]
}

const EMPTY: ProgressState = { read: {}, bookmarks: [] }

let state: ProgressState = EMPTY
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable (private mode, quota) — progress is non-critical */
  }
}

/** Load from localStorage once, on first client access. */
function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ProgressState>
      state = { read: parsed.read ?? {}, bookmarks: parsed.bookmarks ?? [] }
    }
  } catch {
    state = EMPTY
  }
  // Cross-tab sync.
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return
    try {
      const parsed = e.newValue
        ? (JSON.parse(e.newValue) as Partial<ProgressState>)
        : {}
      state = { read: parsed.read ?? {}, bookmarks: parsed.bookmarks ?? [] }
      emit()
    } catch {
      /* ignore malformed cross-tab payloads */
    }
  })
}

export const progressStore = {
  subscribe(listener: () => void): () => void {
    hydrate()
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  /** Stable reference while unchanged — required by useSyncExternalStore. */
  getSnapshot(): ProgressState {
    return state
  },

  /** Server render: always the empty baseline (no localStorage on the server). */
  getServerSnapshot(): ProgressState {
    return EMPTY
  },

  isHydrated(): boolean {
    return hydrated
  },

  /** Idempotent — awarding happens elsewhere; returns true if newly read. */
  markRead(url: string): boolean {
    if (state.read[url]) return false
    state = { ...state, read: { ...state.read, [url]: Date.now() } }
    persist()
    emit()
    return true
  },

  toggleBookmark(url: string): void {
    const has = state.bookmarks.includes(url)
    state = {
      ...state,
      bookmarks: has
        ? state.bookmarks.filter((b) => b !== url)
        : [...state.bookmarks, url],
    }
    persist()
    emit()
  },

  /** Wipe all progress and bookmarks. Used by the "reset voyage" control. */
  reset(): void {
    state = { read: {}, bookmarks: [] }
    persist()
    emit()
  },

  /** Serialise progress for a downloadable backup file. */
  serialize(): string {
    return JSON.stringify(
      { app: 'the-money-map', version: 1, savedAt: Date.now(), ...state },
      null,
      2
    )
  },

  /** Restore progress from a previously saved backup. Returns success. */
  restore(json: string): boolean {
    try {
      const parsed = JSON.parse(json) as Partial<ProgressState>
      state = {
        read: parsed.read ?? {},
        bookmarks: parsed.bookmarks ?? [],
      }
      persist()
      emit()
      return true
    } catch {
      return false
    }
  },
}
