import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, CreditCardIcon, HeadsetIcon, Invoice01Icon, Logout03Icon, Notification01Icon, PencilEdit02Icon, SecurityCheckIcon, Settings02Icon, UserGroupIcon, UserIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { AvatarStack } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { Verified } from '../../components/Verified'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

export default function Profile() {
  const nav = useNavigate()
  const { state, signOut } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('brand-profile')
  const b = state.brand
  const initials = b.name.split(' ').slice(0, 2).map((w) => w[0]).join('')

  const tiles = [
    { icon: UserGroupIcon, t: 'Team', d: 'Manage members, roles and permissions', foot: <AvatarStack names={state.team.slice(0, 3).map((t) => t.name)} size={40} more={Math.max(0, state.team.length - 3) || undefined} />, to: '/team' },
    { icon: Invoice01Icon, t: 'Billing', d: 'View invoices and subscription details', foot: <Foot l="Next invoice" v="May 12" />, to: '' },
    { icon: Notification01Icon, t: 'Notifications', d: 'Choose what you want to be notified', foot: <Foot l="Email, Push" v="On" />, to: '/notifications' },
    { icon: SecurityCheckIcon, t: 'Privacy', d: 'Manage data, visibility and security', foot: <Foot l="Data controls" v="Manage" />, to: '/privacy' },
    { icon: CreditCardIcon, t: 'Payments', d: 'Manage payout methods and settings', foot: <Foot l="Primary" v="•••• 4242" />, to: '' },
    { icon: HeadsetIcon, t: 'Support', d: 'Get help and view support history', foot: <Foot l="Last message" v="2h ago" />, to: '/support' },
  ]

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(54px, 15vw, 74px)' }}>
            Profile
          </h1>
          <p className={a.sub}>Manage your brand account and settings.</p>
        </div>
        <IconButton label="Settings" size="lg" variant="tint" style={{ width: 72, height: 72 }} onClick={() => nav('/privacy')}>
          <Icon icon={Settings02Icon} size={28} strokeWidth={1.3} />
        </IconButton>
      </div>

      {loading ? (
        <ScreenSkeleton hero={340} tiles={2} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
        <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', opacity: 0.9 }}>
          <Art kind="noir" />
        </span>
        <div style={{ position: 'relative', padding: 26 }}>
          <div className={a.row} style={{ gap: 20 }}>
            <span style={{ width: 110, height: 110, borderRadius: '50%', background: '#f4efe4', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 50, letterSpacing: '-0.06em', flexShrink: 0 }}>
              {initials}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="display" style={{ fontSize: 32, color: '#fff', display: 'flex', alignItems: 'center', gap: 10, lineHeight: 1.05, flexWrap: 'wrap' }}>
                {b.name} <Verified size={24} />
              </div>
              <div style={{ color: 'var(--gold)', fontSize: 18, marginTop: 8 }}>Verified Brand</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginTop: 4 }}>Premium Brand</div>
            </div>
          </div>
          <div className={a.splitStats} style={{ marginTop: 30, maxWidth: 420 }}>
            {[
              ['24', 'Campaigns'],
              ['3.2K', 'Creators'],
              ['8', 'Markets'],
            ].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 500 }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className={a.dividerDark} style={{ margin: '24px 0 22px' }} />
          <div className={a.wrapRow} style={{ justifyContent: 'space-between' }}>
            <button type="button" onClick={() => toast('Public brand profile (demo)', 'info')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 56, padding: '0 18px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 15 }}>
              <Icon icon={UserIcon} size={20} color="var(--gold)" /> View brand public profile <Icon icon={ArrowRight01Icon} size={18} />
            </button>
            <Button size="md" leading={<Icon icon={PencilEdit02Icon} size={18} />} onClick={() => nav('/onboarding/brand/profile')} style={{ color: '#fff' }}>
              Edit profile
            </Button>
          </div>
        </div>
      </Card>

      <div className={a.grid2} style={{ marginTop: 16 }}>
        {tiles.map((t) => (
          <Card key={t.t} padding="md" radius="xl" onClick={() => (t.to ? nav(t.to) : toast(`${t.t} (demo)`, 'info'))}>
            <div style={{ display: 'flex', gap: 12 }}>
              <IconTile icon={t.icon} size={56} iconSize={26} tone="tint" strokeWidth={1.2} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={a.between} style={{ alignItems: 'flex-start' }}>
                  <div className="display" style={{ fontSize: 24, lineHeight: 1.05 }}>
                    {t.t}
                  </div>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </div>
                <p className={a.metaSm} style={{ marginTop: 6, lineHeight: 1.4 }}>
                  {t.d}
                </p>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>{t.foot}</div>
          </Card>
        ))}
      </div>

      <Card padding="none" style={{ marginTop: 16 }} radius="xl">
        <button
          type="button"
          onClick={() => {
            signOut()
            nav('/welcome', { replace: true })
          }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', padding: '20px 24px', fontSize: 20 }}
        >
          <Icon icon={Logout03Icon} size={24} color="var(--danger)" />
          <span style={{ flex: 1 }}>Log out</span>
          <Icon icon={ArrowRight01Icon} size={20} />
        </button>
      </Card>
        </>
      )}
    </Page>
  )
}

function Foot({ l, v }: { l: string; v: string }) {
  return (
    <div className={a.between} style={{ fontSize: 15 }}>
      <span className={a.meta}>{l}</span>
      <span style={{ color: 'var(--gold-deep)' }}>{v}</span>
    </div>
  )
}
