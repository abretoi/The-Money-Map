/**
 * Cartographic + treasure iconography, inline SVG (no icon fonts, CSP-safe).
 *
 * These carry the pirate-map identity. Per the gold rule they are the
 * "cartographic vocabulary" that may wear gold — compass, coin, chest, banner.
 * They use `currentColor` so callers control the tint; gold is applied only on
 * treasure/earned surfaces.
 */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

/** Compass rose — the primary map motif. */
export function CompassRose({ title, ...p }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      {/* eight-point star */}
      <path d="M50 6 L57 43 L50 50 Z" fill="currentColor" opacity="0.9" />
      <path d="M50 94 L43 57 L50 50 Z" fill="currentColor" opacity="0.55" />
      <path d="M6 50 L43 43 L50 50 Z" fill="currentColor" opacity="0.7" />
      <path d="M94 50 L57 57 L50 50 Z" fill="currentColor" opacity="0.7" />
      <path d="M19 19 L46 46 L44 40 Z" fill="currentColor" opacity="0.4" />
      <path d="M81 81 L54 54 L56 60 Z" fill="currentColor" opacity="0.4" />
      <path d="M81 19 L54 46 L60 44 Z" fill="currentColor" opacity="0.4" />
      <path d="M19 81 L46 54 L40 56 Z" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  )
}

/** Doubloon — the reward currency. A coin stamped with a compass star. */
export function Doubloon({ title, ...p }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.16" />
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M16 7 L18 15 L16 16 Z M16 25 L14 17 L16 16 Z M7 16 L15 14 L16 16 Z M25 16 L17 18 L16 16 Z" fill="currentColor" />
    </svg>
  )
}

/** Treasure chest — chapter reward vessel. `open` shows collected gold. */
export function TreasureChest({ open = false, title, ...p }: P & { open?: boolean; title?: string }) {
  return (
    <svg viewBox="0 0 40 32" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      {open && (
        <g opacity="0.9">
          <circle cx="14" cy="12" r="2.3" fill="currentColor" />
          <circle cx="20" cy="10" r="2.3" fill="currentColor" />
          <circle cx="26" cy="12" r="2.3" fill="currentColor" />
        </g>
      )}
      {/* lid */}
      <path
        d={open ? 'M5 15 Q5 6 20 6 Q35 6 35 15' : 'M5 15 Q5 9 20 9 Q35 9 35 15'}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* body */}
      <rect x="5" y="15" width="30" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="18" width="4" height="4" rx="0.8" fill="currentColor" />
    </svg>
  )
}

/** X-marks-the-spot — completion / destination marker. */
export function MapX({ title, ...p }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Anchor — used on the disclaimer footer, echoing the source maps. */
export function Anchor({ title, ...p }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      <circle cx="12" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 6.5 V20 M6 12 H18 M4.5 15 Q6 20 12 20 Q18 20 19.5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Scroll / certificate — the voyage's final prize. */
export function Scroll({ title, ...p }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden={!title} role={title ? 'img' : undefined} {...p}>
      {title && <title>{title}</title>}
      <path d="M8 5 h14 a3 3 0 0 1 3 3 v16 a3 3 0 0 0 3 3 h-16 a3 3 0 0 1 -3 -3 V8 a3 3 0 0 0 -3 -3 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="12" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <line x1="12" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <line x1="12" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  )
}
