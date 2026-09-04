import { useState } from 'react'
import { Add01Icon, ArrowRight01Icon, CrownIcon, Delete02Icon, EyeIcon, FileValidationIcon, Shield01Icon, UserIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { Sheet } from '../../components/Sheet'
import { TextField } from '../../components/TextField'
import { SelectField } from '../../components/SelectField'
import { ScreenHeader } from '../../components/ScreenHeader'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { useApp, type TeamMember, type AccessLevel } from '../../store/AppContext'
import { isEmail } from '../../lib/auth'
import a from '../../components/app.module.css'
import s from './brand.module.css'

const roles = ['Campaign lead', 'Reviewer', 'Finance', 'Analyst']
const approvalOptions = ['Require 1 approver', 'Require 2 of 3 to approve', 'Require all to approve']

const accessLevels: { id: AccessLevel; icon: typeof CrownIcon; d: string }[] = [
  { id: 'Owner', icon: CrownIcon, d: 'Full control, including billing, team and account deletion.' },
  { id: 'Admin', icon: Shield01Icon, d: 'Manage campaigns, creators, budgets and the team.' },
  { id: 'Member', icon: UserIcon, d: 'Manage assigned campaigns and review content.' },
  { id: 'Viewer', icon: EyeIcon, d: 'View campaigns and reports; no editing access.' },
]

export default function TeamPermissions() {
  const { state, update } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('team-permissions')
  const [adding, setAdding] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [editingApproval, setEditingApproval] = useState<keyof typeof state.approvals | null>(null)
  const [draft, setDraft] = useState({ name: '', email: '', role: roles[0], access: 'Member' as AccessLevel })
  const [touched, setTouched] = useState(false)

  const addMember = () => {
    setTouched(true)
    if (draft.name.trim().length < 2 || !isEmail(draft.email)) return
    const m: TeamMember = { id: `t${Date.now()}`, role: draft.role, name: draft.name.trim(), email: draft.email.trim(), tag: draft.role.split(' ')[0], tone: 'stone', photo: false, access: draft.access }
    update({ team: [...state.team, m] })
    setAdding(false)
    setDraft({ name: '', email: '', role: roles[0], access: 'Member' })
    setTouched(false)
    toast(`${m.name} invited to the team`)
  }

  const setMemberAccess = (id: string, access: AccessLevel) => {
    update({ team: state.team.map((m) => (m.id === id ? { ...m, access } : m)) })
    setEditingMember((m) => (m && m.id === id ? { ...m, access } : m))
  }

  const removeMember = (m: TeamMember) => {
    update({ team: state.team.filter((x) => x.id !== m.id) })
    setEditingMember(null)
    toast(`${m.name} removed from the team`)
  }

  const approvals: { key: keyof typeof state.approvals; title: string; icon: typeof Shield01Icon }[] = [
    { key: 'content', title: 'Content approvals', icon: Shield01Icon },
    { key: 'budget', title: 'Budget approvals', icon: Wallet02Icon },
    { key: 'contract', title: 'Contract approvals', icon: FileValidationIcon },
    { key: 'payout', title: 'Payout approvals', icon: Add01Icon },
  ]

  return (
    <Page layout="app">
      <ScreenHeader title="Team & Permissions" back="/profile" sub="Manage who has access to this brand account, and exactly what they can do." />

      {loading ? (
        <ScreenSkeleton hero={0} tiles={0} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <div className={a.section}>
        <div className={a.between}>
          <div className={a.title} style={{ fontSize: 22 }}>
            Members · {state.team.length}
          </div>
          <Button size="sm" variant="soft" leading={<Icon icon={Add01Icon} size={18} />} onClick={() => setAdding(true)}>
            Invite
          </Button>
        </div>
        <div className={a.stack} style={{ marginTop: 14 }}>
          {state.team.map((m) => (
            <Card key={m.id} padding="md" radius="xl" onClick={() => setEditingMember(m)}>
              <div className={a.row} style={{ gap: 16 }}>
                <Avatar name={m.name} size={64} tone={m.tone} portrait={m.photo} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>{m.name}</div>
                  <div className={a.metaSm} style={{ marginTop: 2 }}>
                    {m.email}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    {m.role !== m.access && (
                      <Chip size="sm" tone="soft">
                        {m.role}
                      </Chip>
                    )}
                    <Chip size="sm" tone={m.access === 'Owner' ? 'tint' : 'default'}>
                      {m.access}
                    </Chip>
                  </div>
                </div>
                <Icon icon={ArrowRight01Icon} size={20} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 22 }}>
          Approval rules
        </div>
        <p className={a.sub} style={{ marginTop: 4, maxWidth: 480 }}>
          Define how many teammates need to sign off before something goes live.
        </p>
        <div className={s.approvals} style={{ marginTop: 14 }}>
          {approvals.map((ap) => (
            <button key={ap.key} type="button" className={s.approval} onClick={() => setEditingApproval(ap.key)}>
              <IconTile icon={ap.icon} size={52} iconSize={24} />
              <b>{ap.title}</b>
              <span>{state.approvals[ap.key]}</span>
              <span className={s.approvalChev}>
                <Icon icon={ArrowRight01Icon} size={20} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={a.section}>
        <div className={a.title} style={{ fontSize: 22 }}>
          Permission levels
        </div>
        <p className={a.sub} style={{ marginTop: 4, maxWidth: 480 }}>
          What each access level can see and do across this account.
        </p>
        <div className={a.stack} style={{ marginTop: 14 }}>
          {accessLevels.map((lvl) => (
            <div key={lvl.id} className={a.banner}>
              <IconTile icon={lvl.icon} size={48} iconSize={22} />
              <span className={a.bannerBody}>
                <span className={a.bannerTitle}>{lvl.id}</span>
                <span className={a.bannerSub}>{lvl.d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      <Sheet open={adding} onClose={() => setAdding(false)} label="Invite team member">
        <h2 className="display" style={{ fontSize: 34, marginTop: 12 }}>
          Invite team member
        </h2>
        <p className="muted" style={{ marginTop: 6 }}>
          They’ll get an email invite to join this brand account.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
          <TextField label="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Sara Al Ali" error={touched && draft.name.trim().length < 2 ? 'Enter a name.' : undefined} />
          <TextField label="Work email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="name@company.com" error={touched && !isEmail(draft.email) ? 'Enter a valid email.' : undefined} />
          <SelectField label="Role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} options={roles.map((r) => ({ value: r, label: r }))} />
          <SelectField label="Permission level" value={draft.access} onChange={(e) => setDraft({ ...draft, access: e.target.value as AccessLevel })} options={accessLevels.filter((l) => l.id !== 'Owner').map((l) => ({ value: l.id, label: l.id }))} />
          <Button block onClick={addMember} style={{ marginTop: 6 }}>
            Send invite
          </Button>
        </div>
      </Sheet>

      <Sheet open={!!editingMember} onClose={() => setEditingMember(null)} label="Edit team member">
        {editingMember && (
          <>
            <div className={a.row} style={{ gap: 16, marginTop: 8 }}>
              <Avatar name={editingMember.name} size={64} tone={editingMember.tone} portrait={editingMember.photo} />
              <div style={{ minWidth: 0 }}>
                <div className="display" style={{ fontSize: 26 }}>
                  {editingMember.name}
                </div>
                <div className={a.metaSm} style={{ marginTop: 2 }}>
                  {editingMember.email} · {editingMember.role}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <div className={a.label} style={{ marginBottom: 10 }}>
                Permission level
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {accessLevels.map((lvl) => {
                  const on = editingMember.access === lvl.id
                  const disabled = editingMember.access === 'Owner' && lvl.id !== 'Owner'
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      aria-pressed={on}
                      disabled={disabled}
                      onClick={() => setMemberAccess(editingMember.id, lvl.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        textAlign: 'left',
                        padding: '14px 16px',
                        borderRadius: 16,
                        border: `1.5px solid ${on ? 'var(--primary)' : 'var(--line)'}`,
                        background: on ? 'var(--primary-tint)' : 'var(--surface)',
                        opacity: disabled ? 0.5 : 1,
                      }}
                    >
                      <IconTile icon={lvl.icon} size={40} iconSize={18} tone={on ? 'gold' : 'outline'} />
                      <span style={{ minWidth: 0 }}>
                        <b style={{ display: 'block', fontSize: 15, fontWeight: 500 }}>{lvl.id}</b>
                        <span className={a.metaSm}>{lvl.d}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            {editingMember.access !== 'Owner' && (
              <button
                type="button"
                onClick={() => removeMember(editingMember)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', marginTop: 22, padding: '14px 16px', borderRadius: 16, border: '1px solid var(--line)', color: 'var(--danger)', fontSize: 15 }}
              >
                <Icon icon={Delete02Icon} size={20} color="var(--danger)" />
                Remove from team
              </button>
            )}
          </>
        )}
      </Sheet>

      <Sheet open={!!editingApproval} onClose={() => setEditingApproval(null)} label="Approval rule">
        <h2 className="display" style={{ fontSize: 34, marginTop: 12 }}>
          {approvals.find((ap) => ap.key === editingApproval)?.title}
        </h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Choose how many approvers are required.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          {approvalOptions.map((o) => {
            const on = editingApproval && state.approvals[editingApproval] === o
            return (
              <button
                key={o}
                type="button"
                aria-pressed={!!on}
                onClick={() => {
                  if (editingApproval) update({ approvals: { ...state.approvals, [editingApproval]: o } })
                  setEditingApproval(null)
                }}
                style={{
                  textAlign: 'left',
                  padding: '16px 18px',
                  borderRadius: 16,
                  border: `1.5px solid ${on ? 'var(--primary)' : 'var(--line)'}`,
                  background: on ? 'var(--primary-tint)' : 'var(--surface)',
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
