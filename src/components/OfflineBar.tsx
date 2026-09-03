import { AnimatePresence, motion } from 'framer-motion'
import { WifiOff01Icon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import { useOnline } from '../lib/useLoad'

/** Slim banner shown whenever the browser loses connectivity. */
export function OfflineBar() {
  const online = useOnline()
  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          role="status"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 70, display: 'flex', justifyContent: 'center', padding: '10px 16px', background: 'var(--dark)', color: '#fff', fontSize: 14, gap: 8, alignItems: 'center' }}
        >
          <Icon icon={WifiOff01Icon} size={16} color="var(--gold)" /> You’re offline — changes will sync when you’re back.
        </motion.div>
      )}
    </AnimatePresence>
  )
}
