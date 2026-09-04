import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Agreement02Icon,
  ArrowRight02Icon,
  BarChartIcon,
  Briefcase01Icon,
  CheckmarkBadge02Icon,
  Message01Icon,
  SearchList01Icon,
  SecurityCheckIcon,
  SparklesIcon,
  Tag01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Art } from '../components/Art'
import { MarketingNav } from '../components/MarketingNav'
import { ScrollRail } from '../components/ScrollRail'
import { Footer } from '../components/Footer'
import { useApp } from '../store/AppContext'
import { insights } from '../data/insights'
import m from './marketing/marketing.module.css'
import s from './Landing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease },
}

const sections = [
  { id: 'hero', label: 'Bloop' },
  { id: 'vision', label: 'Our vision' },
  { id: 'marketplace', label: 'The marketplace' },
  { id: 'how', label: 'How it works' },
  { id: 'pulse', label: 'Bloop Pulse' },
  { id: 'join', label: 'Get started' },
]

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
  { icon: SearchList01Icon, t: 'Discover & match', d: 'Brands search by audience fit and category. Creators surface in deals built for them.' },
  { icon: Agreement02Icon, t: 'Collaborate with confidence', d: 'Briefs, approvals and messaging live in one thread — no back-and-forth over email.' },
  { icon: Wallet02Icon, t: 'Get paid, grow together', d: 'Funds sit in escrow until deliverables are approved, then payout is instant.' },
]

const features = [
  { icon: SecurityCheckIcon, t: 'Escrow-protected payments', d: 'Every campaign is funded upfront and held securely until content is approved.' },
  { icon: CheckmarkBadge02Icon, t: 'In-app content review', d: 'Approve drafts, request edits, and track revisions without leaving Bloop.' },
  { icon: Message01Icon, t: 'Real-time messaging', d: 'Brief, negotiate and manage a collaboration in one continuous conversation.' },
  { icon: UserGroupIcon, t: 'Audience-fit matching', d: 'Match score, audience overlap and engagement rate — before you ever reach out.' },
  { icon: BarChartIcon, t: 'Campaign analytics', d: 'Track reach, engagement and spend across every creator in one report.' },
  { icon: Tag01Icon, t: 'Transparent rate cards', d: 'Creators publish their own rates; brands know the cost before they offer.' },
]

export default function Landing() {
  const nav = useNavigate()
  const { update } = useApp()
  const [subscribed, setSubscribed] = useState(false)

  const startAs = (role: 'brand' | 'creator') => {
    update({ pendingRole: role })
    nav(role === 'brand' ? '/signup/brand' : '/signup/creator')
  }

  return (
    <motion.main className={[m.page, s.page].join(' ')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />
      <ScrollRail sections={sections} />

      <section id="hero" className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={SparklesIcon} size={15} color="var(--primary)" />
              Creator partnerships, curated
            </span>
            <h1 className={m.heroTitle}>Where ambitious brands meet extraordinary creators.</h1>
            <p className={m.heroSub}>
              Bloop is the marketplace built for real partnerships — discover the right fit, run campaigns with confidence, and get paid on time, every time.
            </p>
            <div className={m.heroCtas}>
              <Button size="lg" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => startAs('brand')}>
                Get started as a brand
              </Button>
              <Button size="lg" variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => startAs('creator')}>
                Get started as a creator
              </Button>
            </div>
            <p className={s.heroNote}>Free to join · No credit card required</p>

            <div className={s.stats}>
              {stats.map(([v, l]) => (
                <div key={l} className={s.stat}>
                  <div className={s.statVal}>{v}</div>
                  <div className={s.statLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className={m.section}>
        <div className={[m.container, s.vision].join(' ')}>
          <motion.div {...fadeUp}>
            <span className={m.eyebrow}>Our vision</span>
            <h2 className={s.visionTitle}>
              A great partnership isn't a transaction. It's two audiences recognizing something real in each other — and we build for that recognition, not for volume.
            </h2>
            <p className={m.sectionLead}>
              Bloop exists because creator marketing kept breaking down at the same three points: finding the right fit, trusting the other side, and getting paid on time. We built the matching, the escrow and the approval flow so none of those points break anymore.
            </p>
            <Button variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => nav('/about')} style={{ marginTop: 28 }}>
              More about Bloop
            </Button>
          </motion.div>
          <motion.div className={s.visionArt} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <Art kind="glow" />
          </motion.div>
        </div>
      </section>

      <section id="marketplace" className={[m.mesh, m.meshCool, m.section].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <div className={s.split}>
              <motion.article className={[s.splitCard, s.splitBrand].join(' ')} {...fadeUp}>
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

              <motion.article className={[s.splitCard, s.splitCreator].join(' ')} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
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
            </div>
          </div>
        </div>
      </section>

      <section id="how" className={m.section}>
        <div className={m.container}>
          <motion.h2 className={[m.sectionTitle, s.centerTitle].join(' ')} {...fadeUp}>
            How Bloop works
          </motion.h2>
          <div className={m.grid3} style={{ marginTop: 48 }}>
            {steps.map((st, i) => (
              <motion.div key={st.t} className={m.card} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <span className={m.cardIcon}>
                  <Icon icon={st.icon} size={22} strokeWidth={1.3} />
                </span>
                <div className={m.cardTitle}>{st.t}</div>
                <p className={m.cardDesc}>{st.d}</p>
              </motion.div>
            ))}
          </div>

          <div className={m.grid3} style={{ marginTop: 24 }}>
            {features.map((f, i) => (
              <motion.div key={f.t} className={m.card} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 3) * 0.06 }}>
                <span className={m.cardIcon}>
                  <Icon icon={f.icon} size={22} strokeWidth={1.3} />
                </span>
                <div className={m.cardTitle}>{f.t}</div>
                <p className={m.cardDesc}>{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pulse" className={m.section}>
        <div className={m.container}>
          <div className={s.pulseHead}>
            <div>
              <span className={m.eyebrow}>Bloop Pulse</span>
              <h2 className={m.sectionTitle} style={{ marginTop: 10 }}>
                Data and playbooks from the marketplace
              </h2>
            </div>
            <Button variant="outline" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => nav('/pulse')}>
              Read Bloop Pulse
            </Button>
          </div>
          <div className={s.pulseList}>
            {insights.slice(0, 3).map((a) => (
              <button key={a.slug} type="button" className={m.articleRow} onClick={() => nav(`/pulse/${a.slug}`)}>
                <span className={m.articleThumb}>
                  <Art kind={a.art} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className={m.articleKicker}>{a.kicker}</span>
                  <span className={m.articleTitle} style={{ display: 'block' }}>
                    {a.title}
                  </span>
                  <span className={m.articleMeta}>
                    {a.author} · {a.date} · {a.readMins} min read
                  </span>
                </span>
                <Icon icon={ArrowRight02Icon} size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.div className={m.band} {...fadeUp}>
            <div className={s.bandInner}>
              <div>
                <h2 className={m.bandTitle}>Sign up for Bloop Pulse</h2>
                <p className={m.bandSub}>Data, playbooks and rate benchmarks from the marketplace — straight to your inbox, roughly monthly.</p>
                {subscribed ? (
                  <p className={s.subscribedNote}>
                    <Icon icon={CheckmarkBadge02Icon} size={18} color="var(--success)" /> You're subscribed. Welcome to Bloop Pulse.
                  </p>
                ) : (
                  <form
                    className={m.bandForm}
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubscribed(true)
                    }}
                  >
                    <input className={m.bandInput} type="email" placeholder="Email address" required aria-label="Email address" />
                    <Button type="submit">Subscribe</Button>
                  </form>
                )}
                <p className={m.bandNote}>By subscribing you agree to our Privacy Policy.</p>
              </div>
              <div className={s.bandCtas}>
                <Button size="lg" onClick={() => startAs('brand')}>
                  Get started as a brand
                </Button>
                <Button size="lg" variant="soft" onClick={() => startAs('creator')}>
                  Get started as a creator
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
