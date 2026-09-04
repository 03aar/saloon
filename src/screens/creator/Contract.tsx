import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft02Icon, ArrowRight02Icon, Calendar03Icon, CreditCardIcon, Film02Icon, Megaphone01Icon, SecurityCheckIcon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const terms = [
  { i: Film02Icon, t: 'Usage Rights', d: 'Brand may use the content across owned channels and ads for 12 months.', more: 'Includes paid amplification on Meta and TikTok. Excludes third-party resale or sublicensing.' },
  { i: Calendar03Icon, t: 'Timeline', d: 'Content to be delivered by Jun 5, 2026. Posting window: Jun 6 – Jun 20, 2026.', more: 'One round of revisions is included within 48 hours of feedback.' },
  { i: CreditCardIcon, t: 'Payment', d: 'AED 18,000 fixed fee. Payment within 5 business days after content approval.', more: 'Funds are held in Bloop Escrow from contract acceptance until approval.' },
  { i: Megaphone01Icon, t: 'Disclosure', d: 'Paid partnership disclosure required as per UAE regulations.', more: 'Use the platform’s paid partnership label and #ad in the first line of the caption.' },
]

export default function Contract() {
  const nav = useNavigate()
  const { toast } = useToast()
  const [open, setOpen] = useState<number | null>(null)
  const [accepting, setAccepting] = useState(false)

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={26} />
          </IconButton>
        }
        right={
          <Chip selected selectedStyle="outline" leading={<Icon icon={SecurityCheckIcon} size={18} color="var(--gold)" />} className="">
            <span style={{ color: 'var(--gold-deep)' }}>Bloop Protected</span>
          </Chip>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Contract Terms
      </h1>
      <p className={a.sub}>Review and accept the terms to start this collaboration.</p>

      <Card tone="dark" padding="md" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
        <svg viewBox="0 0 120 120" aria-hidden style={{ position: 'absolute', right: 24, top: 24, width: 130, height: 130 }}>
          <defs>
            <path id="seal" d="M60 14a46 46 0 1 1-.1 0" />
          </defs>
          <circle cx="60" cy="60" r="58" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <circle cx="60" cy="60" r="38" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <text fontSize="10" letterSpacing="3" fill="var(--gold)" fontFamily="var(--font-body)">
            <textPath href="#seal" startOffset="4%">BLOOP ★ PROTECTED ★</textPath>
          </text>
          <path d="M60 44l12 5v10c0 8-5 14-12 17-7-3-12-9-12-17V49z" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <path d="M53 60l5 5 9-10" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className={a.row} style={{ gap: 14 }}>
          <span style={{ width: 66, height: 66, borderRadius: 14, border: '1px solid rgba(248,188,88,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--gold)' }}>LS</span>
          <div>
            <div className="display" style={{ fontSize: 26, color: '#fff' }}>
              Lumière Studio
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)' }}>Campaign Collaboration</div>
          </div>
        </div>
        <div className="display" style={{ fontSize: 34, color: '#fff', marginTop: 26 }}>
          Summer Glow Campaign
        </div>
        <div style={{ color: 'rgba(255,255,255,0.65)', marginTop: 6, fontSize: 17 }}>3 Posts &nbsp;•&nbsp; 2 Stories &nbsp;•&nbsp; 1 Reel</div>
        <div className={a.dividerDark} style={{ margin: '26px 0 22px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18 }}>
          <div>
            <div className={a.label} style={{ color: 'rgba(255,255,255,0.6)' }}>
              Total agreed payment
            </div>
            <div className="display" style={{ fontSize: 52, color: '#fff', marginTop: 12 }}>
              AED 18,000
            </div>
            <div style={{ color: 'var(--gold)', marginTop: 10, fontSize: 15 }}>Secure &nbsp;•&nbsp; Transparent &nbsp;•&nbsp; On time</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: 18 }}>
            <div className={a.row} style={{ gap: 10, color: 'rgba(255,255,255,0.8)' }}>
              <Icon icon={Calendar03Icon} size={22} /> Campaign Period
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, marginTop: 10, lineHeight: 1.4 }}>
              May 26 – Jun 20
              <br />
              2026
            </div>
          </div>
        </div>
      </Card>

      <h2 className="display" style={{ fontSize: 30, marginTop: 30 }}>
        Terms Overview
      </h2>
      <p className={a.meta} style={{ fontSize: 17, marginTop: 4 }}>
        Please read each section carefully.
      </p>
      <div className={a.stack} style={{ marginTop: 16 }}>
        {terms.map((t, i) => {
          const isOpen = open === i
          return (
            <Card key={t.t} padding="md" radius="xl" as="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <div className={a.row} style={{ gap: 18 }}>
                <IconTile icon={t.i} size={100} iconSize={44} tone="tint" strokeWidth={1.1} />
                <div style={{ flex: 1 }}>
                  <div className="display" style={{ fontSize: 30 }}>
                    {t.t}
                  </div>
                  <p className={a.meta} style={{ marginTop: 6, fontSize: 16, lineHeight: 1.45 }}>
                    {t.d}
                  </p>
                  {isOpen && (
                    <p style={{ marginTop: 10, fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.45 }}>{t.more}</p>
                  )}
                </div>
                <Icon icon={ArrowDown01Icon} size={22} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
              </div>
            </Card>
          )
        })}
      </div>

      <Footer app>
        <div style={{ padding: 14, borderRadius: 24, border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <div className={a.row} style={{ gap: 12, marginBottom: 12 }}>
            <IconTile icon={SecurityCheckIcon} size={44} iconSize={20} />
            <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.4 }}>
              By accepting, you agree to the terms above and Bloop’s <span style={{ color: 'var(--gold-deep)' }}>Creator Agreement</span>.
            </span>
          </div>
          <Button
            block
            loading={accepting}
            spread
            trailing={<Icon icon={ArrowRight02Icon} size={22} />}
            onClick={() => {
              setAccepting(true)
              window.setTimeout(() => {
                setAccepting(false)
                toast('Terms accepted · collaboration started')
                nav('/creator/collabs/summer-glow', { replace: true })
              }, 900)
            }}
          >
            Accept terms
          </Button>
        </div>
      </Footer>
    </Page>
  )
}
