import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft02Icon,
  ArrowRight01Icon,
  Bookmark02Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckListIcon,
  DollarCircleIcon,
  File01Icon,
  Location01Icon,
  Message01Icon,
  PencilEdit02Icon,
  SecurityCheckIcon,
  SentIcon,
  Shield01Icon,
  SquareLock02Icon,
  Tick02Icon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { Art } from '../../components/Art'
import { IconTile } from '../../components/IconTile'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { TextArea } from '../../components/TextArea'
import { SelectField } from '../../components/SelectField'
import { useToast } from '../../components/Toast'
import { creators } from '../../data/mock'
import a from '../../components/app.module.css'

type Offer = { fee: number; deliverables: string; deadline: string; usage: string; notes: string }

export default function SendOffer() {
  const nav = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const c = creators.find((x) => x.id === id) ?? creators[0]
  const [offer, setOffer] = useState<Offer>({ fee: 18000, deliverables: '1 Video + 3 Story frames', deadline: 'Jul 10', usage: '30 days organic', notes: '' })
  const [editing, setEditing] = useState<keyof Offer | null>(null)
  const [ready, setReady] = useState(false)
  const [sending, setSending] = useState(false)

  const rows: { key: keyof Offer; icon: typeof Wallet02Icon; label: string; value: string; sub?: string; placeholder?: boolean }[] = [
    { key: 'fee', icon: Wallet02Icon, label: 'Offer fee', value: `AED ${offer.fee.toLocaleString()}`, sub: 'Inclusive of taxes' },
    { key: 'deliverables', icon: CheckListIcon, label: 'Deliverables', value: offer.deliverables },
    { key: 'deadline', icon: Calendar03Icon, label: 'Deadline', value: offer.deadline },
    { key: 'usage', icon: Shield01Icon, label: 'Usage rights', value: offer.usage },
    { key: 'notes', icon: PencilEdit02Icon, label: 'Notes to creator', value: offer.notes || 'Add a personal message (optional)', placeholder: !offer.notes },
  ]

  const confirm = () => {
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setReady(false)
      toast(`Offer sent to ${c.name.split(' ')[0]}`)
      nav('/campaigns')
    }, 900)
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={24} />
          </IconButton>
        }
        right={
          <span className={a.row} style={{ gap: 8, color: 'var(--ink-2)', fontSize: 16 }}>
            <Icon icon={SecurityCheckIcon} size={22} />
            Protected
          </span>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Send Offer
      </h1>
      <p className={a.sub}>Review the details and send your offer to {c.name.split(' ')[0]}.</p>

      <Card padding="none" style={{ marginTop: 22 }} radius="xl">
        <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Avatar name={c.name} size={110} tone={c.tone} portrait />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="display" style={{ fontSize: 30, display: 'flex', alignItems: 'center', gap: 8 }}>
              {c.name} <Verified size={20} />
            </div>
            <div className={a.meta} style={{ marginTop: 4, fontSize: 16 }}>
              {c.tags.slice(0, 2).join(' & ')} Creator
            </div>
            <div className={a.meta} style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Icon icon={Location01Icon} size={14} />
              {c.city}, {c.country}
            </div>
          </div>
          <IconButton label="Message creator" size="lg" onClick={() => nav('/messages/mira-alia')} style={{ borderRadius: 18 }}>
            <Icon icon={Message01Icon} size={26} />
          </IconButton>
        </div>
        <div className={a.splitStats} style={{ padding: '16px 20px', borderTop: '1px solid var(--line)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 17 }}>{c.followers}</div>
            <div className={a.metaSm}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: 17 }}>{c.er}</div>
            <div className={a.metaSm}>Engagement</div>
          </div>
          <div>
            <div style={{ fontSize: 17 }}>92%</div>
            <div className={a.metaSm}>Response rate</div>
          </div>
          <button type="button" className={a.link} onClick={() => nav(`/creators/${c.id}`)} style={{ justifyContent: 'flex-end', border: 0 }}>
            View profile <Icon icon={ArrowRight01Icon} size={16} />
          </button>
        </div>
      </Card>

      <Card padding="md" style={{ marginTop: 14 }} radius="xl" onClick={() => nav('/campaigns/ramadan-2026')}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ width: 120, height: 120, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
            <Art kind="glow" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="eyebrow" style={{ fontSize: 12 }}>
              Campaign
            </div>
            <div className="display" style={{ fontSize: 28, marginTop: 6 }}>
              Ramadan Glow Launch
            </div>
            <div className={a.meta} style={{ marginTop: 4 }}>
              Skincare • UAE, KSA, Qatar
            </div>
            <div style={{ marginTop: 10 }}>
              <Chip size="sm" tone="soft" leading={<Icon icon={Calendar03Icon} size={14} />}>
                Launch window: Jun 20 – Jul 15
              </Chip>
            </div>
          </div>
          <Icon icon={ArrowRight01Icon} size={20} />
        </div>
      </Card>

      <h2 className="display" style={{ fontSize: 28, marginTop: 28, marginBottom: 12 }}>
        Offer details
      </h2>
      <Card padding="none" radius="xl">
        {rows.map((r, i) => (
          <button key={r.key} type="button" onClick={() => setEditing(r.key)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left', padding: '16px 18px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <IconTile icon={r.icon} tone="outline" size={52} iconSize={22} />
            <span style={{ flex: 1, fontSize: 17, color: 'var(--ink-2)' }}>{r.label}</span>
            <span style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: r.key === 'fee' ? 22 : 17, fontWeight: r.placeholder ? 400 : 500, color: r.placeholder ? 'var(--muted)' : 'var(--ink)' }}>{r.value}</span>
              {r.sub && <span className={a.metaSm}>{r.sub}</span>}
            </span>
            <Icon icon={ArrowRight01Icon} size={18} />
          </button>
        ))}
      </Card>

      <div className={[a.banner, a.bannerTint].join(' ')} style={{ marginTop: 16 }}>
        <span style={{ width: 84, height: 84, borderRadius: 20, background: 'linear-gradient(160deg,#f5e8c4,#d9b866)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#8a6a1a', flexShrink: 0 }}>
          <Icon icon={SquareLock02Icon} size={36} strokeWidth={1.4} />
        </span>
        <div className={a.bannerBody}>
          <div className={a.bannerTitle} style={{ fontSize: 17 }}>
            Your payment is protected
          </div>
          <div className={a.bannerSub}>Funds are held securely and released only when deliverables are approved.</div>
        </div>
        <Button size="sm" variant="tint" onClick={() => toast('Bloop Escrow holds funds until approval', 'info')}>
          Learn more
        </Button>
      </div>

      <Footer app>
        <Button block leading={<Icon icon={SentIcon} size={22} />} onClick={() => setReady(true)}>
          Send Offer
        </Button>
        <span className={a.footnote}>
          <Icon icon={SquareLock02Icon} size={14} /> You can edit or cancel until the creator responds.
        </span>
      </Footer>

      {/* Edit sheets */}
      <Sheet open={!!editing} onClose={() => setEditing(null)} label="Edit offer detail">
        {editing && (
          <div style={{ paddingTop: 10 }}>
            <h2 className="display" style={{ fontSize: 32 }}>
              {rows.find((r) => r.key === editing)?.label}
            </h2>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {editing === 'fee' && <TextField label="Fee (AED)" type="number" inputMode="numeric" value={String(offer.fee)} onChange={(e) => setOffer({ ...offer, fee: Math.max(0, Number(e.target.value) || 0) })} />}
              {editing === 'deliverables' && (
                <SelectField
                  label="Deliverables"
                  value={offer.deliverables}
                  onChange={(e) => setOffer({ ...offer, deliverables: e.target.value })}
                  options={['1 Video + 3 Story frames', '1 Reel', '2 Videos + 5 Story frames', '1 Video + 1 Post + 3 Stories'].map((v) => ({ value: v, label: v }))}
                />
              )}
              {editing === 'deadline' && <SelectField label="Deadline" value={offer.deadline} onChange={(e) => setOffer({ ...offer, deadline: e.target.value })} options={['Jul 3', 'Jul 10', 'Jul 17', 'Jul 24'].map((v) => ({ value: v, label: v }))} />}
              {editing === 'usage' && <SelectField label="Usage rights" value={offer.usage} onChange={(e) => setOffer({ ...offer, usage: e.target.value })} options={['30 days organic', '90 days organic', '6 months organic + paid', '12 months all channels'].map((v) => ({ value: v, label: v }))} />}
              {editing === 'notes' && <TextArea label="Notes to creator" value={offer.notes} onChange={(e) => setOffer({ ...offer, notes: e.target.value })} max={500} rows={4} placeholder="Add a personal message" />}
              <Button block onClick={() => setEditing(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </Sheet>

      {/* Offer ready */}
      <Sheet open={ready} onClose={() => setReady(false)} label="Offer ready">
        <div style={{ position: 'relative', paddingTop: 12 }}>
          <IconButton label="Close" onClick={() => setReady(false)} style={{ position: 'absolute', right: 0, top: 8 }}>
            <Icon icon={Cancel01Icon} size={20} />
          </IconButton>
          <span style={{ width: 84, height: 84, borderRadius: '50%', border: '1.5px solid var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
            <Icon icon={Tick02Icon} size={40} strokeWidth={1.6} />
          </span>
          <h2 className={['display', a.h1].join(' ')} style={{ marginTop: 22 }}>
            Offer ready.
          </h2>
          <p className={a.sub}>Review the details below before confirming and sending to the creator.</p>

          <Card padding="none" style={{ marginTop: 22 }} radius="xl">
            <div style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar name={c.name} size={100} tone={c.tone} portrait />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 24, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {c.name} <Verified size={18} />
                </div>
                <div className={a.meta} style={{ fontSize: 16, marginTop: 2 }}>
                  {c.tags[1] ?? c.tags[0]} Creator
                </div>
                <div className={a.meta} style={{ marginTop: 4 }}>
                  {c.city}, {c.country} • {c.followers} followers
                </div>
              </div>
              <IconButton label="Save creator" style={{ borderRadius: 14 }}>
                <Icon icon={Bookmark02Icon} size={20} />
              </IconButton>
            </div>
            {[
              { i: DollarCircleIcon, l: 'Total fee', v: `AED ${offer.fee.toLocaleString()}`, r: <Chip size="sm" tone="tintLight">All-inclusive</Chip> },
              { i: File01Icon, l: 'Deliverables', v: null, r: <Chip size="sm">4</Chip>, list: ['1x Instagram post', '3x Instagram stories', '1x Reel (30–60s)', `Usage rights ${offer.usage}`] },
              { i: Calendar03Icon, l: 'Deadline', v: 'May 28, 2026', r: <Chip size="sm" leading={<Icon icon={Calendar03Icon} size={14} />}>18 days</Chip> },
            ].map((row) => (
              <div key={row.l} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', borderTop: '1px solid var(--line)' }}>
                <IconTile icon={row.i} tone="outline" size={56} iconSize={24} />
                <div style={{ flex: 1 }}>
                  <div className={a.meta} style={{ fontSize: 17 }}>
                    {row.l}
                  </div>
                  {row.v && <div style={{ fontSize: 22, fontWeight: 500, marginTop: 2 }}>{row.v}</div>}
                  {row.list && (
                    <ul style={{ margin: '6px 0 0', paddingLeft: 18, color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.7 }}>
                      {row.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {row.r}
              </div>
            ))}
          </Card>

          <button type="button" onClick={() => toast('Escrow protects both parties', 'info')} style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', marginTop: 16, padding: '18px 20px', borderRadius: 'var(--r-pill)', background: 'var(--primary)', color: 'var(--ink)' }}>
            <span style={{ width: 66, height: 66, borderRadius: 18, background: 'rgba(255,255,255,0.45)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon={SquareLock02Icon} size={30} strokeWidth={1.4} />
            </span>
            <span style={{ flex: 1 }}>
              <b style={{ display: 'block', fontSize: 18, fontWeight: 500 }}>Protected payment</b>
              <span style={{ display: 'block', fontSize: 14, marginTop: 2, opacity: 0.85 }}>Payment is held securely in escrow and released only when deliverables are approved.</span>
            </span>
            <Icon icon={ArrowRight01Icon} size={22} />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            <Button block loading={sending} leading={<Icon icon={SentIcon} size={22} />} onClick={confirm}>
              Confirm and send
            </Button>
            <Button block variant="soft" leading={<Icon icon={PencilEdit02Icon} size={20} />} onClick={() => setReady(false)}>
              Edit offer
            </Button>
          </div>
        </div>
      </Sheet>
    </Page>
  )
}
