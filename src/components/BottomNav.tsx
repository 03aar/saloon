import { NavLink, useLocation } from 'react-router-dom'
import { Add01Icon, Briefcase01Icon, Home01Icon, Search01Icon, SparklesIcon, Tag01Icon, UserGroupIcon, UserIcon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { Icon } from './Icon'
import s from './BottomNav.module.css'

type Tab = { to: string; label: string; icon: IconSvgElement; match?: string[] }

/**
 * One navigation component for both roles so the pattern stays identical across the product.
 * All five tabs — including the middle "Create"/"Pitch" action — render at the same level,
 * same size, with no floating or elevated treatment.
 */
const brandTabs: Tab[] = [
  { to: '/home', label: 'Home', icon: Home01Icon, match: ['/home', '/messages', '/notifications'] },
  { to: '/discover', label: 'Discover', icon: Search01Icon, match: ['/discover', '/search', '/refine', '/creators', '/shortlist', '/compare'] },
  { to: '/create', label: 'Create', icon: Add01Icon },
  { to: '/campaigns', label: 'Campaigns', icon: Briefcase01Icon, match: ['/campaigns', '/approvals'] },
  { to: '/profile', label: 'Profile', icon: UserIcon, match: ['/profile', '/privacy', '/support'] },
]
const creatorTabs: Tab[] = [
  { to: '/creator/home', label: 'Home', icon: Home01Icon, match: ['/creator/home', '/notifications'] },
  { to: '/creator/deals', label: 'Deals', icon: Tag01Icon, match: ['/creator/deals'] },
  { to: '/creator/pitch', label: 'Pitch', icon: SparklesIcon },
  { to: '/creator/collabs', label: 'Collabs', icon: UserGroupIcon, match: ['/creator/collabs', '/creator/messages', '/creator/contract'] },
  { to: '/creator/settings', label: 'Profile', icon: UserIcon, match: ['/creator/settings', '/creator/analytics', '/creator/earnings', '/creator/portfolio', '/creator/media-kit', '/creator/rate-card', '/creator/subscription', '/privacy', '/support'] },
]

export function BottomNav({ role }: { role: 'brand' | 'creator' }) {
  const { pathname } = useLocation()
  const tabs = role === 'brand' ? brandTabs : creatorTabs
  const isActive = (t: Tab) => (t.match ?? [t.to]).some((m) => pathname.startsWith(m))

  const renderTabs = () =>
    tabs.map((t) => {
      const on = isActive(t)
      return (
        <NavLink key={t.to} to={t.to} className={[s.tab, on ? s.active : ''].join(' ')} aria-current={on ? 'page' : undefined}>
          <span className={s.tabIcon}>
            <Icon icon={t.icon} size={24} strokeWidth={on ? 1.9 : 1.6} />
          </span>
          {t.label}
        </NavLink>
      )
    })

  return (
    <>
      {/* Phone/tablet: bottom pill bar. Hidden at >=1024px in favor of the top nav below. */}
      <div className={s.wrap}>
        <nav className={s.nav} aria-label="Primary">
          <div className={s.shell}>{renderTabs()}</div>
        </nav>
      </div>
      {/* Desktop dashboard: a centered top pill bar instead of a sidebar. Hidden below 1024px. */}
      <div className={s.topWrap}>
        <nav className={s.topNav} aria-label="Primary">
          <div className={s.topShell}>{renderTabs()}</div>
        </nav>
      </div>
    </>
  )
}
