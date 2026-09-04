import { motion } from 'framer-motion'
import { ArrowRight02Icon, Award01Icon, Briefcase01Icon, Location01Icon, RocketIcon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { Button } from '../../components/Button'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { useToast } from '../../components/Toast'
import { useSeo } from '../../components/Seo'
import m from './marketing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

const perks = [
  { icon: Wallet02Icon, t: 'Competitive pay + equity', d: 'Every full-time role includes meaningful equity in Cayana Technologies Inc.' },
  { icon: RocketIcon, t: 'Small team, real ownership', d: 'You\'ll ship things that reach thousands of brands and creators within weeks, not quarters.' },
  { icon: Award01Icon, t: 'Learning budget', d: 'An annual budget for courses, conferences and books — no approval chain required.' },
]

const roles = [
  { t: 'Senior Product Designer', dept: 'Design', loc: 'Dubai, UAE · Hybrid' },
  { t: 'Full-Stack Engineer, Payments', dept: 'Engineering', loc: 'Dubai, UAE · Hybrid' },
  { t: 'Creator Partnerships Lead', dept: 'Operations', loc: 'Remote, GCC' },
  { t: 'Growth Marketer', dept: 'Marketing', loc: 'Dubai, UAE · Hybrid' },
  { t: 'Customer Trust & Safety Associate', dept: 'Operations', loc: 'Dubai, UAE' },
]

export default function Careers() {
  useSeo({
    title: 'Careers',
    description: 'Join Cayana Technologies Inc in Dubai and help build the trust layer for creator partnerships across the GCC.',
    path: '/careers',
  })
  const { toast } = useToast()

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={Briefcase01Icon} size={15} color="var(--primary)" />
              Careers at Bloop
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(38px, 5.6vw, 64px)' }}>
              Help us build the trust layer for creator partnerships.
            </h1>
            <p className={m.heroSub}>We're a small, product-obsessed team at Cayana Technologies Inc, based in Dubai and building for the GCC and beyond.</p>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <div className={m.grid3}>
            {perks.map((p) => (
              <motion.div key={p.t} className={m.card} {...fadeUp}>
                <span className={m.cardIcon}>
                  <Icon icon={p.icon} size={22} strokeWidth={1.3} />
                </span>
                <div className={m.cardTitle}>{p.t}</div>
                <p className={m.cardDesc}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <span className={m.eyebrow}>Open roles</span>
              <h2 className={m.sectionTitle} style={{ marginTop: 10, fontSize: 32 }}>
                Join the team
              </h2>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
              <Icon icon={UserGroupIcon} size={16} /> {roles.length} open positions
            </span>
          </div>
          <div style={{ marginTop: 12 }}>
            {roles.map((r) => (
              <button
                key={r.t}
                type="button"
                className={m.articleRow}
                onClick={() => toast(`${r.t} — applications open soon`, 'info')}
              >
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className={m.articleTitle}>{r.t}</span>
                  <span className={m.articleMeta} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Icon icon={Briefcase01Icon} size={13} /> {r.dept}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Icon icon={Location01Icon} size={13} /> {r.loc}
                    </span>
                  </span>
                </span>
                <Icon icon={ArrowRight02Icon} size={18} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.div className={m.band} {...fadeUp}>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <h2 className={m.bandTitle} style={{ margin: '0 auto', textAlign: 'center' }}>
                Don't see the right role?
              </h2>
              <p className={m.bandSub} style={{ margin: '10px auto 0', textAlign: 'center' }}>
                We're always open to meeting people who care about creator partnerships.
              </p>
              <div style={{ marginTop: 22 }}>
                <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => toast('Reach us at careers@bloop.co', 'info')}>
                  Get in touch
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
