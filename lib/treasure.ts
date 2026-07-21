/**
 * The doubloon economy.
 *
 * Every map (lesson) you read yields doubloons. Filling a chapter's treasure
 * chest pays a bounty on top. Collect every map and the voyage certificate is
 * minted. Pure functions here; the React surface is `hooks/useTreasure`.
 *
 * Gold is the reward currency — see memory/02_brand.md. Doubloons are the one
 * place the economy is quantified, so all the constants live together.
 */

export const DOUBLOONS_PER_MAP = 10
export const CHAPTER_CHEST_BOUNTY = 25

export interface TreasureChapter {
  slug: string
  title: string
  island: string
  lessonUrls: string[]
}

export interface TreasureManifest {
  totalMaps: number
  chapters: TreasureChapter[]
}

export interface ChapterChest {
  slug: string
  title: string
  island: string
  collected: number
  total: number
  complete: boolean
}

export interface TreasureState {
  doubloons: number
  maxDoubloons: number
  mapsCollected: number
  totalMaps: number
  chests: ChapterChest[]
  chestsFilled: number
  certificateEarned: boolean
  /** 0–100, for progress meters. */
  percent: number
}

/** Maximum doubloons obtainable: every map + every chest bounty. */
export function maxDoubloons(manifest: TreasureManifest): number {
  return (
    manifest.totalMaps * DOUBLOONS_PER_MAP +
    manifest.chapters.length * CHAPTER_CHEST_BOUNTY
  )
}

/**
 * Compute the full treasure state from the set of read lesson URLs.
 * `isRead` is passed in (rather than a raw set) so the caller can gate on
 * hydration without this function knowing about React.
 */
export function computeTreasure(
  manifest: TreasureManifest,
  isRead: (url: string) => boolean
): TreasureState {
  let mapsCollected = 0
  let doubloons = 0

  const chests: ChapterChest[] = manifest.chapters.map((c) => {
    const collected = c.lessonUrls.filter(isRead).length
    mapsCollected += collected
    doubloons += collected * DOUBLOONS_PER_MAP

    const complete = collected === c.lessonUrls.length && c.lessonUrls.length > 0
    if (complete) doubloons += CHAPTER_CHEST_BOUNTY

    return {
      slug: c.slug,
      title: c.title,
      island: c.island,
      collected,
      total: c.lessonUrls.length,
      complete,
    }
  })

  const chestsFilled = chests.filter((c) => c.complete).length
  const certificateEarned =
    manifest.totalMaps > 0 && mapsCollected === manifest.totalMaps

  return {
    doubloons,
    maxDoubloons: maxDoubloons(manifest),
    mapsCollected,
    totalMaps: manifest.totalMaps,
    chests,
    chestsFilled,
    certificateEarned,
    percent: manifest.totalMaps
      ? Math.round((mapsCollected / manifest.totalMaps) * 100)
      : 0,
  }
}

/** Rank titles earned as the hoard grows — surfaced in the UI for flavour. */
export function rankFor(percent: number): string {
  if (percent >= 100) return 'Master Cartographer'
  if (percent >= 75) return 'Ship’s Captain'
  if (percent >= 50) return 'First Mate'
  if (percent >= 25) return 'Navigator'
  if (percent > 0) return 'Deckhand'
  return 'Stowaway'
}
