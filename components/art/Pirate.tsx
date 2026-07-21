/**
 * Cinematic pirate iconography — struck-gold reliefs, not flat line-art.
 *
 * Each motif is a filled silhouette painted with the metallic `url(#mm-gold)`
 * gradient (defined in GoldDefs), outlined in dark engraving lines, and lifted
 * with the `#mm-relief` drop-shadow filter. The result reads as antique
 * treasure — struck coins, heraldic seals, weathered charts — rather than
 * cartoon icons. Follows the skill's skeuomorphic / hyperreal direction.
 *
 * `GOLD` and `LINE` centralise the paint so callers stay simple.
 */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { title?: string }

const GOLD = 'url(#mm-gold)'
const LINE = '#3a2a08'
const relief = 'url(#mm-relief)'

const svg = (title?: string) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': !title,
  role: title ? ('img' as const) : undefined,
})

/**
 * Medallion — a struck-gold coin frame. Wrap any inner content to present it as
 * a treasure emblem (beveled ring, gleam, engraved field).
 */
export function Medallion({
  children,
  title,
  ...p
}: P & { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="47" fill="url(#mm-gold-radial)" />
      <circle cx="50" cy="50" r="44" fill={GOLD} stroke={LINE} strokeWidth="1.5" filter={relief} />
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--gold-highlight)" strokeWidth="0.8" strokeOpacity="0.6" />
      <circle cx="50" cy="50" r="37" fill="none" stroke={LINE} strokeWidth="1" strokeOpacity="0.4" />
      {/* engraved rope dots */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2
        return <circle key={i} cx={50 + Math.cos(a) * 40.5} cy={50 + Math.sin(a) * 40.5} r="0.8" fill={LINE} fillOpacity="0.5" />
      })}
      <g filter={relief}>{children}</g>
    </svg>
  )
}

export function Crest({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 64 74" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M32 3 L59 12 V38 C59 55 46 66 32 71 C18 66 5 55 5 38 V12 Z" fill={GOLD} stroke={LINE} strokeWidth="2" filter={relief} />
      <path d="M32 3 L59 12 V38 C59 55 46 66 32 71 C18 66 5 55 5 38 V12 Z" fill="none" stroke="var(--gold-highlight)" strokeWidth="0.8" strokeOpacity="0.5" />
      <path d="M8 38 C8 22 20 17 32 12 C44 17 56 22 56 38 L32 34 Z" fill={LINE} fillOpacity="0.16" />
      <circle cx="32" cy="35" r="11" fill="none" stroke={LINE} strokeWidth="1.6" />
      <path d="M32 26 L34.5 33.5 L32 35 Z M32 44 L29.5 36.5 L32 35 Z M23 35 L30.5 32.5 L32 35 Z M41 35 L33.5 37.5 L32 35 Z" fill={LINE} />
      <path d="M14 48 H50 M19 55 H45" stroke={LINE} strokeWidth="1.4" strokeOpacity="0.55" />
    </svg>
  )
}

export function PirateShip({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 120 104" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter="url(#mm-relief-lg)">
        {/* masts + rigging */}
        <path d="M40 10 V64 M72 4 V64 M40 20 L72 14 M40 34 L72 30" stroke={LINE} strokeWidth="1.6" />
        {/* sails (billowed, filled) */}
        <path d="M40 14 C20 18 18 34 24 48 L40 44 Z" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <path d="M40 18 C58 22 60 38 55 52 L40 48 Z" fill={GOLD} stroke={LINE} strokeWidth="1.4" opacity="0.92" />
        <path d="M72 8 C50 13 48 34 54 52 L72 47 Z" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <path d="M72 12 C94 17 96 36 90 54 L72 49 Z" fill={GOLD} stroke={LINE} strokeWidth="1.4" opacity="0.92" />
        {/* flag */}
        <path d="M72 4 L88 7 L72 11 Z" fill={LINE} />
        {/* hull */}
        <path d="M12 64 L108 64 C102 84 84 92 60 92 C36 92 18 84 12 64 Z" fill={GOLD} stroke={LINE} strokeWidth="2" />
        <path d="M12 64 L108 64 C106 70 104 73 102 74 L18 74 C16 73 14 70 12 64 Z" fill={LINE} fillOpacity="0.22" />
        <path d="M24 78 h6 v6 h-6 Z M40 78 h6 v6 h-6 Z M56 78 h6 v6 h-6 Z M72 78 h6 v6 h-6 Z M88 78 h6 v6 h-6 Z" fill={LINE} fillOpacity="0.5" />
      </g>
      {/* sea */}
      <path d="M4 96 C14 91 20 100 32 95 C44 90 50 100 62 95 C74 90 80 100 92 95 C104 90 110 100 116 96" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.6" />
    </svg>
  )
}

export function JollyRoger({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 74 82" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <path d="M12 3 V80" stroke={LINE} strokeWidth="2.4" />
      <path d="M12 5 L70 5 L61 22 L70 39 L12 39 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" filter={relief} />
      <path d="M12 5 L70 5 L61 22 L70 39 L12 39 Z" fill="none" stroke="var(--gold-highlight)" strokeWidth="0.7" strokeOpacity="0.5" />
      {/* skull */}
      <path d="M35 11 C41 11 45 15 45 20 C45 23 43 25 43 27 L41 30 H29 L27 27 C27 25 25 23 25 20 C25 15 29 11 35 11 Z" fill={LINE} />
      <circle cx="31" cy="20" r="2.4" fill={GOLD} />
      <circle cx="39" cy="20" r="2.4" fill={GOLD} />
      <path d="M33 25 L33 29 M37 25 L37 29" stroke={GOLD} strokeWidth="1.1" />
      <path d="M22 33 L48 15 M22 15 L48 33" stroke={LINE} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Lighthouse({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 56 92" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M20 30 L18 84 H38 L36 30 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <path d="M18.6 44 H37.4 L37 52 H19 Z M18.2 62 H37.8 L37.4 70 H18.6 Z" fill={LINE} fillOpacity="0.28" />
        <rect x="17" y="20" width="22" height="10" rx="1.5" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <path d="M22 20 V11 H34 V20 Z" fill={LINE} fillOpacity="0.5" stroke={LINE} strokeWidth="1.2" />
        <path d="M23 11 L28 3 L33 11 Z" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
      </g>
      {/* light beams */}
      <path d="M39 15 L56 8 M39 24 L56 30 M39 20 H56" stroke={GOLD} strokeWidth="1.4" opacity="0.5" />
      <path d="M17 15 L0 8 M17 24 L0 30 M17 20 H0" stroke={GOLD} strokeWidth="1.4" opacity="0.5" />
      <circle cx="28" cy="25" r="3" fill="var(--gold-highlight)" />
    </svg>
  )
}

export function GoldPile({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 84 62" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <ellipse cx="26" cy="50" rx="22" ry="8" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <ellipse cx="26" cy="43" rx="22" ry="8" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <ellipse cx="56" cy="52" rx="24" ry="9" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        {/* struck coins */}
        <circle cx="42" cy="20" r="13" fill={GOLD} stroke={LINE} strokeWidth="1.8" />
        <circle cx="42" cy="20" r="9" fill="none" stroke={LINE} strokeWidth="1" strokeOpacity="0.5" />
        <path d="M42 13 L44 19 L42 20 Z M42 27 L40 21 L42 20 Z M35 20 L41 18 L42 20 Z M49 20 L43 22 L42 20 Z" fill={LINE} />
        <circle cx="66" cy="32" r="9" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <circle cx="18" cy="32" r="8" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <circle cx="66" cy="32" r="5.5" fill="none" stroke={LINE} strokeWidth="0.8" strokeOpacity="0.5" />
      </g>
    </svg>
  )
}

export function CrossedSwords({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 74 74" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        {/* blades */}
        <path d="M12 8 L54 54 L50 58 L8 12 Z" fill={GOLD} stroke={LINE} strokeWidth="1.2" />
        <path d="M62 8 L20 54 L24 58 L66 12 Z" fill={GOLD} stroke={LINE} strokeWidth="1.2" />
        {/* guards + grips */}
        <path d="M6 6 L22 6 L14 18 Z" fill={LINE} />
        <path d="M68 6 L52 6 L60 18 Z" fill={LINE} />
        <path d="M50 58 L60 68 M24 58 L14 68" stroke={LINE} strokeWidth="4" strokeLinecap="round" />
        <circle cx="61" cy="69" r="3.4" fill={GOLD} stroke={LINE} strokeWidth="1" />
        <circle cx="13" cy="69" r="3.4" fill={GOLD} stroke={LINE} strokeWidth="1" />
      </g>
    </svg>
  )
}

export function Cannon({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 92 58" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M14 24 H66 C72 24 78 28 78 33 C78 38 72 42 66 42 H14 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <ellipse cx="14" cy="33" rx="5" ry="9" fill={LINE} />
        <path d="M18 42 L28 54 H58 L66 42 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <circle cx="32" cy="53" r="4.5" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <circle cx="58" cy="53" r="4.5" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        <circle cx="86" cy="30" r="5.5" fill={GOLD} stroke={LINE} strokeWidth="1.2" />
      </g>
    </svg>
  )
}

export function Rum({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 40 74" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M15 5 H25 V16 C25 18 30 22 30 30 V62 C30 66 27 69 24 69 H16 C13 69 10 66 10 62 V30 C10 22 15 18 15 16 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <rect x="13" y="1" width="14" height="5" rx="1" fill={LINE} />
        <rect x="11" y="34" width="18" height="22" rx="2" fill={LINE} fillOpacity="0.85" />
        <path d="M15 41 h10 M15 45 h10 M15 49 h10" stroke={GOLD} strokeWidth="1" opacity="0.7" />
        <circle cx="20" cy="46" r="0" />
      </g>
    </svg>
  )
}

export function Jewel({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 58 58" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M15 20 H43 L54 29 L29 54 L4 29 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <path d="M15 20 L21 29 L29 54 L37 29 L43 20 M4 29 H54 M21 29 L29 20 L37 29" fill="none" stroke={LINE} strokeWidth="1" strokeOpacity="0.55" />
        <path d="M15 20 L21 12 H37 L43 20 Z" fill={LINE} fillOpacity="0.3" stroke={LINE} strokeWidth="1.2" />
        <path d="M21 29 L29 20 L37 29 Z" fill="var(--gold-highlight)" fillOpacity="0.5" />
      </g>
    </svg>
  )
}

export function PirateHat({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 74 54" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M6 42 C10 18 26 8 37 8 C48 8 64 18 68 42 C57 35 45 32 37 32 C29 32 17 35 6 42 Z" fill={GOLD} stroke={LINE} strokeWidth="1.8" />
        <path d="M6 42 C20 48 54 48 68 42 L66 46 C52 51 22 51 8 46 Z" fill={LINE} fillOpacity="0.5" />
        <path d="M37 8 C37 8 31 4 24 6 M37 8 C37 8 43 4 50 6" stroke={LINE} strokeWidth="1.4" />
        {/* skull emblem */}
        <circle cx="37" cy="26" r="5.5" fill={LINE} />
        <circle cx="35" cy="25" r="1.4" fill={GOLD} />
        <circle cx="39" cy="25" r="1.4" fill={GOLD} />
        <path d="M30 32 L44 32" stroke={LINE} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function TreasureMap({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 74 62" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <path d="M16 10 H58 V52 H16 Z" fill={GOLD} stroke={LINE} strokeWidth="1.6" />
        <path d="M8 12 C10 9 14 9 16 12 V50 C14 53 10 53 8 50 Z" fill={LINE} fillOpacity="0.6" />
        <path d="M58 10 C60 7 64 7 66 10 V48 C64 51 60 51 58 48 V10 Z" fill={LINE} fillOpacity="0.6" />
        <path d="M22 42 Q30 24 40 30 T52 20" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="2 3" />
        <path d="M45 15 L53 23 M53 15 L45 23" stroke={LINE} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="23" cy="43" r="2" fill={LINE} />
        <path d="M20 20 l2 3 l3 -2 l-2 4 l3 1 l-4 1 l1 3 l-3 -2 l-3 2 l1 -3 l-4 -1 l3 -1 l-2 -4 l3 2 Z" fill={LINE} fillOpacity="0.5" />
      </g>
    </svg>
  )
}

/** Struck-gold compass rose — the cinematic centrepiece motif. */
export function CompassStar({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 100 100" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="47" fill="url(#mm-gold-radial)" />
      <g filter={relief}>
        <circle cx="50" cy="50" r="45" fill="none" stroke={GOLD} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="45" fill="none" stroke={LINE} strokeWidth="0.8" />
        <circle cx="50" cy="50" r="37" fill="none" stroke={LINE} strokeWidth="0.8" strokeOpacity="0.5" />
        {/* diagonal points */}
        <path d="M50 50 L26 26 L44 42 Z M50 50 L74 26 L56 42 Z M50 50 L74 74 L56 58 Z M50 50 L26 74 L44 58 Z" fill={LINE} fillOpacity="0.55" />
        {/* cardinal points, struck */}
        <path d="M50 6 L56 46 L50 50 L44 46 Z" fill={GOLD} stroke={LINE} strokeWidth="1" />
        <path d="M50 94 L44 54 L50 50 L56 54 Z" fill={GOLD} stroke={LINE} strokeWidth="1" opacity="0.85" />
        <path d="M6 50 L46 44 L50 50 L46 56 Z" fill={GOLD} stroke={LINE} strokeWidth="1" />
        <path d="M94 50 L54 56 L50 50 L54 44 Z" fill={GOLD} stroke={LINE} strokeWidth="1" />
        <circle cx="50" cy="50" r="4.5" fill={GOLD} stroke={LINE} strokeWidth="1.2" />
      </g>
    </svg>
  )
}

export function ShipWheel({ title, ...p }: P) {
  return (
    <svg viewBox="0 0 66 66" {...svg(title)} {...p}>
      {title && <title>{title}</title>}
      <g filter={relief}>
        <circle cx="33" cy="33" r="15" fill="none" stroke={GOLD} strokeWidth="4" />
        <circle cx="33" cy="33" r="15" fill="none" stroke={LINE} strokeWidth="1" />
        <circle cx="33" cy="33" r="6" fill={GOLD} stroke={LINE} strokeWidth="1.4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
          const r = (d * Math.PI) / 180
          const x1 = 33 + Math.cos(r) * 12
          const y1 = 33 + Math.sin(r) * 12
          const x2 = 33 + Math.cos(r) * 25
          const y2 = 33 + Math.sin(r) * 25
          return (
            <g key={d}>
              <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={GOLD} strokeWidth="3.4" strokeLinecap="round" />
              <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={LINE} strokeWidth="0.8" strokeOpacity="0.5" />
              <circle cx={x2} cy={y2} r="2.4" fill={GOLD} stroke={LINE} strokeWidth="0.8" />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
