'use client'

import { useEffect, useState } from 'react'
import { useProgress } from './useProgress'
import {
  computeTreasure,
  type TreasureManifest,
  type TreasureState,
} from '@/lib/treasure'

/**
 * The treasure manifest (chapter → lesson URLs) is emitted at build time to
 * public/treasure-map.json. It is small, so it is fetched once and cached at
 * module scope — every useTreasure() consumer shares the single request.
 */
let manifestPromise: Promise<TreasureManifest> | null = null

function loadManifest(): Promise<TreasureManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch('/treasure-map.json')
      .then((r) => r.json())
      .catch(() => ({ totalMaps: 0, chapters: [] }))
  }
  return manifestPromise
}

export function useTreasure(): TreasureState & { hydrated: boolean } {
  const { isRead, hydrated } = useProgress()
  const [manifest, setManifest] = useState<TreasureManifest | null>(null)

  useEffect(() => {
    let live = true
    loadManifest().then((m) => live && setManifest(m))
    return () => {
      live = false
    }
  }, [])

  const ready = hydrated && manifest !== null
  const empty: TreasureManifest = manifest ?? { totalMaps: 0, chapters: [] }
  const state = computeTreasure(empty, isRead)

  return { ...state, hydrated: ready }
}
