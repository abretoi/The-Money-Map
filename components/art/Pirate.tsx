/**
 * Large pirate iconography — the bold, apparent motifs.
 *
 * Inline SVG (CSP-safe, no icon fonts), `currentColor`-driven so callers set
 * the tint. Designed to read at large sizes as decorative scene elements, not
 * small UI glyphs. Per the gold rule these are cartographic/treasure
 * vocabulary, so gold is a valid tint for them.
 */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { title?: string }
const base = (title?: string) => ({
  fill: 'none',
  'aria-hidden': !title,
  role: title ? ('img' as const) : undefined,
})

/** Heraldic crest / shield with a coin. */
export function Crest({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 64 72" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M32 3 L59 12 V38 C59 55 46 65 32 70 C18 65 5 55 5 38 V12 Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="M32 11 L51 17 V38 C51 50 42 58 32 62 C22 58 13 50 13 38 V17 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="32" cy="34" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M32 27 L34 33 L32 34 Z M32 41 L30 35 L32 34 Z M25 34 L31 32 L32 34 Z M39 34 L33 36 L32 34 Z" fill="currentColor" />
      <path d="M16 44 L48 44 M20 50 L44 50" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    </svg>
  )
}

/** Large pirate galleon under sail. */
export function PirateShip({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 120 100" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      {/* masts */}
      <path d="M40 12 V64 M72 6 V64" stroke="currentColor" strokeWidth="2" />
      {/* sails */}
      <path d="M40 16 C22 20 20 34 24 46 L40 42 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M40 20 C56 24 58 38 54 50 L40 46 Z" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
      <path d="M72 10 C52 15 50 32 55 48 L72 44 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M72 14 C90 19 92 34 88 50 L72 46 Z" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
      {/* skull flag */}
      <path d="M72 6 L86 9 L72 12 Z" fill="currentColor" />
      {/* hull */}
      <path d="M14 64 L106 64 C100 82 84 90 60 90 C36 90 20 82 14 64 Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="M20 72 L100 72" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* waves */}
      <path d="M6 92 C14 88 20 96 30 92 C40 88 46 96 56 92 C66 88 72 96 82 92 C92 88 98 96 114 92" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
    </svg>
  )
}

/** Jolly Roger — skull-and-crossbones flag on a pole. */
export function JollyRoger({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 72 80" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M12 4 V78" stroke="currentColor" strokeWidth="2.4" />
      <path d="M12 6 L68 6 L60 22 L68 38 L12 38 Z" stroke="currentColor" strokeWidth="2" />
      {/* skull */}
      <circle cx="34" cy="18" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="31" cy="17" r="1.8" fill="currentColor" />
      <circle cx="37" cy="17" r="1.8" fill="currentColor" />
      <path d="M32 23 L32 26 M36 23 L36 26" stroke="currentColor" strokeWidth="1.2" />
      {/* crossbones */}
      <path d="M22 30 L46 14 M22 14 L46 30" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
    </svg>
  )
}

/** Rum bottle. */
export function Rum({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 40 72" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M16 4 H24 V16 C24 18 30 22 30 30 V62 C30 66 27 68 24 68 H16 C13 68 10 66 10 62 V30 C10 22 16 18 16 16 Z" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="1" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="12" y="34" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <path d="M16 40 h8 M16 44 h8 M16 48 h8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/** Pile of gold coins. */
export function GoldPile({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 80 60" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <ellipse cx="24" cy="44" rx="18" ry="7" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="24" cy="38" rx="18" ry="7" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="52" cy="47" rx="20" ry="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="40" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
      <circle cx="40" cy="20" r="8" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M40 14 L42 19 L40 20 Z M40 26 L38 21 L40 20 Z" fill="currentColor" />
      <circle cx="62" cy="30" r="8" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="18" cy="30" r="7" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
    </svg>
  )
}

/** Cannon on a carriage. */
export function Cannon({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 88 56" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M14 26 H66 C70 26 74 29 74 33 V37 C74 41 70 42 66 42 H14 Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="34" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 42 L30 52 H60 L68 42" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="52" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="58" cy="52" r="4" stroke="currentColor" strokeWidth="1.6" />
      {/* smoke/ball */}
      <circle cx="82" cy="30" r="4" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/** Crossed cutlasses. */
export function CrossedSwords({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 72 72" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M14 10 L52 54 M58 14 L20 58" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8 10 L20 10 L14 18 Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M64 14 L52 14 L58 22 Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M48 56 L58 66 M24 60 L14 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="36" r="3" fill="currentColor" />
    </svg>
  )
}

/** Lighthouse with beam. */
export function Lighthouse({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 56 88" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M20 30 L18 82 H38 L36 30 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M19 46 H37 M18.6 60 H37.4 M18 74 H38" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <rect x="18" y="20" width="20" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 20 V12 H34 V20 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 12 L28 4 L32 12 Z" stroke="currentColor" strokeWidth="1.8" />
      {/* beams */}
      <path d="M38 16 L54 10 M38 24 L54 28" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <path d="M18 16 L2 10 M18 24 L2 28" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <path d="M10 82 C18 78 38 78 46 82" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
    </svg>
  )
}

/** Gemstone / jewel. */
export function Jewel({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 56 56" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M14 20 H42 L52 28 L28 52 L4 28 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 20 L20 28 L28 52 M42 20 L36 28 L28 52 M4 28 H52 M20 28 L28 20 L36 28" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M14 20 L20 12 H36 L42 20" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
    </svg>
  )
}

/** Pirate hat (tricorne) with skull. */
export function PirateHat({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 72 52" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M6 40 C10 18 26 8 36 8 C46 8 62 18 66 40 C56 34 44 32 36 32 C28 32 16 34 6 40 Z" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 40 C20 46 52 46 66 40" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="26" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M31 30 L41 30" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <path d="M28 33 L44 33 M30 25 L26 21 M42 25 L46 21" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  )
}

/** Rolled treasure map with dotted route and X. */
export function TreasureMap({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 72 60" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M8 12 C10 9 14 9 16 12 V50 C14 53 10 53 8 50 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M56 10 C58 7 62 7 64 10 V48 C62 51 58 51 56 48 Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 11 H56 V49 H16 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M22 40 Q30 24 40 30 T52 20" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" opacity="0.8" />
      <path d="M46 16 L52 22 M52 16 L46 22" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="42" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Ship's helm / wheel. */
export function ShipWheel({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 64 64" {...base(title)} {...p}>
      {title && <title>{title}</title>}
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="5" stroke="currentColor" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180
        const x1 = 32 + Math.cos(r) * 14
        const y1 = 32 + Math.sin(r) * 14
        const x2 = 32 + Math.cos(r) * 24
        const y2 = 32 + Math.sin(r) * 24
        return <path key={a} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      })}
    </svg>
  )
}
