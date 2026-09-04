import { useNavigate } from 'react-router-dom'
import { InstagramIcon, Linkedin01Icon, NewTwitterIcon, TiktokIcon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import { Wordmark } from './Wordmark'
import { useToast } from './Toast'
import s from './Footer.module.css'

type Link = { label: string; to?: string; soon?: boolean }

const columns: { title: string; links: Link[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'For brands', to: '/for-brands' },
      { label: 'For creators', to: '/for-creators' },
      { label: 'How it works', to: '/' },
      { label: 'Pricing', soon: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', soon: true },
      { label: 'Contact', soon: true },
    ],
  },
  {
    title: 'Bloop Pulse',
    links: [
      { label: 'Latest stories', to: '/pulse' },
      { label: 'Data reports', to: '/pulse' },
      { label: 'Creator playbooks', to: '/pulse' },
      { label: 'Brand guides', to: '/pulse' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', soon: true },
      { label: 'Terms of service', soon: true },
      { label: 'Cookie policy', soon: true },
    ],
  },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: TiktokIcon, label: 'TikTok' },
  { icon: NewTwitterIcon, label: 'X (Twitter)' },
  { icon: Linkedin01Icon, label: 'LinkedIn' },
]

export function Footer() {
  const nav = useNavigate()
  const { toast } = useToast()

  return (
    <footer className={s.footer}>
      {/* Feeds the feTurbulence grain layer referenced by Footer.module.css's
          filter: url(#footerGrain) — an SVG filter has to live in the DOM to
          be addressable from CSS, so it's rendered here, invisible. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <filter id="footerGrain" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          {/* Two turbulence scales (fine grain + broad undulation) lit from an angle
              and composited as a highlight over the colour gradient — the standard
              technique for a convincing bumpy organic surface without a real photo. */}
          <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={7} stitchTiles="stitch" result="fine" />
          <feTurbulence type="fractalNoise" baseFrequency={0.045} numOctaves={3} seed={3} stitchTiles="stitch" result="broad" />
          <feComposite in="fine" in2="broad" operator="arithmetic" k1={0} k2={0.65} k3={0.55} k4={0} result="bumpMap" />
          <feDiffuseLighting in="bumpMap" surfaceScale={2.2} diffuseConstant={0.85} lightingColor="#d98a72" result="light">
            <feDistantLight azimuth={235} elevation={55} />
          </feDiffuseLighting>
          <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1={0} k2={0.16} k3={1} k4={-0.06} />
        </filter>
      </svg>
      <div className={s.top}>
        <div className={s.brand}>
          <Wordmark size={24} className={s.brandMark} />
          <p className={s.tagline}>Creator partnerships, curated.</p>
          <div className={s.socials}>
            {socials.map((soc) => (
              <a key={soc.label} href="#" aria-label={soc.label} className={s.social} onClick={(e) => e.preventDefault()}>
                <Icon icon={soc.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className={s.cols}>
          {columns.map((col) => (
            <div key={col.title} className={s.col}>
              <div className={s.colTitle}>{col.title}</div>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.to ?? '#'}
                  onClick={(e) => {
                    e.preventDefault()
                    if (l.soon) toast(`${l.label} — coming soon`, 'info')
                    else if (l.to) nav(l.to)
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={s.bottom}>
        <span>© {new Date().getFullYear()} Cayana Technologies Inc. All rights reserved.</span>
        <span>Made for brands and creators building something real.</span>
      </div>
    </footer>
  )
}
