/**
 * Shared inline-SVG pirate art for the generated PDFs.
 *
 * The PDFs are self-contained HTML rendered by headless Chrome, so the art is
 * embedded as raw SVG strings here (the React components can't be imported into
 * a plain Node script). Kept visually consistent with components/art.
 */

export const gold = '#c9a24a'
export const ink = '#12130f'
export const cream = '#fbf7ec'

export const compassRose = (c = gold) => `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="46" stroke="${c}" stroke-width="1.5" opacity="0.5"/>
  <circle cx="50" cy="50" r="38" stroke="${c}" stroke-width="0.75" opacity="0.3"/>
  <path d="M50 6 L57 43 L50 50 Z" fill="${c}"/>
  <path d="M50 94 L43 57 L50 50 Z" fill="${c}" opacity="0.55"/>
  <path d="M6 50 L43 43 L50 50 Z" fill="${c}" opacity="0.7"/>
  <path d="M94 50 L57 57 L50 50 Z" fill="${c}" opacity="0.7"/>
  <path d="M19 19 L46 46 L44 40 Z" fill="${c}" opacity="0.4"/>
  <path d="M81 81 L54 54 L56 60 Z" fill="${c}" opacity="0.4"/>
  <path d="M81 19 L54 46 L60 44 Z" fill="${c}" opacity="0.4"/>
  <path d="M19 81 L46 54 L40 56 Z" fill="${c}" opacity="0.4"/>
  <circle cx="50" cy="50" r="4" fill="${c}"/>
</svg>`

export const pirateShip = (c = gold) => `
<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 12 V64 M72 6 V64" stroke="${c}" stroke-width="2"/>
  <path d="M40 16 C22 20 20 34 24 46 L40 42 Z" stroke="${c}" stroke-width="1.8"/>
  <path d="M40 20 C56 24 58 38 54 50 L40 46 Z" stroke="${c}" stroke-width="1.8" opacity="0.85"/>
  <path d="M72 10 C52 15 50 32 55 48 L72 44 Z" stroke="${c}" stroke-width="1.8"/>
  <path d="M72 14 C90 19 92 34 88 50 L72 46 Z" stroke="${c}" stroke-width="1.8" opacity="0.85"/>
  <path d="M72 6 L86 9 L72 12 Z" fill="${c}"/>
  <path d="M14 64 L106 64 C100 82 84 90 60 90 C36 90 20 82 14 64 Z" stroke="${c}" stroke-width="2.4"/>
  <path d="M20 72 L100 72" stroke="${c}" stroke-width="1.2" opacity="0.5"/>
  <path d="M6 92 C14 88 20 96 30 92 C40 88 46 96 56 92 C66 88 72 96 82 92 C92 88 98 96 114 92" stroke="${c}" stroke-width="1.6" opacity="0.55"/>
</svg>`

export const jollyRoger = (c = gold) => `
<svg viewBox="0 0 72 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4 V78" stroke="${c}" stroke-width="2.4"/>
  <path d="M12 6 L68 6 L60 22 L68 38 L12 38 Z" stroke="${c}" stroke-width="2"/>
  <circle cx="34" cy="18" r="8" stroke="${c}" stroke-width="1.6"/>
  <circle cx="31" cy="17" r="1.8" fill="${c}"/><circle cx="37" cy="17" r="1.8" fill="${c}"/>
  <path d="M32 23 L32 26 M36 23 L36 26" stroke="${c}" stroke-width="1.2"/>
  <path d="M22 30 L46 14 M22 14 L46 30" stroke="${c}" stroke-width="1.6" opacity="0.8"/>
</svg>`

export const lighthouse = (c = gold) => `
<svg viewBox="0 0 56 88" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 30 L18 82 H38 L36 30 Z" stroke="${c}" stroke-width="2"/>
  <path d="M19 46 H37 M18.6 60 H37.4 M18 74 H38" stroke="${c}" stroke-width="1.2" opacity="0.55"/>
  <rect x="18" y="20" width="20" height="10" rx="1.5" stroke="${c}" stroke-width="1.8"/>
  <path d="M22 20 V12 H34 V20 Z" stroke="${c}" stroke-width="1.8"/>
  <path d="M24 12 L28 4 L32 12 Z" stroke="${c}" stroke-width="1.8"/>
  <path d="M38 16 L54 10 M38 24 L54 28" stroke="${c}" stroke-width="1.4" opacity="0.5"/>
  <path d="M18 16 L2 10 M18 24 L2 28" stroke="${c}" stroke-width="1.4" opacity="0.5"/>
</svg>`

export const goldPile = (c = gold) => `
<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="24" cy="44" rx="18" ry="7" stroke="${c}" stroke-width="1.8"/>
  <ellipse cx="24" cy="38" rx="18" ry="7" stroke="${c}" stroke-width="1.8"/>
  <ellipse cx="52" cy="47" rx="20" ry="8" stroke="${c}" stroke-width="1.8"/>
  <circle cx="40" cy="20" r="12" stroke="${c}" stroke-width="2"/>
  <circle cx="40" cy="20" r="8" stroke="${c}" stroke-width="1" opacity="0.6"/>
  <path d="M40 14 L42 19 L40 20 Z M40 26 L38 21 L40 20 Z" fill="${c}"/>
  <circle cx="62" cy="30" r="8" stroke="${c}" stroke-width="1.6" opacity="0.85"/>
  <circle cx="18" cy="30" r="7" stroke="${c}" stroke-width="1.6" opacity="0.85"/>
</svg>`

export const crossedSwords = (c = gold) => `
<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 10 L52 54 M58 14 L20 58" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M8 10 L20 10 L14 18 Z" stroke="${c}" stroke-width="1.6"/>
  <path d="M64 14 L52 14 L58 22 Z" stroke="${c}" stroke-width="1.6"/>
  <path d="M48 56 L58 66 M24 60 L14 68" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="36" cy="36" r="3" fill="${c}"/>
</svg>`

export const treasureChest = (c = gold, open = true) => `
<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${open ? `<circle cx="14" cy="12" r="2.3" fill="${c}"/><circle cx="20" cy="10" r="2.3" fill="${c}"/><circle cx="26" cy="12" r="2.3" fill="${c}"/>` : ''}
  <path d="${open ? 'M5 15 Q5 6 20 6 Q35 6 35 15' : 'M5 15 Q5 9 20 9 Q35 9 35 15'}" stroke="${c}" stroke-width="1.5" fill="none"/>
  <rect x="5" y="15" width="30" height="13" rx="2" stroke="${c}" stroke-width="1.5" fill="none"/>
  <line x1="5" y1="20" x2="35" y2="20" stroke="${c}" stroke-width="1.5"/>
  <rect x="18" y="18" width="4" height="4" rx="0.8" fill="${c}"/>
</svg>`

export const rum = (c = gold) => `
<svg viewBox="0 0 40 72" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4 H24 V16 C24 18 30 22 30 30 V62 C30 66 27 68 24 68 H16 C13 68 10 66 10 62 V30 C10 22 16 18 16 16 Z" stroke="${c}" stroke-width="2"/>
  <rect x="14" y="1" width="12" height="5" rx="1" stroke="${c}" stroke-width="1.6"/>
  <rect x="12" y="34" width="16" height="20" rx="2" stroke="${c}" stroke-width="1.4" opacity="0.6"/>
</svg>`

export const cannon = (c = gold) => `
<svg viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 26 H66 C70 26 74 29 74 33 V37 C74 41 70 42 66 42 H14 Z" stroke="${c}" stroke-width="2"/>
  <circle cx="12" cy="34" r="7" stroke="${c}" stroke-width="2"/>
  <path d="M20 42 L30 52 H60 L68 42" stroke="${c}" stroke-width="2"/>
  <circle cx="34" cy="52" r="4" stroke="${c}" stroke-width="1.6"/><circle cx="58" cy="52" r="4" stroke="${c}" stroke-width="1.6"/>
</svg>`

export const jewel = (c = gold) => `
<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 20 H42 L52 28 L28 52 L4 28 Z" stroke="${c}" stroke-width="2"/>
  <path d="M14 20 L20 28 L28 52 M42 20 L36 28 L28 52 M4 28 H52 M20 28 L28 20 L36 28" stroke="${c}" stroke-width="1.2" opacity="0.6"/>
  <path d="M14 20 L20 12 H36 L42 20" stroke="${c}" stroke-width="1.6" opacity="0.7"/>
</svg>`

/** A frieze row used between sections in the PDF. */
export const frieze = (c = gold, op = 0.5) => `
<div class="frieze" style="opacity:${op}">
  ${lighthouse(c)}${crossedSwords(c)}${goldPile(c)}${pirateShip(c)}${compassRose(c)}${jollyRoger(c)}${cannon(c)}${rum(c)}${jewel(c)}
</div>`
