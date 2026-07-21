/**
 * Global SVG paint definitions for the treasure art.
 *
 * Mounted once (in the root layout). Every art component paints with these by
 * id — `url(#mm-gold)` for struck-metal fill, `url(#mm-gold-radial)` for glow,
 * `filter="url(#mm-relief)"` for the engraved drop shadow. Following the
 * skill's skeuomorphic guidance: multi-stop metallic gradients + real shadow,
 * not flat single-colour strokes (which read as cartoon).
 */
export function GoldDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0 }}
      focusable="false"
    >
      <defs>
        {/* Metallic sheen — light rakes across from upper-left. */}
        <linearGradient id="mm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-highlight)" />
          <stop offset="22%" stopColor="var(--gold-bright)" />
          <stop offset="48%" stopColor="var(--gold-mid)" />
          <stop offset="70%" stopColor="var(--gold-deep)" />
          <stop offset="100%" stopColor="var(--gold-shadow)" />
        </linearGradient>

        {/* Brighter rim gradient for outlines/rings. */}
        <linearGradient id="mm-gold-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-highlight)" />
          <stop offset="50%" stopColor="var(--gold-mid)" />
          <stop offset="100%" stopColor="var(--gold-shadow)" />
        </linearGradient>

        {/* Radial glow behind emblems — the treasure "gleam". */}
        <radialGradient id="mm-gold-radial" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="var(--gold-deep)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--gold-shadow)" stopOpacity="0" />
        </radialGradient>

        {/* Engraved relief — soft drop shadow gives struck-metal depth. */}
        <filter id="mm-relief" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#000" floodOpacity="0.55" />
        </filter>

        {/* Deeper cinematic shadow for large scene pieces. */}
        <filter id="mm-relief-lg" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
    </svg>
  )
}
