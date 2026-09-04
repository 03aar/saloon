import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckmarkCircle02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import { useMediaQuery } from '../lib/useMediaQuery'

type Toast = { id: number; text: string; kind: 'success' | 'info' }
type Ctx = { toast: (text: string, kind?: Toast['kind']) => void }

const ToastCtx = createContext<Ctx>({ toast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([])
  const idRef = useRef(0)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const toast = useCallback((text: string, kind: Toast['kind'] = 'success') => {
    const id = ++idRef.current
    setItems((l) => [...l, { id, text, kind }])
    window.setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 2600)
  }, [])
  const value = useMemo(() => ({ toast }), [toast])
  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: desktop ? 28 : 'calc(var(--nav-h) + 16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
          zIndex: 60,
          padding: '0 20px',
        }}
        aria-live="polite"
      >
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--dark)',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: 999,
                boxShadow: 'var(--shadow-dark)',
                fontSize: 14,
                fontWeight: 500,
                maxWidth: 460,
              }}
            >
              <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>
                <Icon icon={t.kind === 'success' ? CheckmarkCircle02Icon : InformationCircleIcon} size={18} />
              </span>
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
