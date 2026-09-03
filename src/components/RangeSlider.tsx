import s from './RangeSlider.module.css'

type Props = {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (v: [number, number]) => void
  minLabel?: string
  maxLabel?: string
  /** Hollow white thumbs with gold border (Refine match style). */
  hollow?: boolean
  ariaLabel?: string
}

export function RangeSlider({ min, max, step = 1, value, onChange, minLabel, maxLabel, hollow, ariaLabel = 'Range' }: Props) {
  const [lo, hi] = value
  const pct = (v: number) => ((v - min) / (max - min)) * 100
  const cls = [s.input, hollow ? s.hollow : ''].join(' ')
  return (
    <div>
      <div className={s.wrap}>
        <span className={s.track} />
        <span className={s.fill} style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }} />
        <input
          className={cls}
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          aria-label={`${ariaLabel} minimum`}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
        />
        <input
          className={cls}
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          aria-label={`${ariaLabel} maximum`}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
        />
      </div>
      {(minLabel || maxLabel) && (
        <div className={s.labels}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  )
}
