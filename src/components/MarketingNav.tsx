import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { Button } from './Button'
import { Icon } from './Icon'
import { Wordmark } from './Wordmark'
import s from './MarketingNav.module.css'

const links = [
  { to: '/for-brands', label: 'For brands' },
  { to: '/for-creators', label: 'For creators' },
  { to: '/pulse', label: 'Bloop Pulse' },
  { to: '/about', label: 'About' },
]

/** Floating centered pill nav shared by the landing page and every connected marketing page. */
export function MarketingNav() {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <div className={s.wrap}>
      <header className={s.pill}>
        <NavLink to="/" className={s.brand} aria-label="Bloop home">
          <Wordmark size={20} />
        </NavLink>
        <nav className={s.links} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => [s.link, isActive ? s.linkActive : ''].join(' ')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className={s.actions}>
          <button type="button" className={s.login} onClick={() => nav('/login')}>
            Log in
          </button>
          <Button size="sm" onClick={() => nav('/role')}>
            Get started
          </Button>
        </div>
        <button type="button" className={s.menuBtn} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <Icon icon={Menu01Icon} size={22} />
        </button>
      </header>
      {open && (
        <div className={s.sheet}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <button type="button" onClick={() => nav('/login')}>
            Log in
          </button>
          <Button
            block
            onClick={() => {
              setOpen(false)
              nav('/role')
            }}
          >
            Get started
          </Button>
        </div>
      )}
    </div>
  )
}
