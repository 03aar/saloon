import { useId } from 'react'

/**
 * The Bloop icon mark: 8 curved petals in rotational symmetry, evoking a
 * bloom/flower — pairs with <Wordmark> the way a lockup icon sits beside a
 * wordmark. Single path, repeated by rotation, so it stays crisp at favicon
 * sizes as well as hero sizes.
 */
export function BrandMark({ size = 32, color = 'currentColor', className }: { size?: number; color?: string; className?: string }) {
  // <use href="#id"> resolves against the whole document, not just this
  // <svg>, so a hardcoded id would collide the moment two BrandMarks render
  // on the same page (nav + footer, say) — useId keeps each instance unique.
  const petalId = `bloop-petal-${useId()}`
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill={color}>
        <path id={petalId} d="M50 50 C 50 38 52 24 58 12 C 67 18 71 32 67 43 C 64 49 57 50 50 50 Z" />
        <use href={`#${petalId}`} transform="rotate(45 50 50)" />
        <use href={`#${petalId}`} transform="rotate(90 50 50)" />
        <use href={`#${petalId}`} transform="rotate(135 50 50)" />
        <use href={`#${petalId}`} transform="rotate(180 50 50)" />
        <use href={`#${petalId}`} transform="rotate(225 50 50)" />
        <use href={`#${petalId}`} transform="rotate(270 50 50)" />
        <use href={`#${petalId}`} transform="rotate(315 50 50)" />
      </g>
    </svg>
  )
}
