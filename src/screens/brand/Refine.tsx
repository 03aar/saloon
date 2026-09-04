import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, Bookmark02Icon, CubeIcon, Globe02Icon, GridViewIcon, InstagramIcon, LiveStreaming01Icon, Medal01Icon, NewsIcon, SecurityCheckIcon, SparklesIcon, Tick02Icon, TiktokIcon, UserGroupIcon, VideoReplayIcon, Wallet02Icon, YoutubeIcon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { Segmented } from '../../components/Segmented'
import { RangeSlider } from '../../components/RangeSlider'
import { ScreenHeader } from '../../components/ScreenHeader'
import { useApp, defaultFilters, type Filters } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const categories = ['Beauty', 'Fashion', 'Lifestyle', 'Wellness', 'Tech', 'Food', 'Travel', 'Parenting']
const engagement = [
  { l: 'Any', s: '' },
  { l: 'Basic', s: '>1%' },
  { l: 'Good', s: '>2%' },
  { l: 'Very good', s: '>3%' },
  { l: 'Excellent', s: '>5%' },
]
const budgetPresets: { l: string; r: [number, number] }[] = [
  { l: 'Under 5K', r: [1000, 5000] },
  { l: '5K - 25K', r: [5000, 25000] },
  { l: '25K - 50K', r: [25000, 50000] },
  { l: '50K+', r: [50000, 100000] },
]
const deliverables = [
  { l: 'Instagram post', i: InstagramIcon },
  { l: 'Instagram story', i: SparklesIcon },
  { l: 'Reel', i: VideoReplayIcon },
  { l: 'TikTok video', i: TiktokIcon },
  { l: 'YouTube video', i: YoutubeIcon },
  { l: 'Blog post', i: NewsIcon },
  { l: 'Usage rights', i: SecurityCheckIcon },
  { l: 'Live session', i: LiveStreaming01Icon },
]

function SectionCard({ title, icon, children }: { title: string; icon: typeof CubeIcon; children: React.ReactNode }) {
  return (
    <Card padding="md" radius="xl">
      <div className={a.between}>
        <h2 className="display" style={{ fontSize: 26 }}>
          {title}
        </h2>
        <span style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon={icon} size={20} />
        </span>
      </div>
      <div style={{ marginTop: 16 }}>{children}</div>
    </Card>
  )
}

export default function Refine() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const [f, setF] = useState<Filters>(state.filters)
  const [moreCats, setMoreCats] = useState(false)
  const set = (p: Partial<Filters>) => setF((x) => ({ ...x, ...p }))
  const toggleIn = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  const count = Math.max(12, 324 - f.categories.length * 40 - f.deliverables.length * 12 - f.engagement * 25 + (f.region === 'Both' ? 60 : 0))

  const apply = () => {
    update({ filters: f })
    toast(`Showing ${count} creators`)
    nav('/discover')
  }

  return (
    <Page layout="app">
      <ScreenHeader
        title="Refine match"
        sub="Narrow your search to find the right creators for your campaign."
        back
        actions={
          <Button size="sm" variant="soft" onClick={() => setF(defaultFilters)} style={{ color: 'var(--gold-deep)' }}>
            Clear all
          </Button>
        }
      />

      <div className={a.stack} style={{ marginTop: 22 }}>
        <Card padding="none" radius="xl">
          <div style={{ padding: 20 }}>
            <div className={a.between}>
              <h2 className="display" style={{ fontSize: 26 }}>
                Region
              </h2>
              <span style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Globe02Icon} size={20} />
              </span>
            </div>
            <div style={{ marginTop: 14 }}>
              <Segmented variant="primary" items={[{ id: 'GCC', label: 'GCC' }, { id: 'Global', label: 'Global' }, { id: 'Both', label: 'Both' }]} value={f.region} onChange={(v) => set({ region: v as Filters['region'] })} />
            </div>
          </div>
          <div style={{ padding: 20, borderTop: '1px solid var(--line)' }}>
            <div className={a.between}>
              <h2 className="display" style={{ fontSize: 26 }}>
                Category
              </h2>
              <span style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={GridViewIcon} size={20} />
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: moreCats ? 'wrap' : 'nowrap', overflowX: moreCats ? 'visible' : 'auto', marginTop: 14, alignItems: 'center', paddingBottom: 2 }}>
              {(moreCats ? categories : categories.slice(0, 5)).map((c) => (
                <Chip key={c} selected={f.categories.includes(c)} onClick={() => set({ categories: toggleIn(f.categories, c) })} leading={f.categories.includes(c) ? <Icon icon={SparklesIcon} size={16} /> : undefined} size="md" className="" >
                  {c}
                </Chip>
              ))}
              <IconButton label={moreCats ? 'Show fewer' : 'Show more'} size="sm" onClick={() => setMoreCats((v) => !v)} style={{ transform: moreCats ? 'rotate(180deg)' : 'none' }}>
                <Icon icon={ArrowDown01Icon} size={18} />
              </IconButton>
            </div>
          </div>
        </Card>

        <SectionCard title="Audience age" icon={UserGroupIcon}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--muted)' }}>
            <span>13</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{f.age[0]}</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{f.age[1]}</span>
            <span>65+</span>
          </div>
          <RangeSlider min={13} max={65} value={f.age} onChange={(v) => set({ age: v })} hollow ariaLabel="Audience age" />
          <div style={{ textAlign: 'center', color: 'var(--gold-deep)', fontSize: 16, marginTop: 6 }}>
            {f.age[0]} – {f.age[1] >= 65 ? '65+' : f.age[1]}
          </div>
        </SectionCard>

        <SectionCard title="Engagement quality" icon={Medal01Icon}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {engagement.map((e, i) => {
              const on = f.engagement === i
              return (
                <button key={e.l} type="button" aria-pressed={on} onClick={() => set({ engagement: i })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 62, height: 62, borderRadius: '50%', border: `6px solid ${on ? 'var(--gold)' : i === 4 ? 'var(--gold-soft)' : 'var(--surface-3)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', transition: 'border-color 200ms var(--ease)' }}>
                    {on && <Icon icon={Tick02Icon} size={22} strokeWidth={2.4} />}
                  </span>
                  <span style={{ fontSize: 14, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>{e.l}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: -6 }}>{e.s}</span>
                </button>
              )
            })}
          </div>
        </SectionCard>

        <SectionCard title="Budget range (AED)" icon={Wallet02Icon}>
          <div className={a.between}>
            <span>
              <span className={a.meta}>AED </span>
              <span className="display" style={{ fontSize: 28 }}>
                {f.budget[0].toLocaleString()}
              </span>
            </span>
            <span>
              <span className={a.meta}>AED </span>
              <span className="display" style={{ fontSize: 28 }}>
                {f.budget[1].toLocaleString()}
                {f.budget[1] >= 100000 ? '+' : ''}
              </span>
            </span>
          </div>
          <RangeSlider min={1000} max={100000} step={500} value={f.budget} onChange={(v) => set({ budget: v })} hollow ariaLabel="Budget" />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {budgetPresets.map((p) => {
              const on = f.budget[0] === p.r[0] && f.budget[1] === p.r[1]
              return (
                <Chip key={p.l} size="sm" selected={on} tone="soft" onClick={() => set({ budget: p.r })} className="" >
                  {p.l}
                </Chip>
              )
            })}
          </div>
        </SectionCard>

        <SectionCard title="Deliverables" icon={CubeIcon}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {deliverables.map((d) => (
              <Chip key={d.l} size="sm" selected={f.deliverables.includes(d.l)} onClick={() => set({ deliverables: toggleIn(f.deliverables, d.l) })} leading={<Icon icon={d.i} size={15} />}>
                {d.l}
              </Chip>
            ))}
          </div>
        </SectionCard>
      </div>

      <Footer app>
        <div style={{ display: 'grid', gridTemplateColumns: '38% 1fr', gap: 12 }}>
          <Button variant="soft" leading={<Icon icon={Bookmark02Icon} size={20} />} onClick={() => toast('Search saved')}>
            Save search
          </Button>
          <Button onClick={apply}>
            Show {count} creators
          </Button>
        </div>
      </Footer>
    </Page>
  )
}
