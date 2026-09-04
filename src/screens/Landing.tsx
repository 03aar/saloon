import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Agreement02Icon,
  ArrowRight02Icon,
  BarChartIcon,
  Briefcase01Icon,
  CheckmarkBadge02Icon,
  Menu01Icon,
  Message01Icon,
  Search01Icon,
  SecurityCheckIcon,
  Tag01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Wordmark } from '../components/Wordmark'
import { Footer } from '../components/Footer'
import { useApp } from '../store/AppContext'
import s from './Landing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease },
}

const stats = [
  ['3,200+', 'Verified creators'],
  ['450+', 'Brand partners'],
  ['AED 42M+', 'Paid to creators'],
  ['4.9 / 5', 'Average rating'],
]

const brandFeatures = [
  'Discover vetted creators matched to your audience',
  'Launch and manage campaigns from one dashboard',
  'Review and approve content before it goes live',
  'Escrow-protected payments, released on delivery',
]

const creatorFeatures = [
  'Get discovered by brands that fit your content',
  'Pitch deals and negotiate your own rate',
  'Deliver content with a clear approval flow',
  'Get paid securely — on time, every time',
]

const steps = [
  { icon: Search01Icon, t: 'Discover & match', d: 'Brands search by audience fit and category. Creators surface in deals built for them.' },
  { icon: Agreement02Icon, t: 'Collaborate with confidence', d: 'Briefs, approvals and messaging live in one thread — no back-and-forth over email.' },
  { icon: Wallet02Icon, t: 'Get paid, grow together', d: 'Funds sit in escrow until deliverables are approved, then payout is instant.' },
]

const features = [
  { icon: SecurityCheckIcon, t: 'Escrow-protected payments', d: 'Every campaign is funded upfront and held securely until content is approved.' },
  { icon: CheckmarkBadge02Icon, t: 'In-app content review', d: 'Approve drafts, request edits, and track revisions without leaving Salon.' },
  { icon: Message01Icon, t: 'Real-time messaging', d: 'Brief, negotiate and manage a collaboration in one continuous conversation.' },
  { icon: UserGroupIcon, t: 'Audience-fit matching', d: 'Match score, audience overlap and engagement rate — before you ever reach out.' },
  { icon: BarChartIcon, t: 'Campaign analytics', d: 'Track reach, engagement and spend across every creator in one report.' },
  { icon: Tag01Icon, t: 'Transparent rate cards', d: 'Creators publish their own rates; brands know the cost before they offer.' },
]

export default function Landing() {
  const nav = useNavigate()
  const { update } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const startAs = (role: 'brand' | 'creator') => {
    update({ pendingRole: role })
    nav(role === 'brand' ? '/signup/brand' : '/signup/creator')
  }

  return (
    <motion.main className={s.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <header className={s.nav}>
        <div className={s.navInner}>
          <Wordmark size={26} />
          <nav className={s.navLinks} aria-label="Primary">
            <a href="#brands">For brands</a>
            <a href="#creators">For creators</a>
            <a href="#how">How it works</a>
          </nav>
          <div className={s.navActions}>
            <button type="button" className={s.navLogin} onClick={() => nav('/login')}>
              Log in
            </button>
            <Button size="sm" onClick={() => nav('/role')}>
              Get started
            </Button>
          </div>
          <button type="button" className={s.navMenuBtn} aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            <Icon icon={Menu01Icon} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className={s.navSheet}>
            <a href="#brands" onClick={() => setMenuOpen(false)}>For brands</a>
            <a href="#creators" onClick={() => setMenuOpen(false)}>For creators</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
            <button type="button" onClick={() => nav('/login')}>Log in</button>
            <Button block onClick={() => nav('/role')}>Get started</Button>
          </div>
        )}
      </header>

      <section className={s.hero}>
        <div className={s.heroGlow} aria-hidden />
        <p className={s.eyebrow}>Creator partnerships, curated</p>
        <h1 className={s.h1}>Where ambitious brands meet extraordinary creators.</h1>
        <p className={s.heroSub}>
          Salon is the marketplace built for real partnerships — discover the right fit, run campaigns with confidence, and get paid on time, every time.
        </p>
        <div className={s.heroCtas}>
          <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => startAs('brand')}>
            Get started as a brand
          </Button>
          <Button size="lg" variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => startAs('creator')}>
            Get started as a creator
          </Button>
        </div>
        <p className={s.heroNote}>Free to join · No credit card required</p>
      </section>

      <section className={s.stats}>
        {stats.map(([v, l]) => (
          <div key={l} className={s.stat}>
            <div className={s.statVal}>{v}</div>
            <div className={s.statLabel}>{l}</div>
          </div>
        ))}
      </section>

      <section className={s.split}>
        <motion.article id="brands" className={[s.splitCard, s.splitBrand].join(' ')} {...fadeUp}>
          <span className={s.splitIcon}>
            <Icon icon={Briefcase01Icon} size={32} strokeWidth={1.3} />
          </span>
          <h2 className={s.splitTitle}>For brands</h2>
          <p className={s.splitDesc}>Launch, collaborate and grow with creators who actually fit your brand.</p>
          <ul className={s.splitList}>
            {brandFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Button variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => startAs('brand')}>
            Start as a brand
          </Button>
        </motion.article>

        <motion.article id="creators" className={[s.splitCard, s.splitCreator].join(' ')} {...fadeUp}>
          <span className={s.splitIcon}>
            <Icon icon={UserIcon} size={32} strokeWidth={1.3} />
          </span>
          <h2 className={s.splitTitle}>For creators</h2>
          <p className={s.splitDesc}>Showcase your work and partner with brands that value what you make.</p>
          <ul className={s.splitList}>
            {creatorFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Button variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => startAs('creator')}>
            Start as a creator
          </Button>
        </motion.article>
      </section>

      <section id="how" className={s.how}>
        <motion.h2 className={s.sectionTitle} {...fadeUp}>
          How Salon works
        </motion.h2>
        <div className={s.steps}>
          {steps.map((st, i) => (
            <motion.div key={st.t} className={s.step} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <span className={s.stepNum}>{i + 1}</span>
              <span className={s.stepIcon}>
                <Icon icon={st.icon} size={26} strokeWidth={1.3} />
              </span>
              <h3 className={s.stepTitle}>{st.t}</h3>
              <p className={s.stepDesc}>{st.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={s.features}>
        <motion.h2 className={s.sectionTitle} {...fadeUp}>
          Everything a real partnership needs
        </motion.h2>
        <div className={s.featureGrid}>
          {features.map((f, i) => (
            <motion.div key={f.t} className={s.feature} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}>
              <span className={s.featureIcon}>
                <Icon icon={f.icon} size={24} strokeWidth={1.3} />
              </span>
              <h3 className={s.featureTitle}>{f.t}</h3>
              <p className={s.featureDesc}>{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section className={s.cta} {...fadeUp}>
        <h2 className={s.ctaTitle}>Ready to build something real?</h2>
        <p className={s.ctaSub}>Join Salon in minutes — no credit card, no commitment.</p>
        <div className={s.ctaButtons}>
          <Button size="lg" onClick={() => startAs('brand')}>
            Get started as a brand
          </Button>
          <Button size="lg" variant="dark" onClick={() => startAs('creator')}>
            Get started as a creator
          </Button>
        </div>
      </motion.section>

      <Footer />
    </motion.main>
  )
}
