import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft01Icon, ArrowRight01Icon, BarChartIcon, Calendar03Icon, CreditCardIcon, File01Icon, FileEditIcon, Message01Icon, MoreHorizontalIcon, UserAdd01Icon, UserIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Ring } from '../../components/Ring'
import { IconTile } from '../../components/IconTile'
import { AvatarStack } from '../../components/Avatar'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const names: Record<string, string> = { 'ramadan-2026': 'Ramadan Glow Launch', 'summer-collection': 'Summer Collection', 'eid-edit': 'Eid Edit Collection', 'summer-essentials': 'Summer Essentials', 'glow-launch': 'Glow Launch', 'winter-warmth': 'Winter Warmth' }

export default function CampaignDetail() {
  const nav = useNavigate()
  const { id = 'ramadan-2026' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`campaign-${id}`)
  const name = names[id] ?? 'Campaign'

  const tasks = [
    { i: Calendar03Icon, t: 'Approve creator content drafts', d: 'Due Mar 7', tag: '2 due', hot: true, to: '/approvals' },
    { i: FileEditIcon, t: 'Review contracts', d: 'Due Mar 9', tag: '1 due', hot: true, to: '/approvals' },
    { i: CreditCardIcon, t: 'Release initial payouts', d: 'Due Mar 10', tag: 'Upcoming', hot: false, to: `/campaigns/${id}/timeline` },
    { i: BarChartIcon, t: 'Monitor campaign performance', d: 'Due weekly', tag: 'Ongoing', hot: false, to: `/campaigns/${id}/analytics` },
  ]
  const pipeline = [
    { n: 8, l: 'Invited', pct: 100, more: 4 },
    { n: 6, l: 'Shortlisted', pct: 75, more: 3 },
    { n: 8, l: 'Confirmed', pct: 66, more: 5 },
    { n: 2, l: 'Content live', pct: 16, more: 0 },
  ]

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav('/campaigns')}>
            <Icon icon={ArrowLeft01Icon} size={26} />
          </IconButton>
        }
        right={
          <>
            <IconButton label="Messages" onClick={() => nav('/messages')}>
              <Icon icon={Message01Icon} size={20} />
            </IconButton>
            <IconButton label="Invite creators" onClick={() => nav('/discover')}>
              <Icon icon={UserAdd01Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => toast('Export, duplicate or pause', 'info')}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      {loading ? (
        <ScreenSkeleton hero={220} tiles={3} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <div style={{ marginTop: 14 }}>
            <Chip size="sm" tone="tintLight" leading={<span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }} />}>
              LIVE
            </Chip>
          </div>
          <div className={a.between} style={{ alignItems: 'flex-start', marginTop: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className={['display', a.h1].join(' ')}>{name}</h1>
              <div className={a.meta} style={{ marginTop: 12, fontSize: 16 }}>
                Skincare &nbsp;•&nbsp; GCC &nbsp;•&nbsp; Mar 1 – Mar 31
              </div>
              <p style={{ marginTop: 12, fontSize: 17, maxWidth: 360 }}>Elevate glow this Ramadan with clean, ritual-led skincare.</p>
            </div>
            <Ring value={78} size={140} stroke={9}>
              <span className="display" style={{ fontSize: 40 }}>
                78<span style={{ fontSize: 20 }}>%</span>
              </span>
              <div style={{ color: 'var(--gold-deep)', fontSize: 14 }}>On track</div>
            </Ring>
          </div>

          <Card padding="md" style={{ marginTop: 22 }} radius="xl">
            <div className={a.splitStats}>
              {[
                [UserIcon, 'Creators', '8', '/12', '66% confirmed'],
                [File01Icon, 'Drafts due', '4', '', 'Due in 2 days'],
                [Wallet02Icon, 'Spend', 'AED 36K', '', '60% of AED 60K'],
              ].map(([ic, l, v, sub, d]) => (
                <div key={l as string}>
                  <IconTile icon={ic as typeof UserIcon} size={52} iconSize={24} tone="surface" />
                  <div style={{ fontSize: 16, marginTop: 20 }}>{l as string}</div>
                  <div className={a.num} style={{ marginTop: 6 }}>
                    {v as string}
                    {sub && <span className={a.meta} style={{ fontSize: 15 }}> {sub as string}</span>}
                  </div>
                  <div className={a.metaSm} style={{ marginTop: 8 }}>
                    {d as string}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            <div className={a.between}>
              <h2 className="display" style={{ fontSize: 28 }}>
                Campaign tasks
              </h2>
              <button type="button" className={a.link} onClick={() => nav('/approvals')}>
                View all <Icon icon={ArrowRight01Icon} size={16} />
              </button>
            </div>
            <div style={{ marginTop: 6 }}>
              {tasks.map((t) => (
                <button key={t.t} type="button" className={a.listRow} onClick={() => nav(t.to)}>
                  <IconTile icon={t.i} size={54} iconSize={24} tone="surface" />
                  <span className={a.listRowBody}>
                    <span className={a.listRowTitle}>{t.t}</span>
                    <span className={a.listRowSub} style={{ display: 'block' }}>
                      {t.d}
                    </span>
                  </span>
                  <Chip size="sm" tone={t.hot ? 'tint' : 'soft'}>
                    {t.tag}
                  </Chip>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
              ))}
            </div>
          </Card>

          <div className={a.section}>
            <div className={a.between} style={{ marginBottom: 12 }}>
              <h2 className="display" style={{ fontSize: 28 }}>
                Creator pipeline
              </h2>
              <button type="button" className={a.link} onClick={() => nav('/shortlist')}>
                View all
              </button>
            </div>
            <Card padding="none" radius="xl">
              {pipeline.map((p, i) => (
                <button key={p.l} type="button" onClick={() => nav('/shortlist')} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 120px 24px', alignItems: 'center', gap: 12, width: '100%', padding: '16px 18px', borderTop: i ? '1px solid var(--line)' : 'none', textAlign: 'left' }}>
                  <span>
                    <span className="display" style={{ fontSize: 28 }}>
                      {p.n}
                    </span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {p.l}
                    </span>
                  </span>
                  <AvatarStack names={['Noor', 'Lama', 'Hessa'].slice(0, p.n >= 3 ? 3 : 2)} size={44} more={p.more || undefined} />
                  <span>
                    <span style={{ fontSize: 15 }}>{p.pct}%</span>
                    <span className={a.bar} style={{ display: 'block', marginTop: 6 }}>
                      <span className={a.barFill} style={{ width: `${p.pct}%` }} />
                    </span>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
              ))}
            </Card>
          </div>

          <div className={a.grid3} style={{ marginTop: 16 }}>
            {[
              ['Timeline', `/campaigns/${id}/timeline`],
              ['Analytics', `/campaigns/${id}/analytics`],
              ['Export report', `/campaigns/${id}/export`],
            ].map(([l, to]) => (
              <button key={l} type="button" onClick={() => nav(to)} style={{ padding: '16px 12px', borderRadius: 16, border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {l} <Icon icon={ArrowRight01Icon} size={16} />
              </button>
            ))}
          </div>
        </>
      )}
    </Page>
  )
}
