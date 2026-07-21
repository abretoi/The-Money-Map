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
  CompassStar,
} from './Pirate'

/**
 * A frieze of struck-gold pirate reliefs — a cinematic divider between
 * sections. The pieces are filled metallic emblems (see Pirate.tsx), so this
 * reads as a row of treasure, not a strip of icons. Kept atmospheric via
 * opacity so it frames content without shouting.
 */
export function PirateFrieze({
  className = '',
  opacity = 0.5,
}: {
  className?: string
  opacity?: number
}) {
  const cls = 'shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]'
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex items-center justify-center gap-[clamp(1rem,4vw,3.5rem)] overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <Lighthouse className={`${cls} h-16 w-auto`} />
      <CrossedSwords className={`${cls} h-14 w-auto`} />
      <GoldPile className={`${cls} h-14 w-auto`} />
      <PirateShip className={`${cls} h-24 w-auto`} />
      <CompassStar className={`${cls} h-16 w-auto`} />
      <JollyRoger className={`${cls} h-20 w-auto`} />
      <Cannon className={`${cls} h-12 w-auto`} />
      <Rum className={`${cls} h-16 w-auto`} />
      <Jewel className={`${cls} h-12 w-auto`} />
    </div>
  )
}

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
  compass: CompassStar,
} as const

export type MotifName = keyof typeof MOTIFS

/**
 * A large treasure relief floated behind page content — bold but atmospheric.
 * Higher default opacity than before because these are now dimensional gold
 * emblems that hold up as a backdrop rather than reading as flat clip-art.
 */
export function PirateBackdrop({
  motif,
  className = '',
  opacity = 0.12,
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
      className={`pointer-events-none absolute drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] ${className}`}
    />
  )
}
