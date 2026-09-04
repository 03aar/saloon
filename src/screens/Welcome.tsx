import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, Bookmark02Icon, Location01Icon } from '@hugeicons/core-free-icons'
import { Page } from '../components/Page'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Wordmark } from '../components/Wordmark'
import { BrandMark } from '../components/BrandMark'
import { Avatar } from '../components/Avatar'
import { Art, type ArtKind } from '../components/Art'
import s from './Welcome.module.css'

const creators = [
  { name: 'Lujain A.', cat: 'Lifestyle', n: '128K', tone: 'sand' as const },
  { name: 'Yousef K.', cat: 'Tech', n: '94K', tone: 'noir' as const },
  { name: 'Meera S.', cat: 'Beauty', n: '76K', tone: 'rose' as const },
]

const campaigns: { name: string; cat: string; loc: string; art: ArtKind }[] = [
  { name: 'Glow Launch', cat: 'Beauty', loc: 'GCC', art: 'glow' },
  { name: 'Summer Edit', cat: 'Lifestyle', loc: 'Global', art: 'arch' },
  { name: 'Tech Forward', cat: 'Tech', loc: 'GCC', art: 'noir' },
]

export default function Welcome() {
  const nav = useNavigate()
  return (
    <Page>
      <header className={s.hero}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <BrandMark size={20} color="var(--primary)" />
          <Wordmark variant="spaced" size={22} />
        </div>
        <h1 className={['display', s.h1].join(' ')}>
          The room where brands and creators meet<span className="gold-dot">.</span>
        </h1>
        <p className={s.sub}>Discover. Collaborate. Create impact.</p>
      </header>

      <section className={s.board} aria-label="Creators and campaigns preview">
        <div className={s.cols}>
          <div>
            <div className={s.colHead}>
              <b>Creators</b>
              <span>Voices that inspire</span>
            </div>
            <div className={s.stack}>
              {creators.map((c) => (
                <div key={c.name} className={s.mini}>
                  <Avatar name={c.name} size={54} tone={c.tone} portrait />
                  <div className={s.miniRight}>
                    <div className={s.name}>{c.name}</div>
                    <div className={s.cat}>{c.cat}</div>
                    <span className={s.meta}>
                      <i />
                      {c.n}
                    </span>
                  </div>
                  <span className={s.bookmark}>
                    <Icon icon={Bookmark02Icon} size={18} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={s.connector} aria-hidden>
            <svg viewBox="0 0 34 330" fill="none" preserveAspectRatio="none">
              <path d="M0 62 H10 Q17 62 17 69 V158 M0 268 H10 Q17 268 17 261 V172 M17 165 H34" stroke="var(--gold)" strokeWidth="1.5" />
              <circle cx="17" cy="165" r="7" fill="var(--surface)" stroke="var(--gold)" strokeWidth="1.5" />
              <circle cx="17" cy="165" r="3" fill="var(--gold)" />
            </svg>
          </div>

          <div>
            <div className={s.colHead}>
              <b>Campaigns</b>
              <span>Opportunities that fit</span>
            </div>
            <div className={s.stack}>
              {campaigns.map((c) => (
                <div key={c.name} className={s.mini}>
                  <span className={s.thumb}>
                    <Art kind={c.art} />
                  </span>
                  <div className={s.miniRight}>
                    <div className={s.name}>{c.name}</div>
                    <div className={s.cat}>{c.cat}</div>
                    <div className={s.metaRow}>
                      <span className={s.loc}>
                        <Icon icon={Location01Icon} size={13} />
                        {c.loc}
                      </span>
                      <span className={s.shortlist}>Shortlist</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.links}>
          <Link to="/signup/brand" className={s.link}>
            Explore creators <Icon icon={ArrowRight02Icon} size={20} />
          </Link>
          <Link to="/signup/creator" className={s.link}>
            Browse campaigns <Icon icon={ArrowRight02Icon} size={20} />
          </Link>
        </div>
      </section>

      <div className={s.cta}>
        <Button block onClick={() => nav('/role')}>
          Get started
        </Button>
        <Button block variant="outline" onClick={() => nav('/login')}>
          Log in
        </Button>
      </div>
      <p className={s.legal}>
        By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.
      </p>
    </Page>
  )
}
