import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight02Icon,
  Briefcase01Icon,
  Building03Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  SecurityCheckIcon,
  SquareLock02Icon,
} from '@hugeicons/core-free-icons'
import { Page } from '../components/Page'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { Icon } from '../components/Icon'
import { useApp } from '../store/AppContext'
import { passwordRules, isEmail } from '../lib/auth'
import s from './Signup.module.css'

export default function BrandSignup() {
  const nav = useNavigate()
  const { signIn, update } = useApp()
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const rules = passwordRules(password)
  const valid = isEmail(email) && company.trim().length > 1 && rules.every((r) => r.ok)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setLoading(true)
    window.setTimeout(() => {
      signIn({ role: 'brand', email, name: company.trim(), company: company.trim() })
      update({ onboardingComplete: false })
      nav('/onboarding/brand/profile')
    }, 700)
  }

  const sso = () => {
    setLoading(true)
    window.setTimeout(() => {
      signIn({ role: 'brand', email: 'you@company.com', name: 'Noura Beauty Co.', company: 'Noura Beauty Co.' })
      update({ onboardingComplete: false })
      nav('/onboarding/brand/profile')
    }, 700)
  }

  return (
    <Page>
      <header className={s.hero}>
        <svg className={s.coin} viewBox="0 0 220 230" fill="none" aria-hidden>
          <defs>
            <linearGradient id="coinG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1dda2" />
              <stop offset="0.55" stopColor="#f8bc58" />
              <stop offset="1" stopColor="#8f6a17" />
            </linearGradient>
            <linearGradient id="nook" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fefaf2" />
              <stop offset="1" stopColor="#e7dcc6" />
            </linearGradient>
          </defs>
          <path d="M220 0v230h-60c-30-12-60-30-70-70S50 90 40 60 20 20 60 0Z" fill="url(#nook)" />
          <path d="M220 40v160h-40c-26-8-48-24-56-56s-16-56-24-78 0-26 40-26Z" fill="#f4ede0" />
          <circle cx="132" cy="140" r="52" fill="url(#coinG)" />
          <circle cx="132" cy="140" r="44" fill="none" stroke="#fff" strokeOpacity=".35" />
          <text x="132" y="160" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="56" fill="#7a5a12" fillOpacity=".8">
            S
          </text>
        </svg>
        <h1 className={['display', s.h1].join(' ')}>
          Create
          <br />
          brand account
        </h1>
        <p className={s.sub}>Join Salon to discover creators, launch campaigns, and grow your brand.</p>
      </header>

      <form className={s.form} onSubmit={submit} noValidate>
        <TextField
          label="Work email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@company.com"
          icon={<Icon icon={Mail01Icon} size={24} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={touched && !isEmail(email) ? 'Enter a valid work email.' : undefined}
        />
        <TextField
          label="Company"
          autoComplete="organization"
          placeholder="Your company name"
          icon={<Icon icon={Briefcase01Icon} size={24} />}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          error={touched && company.trim().length <= 1 ? 'Enter your company name.' : undefined}
        />
        <TextField
          label="Password"
          revealable
          autoComplete="new-password"
          placeholder="Create a strong password"
          icon={<Icon icon={SquareLock02Icon} size={24} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul className={s.rules} aria-label="Password requirements">
          {rules.map((r) => (
            <li key={r.label} className={[s.rule, r.ok ? s.ok : ''].join(' ')}>
              <Icon icon={CheckmarkCircle02Icon} size={20} />
              {r.label}
            </li>
          ))}
        </ul>

        <div className={s.trust}>
          <span className={s.shield}>
            <Icon icon={SecurityCheckIcon} size={40} strokeWidth={1.4} />
          </span>
          <div>
            <b>Verified companies only</b>
            <p>We keep Salon trusted, safe, and built for serious partnerships.</p>
          </div>
        </div>

        <div className={s.actions}>
          <Button block type="submit" loading={loading} trailing={<Icon icon={ArrowRight02Icon} size={22} />} spread>
            Create account
          </Button>
          <Button block type="button" variant="soft" leading={<Icon icon={Building03Icon} size={24} />} onClick={sso} disabled={loading}>
            Continue with work SSO
          </Button>
        </div>
      </form>
    </Page>
  )
}
