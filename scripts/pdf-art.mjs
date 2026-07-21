/**
 * Cinematic pirate art for the generated PDFs — struck-gold reliefs, matching
 * the web app's Pirate.tsx. Filled silhouettes painted with a metallic gold
 * gradient (defined once by `goldDefs()` and referenced by id), outlined in
 * dark engraving lines. Not flat line-art.
 *
 * Raw SVG strings (a plain Node script can't import the React components).
 */

export const ink = '#241d10'
export const cream = '#f4ecd8'
export const parchment = '#efe6cd'
export const darkbg = '#0e0f0b'
export const gold = '#c9a24a'
const GOLD = 'url(#mm-gold)'
const LINE = '#2a1e06'
const relief = 'filter="url(#mm-relief)"'

/** Global paint defs — include once near the top of each PDF's <body>. */
export const goldDefs = () => `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="mm-gold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fff2c2"/>
    <stop offset="24%" stop-color="#ecca77"/>
    <stop offset="52%" stop-color="#c9a24a"/>
    <stop offset="76%" stop-color="#9a7526"/>
    <stop offset="100%" stop-color="#6b4e12"/>
  </linearGradient>
  <radialGradient id="mm-gold-radial" cx="50%" cy="42%" r="60%">
    <stop offset="0%" stop-color="#ecca77" stop-opacity="0.5"/>
    <stop offset="60%" stop-color="#9a7526" stop-opacity="0.1"/>
    <stop offset="100%" stop-color="#6b4e12" stop-opacity="0"/>
  </radialGradient>
  <filter id="mm-relief" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="1" stdDeviation="1.1" flood-color="#000" flood-opacity="0.45"/>
  </filter>
</defs></svg>`

export const compassStar = () => `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="47" fill="url(#mm-gold-radial)"/>
  <g ${relief}>
    <circle cx="50" cy="50" r="45" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="45" fill="none" stroke="${LINE}" stroke-width="0.8"/>
    <circle cx="50" cy="50" r="37" fill="none" stroke="${LINE}" stroke-width="0.8" stroke-opacity="0.5"/>
    <path d="M50 50 L26 26 L44 42 Z M50 50 L74 26 L56 42 Z M50 50 L74 74 L56 58 Z M50 50 L26 74 L44 58 Z" fill="${LINE}" fill-opacity="0.55"/>
    <path d="M50 6 L56 46 L50 50 L44 46 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1"/>
    <path d="M50 94 L44 54 L50 50 L56 54 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1" opacity="0.85"/>
    <path d="M6 50 L46 44 L50 50 L46 56 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1"/>
    <path d="M94 50 L54 56 L50 50 L54 44 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1"/>
    <circle cx="50" cy="50" r="4.5" fill="${GOLD}" stroke="${LINE}" stroke-width="1.2"/>
  </g>
</svg>`

export const pirateShip = () => `
<svg viewBox="0 0 120 104" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M40 10 V64 M72 4 V64 M40 20 L72 14 M40 34 L72 30" stroke="${LINE}" stroke-width="1.6"/>
  <path d="M40 14 C20 18 18 34 24 48 L40 44 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <path d="M40 18 C58 22 60 38 55 52 L40 48 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4" opacity="0.92"/>
  <path d="M72 8 C50 13 48 34 54 52 L72 47 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <path d="M72 12 C94 17 96 36 90 54 L72 49 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4" opacity="0.92"/>
  <path d="M72 4 L88 7 L72 11 Z" fill="${LINE}"/>
  <path d="M12 64 L108 64 C102 84 84 92 60 92 C36 92 18 84 12 64 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="2"/>
  <path d="M12 64 L108 64 C106 70 104 73 102 74 L18 74 C16 73 14 70 12 64 Z" fill="${LINE}" fill-opacity="0.22"/>
  <path d="M24 78 h6 v6 h-6 Z M40 78 h6 v6 h-6 Z M56 78 h6 v6 h-6 Z M72 78 h6 v6 h-6 Z M88 78 h6 v6 h-6 Z" fill="${LINE}" fill-opacity="0.5"/>
</g><path d="M4 96 C14 91 20 100 32 95 C44 90 50 100 62 95 C74 90 80 100 92 95 C104 90 110 100 116 96" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.6"/></svg>`

export const jollyRoger = () => `
<svg viewBox="0 0 74 82" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3 V80" stroke="${LINE}" stroke-width="2.4"/>
  <path d="M12 5 L70 5 L61 22 L70 39 L12 39 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6" ${relief}/>
  <path d="M35 11 C41 11 45 15 45 20 C45 23 43 25 43 27 L41 30 H29 L27 27 C27 25 25 23 25 20 C25 15 29 11 35 11 Z" fill="${LINE}"/>
  <circle cx="31" cy="20" r="2.4" fill="${GOLD}"/><circle cx="39" cy="20" r="2.4" fill="${GOLD}"/>
  <path d="M22 33 L48 15 M22 15 L48 33" stroke="${LINE}" stroke-width="2.4" stroke-linecap="round"/>
</svg>`

export const lighthouse = () => `
<svg viewBox="0 0 56 92" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M20 30 L18 84 H38 L36 30 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <path d="M18.6 44 H37.4 L37 52 H19 Z M18.2 62 H37.8 L37.4 70 H18.6 Z" fill="${LINE}" fill-opacity="0.28"/>
  <rect x="17" y="20" width="22" height="10" rx="1.5" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <path d="M22 20 V11 H34 V20 Z" fill="${LINE}" fill-opacity="0.5" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M23 11 L28 3 L33 11 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
</g>
<path d="M39 15 L56 8 M39 24 L56 30 M17 15 L0 8 M17 24 L0 30" stroke="${GOLD}" stroke-width="1.4" opacity="0.5"/>
<circle cx="28" cy="25" r="3" fill="#fff2c2"/></svg>`

export const goldPile = () => `
<svg viewBox="0 0 84 62" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <ellipse cx="26" cy="50" rx="22" ry="8" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <ellipse cx="26" cy="43" rx="22" ry="8" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <ellipse cx="56" cy="52" rx="24" ry="9" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <circle cx="42" cy="20" r="13" fill="${GOLD}" stroke="${LINE}" stroke-width="1.8"/>
  <path d="M42 13 L44 19 L42 20 Z M42 27 L40 21 L42 20 Z M35 20 L41 18 L42 20 Z M49 20 L43 22 L42 20 Z" fill="${LINE}"/>
  <circle cx="66" cy="32" r="9" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <circle cx="18" cy="32" r="8" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
</g></svg>`

export const crossedSwords = () => `
<svg viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M12 8 L54 54 L50 58 L8 12 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M62 8 L20 54 L24 58 L66 12 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.2"/>
  <path d="M6 6 L22 6 L14 18 Z" fill="${LINE}"/><path d="M68 6 L52 6 L60 18 Z" fill="${LINE}"/>
  <path d="M50 58 L60 68 M24 58 L14 68" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="61" cy="69" r="3.4" fill="${GOLD}" stroke="${LINE}" stroke-width="1"/>
  <circle cx="13" cy="69" r="3.4" fill="${GOLD}" stroke="${LINE}" stroke-width="1"/>
</g></svg>`

export const cannon = () => `
<svg viewBox="0 0 92 58" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M14 24 H66 C72 24 78 28 78 33 C78 38 72 42 66 42 H14 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <ellipse cx="14" cy="33" rx="5" ry="9" fill="${LINE}"/>
  <path d="M18 42 L28 54 H58 L66 42 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <circle cx="32" cy="53" r="4.5" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <circle cx="58" cy="53" r="4.5" fill="${GOLD}" stroke="${LINE}" stroke-width="1.4"/>
  <circle cx="86" cy="30" r="5.5" fill="${GOLD}" stroke="${LINE}" stroke-width="1.2"/>
</g></svg>`

export const rum = () => `
<svg viewBox="0 0 40 74" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M15 5 H25 V16 C25 18 30 22 30 30 V62 C30 66 27 69 24 69 H16 C13 69 10 66 10 62 V30 C10 22 15 18 15 16 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <rect x="13" y="1" width="14" height="5" rx="1" fill="${LINE}"/>
  <rect x="11" y="34" width="18" height="22" rx="2" fill="${LINE}" fill-opacity="0.85"/>
  <path d="M15 41 h10 M15 45 h10 M15 49 h10" stroke="${GOLD}" stroke-width="1" opacity="0.7"/>
</g></svg>`

export const jewel = () => `
<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <path d="M15 20 H43 L54 29 L29 54 L4 29 Z" fill="${GOLD}" stroke="${LINE}" stroke-width="1.6"/>
  <path d="M15 20 L21 29 L29 54 L37 29 L43 20 M4 29 H54 M21 29 L29 20 L37 29" fill="none" stroke="${LINE}" stroke-width="1" stroke-opacity="0.55"/>
  <path d="M15 20 L21 12 H37 L43 20 Z" fill="${LINE}" fill-opacity="0.3" stroke="${LINE}" stroke-width="1.2"/>
</g></svg>`

export const treasureChest = () => `
<svg viewBox="0 0 44 36" xmlns="http://www.w3.org/2000/svg"><g ${relief}>
  <circle cx="15" cy="13" r="2.6" fill="${GOLD}"/><circle cx="22" cy="11" r="2.6" fill="${GOLD}"/><circle cx="29" cy="13" r="2.6" fill="${GOLD}"/>
  <path d="M6 17 Q6 7 22 7 Q38 7 38 17" fill="${GOLD}" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="6" y="17" width="32" height="15" rx="2" fill="${GOLD}" stroke="${LINE}" stroke-width="1.5"/>
  <line x1="6" y1="22" x2="38" y2="22" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="20" y="20" width="4" height="5" rx="0.8" fill="${LINE}"/>
</g></svg>`

/** Frieze row used between sections. */
export const frieze = (op = 0.85) => `
<div class="frieze" style="opacity:${op}">
  ${lighthouse()}${crossedSwords()}${goldPile()}${pirateShip()}${compassStar()}${jollyRoger()}${cannon()}${rum()}${jewel()}
</div>`
