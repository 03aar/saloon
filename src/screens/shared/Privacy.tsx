import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowRight02Icon, Building03Icon, CreditCardIcon, Shield01Icon, SquareLock02Icon, Tick02Icon, UserIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { IconTile } from '../../components/IconTile'
import { ScreenHeader } from '../../components/ScreenHeader'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const rows = [
  { icon: UserIcon, t: 'Profile visibility', d: 'Choose who can see your profile, content, and performance.' },
  { icon: SquareLock02Icon, t: 'Login', d: 'Manage your password, devices, and two-step verification.' },
  { icon: CreditCardIcon, t: 'Payout data', d: 'Secure your payout details and payment methods.' },
  { icon: Building03Icon, t: 'Brand access', d: 'Manage which brands can view or contact you.' },
]

export default function Privacy() {
  const nav = useNavigate()
  const { toast } = useToast()
  return (
    <Page layout="app">
      <ScreenHeader
        title={
          <>
            Privacy &amp;
            <br />
            Security
          </>
        }
        sub="Control your privacy, data, and account security with confidence."
        back
        actions={
          <IconButton label="Security status" onClick={() => toast('All security checks passed', 'info')}>
            <Icon icon={Shield01Icon} size={20} />
          </IconButton>
        }
      />

      <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
        <svg viewBox="0 0 200 200" aria-hidden style={{ position: 'absolute', right: -40, top: -20, width: 260, height: 260, opacity: 0.5 }}>
          {[40, 70, 100, 130].map((r) => (
            <circle key={r} cx="130" cy="100" r={r} fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="6" />
          ))}
        </svg>
        <div style={{ position: 'relative', padding: 26 }}>
          <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>
            <Icon icon={SquareLock02Icon} size={52} strokeWidth={1.2} />
          </span>
          <div className="display" style={{ fontSize: 40, color: '#fff', marginTop: 22, lineHeight: 1.05 }}>
            Your privacy.
            <br />
            Your power.
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 14, fontSize: 17, maxWidth: 300 }}>We protect your data and put you in control.</p>
          <button type="button" onClick={() => toast('Opening privacy policy (demo)', 'info')} style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 10, height: 56, padding: '0 22px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--gold)', fontSize: 17 }}>
            View privacy policy <Icon icon={ArrowRight02Icon} size={18} />
          </button>
        </div>
      </Card>

      <div className={a.stack} style={{ marginTop: 16 }}>
        {rows.map((r) => (
          <Card key={r.t} padding="md" radius="xl" onClick={() => toast(`${r.t} settings (demo)`, 'info')}>
            <div className={a.row} style={{ gap: 18 }}>
              <IconTile icon={r.icon} size={90} iconSize={40} tone="surface" strokeWidth={1.2} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 22, fontWeight: 500 }}>{r.t}</div>
                <p className={a.meta} style={{ marginTop: 4, fontSize: 16, lineHeight: 1.4 }}>
                  {r.d}
                </p>
              </div>
              <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon icon={Tick02Icon} size={20} strokeWidth={2.4} />
              </span>
              <Icon icon={ArrowRight01Icon} size={20} />
            </div>
          </Card>
        ))}
      </div>

      <button type="button" className={[a.banner, a.bannerTint].join(' ')} style={{ width: '100%', textAlign: 'left', marginTop: 16 }} onClick={() => nav('/support')}>
        <Icon icon={Shield01Icon} size={44} strokeWidth={1.1} color="var(--gold)" />
        <span className={a.bannerBody}>
          <span className={a.bannerTitle} style={{ fontSize: 17 }}>
            Your data is private and secure
          </span>
          <span className={a.bannerSub} style={{ display: 'block' }}>
            We use industry-standard encryption and never share your data without permission.
          </span>
        </span>
        <Icon icon={ArrowRight01Icon} size={20} />
      </button>
    </Page>
  )
}
