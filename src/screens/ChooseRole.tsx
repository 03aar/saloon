import { useNavigate } from 'react-router-dom'
import {
  Agreement02Icon,
  ArrowRight02Icon,
  Briefcase01Icon,
  Megaphone01Icon,
  Notebook02Icon,
  Tag01Icon,
  Tick02Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons'
import { Page, Footer } from '../components/Page'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { useApp, type Role } from '../store/AppContext'
import s from './ChooseRole.module.css'

const roles: { id: Role; title: string; desc: string; icon: typeof UserIcon; features: { icon: typeof UserIcon; title: string; desc: string }[] }[] = [
  {
    id: 'brand',
    title: 'Brand',
    desc: 'Launch, collaborate, and grow with the right creators.',
    icon: Briefcase01Icon,
    features: [
      { icon: Megaphone01Icon, title: 'Campaigns', desc: 'Build and manage creator campaigns' },
      { icon: UserGroupIcon, title: 'Audience', desc: 'Discover creators that fit your brand' },
      { icon: Tag01Icon, title: 'Offers', desc: 'Send offers and track performance' },
    ],
  },
  {
    id: 'creator',
    title: 'Creator',
    desc: 'Showcase your work and partner with brands you love.',
    icon: UserIcon,
    features: [
      { icon: Notebook02Icon, title: 'Portfolio', desc: 'Showcase your content and stats' },
      { icon: Agreement02Icon, title: 'Deals', desc: 'Receive offers and manage collaborations' },
      { icon: Wallet02Icon, title: 'Payouts', desc: 'Track earnings and get paid securely' },
    ],
  },
]

export default function ChooseRole() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const selected = state.pendingRole

  return (
    <Page>
      <header className={s.hero}>
        <h1 className={['display', s.h1].join(' ')}>Choose your role</h1>
        <p className={s.sub}>Bloop tailors your experience to help you connect and grow.</p>
        <svg className={s.arch} viewBox="0 0 210 250" fill="none" aria-hidden>
          <defs>
            <linearGradient id="archA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbf6ea" />
              <stop offset="1" stopColor="#ecdfc4" />
            </linearGradient>
            <radialGradient id="ball" cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#f3dc9d" />
              <stop offset="1" stopColor="#a67c1f" />
            </radialGradient>
          </defs>
          <path d="M60 250V90a70 70 0 0 1 140 0v160Z" fill="url(#archA)" />
          <path d="M92 250V118a38 38 0 0 1 76 0v132Z" fill="#f6efe0" />
          <path d="M150 250V178a24 24 0 0 1 48 0v72Z" fill="#e3d3b2" opacity=".7" />
          <rect x="20" y="214" width="190" height="36" rx="6" fill="#f4ecdc" />
          <rect x="0" y="232" width="210" height="18" rx="4" fill="#eee4d0" />
          <circle cx="130" cy="196" r="20" fill="url(#ball)" />
        </svg>
      </header>

      <div className={s.cards} role="radiogroup" aria-label="Account type">
        {roles.map((r) => {
          const on = selected === r.id
          return (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={on}
              className={[s.card, on ? s.selected : ''].join(' ')}
              onClick={() => update({ pendingRole: r.id })}
            >
              <span className={s.radio} aria-hidden>
                {on && <Icon icon={Tick02Icon} size={18} strokeWidth={2.6} />}
              </span>
              <div className={s.head}>
                <span className={s.roleIcon}>
                  <Icon icon={r.icon} size={40} strokeWidth={1.3} />
                </span>
                <div>
                  <div className={['display', s.title].join(' ')}>{r.title}</div>
                  <p className={s.desc}>{r.desc}</p>
                </div>
              </div>
              <div className={s.divider} />
              <div className={s.features}>
                {r.features.map((f) => (
                  <div key={f.title} className={s.feature}>
                    <span className={s.fIcon}>
                      <Icon icon={f.icon} size={24} strokeWidth={1.4} />
                    </span>
                    <div className={s.fTitle}>{f.title}</div>
                    <div className={s.fDesc}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <Footer className={s.footerWrap}>
        <Button block trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => nav(selected === 'brand' ? '/signup/brand' : '/signup/creator')}>
          Continue
        </Button>
      </Footer>
    </Page>
  )
}
