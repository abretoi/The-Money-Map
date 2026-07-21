import {
  PirateShip,
  Lighthouse,
  Cannon,
  GoldPile,
  JollyRoger,
  CrossedSwords,
  Rum,
  Jewel,
  PirateHat,
  TreasureMap,
  Crest,
  ShipWheel,
} from './Pirate'
import { CompassRose } from './Icons'

/**
 * A horizontal frieze of large pirate motifs — a decorative divider that makes
 * the theme unmistakable while staying atmospheric (gold, low opacity). Used
 * between sections and at page feet.
 */
export function PirateFrieze({
  className = '',
  opacity = 0.16,
}: {
  className?: string
  opacity?: number
}) {
  const cls = 'shrink-0 text-[var(--gold)]'
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex items-center justify-center gap-[clamp(1rem,4vw,3.5rem)] overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <Lighthouse className={`${cls} h-14 w-auto`} />
      <CrossedSwords className={`${cls} h-12 w-auto`} />
      <GoldPile className={`${cls} h-12 w-auto`} />
      <PirateShip className={`${cls} h-20 w-auto`} />
      <CompassRose className={`${cls} h-14 w-auto`} />
      <JollyRoger className={`${cls} h-16 w-auto`} />
      <Cannon className={`${cls} h-11 w-auto`} />
      <Rum className={`${cls} h-14 w-auto`} />
      <Jewel className={`${cls} h-11 w-auto`} />
    </div>
  )
}

/**
 * A large motif floated in a page corner as a bold-but-faint backdrop. `motif`
 * picks which piece; each page can carry a different one so the atlas feels
 * hand-illustrated rather than templated.
 */
const MOTIFS = {
  ship: PirateShip,
  wheel: ShipWheel,
  lighthouse: Lighthouse,
  crest: Crest,
  gold: GoldPile,
  flag: JollyRoger,
  swords: CrossedSwords,
  hat: PirateHat,
  map: TreasureMap,
  jewel: Jewel,
  compass: CompassRose,
} as const

export type MotifName = keyof typeof MOTIFS

export function PirateBackdrop({
  motif,
  className = '',
  opacity = 0.06,
}: {
  motif: MotifName
  className?: string
  opacity?: number
}) {
  const Art = MOTIFS[motif]
  return (
    <Art
      aria-hidden
      style={{ opacity }}
      className={`pointer-events-none absolute text-[var(--gold)] ${className}`}
    />
  )
}
