import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, ArrowRight02Icon, BarChartIcon, Calendar03Icon, ClapperboardIcon, Clock01Icon, File01Icon, InformationCircleIcon, PieChart01Icon, PlayCircleIcon, SecurityCheckIcon, SmartPhone01Icon, StarIcon, Tick02Icon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Art } from '../../components/Art'
import { RangeSlider } from '../../components/RangeSlider'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const tiers = [
  { id: 'premium', l: 'Premium', r: 'AED 30K+' },
  { id: 'mid', l: 'Mid-Tier', r: 'AED 10K–30K' },
  { id: 'emerging', l: 'Emerging', r: 'AED 2K–10K' },
  { id: 'rising', l: 'Rising', r: 'Under AED 2K' },
]

export default function CampaignBudget() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const c = state.campaign
  const set = (p: Partial<typeof c>) => update({ campaign: { ...c, ...p } })
  const inRange = c.budget >= 70000 && c.budget <= 90000

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" onClick={() => toast('Draft saved')}>
            Save Draft
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Campaign Budget
      </h1>
      <p className={a.sub}>Set your budget, deliverables, and payment terms.</p>

      <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl">
        <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', maskImage: 'linear-gradient(90deg, transparent, #000 50%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 50%)' }}>
          <Art kind="marble" />
        </span>
        <div style={{ position: 'relative', padding: '26px 24px 22px' }}>
          <div className={a.meta} style={{ fontSize: 17 }}>
            Total Budget
          </div>
          <div className={a.numXl} style={{ marginTop: 10, fontSize: 58 }}>
            AED {c.budget.toLocaleString()}
          </div>
          <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, border: `1px solid ${inRange ? 'var(--gold)' : 'var(--line-strong)'}`, color: inRange ? 'var(--gold-deep)' : 'var(--ink-2)', fontSize: 15 }}>
            <Icon icon={BarChartIcon} size={16} /> Recommended range AED 70K–90K
          </div>
          <div style={{ marginTop: 22 }}>
            <RangeSlider min={20000} max={200000} step={1000} value={[20000, c.budget]} onChange={(v) => set({ budget: v[1] })} ariaLabel="Total budget" />
          </div>
          <div className={a.metaSm} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} /> Excluding platform fee <span style={{ flex: 1, borderTop: '1px dashed var(--line-strong)', maxWidth: 140 }} /> <Icon icon={InformationCircleIcon} size={14} />
          </div>
        </div>
      </Card>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 22 }}>
          Deliverables
        </div>
        <Card padding="none" style={{ marginTop: 12 }} radius="xl">
          <div className={a.grid3} style={{ gap: 0 }}>
            {[
              [PlayCircleIcon, '2', 'Videos', 'Up to 60s each'],
              [SmartPhone01Icon, '4', 'Story frames', 'Static or video'],
              [ClapperboardIcon, '10', 'UGC clips', 'Up to 30s each'],
            ].map(([ic, n, l, d], i) => (
              <div key={l as string} style={{ padding: '24px 12px', textAlign: 'center', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
                <span style={{ width: 52, height: 52, borderRadius: 14, border: '1px solid var(--gold-soft)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)' }}>
                  <Icon icon={ic as typeof PlayCircleIcon} size={26} strokeWidth={1.3} />
                </span>
                <div className={a.numLg} style={{ marginTop: 14 }}>
                  {n as string}
                </div>
                <div style={{ fontSize: 16, marginTop: 8 }}>{l as string}</div>
                <div className={a.metaSm} style={{ marginTop: 4 }}>
                  {d as string}
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => toast('Guidelines: brand-safe, disclosure, 9:16 vertical', 'info')} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '18px 20px', borderTop: '1px solid var(--line)', textAlign: 'left', fontSize: 16 }}>
            <Icon icon={File01Icon} size={22} color="var(--gold)" />
            <span style={{ flex: 1 }}>View deliverable guidelines</span>
            <Icon icon={ArrowRight01Icon} size={18} />
          </button>
        </Card>
      </div>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 22 }}>
          Payment Terms
        </div>
        <Card padding="none" style={{ marginTop: 12 }} radius="xl">
          <div className={a.grid4} style={{ gap: 0 }}>
            {[
              [Calendar03Icon, '50%', 'Upfront', 'On campaign start'],
              [PieChart01Icon, '30%', 'On content approval', ''],
              [Wallet02Icon, '20%', 'On campaign completion', ''],
              [Clock01Icon, '15', 'Net days', 'Payment terms'],
            ].map(([ic, n, l, d], i) => (
              <div key={l as string} style={{ padding: '22px 8px', textAlign: 'center', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
                <Icon icon={ic as typeof Clock01Icon} size={30} strokeWidth={1.3} color="var(--gold)" style={{ margin: '0 auto' }} />
                <div className={a.num} style={{ marginTop: 14, fontSize: 32 }}>
                  {n as string}
                </div>
                <div style={{ fontSize: 14, marginTop: 8, lineHeight: 1.3 }}>{l as string}</div>
                {d && (
                  <div className={a.metaSm} style={{ marginTop: 4 }}>
                    {d as string}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 22 }}>
          Creator Tier
        </div>
        <div className={a.scroller} style={{ marginTop: 12 }}>
          {tiers.map((t) => {
            const on = c.tier === t.id
            return (
              <button key={t.id} type="button" aria-pressed={on} onClick={() => set({ tier: t.id })} style={{ position: 'relative', width: 200, padding: '16px 16px', borderRadius: 18, border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line)'}`, background: on ? 'var(--gold-tint)' : 'var(--surface)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon icon={StarIcon} size={26} color={on ? 'var(--gold)' : 'var(--muted-2)'} style={{ flexShrink: 0 }} />
                <span>
                  <b style={{ display: 'block', fontSize: 16, fontWeight: 500 }}>{t.l}</b>
                  <span className={a.metaSm}>{t.r}</span>
                </span>
                {on && (
                  <span style={{ position: 'absolute', right: 10, top: 10, width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon icon={Tick02Icon} size={12} strokeWidth={2.6} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <button type="button" className={a.banner} style={{ width: '100%', textAlign: 'left', marginTop: 14 }} onClick={() => toast('Payouts are processed through Salon Escrow', 'info')}>
        <Icon icon={SecurityCheckIcon} size={30} color="var(--gold)" strokeWidth={1.3} />
        <span className={a.bannerBody}>
          <span className={a.bannerTitle}>Secure payments. Protected creators.</span>
          <span className={a.bannerSub} style={{ display: 'block' }}>
            All payouts are processed securely via Salon Escrow.
          </span>
        </span>
        <Icon icon={ArrowRight01Icon} size={18} />
      </button>

      <Footer app>
        <Button block spread trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => nav('/create/review')}>
          Continue to review
        </Button>
      </Footer>
    </Page>
  )
}
