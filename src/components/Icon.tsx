import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import type { CSSProperties } from 'react'

type Props = {
  icon: IconSvgElement
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
  style?: CSSProperties
  'aria-hidden'?: boolean
}

/** Single Hugeicons entry point so every icon in the product shares the same stroke weight. */
export function Icon({ icon, size = 20, strokeWidth = 1.6, color = 'currentColor', className, style }: Props) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      className={className}
      style={style}
      aria-hidden
    />
  )
}
