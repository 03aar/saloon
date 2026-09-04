import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Add01Icon, ArrowLeft01Icon, ArrowRight01Icon, Attachment01Icon, Calendar03Icon, CallIcon, CheckmarkBadge02Icon, Clock01Icon, Download04Icon, File01Icon, FileUploadIcon, GiftIcon, InformationCircleIcon, MoreHorizontalIcon, SentIcon, SmileIcon, SquareLock02Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { conversation, threads, type Msg } from '../../data/messages'
import a from '../../components/app.module.css'

export default function Chat() {
  const nav = useNavigate()
  const { id } = useParams()
  const { state } = useApp()
  const { toast } = useToast()
  const role = state.session?.role ?? 'brand'
  const thread = threads.find((t) => t.id === id) ?? threads.find((t) => t.for === role) ?? threads[0]
  const { loading, error, retry } = useLoad(`chat-${thread.id}`)
  const [msgs, setMsgs] = useState<Msg[]>(conversation[role])
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const meName = role === 'brand' ? state.brand.name : state.session?.name ?? 'You'
  const themName = thread.name

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [msgs.length])

  const send = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    setMsgs((m) => [...m, { from: 'me', text: text.trim(), time, seen: false }])
    setText('')
    window.setTimeout(() => setMsgs((m) => [...m, { from: 'them', text: role === 'brand' ? 'Got it — I’ll take a look and get back to you shortly.' : 'Thanks! We’ll review and respond soon.', time }]), 1400)
  }

  const bubble = (m: Msg, i: number) => {
    const me = m.from === 'me'
    return (
      <div key={i} style={{ display: 'flex', gap: 12, justifyContent: me ? 'flex-end' : 'flex-start', marginTop: 18, alignItems: 'flex-start' }}>
        {!me && <Avatar name={themName} size={52} tone={thread.tone} portrait={thread.photo} />}
        <div style={{ maxWidth: '80%' }}>
          {!me && role === 'brand' && (
            <div className={a.metaSm} style={{ marginBottom: 6, marginLeft: 4 }}>
              {themName} &nbsp;{m.time}
            </div>
          )}
          {me && role === 'brand' && (
            <div className={a.metaSm} style={{ marginBottom: 6, marginLeft: 4 }}>
              {meName.toUpperCase()} &nbsp;{m.time}
            </div>
          )}
          {m.text && (
            <div style={{ padding: '16px 18px', borderRadius: 20, borderTopLeftRadius: me ? 20 : 6, borderTopRightRadius: me ? 6 : 20, background: me ? 'var(--gold-tint)' : 'var(--surface)', border: `1px solid ${me ? 'var(--gold-soft)' : 'var(--line)'}`, fontSize: 17, lineHeight: 1.5, whiteSpace: 'pre-line', color: 'var(--ink)' }}>
              {m.text}
            </div>
          )}
          {m.card === 'brief' && (
            <Card padding="md" style={{ marginTop: 10 }} radius="xl">
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ width: 130, height: 150, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
                  <Art kind="silk" />
                </span>
                <div style={{ flex: 1 }}>
                  <div className={a.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon icon={File01Icon} size={16} /> Brief
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>Summer Radiance 2026 Brief</div>
                  <div className={a.meta} style={{ marginTop: 4 }}>
                    PDF • 1.4 MB
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                    <Button size="sm" variant="soft" onClick={() => toast('Opening brief (demo)', 'info')}>
                      View Brief
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {m.card === 'offer' && (
            <Card padding="md" style={{ marginTop: 10 }} radius="xl">
              <div className={a.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon icon={CheckmarkBadge02Icon} size={16} color="var(--gold)" /> Offer summary
              </div>
              <div className={a.between} style={{ marginTop: 8 }}>
                <span className="display" style={{ fontSize: 34 }}>
                  AED 32,000
                </span>
                <Chip size="sm" selected selectedStyle="outline">
                  Proposed
                </Chip>
              </div>
              <div className={a.divider} style={{ margin: '14px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Icon icon={Calendar03Icon} size={22} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>3 Deliverables</div>
                    <div className={a.metaSm}>Reels • Stories • Usage</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, borderLeft: '1px solid var(--line)', paddingLeft: 14 }}>
                  <Icon icon={Clock01Icon} size={22} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>Content Window</div>
                    <div className={a.metaSm}>Jun 10 – Jun 30</div>
                  </div>
                </div>
              </div>
              <Button block size="md" variant="soft" style={{ marginTop: 14 }} onClick={() => nav(role === 'brand' ? '/creators/mira-alia/offer' : '/creator/contract')}>
                View Offer Details
              </Button>
            </Card>
          )}
          {m.card === 'upload' && (
            <Card padding="md" style={{ marginTop: 10 }} radius="xl">
              <div className={a.wrapRow}>
                <span style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--gold-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)' }}>
                  <Icon icon={FileUploadIcon} size={26} strokeWidth={1.3} />
                </span>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div className="display" style={{ fontSize: 22 }}>
                    Share your first draft
                  </div>
                  <div className={a.metaSm}>Upload your draft for review.</div>
                </div>
                <Button size="sm" onClick={() => nav('/creator/collabs/summer-glow/upload')}>
                  Upload draft
                </Button>
              </div>
              <div className={a.metaSm} style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon icon={SquareLock02Icon} size={14} /> Only {themName} can view
              </div>
            </Card>
          )}
          {m.card === 'file' && (
            <Card padding="md" style={{ marginTop: 10 }} radius="xl">
              <div className={a.row}>
                <span style={{ width: 80, height: 80, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
                  <Art kind="glow" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>GLOW_Reel_Draft_01.mp4</div>
                  <div className={a.metaSm}>82.4 MB • MP4</div>
                </div>
                <IconButton label="Download" size="sm" onClick={() => toast('Download started (demo)', 'info')}>
                  <Icon icon={Download04Icon} size={16} />
                </IconButton>
              </div>
            </Card>
          )}
          <div className={a.metaSm} style={{ marginTop: 6, textAlign: me ? 'right' : 'left', display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', alignItems: 'center', gap: 6 }}>
            {role === 'creator' && m.time}
            {me && m.seen && (
              <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>
                <Icon icon={Tick02Icon} size={14} />
                <Icon icon={Tick02Icon} size={14} style={{ marginLeft: -8 }} />
              </span>
            )}
            {role === 'brand' && me && m.seen && i === msgs.length - 1 && <span>Seen {m.time}</span>}
          </div>
          {m.reaction && (
            <span style={{ display: 'inline-block', marginTop: -8, marginLeft: 'auto', float: 'right', padding: '4px 10px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', fontSize: 13 }}>
              {m.reaction}
            </span>
          )}
        </div>
        {me && role === 'creator' && <Avatar name={meName} size={52} tone="sand" portrait />}
      </div>
    )
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <>
            <IconButton label="Back" variant="plain" onClick={() => nav(-1)}>
              <Icon icon={ArrowLeft01Icon} size={26} />
            </IconButton>
            <Avatar name={themName} size={72} tone={thread.tone} portrait={thread.photo} />
            <div>
              <div className="display" style={{ fontSize: 28, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                {themName} {thread.verified && <Verified size={18} />}
              </div>
              <div className={a.status} style={{ fontSize: 15 }}>
                <i />
                Active now
              </div>
            </div>
          </>
        }
        right={
          <>
            <IconButton label="Call" onClick={() => toast('Voice calls arrive with the next release', 'info')}>
              <Icon icon={CallIcon} size={20} />
            </IconButton>
            <IconButton label={role === 'brand' ? 'Info' : 'More'} onClick={() => toast('Conversation details', 'info')}>
              <Icon icon={role === 'brand' ? InformationCircleIcon : MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />

      {loading ? (
        <ScreenSkeleton hero={140} tiles={0} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      {role === 'brand' ? (
        <Card padding="md" style={{ marginTop: 14 }} radius="xl" onClick={() => nav('/campaigns/ramadan-2026')}>
          <div className={a.row}>
            <span style={{ width: 70, height: 70, borderRadius: 16, background: 'var(--dark)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 34, flexShrink: 0 }}>S</span>
            <div style={{ flex: 1 }}>
              <div className={a.meta} style={{ fontSize: 16 }}>
                GLOW 360 &nbsp;•&nbsp; Summer Radiance 2026
              </div>
              <div className="display" style={{ fontSize: 32 }}>
                Campaign Room
              </div>
            </div>
            <Icon icon={ArrowRight01Icon} size={20} />
          </div>
        </Card>
      ) : (
        <Card padding="none" style={{ marginTop: 14, position: 'relative', overflow: 'hidden' }} radius="xl">
          <span style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '60%', maskImage: 'linear-gradient(180deg,#000,transparent)', WebkitMaskImage: 'linear-gradient(180deg,#000,transparent)' }}>
            <Art kind="silk" />
          </span>
          <div style={{ position: 'relative', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--gold-deep)', fontFamily: 'var(--font-display)', fontSize: 22 }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Tick02Icon} size={16} strokeWidth={2.4} />
              </span>
              Offer accepted
            </div>
            <div className="display" style={{ fontSize: 30, marginTop: 16 }}>
              GLOW Radiance Campaign
            </div>
            <div className={a.meta} style={{ marginTop: 6, fontSize: 16 }}>
              10–18 May &nbsp;•&nbsp; 1 Reel + 3 Stories
            </div>
            <div className={a.divider} style={{ margin: '18px 0 16px' }} />
            <div className={a.between}>
              <div className={a.row}>
                <span style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--surface-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon={GiftIcon} size={26} />
                </span>
                <div>
                  <div className={a.meta}>Total Fee</div>
                  <div className="display" style={{ fontSize: 30 }}>
                    AED 12,500
                  </div>
                </div>
              </div>
              <Button size="md" variant="soft" trailing={<Icon icon={ArrowRight01Icon} size={16} />} onClick={() => nav('/creator/collabs/summer-glow')} style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>
                View details
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22, color: 'var(--muted)', fontSize: 15 }}>
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        Today
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      <div style={{ paddingBottom: 110 }}>
        {msgs.map(bubble)}
        <div ref={endRef} />
      </div>
        </>
      )}

      <form onSubmit={send} className={a.composerBar}>
        <div style={{ width: '100%', maxWidth: 'var(--col-app)', padding: '10px var(--page-x) 12px', display: 'flex', gap: 10, alignItems: 'center', pointerEvents: 'auto', background: 'linear-gradient(180deg, rgba(250,248,244,0) 0%, var(--bg) 30%)' }}>
          <IconButton label="Attach" size="lg" onClick={() => toast('Attach files (demo)', 'info')}>
            <Icon icon={role === 'brand' ? Attachment01Icon : Add01Icon} size={22} />
          </IconButton>
          <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, height: 56, padding: '0 18px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)' }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder={role === 'brand' ? 'Type a message…' : `Message ${themName}…`} aria-label="Message" style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontSize: 17, minWidth: 0 }} />
            {role === 'creator' && <Icon icon={SmileIcon} size={22} color="var(--ink-2)" />}
          </label>
          <button type="submit" aria-label="Send" disabled={!text.trim()} style={{ width: 56, height: 56, borderRadius: '50%', background: text.trim() ? 'var(--primary)' : 'var(--primary-soft)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color 200ms' }}>
            <Icon icon={SentIcon} size={22} />
          </button>
        </div>
      </form>
    </Page>
  )
}
