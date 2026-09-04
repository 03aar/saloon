import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, Briefcase01Icon, ChartIncreaseIcon, MessageMultiple01Icon, SearchList01Icon, SecurityCheckIcon, ShieldEnergyIcon, Target02Icon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { Art } from '../../components/Art'
import { Button } from '../../components/Button'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { useApp } from '../../store/AppContext'
import { useSeo } from '../../components/Seo'
import m from './marketing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

const values = [
  { icon: SearchList01Icon, t: 'Audience-fit matching', d: 'Every creator surfaces with a fit score built from audience overlap, engagement quality and category — not just follower count.' },
  { icon: SecurityCheckIcon, t: 'Escrow-protected campaigns', d: 'Fund the campaign once. Money sits in escrow and only releases when you approve the deliverable.' },
  { icon: MessageMultiple01Icon, t: 'One thread per deal', d: 'Brief, negotiate, review and pay — all in one conversation, with no email back-and-forth to track.' },
  { icon: Target02Icon, t: 'Approval workflows built for teams', d: 'Set who needs to sign off on content, budget, contracts and payouts, per campaign.' },
  { icon: ChartIncreaseIcon, t: 'Campaign analytics', d: 'Reach, engagement and spend across every creator, in one report you can export.' },
  { icon: ShieldEnergyIcon, t: 'Verified creators only', d: 'Every profile on Bloop is reviewed before it can accept an offer.' },
]

const steps = [
  { n: '01', t: 'Build a brief', d: 'Set your objective, budget and deliverables. Bloop scores your brief and suggests improvements before you publish it.' },
  { n: '02', t: 'Discover & shortlist', d: 'Filter by audience, category, engagement and rate. Compare your top matches side by side.' },
  { n: '03', t: 'Send offers, fund escrow', d: 'Negotiate in-app, fund the campaign, and let creators accept knowing the money is already there.' },
  { n: '04', t: 'Review & pay', d: 'Approve content through the review queue. Funds release automatically once deliverables are signed off.' },
]

export default function ForBrands() {
  useSeo({
    title: 'For Brands',
    description: 'Discover fit-scored creators, run campaigns and pay through escrow — built for brands marketing across the GCC.',
    path: '/for-brands',
  })
  const nav = useNavigate()
  const { update } = useApp()
  const start = () => {
    update({ pendingRole: 'brand' })
    nav('/signup/brand')
  }

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={Briefcase01Icon} size={15} color="var(--primary)" />
              For brands
            </span>
            <h1 className={m.heroTitle}>Run creator campaigns like a real growth channel.</h1>
            <p className={m.heroSub}>Discover vetted creators matched to your audience, manage every campaign from one dashboard, and pay with escrow-backed confidence.</p>
            <div className={m.heroCtas}>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={start}>
                Get started as a brand
              </Button>
              <Button size="lg" variant="outline" onClick={() => nav('/pulse')}>
                See what brands are learning
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <div className={m.grid3}>
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
      </section>

      <section className={[m.mesh, m.meshCool, m.section].join(' ')}>
        <div className={m.meshContent}>
          <div className={[m.container, m.stepsSplit].join(' ')}>
            <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {steps.map((st) => (
                <div key={st.n} style={{ display: 'flex', gap: 18 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--primary)', flexShrink: 0, width: 30 }}>{st.n}</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{st.t}</div>
                    <p style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>{st.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className={m.stepsSplitArt}>
              <Art kind="marble" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.div className={m.band} {...fadeUp}>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <h2 className={m.bandTitle}>Ready to launch your next campaign?</h2>
                <p className={m.bandSub}>Free to join. No credit card required.</p>
              </div>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={start}>
                Get started as a brand
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
