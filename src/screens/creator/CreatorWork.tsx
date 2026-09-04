import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add01Icon, ArrowRight02Icon, ClapperboardIcon, Comment01Icon, FavouriteIcon, Link04Icon, PlayIcon, SentIcon, SmartPhone01Icon, SparklesIcon, UserIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { Stepper } from '../../components/Stepper'
import { Ring } from '../../components/Ring'
import { Art, type ArtKind } from '../../components/Art'
import { IconTile } from '../../components/IconTile'
import { useToast } from '../../components/Toast'
import s from './creator.module.css'
import a from '../../components/app.module.css'

const TOTAL = 3
type Work = { id: string; icon: typeof ClapperboardIcon; t: string; d: string; art: ArtKind; play?: boolean; frames?: boolean; stats: [typeof ViewIcon, string, string][]; added: number }

const initial: Work[] = [
  { id: 'video', icon: ClapperboardIcon, t: 'Video', d: 'Short-form or long-form', art: 'silk', play: true, added: 1, stats: [[ViewIcon, '312K', 'Views'], [FavouriteIcon, '24.8K', 'Likes'], [SentIcon, '3.1K', 'Shares']] },
  { id: 'story', icon: SparklesIcon, t: 'Story frames', d: 'Vertical storytelling', art: 'arch', frames: true, added: 1, stats: [[ViewIcon, '185K', 'Reach'], [Link04Icon, '4.6K', 'Taps'], [FavouriteIcon, '18.7K', 'Likes']] },
  { id: 'ugc', icon: SmartPhone01Icon, t: 'UGC', d: 'Unboxings, reviews, how-tos', art: 'gold', play: true, added: 1, stats: [[ViewIcon, '276K', 'Views'], [FavouriteIcon, '21.3K', 'Likes'], [Comment01Icon, '2.0K', 'Comments']] },
]

export default function CreatorWork() {
  const nav = useNavigate()
  const { toast } = useToast()
  const [works, setWorks] = useState(initial)
  const total = works.reduce((n, w) => n + w.added, 0)
  const strength = Math.min(100, 60 + total * 4)

  const add = (id: string) => {
    setWorks((w) => w.map((x) => (x.id === id ? { ...x, added: x.added + 1 } : x)))
    toast('Added to your portfolio')
  }

  return (
    <Page>
      <div className={a.row} style={{ marginTop: 10, gap: 20 }}>
        <IconTile icon={UserIcon} size={68} iconSize={30} tone="tint" strokeWidth={1.3} />
        <span className={s.eyebrow} style={{ fontSize: 16 }}>
          Creator profile
        </span>
      </div>
      <div style={{ marginTop: 18, maxWidth: 440 }}>
        <Stepper step={2} total={TOTAL} variant="pills" />
      </div>
      <h1 className={['display', s.h1].join(' ')} style={{ marginTop: 30 }}>
        Add your
        <br />
        best work.
      </h1>
      <p className={s.sub} style={{ fontSize: 20, lineHeight: 1.5 }}>
        Show brands what you create.
        <br />
        Add 3+ pieces to stand out.
      </p>

      <div className={a.stack} style={{ marginTop: 24 }}>
        {works.map((w) => (
          <section key={w.id} className={s.workCard} aria-label={w.t}>
            <div className={s.workArt}>
              {w.frames ? (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10 }}>
                  {(['silk', 'gold', 'sand'] as const).map((k, i) => (
                    <span key={k} style={{ width: 70, height: i === 1 ? 190 : 210, borderRadius: 14, overflow: 'hidden', border: i === 2 ? '2px solid var(--gold)' : '1px solid var(--line)', transform: i === 1 ? 'translateY(8px)' : 'none' }}>
                      <Art kind={k === 'sand' ? 'marble' : k} />
                    </span>
                  ))}
                </div>
              ) : (
                <Art kind={w.art} />
              )}
              {w.play && (
                <span className={s.workPlay}>
                  <Icon icon={PlayIcon} size={22} />
                </span>
              )}
            </div>
            <div>
              <div className={a.row} style={{ gap: 14 }}>
                <IconTile icon={w.icon} size={78} iconSize={32} tone="gold" strokeWidth={1.3} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="display" style={{ fontSize: 30 }}>
                    {w.t}
                  </div>
                  <div className={a.meta} style={{ fontSize: 16 }}>
                    {w.d}
                  </div>
                </div>
                <button type="button" aria-label={`Add ${w.t}`} onClick={() => add(w.id)} style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px solid var(--gold)', color: 'var(--gold-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon icon={Add01Icon} size={24} />
                </button>
              </div>
              <div className={s.workStats}>
                {w.stats.map(([ic, v, l]) => (
                  <div key={l}>
                    <Icon icon={ic} size={24} style={{ margin: '0 auto' }} />
                    <b>{v}</b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className={s.qCard} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '22px 24px' }}>
        <Ring value={strength} size={140} stroke={8}>
          <span className="display" style={{ fontSize: 40 }}>
            {strength}%
          </span>
        </Ring>
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontSize: 28 }}>
            Profile strength
          </div>
          <p className={a.meta} style={{ marginTop: 8, fontSize: 16, lineHeight: 1.45 }}>
            {strength >= 85 ? 'Excellent! Brands love a complete portfolio.' : 'Great start! Add more work to unlock more opportunities.'}
          </p>
        </div>
        <IconTile icon={SparklesIcon} size={64} iconSize={28} tone="gold" />
      </section>

      <Footer>
        <Button block trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => nav('/onboarding/creator/rates')}>
          Continue
        </Button>
      </Footer>
    </Page>
  )
}
