import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft02Icon, ArrowRight02Icon, Cancel01Icon, Globe02Icon, HangerIcon, InformationCircleIcon, Location01Icon, Message01Icon, PencilEdit02Icon, PerfumeIcon, SparklesIcon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Stepper } from '../../components/Stepper'
import { Avatar } from '../../components/Avatar'
import { Chip } from '../../components/Chip'
import { SelectField } from '../../components/SelectField'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import s from './creator.module.css'

const TOTAL = 3
const allLangs = ['English', 'Arabic', 'Hindi', 'French', 'Urdu', 'Tagalog']
const cats = [
  { l: 'Fashion', i: HangerIcon },
  { l: 'Lifestyle', i: SparklesIcon },
  { l: 'Beauty', i: PerfumeIcon },
]

export default function CreatorProfileSetup() {
  const nav = useNavigate()
  const { state, signIn } = useApp()
  const { toast } = useToast()
  const [name, setName] = useState(state.session?.name ?? 'Mira Alia')
  const [city, setCity] = useState('Dubai, UAE')
  const [region, setRegion] = useState('GCC')
  const [langs, setLangs] = useState(['English', 'Arabic', 'Hindi'])
  const [picking, setPicking] = useState(false)
  const [editing, setEditing] = useState(false)

  const next = () => {
    if (state.session) signIn({ ...state.session, name })
    nav('/onboarding/creator/work')
  }

  return (
    <Page>
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/welcome')} style={{ borderRadius: 16, width: 64, height: 64 }}>
            <Icon icon={ArrowLeft02Icon} size={24} />
          </IconButton>
        }
        center={
          <div style={{ width: '70%', maxWidth: 300 }}>
            <Stepper step={1} total={TOTAL} variant="pills" />
          </div>
        }
        right={<span style={{ width: 64 }} />}
      />
      <div className={s.eyebrow} style={{ marginTop: 44 }}>
        Step 1 of {TOTAL}
      </div>
      <h1 className={['display', s.h1].join(' ')}>
        Shape your
        <br />
        creator profile<span className="gold-dot">.</span>
      </h1>
      <p className={s.sub}>Tell brands who you are and who you create for.</p>

      <section className={s.profileCard}>
        <div className={s.avatarWrap}>
          <Avatar name={name} size={200} tone="sand" portrait />
          <button type="button" className={s.editBadge} aria-label="Edit name and photo" onClick={() => setEditing(true)}>
            <Icon icon={PencilEdit02Icon} size={26} strokeWidth={1.4} />
          </button>
        </div>
        <div className="display" style={{ fontSize: 48, marginTop: 22 }}>
          {name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, color: 'var(--ink-2)', fontSize: 18 }}>
          <Icon icon={Location01Icon} size={22} color="var(--gold)" />
          {city}
        </div>
        <div style={{ width: '100%', height: 1, background: 'var(--line)', margin: '24px 0 20px' }} />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {cats.map((c) => (
            <Chip key={c.l} leading={<Icon icon={c.i} size={20} color="var(--gold)" />} onClick={() => toast(`${c.l} is one of your categories`, 'info')} className="">
              {c.l}
            </Chip>
          ))}
        </div>
      </section>

      <section className={s.qCard}>
        <div className={s.qHead}>
          <Icon icon={Globe02Icon} size={26} strokeWidth={1.3} />
          Primary audience region
          <Icon icon={InformationCircleIcon} size={20} />
        </div>
        <div style={{ marginTop: 14 }}>
          <SelectField aria-label="Primary audience region" value={region} onChange={(e) => setRegion(e.target.value)} compact options={['GCC', 'MENA', 'Global', 'Europe', 'South Asia'].map((r) => ({ value: r, label: r }))} />
        </div>
        <p className="muted" style={{ fontSize: 14, marginTop: 10 }}>
          Where is your audience mostly located?
        </p>
      </section>

      <section className={s.qCard}>
        <div className={s.qHead}>
          <Icon icon={Message01Icon} size={26} strokeWidth={1.3} />
          Languages you create in
          <Icon icon={InformationCircleIcon} size={20} />
        </div>
        <button type="button" onClick={() => setPicking(true)} style={{ marginTop: 14, width: '100%', minHeight: 60, padding: '10px 14px', borderRadius: 'var(--r-pill)', border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', textAlign: 'left' }}>
          {langs.map((l) => (
            <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, background: 'var(--surface-2)', fontSize: 17 }}>
              {l}
              <span role="button" tabIndex={0} aria-label={`Remove ${l}`} onClick={(e) => { e.stopPropagation(); setLangs((x) => x.filter((y) => y !== l)) }} onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); setLangs((x) => x.filter((y) => y !== l)) } }} style={{ display: 'inline-flex' }}>
                <Icon icon={Cancel01Icon} size={14} strokeWidth={2} />
              </span>
            </span>
          ))}
          <Icon icon={ArrowDown01Icon} size={20} style={{ marginLeft: 'auto' }} />
        </button>
        <p className="muted" style={{ fontSize: 14, marginTop: 10 }}>
          Select all that apply.
        </p>
      </section>

      <Footer>
        <Button block spread trailing={<Icon icon={ArrowRight02Icon} size={22} />} disabled={!name.trim() || langs.length === 0} onClick={next}>
          Continue
        </Button>
      </Footer>

      <Sheet open={picking} onClose={() => setPicking(false)} label="Languages">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Languages
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
          {allLangs.map((l) => (
            <Chip key={l} selected={langs.includes(l)} onClick={() => setLangs((x) => (x.includes(l) ? x.filter((y) => y !== l) : [...x, l]))}>
              {l}
            </Chip>
          ))}
        </div>
        <Button block style={{ marginTop: 20 }} onClick={() => setPicking(false)}>
          Done
        </Button>
      </Sheet>

      <Sheet open={editing} onClose={() => setEditing(false)} label="Edit profile">
        <h2 className="display" style={{ fontSize: 32, marginTop: 12 }}>
          Edit profile
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 18 }}>
          <TextField label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
          <SelectField label="City" value={city} onChange={(e) => setCity(e.target.value)} options={['Dubai, UAE', 'Abu Dhabi, UAE', 'Riyadh, KSA', 'Jeddah, KSA', 'Doha, Qatar', 'Kuwait City, Kuwait'].map((c) => ({ value: c, label: c }))} />
          <Button block onClick={() => setEditing(false)}>
            Save
          </Button>
        </div>
      </Sheet>
    </Page>
  )
}
