import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Wordmark } from '../components/Wordmark'
import { useApp } from '../store/AppContext'
import s from './Splash.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export default function Splash() {
  const nav = useNavigate()
  const { state } = useApp()
  const next = state.session ? (state.session.role === 'brand' ? (state.onboardingComplete ? '/home' : '/onboarding/brand/profile') : '/creator') : '/welcome'

  useEffect(() => {
    const t = window.setTimeout(() => nav(next, { replace: true }), 2600)
    return () => window.clearTimeout(t)
  }, [nav, next])

  return (
    <motion.main
      className={s.root}
      onClick={() => nav(next, { replace: true })}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      aria-label="Salon"
    >
      <motion.div className={s.silk} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease }}>
        <svg className={s.fold} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path d="M0 55c22-16 40-8 60-18s28-16 40-26v89H0Z" fill="#fff" opacity=".55" />
          <path d="M0 78c26-18 44-6 64-20s24-12 36-18v60H0Z" fill="#e6d3a5" opacity=".35" />
        </svg>
      </motion.div>
      <div className={s.content}>
        <motion.div initial={{ opacity: 0, y: 18, letterSpacing: '0.02em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}>
          <Wordmark size={92} />
        </motion.div>
        <motion.span className={s.line} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, ease, delay: 0.6 }} />
        <motion.span className={s.dot} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
        <motion.p className={s.tag} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 1.3 }}>
          Creator partnerships, curated.
        </motion.p>
        <motion.div className={s.pillars} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.7 }}>
          {['Brands', 'Creators', 'Campaigns'].map((p) => (
            <span key={p} className={s.pillar}>
              <i />
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.main>
  )
}
