import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ShieldEnergyIcon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { useSeo } from '../../components/Seo'
import m from '../marketing/marketing.module.css'
import l from './legal.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const LAST_UPDATED = 'September 1, 2026'

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'who-we-are',
    title: 'Who we are and what this policy covers',
    body: (
      <>
        <p className={l.p}>
          Bloop is operated by Cayana Technologies Inc ("Cayana", "Bloop", "we", "us" or "our"), a company
          headquartered in Dubai, United Arab Emirates. Bloop is a two-sided marketplace that connects brands with
          creators across the GCC and, increasingly, globally — enabling discovery, campaign management, briefing,
          messaging, content review and escrow-backed payments between the two sides.
        </p>
        <p className={l.p}>
          This Privacy Policy explains what personal data we collect when you use Bloop's website and app (the
          "Service"), why we collect it, how it's used, who we share it with, and the choices and rights you have
          over it. It applies to brands, brand team members, creators and visitors to our marketing pages alike,
          with role-specific detail called out where it differs.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <h3 className={l.h3}>Account and profile information</h3>
        <ul className={l.ul}>
          <li>Name, email address, phone number and password (or SSO identifier) when you create an account.</li>
          <li>For brands: company name, trade license or registration details, team member roles, and billing contacts.</li>
          <li>For creators: display name, bio, niche/category tags, social handles, portfolio links, physical location or city, and audience demographics you choose to share or connect via a platform integration.</li>
          <li>Profile photos, media kits, rate cards and any other content you voluntarily upload to your profile.</li>
        </ul>
        <h3 className={l.h3}>Verification and identity data</h3>
        <p className={l.p}>
          To keep the marketplace trustworthy — and to comply with UAE anti-fraud and know-your-customer norms
          applicable to payment intermediaries — we or our verification and payment partners may collect a
          government-issued ID, a selfie for liveness matching, business registration documents, and bank or payout
          account details. This category of data is processed under stricter access controls than general profile
          data (see "Payments, payouts and escrow data" below).
        </p>
        <h3 className={l.h3}>Content and communications</h3>
        <ul className={l.ul}>
          <li>Messages sent between brands and creators through Bloop's in-app messaging.</li>
          <li>Campaign briefs, deliverables, draft content, revision notes and approval comments uploaded for review.</li>
          <li>Contracts, offers and the terms of individual deals struck through the platform.</li>
        </ul>
        <h3 className={l.h3}>Payments, payouts and escrow data</h3>
        <p className={l.p}>
          When a brand funds a campaign or a creator receives a payout, our licensed payment processing and escrow
          partners handle the underlying card, bank account and settlement data. We store transaction metadata
          (amounts, dates, campaign references, escrow status) but do not store full card numbers ourselves — those
          are tokenized and held by our PCI-DSS-compliant payment processor.
        </p>
        <h3 className={l.h3}>Usage, device and analytics data</h3>
        <ul className={l.ul}>
          <li>Log data such as IP address, browser type, device identifiers, pages viewed and referring URLs.</li>
          <li>Product analytics events (e.g. searches run, filters applied, offers sent) used to understand and improve the Service.</li>
          <li>Cookies and similar technologies as described in our <a href="/legal/cookies" style={{ color: 'var(--primary)' }}>Cookie Policy</a>.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: (
      <>
        <p className={l.p}>We use personal data to:</p>
        <ul className={l.ul}>
          <li>Create and secure accounts, and authenticate sign-in.</li>
          <li>Power discovery and matching — surfacing relevant creators to brands and relevant campaigns to creators based on stated fit criteria, category and audience data.</li>
          <li>Facilitate messaging, briefs, offers, contracts, content submission and approval workflows between brands and creators.</li>
          <li>Process payments into and out of escrow, calculate fees, issue invoices and payout statements, and detect and prevent fraud.</li>
          <li>Verify identity and business legitimacy on both sides of the marketplace.</li>
          <li>Send transactional notifications (offer received, payment released, deadline approaching) and, with consent where required, product updates and marketing communications.</li>
          <li>Monitor, secure, debug and improve the Service, including through aggregated or de-identified analytics.</li>
          <li>Comply with legal obligations, including tax, accounting and anti-money-laundering requirements applicable in the UAE and other jurisdictions we operate in.</li>
        </ul>
        <p className={l.p}>
          We do not sell personal data to third parties, and we do not use creator or brand messaging content to
          train third-party advertising models.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share data with',
    body: (
      <>
        <p className={l.p}>We share personal data only as needed to run the Service:</p>
        <ul className={l.ul}>
          <li><strong>The other side of a deal.</strong> When a brand and creator engage (a pitch, offer, or active campaign), each side sees the profile, messaging and deliverable information relevant to that engagement.</li>
          <li><strong>Payment and escrow processors</strong> licensed to operate in the UAE, who handle funds transfer, identity verification and payout compliance on our behalf.</li>
          <li><strong>Service providers</strong> who host our infrastructure, send emails/SMS, provide customer support tooling, or run fraud detection — bound by contract to use data only to provide those services to us.</li>
          <li><strong>Professional advisers and regulators</strong> such as auditors, legal counsel, and government or law-enforcement bodies where required by UAE law or a valid legal process.</li>
          <li><strong>A successor entity</strong> in the event of a merger, acquisition or asset sale, subject to that entity honoring the commitments in this policy.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'international-transfer',
    title: 'International data transfer',
    body: (
      <p className={l.p}>
        Bloop serves brands and creators across the GCC and, increasingly, globally. As a result, personal data may
        be transferred to, stored, and processed in the United Arab Emirates and in other countries where we,
        our affiliates or our service providers operate — including jurisdictions whose data protection laws may
        differ from those in your home country. Where we transfer personal data internationally, we use
        contractual safeguards with our processors (such as standard data-processing terms and confidentiality
        obligations) designed to ensure your data continues to receive an appropriate level of protection wherever
        it is processed.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: (
      <p className={l.p}>
        We use cookies and similar technologies for essential site functionality, to remember preferences, and to
        understand how the Service is used. See our <a href="/legal/cookies" style={{ color: 'var(--primary)' }}>Cookie
        Policy</a> for the full list of categories we use and how to manage your preferences.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'Data retention',
    body: (
      <>
        <p className={l.p}>
          We retain personal data for as long as your account is active and as needed to provide the Service. After
          account closure, we generally retain:
        </p>
        <ul className={l.ul}>
          <li>Transaction, invoicing and payout records for the period required by UAE tax and accounting law (typically 5 years).</li>
          <li>Identity verification records for the period required by anti-money-laundering obligations applicable to our payment partners.</li>
          <li>Messages and campaign records tied to a completed deal, for a limited period, to support dispute resolution.</li>
        </ul>
        <p className={l.p}>
          Data no longer needed for these purposes is deleted or anonymized on a rolling basis.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights and choices',
    body: (
      <>
        <p className={l.p}>Subject to applicable law, you can:</p>
        <ul className={l.ul}>
          <li><strong>Access</strong> the personal data we hold about you, via your account settings or by contacting us.</li>
          <li><strong>Correct</strong> inaccurate profile, business or payout information at any time.</li>
          <li><strong>Delete</strong> your account and associated personal data, subject to the retention obligations described above (e.g. we cannot erase records of a completed, tax-relevant transaction on request).</li>
          <li><strong>Export</strong> a copy of your profile and transaction data in a portable format.</li>
          <li><strong>Object to or opt out</strong> of marketing communications at any time via the unsubscribe link or your notification settings, without affecting transactional messages needed to run active deals.</li>
        </ul>
        <p className={l.p}>
          To exercise any of these rights, use the in-app settings where available, or contact us at the address
          below. We may need to verify your identity before acting on a request.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'How we protect your data',
    body: (
      <p className={l.p}>
        We use encryption in transit and at rest for sensitive data, role-based access controls, and segregation of
        payment and identity-verification data from general application data. No system is completely secure, and
        we encourage you to use a strong, unique password and to report any suspected account compromise to us
        immediately.
      </p>
    ),
  },
  {
    id: 'children',
    title: "Children's privacy",
    body: (
      <p className={l.p}>
        Bloop is intended for businesses and individuals aged 18 and over. We do not knowingly collect personal
        data from anyone under 18. If we learn that we have collected data from a person under 18, we will delete
        it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p className={l.p}>
        We may update this policy as our Service, legal obligations or practices evolve. If we make a material
        change, we'll notify active users by email or an in-app notice before it takes effect. The "Last updated"
        date above always reflects the current version.
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
        <br />
        General support: <a href="mailto:support@bloop.com" style={{ color: 'var(--primary)' }}>support@bloop.com</a>
      </p>
    ),
  },
]

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy',
    description: "How Cayana Technologies Inc collects, uses and protects personal data on Bloop, the brand-creator marketplace.",
    path: '/legal/privacy',
  })

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={ShieldEnergyIcon} size={15} color="var(--primary)" />
              Legal
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(34px, 5vw, 54px)' }}>Privacy Policy</h1>
            <p className={m.heroSub}>How we collect, use and protect your data across Bloop.</p>
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
          This Privacy Policy is provided for general information about Bloop's data practices and does not
          constitute legal advice. If you need advice on how this policy applies to your specific situation, or on
          compliance with data protection law in your jurisdiction, please consult qualified legal counsel.
        </div>
      </div>

      <Footer />
    </motion.main>
  )
}
