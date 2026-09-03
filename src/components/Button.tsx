import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'soft' | 'tint' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  /** Puts the trailing icon at the far right inside a dark circular badge (Continue →). */
  spread?: boolean
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'lg',
  block,
  leading,
  trailing,
  spread,
  loading,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  const cls = [s.btn, s[variant], size !== 'lg' ? s[size] : '', block ? s.block : '', spread ? s.spread : '', className ?? '']
    .filter(Boolean)
    .join(' ')
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className={s.spinner} aria-label="Loading" />
      ) : (
        <>
          {leading && <span className={s.leading}>{leading}</span>}
          <span className={s.label}>{children}</span>
          {trailing && <span className={spread ? s.badge : s.trailing}>{trailing}</span>}
        </>
      )}
    </button>
  )
}
