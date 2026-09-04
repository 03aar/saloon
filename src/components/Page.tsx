import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import s from './Page.module.css'

type Props = {
  children: ReactNode
  /** 'auth' = narrow centred column; 'app' = wider column with room for bottom nav; 'split' = 'auth' on phone/tablet, a two-pane desktop split screen (promo panel + form card) at >=1024px. */
  layout?: 'auth' | 'app' | 'split'
  className?: string
  /** Disable default top safe-area padding (e.g. splash). */
  bare?: boolean
  /** layout="split" only: content for the desktop-only left promo panel. */
  promo?: ReactNode
}

const variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' as const } },
}

export function Page({ children, layout = 'auth', className, bare, promo }: Props) {
  const split = layout === 'split'
  return (
    <motion.main className={[s.page, split ? s.splitPage : ''].join(' ')} variants={variants} initial="initial" animate="animate" exit="exit">
      {split && (
        <div className={s.splitPromo} aria-hidden>
          {promo}
        </div>
      )}
      <div className={[s.col, layout === 'app' ? s.app : '', split ? s.splitCol : '', bare ? '' : s.top, className ?? ''].filter(Boolean).join(' ')}>
        {children}
      </div>
    </motion.main>
  )
}

/** Sticky bottom action area with a soft fade into the page background. */
export function Footer({ children, app, className }: { children: ReactNode; app?: boolean; className?: string }) {
  return <div className={[s.footer, app ? s.footerApp : '', className ?? ''].filter(Boolean).join(' ')}>{children}</div>
}

export function TopBar({ left, center, right }: { left?: ReactNode; center?: ReactNode; right?: ReactNode }) {
  return (
    <div className={s.topbar}>
      <div className={s.topbarSide}>{left}</div>
      <div className={s.topbarCenter}>{center}</div>
      <div className={s.topbarSide} style={{ justifyContent: 'flex-end' }}>
        {right}
      </div>
    </div>
  )
}

export function Grow() {
  return <div className={s.grow} />
}
