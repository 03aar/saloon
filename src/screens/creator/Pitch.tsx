import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Add01Icon, ArrowLeft01Icon, ArrowRight02Icon, Cancel01Icon, InformationCircleIcon, Location01Icon, PencilEdit02Icon, SecurityCheckIcon, Tick02Icon, ViewIcon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { Art, type ArtKind } from '../../components/Art'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { useToast } from '../../components/Toast'
import { deals } from '../../data/deals'
import a from '../../components/app.module.css'

const allDeliverables = ['1x Feed Post', '1x Reel', '3x Stories', 'Usage Rights', 'Link in Bio']
const initialPortfolio: ArtKind[] = ['silk', 'gold', 'marble', 'glow']

export default function Pitch() {
  const nav = useNavigate()
  const loc = useLocation() as { state?: { dealId?: string } }
  const { toast } = useToast()
  const deal = deals.find((d) => d.id === loc.state?.dealId) ?? deals[0]
  const [text, setText] = useState(
    'I create elevated, relatable beauty content that builds trust and drives action. My audience values honest recommendations and aesthetic storytelling—perfect for the Glow Collection.\n\nI’ll deliver content that feels native, luxurious, and scroll-stopping.',
  )
  const [dels, setDels] = useState(allDeliverables)
  const [fee, setFee] = useState(16500)
  const [editFee, setEditFee] = useState(false)
  const [portfolio, setPortfolio] = useState(initialPortfolio)
  const [sending, setSending] = useState(false)
  const canSubmit = text.trim().length >= 40 && dels.length > 0 && fee > 0

  const submit = () => {
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      nav('/creator/pitch/sent', { replace: true, state: { dealId: deal.id, fee } })
    }, 1000)
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft01Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={ViewIcon} size={18} />} onClick={() => toast('Brand-side preview (demo)', 'info')}>
            Preview
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Your pitch
      </h1>
      <p className={a.sub}>Make it personal. Show them why you’re the one.</p>

      <Card padding="md" style={{ marginTop: 20 }} radius="xl">
        <div className={a.row} style={{ gap: 18 }}>
          <Avatar name={deal.brand} size={96} tone="cream" shape="square" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="display" style={{ fontSize: 26, lineHeight: 1.05 }}>
              {deal.brand}
            </div>
            <div className={a.meta} style={{ fontSize: 15, marginTop: 4 }}>
              {deal.name}
            </div>
            <div className={a.metaSm} style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon icon={Location01Icon} size={14} color="var(--gold)" /> UAE &nbsp;•&nbsp; 1.2M+ audience
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => nav(`/creator/deals/${deal.id}`)} style={{ color: 'var(--gold-deep)' }}>
            View deal
          </Button>
        </div>
      </Card>

      <div className={a.section}>
        <div className={a.between}>
          <span style={{ fontSize: 20 }}>Your pitch</span>
          <span className={a.meta}>{text.length}/1,000</span>
        </div>
        <div style={{ marginTop: 12, padding: '20px 22px', borderRadius: 22, border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 1000))} rows={8} aria-label="Pitch text" style={{ width: '100%', border: 0, outline: 0, resize: 'none', background: 'transparent', font: 'inherit', fontSize: 19, lineHeight: 1.5, color: 'var(--ink)' }} />
        </div>
      </div>

      <div className={a.section}>
        <div style={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          Deliverables you propose <Icon icon={InformationCircleIcon} size={18} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 14 }}>
          {allDeliverables.map((d) => {
            const on = dels.includes(d)
            return (
              <button key={d} type="button" aria-pressed={on} onClick={() => setDels((l) => (on ? l.filter((x) => x !== d) : [...l, d]))} style={{ display: 'inline-flex', alignItems: 'center', height: 64, borderRadius: 999, border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line)'}`, background: 'var(--surface)', fontSize: 18, overflow: 'hidden' }}>
                <span style={{ width: 62, height: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid ${on ? 'var(--gold-soft)' : 'var(--line)'}`, color: 'var(--gold)' }}>{on && <Icon icon={Tick02Icon} size={22} strokeWidth={2.2} />}</span>
                <span style={{ padding: '0 22px 0 16px' }}>{d}</span>
              </button>
            )
          })}
          <button type="button" onClick={() => toast('Custom deliverables (demo)', 'info')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 64, padding: '0 22px', borderRadius: 999, border: '1.5px dashed var(--line-strong)', color: 'var(--ink-2)', fontSize: 18 }}>
            <Icon icon={Add01Icon} size={20} color="var(--gold)" /> Add other
          </button>
        </div>
      </div>

      <div className={a.section}>
        <div style={{ fontSize: 20 }}>Your proposed fee</div>
        <Card padding="md" style={{ marginTop: 12 }} radius="xl">
          <div className={a.between}>
            <span>
              <span className={a.meta} style={{ fontSize: 20, letterSpacing: '0.06em' }}>
                AED{' '}
              </span>
              <span className="display" style={{ fontSize: 56 }}>
                {fee.toLocaleString()}
              </span>
            </span>
            <Button size="md" variant="outline" trailing={<Icon icon={PencilEdit02Icon} size={16} />} onClick={() => setEditFee(true)} style={{ color: 'var(--gold-deep)' }}>
              Edit fee
            </Button>
          </div>
        </Card>
      </div>

      <div className={a.section}>
        <div style={{ fontSize: 20 }}>
          Portfolio <span className={a.meta}>(add up to 5)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10, marginTop: 14 }}>
          {portfolio.map((k, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1 / 1.15', borderRadius: 16, overflow: 'hidden' }}>
              <Art kind={k} />
              <button type="button" aria-label="Remove" onClick={() => setPortfolio((p) => p.filter((_, j) => j !== i))} style={{ position: 'absolute', right: 6, top: 6, width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Cancel01Icon} size={12} strokeWidth={2.4} />
              </button>
            </div>
          ))}
          {portfolio.length < 5 && (
            <button type="button" aria-label="Add portfolio item" onClick={() => { setPortfolio((p) => [...p, (['noir', 'arch', 'wave'] as ArtKind[])[p.length % 3]]); toast('Added from your portfolio') }} style={{ aspectRatio: '1 / 1.15', borderRadius: 16, border: '1.5px dashed var(--line-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Add01Icon} size={18} />
              </span>
            </button>
          )}
        </div>
      </div>

      <div className={a.banner} style={{ marginTop: 18 }}>
        <Icon icon={SecurityCheckIcon} size={44} color="var(--gold)" strokeWidth={1.1} />
        <div className={a.bannerBody}>
          <div className={a.bannerTitle}>Your payout is protected</div>
          <div className={a.bannerSub}>Funds are held securely and released only when agreed deliverables are complete.</div>
        </div>
        <button type="button" className={a.link} onClick={() => nav('/support')}>
          Learn more
        </button>
      </div>

      <Footer app>
        <Button block loading={sending} disabled={!canSubmit} trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={submit}>
          Submit pitch
        </Button>
      </Footer>

      <Sheet open={editFee} onClose={() => setEditFee(false)} label="Edit fee">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Proposed fee
        </h2>
        <div style={{ marginTop: 18 }}>
          <TextField label="Fee (AED)" type="number" inputMode="numeric" value={String(fee)} onChange={(e) => setFee(Math.max(0, Number(e.target.value) || 0))} help="Your rate card total is AED 16,500." />
        </div>
        <Button block style={{ marginTop: 16 }} onClick={() => setEditFee(false)}>
          Done
        </Button>
      </Sheet>
    </Page>
  )
}
