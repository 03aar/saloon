import { NavLink, useLocation } from 'react-router-dom'
import { Add01Icon, Briefcase01Icon, Home01Icon, Search01Icon, SparklesIcon, Tag01Icon, UserGroupIcon, UserIcon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { Icon } from './Icon'
import s from './BottomNav.module.css'

type Tab = { to: string; label: string; icon: IconSvgElement; match?: string[] }

/** One navigation component for both roles so the pattern stays identical across the product. */
const brandTabs: Tab[] = [
  { to: '/home', label: 'Home', icon: Home01Icon, match: ['/home', '/messages', '/notifications'] },
  { to: '/discover', label: 'Discover', icon: Search01Icon, match: ['/discover', '/search', '/refine', '/creators', '/shortlist', '/compare'] },
  { to: '/campaigns', label: 'Campaigns', icon: Briefcase01Icon, match: ['/campaigns', '/approvals'] },
  { to: '/profile', label: 'Profile', icon: UserIcon, match: ['/profile', '/privacy', '/support'] },
]
const creatorTabs: Tab[] = [
  { to: '/creator/home', label: 'Home', icon: Home01Icon, match: ['/creator/home', '/notifications'] },
  { to: '/creator/deals', label: 'Deals', icon: Tag01Icon, match: ['/creator/deals'] },
  { to: '/creator/collabs', label: 'Collabs', icon: UserGroupIcon, match: ['/creator/collabs', '/creator/messages', '/creator/contract'] },
  { to: '/creator/settings', label: 'Profile', icon: UserIcon, match: ['/creator/settings', '/creator/analytics', '/creator/earnings', '/creator/portfolio', '/creator/media-kit', '/creator/rate-card', '/creator/subscription', '/privacy', '/support'] },
]

export function BottomNav({ role }: { role: 'brand' | 'creator' }) {
  const { pathname } = useLocation()
  const tabs = role === 'brand' ? brandTabs : creatorTabs
  const create = role === 'brand' ? { to: '/create', label: 'Create', icon: Add01Icon } : { to: '/creator/pitch', label: 'Pitch', icon: SparklesIcon }
  const isActive = (t: Tab) => (t.match ?? [t.to]).some((m) => pathname.startsWith(m))
  const createActive = pathname.startsWith(create.to)

  const renderTab = (t: Tab) => {
    const on = isActive(t)
    return (
      <NavLink key={t.to} to={t.to} className={[s.tab, on ? s.active : ''].join(' ')} aria-current={on ? 'page' : undefined}>
        <span className={s.tabIcon}>
          <Icon icon={t.icon} size={24} strokeWidth={on ? 1.9 : 1.6} />
        </span>
        {t.label}
      </NavLink>
    )
  }

  return (
    <div className={s.wrap}>
      <nav className={s.nav} aria-label="Primary">
        <div className={s.shell}>
          <span className={s.notch} aria-hidden />
          {tabs.slice(0, 2).map(renderTab)}
          <NavLink to={create.to} className={[s.create, createActive ? s.active : ''].join(' ')} aria-current={createActive ? 'page' : undefined}>
            <span className={s.fab}>
              <Icon icon={create.icon} size={28} strokeWidth={role === 'brand' ? 2 : 1.6} />
            </span>
            {create.label}
          </NavLink>
          {tabs.slice(2).map(renderTab)}
        </div>
      </nav>
    </div>
  )
}
