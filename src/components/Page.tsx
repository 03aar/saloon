import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import s from './Page.module.css'

type Props = {
  children: ReactNode
  /** 'auth' = narrow centred column; 'app' = wider column with room for bottom nav. */
  layout?: 'auth' | 'app'
  className?: string
  /** Disable default top safe-area padding (e.g. splash). */
  bare?: boolean
}

const variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' as const } },
}

export function Page({ children, layout = 'auth', className, bare }: Props) {
  return (
    <motion.main className={s.page} variants={variants} initial="initial" animate="animate" exit="exit">
      <div className={[s.col, layout === 'app' ? s.app : '', bare ? '' : s.top, className ?? ''].filter(Boolean).join(' ')}>
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
