import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add01Icon, ArrowLeft02Icon, ArrowRight01Icon, ArrowRight02Icon, FileValidationIcon, Shield01Icon, Upload01Icon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Stepper } from '../../components/Stepper'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { SelectField } from '../../components/SelectField'
import { useToast } from '../../components/Toast'
import { useApp, type TeamMember } from '../../store/AppContext'
import { isEmail } from '../../lib/auth'
import s from './onboarding.module.css'

const TOTAL = 3
const roles = ['Campaign lead', 'Reviewer', 'Finance', 'Analyst']
const approvalOptions = ['Require 1 approver', 'Require 2 of 3 to approve', 'Require all to approve']

export default function BrandTeam() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<keyof typeof state.approvals | null>(null)
  const [draft, setDraft] = useState({ name: '', email: '', role: roles[0] })
  const [touched, setTouched] = useState(false)

  const addMember = () => {
    setTouched(true)
    if (draft.name.trim().length < 2 || !isEmail(draft.email)) return
    const m: TeamMember = { id: `t${Date.now()}`, role: draft.role, name: draft.name.trim(), email: draft.email.trim(), tag: draft.role.split(' ')[0], tone: 'stone', photo: false }
    update({ team: [...state.team, m] })
    setAdding(false)
    setDraft({ name: '', email: '', role: roles[0] })
    setTouched(false)
    toast(`${m.name} added to the room`)
  }

  const approvals: { key: keyof typeof state.approvals; title: string; icon: typeof Shield01Icon }[] = [
    { key: 'content', title: 'Content approvals', icon: Shield01Icon },
    { key: 'budget', title: 'Budget approvals', icon: Wallet02Icon },
    { key: 'contract', title: 'Contract approvals', icon: FileValidationIcon },
    { key: 'payout', title: 'Payout approvals', icon: Upload01Icon },
  ]

  return (
    <Page>
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav('/onboarding/brand/planning')}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        center={
          <div style={{ textAlign: 'center' }}>
            <div className={s.eyebrow}>Step 3 of {TOTAL}</div>
            <div style={{ marginTop: 10 }}>
              <Stepper step={3} total={TOTAL} variant="pills" />
            </div>
          </div>
        }
      />
      <h1 className={['display', s.h1].join(' ')} style={{ marginTop: 26 }}>
        Set your
        <br />
        campaign room
      </h1>
      <p className={s.sub}>Add your core team to run campaigns, review content, and approve deals.</p>

      <section className={s.teamCard} aria-label="Team">
        <div className={s.teamHead}>
          <span className={s.monoRing} style={{ width: 84, height: 84, fontSize: 42, borderColor: 'rgba(248,188,88,0.6)', background: 'rgba(255,255,255,0.03)' }}>
            {(state.brand.name || 'L').charAt(0).toUpperCase()}
          </span>
          <div>
            <div className={s.teamName}>{state.brand.name.toUpperCase()}</div>
            <div className={s.teamSub}>Brand profile</div>
          </div>
          <span className={s.count}>
            <Icon icon={UserGroupIcon} size={22} />
            {state.team.length}
          </span>
        </div>

        <div className={s.teamList}>
          {state.team.map((m) => (
            <button key={m.id} type="button" className={s.member} onClick={() => toast(`${m.name} · ${m.role}`, 'info')}>
              <Avatar name={m.name} size={54} tone={m.tone} portrait={m.photo} ring="none" />
              <span style={{ minWidth: 0 }}>
                <span className={s.role}>{m.role}</span>
                <span className={s.name} style={{ display: 'block' }}>
                  {m.name}
                </span>
                <span className={s.email} style={{ display: 'block' }}>
                  {m.email}
                </span>
              </span>
              <span className={s.tag}>{m.tag}</span>
              <Icon icon={ArrowRight01Icon} size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </button>
          ))}
          <button type="button" className={s.addBtn} onClick={() => setAdding(true)}>
            <span>
              <Icon icon={Add01Icon} size={22} />
            </span>
            Add team member
          </button>
        </div>
      </section>

      <h2 className="display" style={{ fontSize: 28, marginTop: 30 }}>
        Approval settings
      </h2>
      <p className="muted" style={{ marginTop: 6, fontSize: 15 }}>
        Define how decisions are made in this room.
      </p>
      <div className={s.approvals}>
        {approvals.map((a) => (
          <button key={a.key} type="button" className={s.approval} onClick={() => setEditing(a.key)}>
            <IconTile icon={a.icon} size={52} iconSize={24} />
            <b>{a.title}</b>
            <span>{state.approvals[a.key]}</span>
            <span className={s.approvalChev}>
              <Icon icon={ArrowRight01Icon} size={20} />
            </span>
          </button>
        ))}
      </div>

      <Footer>
        <Button
          block
          trailing={<Icon icon={ArrowRight02Icon} size={22} />}
          onClick={() => {
            update({ onboardingComplete: true })
            nav('/onboarding/brand/ready')
          }}
        >
          Continue
        </Button>
      </Footer>

      <Sheet open={adding} onClose={() => setAdding(false)} label="Add team member">
        <h2 className="display" style={{ fontSize: 34, marginTop: 12 }}>
          Add team member
        </h2>
        <p className="muted" style={{ marginTop: 6 }}>
          They’ll get an invite to join your campaign room.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
          <TextField label="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Sara Al Ali" error={touched && draft.name.trim().length < 2 ? 'Enter a name.' : undefined} />
          <TextField label="Work email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="name@company.com" error={touched && !isEmail(draft.email) ? 'Enter a valid email.' : undefined} />
          <SelectField label="Role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} options={roles.map((r) => ({ value: r, label: r }))} />
          <Button block onClick={addMember} style={{ marginTop: 6 }}>
            Send invite
          </Button>
        </div>
      </Sheet>

      <Sheet open={!!editing} onClose={() => setEditing(null)} label="Approval rule">
        <h2 className="display" style={{ fontSize: 34, marginTop: 12 }}>
          {approvals.find((a) => a.key === editing)?.title}
        </h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Choose how many approvers are required.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          {approvalOptions.map((o) => {
            const on = editing && state.approvals[editing] === o
            return (
              <button
                key={o}
                type="button"
                aria-pressed={!!on}
                onClick={() => {
                  if (editing) update({ approvals: { ...state.approvals, [editing]: o } })
                  setEditing(null)
                }}
                style={{
                  textAlign: 'left',
                  padding: '16px 18px',
                  borderRadius: 16,
                  border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line)'}`,
                  background: on ? 'var(--gold-tint)' : 'var(--surface)',
                  fontSize: 16,
                }}
              >
                {o}
              </button>
            )
          })}
        </div>
      </Sheet>
    </Page>
  )
}
