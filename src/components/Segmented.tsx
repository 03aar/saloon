import { useLayoutEffect, useRef, useState } from 'react'
import s from './Segmented.module.css'

type Item = { id: string; label: string; count?: number }
type Props = {
  items: Item[]
  value: string
  onChange: (id: string) => void
  variant?: 'soft' | 'gold' | 'dark' | 'underline'
  size?: 'md' | 'sm'
  /** Show a small gold dot under the active item (Campaigns tabs). */
  dot?: boolean
  className?: string
}

export function Segmented({ items, value, onChange, variant = 'soft', size = 'md', dot, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState({ left: 4, width: 0 })

  useLayoutEffect(() => {
    const el = ref.current?.querySelector<HTMLButtonElement>(`[data-id="${CSS.escape(value)}"]`)
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [value, items])

  return (
    <div ref={ref} role="tablist" className={[s.wrap, variant !== 'soft' ? s[variant] : '', size === 'sm' ? s.sm : '', className ?? ''].join(' ')}>
      <span className={s.pill} style={{ left: pill.left, width: pill.width }} aria-hidden />
      {items.map((it) => {
        const on = it.id === value
        return (
          <button key={it.id} data-id={it.id} role="tab" aria-selected={on} type="button" className={[s.item, on ? s.active : ''].join(' ')} onClick={() => onChange(it.id)}>
            {it.label}
            {typeof it.count === 'number' && <span className={s.count}>{it.count}</span>}
            {dot && on && <span className={s.dot} aria-hidden />}
          </button>
        )
      })}
    </div>
  )
}
