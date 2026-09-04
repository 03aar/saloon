import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, Image01Icon, Location01Icon, PlayCircleIcon, SecurityCheckIcon, Share01Icon, SmartPhone01Icon, SquareLock02Icon, StarIcon, TradeUpIcon, UserGroupIcon, VideoReplayIcon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

export default function MediaKit() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('media-kit')
  const name = state.session?.name ?? 'Mira Alia'

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={Share01Icon} size={18} />} onClick={() => toast('Media kit link copied')}>
            Share
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Media Kit Preview
      </h1>
      <p className={a.sub}>This is how brands see your media kit.</p>

      {loading ? (
        <ScreenSkeleton hero={250} tiles={3} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <Card padding="md" style={{ marginTop: 22 }} radius="xl">
        <div style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: 22 }}>
          <span style={{ borderRadius: '60px 60px 16px 16px', overflow: 'hidden', minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)' }}>
            <Avatar name={name} size={200} tone="noir" portrait />
          </span>
          <div>
            <div className="display" style={{ fontSize: 44 }}>
              {name}
            </div>
            <div className="eyebrow" style={{ fontSize: 13, marginTop: 8 }}>
              Creator • Dubai
            </div>
            <div className={a.divider} style={{ margin: '18px 0' }} />
            <p className={a.meta} style={{ fontSize: 16, lineHeight: 1.5 }}>
              I create elevated content around style, beauty and modern living in the GCC. Storytelling that feels authentic and drives results.
            </p>
          </div>
        </div>
        <div className={a.splitStats} style={{ marginTop: 24, gridAutoColumns: '1fr 1fr 1.4fr' }}>
          {[
            [UserGroupIcon, '420K', 'Audience'],
            [TradeUpIcon, '4.8%', 'Engagement'],
            [Location01Icon, 'UAE • KSA • Kuwait', 'Top Locations'],
          ].map(([ic, v, l]) => (
            <div key={l as string} style={{ borderLeft: 'none', padding: '0 8px 0 0' }}>
              <Icon icon={ic as typeof UserGroupIcon} size={26} color="var(--gold)" />
              <div className="display" style={{ fontSize: 28, marginTop: 10 }}>
                {v as string}
              </div>
              <div className={a.meta} style={{ marginTop: 4 }}>
                {l as string}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="none" style={{ marginTop: 14, position: 'relative', overflow: 'hidden' }} radius="xl">
        <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', maskImage: 'linear-gradient(90deg, transparent, #000 50%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 50%)' }}>
          <Art kind="marble" />
        </span>
        <div style={{ position: 'relative', padding: 24 }}>
          <h2 className="display" style={{ fontSize: 30 }}>
            Content Focus
          </h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {['Style', 'Beauty', 'Lifestyle'].map((c) => (
              <Chip key={c} tone="soft" size="md" className="">
                <span style={{ letterSpacing: '0.1em', fontSize: 14 }}>{c.toUpperCase()}</span>
              </Chip>
            ))}
          </div>
        </div>
      </Card>

      <Card padding="md" style={{ marginTop: 14 }} radius="xl">
        <div className={a.between}>
          <h2 className="display" style={{ fontSize: 30 }}>
            Recent Work
          </h2>
          <button type="button" className={a.link} onClick={() => nav('/creator/portfolio')}>
            View all <Icon icon={ArrowRight01Icon} size={16} />
          </button>
        </div>
        <div className={a.grid3} style={{ marginTop: 16 }}>
          {[
            ['Radiant Layers', 'silk'],
            ['Glow Edit', 'gold'],
            ['Modern Living', 'marble'],
          ].map(([t, k]) => (
            <div key={t} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--surface-2)' }}>
              <span style={{ display: 'block', height: 200 }}>
                <Art kind={k as 'silk'} />
              </span>
              <div style={{ padding: '12px 14px 14px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{t}</div>
                <div className="eyebrow" style={{ fontSize: 10, marginTop: 4 }}>
                  Campaign
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="md" style={{ marginTop: 14 }} radius="xl">
        <h2 className="display" style={{ fontSize: 30 }}>
          Rate Card (AED)
        </h2>
        {[
          [Image01Icon, 'Instagram Post', '8,500'],
          [VideoReplayIcon, 'Instagram Reel', '12,500'],
          [PlayCircleIcon, 'YouTube Integration', '18,000'],
          [SmartPhone01Icon, 'Instagram Story (set of 3)', '4,000'],
        ].map(([ic, l, v], i) => (
          <div key={l as string} className={a.between} style={{ padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none', marginTop: i ? 0 : 8 }}>
            <span className={a.row} style={{ gap: 12, fontSize: 16 }}>
              <Icon icon={ic as typeof Image01Icon} size={22} color="var(--gold)" /> {l as string}
            </span>
            <span style={{ fontSize: 17 }}>{v as string}</span>
          </div>
        ))}
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 8px 8px', color: 'var(--ink-2)', fontSize: 15 }}>
        <span className={a.row} style={{ gap: 8 }}>
          <Icon icon={SecurityCheckIcon} size={18} /> Verified Creator
        </span>
        <span className={a.row} style={{ gap: 8 }}>
          <Icon icon={StarIcon} size={18} /> Top Rated
        </span>
        <span className={a.row} style={{ gap: 8 }}>
          <Icon icon={SquareLock02Icon} size={18} /> Secure Payouts
        </span>
      </div>
        </>
      )}
    </Page>
  )
}
