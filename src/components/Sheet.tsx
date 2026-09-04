import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useMediaQuery } from '../lib/useMediaQuery'

type Props = { open: boolean; onClose: () => void; children: ReactNode; label: string }

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Bottom sheet on phone/tablet; a centered modal card on desktop (>=1024px). */
export function Sheet({ open, onClose, children, label }: Props) {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const panelRef = useRef<HTMLDivElement>(null)
  // Read the latest onClose from a ref inside the effect below so the effect
  // itself can depend on `open` alone — callers pass a new onClose identity
  // on every render, and depending on it here would re-run the "focus the
  // first field" step on every keystroke inside the sheet, stealing focus.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    // Wait a frame so the sheet has mounted before moving focus into it.
    const raf = requestAnimationFrame(() => {
      ;(getFocusable()[0] ?? panelRef.current)?.focus()
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      // Keep Tab/Shift+Tab cycling within the sheet instead of escaping to the page behind it.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      // Return focus to whatever opened the sheet.
      trigger?.focus?.()
    }
  }, [open])

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
            ref={panelRef}
            role="dialog"
            aria-modal
            aria-label={label}
            tabIndex={-1}
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
