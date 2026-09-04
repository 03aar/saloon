import type { ReactNode } from 'react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'

type Props = { title: string; action?: string; onAction?: () => void; sub?: ReactNode; size?: 'md' | 'lg'; actionTone?: 'gold' | 'ink' }

export function SectionHeader({ title, action, onAction, sub, size = 'md', actionTone = 'gold' }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
      <div>
        <h2 className="display" style={{ fontSize: size === 'lg' ? 30 : 24, lineHeight: 1.1 }}>
          {title}
        </h2>
        {sub && (
          <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
            {sub}
          </p>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: actionTone === 'gold' ? 'var(--gold-deep)' : 'var(--ink)',
            fontSize: 15,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            paddingBottom: 4,
          }}
        >
          {action}
          <Icon icon={ArrowRight01Icon} size={18} />
        </button>
      )}
    </div>
  )
}
