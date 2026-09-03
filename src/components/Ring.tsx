import type { ReactNode } from 'react'

type Props = {
  value: number // 0..100
  size?: number
  stroke?: number
  track?: string
  color?: string
  children?: ReactNode
  rounded?: boolean
}

/** Circular progress ring used for match scores. */
export function Ring({ value, size = 96, stroke = 6, track = 'var(--gold-soft)', color = 'var(--gold)', children, rounded = true }: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.max(0, Math.min(100, value)) / 100)
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap={rounded ? 'round' : 'butt'}
          style={{ transition: 'stroke-dashoffset 900ms var(--ease)' }}
        />
      </svg>
      <span style={{ position: 'relative', textAlign: 'center' }}>{children}</span>
    </span>
  )
}
