import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft01Icon, BarChartIcon, FileEditIcon, LinkSquare02Icon, MoreHorizontalIcon, Notification01Icon, Rocket01Icon, SecurityCheckIcon, SentIcon, Tick02Icon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Toggle } from '../../components/Toggle'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const steps = [
  { i: SentIcon, t: 'Brief sent', d: 'The brief has been shared with shortlisted creators.', date: 'Jun 21', detail: 'Sent to 12 creators. 10 opened the brief within 24 hours.' },
  { i: UserGroupIcon, t: 'Creator shortlist', d: 'Shortlisted creators have been notified.', date: 'Jun 24', detail: '8 creators confirmed participation. 2 declined due to scheduling.' },
  { i: FileEditIcon, t: 'Content draft', d: 'Creators are submitting drafts for review.', date: 'Jul 3', detail: '6 of 8 drafts received. 2 approved, 4 in review.' },
  { i: Rocket01Icon, t: 'Launch', d: 'Content goes live across agreed channels.', date: 'Jul 10', detail: 'Staggered launch: Reels on Jul 10, Stories from Jul 12.' },
  { i: BarChartIcon, t: 'Report', d: 'Performance report and insights delivered.', date: 'Jul 17', detail: 'Full report includes reach, engagement and sales lift.' },
]

export default function CampaignTimeline() {
  const nav = useNavigate()
  const { id = 'ramadan-2026' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`timeline-${id}`)
  const [open, setOpen] = useState<number | null>(null)
  const [auto, setAuto] = useState(true)

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
            <IconButton label="Notifications" dot onClick={() => nav('/notifications')}>
              <Icon icon={Notification01Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => toast('Share timeline or export', 'info')}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Campaign
        <br />
        Timeline
      </h1>

      {loading ? (
        <ScreenSkeleton hero={180} tiles={0} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card padding="none" style={{ marginTop: 22 }} radius="xl">
            <div style={{ display: 'flex', gap: 18 }}>
              <span style={{ width: 170, flexShrink: 0, minHeight: 190 }}>
                <Art kind="marble" />
              </span>
              <div style={{ padding: '22px 18px 20px 0', flex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 500 }}>Summer Glow Launch</div>
                <div className={a.meta} style={{ fontSize: 16, marginTop: 4 }}>
                  Skincare &nbsp;•&nbsp; GCC
                </div>
                <div className={a.row} style={{ marginTop: 22, gap: 12, flexWrap: 'wrap' }}>
                  <span className={a.status}>
                    <i />
                    Active
                  </span>
                  <span className={a.metaSm} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon icon={UserGroupIcon} size={16} /> 8 Creators
                  </span>
                  <span className={a.metaSm} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Icon icon={Wallet02Icon} size={16} /> AED 120K
                  </span>
                  <IconButton label="Open campaign" size="sm" style={{ marginLeft: 'auto', borderRadius: 12 }} onClick={() => nav(`/campaigns/${id}`)}>
                    <Icon icon={LinkSquare02Icon} size={18} />
                  </IconButton>
                </div>
              </div>
            </div>
          </Card>

          <div style={{ position: 'relative', marginTop: 8, paddingLeft: 92 }}>
            <span style={{ position: 'absolute', left: 39, top: 0, bottom: 20, width: 1.5, background: 'var(--gold)' }} />
            {steps.map((st, i) => {
              const isOpen = open === i
              return (
                <div key={st.t} style={{ position: 'relative', marginTop: i ? 18 : 12 }}>
                  <span style={{ position: 'absolute', left: -92, top: 14, width: 80, height: 80, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon icon={st.i} size={30} strokeWidth={1.3} />
                    <span style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)', border: '3px solid var(--bg)' }} />
                  </span>
                  <Card padding="md" radius="xl" as="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <div className={a.between} style={{ alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 24, fontWeight: 500 }}>{st.t}</div>
                        <p className={a.meta} style={{ marginTop: 6, fontSize: 16, lineHeight: 1.4 }}>
                          {st.d}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                        <span className={a.meta} style={{ fontSize: 16 }}>
                          {st.date}
                        </span>
                        <Chip size="sm" tone="tintLight" leading={<Icon icon={Tick02Icon} size={14} />}>
                          Approved
                        </Chip>
                      </div>
                      <Icon icon={ArrowDown01Icon} size={20} style={{ marginLeft: 8, marginTop: 30, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
                    </div>
                    {isOpen && (
                      <p style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 15, color: 'var(--ink-2)' }}>
                        {st.detail}
                      </p>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>

          <div className={a.banner} style={{ marginTop: 18 }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gold-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)' }}>
              <Icon icon={SecurityCheckIcon} size={22} />
            </span>
            <div className={a.bannerBody}>
              <div className={a.bannerTitle}>Auto-approve content</div>
              <div className={a.bannerSub}>Creators can publish after final approval.</div>
            </div>
            <Toggle checked={auto} onChange={(v) => { setAuto(v); toast(v ? 'Auto-approve enabled' : 'Auto-approve disabled', 'info') }} label="Auto-approve content" />
          </div>
        </>
      )}
    </Page>
  )
}
