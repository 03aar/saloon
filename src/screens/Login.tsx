import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, Mail01Icon, SquareLock02Icon, UserStar01Icon } from '@hugeicons/core-free-icons'
import { Page } from '../components/Page'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { Icon } from '../components/Icon'
import { Wordmark } from '../components/Wordmark'
import { BrandMark } from '../components/BrandMark'
import { AuthPromo } from '../components/AuthPromo'
import { useApp } from '../store/AppContext'
import { useToast } from '../components/Toast'
import { isEmail, nameFromEmail } from '../lib/auth'
import s from './Login.module.css'

export default function Login() {
  const nav = useNavigate()
  const { state, signIn, update } = useApp()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const valid = isEmail(email) && password.length > 0

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setLoading(true)
    window.setTimeout(() => {
      // Demo auth: any credentials work. Role is inferred from the last chosen role.
      const role = state.pendingRole
      const brandName = state.brand.name || 'Noura Beauty Co.'
      signIn({ role, email, name: role === 'brand' ? brandName : nameFromEmail(email), company: role === 'brand' ? brandName : undefined })
      update({ onboardingComplete: true })
      nav(role === 'brand' ? '/home' : '/creator/home', { replace: true })
    }, 700)
  }

  return (
    <Page
      layout="split"
      promo={
        <AuthPromo
          art="glow"
          eyebrow="Creator partnerships, curated"
          title="Every collaboration, protected end to end."
          bullets={['Escrow-protected payments', 'In-app content approvals', 'Real brands, verified creators']}
        />
      }
    >
      <div className={s.top} style={{ alignItems: 'center', gap: 12 }}>
        <BrandMark size={52} color="var(--primary)" />
        <Wordmark size={72} spark />
      </div>
      <header className={s.hero}>
        <h1 className={['display', s.h1].join(' ')}>
          Welcome back<span className="gold-dot">.</span>
        </h1>
        <p className={s.sub}>Log in to connect with brands, explore opportunities, and grow your influence.</p>
      </header>

      <form className={s.form} onSubmit={submit} noValidate>
        <TextField
          aria-label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email"
          icon={<Icon icon={Mail01Icon} size={24} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={touched && !isEmail(email) ? 'Enter a valid email.' : undefined}
        />
        <TextField
          aria-label="Password"
          revealable
          autoComplete="current-password"
          placeholder="Password"
          icon={<Icon icon={SquareLock02Icon} size={24} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={touched && password.length === 0 ? 'Enter your password.' : undefined}
        />
        <button type="button" className={s.forgot} onClick={() => toast('Password reset link sent (demo).', 'info')}>
          Forgot password?
        </button>
        <Button block type="submit" loading={loading} style={{ marginTop: 10 }}>
          Log in
        </Button>
      </form>

      <div className={s.or}>or</div>

      <button type="button" className={s.switch} onClick={() => nav('/role')}>
        <span className={s.switchIcon}>
          <Icon icon={UserStar01Icon} size={26} strokeWidth={1.4} />
        </span>
        <span style={{ flex: 1 }}>
          <b>Brand or creator account</b>
          <span>Choose your account type</span>
        </span>
        <Icon icon={ArrowRight01Icon} size={22} />
      </button>

      <p className={s.demo}>Demo mode · any email and password will sign you in as a {state.pendingRole}.</p>
    </Page>
  )
}
