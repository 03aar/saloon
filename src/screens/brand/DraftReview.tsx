import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft01Icon, ArrowRight01Icon, Briefcase01Icon, Copy01Icon, File01Icon, FeatherIcon, Message01Icon, MoreHorizontalIcon, PlayIcon, SecurityCheckIcon, SparklesIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art, type ArtKind } from '../../components/Art'
import { Sheet } from '../../components/Sheet'
import { TextArea } from '../../components/TextArea'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { drafts } from '../../data/drafts'
import a from '../../components/app.module.css'

const checks = [
  { id: 'fit', icon: Briefcase01Icon, t: 'Brand fit', d: 'Does the content align with our brand positioning and campaign goals?' },
  { id: 'caption', icon: FeatherIcon, t: 'Caption', d: 'Is the caption on-message, engaging, and within guidelines?' },
  { id: 'disclosure', icon: SecurityCheckIcon, t: 'Disclosure', d: 'Are disclosures included and clearly visible as per guidelines?' },
]
const slides: ArtKind[] = ['silk', 'gold', 'marble']

export default function DraftReview() {
  const nav = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const d = drafts.find((x) => x.id === id) ?? drafts[0]
  const { loading, error, retry } = useLoad(`draft-${id ?? d.id}`)
  const [slide, setSlide] = useState(0)
  const [state, setState] = useState<Record<string, 'good' | 'edit' | undefined>>({ fit: 'good', caption: 'good', disclosure: 'good' })
  const [asking, setAsking] = useState(false)
  const [note, setNote] = useState('')
  const reviewed = Object.values(state).filter(Boolean).length
  const cycle = (k: string) => setState((s) => ({ ...s, [k]: s[k] === 'good' ? 'edit' : 'good' }))

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/approvals')}>
            <Icon icon={ArrowLeft01Icon} size={22} />
          </IconButton>
        }
        center={
          <div style={{ textAlign: 'center' }}>
            <div className="display" style={{ fontSize: 22 }}>
              Campaign Room
            </div>
            <div className={a.status} style={{ justifyContent: 'center', color: 'var(--gold-deep)' }}>
              <i />
              In review
            </div>
          </div>
        }
        right={
          <>
            <IconButton label="Message creator" onClick={() => nav('/messages/mira-alia')}>
              <Icon icon={Message01Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => toast('Download draft or view history', 'info')}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      {loading ? (
        <ScreenSkeleton hero={440} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 22 }}>
        Content Draft Review
      </h1>

      <div className={a.between} style={{ marginTop: 20 }}>
        <div className={a.row}>
          <Avatar name={d.name} size={72} tone={d.tone} portrait={d.photo} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 500 }}>{d.name}</div>
            <div className={a.meta}>@{d.name.split(' ')[0].toLowerCase()}.creates</div>
          </div>
        </div>
        <Chip leading={<Icon icon={SparklesIcon} size={16} />}>Draft 1 of 1</Chip>
      </div>

      <div style={{ position: 'relative', marginTop: 18, height: 440, borderRadius: 28, overflow: 'hidden' }}>
        <Art kind={slides[slide]} />
        <button type="button" onClick={() => toast('Playing draft (demo)', 'info')} aria-label="Play draft" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 96, height: 96, borderRadius: '50%', background: 'rgba(40,36,30,0.7)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <Icon icon={PlayIcon} size={40} strokeWidth={1.4} />
        </button>
        <span style={{ position: 'absolute', left: 18, bottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: 'rgba(40,36,30,0.7)', color: '#fff', fontSize: 15 }}>
          <Icon icon={Copy01Icon} size={16} /> {slide + 1} / {slides.length}
        </span>
        <span style={{ position: 'absolute', right: 18, bottom: 18, padding: '8px 14px', borderRadius: 999, background: 'rgba(40,36,30,0.7)', color: '#fff', fontSize: 15 }}>0:{d.len.replace(/\D/g, '').padStart(2, '0') || '28'}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 }}>
        {slides.map((_, i) => (
          <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === slide ? 'var(--gold)' : 'var(--line-strong)' }} />
        ))}
      </div>

      <div className={a.between} style={{ marginTop: 26 }}>
        <h2 className="display" style={{ fontSize: 34 }}>
          Feedback checklist
        </h2>
        <Chip trailing={<span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon icon={Tick02Icon} size={12} strokeWidth={2.6} /></span>}>
          {reviewed} of {checks.length} reviewed
        </Chip>
      </div>
      <Card padding="none" style={{ marginTop: 14 }} radius="xl">
        {checks.map((c, i) => {
          const v = state[c.id]
          return (
            <button key={c.id} type="button" onClick={() => cycle(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', padding: '20px 18px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <IconTile icon={c.icon} size={60} iconSize={26} tone="tint" strokeWidth={1.2} />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 19, fontWeight: 500 }}>{c.t}</span>
                <span className={a.metaSm} style={{ display: 'block', marginTop: 4, lineHeight: 1.4 }}>
                  {c.d}
                </span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: v === 'edit' ? 'var(--danger)' : 'var(--gold-deep)', fontFamily: 'var(--font-display)', fontSize: 18, whiteSpace: 'nowrap' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: v === 'edit' ? 'var(--danger)' : 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} />
                </span>
                {v === 'edit' ? 'Needs edits' : 'Looks good'}
              </span>
              <Icon icon={ArrowRight01Icon} size={18} />
            </button>
          )
        })}
      </Card>

      <div className={a.banner} style={{ marginTop: 14 }}>
        <Avatar name={d.name} size={54} tone={d.tone} portrait={d.photo} />
        <div className={a.bannerBody}>
          <div className={a.bannerTitle} style={{ fontWeight: 400 }}>
            {d.name.split(' ')[0]} submitted this draft 2h ago
          </div>
          <div className={a.bannerSub}>Please review by tomorrow, 6 PM GST</div>
        </div>
        <Button size="sm" variant="soft" leading={<Icon icon={File01Icon} size={16} />} onClick={() => nav('/create')}>
          View brief
        </Button>
      </div>

      <Footer app>
        <div className={a.grid2}>
          <Button variant="soft" onClick={() => setAsking(true)} style={{ fontFamily: 'var(--font-display)', fontSize: 24, border: '1.5px solid var(--ink)' }}>
            Request edits
          </Button>
          <Button
            onClick={() => {
              toast(`Draft approved · ${d.name.split(' ')[0]} notified`)
              nav('/approvals')
            }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}
          >
            Approve content
          </Button>
        </div>
      </Footer>
        </>
      )}

      <Sheet open={asking} onClose={() => setAsking(false)} label="Request edits">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Request edits
        </h2>
        <p className={a.meta} style={{ marginTop: 6 }}>
          Tell {d.name.split(' ')[0]} what to change. Be specific and kind.
        </p>
        <div style={{ marginTop: 18 }}>
          <TextArea value={note} onChange={(e) => setNote(e.target.value)} max={600} rows={5} placeholder="e.g. Please move the product reveal to the first 3 seconds and add the #ad disclosure in the caption." />
        </div>
        <Button
          block
          style={{ marginTop: 14 }}
          disabled={note.trim().length < 10}
          onClick={() => {
            setAsking(false)
            toast('Edit request sent')
            nav('/approvals')
          }}
        >
          Send request
        </Button>
      </Sheet>
    </Page>
  )
}
