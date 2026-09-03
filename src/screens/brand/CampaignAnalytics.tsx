import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon, ArrowDown02Icon, Bookmark02Icon, ChartIncreaseIcon, Cursor02Icon, File01Icon, MoreHorizontalIcon, Notification01Icon, SecurityCheckIcon, StarIcon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { Avatar } from '../../components/Avatar'
import { Art } from '../../components/Art'
import { Sparkline, Donut } from '../../components/Charts'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const series = [0.05, 0.3, 0.45, 0.6, 0.72, 0.9, 1.05, 1.2, 1.32, 1.45, 1.62, 1.8, 1.95, 2.1, 2.25, 2.4]

export default function CampaignAnalytics() {
  const nav = useNavigate()
  const { id = 'ramadan-2026' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`analytics-${id}`)
  const [range, setRange] = useState('Last 28 days')

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft01Icon} size={22} />
          </IconButton>
        }
        right={
          <>
            <IconButton label="Notifications" onClick={() => nav('/notifications')}>
              <Icon icon={Notification01Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => nav(`/campaigns/${id}/export`)}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Campaign Analytics
      </h1>

      {loading ? (
        <ScreenSkeleton hero={420} tiles={4} rows={1} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <div className={a.row} style={{ marginTop: 20, gap: 16 }}>
            <span style={{ width: 118, height: 130, borderRadius: 18, overflow: 'hidden', flexShrink: 0 }}>
              <Art kind="gold" />
            </span>
            <div>
              <div className="display" style={{ fontSize: 30 }}>
                Desert Glow Launch
              </div>
              <div className={a.meta} style={{ marginTop: 6 }}>
                May 2 – May 24, 2026 &nbsp;•&nbsp; 23 days left
              </div>
              <div style={{ marginTop: 12 }}>
                <Chip size="sm" tone="tintLight" leading={<span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />}>
                  Live
                </Chip>
              </div>
            </div>
          </div>

          <Card tone="dark" padding="md" style={{ marginTop: 20 }} radius="xl" className={a.dark}>
            <div className={a.between}>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)' }}>Total Reach</span>
              <button type="button" onClick={() => { const next = range === 'Last 28 days' ? 'Last 7 days' : 'Last 28 days'; setRange(next); toast(`Showing ${next.toLowerCase()}`, 'info') }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 15 }}>
                {range} <Icon icon={ArrowDown01Icon} size={16} />
              </button>
            </div>
            <div className={a.numXl} style={{ color: '#fff', marginTop: 16, fontSize: 72 }}>
              2.4M
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)' }}>
              <Icon icon={ArrowUpRight01Icon} size={16} color="var(--gold)" />
              <span style={{ color: 'var(--gold)' }}>24%</span> vs Apr 7 – Apr 29
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '52px 1fr', gap: 8, marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'right', height: 220, paddingBottom: 26 }}>
                {['3.0M', '2.4M', '1.8M', '1.2M', '600K', '0'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
              <div style={{ position: 'relative', height: 220, color: '#fff' }}>
                <span style={{ position: 'absolute', right: 0, top: -30, padding: '6px 12px', borderRadius: 8, background: 'var(--gold)', color: 'var(--ink)', fontSize: 14, fontWeight: 500 }}>2.4M</span>
                <div style={{ height: 194 }}>
                  <Sparkline data={series} grid strokeWidth={2.2} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
                  {['Apr 27', 'May 4', 'May 11', 'May 18', 'May 24'].map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className={a.grid4} style={{ marginTop: 14 }}>
            {[
              [UserGroupIcon, 'Engagement Rate', '5.2%', '1.1pp', true],
              [Bookmark02Icon, 'Saves', '18K', '32%', true],
              [Cursor02Icon, 'CPC', 'AED 1.42', '18%', false],
              [ChartIncreaseIcon, 'Sales Lift', '12%', '6pp', true],
            ].map(([ic, l, v, d, up]) => (
              <div key={l as string} className={a.stat} style={{ padding: 14 }}>
                <IconTile icon={ic as typeof StarIcon} size={44} iconSize={20} tone="surface" />
                <div style={{ fontSize: 14, marginTop: 14, lineHeight: 1.3 }}>{l as string}</div>
                <div className={a.num} style={{ fontSize: 28, marginTop: 6 }}>
                  {v as string}
                </div>
                <div className={a.metaSm} style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Icon icon={up ? ArrowUpRight01Icon : ArrowDown02Icon} size={12} color="var(--gold)" />
                  <span style={{ color: 'var(--gold-deep)' }}>{d as string}</span> vs Apr 7 – Apr 29
                </div>
              </div>
            ))}
          </div>

          <div className={a.twoCol} style={{ marginTop: 14 }}>
            <Card padding="md" radius="xl">
              <div className={a.between}>
                <h2 className="display" style={{ fontSize: 24 }}>
                  Top Creators
                </h2>
                <button type="button" className={a.link} style={{ fontSize: 13 }} onClick={() => nav('/shortlist')}>
                  View all <Icon icon={ArrowRight01Icon} size={14} />
                </button>
              </div>
              {[
                ['Lama Al Mansoori', 'Reach 620K • ER 6.8%', 'noir', true],
                ['Yousef Al Marri', 'Reach 410K • ER 5.1%', 'noir', false],
                ['Mira K.', 'Reach 310K • ER 4.3%', 'sand', false],
              ].map(([n, d, t, top]) => (
                <div key={n as string} className={a.row} style={{ marginTop: 14 }}>
                  <Avatar name={n as string} size={56} tone={t as 'noir'} shape="square" portrait />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{n as string}</div>
                    <div className={a.metaSm}>{d as string}</div>
                  </div>
                  {top ? (
                    <Chip size="xs" tone="tintLight" trailing={<Icon icon={StarIcon} size={12} />}>
                      Top Performer
                    </Chip>
                  ) : (
                    <Icon icon={StarIcon} size={18} color="var(--gold)" />
                  )}
                </div>
              ))}
              <button type="button" onClick={() => toast('Leaderboard (demo)', 'info')} style={{ width: '100%', marginTop: 16, height: 44, borderRadius: 12, background: 'var(--gold-tint)', color: 'var(--gold-deep)', fontSize: 15 }}>
                View full leaderboard
              </button>
            </Card>
            <Card padding="md" radius="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="display" style={{ fontSize: 24, alignSelf: 'flex-start' }}>
                Budget Utilization
              </h2>
              <div style={{ marginTop: 20 }}>
                <Donut value={72} size={190} stroke={13}>
                  <div className="display" style={{ fontSize: 40 }}>
                    72<span style={{ fontSize: 22 }}>%</span>
                  </div>
                  <div style={{ fontSize: 15 }}>AED 72,000</div>
                  <div className={a.metaSm}>of AED 100,000</div>
                </Donut>
              </div>
              <div className={a.meta} style={{ marginTop: 18 }}>
                Spend pacing on track
              </div>
            </Card>
          </div>

          <div className={a.grid2} style={{ marginTop: 14 }}>
            <Card padding="md" radius="xl" onClick={() => nav('/approvals')}>
              <div className={a.row}>
                <IconTile icon={SecurityCheckIcon} size={56} iconSize={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15 }}>Content Approvals</div>
                  <div className={a.num} style={{ fontSize: 30, marginTop: 4 }}>
                    94<span style={{ fontSize: 18 }}>%</span>
                  </div>
                  <div className={a.metaSm}>45 of 48 approved</div>
                </div>
                <Icon icon={ArrowRight01Icon} size={18} />
              </div>
            </Card>
            <Card padding="md" radius="xl" onClick={() => toast('12 contracts active and signed', 'info')}>
              <div className={a.row}>
                <IconTile icon={File01Icon} size={56} iconSize={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15 }}>Contracts</div>
                  <div className={a.num} style={{ fontSize: 30, marginTop: 4 }}>
                    12
                  </div>
                  <div className={a.metaSm}>All active & signed</div>
                </div>
                <Icon icon={ArrowRight01Icon} size={18} />
              </div>
            </Card>
          </div>
        </>
      )}
    </Page>
  )
}
