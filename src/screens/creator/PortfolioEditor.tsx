import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, BarChartIcon, Female02Icon, File01Icon, Globe02Icon, Location01Icon, PencilEdit02Icon, ShoppingBag02Icon, Tag01Icon, UserGroupIcon, UserIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { Sheet } from '../../components/Sheet'
import { TextArea } from '../../components/TextArea'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const allCats = ['Beauty', 'Fashion', 'Travel', 'Lifestyle', 'Wellness', 'Food', 'Tech', 'Parenting']

export default function PortfolioEditor() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('portfolio-editor')
  const name = state.session?.name ?? 'Mira Alia'
  const [bio, setBio] = useState('I create elegant, everyday content that inspires confidence and connection. Beauty, style, travel and the moments in between.')
  const [cats, setCats] = useState(['Beauty', 'Fashion', 'Travel', 'Lifestyle', 'Wellness'])
  const [editing, setEditing] = useState<'bio' | 'cats' | null>(null)
  const strength = Math.min(100, 70 + Math.min(cats.length, 5) * 3 + (bio.length > 60 ? 7 : 0))

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={ViewIcon} size={18} />} onClick={() => nav('/creator/media-kit')}>
            Preview
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Portfolio Editor
      </h1>
      <p className={a.sub}>Show brands who you are and what you do.</p>

      {loading ? (
        <ScreenSkeleton hero={220} tiles={0} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl">
        <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', maskImage: 'linear-gradient(90deg, transparent, #000 50%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 50%)' }}>
          <Art kind="silk" />
        </span>
        <div style={{ position: 'relative', padding: 24 }}>
          <div className={a.row} style={{ gap: 20 }}>
            <span style={{ position: 'relative' }}>
              <Avatar name={name} size={150} tone="noir" portrait />
              <button type="button" aria-label="Change photo" onClick={() => toast('Photo picker (demo)', 'info')} style={{ position: 'absolute', right: -4, bottom: 4, width: 48, height: 48, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={PencilEdit02Icon} size={20} />
              </button>
            </span>
            <div>
              <div className="display" style={{ fontSize: 44 }}>
                {name}
              </div>
              <div className={a.meta} style={{ fontSize: 17, marginTop: 4 }}>
                Lifestyle Creator
              </div>
              <div className={a.meta} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <Icon icon={Location01Icon} size={16} /> Dubai, UAE
              </div>
            </div>
          </div>
          <div style={{ marginTop: 26, maxWidth: 320 }}>
            <div className={a.meta}>Profile strength</div>
            <div className={a.row} style={{ gap: 14, marginTop: 8 }}>
              <div className={a.bar} style={{ flex: 1, height: 8 }}>
                <span className={a.barFill} style={{ width: `${strength}%` }} />
              </div>
              <span className="display" style={{ fontSize: 30, color: 'var(--gold-deep)' }}>
                {strength}
              </span>
            </div>
            <div className={a.metaSm} style={{ marginTop: 6 }}>
              {strength >= 95 ? 'Excellent — you’re standing out.' : 'Almost there! Keep it up.'}
            </div>
          </div>
        </div>
      </Card>

      <div className={a.stack} style={{ marginTop: 14 }}>
        <Card padding="md" radius="xl">
          <div style={{ display: 'flex', gap: 18 }}>
            <IconTile icon={UserIcon} size={76} iconSize={32} tone="outline" strokeWidth={1.2} />
            <div style={{ flex: 1 }}>
              <div className={a.between}>
                <h2 className="display" style={{ fontSize: 34 }}>
                  Bio
                </h2>
                <Button size="sm" variant="soft" leading={<Icon icon={PencilEdit02Icon} size={16} />} onClick={() => setEditing('bio')}>
                  Edit
                </Button>
              </div>
              <p className={a.meta} style={{ fontSize: 16, marginTop: 8, lineHeight: 1.5 }}>
                {bio}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md" radius="xl">
          <div style={{ display: 'flex', gap: 18 }}>
            <IconTile icon={Tag01Icon} size={76} iconSize={32} tone="outline" strokeWidth={1.2} />
            <div style={{ flex: 1 }}>
              <div className={a.between}>
                <h2 className="display" style={{ fontSize: 34 }}>
                  Categories
                </h2>
                <Button size="sm" variant="soft" leading={<Icon icon={PencilEdit02Icon} size={16} />} onClick={() => setEditing('cats')}>
                  Edit
                </Button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {cats.map((c) => (
                  <Chip key={c} size="sm" tone="soft">
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md" radius="xl">
          <div style={{ display: 'flex', gap: 18 }}>
            <IconTile icon={UserGroupIcon} size={76} iconSize={32} tone="outline" strokeWidth={1.2} />
            <div style={{ flex: 1 }}>
              <div className={a.between}>
                <h2 className="display" style={{ fontSize: 34 }}>
                  Audience proof
                </h2>
                <Button size="sm" variant="soft" leading={<Icon icon={PencilEdit02Icon} size={16} />} onClick={() => toast('Connect Instagram or TikTok to refresh stats', 'info')}>
                  Edit
                </Button>
              </div>
              <div className={a.splitStats} style={{ marginTop: 16, textAlign: 'center' }}>
                {[
                  [UserGroupIcon, '287K', 'Followers'],
                  [BarChartIcon, '78%', 'Engagement rate'],
                  [Globe02Icon, '74%', 'GCC audience'],
                  [Female02Icon, '83%', 'Female audience'],
                ].map(([ic, v, l]) => (
                  <div key={l as string}>
                    <Icon icon={ic as typeof UserIcon} size={26} color="var(--gold)" style={{ margin: '0 auto' }} />
                    <div className="display" style={{ fontSize: 26, marginTop: 8 }}>
                      {v as string}
                    </div>
                    <div className={a.metaSm}>{l as string}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md" radius="xl">
          <div style={{ display: 'flex', gap: 18 }}>
            <IconTile icon={ShoppingBag02Icon} size={76} iconSize={32} tone="outline" strokeWidth={1.2} />
            <div style={{ flex: 1 }}>
              <div className={a.between}>
                <h2 className="display" style={{ fontSize: 34 }}>
                  Featured work
                </h2>
                <Button size="sm" variant="soft" leading={<Icon icon={PencilEdit02Icon} size={16} />} onClick={() => nav('/onboarding/creator/work')}>
                  Edit
                </Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 14 }}>
                {(['silk', 'gold', 'marble', 'arch'] as const).map((k) => (
                  <span key={k} style={{ aspectRatio: '1 / 1', borderRadius: 12, overflow: 'hidden' }}>
                    <Art kind={k} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className={a.banner}>
          <IconTile icon={File01Icon} size={70} iconSize={30} tone="outline" />
          <div className={a.bannerBody}>
            <div className="display" style={{ fontSize: 30 }}>
              Media kit
            </div>
            <div className={a.bannerSub} style={{ fontSize: 15 }}>
              Your one-pager for brands and collaborations.
            </div>
          </div>
          <Button size="md" variant="soft" onClick={() => nav('/creator/media-kit')}>
            View / Edit
          </Button>
        </div>
      </div>
        </>
      )}

      <Sheet open={editing === 'bio'} onClose={() => setEditing(null)} label="Edit bio">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Bio
        </h2>
        <div style={{ marginTop: 16 }}>
          <TextArea aria-label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} max={300} rows={5} />
        </div>
        <Button block style={{ marginTop: 14 }} onClick={() => { setEditing(null); toast('Bio updated') }}>
          Save
        </Button>
      </Sheet>
      <Sheet open={editing === 'cats'} onClose={() => setEditing(null)} label="Edit categories">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Categories
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
          {allCats.map((c) => (
            <Chip key={c} selected={cats.includes(c)} onClick={() => setCats((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]))}>
              {c}
            </Chip>
          ))}
        </div>
        <Button block style={{ marginTop: 20 }} onClick={() => { setEditing(null); toast('Categories updated') }}>
          Save
        </Button>
      </Sheet>
    </Page>
  )
}
