import s from './Wordmark.module.css'

type Props =
  | { variant?: 'serif'; size?: number; spark?: boolean; className?: string }
  | { variant: 'spaced'; size?: number; className?: string; spark?: undefined }
  | { variant: 'stacked'; sub?: string; className?: string; size?: undefined; spark?: undefined }

export function Wordmark(props: Props) {
  if (props.variant === 'spaced') {
    return (
      <span className={[s.spaced, props.className ?? ''].join(' ')} style={{ fontSize: props.size ?? 20 }}>
        Salon
      </span>
    )
  }
  if (props.variant === 'stacked') {
    return (
      <span className={[s.stacked, props.className ?? ''].join(' ')}>
        <span className={s.stackedTop}>Salon</span>
        <span className={s.stackedSub}>{props.sub ?? 'Brands'}</span>
      </span>
    )
  }
  return (
    <span className={[s.serif, props.className ?? ''].join(' ')} style={{ fontSize: props.size ?? 64 }}>
      Salon
      {props.spark && (
        <svg className={s.spark} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0c.6 7.2 4.8 11.4 12 12-7.2.6-11.4 4.8-12 12-.6-7.2-4.8-11.4-12-12C7.2 11.4 11.4 7.2 12 0Z" />
        </svg>
      )}
    </span>
  )
}
