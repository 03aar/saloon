import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useMediaQuery } from '../lib/useMediaQuery'

type Props = { open: boolean; onClose: () => void; children: ReactNode; label: string }

/** Bottom sheet on phone/tablet; a centered modal card on desktop (>=1024px). */
export function Sheet({ open, onClose, children, label }: Props) {
  const desktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(20, 19, 17, 0.55)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: desktop ? 'center' : 'flex-end' }}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            initial={desktop ? { opacity: 0, y: 16, scale: 0.98 } : { y: '100%' }}
            animate={desktop ? { opacity: 1, y: 0, scale: 1 } : { y: 0 }}
            exit={desktop ? { opacity: 0, y: 10, scale: 0.98 } : { y: '100%' }}
            transition={desktop ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] } : { type: 'spring', stiffness: 380, damping: 38 }}
            style={
              desktop
                ? {
                    width: '100%',
                    maxWidth: 480,
                    maxHeight: '82dvh',
                    overflowY: 'auto',
                    background: 'var(--bg)',
                    borderRadius: 'var(--r-xl)',
                    padding: '28px 28px 32px',
                    boxShadow: 'var(--shadow-md)',
                    position: 'relative',
                    margin: 24,
                  }
                : {
                    width: '100%',
                    maxWidth: 'var(--col-app)',
                    maxHeight: '92dvh',
                    overflowY: 'auto',
                    background: 'var(--bg)',
                    borderRadius: '28px 28px 0 0',
                    padding: '12px var(--page-x) calc(var(--nav-h) + 8px)',
                    boxShadow: '0 -20px 60px rgba(0,0,0,0.25)',
                    position: 'relative',
                  }
            }
          >
            {!desktop && <span aria-hidden style={{ display: 'block', width: 56, height: 5, borderRadius: 5, background: 'var(--line-strong)', margin: '0 auto 8px' }} />}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
