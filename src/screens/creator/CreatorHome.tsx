import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowRight02Icon, BarChartIcon, Bookmark02Icon, Notification01Icon, ShoppingBag02Icon, TradeUpIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Sparkline } from '../../components/Charts'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { firstName, greeting } from '../../lib/auth'
import a from '../../components/app.module.css'
import s from './creator.module.css'

export default function CreatorHome() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('creator-home')
  const name = firstName(state.session?.name ?? 'Mira')

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <div className={s.helloSm}>{greeting()},</div>
          <h1 className={['display', s.helloName].join(' ')}>
            {name}
            <span className="gold-dot">.</span>
          </h1>
        </div>
        <div className={a.actions} style={{ alignItems: 'center', paddingTop: 30 }}>
          <span style={{ position: 'relative' }}>
            <IconButton label="Notifications" size="lg" onClick={() => nav('/notifications')} style={{ width: 66, height: 66 }}>
              <Icon icon={Notification01Icon} size={24} />
            </IconButton>
            <span style={{ position: 'absolute', right: -2, top: -2, minWidth: 24, height: 24, borderRadius: 12, background: 'var(--gold)', color: '#fff', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>3</span>
          </span>
          <button type="button" onClick={() => nav('/creator/settings')} aria-label="Profile">
            <Avatar name={state.session?.name ?? 'Mira'} size={82} tone="noir" portrait />
          </button>
        </div>
      </div>

      {loading ? (
        <ScreenSkeleton hero={380} tiles={3} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden', minHeight: 420 }} radius="xl" className={a.dark}>
            <div style={{ position: 'absolute', right: 0, bottom: 0, width: '62%', height: '85%', color: '#fff' }}>
              <Sparkline data={[4, 6, 7, 9, 11, 16, 18, 21, 22, 24, 30]} strokeWidth={2.4} />
            </div>
            <div style={{ position: 'relative', padding: 28, maxWidth: '62%' }}>
              <span className={a.darkEyebrow}>Overview</span>
              <div className="display" style={{ fontSize: 42, color: '#fff', marginTop: 14, lineHeight: 1.05 }}>
                4 brand deals
                <br />
                waiting
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 10, fontSize: 17 }}>Your pipeline is growing.</p>
              <div className={a.darkEyebrow} style={{ marginTop: 36 }}>
                Pipeline value
              </div>
              <div className="display" style={{ fontSize: 46, color: '#fff', marginTop: 8 }}>
                AED 42K
              </div>
              <button type="button" onClick={() => nav('/creator/analytics')} style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 12, height: 56, padding: '0 20px', borderRadius: 'var(--r-pill)', border: '1px solid rgba(248,188,88,0.6)', color: '#fff', fontSize: 16, whiteSpace: 'nowrap' }}>
                <Icon icon={BarChartIcon} size={20} color="var(--gold)" /> View analytics
              </button>
            </div>
          </Card>

          <section className={s.nextAction} style={{ marginTop: 16 }} aria-label="Next action">
            <Avatar name="Noura Beauty" size={84} tone="cream" />
            <div style={{ minWidth: 200, flex: 1 }}>
              <div className="eyebrow" style={{ fontSize: 12 }}>
                Next action
              </div>
              <div className="display" style={{ fontSize: 28, marginTop: 6, lineHeight: 1.1 }}>
                Pitch Noura Beauty Co.
              </div>
              <div className={a.meta} style={{ marginTop: 4 }}>
                Skincare launch &nbsp;•&nbsp; AED 18K &nbsp;•&nbsp; Dubai
              </div>
              <div style={{ marginTop: 10 }}>
                <Chip size="sm" tone="tintLight">
                  Pitch due in 2 days
                </Chip>
              </div>
            </div>
            <div className={a.row} style={{ gap: 8, marginLeft: 'auto' }}>
              <Button size="md" trailing={<Icon icon={ArrowRight02Icon} size={18} />} onClick={() => nav('/creator/pitch')}>
                Continue pitch
              </Button>
              <IconButton label="Save" variant="plain" onClick={() => toast('Saved for later')}>
                <Icon icon={Bookmark02Icon} size={24} />
              </IconButton>
            </div>
          </section>

          <div className={a.grid3} style={{ marginTop: 16 }}>
            {[
              [ShoppingBag02Icon, 'Active deals', '4', '+2 since last week', '/creator/collabs'],
              [Wallet02Icon, 'Earnings', 'AED 26.3K', 'Paid • This month', '/creator/earnings'],
              [TradeUpIcon, 'Profile views', '6.1K', '+18% this week', '/creator/analytics'],
            ].map(([ic, l, v, d, to]) => (
              <button key={l as string} type="button" className={s.kpi} onClick={() => nav(to as string)}>
                <IconTile icon={ic as typeof Wallet02Icon} size={54} iconSize={24} tone="surface" />
                <div className={a.between} style={{ marginTop: 18 }}>
                  <span style={{ fontSize: 15 }}>{l as string}</span>
                  <Icon icon={ArrowRight01Icon} size={16} />
                </div>
                <div className={a.num} style={{ marginTop: 8, fontSize: 26 }}>
                  {v as string}
                </div>
                <div className={a.metaSm} style={{ marginTop: 8 }}>
                  {d as string}
                </div>
              </button>
            ))}
          </div>

          <div className={a.twoCol} style={{ marginTop: 16 }}>
            <Card padding="md" radius="xl">
              <div className="eyebrow" style={{ fontSize: 12 }}>
                Upcoming
              </div>
              {[
                ['May', '22', 'Campaign call', 'Noura Beauty Co.', '11:00 AM • Dubai Time'],
                ['May', '24', 'Content deadline', 'Glowhaus', 'Deliverables due'],
              ].map(([m, d, t, b, sub], i) => (
                <button key={t} type="button" className={a.row} onClick={() => toast(`${t} — ${b}`, 'info')} style={{ width: '100%', textAlign: 'left', padding: '16px 0', borderTop: i ? '1px solid var(--line)' : 'none', marginTop: i ? 0 : 10 }}>
                  <span className={s.dateChip}>
                    <small>{m}</small>
                    <b>{d}</b>
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 17, fontWeight: 500 }}>{t}</span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {b}
                    </span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {sub}
                    </span>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={16} />
                </button>
              ))}
              <button type="button" className={a.between} style={{ width: '100%', paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 15 }} onClick={() => toast('Calendar (demo)', 'info')}>
                View calendar <Icon icon={ArrowRight02Icon} size={18} />
              </button>
            </Card>
            <Card padding="md" radius="xl">
              <div className="eyebrow" style={{ fontSize: 12 }}>
                Recent activity
              </div>
              {[
                ['Luxe Base', 'Shortlisted you', '2h ago', 'noir'],
                ['Huda Beauty', 'Opened your pitch', '5h ago', 'rose'],
                ['Noura Beauty Co.', 'Invited you to pitch', '1d ago', 'cream'],
              ].map(([n, d, t, tone], i) => (
                <button key={n} type="button" className={a.row} onClick={() => nav('/creator/pitch/sent')} style={{ width: '100%', textAlign: 'left', padding: '12px 0', borderTop: i ? '1px solid var(--line)' : 'none', marginTop: i ? 0 : 10 }}>
                  <Avatar name={n} size={60} tone={tone as 'noir'} shape="square" />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 16, fontWeight: 500 }}>{n}</span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {d}
                    </span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {t}
                    </span>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={16} />
                </button>
              ))}
              <button type="button" className={a.between} style={{ width: '100%', paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 15 }} onClick={() => nav('/notifications')}>
                View all activity <Icon icon={ArrowRight02Icon} size={18} />
              </button>
            </Card>
          </div>

          <Card padding="md" style={{ marginTop: 16 }} radius="xl">
            <div className={a.wrapRow} style={{ gap: 18 }}>
              <span style={{ width: 120, height: 96, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                <Art kind="marble" />
              </span>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div className="eyebrow" style={{ fontSize: 12 }}>
                  Media kit
                </div>
                <div className="display" style={{ fontSize: 22, marginTop: 6, lineHeight: 1.15 }}>
                  Keep your media kit fresh and winning.
                </div>
                <div className={a.metaSm} style={{ marginTop: 6 }}>
                  Last updated 4 days ago
                </div>
              </div>
              <Button size="md" variant="outline" onClick={() => nav('/creator/media-kit')}>
                Edit kit
              </Button>
            </div>
          </Card>
        </>
      )}
    </Page>
  )
}
