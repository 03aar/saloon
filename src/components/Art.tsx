import s from './Art.module.css'

export type ArtKind = 'silk' | 'arch' | 'wave' | 'gold' | 'marble' | 'noir' | 'glow'

/**
 * Decorative imagery stand-ins. The design uses photographic/3D renders; these
 * are on-brand CSS+SVG compositions so the layout reads identically without assets.
 */
export function Art({ kind, className }: { kind: ArtKind; className?: string }) {
  return (
    <span className={[s.art, s[kind], className ?? ''].join(' ')} aria-hidden>
      {kind === 'arch' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <path d="M28 100V48a22 22 0 0 1 44 0v52Z" fill="#f4ebd9" />
          <path d="M36 100V52a14 14 0 0 1 28 0v48Z" fill="#dcc79c" opacity=".8" />
          <rect x="0" y="86" width="100" height="14" fill="#e8dcc2" />
        </svg>
      )}
      {kind === 'wave' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 62c20-14 32 8 52-6s30-6 48-18v62H0Z" fill="#c9a24a" opacity=".55" />
          <path d="M0 72c22-14 36 6 56-8s26-2 44-14v50H0Z" fill="#e2c37a" opacity=".55" />
        </svg>
      )}
      {kind === 'silk' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 70c18-22 40-18 60-26s28-14 40-24v80H0Z" fill="#fff" opacity=".45" />
          <path d="M0 84c22-18 44-12 62-24s26-10 38-20v60H0Z" fill="#e3cf9f" opacity=".35" />
        </svg>
      )}
      {kind === 'marble' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 40C20 30 30 60 50 50s30-30 50-20v70H0Z" fill="#e6cf96" opacity=".35" />
          <path d="M0 80c25-20 40 0 60-12s20-20 40-18v50H0Z" fill="#fff" opacity=".5" />
        </svg>
      )}
      {kind === 'glow' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <rect x="44" y="34" width="12" height="40" rx="3" fill="#e9d6a4" />
          <rect x="47" y="26" width="6" height="10" rx="1.5" fill="#c9a24a" />
          <circle cx="30" cy="78" r="8" fill="#b08a2e" />
        </svg>
      )}
      {kind === 'noir' && (
        <svg className={s.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M100 0C70 30 60 60 20 100h80Z" fill="#fff" opacity=".05" />
          <path d="M100 30C80 45 70 70 45 100h55Z" fill="#fff" opacity=".05" />
        </svg>
      )}
    </span>
  )
}
