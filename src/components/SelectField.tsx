import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import s from './Field.module.css'

type Option = { value: string; label: string }

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  label?: string
  icon?: ReactNode
  options: Option[]
  compact?: boolean
}

export function SelectField({ label, icon, options, compact, id, className, ...rest }: Props) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <div className={[s.field, className ?? ''].join(' ')}>
      {label && (
        <label className={s.label} htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className={[s.control, compact ? s.compact : ''].join(' ')}>
        {icon && <span className={s.icon}>{icon}</span>}
        <select id={selectId} className={[s.input, s.select].join(' ')} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className={s.chevron}>
          <Icon icon={ArrowDown01Icon} size={20} />
        </span>
      </div>
    </div>
  )
}
