import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, Calendar03Icon, Notification01Icon, SecurityCheckIcon, SlidersHorizontalIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Ring } from '../../components/Ring'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { collabs } from '../../data/collabs'
import a from '../../components/app.module.css'

export default function Collabs() {
  const nav = useNavigate()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('collabs')
  const featured = collabs[0]

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(54px, 15vw, 74px)' }}>
            Collabs
          </h1>
          <p className={a.sub}>Active collaborations</p>
        </div>
        <div className={a.actions}>
          <IconButton label="Notifications" size="lg" onClick={() => nav('/notifications')}>
            <Icon icon={Notification01Icon} size={22} />
          </IconButton>
          <IconButton label="Filter" size="lg" onClick={() => toast('Filter collaborations (demo)', 'info')}>
            <Icon icon={SlidersHorizontalIcon} size={22} />
          </IconButton>
        </div>
      </div>

      {loading ? (
        <ScreenSkeleton hero={520} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : collabs.length === 0 ? (
        <Card padding="none" style={{ marginTop: 22 }}>
          <EmptyState title="No active collaborations yet" sub="Accepted deals and their delivery timeline will show up here." action="Find deals" onAction={() => nav('/creator/deals')} />
        </Card>
      ) : (
        <>
          <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl">
            <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '42%' }}>
              <Art kind="arch" />
            </span>
            <div style={{ position: 'relative', padding: '24px 24px 0', maxWidth: '60%' }}>
              <div className={a.row} style={{ gap: 12 }}>
                <Chip size="sm" selected selectedStyle="outline" className="">
                  <span style={{ color: 'var(--gold-deep)', letterSpacing: '0.06em' }}>DRAFT</span>
                </Chip>
                <span style={{ color: 'var(--gold-deep)', fontSize: 17 }}>Due in 2 days</span>
              </div>
              <div className="display" style={{ fontSize: 44, marginTop: 20, lineHeight: 1.05 }}>
                {featured.campaign}
              </div>
              <div className={a.row} style={{ marginTop: 22, gap: 12 }}>
                <Avatar name={featured.brand} size={50} tone="cream" />
                <span style={{ letterSpacing: '0.16em', fontSize: 14, fontWeight: 500 }}>{featured.brand.toUpperCase()}</span>
              </div>
              <div className={a.between} style={{ marginTop: 30 }}>
                <span style={{ fontSize: 17 }}>Progress</span>
                <span style={{ fontSize: 17, fontWeight: 500 }}>{featured.progress}%</span>
              </div>
              <div className={a.bar} style={{ marginTop: 10, height: 8 }}>
                <span className={a.barFill} style={{ width: `${featured.progress}%` }} />
              </div>
            </div>
            <div className={a.row} style={{ position: 'relative', marginTop: 26, borderTop: '1px solid var(--line)', padding: '20px 24px 22px', maxWidth: '60%' }}>
              <div style={{ paddingRight: 22, borderRight: '1px solid var(--line)' }}>
                <div className={a.meta}>Payout</div>
                <div className="display" style={{ fontSize: 34 }}>
                  {featured.payout}
                </div>
              </div>
              <Button size="md" variant="soft" trailing={<Icon icon={ArrowRight01Icon} size={16} />} onClick={() => nav(`/creator/collabs/${featured.id}`)} style={{ color: 'var(--gold-deep)', marginLeft: 14 }}>
                View details
              </Button>
            </div>
          </Card>

          <div className={a.between} style={{ marginTop: 30, marginBottom: 14 }}>
            <h2 className="display" style={{ fontSize: 34 }}>
              All active ({collabs.length - 1})
            </h2>
            <button type="button" className={a.link} style={{ fontSize: 17 }} onClick={() => toast('Showing all collaborations', 'info')}>
              See all <Icon icon={ArrowRight01Icon} size={16} />
            </button>
          </div>
          <div className={a.stack}>
            {collabs.slice(1).map((c) => (
              <Card key={c.id} padding="md" radius="xl" onClick={() => nav(`/creator/collabs/${c.id}`)}>
                <div className={a.row} style={{ gap: 16 }}>
                  <span style={{ width: 160, height: 160, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                    <Art kind={c.art} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={a.row} style={{ gap: 12 }}>
                      <Avatar name={c.brand} size={50} tone="cream" />
                      <span className="display" style={{ fontSize: 28 }}>
                        {c.brand}
                      </span>
                    </div>
                    <div className={a.meta} style={{ fontSize: 17, marginTop: 10 }}>
                      {c.campaign}
                    </div>
                    <div className={a.meta} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                      <Icon icon={Calendar03Icon} size={16} /> Due in {c.dueDays} days
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <Chip size="xs" selected selectedStyle="outline" className="">
                        <span style={{ color: 'var(--gold-deep)', letterSpacing: '0.08em' }}>{c.status.toUpperCase()}</span>
                      </Chip>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', borderLeft: '1px solid var(--line)', paddingLeft: 16 }}>
                    <Ring value={c.progress} size={76} stroke={5}>
                      <span style={{ fontSize: 15 }}>{c.progress}%</span>
                    </Ring>
                    <div className={a.meta} style={{ marginTop: 10 }}>
                      Payout
                    </div>
                    <div className="display" style={{ fontSize: 26 }}>
                      {c.payout}
                    </div>
                  </div>
                  <Icon icon={ArrowRight01Icon} size={20} color="var(--gold)" />
                </div>
              </Card>
            ))}
          </div>

          <div className={a.banner} style={{ marginTop: 14 }}>
            <Icon icon={SecurityCheckIcon} size={44} color="var(--gold)" strokeWidth={1.1} />
            <div className={a.bannerBody}>
              <div className="display" style={{ fontSize: 24 }}>
                You’re protected
              </div>
              <div className={a.bannerSub}>Contracts signed. Payments secured by Bloop.</div>
            </div>
            <Button size="md" variant="soft" trailing={<Icon icon={ArrowRight01Icon} size={16} />} onClick={() => nav('/creator/contract')} style={{ color: 'var(--gold-deep)' }}>
              View contracts
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
