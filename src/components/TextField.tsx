import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import s from './Field.module.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string
  icon?: ReactNode
  trailing?: ReactNode
  help?: ReactNode
  error?: string
  /** Adds a show/hide toggle for password inputs. */
  revealable?: boolean
  compact?: boolean
}

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, icon, trailing, help, error, revealable, compact, type = 'text', id, className, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [show, setShow] = useState(false)
  const inputType = revealable ? (show ? 'text' : 'password') : type

  return (
    <div className={[s.field, className ?? ''].join(' ')}>
      {label && (
        <label className={s.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={[s.control, error ? s.error : '', compact ? s.compact : ''].join(' ')}>
        {icon && <span className={s.icon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={s.input}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : help ? `${inputId}-help` : undefined}
          {...rest}
        />
        {revealable ? (
          <button
            type="button"
            className={s.trailingBtn}
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <Icon icon={show ? ViewOffIcon : ViewIcon} size={22} />
          </button>
        ) : (
          trailing && <span className={s.trailing}>{trailing}</span>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className={s.errorText} role="alert">
          {error}
        </p>
      ) : (
        help && (
          <p id={`${inputId}-help`} className={s.help}>
            {help}
          </p>
        )
      )}
    </div>
  )
})
