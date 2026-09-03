/** Lightweight SVG charts used across analytics-style cards. */

function smoothPath(points: [number, number][]) {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    const cx = (x0 + x1) / 2
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`
  }
  return d
}

type LineProps = {
  data: number[]
  width?: number
  height?: number
  color?: string
  fill?: boolean
  dot?: boolean
  strokeWidth?: number
  className?: string
  /** Faint dashed guide lines behind the curve. */
  grid?: boolean
}

export function Sparkline({ data, width = 300, height = 100, color = 'var(--gold)', fill = true, dot = true, strokeWidth = 2, className, grid }: LineProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pad = 6
  const pts: [number, number][] = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (width - pad * 2),
    height - pad - ((v - min) / Math.max(1e-6, max - min)) * (height - pad * 2 - 8),
  ])
  const line = smoothPath(pts)
  const area = `${line} L ${pts[pts.length - 1][0]} ${height} L ${pts[0][0]} ${height} Z`
  const id = `g${Math.round(width)}${Math.round(height)}${data.length}`
  const last = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid &&
        [0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={width} y1={height * g} y2={height * g} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="3 5" />
        ))}
      {fill && <path d={area} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {dot && (
        <>
          <circle cx={last[0]} cy={last[1]} r="6" fill={color} fillOpacity="0.25" />
          <circle cx={last[0]} cy={last[1]} r="3.2" fill="#fff" stroke={color} strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

export function Bars({ data, color = 'var(--gold)', track = 'var(--surface-3)', height = 90, gap = 8, radius = 6, activeIndex }: { data: number[]; color?: string; track?: string; height?: number; gap?: number; radius?: number; activeIndex?: number }) {
  const max = Math.max(...data)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap, height }}>
      {data.map((v, i) => (
        <span
          key={i}
          style={{
            flex: 1,
            height: `${(v / max) * 100}%`,
            borderRadius: radius,
            background: activeIndex === undefined || i === activeIndex ? color : track,
            transition: 'height 600ms var(--ease)',
          }}
        />
      ))}
    </div>
  )
}

export function Donut({ value, size = 150, stroke = 12, color = 'var(--gold)', track = 'var(--surface-3)', children }: { value: number; size?: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 900ms var(--ease)' }} />
      </svg>
      <span style={{ position: 'relative', textAlign: 'center' }}>{children}</span>
    </span>
  )
}
