import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowRight02Icon, CheckmarkCircle02Icon, Door01Icon, Globe02Icon, Location01Icon, Target02Icon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { IconTile } from '../../components/IconTile'
import { AvatarStack } from '../../components/Avatar'
import { useApp } from '../../store/AppContext'
import { markets } from '../../data/mock'
import s from './onboarding.module.css'

export default function BrandReady() {
  const nav = useNavigate()
  const { state } = useApp()
  const b = state.brand
  const market = markets.find((m) => m.id === state.planning.market) ?? markets[0]
  const marketShort = market.id === 'gcc-global' ? 'GCC' : market.id === 'gcc' ? 'GCC' : 'Global'
  const shortHq = b.hq.replace('United Arab Emirates', 'UAE').replace('Saudi Arabia', 'KSA')
  const comfort = state.planning.budget[1] >= 100 ? 'High' : state.planning.budget[1] >= 50 ? 'Solid' : 'Lean'

  return (
    <Page>
      <div className={s.readyTop}>
        <span className={s.readyIcon}>
          <Icon icon={CheckmarkCircle02Icon} size={34} strokeWidth={1.3} />
        </span>
        <h1 className={['display', s.readyH1].join(' ')}>
          Your brand room
          <br />
          is ready.
        </h1>
        <p className={s.readySub}>We’ve set up your space. You can now discover creators and launch campaigns.</p>
      </div>

      <section className={s.roomCard} aria-label="Brand room">
        <div className={s.roomHead}>
          <span className={s.mono}>
            <span className={s.monoRing}>{b.name.charAt(0).toUpperCase()}</span>
          </span>
          <div style={{ minWidth: 0 }}>
            <div className={s.roomName}>{b.name}</div>
            <div className={s.roomTag}>Brand room</div>
            <div className={s.roomMeta}>{b.industry.startsWith('Beauty') ? 'Luxury beauty brand' : b.industry}</div>
            <div className={s.roomLoc}>
              <Icon icon={Location01Icon} size={14} color="var(--gold)" />
              {shortHq}
            </div>
          </div>
        </div>
        <div className={s.roomStats}>
          <div className={s.roomStat}>
            <div className={s.top}>
              <Icon icon={Door01Icon} size={26} strokeWidth={1.3} />
              <span className={s.val}>1</span>
            </div>
            <div className={s.lbl}>Active room</div>
          </div>
          <div className={s.roomStat}>
            <div className={s.top}>
              <Icon icon={UserGroupIcon} size={26} strokeWidth={1.3} />
              <span className={s.val}>0</span>
            </div>
            <div className={s.lbl}>Active campaigns</div>
          </div>
          <div className={s.roomStat}>
            <div className={s.top}>
              <Icon icon={Wallet02Icon} size={26} strokeWidth={1.3} />
              <span className={s.val}>—</span>
            </div>
            <div className={s.lbl}>Pending payouts</div>
          </div>
        </div>
      </section>

      <div className={s.tiles}>
        <button type="button" className={s.tile} onClick={() => nav('/discover')}>
          <div className={s.tileTop}>
            <IconTile icon={Target02Icon} size={54} iconSize={24} />
            <Icon icon={ArrowRight01Icon} size={22} />
          </div>
          <div className={s.tileTitle}>Match profile</div>
          <div className={s.tileVal}>92%</div>
          <div className={s.tileSub}>Great match for top beauty creators</div>
          <svg className={s.tileArt} viewBox="0 0 100 100" aria-hidden>
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--line)" />
            <circle cx="100" cy="100" r="58" fill="none" stroke="var(--line)" />
            <path d="M100 42a58 58 0 0 0-52 32" fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={s.tile} onClick={() => nav('/onboarding/brand/planning')}>
          <div className={s.tileTop}>
            <IconTile icon={Globe02Icon} size={54} iconSize={24} />
            <Icon icon={ArrowRight01Icon} size={22} />
          </div>
          <div className={s.tileTitle}>Markets</div>
          <div className={s.tileVal}>{marketShort}</div>
          <div className={s.tileSub}>{market.label} markets enabled</div>
          <svg className={s.tileArt} viewBox="0 0 100 100" aria-hidden style={{ opacity: 0.6 }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <circle key={i} cx={10 + (i % 10) * 9} cy={40 + Math.floor(i / 10) * 9} r="1.6" fill={i % 7 === 0 ? 'var(--gold)' : 'var(--line-strong)'} />
            ))}
          </svg>
        </button>
        <button type="button" className={s.tile} onClick={() => nav('/onboarding/brand/team')}>
          <div className={s.tileTop}>
            <IconTile icon={UserGroupIcon} size={54} iconSize={24} />
            <Icon icon={ArrowRight01Icon} size={22} />
          </div>
          <div className={s.tileTitle}>Team</div>
          <div className={s.tileVal}>{state.team.length}</div>
          <div className={s.tileSub}>Team members added</div>
          <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <AvatarStack names={state.team.slice(0, 3).map((t) => t.name)} size={34} />
            <span style={{ fontSize: 12, color: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 999, padding: '4px 10px' }}>+ Add more</span>
          </div>
        </button>
        <button type="button" className={s.tile} onClick={() => nav('/onboarding/brand/planning')}>
          <div className={s.tileTop}>
            <IconTile icon={Wallet02Icon} size={54} iconSize={24} />
            <Icon icon={ArrowRight01Icon} size={22} />
          </div>
          <div className={s.tileTitle}>Budget comfort</div>
          <div className={s.tileVal}>{comfort}</div>
          <div className={s.tileSub}>You’re set to run impactful campaigns</div>
          <div style={{ position: 'absolute', right: 18, bottom: 0, display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
            {[40, 60, 80, 100].map((h, i) => (
              <span key={h} style={{ width: 14, height: `${h}%`, borderRadius: '8px 8px 0 0', background: i === 3 ? 'var(--gold)' : 'var(--surface-3)' }} />
            ))}
          </div>
        </button>
      </div>

      <Footer>
        <Button block trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => nav('/home', { replace: true })}>
          Enter brand room
        </Button>
        <button type="button" className={s.ghost} onClick={() => nav('/home', { replace: true })}>
          Explore Bloop dashboard
        </button>
      </Footer>
    </Page>
  )
}
