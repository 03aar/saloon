import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, Globe02Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { SelectField } from '../../components/SelectField'
import { Stepper } from '../../components/Stepper'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Art } from '../../components/Art'
import { useApp } from '../../store/AppContext'
import { headquarters, industries } from '../../data/mock'
import s from './onboarding.module.css'

const TOTAL = 3

export default function BrandProfile() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const b = state.brand
  const set = (patch: Partial<typeof b>) => update({ brand: { ...b, ...patch } })
  const shortHq = b.hq.replace('United Arab Emirates', 'UAE').replace('Saudi Arabia', 'KSA')
  const valid = b.name.trim().length > 1

  return (
    <Page>
      <div style={{ paddingTop: 12 }}>
        <Stepper step={1} total={TOTAL} />
      </div>
      <div className={s.stepRow}>
        <span className={s.stepChip}>Step 1 of {TOTAL}</span>
        <span className={s.stepName}>
          Brand Profile<span>Company</span>
        </span>
      </div>
      <h1 className={['display', s.h1].join(' ')}>
        Tell creators
        <br />
        who you are.
      </h1>
      <p className={s.sub}>This helps creators understand your brand and collaborate with confidence.</p>

      <form
        className={s.formCard}
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) nav('/onboarding/brand/planning')
        }}
      >
        <TextField label="Brand name" value={b.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your brand name" autoComplete="organization" />
        <SelectField label="Industry" value={b.industry} onChange={(e) => set({ industry: e.target.value })} options={industries.map((i) => ({ value: i, label: i }))} />
        <TextField label="Website" value={b.website} onChange={(e) => set({ website: e.target.value })} placeholder="yourbrand.com" inputMode="url" icon={<Icon icon={Globe02Icon} size={22} />} />
        <SelectField label="Headquarters" value={b.hq} onChange={(e) => set({ hq: e.target.value })} icon={<Icon icon={Location01Icon} size={22} />} options={headquarters.map((h) => ({ value: h, label: h }))} />
      </form>

      <section className={s.preview} aria-label="Brand card preview">
        <span className={s.previewArt}>
          <Art kind="silk" />
        </span>
        <Avatar name={b.name || 'N'} size={92} tone="cream" ring="surface" />
        <div style={{ position: 'relative', minWidth: 0 }}>
          <div className={s.previewName}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name || 'Your brand'}</span>
            <Verified size={20} />
          </div>
          <div className={s.previewTag}>{b.tagline}</div>
          <div className={s.previewMeta}>
            <span>
              <Icon icon={Location01Icon} size={14} />
              {shortHq}
            </span>
            <i />
            <span>
              <Icon icon={Globe02Icon} size={14} />
              {b.website || 'yourbrand.com'}
            </span>
          </div>
        </div>
      </section>

      <Footer>
        <Button block spread trailing={<Icon icon={ArrowRight02Icon} size={22} />} disabled={!valid} onClick={() => nav('/onboarding/brand/planning')}>
          Continue
        </Button>
      </Footer>
    </Page>
  )
}
