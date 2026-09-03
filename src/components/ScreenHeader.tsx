import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { IconButton } from './IconButton'
import { Icon } from './Icon'
import { TopBar } from './Page'
import a from './app.module.css'

type Props = {
  title: ReactNode
  sub?: ReactNode
  eyebrow?: ReactNode
  /** Show a round back button; string = explicit route, true = history back. */
  back?: boolean | string
  /** Right-side controls on the top bar row. */
  actions?: ReactNode
  /** Controls placed to the right of the title itself (e.g. score ring). */
  aside?: ReactNode
  /** Centre content of the top bar (e.g. a small title). */
  center?: ReactNode
  size?: 'lg' | 'md'
  className?: string
}

export function ScreenHeader({ title, sub, eyebrow, back, actions, aside, center, size = 'lg', className }: Props) {
  const nav = useNavigate()
  const showTopBar = back || actions || center
  return (
    <header className={className}>
      {showTopBar && (
        <TopBar
          left={
            back ? (
              <IconButton label="Back" onClick={() => (typeof back === 'string' ? nav(back) : nav(-1))}>
                <Icon icon={ArrowLeft02Icon} size={22} />
              </IconButton>
            ) : null
          }
          center={center}
          right={actions}
        />
      )}
      <div className={a.header} style={{ marginTop: showTopBar ? 18 : 22 }}>
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div style={{ marginBottom: 12 }}>{eyebrow}</div>}
          <h1 className={['display', size === 'lg' ? a.h1 : a.h1sm].join(' ')}>{title}</h1>
          {sub && <p className={a.sub}>{sub}</p>}
        </div>
        {aside}
      </div>
    </header>
  )
}
