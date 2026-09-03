import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowRight02Icon, Attachment01Icon, Cancel01Icon, Clock01Icon, SentIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { useToast } from '../../components/Toast'
import { deals } from '../../data/deals'
import a from '../../components/app.module.css'

export default function PitchSent() {
  const nav = useNavigate()
  const loc = useLocation() as { state?: { dealId?: string; fee?: number } }
  const { toast } = useToast()
  const deal = deals.find((d) => d.id === loc.state?.dealId) ?? deals[0]
  const fee = loc.state?.fee ?? 16500
  const initials = deal.brand.split(' ').slice(0, 2).map((w) => w[0]).join('')

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(54px, 15vw, 74px)' }}>
            Pitch Sent
          </h1>
          <p className={a.sub}>
            Your pitch has been sent to the brand.
            <br />
            They’ll be in touch soon.
          </p>
        </div>
        <IconButton label="Close" size="lg" onClick={() => nav('/creator/home', { replace: true })}>
          <Icon icon={Cancel01Icon} size={20} />
        </IconButton>
      </div>

      <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
        <svg viewBox="0 0 400 400" aria-hidden style={{ position: 'absolute', left: '50%', top: 40, width: 420, height: 420, transform: 'translateX(-50%)', opacity: 0.5 }}>
          {Array.from({ length: 48 }).map((_, i) => (
            <line key={i} x1="200" y1="200" x2={200 + Math.cos((i / 48) * Math.PI * 2) * 210} y2={200 + Math.sin((i / 48) * Math.PI * 2) * 210} stroke="var(--gold)" strokeOpacity={i % 2 ? 0.12 : 0.25} />
          ))}
        </svg>
        <div style={{ position: 'relative', padding: '44px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ width: 180, height: 180, borderRadius: '50%', border: '3px solid var(--gold)', background: 'radial-gradient(circle at 50% 40%, #3a3631, #1a1918)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', boxShadow: '0 0 60px rgba(201,162,74,0.35)' }}>
            <Icon icon={SentIcon} size={80} strokeWidth={1.1} />
          </span>
          <div className={a.row} style={{ gap: 22, alignSelf: 'stretch', marginTop: 60 }}>
            <span style={{ width: 140, height: 140, borderRadius: 22, background: '#f4efe4', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 60, letterSpacing: '-0.08em', flexShrink: 0 }}>
              {initials}
            </span>
            <div>
              <div className="display" style={{ fontSize: 40, color: '#fff', lineHeight: 1.05 }}>
                {deal.brand}
              </div>
              <div className={a.darkEyebrow} style={{ marginTop: 8 }}>
                {deal.category} • {deal.region}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 10, fontSize: 16, lineHeight: 1.45 }}>Premium skincare and fragrance designed in the Middle East.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className={a.grid2} style={{ marginTop: 16 }}>
        <Card padding="lg" radius="xl">
          <IconTile icon={Clock01Icon} size={96} iconSize={40} tone="surface" strokeWidth={1.2} />
          <div className={a.meta} style={{ fontSize: 18, marginTop: 30 }}>
            Expected reply
          </div>
          <div className="display" style={{ fontSize: 44, marginTop: 6 }}>
            2 days
          </div>
          <p className={a.meta} style={{ marginTop: 10, lineHeight: 1.45 }}>
            Usually brands respond within 1–3 days.
          </p>
        </Card>
        <Card padding="lg" radius="xl">
          <IconTile icon={Wallet02Icon} size={96} iconSize={40} tone="surface" strokeWidth={1.2} />
          <div className={a.meta} style={{ fontSize: 18, marginTop: 30 }}>
            Proposed fee
          </div>
          <div className="display" style={{ fontSize: 44, marginTop: 6 }}>
            AED {fee.toLocaleString()}
          </div>
          <p className={a.meta} style={{ marginTop: 10, lineHeight: 1.45 }}>
            Total campaign fee you proposed.
          </p>
        </Card>
      </div>

      <Card padding="md" style={{ marginTop: 14 }} radius="xl">
        <div className={a.row} style={{ gap: 18 }}>
          <IconTile icon={Attachment01Icon} size={96} iconSize={40} tone="surface" strokeWidth={1.2} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 28 }}>
              Portfolio attached
            </div>
            <p className={a.meta} style={{ marginTop: 4, lineHeight: 1.4 }}>
              Creator portfolio &amp; rate card included in your pitch.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, position: 'relative' }}>
            {(['silk', 'gold', 'sand'] as const).map((k, i) => (
              <span key={k} style={{ width: 100, height: 120, borderRadius: 12, overflow: 'hidden' }}>
                <Art kind={k === 'sand' ? 'marble' : k} />
                {i === 2 && <span style={{ position: 'absolute', right: -8, bottom: -8, width: 56, height: 56, borderRadius: '50%', background: '#fff', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>+6</span>}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Footer app>
        <Button block variant="dark" trailing={<Icon icon={ArrowRight02Icon} size={22} color="var(--gold)" />} onClick={() => nav('/notifications')} style={{ justifyContent: 'space-between', paddingLeft: 28 }}>
          Track pitch
        </Button>
        <button type="button" className={a.link} style={{ justifyContent: 'center', fontSize: 18 }} onClick={() => { toast('All pitches (demo)', 'info'); nav('/creator/collabs') }}>
          View all pitches <Icon icon={ArrowRight01Icon} size={18} />
        </button>
      </Footer>
    </Page>
  )
}
