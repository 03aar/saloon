import type { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './Chip.module.css'

type Props = {
  children: ReactNode
  size?: 'xs' | 'sm' | 'md'
  tone?: 'default' | 'soft' | 'tint' | 'tintLight' | 'dark'
  selected?: boolean
  /** Selected style with gold border instead of gold fill. */
  selectedStyle?: 'fill' | 'outline'
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export function Chip({ children, size = 'md', tone = 'default', selected, selectedStyle = 'fill', leading, trailing, className, onClick }: Props) {
  const cls = [
    s.chip,
    size !== 'md' ? s[size] : '',
    tone !== 'default' ? s[tone] : '',
    selected ? (selectedStyle === 'fill' ? s.selected : s.outlineSelected) : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {leading}
      <span>{children}</span>
      {trailing}
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={cls} onClick={onClick} aria-pressed={selected}>
        {content}
      </button>
    )
  }
  return <span className={cls}>{content}</span>
}
