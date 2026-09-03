import type { CSSProperties, ReactNode } from 'react'
import { Alert02Icon, Search01Icon, WifiDisconnected01Icon } from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'
import { Icon } from './Icon'
import { Button } from './Button'
import s from './Skeleton.module.css'

export function Sk({ w = '100%', h = 14, r, circle, style }: { w?: number | string; h?: number | string; r?: number; circle?: boolean; style?: CSSProperties }) {
  return <span className={[s.sk, circle ? s.circle : ''].join(' ')} style={{ display: 'block', width: w, height: h, borderRadius: r, ...style }} aria-hidden />
}

export function SkCard({ lines = 3, avatar, height }: { lines?: number; avatar?: boolean; height?: number }) {
  return (
    <div className={s.card} style={{ minHeight: height }} aria-hidden>
      {avatar && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Sk w={48} h={48} circle />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Sk w="55%" h={14} />
            <Sk w="35%" h={12} />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <Sk key={i} w={`${92 - i * 18}%`} h={12} />
      ))}
    </div>
  )
}

/** Generic page skeleton: header + hero + tiles. Used by every app screen while data loads. */
export function ScreenSkeleton({ hero = 200, tiles = 2, rows = 3 }: { hero?: number; tiles?: number; rows?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 22 }} aria-busy="true" aria-label="Loading">
      <Sk w="62%" h={44} r={10} />
      <Sk w="80%" h={14} />
      <Sk h={hero} r={24} style={{ marginTop: 10 }} />
      {tiles > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tiles}, minmax(0,1fr))`, gap: 14 }}>
          {Array.from({ length: tiles }).map((_, i) => (
            <SkCard key={i} lines={2} height={120} />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, i) => (
        <SkCard key={i} lines={1} avatar />
      ))}
    </div>
  )
}

type StateProps = { title: string; sub?: string; icon?: IconSvgElement; action?: string; onAction?: () => void; secondary?: ReactNode }

export function ErrorState({ title = 'Something went wrong', sub = 'We couldn’t load this right now. Please try again.', icon = Alert02Icon, action = 'Try again', onAction, secondary }: Partial<StateProps>) {
  return (
    <div className={s.state} role="alert">
      <span className={s.stateIcon}>
        <Icon icon={icon} size={30} />
      </span>
      <div className={s.stateTitle}>{title}</div>
      <p className={s.stateSub}>{sub}</p>
      {onAction && (
        <Button size="md" variant="outline" onClick={onAction} style={{ marginTop: 10 }}>
          {action}
        </Button>
      )}
      {secondary}
    </div>
  )
}

export function EmptyState({ title, sub, icon = Search01Icon, action, onAction }: StateProps) {
  return (
    <div className={s.state}>
      <span className={s.stateIcon}>
        <Icon icon={icon} size={30} />
      </span>
      <div className={s.stateTitle}>{title}</div>
      {sub && <p className={s.stateSub}>{sub}</p>}
      {action && onAction && (
        <Button size="md" variant="tint" onClick={onAction} style={{ marginTop: 10 }}>
          {action}
        </Button>
      )}
    </div>
  )
}

export function OfflineState({ onRetry }: { onRetry: () => void }) {
  return <ErrorState icon={WifiDisconnected01Icon} title="You’re offline" sub="Check your connection and try again. Anything you were working on is saved." action="Retry connection" onAction={onRetry} />
}
