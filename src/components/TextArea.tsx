import { useId, type TextareaHTMLAttributes } from 'react'
import s from './Field.module.css'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  max?: number
  value: string
}

export function TextArea({ label, hint, max, id, value, className, ...rest }: Props) {
  const autoId = useId()
  const areaId = id ?? autoId
  return (
    <div className={[s.field, className ?? ''].join(' ')}>
      {label && (
        <div>
          <label className={s.label} htmlFor={areaId}>
            {label}
          </label>
          {hint && <p className={s.help}>{hint}</p>}
        </div>
      )}
      <div className={[s.control, s.tall].join(' ')}>
        <textarea id={areaId} className={s.input} value={value} maxLength={max} {...rest} />
      </div>
      {max && (
        <span className={s.counter}>
          {value.length}/{max}
        </span>
      )}
    </div>
  )
}
