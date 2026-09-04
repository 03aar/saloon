import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight02Icon, Bookmark02Icon, Calendar03Icon, Globe02Icon, Location01Icon, Megaphone01Icon, PencilEdit02Icon, SmartPhone01Icon, StarIcon, Tag01Icon, Tick02Icon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Art } from '../../components/Art'
import { TextArea } from '../../components/TextArea'
import { TextField } from '../../components/TextField'
import { SelectField } from '../../components/SelectField'
import { Sheet } from '../../components/Sheet'
import { Ring } from '../../components/Ring'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const objectives = [
  { id: 'awareness', label: 'Awareness', icon: Megaphone01Icon },
  { id: 'ugc', label: 'UGC', icon: SmartPhone01Icon },
  { id: 'store-visits', label: 'Store visits', icon: Location01Icon },
]

export default function NewCampaign() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const c = state.campaign
  const set = (p: Partial<typeof c>) => update({ campaign: { ...c, ...p } })
  const [edit, setEdit] = useState(false)

  const toggleObj = (id: string) => {
    if (c.objectives.includes(id)) return set({ objectives: c.objectives.filter((o) => o !== id) })
    if (c.objectives.length >= 2) return toast('You can select up to 2 objectives', 'info')
    set({ objectives: [...c.objectives, id] })
  }

  const quality = Math.min(100, Math.round((c.description.length / 180) * 60) + c.objectives.length * 15 + (c.name ? 10 : 0))
  const qLabel = quality >= 80 ? 'Strong' : quality >= 50 ? 'Good' : 'Needs work'
  const qHint = quality >= 80 ? 'Great job! Your brief is clear and complete.' : quality >= 50 ? 'Add more detail to attract stronger proposals.' : 'Describe your goals and audience to get started.'
  const canContinue = c.name.trim().length > 2 && c.objectives.length > 0 && c.description.trim().length >= 40

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/home')}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={Bookmark02Icon} size={18} />} onClick={() => toast('Draft saved')}>
            Save draft
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        New campaign
      </h1>
      <p className={a.sub}>Build a clear brief. Attract the right creators.</p>

      <Card tone="dark" padding="none" style={{ marginTop: 22 }} radius="xl" className={a.dark}>
        <div style={{ padding: 20, display: 'flex', gap: 18, position: 'relative' }}>
          <span style={{ width: 130, height: 130, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
            <Art kind="glow" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className={a.darkEyebrow}>Campaign name</div>
            <div className="display" style={{ fontSize: 34, color: '#fff', marginTop: 10, lineHeight: 1.05, overflowWrap: 'anywhere' }}>
              {c.name || 'Untitled campaign'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: 'rgba(255,255,255,0.65)' }}>
              <Icon icon={Globe02Icon} size={18} /> GCC • Global
            </div>
          </div>
          <IconButton label="Edit campaign details" onClick={() => setEdit(true)} style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(248,188,88,0.5)', color: 'var(--gold)', position: 'absolute', right: 20, top: 20 }}>
            <Icon icon={PencilEdit02Icon} size={20} />
          </IconButton>
        </div>
        <div className={a.splitStats} style={{ padding: '18px 20px 22px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            [Calendar03Icon, 'Campaign dates', c.dates],
            [Tag01Icon, 'Category', c.category],
            [Wallet02Icon, 'Budget', `SAR ${(c.budget * 1.8).toLocaleString()}`],
          ].map(([ic, l, v]) => (
            <div key={l as string}>
              <Icon icon={ic as typeof Tag01Icon} size={26} strokeWidth={1.3} color="rgba(255,255,255,0.8)" />
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>{l as string}</div>
              <div style={{ fontSize: 17, fontWeight: 500, marginTop: 4 }}>{v as string}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 20 }}>
          Objective
        </div>
        <p className={a.meta} style={{ marginTop: 4 }}>
          What do you want to achieve with this campaign?
        </p>
        <div className={a.grid3} style={{ marginTop: 14 }}>
          {objectives.map((o) => {
            const on = c.objectives.includes(o.id)
            return (
              <button key={o.id} type="button" aria-pressed={on} onClick={() => toggleObj(o.id)} style={{ position: 'relative', padding: '18px 16px', borderRadius: 'var(--r-lg)', border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line)'}`, background: on ? 'var(--gold-tint)' : 'var(--surface)', textAlign: 'left', minHeight: 116 }}>
                <Icon icon={o.icon} size={26} strokeWidth={1.4} />
                <span style={{ position: 'absolute', right: 14, top: 14, width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line-strong)'}`, background: on ? 'var(--gold)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {on && <Icon icon={Tick02Icon} size={14} strokeWidth={2.6} />}
                </span>
                <div style={{ fontSize: 18, fontWeight: 500, marginTop: 22 }}>{o.label}</div>
              </button>
            )
          })}
        </div>
        <p className={a.metaSm} style={{ marginTop: 10 }}>
          You can select up to 2 objectives.
        </p>
      </div>

      <div className={a.section}>
        <TextArea label="Description" hint="Provide a clear overview of your campaign." value={c.description} onChange={(e) => set({ description: e.target.value })} max={1000} rows={6} placeholder="Describe your campaign, audience and the kind of content you’re looking for." />
      </div>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 20 }}>
          Brief quality
        </div>
        <p className={a.meta} style={{ marginTop: 4 }}>
          A strong brief attracts stronger proposals.
        </p>
        <Card padding="md" style={{ marginTop: 14 }} radius="xl">
          <div className={a.row}>
            <Ring value={quality} size={80} stroke={8}>
              <Icon icon={StarIcon} size={26} color="var(--gold)" />
            </Ring>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>{qLabel}</div>
              <div className={a.meta} style={{ marginTop: 2 }}>
                {qHint}
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: quality >= (i + 1) * 20 ? 'var(--gold)' : 'var(--surface-3)' }} />
                ))}
              </div>
            </div>
            <Button size="sm" variant="tint" onClick={() => toast('Mention audience, tone, deliverables and timeline', 'info')}>
              View tips
            </Button>
          </div>
        </Card>
      </div>

      <Footer app>
        <Button block spread trailing={<Icon icon={ArrowRight02Icon} size={22} />} disabled={!canContinue} onClick={() => nav('/compare')}>
          Next: Target creators
        </Button>
      </Footer>

      <Sheet open={edit} onClose={() => setEdit(false)} label="Edit campaign">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Campaign details
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
          <TextField label="Campaign name" value={c.name} onChange={(e) => set({ name: e.target.value })} />
          <SelectField label="Campaign dates" value={c.dates} onChange={(e) => set({ dates: e.target.value })} options={['Mar 1 – Mar 31', 'Apr 1 – Apr 30', 'May 2 – May 24', 'Jun 10 – Jun 30'].map((v) => ({ value: v, label: v }))} />
          <SelectField label="Category" value={c.category} onChange={(e) => set({ category: e.target.value })} options={['Beauty', 'Fashion', 'Lifestyle', 'Wellness', 'Tech'].map((v) => ({ value: v, label: v }))} />
          <Button block onClick={() => setEdit(false)}>
            Done
          </Button>
        </div>
      </Sheet>
    </Page>
  )
}
