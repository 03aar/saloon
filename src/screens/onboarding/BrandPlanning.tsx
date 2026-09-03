import { useNavigate } from 'react-router-dom'
import {
  ArrowDown01Icon,
  ArrowLeft02Icon,
  Diamond01Icon,
  Dumbbell01Icon,
  Globe02Icon,
  Megaphone01Icon,
  Moon02Icon,
  PerfumeIcon,
  Rocket01Icon,
  SmartPhone01Icon,
  Store01Icon,
} from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Stepper } from '../../components/Stepper'
import { Icon } from '../../components/Icon'
import { Wordmark } from '../../components/Wordmark'
import { RangeSlider } from '../../components/RangeSlider'
import { useApp } from '../../store/AppContext'
import { goals, markets } from '../../data/mock'
import s from './onboarding.module.css'

const TOTAL = 3
const icons = { awareness: Megaphone01Icon, launch: Rocket01Icon, ugc: SmartPhone01Icon, 'store-visits': Store01Icon, ramadan: Moon02Icon, luxury: Diamond01Icon, beauty: PerfumeIcon, fitness: Dumbbell01Icon } as const

const fmt = (k: number) => (k >= 500 ? 'AED 500K+' : `AED ${k}K`)
// Log scale so mid-range budgets sit near the middle of the track (10K … 500K)
const toPos = (k: number) => Math.round((Math.log(k / 10) / Math.log(50)) * 100)
const toVal = (p: number) => Math.round((10 * Math.pow(50, p / 100)) / 5) * 5

export default function BrandPlanning() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const p = state.planning
  const set = (patch: Partial<typeof p>) => update({ planning: { ...p, ...patch } })
  const toggle = (id: string) => set({ goals: p.goals.includes(id) ? p.goals.filter((g) => g !== id) : [...p.goals, id] })
  const market = markets.find((m) => m.id === p.market) ?? markets[0]

  return (
    <Page>
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/onboarding/brand/profile')}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        center={<Wordmark variant="stacked" sub="Brands" />}
      />
      <div style={{ marginTop: 22 }}>
        <Stepper step={2} total={TOTAL} variant="circles" />
      </div>

      <div className={s.eyebrow} style={{ marginTop: 34 }}>
        Step 2 of {TOTAL}
      </div>
      <h1 className={['display', s.h1].join(' ')} style={{ marginTop: 10 }}>
        What are you
        <br />
        planning?
      </h1>
      <p className={s.sub}>Tell us your goals so we can match you with the right creators and campaigns.</p>

      <div className={s.qLabel}>Select your primary goals</div>
      <div className={s.goals} role="group" aria-label="Primary goals">
        {goals.map((g) => {
          const on = p.goals.includes(g.id)
          return (
            <button key={g.id} type="button" aria-pressed={on} className={[s.goal, on ? s.on : ''].join(' ')} onClick={() => toggle(g.id)}>
              <Icon icon={icons[g.id as keyof typeof icons]} size={30} strokeWidth={1.3} />
              {g.label}
            </button>
          )
        })}
      </div>

      <div className={s.qLabel}>Where is your target market?</div>
      <div className={s.marketBtn}>
        <span
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'var(--gold-tint)',
            border: '1px solid var(--gold-soft)',
            color: 'var(--gold-deep)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon icon={Globe02Icon} size={30} strokeWidth={1.3} />
        </span>
        <span style={{ flex: 1 }}>
          <b style={{ display: 'block', fontSize: 18, fontWeight: 500 }}>{market.label}</b>
          <span style={{ display: 'block', fontSize: 14, color: 'var(--muted)', marginTop: 2 }}>{market.hint}</span>
        </span>
        <Icon icon={ArrowDown01Icon} size={22} />
        <select aria-label="Target market" value={p.market} onChange={(e) => set({ market: e.target.value })}>
          {markets.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className={s.qLabel}>What’s your campaign budget range?</div>
      <div className={s.budgetCard}>
        <div className={s.budgetVal}>
          {fmt(p.budget[0])} – {fmt(p.budget[1])}
        </div>
        <div className={s.budgetSub}>Total campaign budget</div>
        <RangeSlider min={0} max={100} step={1} value={[toPos(p.budget[0]), toPos(p.budget[1])]} onChange={(v) => set({ budget: [toVal(v[0]), toVal(v[1])] })} minLabel="AED 10K" maxLabel="AED 500K+" ariaLabel="Budget" />
      </div>

      <Footer>
        <Button block onClick={() => nav('/onboarding/brand/team')}>
          Continue
        </Button>
      </Footer>
    </Page>
  )
}
