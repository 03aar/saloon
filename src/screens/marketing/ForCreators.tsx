import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, CreditCardIcon, InvoiceIcon, Message01Icon, SentIcon, StarIcon, UserIcon } from '@hugeicons/core-free-icons'
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
  { icon: StarIcon, t: 'Your rate card, your terms', d: 'Publish rates once. Brands see the cost up front, so every conversation starts serious.' },
  { icon: SentIcon, t: 'Pitch deals directly', d: 'Apply to open briefs or get invited straight to a deal, with no agency taking a cut.' },
  { icon: Message01Icon, t: 'One thread per deal', d: 'Brief, negotiate, submit drafts and get feedback — all in one place, no email chains.' },
  { icon: CreditCardIcon, t: 'Paid on time, every time', d: 'Funds are held in escrow from day one and release automatically once your work is approved.' },
  { icon: InvoiceIcon, t: 'A media kit that sells you', d: 'Portfolio, audience breakdown and stats in one shareable profile brands actually read.' },
  { icon: UserIcon, t: 'Verified profile', d: 'A verified badge that tells brands you\'re a real, vetted creator worth reaching out to.' },
]

const steps = [
  { n: '01', t: 'Build your profile', d: 'Add your best work, set your primary audience region and languages, and publish your rate card.' },
  { n: '02', t: 'Get discovered or pitch', d: 'Brands find you through Discover, or you pitch open deals that fit your niche.' },
  { n: '03', t: 'Negotiate & sign', d: 'Agree scope and rate in-app. The campaign is funded into escrow before you start work.' },
  { n: '04', t: 'Deliver & get paid', d: 'Submit drafts through the review flow. Once approved, payout lands on schedule.' },
]

export default function ForCreators() {
  useSeo({
    title: 'For Creators',
    description: 'Pitch brands, collaborate on campaigns and get paid through escrow — Bloop is built for GCC creators.',
    path: '/for-creators',
  })
  const nav = useNavigate()
  const { update } = useApp()
  const start = () => {
    update({ pendingRole: 'creator' })
    nav('/signup/creator')
  }

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={UserIcon} size={15} color="var(--primary)" />
              For creators
            </span>
            <h1 className={m.heroTitle}>Turn your content into real, paid partnerships.</h1>
            <p className={m.heroSub}>Get discovered by brands that fit your audience, negotiate on your own terms, and get paid securely — every time.</p>
            <div className={m.heroCtas}>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={start}>
                Get started as a creator
              </Button>
              <Button size="lg" variant="outline" onClick={() => nav('/pulse')}>
                See what creators are learning
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
            <motion.div {...fadeUp} className={m.stepsSplitArt}>
              <Art kind="noir" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
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
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.div className={m.band} {...fadeUp}>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <h2 className={m.bandTitle}>Ready to get discovered?</h2>
                <p className={m.bandSub}>Free to join. No credit card required.</p>
              </div>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={start}>
                Get started as a creator
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
