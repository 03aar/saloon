import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = { open: boolean; onClose: () => void; children: ReactNode; label: string }

/** Bottom sheet that slides over the current screen (Offer ready). */
export function Sheet({ open, onClose, children, label }: Props) {
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(20, 19, 17, 0.55)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            style={{
              width: '100%',
              maxWidth: 'var(--col-app)',
              maxHeight: '92dvh',
              overflowY: 'auto',
              background: 'var(--bg)',
              borderRadius: '28px 28px 0 0',
              padding: '12px var(--page-x) calc(var(--nav-h) + 8px)',
              boxShadow: '0 -20px 60px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            <span aria-hidden style={{ display: 'block', width: 56, height: 5, borderRadius: 5, background: 'var(--line-strong)', margin: '0 auto 8px' }} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
