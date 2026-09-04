import type { IconSvgElement } from '@hugeicons/react'
import { Icon } from './Icon'

type Props = { icon: IconSvgElement; size?: number; iconSize?: number; tone?: 'tint' | 'outline' | 'gold' | 'dark' | 'surface'; strokeWidth?: number }

/** Circular icon holder used across cards (soft gold tint, outline or solid). */
export function IconTile({ icon, size = 48, iconSize = 22, tone = 'tint', strokeWidth = 1.6 }: Props) {
  const styles: Record<NonNullable<Props['tone']>, React.CSSProperties> = {
    tint: { background: 'var(--gold-tint)', border: '1px solid var(--gold-soft)', color: 'var(--gold-deep)' },
    outline: { background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink)' },
    gold: { background: 'var(--gold)', color: 'var(--ink)' },
    dark: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--gold)' },
    surface: { background: 'var(--surface-2)', color: 'var(--ink)' },
  }
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...styles[tone],
      }}
    >
      <Icon icon={icon} size={iconSize} strokeWidth={strokeWidth} />
    </span>
  )
}
