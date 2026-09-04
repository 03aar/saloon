import s from './Avatar.module.css'

export type Tone = 'sand' | 'rose' | 'olive' | 'stone' | 'noir' | 'cream' | 'gold'

type Props = {
  name: string
  size?: number
  tone?: Tone
  shape?: 'circle' | 'square'
  ring?: 'none' | 'surface' | 'gold'
  /** Shows a soft silhouette instead of an initial, for person-photos in the design. */
  portrait?: boolean
  className?: string
}

const tones: Tone[] = ['sand', 'rose', 'olive', 'stone', 'noir', 'cream']

export function toneFor(seed: string): Tone {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return tones[h % tones.length]
}

export function Avatar({ name, size = 48, tone, shape = 'circle', ring = 'none', portrait, className }: Props) {
  const t = tone ?? toneFor(name)
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <span
      className={[s.avatar, s[t], shape === 'square' ? s.square : '', ring === 'surface' ? s.ringed : ring === 'gold' ? s.goldRing : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.46) }}
      role="img"
      aria-label={name}
    >
      {portrait ? (
        <svg className={s.silhouette} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
          <circle cx="50" cy="38" r="20" />
          <path d="M14 100c2-24 17-36 36-36s34 12 36 36Z" />
        </svg>
      ) : (
        <span className={s.initial}>{initial}</span>
      )}
    </span>
  )
}

export function AvatarStack({ names, size = 36, more, tones: tt }: { names: string[]; size?: number; more?: number; tones?: Tone[] }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {names.map((n, i) => (
        <span key={n} style={{ marginLeft: i === 0 ? 0 : -Math.round(size * 0.3), zIndex: names.length - i, display: 'inline-flex' }}>
          <Avatar name={n} size={size} ring="surface" tone={tt?.[i]} portrait />
        </span>
      ))}
      {more ? (
        <span
          style={{
            marginLeft: -Math.round(size * 0.3),
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'var(--surface-2)',
            border: '2px solid var(--surface)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: Math.max(11, Math.round(size * 0.34)),
            fontWeight: 500,
            color: 'var(--ink-2)',
          }}
        >
          +{more}
        </span>
      ) : null}
    </span>
  )
}
