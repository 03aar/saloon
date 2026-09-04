import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './IconButton.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'plain' | 'tint'
  active?: boolean
  dot?: boolean
  /** Renders as a pill with text next to the icon. */
  text?: ReactNode
}

export function IconButton({ label, size = 'md', variant = 'default', active, dot, text, className, children, ...rest }: Props) {
  const cls = [
    s.btn,
    size !== 'md' ? s[size] : '',
    variant !== 'default' ? s[variant] : '',
    active ? s.active : '',
    text ? s.pill : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button type="button" aria-label={label} title={label} className={cls} {...rest}>
      {children}
      {text && <span>{text}</span>}
      {dot && <span className={s.dot} aria-hidden />}
    </button>
  )
}
