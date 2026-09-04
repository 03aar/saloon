import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, Building02Icon, GlobalIcon, HeartAddIcon, SecurityCheckIcon, Target02Icon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { Art } from '../../components/Art'
import { Button } from '../../components/Button'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { useSeo } from '../../components/Seo'
import m from './marketing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

const stats = [
  ['2023', 'Founded, in Dubai'],
  ['3,200+', 'Verified creators'],
  ['450+', 'Brand partners'],
  ['AED 42M+', 'Paid to creators'],
]

const values = [
  { icon: Target02Icon, t: 'Fit over reach', d: 'A smaller, better-matched audience beats a bigger, generic one. Every recommendation on Bloop is built around fit, not follower count.' },
  { icon: SecurityCheckIcon, t: 'Trust is infrastructure', d: 'Escrow, verification and approval flows exist because trust shouldn\'t depend on who negotiates hardest.' },
  { icon: GlobalIcon, t: 'Built for the GCC, open to the world', d: 'We started with GCC-first creators and brands, and built the matching to work for global campaigns from day one.' },
  { icon: HeartAddIcon, t: 'Creators are partners, not vendors', d: 'Every product decision asks the same question: does this make the creator side of the deal better, not just the brand side.' },
]

export default function About() {
  useSeo({
    title: 'About Bloop',
    description: 'Bloop is built by Cayana Technologies Inc in Dubai to fix matching, trust and payments between brands and creators.',
    path: '/about',
  })
  const nav = useNavigate()
  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={Building02Icon} size={15} color="var(--primary)" />
              About Bloop
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(38px, 5.6vw, 64px)' }}>
              We build the infrastructure for real creator partnerships.
            </h1>
            <p className={m.heroSub}>Bloop is built by Cayana Technologies Inc. We're a small team obsessed with the mechanics of trust — matching, escrow and approvals — so brands and creators can focus on the work.</p>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <div className={m.grid2} style={{ alignItems: 'center' }}>
            <motion.div {...fadeUp} style={{ aspectRatio: '4 / 5', borderRadius: 28, overflow: 'hidden' }}>
              <Art kind="arch" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <span className={m.eyebrow}>Our story</span>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '-0.01em', fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.3, color: 'var(--ink)', marginTop: 12 }}>
                We started Bloop after watching the same deal break down three different ways.
              </h2>
              <p className={m.sectionLead} style={{ maxWidth: 'none' }}>
                A brand couldn't find creators who actually fit their audience. A creator couldn't trust that payment would arrive on time. And when a deal did happen, it lived across five email threads and a spreadsheet no one updated.
              </p>
              <p className={m.sectionLead} style={{ maxWidth: 'none', marginTop: 14 }}>
                Cayana Technologies Inc. was founded to fix those three failure points directly, not with another content marketplace, but with the underlying infrastructure: fit-scored matching, escrow-backed payments and a single approval workflow both sides can see.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 32 }}>
                {stats.map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>{v}</div>
                    <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--muted)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={[m.mesh, m.meshCool, m.section].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <motion.h2 className={m.sectionTitle} style={{ textAlign: 'center' }} {...fadeUp}>
              What we optimize for
            </motion.h2>
            <div className={m.grid2} style={{ marginTop: 48 }}>
              {values.map((v) => (
                <motion.div key={v.t} className={m.card} {...fadeUp}>
                  <span className={m.cardIcon}>
                    <Icon icon={v.icon} size={22} strokeWidth={1.3} />
                  </span>
                  <div className={m.cardTitle}>{v.t}</div>
                  <p className={m.cardDesc}>{v.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.div className={m.band} {...fadeUp}>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <h2 className={m.bandTitle}>We're hiring across product, design and operations.</h2>
                <p className={m.bandSub}>Help us build the trust layer for creator partnerships.</p>
              </div>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => nav('/careers')}>
                View open roles
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
