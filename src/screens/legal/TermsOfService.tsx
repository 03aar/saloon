import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Agreement02Icon } from '@hugeicons/core-free-icons'
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
    id: 'acceptance',
    title: 'Acceptance of these terms',
    body: (
      <p className={l.p}>
        These Terms of Service ("Terms") are a contract between you and Cayana Technologies Inc ("Cayana", "Bloop",
        "we", "us"), a company based in Dubai, United Arab Emirates, governing your access to and use of the Bloop
        website, app and related services (the "Service"). By creating an account or using the Service, you agree
        to these Terms. If you're using Bloop on behalf of a company, you're confirming you have authority to bind
        that company, and "you" refers to that company.
      </p>
    ),
  },
  {
    id: 'accounts',
    title: 'Accounts',
    body: (
      <>
        <p className={l.p}>
          To use most of Bloop you need an account, registered as either a <strong>Brand</strong> or a{' '}
          <strong>Creator</strong>. You must provide accurate information and keep it up to date, and you're
          responsible for activity that occurs under your account and for keeping your credentials confidential.
        </p>
        <ul className={l.ul}>
          <li>You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account.</li>
          <li>Brand accounts must represent a real, lawfully operating business or individual advertiser.</li>
          <li>Creator accounts must represent the individual or entity that actually controls the content and audience being represented.</li>
          <li>We may require identity or business verification before enabling payments, campaign publishing, or payout features.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p className={l.p}>You agree not to:</p>
        <ul className={l.ul}>
          <li>Misrepresent your identity, audience size, engagement metrics, or business legitimacy.</li>
          <li>Circumvent Bloop to take a deal off-platform in order to avoid fees, once that deal originated through Bloop, during the term of this restriction described in your account's applicable fee schedule.</li>
          <li>Upload content that is unlawful, infringing, defamatory, hateful, sexually explicit involving minors, or that violates a third party's intellectual property or publicity rights.</li>
          <li>Use the Service to send unsolicited bulk messages, scrape data, or reverse-engineer the platform.</li>
          <li>Attempt to manipulate escrow, ratings, verification status, or matching/ranking systems.</li>
          <li>Violate any applicable law, including UAE advertising, consumer protection and data protection law.</li>
        </ul>
        <p className={l.p}>
          We may suspend or terminate accounts that violate this section, and may withhold funds in escrow pending
          investigation of a suspected violation, in accordance with the payments section below.
        </p>
      </>
    ),
  },
  {
    id: 'campaigns-payments',
    title: 'Campaigns, escrow and payments',
    body: (
      <>
        <h3 className={l.h3}>How a deal works</h3>
        <p className={l.p}>
          Brands create campaign briefs and send offers to creators; creators pitch and accept offers. Once a
          brand and creator agree terms, the brand funds the agreed amount into escrow, held by our licensed
          payment partner, before the creator is expected to begin deliverable work.
        </p>
        <h3 className={l.h3}>Release of funds</h3>
        <ul className={l.ul}>
          <li>Funds are released from escrow to the creator once the brand approves the submitted deliverable, or automatically after the review period defined in the campaign terms elapses without an objection.</li>
          <li>Bloop charges a service fee, deducted from the transaction, disclosed to both parties before funds are committed.</li>
          <li>Disputed deliverables can be escalated to Bloop support for review; we may mediate but are not obligated to act as the final arbiter of creative quality.</li>
        </ul>
        <h3 className={l.h3}>Refunds and cancellations</h3>
        <p className={l.p}>
          Cancellation and refund eligibility depends on the stage a campaign has reached and is set out in the
          campaign-specific terms shown before a brand funds escrow. As a general rule, amounts corresponding to
          work already delivered and approved are not refundable.
        </p>
      </>
    ),
  },
  {
    id: 'content-ownership',
    title: 'Content and intellectual property',
    body: (
      <>
        <p className={l.p}>
          You retain ownership of content you upload to Bloop (profile media, portfolio pieces, campaign
          deliverables). By uploading content, you grant Bloop a limited, non-exclusive license to host, display,
          and transmit it as needed to operate the Service (for example, showing a deliverable to the brand that
          commissioned it, or a creator's portfolio to prospective brands).
        </p>
        <p className={l.p}>
          Usage rights to a specific piece of commissioned content (e.g. whether a brand may repost or run paid
          media against a creator's deliverable) are governed by the terms of that specific campaign or offer, not
          by these Terms generally — check the campaign's usage-rights terms before assuming a right to reuse
          content.
        </p>
        <p className={l.p}>
          The Bloop name, logo, and platform software are the property of Cayana Technologies Inc and may not be
          used without our written permission.
        </p>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Suspension and termination',
    body: (
      <>
        <p className={l.p}>
          You may close your account at any time from account settings. We may suspend or terminate your account
          if you materially breach these Terms, if required by law, or if we reasonably believe your account poses
          a risk to other users or to the Service.
        </p>
        <p className={l.p}>
          Termination does not relieve either party of obligations that accrued before termination — including
          completing an in-progress escrow release or paying an outstanding fee.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers-liability',
    title: 'Disclaimers and limitation of liability',
    body: (
      <>
        <p className={l.p}>
          Bloop is a marketplace that connects brands and creators; we are not a party to the underlying
          brand-creator agreement and do not guarantee the quality, legality, or outcome of any campaign. The
          Service is provided "as is" without warranties of any kind, to the maximum extent permitted by law.
        </p>
        <p className={l.p}>
          To the maximum extent permitted by applicable law, Cayana Technologies Inc's aggregate liability arising
          out of or relating to the Service will not exceed the fees you paid to Bloop in the twelve months before
          the claim arose, and we are not liable for indirect, incidental, or consequential damages.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law and disputes',
    body: (
      <p className={l.p}>
        These Terms are governed by the laws of the United Arab Emirates, without regard to conflict-of-law
        principles. Any dispute arising out of or relating to these Terms or the Service that cannot be resolved
        informally will be subject to the exclusive jurisdiction of the competent courts of Dubai, UAE, except
        where mandatory local consumer-protection law provides otherwise.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p className={l.p}>
        We may update these Terms from time to time. For material changes, we'll provide notice by email or an
        in-app notice before the change takes effect. Continued use of the Service after a change takes effect
        constitutes acceptance of the updated Terms.
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
        Legal inquiries: <a href="mailto:legal@bloop.com" style={{ color: 'var(--primary)' }}>legal@bloop.com</a>
        <br />
        General support: <a href="mailto:support@bloop.com" style={{ color: 'var(--primary)' }}>support@bloop.com</a>
      </p>
    ),
  },
]

export default function TermsOfService() {
  useSeo({
    title: 'Terms of Service',
    description: 'The terms governing your use of Bloop, the brand-creator marketplace operated by Cayana Technologies Inc.',
    path: '/legal/terms',
  })

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={Agreement02Icon} size={15} color="var(--primary)" />
              Legal
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(34px, 5vw, 54px)' }}>Terms of Service</h1>
            <p className={m.heroSub}>The rules of the road for brands and creators using Bloop.</p>
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
          These Terms of Service are provided as a general template appropriate for an early-stage GCC marketplace
          and do not constitute legal advice. Consult qualified legal counsel before relying on this document for
          compliance purposes.
        </div>
      </div>

      <Footer />
    </motion.main>
  )
}
