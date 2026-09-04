import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowUpRight01Icon, Bookmark02Icon, Location01Icon, SentIcon, Settings02Icon, Share01Icon, SparklesIcon, UserGroupIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Sparkline } from '../../components/Charts'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const kpis = [
  { i: ViewIcon, l: 'Profile views', v: '1,842', d: '24%', data: [3, 5, 4, 6, 5, 8, 7, 9] },
  { i: Bookmark02Icon, l: 'Brand saves', v: '356', d: '18%', data: [2, 4, 3, 5, 6, 5, 7, 8] },
  { i: SentIcon, l: 'Pitch response', v: '38%', d: '12%', data: [2, 3, 5, 4, 6, 7, 6, 8] },
  { i: UserGroupIcon, l: 'Collab interest', v: '27', d: '29%', data: [1, 3, 2, 4, 5, 4, 6, 7] },
]

export default function ProfileAnalytics() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('profile-analytics')
  const name = state.session?.name ?? 'Mira Alia'

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 12, alignItems: 'flex-start' }}>
        <div className={a.row} style={{ gap: 20 }}>
          <Avatar name={name} size={150} tone="noir" portrait />
          <div>
            <div className="display" style={{ fontSize: 38 }}>
              {name}
            </div>
            <div className={a.meta} style={{ fontSize: 17, marginTop: 4 }}>
              Lifestyle &amp; Beauty Creator
            </div>
            <div className={a.meta} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <Icon icon={Location01Icon} size={16} /> Dubai, UAE
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <IconButton label="Share profile" size="lg" onClick={() => toast('Profile link copied')}>
            <Icon icon={Share01Icon} size={22} />
          </IconButton>
          <IconButton label="Settings" size="lg" onClick={() => nav('/creator/settings')}>
            <Icon icon={Settings02Icon} size={22} />
          </IconButton>
        </div>
      </div>
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 34 }}>
        Profile Analytics
      </h1>
      <p className={a.sub}>Your profile performance at a glance</p>

      {loading ? (
        <ScreenSkeleton hero={360} tiles={2} rows={0} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden', minHeight: 380 }} radius="xl" className={a.dark}>
            <div style={{ position: 'absolute', right: 0, bottom: 0, width: '70%', height: '90%', color: '#fff' }}>
              <Sparkline data={[2, 3, 4, 6, 9, 14, 20, 25, 28, 30]} strokeWidth={2.4} />
            </div>
            <div style={{ position: 'relative', padding: 28 }}>
              <span className={a.darkEyebrow} style={{ fontSize: 14 }}>
                Profile strength
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 14 }}>
                <span className="display" style={{ fontSize: 110, color: '#fff', lineHeight: 0.9 }}>
                  92
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }}>/ 100</span>
              </div>
              <div style={{ fontSize: 30, marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                Excellent <Icon icon={SparklesIcon} size={22} color="var(--gold)" />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginTop: 8 }}>You’re standing out to brands.</p>
            </div>
          </Card>

          <div className={a.grid2} style={{ marginTop: 14 }}>
            {kpis.map((k) => (
              <Card key={k.l} padding="none" radius="xl" onClick={() => toast(`${k.l} breakdown (demo)`, 'info')}>
                <div style={{ padding: '20px 20px 0' }}>
                  <div className={a.between}>
                    <IconTile icon={k.i} size={52} iconSize={24} tone="surface" strokeWidth={1.2} />
                    <Icon icon={ArrowRight01Icon} size={18} />
                  </div>
                  <div style={{ fontSize: 16, marginTop: 14 }}>{k.l}</div>
                  <div className="display" style={{ fontSize: 40, marginTop: 4 }}>
                    {k.v}
                  </div>
                  <div className={a.metaSm} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                    <Icon icon={ArrowUpRight01Icon} size={14} color="var(--gold)" /> <span style={{ color: 'var(--gold-deep)' }}>{k.d}</span> vs last 7 days
                  </div>
                </div>
                <div style={{ height: 90, marginTop: 6 }}>
                  <Sparkline data={k.data} strokeWidth={2} />
                </div>
              </Card>
            ))}
          </div>

          <div className={[a.banner, a.wrapRow].join(' ')} style={{ marginTop: 14 }}>
            <IconTile icon={SparklesIcon} size={56} iconSize={26} />
            <div className={a.bannerBody}>
              <div className={a.bannerTitle} style={{ fontSize: 19 }}>
                Improve your profile
              </div>
              <div className={a.bannerSub}>Add key details to boost your visibility and attract more brands.</div>
            </div>
            <Button size="md" trailing={<Icon icon={ArrowRight01Icon} size={16} />} onClick={() => nav('/creator/portfolio')}>
              Improve profile
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
