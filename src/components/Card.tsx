import type { HTMLAttributes, ReactNode } from 'react'
import s from './Card.module.css'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  padding?: 'none' | 'md' | 'lg'
  tone?: 'default' | 'tint' | 'dark'
  flat?: boolean
  radius?: 'lg' | 'xl'
  as?: 'div' | 'button' | 'section' | 'article'
  onClick?: () => void
}

export function Card({ children, padding = 'md', tone = 'default', flat, radius = 'lg', as = 'div', className, onClick, ...rest }: Props) {
  const cls = [
    s.card,
    padding === 'md' ? s.pad : padding === 'lg' ? s.padLg : '',
    tone !== 'default' ? s[tone] : '',
    flat ? s.flat : '',
    radius === 'xl' ? s.xl : '',
    onClick || as === 'button' ? s.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
  const Tag = as as 'div'
  return (
    <Tag className={cls} onClick={onClick} {...(as === 'button' ? { type: 'button' } : {})} {...(rest as object)}>
      {children}
    </Tag>
  )
}
