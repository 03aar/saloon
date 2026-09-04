import { InstagramIcon, Linkedin01Icon, NewTwitterIcon, TiktokIcon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import { Wordmark } from './Wordmark'
import s from './Footer.module.css'

const columns = [
  {
    title: 'Product',
    links: ['For brands', 'For creators', 'How it works', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'Creator guide', 'Brand guide', 'Trust & safety'],
  },
  {
    title: 'Legal',
    links: ['Privacy policy', 'Terms of service', 'Cookie policy'],
  },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: TiktokIcon, label: 'TikTok' },
  { icon: NewTwitterIcon, label: 'X (Twitter)' },
  { icon: Linkedin01Icon, label: 'LinkedIn' },
]

export function Footer() {
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
                <a key={l} href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={s.bottom}>
        <span>© {new Date().getFullYear()} Salon. All rights reserved.</span>
        <span>Made for brands and creators building something real.</span>
      </div>
    </footer>
  )
}
