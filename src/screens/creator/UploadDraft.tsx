import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Add01Icon, ArrowLeft01Icon, ArrowRight01Icon, Cancel01Icon, Copy01Icon, PlayCircleIcon, SecurityCheckIcon, SentIcon, TextFontIcon, Tick02Icon, Upload01Icon, Video01Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art, type ArtKind } from '../../components/Art'
import { Sheet } from '../../components/Sheet'
import { TextArea } from '../../components/TextArea'
import { useToast } from '../../components/Toast'
import { collabs } from '../../data/collabs'
import a from '../../components/app.module.css'

export default function UploadDraft() {
  const nav = useNavigate()
  const { id = 'summer-glow' } = useParams()
  const { toast } = useToast()
  const c = collabs.find((x) => x.id === id) ?? collabs[0]
  const fileRef = useRef<HTMLInputElement>(null)
  const [video, setVideo] = useState<ArtKind | null>('glow')
  const [frames, setFrames] = useState<ArtKind[]>(['silk', 'marble'])
  const [caption, setCaption] = useState('Glow from within. The new Super Glow Serum by @glowd. Available now.')
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const ready = !!video && frames.length > 0 && caption.trim().length > 0
  const openPicker = () => fileRef.current?.click()

  const onFiles = (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    window.setTimeout(() => {
      setUploading(false)
      const f = files[0]
      if (f.type.startsWith('video')) setVideo('glow')
      else setFrames((x) => [...x, (['gold', 'arch', 'silk'] as ArtKind[])[x.length % 3]].slice(0, 3))
      toast(`${f.name} uploaded`)
    }, 900)
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft01Icon} size={22} />
          </IconButton>
        }
      />
      <div className={a.between} style={{ marginTop: 18, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')}>Upload Draft</h1>
          <p className={a.sub}>Review your content before submitting for brand approval.</p>
        </div>
        <button type="button" onClick={() => nav(`/creator/collabs/${c.id}`)} className={a.row} style={{ gap: 12, padding: '14px 16px', borderRadius: 'var(--r-pill)', border: '1px solid var(--line)', background: 'var(--surface)', textAlign: 'left' }}>
          <Avatar name="Glowd" size={44} tone="cream" />
          <span>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 500 }}>Glowd.</span>
            <span className={a.metaSm}>Summer Campaign</span>
          </span>
          <Icon icon={ArrowRight01Icon} size={16} />
        </button>
      </div>

      <Card tone="dark" padding="md" style={{ marginTop: 22 }} radius="xl" className={a.dark}>
        <input ref={fileRef} type="file" accept="video/*,image/*" hidden onChange={(e) => onFiles(e.target.files)} />
        <div style={{ textAlign: 'center' }}>
          <button type="button" onClick={openPicker} aria-label="Upload content" style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--primary)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 14px rgba(222,138,122,0.15)' }}>
            {uploading ? <span style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin 700ms linear infinite' }} /> : <Icon icon={Upload01Icon} size={40} strokeWidth={1.6} />}
          </button>
          <div className="display" style={{ fontSize: 40, color: '#fff', marginTop: 22 }}>
            Upload your content
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginTop: 8, maxWidth: 400, margin: '8px auto 0' }}>Add your final video, story frames, and caption to submit for review.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.9fr', gap: 12, marginTop: 26 }}>
          <div style={{ position: 'relative', height: 260, borderRadius: 18, overflow: 'hidden', background: 'rgba(255,255,255,0.06)', border: video ? 'none' : '1.5px dashed rgba(255,255,255,0.3)' }}>
            {video ? (
              <>
                <Art kind={video} />
                <span style={{ position: 'absolute', left: 10, top: 10, width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon={Video01Icon} size={18} />
                </span>
                <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '4px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 13 }}>0:28</span>
                <button type="button" aria-label="Remove video" onClick={() => setVideo(null)} style={{ position: 'absolute', right: 10, top: 10, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon icon={Cancel01Icon} size={12} strokeWidth={2.4} />
                </button>
              </>
            ) : (
              <button type="button" onClick={openPicker} aria-label="Add video" style={{ width: '100%', height: '100%', color: 'var(--gold)' }}>
                <Icon icon={Add01Icon} size={30} />
              </button>
            )}
          </div>
          {frames.map((f, i) => (
            <div key={i} style={{ position: 'relative', height: 260, borderRadius: 18, overflow: 'hidden' }}>
              <Art kind={f} />
              <button type="button" aria-label="Remove frame" onClick={() => setFrames((x) => x.filter((_, j) => j !== i))} style={{ position: 'absolute', right: 8, top: 8, width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Cancel01Icon} size={10} strokeWidth={2.4} />
              </button>
            </div>
          ))}
          {frames.length < 3 && (
            <button type="button" onClick={openPicker} aria-label="Add story frame" style={{ height: 260, borderRadius: 'var(--r-lg)', border: '1.5px dashed rgba(255,255,255,0.35)', color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Add01Icon} size={20} />
              </span>
            </button>
          )}
        </div>
      </Card>

      <div className={a.stack} style={{ marginTop: 14 }}>
        {[
          { i: PlayCircleIcon, t: 'Video draft', d: video ? 'Final cut • 0:28' : 'No video added yet', ok: !!video, fn: openPicker },
          { i: Copy01Icon, t: 'Story frames', d: frames.length ? `${frames.length} frame${frames.length > 1 ? 's' : ''} added` : 'Add at least one frame', ok: frames.length > 0, fn: openPicker },
          { i: TextFontIcon, t: 'Caption', d: caption || 'Write your caption', ok: caption.trim().length > 0, fn: () => setEditing(true) },
        ].map((r) => (
          <Card key={r.t} padding="md" radius="xl" onClick={r.fn}>
            <div className={a.row} style={{ gap: 18 }}>
              <IconTile icon={r.i} size={92} iconSize={40} tone="outline" strokeWidth={1.1} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 24, fontWeight: 500 }}>{r.t}</div>
                <p className={a.meta} style={{ fontSize: 17, marginTop: 4, lineHeight: 1.4 }}>
                  {r.d}
                </p>
              </div>
              <span style={{ width: 44, height: 44, borderRadius: '50%', background: r.ok ? 'var(--gold)' : 'var(--surface-3)', color: r.ok ? '#fff' : 'var(--ink-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon icon={Tick02Icon} size={20} strokeWidth={2.4} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className={[a.banner, a.bannerTint].join(' ')} style={{ marginTop: 14 }}>
        <IconTile icon={SecurityCheckIcon} size={56} iconSize={24} />
        <div className={a.bannerBody}>
          <div className={a.bannerTitle}>Brand-safe &amp; guideline ready</div>
          <div className={a.bannerSub}>You’re all set. We’ll check and get back to you soon.</div>
        </div>
      </div>

      <Footer app>
        <Button
          block
          loading={sending}
          disabled={!ready}
          trailing={<Icon icon={SentIcon} size={22} />}
          onClick={() => {
            setSending(true)
            window.setTimeout(() => {
              setSending(false)
              toast('Draft submitted for review')
              nav(`/creator/collabs/${c.id}`, { replace: true })
            }, 1000)
          }}
        >
          Submit for review
        </Button>
      </Footer>

      <Sheet open={editing} onClose={() => setEditing(false)} label="Edit caption">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Caption
        </h2>
        <div style={{ marginTop: 16 }}>
          <TextArea aria-label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} max={2200} rows={5} placeholder="Write a caption that includes the paid partnership disclosure." />
        </div>
        <Button block style={{ marginTop: 14 }} onClick={() => setEditing(false)}>
          Done
        </Button>
      </Sheet>
    </Page>
  )
}
