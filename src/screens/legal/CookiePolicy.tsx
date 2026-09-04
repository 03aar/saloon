import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CookieIcon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { useSeo } from '../../components/Seo'
import m from '../marketing/marketing.module.css'
import l from './legal.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const LAST_UPDATED = 'September 1, 2026'

const categories = [
  {
    name: 'Essential',
    canDisable: false,
    desc: 'Required for the Service to function — signing in, keeping you signed in across pages, remembering items in an active session, and protecting against fraud (e.g. CSRF tokens). Bloop does not work without these.',
  },
  {
    name: 'Functional',
    canDisable: true,
    desc: 'Remember your preferences, such as your role (brand or creator), dismissed prompts, and display settings, so you don\'t have to reset them on every visit.',
  },
  {
    name: 'Analytics',
    canDisable: true,
    desc: 'Help us understand how Bloop is used — pages visited, features used, and where people drop off — so we can find and fix problems and prioritize what to build next. Data is aggregated and used internally; we do not use it to build cross-site advertising profiles.',
  },
]

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'what-are-cookies',
    title: 'What cookies are',
    body: (
      <p className={l.p}>
        Cookies are small text files placed on your device when you visit a website. We also use similar
        technologies — local storage and analytics SDKs in our mobile-web experience — that work in comparable
        ways. This policy uses "cookies" to cover all of these.
      </p>
    ),
  },
  {
    id: 'categories',
    title: 'The cookies we use',
    body: (
      <>
        {categories.map((c) => (
          <div key={c.name} style={{ marginBottom: 20 }}>
            <h3 className={l.h3} style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 0 }}>
              {c.name}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: c.canDisable ? 'var(--card, rgba(0,0,0,0.05))' : 'rgba(222, 138, 122, 0.16)',
                  color: c.canDisable ? 'var(--muted)' : 'var(--primary)',
                }}
              >
                {c.canDisable ? 'Optional' : 'Always on'}
              </span>
            </h3>
            <p className={l.p} style={{ marginBottom: 0 }}>{c.desc}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party cookies',
    body: (
      <p className={l.p}>
        Some analytics and payment-related cookies are set by trusted third-party providers we use to run the
        Service (for example, our analytics provider and our payment/escrow processor's fraud-prevention tooling).
        These providers only receive the data necessary to perform their function for us and are contractually
        restricted from using it for their own purposes.
      </p>
    ),
  },
  {
    id: 'managing',
    title: 'Managing your preferences',
    body: (
      <>
        <p className={l.p}>You can control cookies in a few ways:</p>
        <ul className={l.ul}>
          <li>Most browsers let you block or delete cookies in their privacy settings — note that blocking essential cookies will break core parts of Bloop, such as staying signed in.</li>
          <li>Functional and analytics cookies can be turned off from your in-app notification and privacy settings once signed in.</li>
          <li>Where required by law, we'll ask for your consent to non-essential cookies via a banner on your first visit, and you can change your choice at any time from the same settings.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p className={l.p}>
        We may update this Cookie Policy as the cookies and technologies we use change. Material changes will be
        reflected in the "Last updated" date above, and where required we'll ask for renewed consent.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <p className={l.contact}>
        <strong>Cayana Technologies Inc</strong> (operating Bloop)
        <br />
        Dubai, United Arab Emirates
        <br />
        Privacy inquiries: <a href="mailto:privacy@bloop.com" style={{ color: 'var(--primary)' }}>privacy@bloop.com</a>
      </p>
    ),
  },
]

export default function CookiePolicy() {
  useSeo({
    title: 'Cookie Policy',
    description: 'The cookies and similar technologies Bloop uses, and how to manage your preferences.',
    path: '/legal/cookies',
  })

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={CookieIcon} size={15} color="var(--primary)" />
              Legal
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(34px, 5vw, 54px)' }}>Cookie Policy</h1>
            <p className={m.heroSub}>What we use cookies for on Bloop, and how to manage them.</p>
            <p className={l.updated}>Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      <div className={l.doc}>
        <nav className={l.toc} aria-label="Table of contents">
          <div className={l.tocTitle}>On this page</div>
          <div className={l.tocList}>
            {sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}>{i + 1}. {s.title}</a>
            ))}
          </div>
        </nav>

        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className={l.section}>
            <div className={l.sectionNum}>{String(i + 1).padStart(2, '0')}</div>
            <h2 className={l.h2}>{s.title}</h2>
            {s.body}
          </section>
        ))}

        <div className={l.note}>
          This Cookie Policy is provided for general transparency about Bloop's use of cookies and does not
          constitute legal advice on cookie-consent compliance in any particular jurisdiction.
        </div>
      </div>

      <Footer />
    </motion.main>
  )
}
