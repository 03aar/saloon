import type { ReactNode } from 'react'
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { Art, type ArtKind } from './Art'
import { Icon } from './Icon'
import { Wordmark } from './Wordmark'
import { BrandMark } from './BrandMark'
import s from './AuthPromo.module.css'

type Props = { art: ArtKind; eyebrow: string; title: ReactNode; bullets?: string[] }

/** Desktop-only promo panel for the split-screen auth layout (layout="split" on Page). */
export function AuthPromo({ art, eyebrow, title, bullets }: Props) {
  return (
    <div className={s.wrap}>
      <div className={s.art}>
        <Art kind={art} />
      </div>
      <div className={s.scrim} />
      <div className={s.content}>
        <div className={s.mark}>
          <BrandMark size={22} color="currentColor" />
          <Wordmark size={26} />
        </div>
        <div className={s.spacer} />
        <p className={s.eyebrow}>{eyebrow}</p>
        <h2 className={s.title}>{title}</h2>
        {bullets && (
          <ul className={s.bullets}>
            {bullets.map((b) => (
              <li key={b}>
                <Icon icon={CheckmarkCircle02Icon} size={18} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
