import { motion, useReducedMotion } from 'framer-motion'

type Props = { checked: boolean; onChange: (v: boolean) => void; label: string }

const W = 64
const H = 34
const PAD = 4
const THUMB = H - PAD * 2
const TRAVEL = W - THUMB - PAD * 2

/** A small day/night pill switch — sun sliding through clouds when on, moon through stars when off. */
export function Toggle({ checked, onChange, label }: Props) {
  const reduce = useReducedMotion()
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 32 }
  const fade = { duration: reduce ? 0 : 0.32, ease: 'easeInOut' as const }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        width: W,
        height: H,
        borderRadius: 'var(--r-pill)',
        position: 'relative',
        flexShrink: 0,
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 3px rgba(28, 25, 22, 0.22)',
      }}
    >
      {/* Night layer: ink sky + scattered stars, clustered opposite the moon */}
      <motion.span
        aria-hidden
        animate={{ opacity: checked ? 0 : 1 }}
        transition={fade}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #3a3429 0%, var(--ink) 55%, #100e0c 100%)' }}
      >
        {[
          { x: 38, y: 8, s: 3 },
          { x: 50, y: 17, s: 2 },
          { x: 42, y: 24, s: 2 },
          { x: 55, y: 8, s: 2 },
        ].map((star, i) => (
          <motion.span
            key={i}
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={reduce ? undefined : { duration: 1.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: star.x, top: star.y, width: star.s, height: star.s, borderRadius: '50%', background: '#fff' }}
          />
        ))}
        <span style={{ position: 'absolute', left: 46, top: 12, width: 8, height: 8, color: '#fff', fontSize: 8, lineHeight: '8px' }}>✦</span>
      </motion.span>

      {/* Day layer: dusty-blue sky + soft clouds, clustered opposite the sun */}
      <motion.span
        aria-hidden
        animate={{ opacity: checked ? 1 : 0 }}
        transition={fade}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #cfe3ea 0%, var(--info) 55%, #5f92a3 100%)' }}
      >
        <span style={{ position: 'absolute', left: 30, top: 18, width: 20, height: 10, borderRadius: 'var(--r-pill)', background: 'rgba(255,255,255,0.85)' }} />
        <span style={{ position: 'absolute', left: 40, top: 11, width: 16, height: 9, borderRadius: 'var(--r-pill)', background: 'rgba(255,255,255,0.75)' }} />
        <span style={{ position: 'absolute', left: 24, top: 10, width: 12, height: 7, borderRadius: 'var(--r-pill)', background: 'rgba(255,255,255,0.7)' }} />
      </motion.span>

      {/* Thumb: sun or moon */}
      <motion.span
        animate={{ left: checked ? PAD + TRAVEL : PAD }}
        transition={spring}
        style={{ position: 'absolute', top: PAD, width: THUMB, height: THUMB, borderRadius: '50%' }}
      >
        <motion.span
          aria-hidden
          animate={{ opacity: checked ? 1 : 0 }}
          transition={fade}
          style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ffe3ab, var(--gold) 55%, var(--gold-deep) 100%)', boxShadow: '0 0 10px var(--gold-glow), 0 2px 4px rgba(28,25,22,0.25)' }}
        />
        <motion.span
          aria-hidden
          animate={{ opacity: checked ? 0 : 1 }}
          transition={fade}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ffffff, var(--surface-2) 60%, var(--muted-2) 100%)', boxShadow: '0 2px 4px rgba(28,25,22,0.25)' }}
        >
          <span style={{ position: 'absolute', left: 6, top: 7, width: 5, height: 5, borderRadius: '50%', background: 'rgba(28,25,22,0.14)' }} />
          <span style={{ position: 'absolute', left: 15, top: 13, width: 4, height: 4, borderRadius: '50%', background: 'rgba(28,25,22,0.12)' }} />
          <span style={{ position: 'absolute', left: 9, top: 17, width: 3, height: 3, borderRadius: '50%', background: 'rgba(28,25,22,0.12)' }} />
        </motion.span>
      </motion.span>
    </button>
  )
}
