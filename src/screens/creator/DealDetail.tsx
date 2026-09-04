import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, Bookmark02Icon, CheckmarkCircle02Icon, DollarCircleIcon, File01Icon, Globe02Icon, SecurityCheckIcon, SquareLock02Icon, Tag01Icon, Target02Icon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar, AvatarStack } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { ScreenHeader } from '../../components/ScreenHeader'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { deals } from '../../data/deals'
import a from '../../components/app.module.css'

export default function DealDetail() {
  const nav = useNavigate()
  const { id } = useParams()
  const { state, toggleSaved } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`deal-${id}`)
  const d = deals.find((x) => x.id === id)
  if (!d) {
    return (
      <Page layout="app">
        <ScreenHeader title="Deal not found" back="/creator/deals" sub="This opportunity may have closed." />
      </Page>
    )
  }
  const saved = state.saved.includes(d.id)

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <IconButton label={saved ? 'Unsave' : 'Save'} active={saved} onClick={() => { toggleSaved(d.id); toast(saved ? 'Removed from saved' : 'Deal saved') }}>
            <Icon icon={Bookmark02Icon} size={20} />
          </IconButton>
        }
      />
      {loading ? (
        <ScreenSkeleton hero={300} tiles={4} rows={1} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
            {d.name}
          </h1>
          <div className={a.row} style={{ marginTop: 12, gap: 12 }}>
            {d.isNew && (
              <Chip size="sm" tone="tint">
                New
              </Chip>
            )}
            <span className={a.meta} style={{ fontSize: 16 }}>
              Posted {d.posted} &nbsp;•&nbsp; Closes {d.closes}
            </span>
          </div>

          <Card padding="md" style={{ marginTop: 18 }} radius="xl" onClick={() => toast(`${d.brand} brand profile (demo)`, 'info')}>
            <div className={a.row} style={{ gap: 18 }}>
              <Avatar name={d.brand} size={110} tone="noir" />
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {d.brand} <Verified size={20} />
                </div>
                <div className={a.meta} style={{ fontSize: 17, marginTop: 4 }}>
                  {d.category} &nbsp;•&nbsp; {d.region}
                </div>
              </div>
              <IconButton label="Open brand" size="lg">
                <Icon icon={ArrowRight01Icon} size={20} />
              </IconButton>
            </div>
          </Card>

          <div style={{ height: 300, borderRadius: 26, overflow: 'hidden', marginTop: 14 }}>
            <Art kind={d.art} />
          </div>

          <Card padding="none" style={{ marginTop: 14 }} radius="xl">
            <div className={a.grid4} style={{ gap: 0 }}>
              {[
                [Target02Icon, 'Deadline', d.closes],
                [Wallet02Icon, 'Budget Range', d.brief.budget.replace('SAR ', 'SAR ')],
                [Tag01Icon, 'Category', d.category],
                [Globe02Icon, 'Region', d.region],
              ].map(([ic, l, v], i) => (
                <div key={l as string} style={{ padding: '20px 8px', textAlign: 'center', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
                  <Icon icon={ic as typeof Tag01Icon} size={28} color="var(--gold)" strokeWidth={1.3} style={{ margin: '0 auto' }} />
                  <div className={a.metaSm} style={{ marginTop: 12 }}>
                    {l as string}
                  </div>
                  <div style={{ fontSize: 17, marginTop: 6 }}>{v as string}</div>
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 14, marginTop: 14 }}>
            <Card padding="md" radius="xl">
              <h2 className="display" style={{ fontSize: 32 }}>
                Brief
              </h2>
              {[
                ['Objective', d.brief.objective],
                ['Deliverables', d.brief.deliverables],
                ['Deadline', d.brief.deadline],
                ['Budget Range', d.brief.budget],
              ].map(([l, v], i) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 8, paddingTop: 16, marginTop: i ? 14 : 4, borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', marginTop: 8 }} />
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500 }}>{l}</div>
                    <p className={a.meta} style={{ marginTop: 4, lineHeight: 1.45 }}>
                      {v}
                    </p>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => toast('Full brief (demo)', 'info')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginLeft: 'auto', marginTop: -20 }}>
                <IconTile icon={File01Icon} size={56} iconSize={24} tone="surface" />
                <span className={a.metaSm}>View full brief ›</span>
              </button>
            </Card>
            <Card padding="md" radius="xl">
              <h2 className="display" style={{ fontSize: 30, lineHeight: 1.05 }}>
                Why you match
              </h2>
              {['Your glow-forward content aligns with our brand aesthetic', 'Strong resonance with GCC women 18–34', 'Proven performance in skincare campaigns'].map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: 10, paddingTop: 14, marginTop: i ? 12 : 8, borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <Icon icon={CheckmarkCircle02Icon} size={22} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <p className={a.meta} style={{ fontSize: 14, lineHeight: 1.4 }}>
                    {t}
                  </p>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <AvatarStack names={['Noor', 'Lama', 'Hessa']} size={44} more={3} />
                <div className={a.metaSm} style={{ marginTop: 8 }}>
                  6 creators shortlisted
                </div>
              </div>
            </Card>
          </div>

          <div className={a.banner} style={{ marginTop: 14 }}>
            <IconTile icon={DollarCircleIcon} size={56} iconSize={26} />
            <div className={a.bannerBody}>
              <div className={a.meta}>Compensation</div>
              <div className="display" style={{ fontSize: 24 }}>
                Paid collaboration
              </div>
            </div>
            <Chip leading={<Icon icon={SecurityCheckIcon} size={18} color="var(--gold)" />}>Payment via Bloop</Chip>
          </div>

          <Footer app>
            <div className={a.grid2}>
              <Button variant="dark" onClick={() => nav('/creator/pitch', { state: { dealId: d.id } })}>
                I’m interested
              </Button>
              <Button variant="soft" leading={<Icon icon={Bookmark02Icon} size={20} />} onClick={() => { toggleSaved(d.id); toast(saved ? 'Removed from saved' : 'Deal saved') }}>
                {saved ? 'Saved' : 'Save deal'}
              </Button>
            </div>
            <span className={a.footnote} style={{ justifyContent: 'flex-start' }}>
              <Icon icon={SquareLock02Icon} size={13} /> Your interest is private to the brand
            </span>
          </Footer>
        </>
      )}
    </Page>
  )
}
