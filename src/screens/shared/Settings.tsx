import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, CreditCardIcon, CrownIcon, File01Icon, HeadsetIcon, Invoice01Icon, Location01Icon, Logout03Icon, Notification01Icon, SquareLock02Icon, UserIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

/** Creator profile hub (the Profile tab) — brand users get the dedicated brand Profile screen. */
export default function Settings() {
  const nav = useNavigate()
  const { state, signOut } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('creator-settings')
  const name = state.session?.name ?? 'Mira Alia'
  const handle = '@' + name.toLowerCase().replace(/\s+/g, '')

  const tiles = [
    { icon: UserIcon, t: 'Account', d: 'Edit profile, bio, handle and links.', to: '/creator/portfolio' },
    { icon: Invoice01Icon, t: 'Rate card', d: 'Manage rates, packages and add-ons.', to: '/creator/rate-card' },
    { icon: Notification01Icon, t: 'Notifications', d: 'Control alerts and in-app updates.', to: '/notifications' },
    { icon: SquareLock02Icon, t: 'Privacy', d: 'Manage visibility and data settings.', to: '/privacy' },
    { icon: CreditCardIcon, t: 'Payments', d: 'Payouts, methods and transaction history.', to: '/creator/earnings' },
    { icon: HeadsetIcon, t: 'Support', d: 'Help center and contact support.', to: '/support' },
  ]

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(50px, 14vw, 68px)' }}>
            Settings
          </h1>
          <p className={a.sub}>Manage your account and preferences.</p>
        </div>
        <IconButton label="Notifications" size="lg" dot onClick={() => nav('/notifications')}>
          <Icon icon={Notification01Icon} size={22} />
        </IconButton>
      </div>

      {loading ? (
        <ScreenSkeleton hero={300} tiles={2} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
      <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl">
        <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', maskImage: 'linear-gradient(90deg, transparent, #000 50%)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 50%)' }}>
          <Art kind="silk" />
        </span>
        <div style={{ position: 'relative', padding: 22 }}>
          <div className={a.row} style={{ gap: 20 }}>
            <span style={{ position: 'relative' }}>
              <Avatar name={name} size={120} tone="noir" portrait />
              <span style={{ position: 'absolute', right: 0, bottom: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', border: '3px solid #fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Verified size={22} />
              </span>
            </span>
            <div>
              <div className="display" style={{ fontSize: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
                {name} <Verified size={26} />
              </div>
              <div className={a.meta} style={{ fontSize: 16, marginTop: 2 }}>
                {handle}
              </div>
              <div className={a.meta} style={{ fontSize: 16, marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon icon={Location01Icon} size={16} /> Dubai, UAE
              </div>
            </div>
          </div>
          <div className={a.divider} style={{ margin: '20px 0 18px', maxWidth: 300 }} />
          <div className={a.wrapRow} style={{ justifyContent: 'space-between' }}>
            <div className={a.splitStats} style={{ gap: 0 }}>
              {[
                ['127K', 'Audience'],
                ['4.8%', 'Eng. rate'],
                ['96', 'Collaborations'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="display" style={{ fontSize: 24 }}>
                    {v}
                  </div>
                  <div className={a.metaSm} style={{ whiteSpace: 'nowrap' }}>{l}</div>
                </div>
              ))}
            </div>
            <Button size="md" variant="soft" trailing={<Icon icon={ArrowRight01Icon} size={16} />} onClick={() => nav('/creator/analytics')} style={{ color: 'var(--gold-deep)' }}>
              View profile
            </Button>
          </div>
        </div>
      </Card>

      <div className={a.grid2} style={{ marginTop: 16 }}>
        {tiles.map((t) => (
          <Card key={t.t} padding="md" radius="xl" onClick={() => nav(t.to)}>
            <IconTile icon={t.icon} size={64} iconSize={28} tone="outline" />
            <div className="display" style={{ fontSize: 30, marginTop: 24 }}>
              {t.t}
            </div>
            <div className={a.between} style={{ alignItems: 'flex-end' }}>
              <p className={a.meta} style={{ marginTop: 6, fontSize: 15, lineHeight: 1.4, maxWidth: 170 }}>
                {t.d}
              </p>
              <Icon icon={ArrowRight01Icon} size={20} />
            </div>
          </Card>
        ))}
      </div>

      <Card padding="none" style={{ marginTop: 16 }} radius="xl">
        {[
          { icon: CrownIcon, l: 'Salon Pro', to: '/creator/subscription' },
          { icon: File01Icon, l: 'Terms of Service', to: '' },
          { icon: Logout03Icon, l: 'Sign out', to: 'signout' },
        ].map((r, i) => (
          <button
            key={r.l}
            type="button"
            onClick={() => {
              if (r.to === 'signout') {
                signOut()
                nav('/welcome', { replace: true })
              } else if (r.to) nav(r.to)
              else toast('Terms of Service (demo)', 'info')
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', padding: '18px 20px', borderTop: i ? '1px solid var(--line)' : 'none', fontFamily: 'var(--font-display)', fontSize: 24 }}
          >
            <Icon icon={r.icon} size={24} />
            <span style={{ flex: 1 }}>{r.l}</span>
            <Icon icon={ArrowRight01Icon} size={20} />
          </button>
        ))}
      </Card>
        </>
      )}
    </Page>
  )
}
