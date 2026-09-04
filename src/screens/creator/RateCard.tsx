import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, ArrowRight02Icon, MoreHorizontalIcon, PlayIcon, SecurityCheckIcon, SmartPhone01Icon, SparklesIcon, StarIcon, UserIcon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { IconTile } from '../../components/IconTile'
import { Toggle } from '../../components/Toggle'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import s from './creator.module.css'
import a from '../../components/app.module.css'

const items = [
  { id: 'video', icon: PlayIcon, t: 'Video', d: 'Reels, TikTok, YouTube mentions', v: 8000 },
  { id: 'story', icon: SmartPhone01Icon, t: 'Story frames', d: 'Instagram Stories or similar', v: 2500 },
  { id: 'ugc', icon: UserIcon, t: 'UGC', d: 'User-generated content for brand use', v: 3500 },
  { id: 'event', icon: StarIcon, t: 'Event appearance', d: 'Appearances, talks, or hosting', v: 2500 },
]

/** Rate card — used as onboarding step 3 and as a standalone settings screen. */
export default function RateCard() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { update } = useApp()
  const { toast } = useToast()
  const onboarding = pathname.startsWith('/onboarding')
  const [rates, setRates] = useState<Record<string, number>>(Object.fromEntries(items.map((i) => [i.id, i.v])))
  const [gifting, setGifting] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const total = Object.values(rates).reduce((n, v) => n + v, 0)

  return (
    <Page layout={onboarding ? 'auth' : 'app'}>
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        center={<span className={s.eyebrow}>Rate card</span>}
        right={
          <IconButton label="More" onClick={() => toast('Duplicate or reset rates', 'info')}>
            <Icon icon={MoreHorizontalIcon} size={20} />
          </IconButton>
        }
      />
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <h1 className={['display', s.h1].join(' ')} style={{ margin: '0 auto', fontSize: 'clamp(46px, 12vw, 60px)' }}>
          Your value,
          <br />
          your terms.
        </h1>
        <p className={s.sub} style={{ margin: '14px auto 0', textAlign: 'center' }}>
          Set your base rates for brand collaborations.
          <br />
          You can customize per campaign.
        </p>
      </div>

      <section className={s.rateHero} style={{ marginTop: 24 }}>
        <span className={s.coin}>
          <Icon icon={SparklesIcon} size={64} strokeWidth={1} />
        </span>
        <div style={{ position: 'relative', maxWidth: '60%' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--gold)', letterSpacing: '0.18em', fontSize: 13, fontWeight: 500 }}>
            <span style={{ width: 52, height: 52, borderRadius: 12, border: '1px solid rgba(248,188,88,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon={SparklesIcon} size={24} />
            </span>
            BASE RATE
          </span>
          <div style={{ fontSize: 24, marginTop: 28 }}>Total starting rate</div>
          <div className={a.numXl} style={{ color: '#fff', marginTop: 12, fontSize: 64 }}>
            AED {total.toLocaleString()}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, marginTop: 14, lineHeight: 1.45 }}>This is your base rate for brand collaborations.</p>
          <Button size="md" style={{ marginTop: 26 }} trailing={<Icon icon={ArrowRight01Icon} size={18} />} onClick={() => setEditing('video')}>
            Edit total rate
          </Button>
        </div>
      </section>

      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 22 }}>What’s included</div>
        <p className={a.meta} style={{ marginTop: 4, fontSize: 16 }}>
          Tap a tile to adjust your rate
        </p>
      </div>
      <div className={a.grid2} style={{ marginTop: 14 }}>
        {items.map((it) => (
          <button key={it.id} type="button" className={s.rateTile} onClick={() => setEditing(it.id)}>
            <div className="top">
              <IconTile icon={it.icon} size={70} iconSize={30} tone="outline" strokeWidth={1.2} />
              <div>
                <b>{it.t}</b>
                <span>{it.d}</span>
              </div>
            </div>
            <div className="price">
              AED {rates[it.id].toLocaleString()}
              <span style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', margin: 0 }}>
                <Icon icon={ArrowRight01Icon} size={16} />
              </span>
            </div>
          </button>
        ))}
      </div>

      <section className={s.qCard} style={{ padding: 22 }}>
        <div className={a.between}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 500 }}>Open to gifting</div>
            <p className={a.meta} style={{ marginTop: 4, maxWidth: 300, lineHeight: 1.45 }}>
              Allow brands to invite you for gifted collaborations.
            </p>
          </div>
          <Toggle checked={gifting} onChange={setGifting} label="Open to gifting" />
        </div>
        <div className={a.banner} style={{ marginTop: 18, padding: 14 }}>
          <Icon icon={SecurityCheckIcon} size={30} color="var(--gold)" strokeWidth={1.2} />
          <div className={a.bannerBody}>
            <div className={a.bannerTitle} style={{ fontSize: 14 }}>
              You’re in control.
            </div>
            <div className={a.bannerSub} style={{ fontSize: 12 }}>
              You can update your rates anytime.
            </div>
          </div>
        </div>
      </section>

      <Footer app={!onboarding}>
        <Button
          block
          trailing={<Icon icon={ArrowRight02Icon} size={22} />}
          onClick={() => {
            update({ onboardingComplete: true })
            if (onboarding) nav('/onboarding/creator/live')
            else {
              toast('Rate card saved')
              nav(-1)
            }
          }}
        >
          {onboarding ? 'Continue' : 'Save rates'}
        </Button>
      </Footer>

      <Sheet open={!!editing} onClose={() => setEditing(null)} label="Edit rate">
        {editing && (
          <>
            <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
              {items.find((i) => i.id === editing)?.t} rate
            </h2>
            <div style={{ marginTop: 18 }}>
              <TextField label="Rate (AED)" type="number" inputMode="numeric" value={String(rates[editing])} onChange={(e) => setRates({ ...rates, [editing]: Math.max(0, Number(e.target.value) || 0) })} />
            </div>
            <Button block style={{ marginTop: 16 }} onClick={() => setEditing(null)}>
              Done
            </Button>
          </>
        )}
      </Sheet>
    </Page>
  )
}
