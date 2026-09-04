import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon, Globe02Icon, Notification01Icon, PencilEdit02Icon, SparklesIcon, Store01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const items = [
  { t: 'Hook & First 3 Seconds', d: 'Great start! Consider highlighting the before/after a bit sooner.', done: true },
  { t: 'Product Benefits', d: 'Looks good! Please mention hydration benefit explicitly.', done: true },
  { t: 'Call to Action', d: 'Add a soft CTA to drive traffic to the Ramadan Glow collection.', done: false },
]

export default function BrandFeedback() {
  const nav = useNavigate()
  const { id = 'summer-glow' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`feedback-${id}`)
  const [state, setState] = useState(items)

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft01Icon} size={26} />
          </IconButton>
        }
        right={
          <IconButton label="Notifications" variant="plain" dot onClick={() => nav('/notifications')}>
            <Icon icon={Notification01Icon} size={24} />
          </IconButton>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Brand Feedback
      </h1>
      <p className={a.sub}>See brand feedback and requested changes.</p>

      {loading ? (
        <ScreenSkeleton hero={320} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#fcfaf5,#f6efe0)' }} radius="xl">
            <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%', maskImage: 'linear-gradient(90deg, transparent, #000 40%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 40%)' }}>
              <Art kind="arch" />
            </span>
            <span style={{ position: 'absolute', right: 30, bottom: 90, width: 110, height: 110, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--gold-deep)' }}>
              L
            </span>
            <div style={{ position: 'relative', padding: 24 }}>
              <Chip size="sm" selected selectedStyle="outline" leading={<span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />} className="">
                <span style={{ color: 'var(--gold-deep)', letterSpacing: '0.08em' }}>IN REVIEW</span>
              </Chip>
              <div className="display" style={{ fontSize: 44, marginTop: 24, lineHeight: 1.05 }}>
                Ramadan Glow
              </div>
              <div className={a.meta} style={{ fontSize: 18, marginTop: 6 }}>
                by Lumière Beauty
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
                <span className={a.row} style={{ gap: 12 }}>
                  <Icon icon={Calendar03Icon} size={26} strokeWidth={1.3} />
                  <span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      Campaign window
                    </span>
                    <span>Mar 1 – Mar 20</span>
                  </span>
                </span>
                <span className={a.row} style={{ gap: 12 }}>
                  <Icon icon={Globe02Icon} size={26} strokeWidth={1.3} />
                  <span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      Markets
                    </span>
                    <span>GCC</span>
                  </span>
                </span>
              </div>
              <Button variant="soft" size="md" style={{ marginTop: 22, width: '70%', justifyContent: 'space-between' }} trailing={<Icon icon={ArrowRight01Icon} size={18} />} onClick={() => nav(`/creator/collabs/${id}`)}>
                View campaign details
              </Button>
            </div>
          </Card>

          <div className={a.between} style={{ marginTop: 26, marginBottom: 14 }}>
            <h2 className="display" style={{ fontSize: 30 }}>
              Feedback ({state.length})
            </h2>
            <button type="button" className={a.link} onClick={() => toast('Brief (demo)', 'info')}>
              View brief
            </button>
          </div>
          <div className={a.stack}>
            {state.map((f, i) => (
              <Card key={f.t} padding="md" radius="xl">
                <div className={a.row} style={{ gap: 18 }}>
                  <span style={{ width: 62, height: 62, borderRadius: '50%', background: 'var(--gold)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 28, flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: 28 }}>
                      {f.t}
                    </div>
                    <p className={a.meta} style={{ marginTop: 4, fontSize: 16, lineHeight: 1.45 }}>
                      {f.d}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={f.done ? 'Mark as not addressed' : 'Mark as addressed'}
                    onClick={() => setState((s) => s.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))}
                    style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px solid var(--gold)', color: 'var(--gold-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: f.done ? 'var(--gold-tint)' : 'transparent', flexShrink: 0 }}
                  >
                    <Icon icon={f.done ? Tick02Icon : PencilEdit02Icon} size={22} strokeWidth={f.done ? 2.2 : 1.6} />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <Card tone="dark" padding="md" style={{ marginTop: 14 }} radius="xl" className={a.dark}>
            <div className={a.row} style={{ gap: 18 }}>
              <div style={{ flex: 1 }}>
                <div className={a.row} style={{ gap: 12, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: 26 }}>
                  <Icon icon={SparklesIcon} size={24} /> Brand Note
                </div>
                <div className="display" style={{ fontSize: 30, color: '#fff', marginTop: 12 }}>
                  Tone is perfect.
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: 16, lineHeight: 1.45 }}>We love the warm, authentic feel—this aligns beautifully with our Ramadan glow.</p>
              </div>
              <span style={{ width: 120, height: 120, borderRadius: '50%', border: '1px solid var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--gold)', flexShrink: 0 }}>L</span>
            </div>
          </Card>

          <div className={a.banner} style={{ marginTop: 14 }}>
            <IconTile icon={Store01Icon} size={56} iconSize={26} />
            <div className={a.bannerBody}>
              <div className="display" style={{ fontSize: 22 }}>
                Visit Lumière Beauty in-store
              </div>
              <div className={a.bannerSub}>Experience their collection in person.</div>
            </div>
            <Button size="sm" trailing={<Icon icon={ArrowRight01Icon} size={14} />} onClick={() => toast('Store locator (demo)', 'info')}>
              Find a store
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
