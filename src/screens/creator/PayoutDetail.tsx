import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft01Icon, ArrowRight01Icon, BankIcon, Calendar03Icon, Download04Icon, File01Icon, MoreHorizontalIcon, SecurityCheckIcon, Tag01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Art } from '../../components/Art'
import { useToast } from '../../components/Toast'
import { payouts } from '../../data/payouts'
import a from '../../components/app.module.css'

export default function PayoutDetail() {
  const nav = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const p = payouts.find((x) => x.id === id) ?? payouts[0]

  const rows = [
    { i: BankIcon, l: 'Bank account', v: 'Emirates NBD', d: '•••• 4587', chev: true },
    { i: File01Icon, l: 'Invoice', v: p.invoice, d: 'Issued on May 15', chev: true },
    { i: Calendar03Icon, l: 'Release date', v: p.release, d: p.status === 'Paid' ? 'Funds transferred' : 'Funds will be transferred' },
    { i: Tag01Icon, l: 'Payout for', v: p.campaign, d: 'Brand collaboration' },
  ]

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft01Icon} size={26} />
          </IconButton>
        }
        right={
          <IconButton label="More" onClick={() => toast('Report an issue with this payout', 'info')}>
            <Icon icon={MoreHorizontalIcon} size={20} />
          </IconButton>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 26 }}>
        Payout detail
      </h1>

      <Card padding="none" style={{ marginTop: 26, position: 'relative', overflow: 'hidden', minHeight: 290 }} radius="xl">
        <span style={{ position: 'absolute', inset: 0 }}>
          <Art kind="silk" />
        </span>
        <span style={{ position: 'absolute', right: 60, top: 80, width: 130, height: 130, borderRadius: '50%', border: '8px solid var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', boxShadow: '0 20px 40px rgba(120,90,30,0.2)', background: 'rgba(255,255,255,0.5)' }}>
          <Icon icon={Tick02Icon} size={60} strokeWidth={1.8} />
        </span>
        <div style={{ position: 'relative', padding: '36px 28px' }}>
          <div className={a.meta} style={{ fontSize: 20 }}>
            Total payout
          </div>
          <div className={a.numXl} style={{ marginTop: 14, fontSize: 60 }}>
            {p.amount}
          </div>
          <div style={{ marginTop: 18 }}>
            <Chip tone="tint">{p.status}</Chip>
          </div>
        </div>
      </Card>

      <Card padding="none" style={{ marginTop: 18 }} radius="xl">
        {rows.map((r, i) => (
          <button key={r.l} type="button" onClick={() => (r.chev ? toast(`${r.l}: ${r.v}`, 'info') : undefined)} style={{ display: 'flex', alignItems: 'center', gap: 20, width: '100%', textAlign: 'left', padding: '22px 22px', borderTop: i ? '1px solid var(--line)' : 'none', cursor: r.chev ? 'pointer' : 'default' }}>
            <span style={{ width: 100, height: 100, borderRadius: 22, background: 'var(--surface-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon icon={r.i} size={44} strokeWidth={1.2} />
            </span>
            <span style={{ flex: 1 }}>
              <span className={a.meta} style={{ display: 'block', fontSize: 17 }}>
                {r.l}
              </span>
              <span style={{ display: 'block', fontSize: 24, fontWeight: 500, marginTop: 4 }}>{r.v}</span>
              <span className={a.meta} style={{ display: 'block', marginTop: 4 }}>
                {r.d}
              </span>
            </span>
            {r.chev && <Icon icon={ArrowRight01Icon} size={22} />}
          </button>
        ))}
        <div style={{ padding: '10px 22px 22px' }}>
          <Button block variant="outline" leading={<Icon icon={Download04Icon} size={22} />} onClick={() => toast('Receipt downloaded (demo)')} style={{ color: 'var(--gold-deep)', borderRadius: 16 }}>
            Download receipt
          </Button>
        </div>
      </Card>

      <button type="button" className={a.banner} style={{ width: '100%', textAlign: 'left', marginTop: 16 }} onClick={() => nav('/privacy')}>
        <span style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--gold-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
          <Icon icon={SecurityCheckIcon} size={44} strokeWidth={1.1} />
        </span>
        <span className={a.bannerBody}>
          <span className={a.bannerTitle} style={{ fontSize: 19 }}>
            Secure &amp; trusted payouts
          </span>
          <span className={a.bannerSub} style={{ display: 'block', fontSize: 15 }}>
            Your payout is protected with Bank-level security.
          </span>
        </span>
        <Icon icon={ArrowRight01Icon} size={22} />
      </button>
    </Page>
  )
}
