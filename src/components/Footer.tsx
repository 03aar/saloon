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
      <div className={s.top}>
        <div className={s.brand}>
          <Wordmark size={24} />
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
