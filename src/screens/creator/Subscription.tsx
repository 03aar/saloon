import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, BarChartIcon, CrownIcon, Diamond01Icon, SecurityCheckIcon, SquareLock02Icon, StarIcon, UserIcon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const plans = [
  { id: 'basic', icon: UserIcon, name: 'Basic', price: 0, d: 'For creators getting started on Salon.' },
  { id: 'pro', icon: CrownIcon, name: 'Pro', price: 240, d: 'For creators ready to grow and earn.', popular: true },
  { id: 'portfolio', icon: Diamond01Icon, name: 'Portfolio+', price: 600, d: 'For top creators building global brands.' },
]

export default function Subscription() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const [current, setCurrent] = useState('basic')

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        center={<span style={{ fontSize: 22 }}>Creator Subscription</span>}
        right={<Avatar name={state.session?.name ?? 'Mira'} size={72} tone="noir" portrait />}
      />
      <div className={a.divider} style={{ margin: '16px calc(-1 * var(--page-x)) 0' }} />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 34, fontSize: 'clamp(40px, 11vw, 54px)' }}>
        Elevate your creator journey with Salon Pro
      </h1>
      <p className={a.sub} style={{ fontSize: 18 }}>
        Unlock advanced tools, more visibility, and premium opportunities.
      </p>

      <div className={a.grid3} style={{ marginTop: 26, alignItems: 'stretch' }}>
        {plans.map((p) => {
          const on = current === p.id
          return (
            <Card key={p.id} padding="none" radius="xl" style={{ position: 'relative', borderColor: p.popular ? 'var(--gold)' : undefined, borderWidth: p.popular ? 1.5 : 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'visible', padding: '26px 10px 14px' }}>
              {p.popular && (
                <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)' }}>
                  <Chip size="sm" selected leading={<Icon icon={StarIcon} size={14} />}>
                    Most Popular
                  </Chip>
                </span>
              )}
              <IconTile icon={p.icon} size={64} iconSize={28} tone={p.popular ? 'gold' : 'surface'} strokeWidth={1.2} />
              <div className="display" style={{ fontSize: 28, marginTop: 14 }}>
                {p.name}
              </div>
              <div style={{ marginTop: 6, whiteSpace: 'nowrap' }}>
                <span className={a.metaSm} style={{ letterSpacing: '0.06em' }}>
                  AED{' '}
                </span>
                <span className="display" style={{ fontSize: 30 }}>
                  {p.price}
                </span>
                <span className={a.metaSm}>/mo</span>
              </div>
              <p className={a.metaSm} style={{ marginTop: 10, lineHeight: 1.4, flex: 1 }}>
                {p.d}
              </p>
              <Button
                size="sm"
                block
                variant={on ? 'soft' : p.popular ? 'primary' : 'soft'}
                style={{ marginTop: 14, border: on ? '1px solid var(--line-strong)' : undefined, padding: '0 8px' }}
                onClick={() => {
                  if (on) return
                  setCurrent(p.id)
                  toast(`Switched to ${p.name} (demo)`)
                }}
              >
                {on ? 'Current Plan' : p.popular ? 'Upgrade to Pro' : 'Choose Plan'}
              </Button>
            </Card>
          )
        })}
      </div>

      <Card padding="md" style={{ marginTop: 16 }} radius="xl">
        <div className={a.between}>
          <div>
            <div className="display" style={{ fontSize: 44 }}>
              Salon Pro
            </div>
            <div style={{ marginTop: 4 }}>
              <span className={a.meta} style={{ letterSpacing: '0.06em' }}>
                AED{' '}
              </span>
              <span className="display" style={{ fontSize: 36, color: 'var(--gold-deep)' }}>
                240
              </span>
              <span style={{ color: 'var(--gold-deep)', fontFamily: 'var(--font-display)', fontSize: 26 }}>/mo</span>
            </div>
          </div>
          <Chip selected>Best for Growth</Chip>
        </div>
        <div className={a.divider} style={{ margin: '20px 0 6px' }} />
        {[
          { i: StarIcon, t: 'Priority discovery', d: 'Get featured to brands first with higher visibility in search and recommendations.' },
          { i: BarChartIcon, t: 'Advanced analytics', d: 'Track profile views, pitch performance, and audience insights in depth.' },
          { i: SecurityCheckIcon, t: 'Protected pitches', d: 'Keep your pitches private and control who can view your proposals.' },
        ].map((f, i) => (
          <button key={f.t} type="button" className={a.row} style={{ width: '100%', textAlign: 'left', gap: 18, padding: '18px 0', borderTop: i ? '1px solid var(--line)' : 'none' }} onClick={() => toast(`${f.t} — included with Pro`, 'info')}>
            <IconTile icon={f.i} size={72} iconSize={30} tone="outline" strokeWidth={1.2} />
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: 24, fontWeight: 500 }}>{f.t}</span>
              <span className={a.meta} style={{ display: 'block', marginTop: 4, fontSize: 16, lineHeight: 1.45 }}>
                {f.d}
              </span>
            </span>
            <Icon icon={ArrowRight01Icon} size={20} color="var(--gold)" />
          </button>
        ))}
      </Card>

      <div className={a.banner} style={{ marginTop: 14, padding: '14px 18px' }}>
        <Icon icon={SquareLock02Icon} size={18} />
        <span className={a.bannerBody} style={{ fontSize: 15 }}>
          Secure payments. Cancel anytime.
        </span>
        <button type="button" className={a.link} onClick={() => nav('/support')}>
          Learn more <Icon icon={ArrowRight01Icon} size={14} />
        </button>
      </div>
    </Page>
  )
}
