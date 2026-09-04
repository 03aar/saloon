import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Location01Icon, Mail01Icon, ShoppingBag01Icon, SquareLock02Icon, UserIcon, Video01Icon } from '@hugeicons/core-free-icons'
import { Page } from '../components/Page'
import { Button } from '../components/Button'
import { TextField } from '../components/TextField'
import { Icon } from '../components/Icon'
import { Wordmark } from '../components/Wordmark'
import { Avatar } from '../components/Avatar'
import { Chip } from '../components/Chip'
import { Verified } from '../components/Verified'
import { AuthPromo } from '../components/AuthPromo'
import { useApp } from '../store/AppContext'
import { useToast } from '../components/Toast'
import { isEmail } from '../lib/auth'
import { apiEnabled, apiSignup, ApiError, setToken } from '../lib/api'
import s from './Signup.module.css'

export default function CreatorSignup() {
  const nav = useNavigate()
  const { signIn } = useApp()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const valid = isEmail(email) && name.trim().length > 1 && password.length >= 8
  const previewName = name.trim() || 'Mira Studio'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setLoading(true)

    if (apiEnabled) {
      apiSignup({ role: 'creator', name: name.trim(), email, password })
        .then(({ token, user }) => {
          setToken(token)
          signIn({ role: 'creator', email: user.email, name: user.name })
          nav('/onboarding/creator/profile')
        })
        .catch((err: unknown) => {
          toast(err instanceof ApiError ? err.message : 'Could not create your account. Please try again.', 'info')
          setLoading(false)
        })
      return
    }

    window.setTimeout(() => {
      signIn({ role: 'creator', email, name: name.trim() })
      nav('/onboarding/creator/profile')
    }, 700)
  }

  return (
    <Page
      layout="split"
      promo={
        <AuthPromo
          art="noir"
          eyebrow="For creators"
          title="Showcase your work. Partner with brands you love."
          bullets={['Pitch deals and set your own rate', 'Clear approval flow, no back-and-forth', 'Secure, on-time payouts']}
        />
      }
    >
      <header className={s.hero}>
        <span className={s.silkCorner} aria-hidden />
        <Wordmark variant="spaced" size={22} />
        <h1 className={['display', s.h1].join(' ')} style={{ marginTop: 14 }}>
          Create
          <br />
          creator account
        </h1>
        <p className={s.sub} style={{ maxWidth: '85%' }}>
          Join Bloop and connect with brands across GCC and global markets.
        </p>
      </header>

      <section className={s.preview} aria-label="Profile preview">
        <div className={s.previewHead}>
          <Avatar name={previewName} size={92} tone="cream" ring="surface" />
          <div>
            <div className={s.previewName}>
              {previewName}
              <Verified size={20} />
            </div>
            <div className={s.previewRole}>Content creator</div>
          </div>
        </div>
        <div className={s.previewChips}>
          <Chip leading={<Icon icon={ShoppingBag01Icon} size={18} />}>Beauty</Chip>
          <Chip leading={<Icon icon={Location01Icon} size={18} />}>Riyadh</Chip>
          <Chip leading={<Icon icon={Video01Icon} size={18} />}>Video</Chip>
        </div>
      </section>

      <form className={s.form} onSubmit={submit} noValidate>
        <TextField
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Icon icon={Mail01Icon} size={24} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={touched && !isEmail(email) ? 'Enter a valid email.' : undefined}
        />
        <TextField
          label="Creator name"
          autoComplete="nickname"
          placeholder="Your creator name"
          icon={<Icon icon={UserIcon} size={24} />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={touched && name.trim().length <= 1 ? 'Enter your creator name.' : undefined}
        />
        <TextField
          label="Password"
          revealable
          autoComplete="new-password"
          placeholder="Create a strong password"
          icon={<Icon icon={SquareLock02Icon} size={24} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          help="Use at least 8 characters with a mix of letters, numbers and symbols."
          error={touched && password.length < 8 ? 'Password must be at least 8 characters.' : undefined}
        />
        <div className={s.actions}>
          <Button block type="submit" loading={loading}>
            Create account
          </Button>
          <p className={s.legal}>
            By creating an account, you agree to Bloop’s
            <br />
            <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
          </p>
        </div>
      </form>
    </Page>
  )
}
