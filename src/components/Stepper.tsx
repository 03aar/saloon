import { Tick02Icon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import s from './Stepper.module.css'

type Props = { step: number; total: number; variant?: 'bar' | 'circles' | 'pills' }

export function Stepper({ step, total, variant = 'bar' }: Props) {
  const items = Array.from({ length: total }, (_, i) => i + 1)
  if (variant === 'circles') {
    return (
      <div className={s.circles} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
        {items.map((n, i) => (
          <span key={n} style={{ display: 'contents' }}>
            <span className={[s.circle, n < step ? s.done : n === step ? s.active : ''].join(' ')}>
              {n < step ? <Icon icon={Tick02Icon} size={20} strokeWidth={2.4} /> : n}
            </span>
            {i < items.length - 1 && <span className={[s.line, n < step ? s.done : ''].join(' ')} />}
          </span>
        ))}
      </div>
    )
  }
  if (variant === 'pills') {
    return (
      <div className={s.pills} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
        {items.map((n) => (
          <span key={n} className={[s.pill, n <= step ? s.done : ''].join(' ')} />
        ))}
      </div>
    )
  }
  return (
    <div className={s.bar} role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>
      {items.map((n) => (
        <span key={n} className={[s.barSeg, n <= step ? s.done : ''].join(' ')} />
      ))}
    </div>
  )
}
