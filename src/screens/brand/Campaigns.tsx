import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add01Icon, ArrowDown01Icon, ArrowRight01Icon, BarChartIcon, Clock01Icon, File01Icon, MoreHorizontalIcon, Notification01Icon, Search01Icon, SparklesIcon, UserIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar, AvatarStack } from '../../components/Avatar'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { Segmented } from '../../components/Segmented'
import { Art } from '../../components/Art'
import { Sparkline } from '../../components/Charts'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const others = [
  { id: 'eid-edit', name: 'Eid Edit Collection', status: 'Offers out', pct: 67, spend: 'SAR 201,000 of 300,000', art: 'wave' as const, more: 5 },
  { id: 'summer-essentials', name: 'Summer Essentials', status: 'In review', pct: 28, spend: 'SAR 56,000 of 200,000', art: 'silk' as const, more: 3 },
]
const drafts = [{ id: 'glow-launch', name: 'Glow Launch', status: 'Draft', pct: 0, spend: 'No spend yet', art: 'gold' as const, more: 0 }]
const complete = [{ id: 'winter-warmth', name: 'Winter Warmth', status: 'Complete', pct: 100, spend: 'SAR 180,000 of 180,000', art: 'noir' as const, more: 6 }]

export default function Campaigns() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('campaigns')
  const [tab, setTab] = useState('active')
  const list = tab === 'active' ? others : tab === 'drafts' ? drafts : complete

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <button type="button" className={a.row} style={{ gap: 12 }} onClick={() => nav('/profile')}>
          <Avatar name={state.brand.name} size={56} tone="cream" />
          <span style={{ fontSize: 20, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {state.brand.name} <Icon icon={ArrowDown01Icon} size={18} />
          </span>
        </button>
        <div className={a.actions}>
          <IconButton label="Search" variant="plain" onClick={() => nav('/search')}>
            <Icon icon={Search01Icon} size={24} />
          </IconButton>
          <IconButton label="Notifications" variant="plain" onClick={() => nav('/notifications')}>
            <Icon icon={Notification01Icon} size={24} />
          </IconButton>
        </div>
      </div>
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18, fontSize: 'clamp(50px, 14vw, 68px)' }}>
        Campaigns
      </h1>

      <div style={{ marginTop: 18 }}>
        <Segmented items={[{ id: 'active', label: 'Active' }, { id: 'drafts', label: 'Drafts' }, { id: 'complete', label: 'Complete' }]} value={tab} onChange={setTab} dot />
      </div>

      {loading ? (
        <ScreenSkeleton hero={480} tiles={0} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          {tab === 'active' && (
            <Card padding="none" style={{ marginTop: 20 }} radius="xl">
              <div style={{ position: 'relative', padding: '24px 24px 20px', minHeight: 300, background: 'linear-gradient(180deg,#fbf8f2,#f6efe1)' }}>
                <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', maskImage: 'linear-gradient(90deg, transparent, #000 45%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 45%)' }}>
                  <Art kind="silk" />
                </span>
                <div style={{ position: 'relative' }}>
                  <div className={a.between}>
                    <Chip tone="tint" leading={<Icon icon={SparklesIcon} size={16} />}>OFFERS OUT</Chip>
                    <IconButton label="More" size="sm" onClick={() => toast('Duplicate, pause or archive', 'info')}>
                      <Icon icon={MoreHorizontalIcon} size={18} />
                    </IconButton>
                  </div>
                  <div className="display" style={{ fontSize: 46, lineHeight: 1.02, marginTop: 22, maxWidth: '65%' }}>
                    Ramadan Glow Launch
                  </div>
                  <p className={a.meta} style={{ marginTop: 12, fontSize: 16, maxWidth: 280 }}>
                    Shine this Ramadan with radiant essentials.
                  </p>
                </div>
              </div>
              <div style={{ padding: '20px 24px 22px' }}>
                <div className={a.splitStats}>
                  <div>
                    <div className={a.label}>Budget used</div>
                    <div className={a.numLg} style={{ marginTop: 10 }}>
                      42%
                    </div>
                    <div className={a.metaSm} style={{ marginTop: 6 }}>
                      SAR 126,000 of 300,000
                    </div>
                  </div>
                  <div>
                    <div className={a.label}>Creators</div>
                    <div className={a.numLg} style={{ marginTop: 10 }}>
                      8
                    </div>
                    <div className={a.metaSm} style={{ marginTop: 6 }}>
                      8 confirmed
                    </div>
                  </div>
                  <div>
                    <div className={a.label}>Performance</div>
                    <div style={{ height: 44, marginTop: 8 }}>
                      <Sparkline data={[4, 6, 5, 7, 6, 8, 7, 9]} fill={false} dot={false} />
                    </div>
                    <div className={a.metaSm}>On track</div>
                  </div>
                </div>
                <div className={a.bar} style={{ marginTop: 18 }}>
                  <span className={a.barFill} style={{ width: '42%' }} />
                </div>
                <div className={a.between} style={{ marginTop: 8 }}>
                  <span className={a.metaSm}>42% of budget used</span>
                  <span className={a.metaSm}>14 days left</span>
                </div>
                <button type="button" onClick={() => nav('/campaigns/ramadan-2026')} style={{ width: '100%', marginTop: 18, height: 60, borderRadius: 16, background: 'var(--gold-tint)', border: '1px solid var(--gold-soft)', color: 'var(--gold-deep)', fontSize: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  View Campaign <Icon icon={ArrowRight01Icon} size={18} />
                </button>
              </div>
            </Card>
          )}

          <div className={a.section}>
            <div className={a.between} style={{ marginBottom: 12 }}>
              <div className={a.title} style={{ fontSize: 20 }}>
                {tab === 'active' ? 'Other active campaigns' : tab === 'drafts' ? 'Drafts' : 'Completed campaigns'}
              </div>
              <button type="button" className={a.link} onClick={() => toast('Showing all campaigns', 'info')}>
                See all
              </button>
            </div>
            {list.length === 0 ? (
              <Card padding="none">
                <EmptyState title="Nothing here yet" sub="Campaigns will appear here as they move through this stage." action="New campaign" onAction={() => nav('/create')} />
              </Card>
            ) : (
              <div className={a.stack}>
                {list.map((c) => (
                  <Card key={c.id} padding="md" radius="xl" onClick={() => nav(`/campaigns/${c.id}`)}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ width: 96, height: 96, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                        <Art kind={c.art} />
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className={a.between} style={{ alignItems: 'flex-start' }}>
                          <div className="display" style={{ fontSize: 24, lineHeight: 1.1 }}>
                            {c.name}
                          </div>
                          <span className={a.row} style={{ gap: 6 }}>
                            <span className="display" style={{ fontSize: 28 }}>
                              {c.pct}%
                            </span>
                            <Icon icon={ArrowRight01Icon} size={18} />
                          </span>
                        </div>
                        <div className={a.between} style={{ marginTop: 8 }}>
                          <Chip size="xs" tone={c.status === 'Offers out' ? 'tint' : 'soft'} leading={<Icon icon={c.status === 'Offers out' ? SparklesIcon : Clock01Icon} size={12} />}>
                            {c.status.toUpperCase()}
                          </Chip>
                          <span className={a.metaSm}>Budget used</span>
                        </div>
                        <div className={a.bar} style={{ margin: '10px 0 6px' }}>
                          <span className={a.barFill} style={{ width: `${c.pct}%` }} />
                        </div>
                        <div className={a.between}>
                          {c.more > 0 ? <AvatarStack names={['A', 'B', 'C', 'D']} size={28} more={c.more} /> : <span />}
                          <span className={a.metaSm}>{c.spend}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className={a.section}>
            <div className={a.title} style={{ fontSize: 20, marginBottom: 12 }}>
              Quick actions
            </div>
            <div className={a.grid4}>
              {[
                [UserIcon, 'Find creators', '/discover'],
                [Add01Icon, 'New campaign', '/create'],
                [File01Icon, 'Contracts', '/approvals'],
                [BarChartIcon, 'Analytics', '/campaigns/ramadan-2026/analytics'],
              ].map(([ic, l, to]) => (
                <button key={l as string} type="button" onClick={() => nav(to as string)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 12px', borderRadius: 16, border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 14, textAlign: 'left' }}>
                  <Icon icon={ic as typeof UserIcon} size={22} />
                  {l as string}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </Page>
  )
}
