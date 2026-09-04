import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, BarChartIcon, Clock01Icon, FilterIcon, Image01Icon, Notification01Icon, PlayIcon, SecurityCheckIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Segmented } from '../../components/Segmented'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { drafts } from '../../data/drafts'
import a from '../../components/app.module.css'
import s from './brand.module.css'


export default function ApprovalQueue() {
  const nav = useNavigate()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('approvals')
  const [tab, setTab] = useState('queue')
  const list = tab === 'queue' ? drafts : tab === 'approved' ? drafts.slice(0, 1) : []

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(40px, 11vw, 54px)' }}>
            Draft Approval Queue
          </h1>
          <p className={a.sub}>Review creator drafts and approve content for launch.</p>
        </div>
        <IconButton label="Notifications" dot onClick={() => nav('/notifications')} style={{ borderRadius: 16, width: 52, height: 52 }}>
          <Icon icon={Notification01Icon} size={22} />
        </IconButton>
      </div>

      {loading ? (
        <ScreenSkeleton hero={340} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <section className={[s.heroDark, a.dark].join(' ')} style={{ marginTop: 22 }}>
            <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', opacity: 0.8 }}>
              <Art kind="noir" />
            </span>
            <div style={{ position: 'relative', maxWidth: '62%' }}>
              <span className={a.darkEyebrow}>Awaiting your review</span>
              <div className="display" style={{ fontSize: 88, lineHeight: 1, marginTop: 12, color: '#fff' }}>
                {drafts.length}
              </div>
              <div className="display" style={{ fontSize: 36, color: '#fff', marginTop: 8 }}>
                Drafts waiting
              </div>
              <p className={s.heroSub} style={{ maxWidth: 'none' }}>
                Timely approvals keep campaigns on track and creators moving.
              </p>
              <Button size="md" style={{ marginTop: 22 }} spread trailing={<Icon icon={ArrowRight01Icon} size={18} />} onClick={() => nav(`/approvals/${drafts[0].id}`)}>
                Review first draft
              </Button>
            </div>
          </section>

          <div className={a.row} style={{ marginTop: 18, gap: 10 }}>
            <div style={{ flex: 1 }}>
              <Segmented variant="underline" size="sm" items={[{ id: 'queue', label: `Queue (${drafts.length})` }, { id: 'approved', label: 'Approved' }, { id: 'changes', label: 'Changes' }]} value={tab} onChange={setTab} />
            </div>
            <IconButton label="Filter" size="lg" onClick={() => toast('Filter by campaign or deliverable', 'info')} style={{ borderRadius: 16 }}>
              <Icon icon={FilterIcon} size={20} />
            </IconButton>
          </div>

          {list.length === 0 ? (
            <Card padding="none" style={{ marginTop: 16 }}>
              <EmptyState icon={SecurityCheckIcon} title="No drafts here" sub="Drafts with requested changes will show up here once creators are notified." />
            </Card>
          ) : (
            <div className={a.stack} style={{ marginTop: 16 }}>
              {list.map((d) => (
                <Card key={d.id} padding="md" radius="xl" onClick={() => nav(`/approvals/${d.id}`)}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <Avatar name={d.name} size={96} tone={d.tone} portrait={d.photo} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={a.between} style={{ alignItems: 'flex-start' }}>
                        <div className="display" style={{ fontSize: 26, display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.05 }}>
                          {d.name} <Verified size={18} />
                        </div>
                        <Icon icon={ArrowRight01Icon} size={18} />
                      </div>
                      <div className={a.metaSm} style={{ marginTop: 6 }}>
                        Campaign: <span style={{ color: 'var(--ink-2)' }}>{d.campaign}</span>
                      </div>
                      <div className={a.metaSm}>
                        Deliverable: <span style={{ color: 'var(--ink-2)' }}>{d.deliverable}</span>
                      </div>
                      <div className={a.between} style={{ marginTop: 10, flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Chip size="xs" leading={<Icon icon={PlayIcon} size={12} />}>
                            {d.len}
                          </Chip>
                          <Chip size="xs" leading={<Icon icon={Image01Icon} size={12} />}>
                            {d.frames}
                          </Chip>
                        </div>
                        <div className={a.row} style={{ gap: 8 }}>
                          <Chip size="xs" tone="tint" leading={<Icon icon={Clock01Icon} size={12} />}>
                            {d.due}
                          </Chip>
                          <span className={a.metaSm}>{d.ago}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className={a.banner} style={{ marginTop: 16 }}>
            <Icon icon={SecurityCheckIcon} size={34} color="var(--gold)" strokeWidth={1.2} />
            <div className={a.bannerBody}>
              <div className={a.bannerTitle}>Approvals keep everything moving</div>
              <div className={a.bannerSub}>Average approval time: 18h</div>
            </div>
            <Button size="sm" variant="soft" leading={<Icon icon={BarChartIcon} size={16} />} onClick={() => nav('/campaigns/ramadan-2026/analytics')}>
              View insights
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
