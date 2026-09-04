import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, Book02Icon, CloudOffIcon, HeadsetIcon, Notification01Icon, SquareLock02Icon, Tick02Icon, WifiOff01Icon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { useOnline } from '../../lib/useLoad'
import a from '../../components/app.module.css'

/** Support hub. Doubles as the offline state: when the browser is offline the saved-draft card and retry flow appear. */
export default function Support() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const online = useOnline()
  const role = state.session?.role ?? 'creator'
  const name = state.session?.name ?? 'Maya Al Mansoori'

  const retry = () => {
    if (navigator.onLine) toast('You’re back online. Everything is synced.')
    else toast('Still offline. We’ll keep trying.', 'info')
  }

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <button type="button" className={a.row} onClick={() => nav(role === 'creator' ? '/creator/settings' : '/profile')}>
          <Avatar name={name} size={72} tone="noir" portrait />
          <span style={{ textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: 17, fontWeight: 500 }}>{role === 'creator' ? 'Creator' : 'Brand'}</span>
            <span className={a.meta}>{name}</span>
          </span>
        </button>
        <IconButton label="Notifications" size="lg" dot style={{ borderRadius: 18 }} onClick={() => nav('/notifications')}>
          <Icon icon={Notification01Icon} size={22} />
        </IconButton>
      </div>
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 30, fontSize: 'clamp(54px, 15vw, 74px)' }}>
        Support
      </h1>
      <p className={a.sub}>We’re here to help, anytime.</p>

      <Card padding="none" style={{ marginTop: 22, position: 'relative', overflow: 'hidden', minHeight: 400 }} radius="xl">
        <span style={{ position: 'absolute', inset: 0 }}>
          <Art kind="silk" />
        </span>
        <span style={{ position: 'absolute', right: 40, top: 150, width: 150, height: 150, borderRadius: '50%', background: 'linear-gradient(160deg,#faf3e2,#e6d7b6)', boxShadow: '0 20px 40px rgba(120,90,30,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
          <Icon icon={Tick02Icon} size={80} strokeWidth={1.6} />
        </span>
        <div style={{ position: 'relative', padding: 26 }}>
          <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden>
            <defs>
              <path id="ring" d="M75 20a55 55 0 1 1-.1 0" />
            </defs>
            <circle cx="75" cy="75" r="72" fill="none" stroke="var(--gold)" strokeWidth="1" />
            <text fontSize="11" letterSpacing="3" fill="var(--ink)" fontFamily="var(--font-body)">
              <textPath href="#ring" startOffset="2%">BLOOP SUPPORT • CREATORS FIRST •</textPath>
            </text>
            <text x="75" y="95" textAnchor="middle" fontFamily="var(--font-display)" fontSize="64" fill="var(--gold)">
              S
            </text>
          </svg>
          <div className="display" style={{ fontSize: 40, marginTop: 20 }}>
            {online ? 'We’re here for you.' : 'We saved your pitch.'}
          </div>
          <p className={a.meta} style={{ fontSize: 18, marginTop: 12, maxWidth: 320, lineHeight: 1.45 }}>
            {online ? 'Reach our team any time. Most questions are answered within a few hours.' : 'Don’t worry — your pitch is safe. We’ll send it once you’re back online.'}
          </p>
          <div style={{ marginTop: 22 }}>
            <Chip leading={<span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon icon={Tick02Icon} size={12} strokeWidth={2.6} /></span>}>
              {online ? 'All systems normal' : 'Saved just now'}
            </Chip>
          </div>
        </div>
      </Card>

      <div className={a.grid3} style={{ marginTop: 16 }}>
        {[
          { icon: HeadsetIcon, t: 'Contact support', d: 'Chat with our team or send us a message.', fn: () => toast('Support chat opens here (demo)', 'info') },
          { icon: Book02Icon, t: 'Help center', d: 'Find answers to common questions.', fn: () => toast('Help center (demo)', 'info') },
          { icon: CloudOffIcon, t: 'Retry connection', d: 'Check your connection and try again.', fn: retry },
        ].map((k) => (
          <Card key={k.t} padding="md" radius="xl" onClick={k.fn} style={{ display: 'flex', flexDirection: 'column', minHeight: 250 }}>
            <IconTile icon={k.icon} size={64} iconSize={28} tone="surface" />
            <div className="display" style={{ fontSize: 24, marginTop: 24, lineHeight: 1.1 }}>
              {k.t}
            </div>
            <p className={a.meta} style={{ marginTop: 8, fontSize: 14, lineHeight: 1.4, flex: 1 }}>
              {k.d}
            </p>
            <span style={{ alignSelf: 'flex-end', width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon={ArrowRight02Icon} size={16} />
            </span>
          </Card>
        ))}
      </div>

      {!online && (
        <Card padding="md" style={{ marginTop: 16, position: 'relative', overflow: 'hidden' }} radius="xl">
          <div className={a.row} style={{ gap: 18 }}>
            <IconTile icon={WifiOff01Icon} size={60} iconSize={28} tone="tint" />
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>You’re offline</div>
              <p className={a.meta} style={{ marginTop: 4, maxWidth: 260, lineHeight: 1.4 }}>
                Some features are limited. We’ll sync everything when you’re back online.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Footer app>
        <Button block onClick={retry}>
          {online ? 'Contact support' : 'Try again'}
        </Button>
        <span className={a.footnote} style={{ flexDirection: 'column', gap: 2 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon icon={SquareLock02Icon} size={13} /> Your data is secure and encrypted.
          </span>
          <span>We never share your information.</span>
        </span>
      </Footer>
    </Page>
  )
}
