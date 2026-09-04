import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft02Icon, Bookmark02Icon, Calendar03Icon, CallIcon, CheckmarkCircle02Icon, CloudUploadIcon, DollarCircleIcon, File01Icon, Globe02Icon, HandshakeIcon, Idea01Icon, MoreHorizontalIcon, SentIcon, Tick02Icon, UserStar01Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { collabs } from '../../data/collabs'
import a from '../../components/app.module.css'
import s from './creator.module.css'

const steps = [
  { i: HandshakeIcon, t: 'Offer accepted', d: 'You accepted the offer', when: 'May 6', done: true, to: '' },
  { i: Idea01Icon, t: 'Content concept', d: 'Share your ideas and approach', when: 'Due May 12', to: '/creator/messages/noura-beauty' },
  { i: CloudUploadIcon, t: 'Draft upload', d: 'Upload your draft for review', when: 'Due May 16', to: 'upload' },
  { i: UserStar01Icon, t: 'Brand review', d: 'Brand reviews your draft', when: 'Due May 20', to: 'feedback' },
  { i: SentIcon, t: 'Publish', d: 'Go live and share', when: 'Due May 26–30', to: '' },
  { i: DollarCircleIcon, t: 'Payout', d: 'Payment after deliverables', when: 'Due Jun 7', to: '/creator/earnings' },
]
const deliverables = [
  ['Instagram Reel', '1 of 1'],
  ['Instagram Stories', '3 of 3'],
  ['Usage Rights (30 days)', '1 of 1'],
  ['Whitelisting', '1 of 1'],
  ['Link in Bio', '1 of 1'],
]

export default function CollabDetail() {
  const nav = useNavigate()
  const { id = 'summer-glow' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`collab-${id}`)
  const c = collabs.find((x) => x.id === id) ?? collabs[0]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/creator/collabs')}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <>
            <IconButton label="Save" onClick={() => toast('Saved')}>
              <Icon icon={Bookmark02Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => toast('Share or report collaboration', 'info')}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      {loading ? (
        <ScreenSkeleton hero={300} tiles={4} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 36%', gap: 14, marginTop: 18 }}>
            <div>
              <div className={a.row} style={{ gap: 14 }}>
                <span style={{ width: 96, height: 96, borderRadius: 18, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <Art kind="silk" />
                  <span className="display" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>
                    {c.brand.charAt(0)}
                  </span>
                </span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {c.brand.toUpperCase()} <Verified size={18} />
                  </div>
                  <div className={a.meta}>Beauty &nbsp;•&nbsp; Dubai</div>
                </div>
              </div>
              <h1 className={['display', a.h1sm].join(' ')} style={{ marginTop: 22 }}>
                Summer Glow Campaign
              </h1>
              <div style={{ marginTop: 20 }}>
                <Chip tone="tint" selected leading={<Icon icon={Calendar03Icon} size={16} />}>
                  Draft due Friday, May 16
                </Chip>
              </div>
            </div>
            <span style={{ borderRadius: 26, overflow: 'hidden', minHeight: 320, display: 'block' }}>
              <Art kind="glow" />
            </span>
          </div>

          <Card padding="none" style={{ marginTop: 18 }} radius="xl">
            <div className={a.grid4} style={{ gap: 0 }}>
              {[
                [DollarCircleIcon, 'Total Payout', 'AED 18,750'],
                [Calendar03Icon, 'Campaign Dates', 'May 26 – Jun 30'],
                [Globe02Icon, 'Territory', 'GCC'],
                [File01Icon, 'Contract', 'Signed'],
              ].map(([ic, l, v], i) => (
                <button key={l as string} type="button" onClick={() => (l === 'Contract' ? nav('/creator/contract') : toast(`${l}: ${v}`, 'info'))} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '14px 12px', borderLeft: i % 2 ? '1px solid var(--line)' : 'none', borderTop: i >= 2 ? '1px solid var(--line)' : 'none', textAlign: 'left', minWidth: 0 }}>
                  <IconTile icon={ic as typeof File01Icon} size={44} iconSize={20} tone="surface" />
                  <span>
                    <span className={a.metaSm} style={{ display: 'block' }}>
                      {l as string}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{v as string}</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            <div className={a.between}>
              <div style={{ fontSize: 19, fontWeight: 500 }}>Collaboration Timeline</div>
              <span className={a.row} style={{ gap: 6, fontSize: 14, whiteSpace: 'nowrap' }}>
                Offer accepted <Icon icon={CheckmarkCircle02Icon} size={20} color="var(--gold)" />
              </span>
            </div>
            <div className={s.tl} style={{ marginTop: 14 }}>
              {steps.map((st, i) => {
                const isOpen = open === i
                return (
                  <div key={st.t}>
                    <button type="button" className={s.tlRow} style={{ width: '100%', textAlign: 'left' }} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                      <span className={[s.tlDot, st.done ? s.done : ''].join(' ')}>{st.done && <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} />}</span>
                      <IconTile icon={st.i} size={48} iconSize={22} tone="surface" strokeWidth={1.3} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: 16, fontWeight: 500 }}>{st.t}</span>
                        <span className={a.metaSm} style={{ display: 'block' }}>
                          {st.d}
                        </span>
                      </span>
                      {st.done ? (
                        <span className={a.row} style={{ gap: 6, color: 'var(--gold-deep)', fontSize: 14, whiteSpace: 'nowrap' }}>
                          {st.when} <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon icon={Tick02Icon} size={11} strokeWidth={2.6} /></span>
                        </span>
                      ) : (
                        <Chip size="xs" tone="tintLight">
                          {st.when}
                        </Chip>
                      )}
                      <Icon icon={ArrowDown01Icon} size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
                    </button>
                    {isOpen && st.to && (
                      <div style={{ paddingBottom: 14 }}>
                        <Button size="sm" variant="tint" onClick={() => nav(st.to === 'upload' ? `/creator/collabs/${c.id}/upload` : st.to === 'feedback' ? `/creator/collabs/${c.id}/feedback` : st.to)}>
                          {st.to === 'upload' ? 'Upload draft' : st.to === 'feedback' ? 'See brand feedback' : 'Open'}
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            <div className={a.between}>
              <div style={{ fontSize: 22, fontWeight: 500 }}>Deliverables</div>
              <Chip size="xs" tone="tint">
                5 of 5
              </Chip>
            </div>
            {deliverables.map(([l, v], i) => (
              <div key={l} className={a.between} style={{ padding: '12px 0', borderTop: i ? '1px solid var(--line)' : 'none', marginTop: i ? 0 : 6 }}>
                <span className={a.row} style={{ gap: 10 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon icon={Tick02Icon} size={12} strokeWidth={2.6} />
                  </span>
                  {l}
                </span>
                <span className={a.meta}>{v}</span>
              </div>
            ))}
          </Card>

          <div className={[a.banner, a.wrapRow].join(' ')} style={{ marginTop: 14 }}>
            <Avatar name="Lara Al Mansoori" size={64} tone="stone" portrait />
            <div className={a.bannerBody} style={{ minWidth: 180 }}>
              <div className={a.bannerTitle} style={{ fontSize: 19 }}>
                Lara Al Mansoori
              </div>
              <div className={a.bannerSub}>Brand Manager at {c.brand}</div>
              <div className={a.status} style={{ marginTop: 6 }}>
                <i />
                Typically replies in a few hours
              </div>
            </div>
            <div className={a.row} style={{ gap: 8, marginLeft: 'auto' }}>
              <Button size="md" variant="soft" onClick={() => nav('/creator/messages/noura-beauty')}>
                Message
              </Button>
              <IconButton label="Call" onClick={() => toast('Calling is coming soon', 'info')}>
                <Icon icon={CallIcon} size={20} />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}
