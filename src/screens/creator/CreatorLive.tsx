import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ArrowRight02Icon, GridViewIcon, Globe02Icon, Invoice01Icon, Location01Icon, SecurityCheckIcon, SparklesIcon, SquareLock02Icon, Tag01Icon, Tick02Icon, TradeUpIcon, CheckmarkBadge02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer } from '../../components/Page'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { useApp } from '../../store/AppContext'
import a from '../../components/app.module.css'

export default function CreatorLive() {
  const nav = useNavigate()
  const { state } = useApp()
  const name = state.session?.name ?? 'Mira Studio'

  return (
    <Page>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 24 }}>
        <span style={{ width: 100, height: 100, borderRadius: '50%', border: '6px solid var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', boxShadow: '0 0 0 12px rgba(248,188,88,0.12)' }}>
          <Icon icon={SparklesIcon} size={40} strokeWidth={1.4} />
        </span>
        <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 26, fontSize: 'clamp(48px, 13vw, 66px)' }}>
          Your creator
          <br />
          profile is live.
        </h1>
        <p className={a.sub} style={{ margin: '14px auto 0', maxWidth: 420 }}>
          You’re all set! Brands can now discover your profile and start sending opportunities.
        </p>
      </div>

      <Card tone="dark" padding="none" style={{ marginTop: 26, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
        <span style={{ position: 'absolute', right: -60, top: -20, width: 260, height: 460, borderRadius: '50%', background: 'radial-gradient(circle at 30% 50%, rgba(248,188,88,0.45), rgba(248,188,88,0) 60%)' }} />
        <div style={{ position: 'relative', padding: 24 }}>
          <div className={a.row} style={{ gap: 22 }}>
            <span style={{ position: 'relative' }}>
              <Avatar name={name} size={190} tone="noir" portrait ring="gold" />
              <span style={{ position: 'absolute', left: '50%', bottom: -12, transform: 'translateX(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'var(--gold)', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #1c1916' }}>
                <Icon icon={Tick02Icon} size={22} strokeWidth={2.4} />
              </span>
            </span>
            <div>
              <div className="display" style={{ fontSize: 42, color: '#fff' }}>
                {name}
              </div>
              <div style={{ color: 'var(--gold)', fontSize: 20, marginTop: 4 }}>Creator</div>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
                <span className={a.row} style={{ gap: 10 }}>
                  <Icon icon={Location01Icon} size={18} /> Dubai, UAE
                </span>
                <span className={a.row} style={{ gap: 10 }}>
                  <Icon icon={Globe02Icon} size={18} /> Available GCC &amp; Global
                </span>
                <span className={a.row} style={{ gap: 10 }}>
                  <Icon icon={Tag01Icon} size={18} /> Fashion • Lifestyle • Beauty
                </span>
              </div>
            </div>
          </div>
          <div className={a.dividerDark} style={{ margin: '24px 0 20px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <span className={a.row} style={{ gap: 12, fontFamily: 'var(--font-display)', fontSize: 24 }}>
              <Icon icon={SecurityCheckIcon} size={40} strokeWidth={1.1} color="var(--gold)" /> Verified creator
            </span>
            <span className={a.row} style={{ gap: 12, fontFamily: 'var(--font-display)', fontSize: 24, borderLeft: '1px solid rgba(255,255,255,0.12)', paddingLeft: 18 }}>
              <Icon icon={CheckmarkBadge02Icon} size={40} strokeWidth={1.1} color="var(--gold)" /> Bloop Verified
            </span>
          </div>
        </div>
      </Card>

      <div className={a.grid2} style={{ marginTop: 16 }}>
        <Card padding="md" radius="xl">
          <div className={a.row}>
            <IconTile icon={SquareLock02Icon} size={56} iconSize={24} />
            <span className="display" style={{ fontSize: 22 }}>
              Deals unlocked
            </span>
          </div>
          <div className={a.numXl} style={{ marginTop: 16, fontSize: 52 }}>
            14
          </div>
          <div className={a.meta} style={{ fontSize: 16, marginTop: 6 }}>
            new opportunities
          </div>
          <Button size="md" variant="tint" trailing={<Icon icon={ArrowRight01Icon} size={16} />} style={{ marginTop: 22 }} onClick={() => nav('/creator/deals', { replace: true })}>
            View deals
          </Button>
        </Card>
        <Card padding="md" radius="xl">
          <div className={a.row}>
            <IconTile icon={TradeUpIcon} size={56} iconSize={24} />
            <span className="display" style={{ fontSize: 22 }}>
              Profile strength
            </span>
          </div>
          <div className={a.numXl} style={{ marginTop: 16, fontSize: 52 }}>
            88%
          </div>
          <div className={a.bar} style={{ marginTop: 14 }}>
            <span className={a.barFill} style={{ width: '88%' }} />
          </div>
          <div style={{ color: 'var(--gold-deep)', fontSize: 18, marginTop: 10 }}>Strong profile</div>
          <Button size="md" variant="tint" trailing={<Icon icon={ArrowRight01Icon} size={16} />} style={{ marginTop: 14 }} onClick={() => nav('/creator/portfolio')}>
            Improve profile
          </Button>
        </Card>
        <Card padding="md" radius="xl">
          <div className={a.row}>
            <IconTile icon={Invoice01Icon} size={56} iconSize={24} />
            <span className="display" style={{ fontSize: 22 }}>
              Rate card
            </span>
          </div>
          <p className={a.meta} style={{ fontSize: 18, marginTop: 22, lineHeight: 1.4 }}>
            Your rates are visible to brands
          </p>
          <Button size="md" variant="tint" trailing={<Icon icon={ArrowRight01Icon} size={16} />} style={{ marginTop: 22 }} onClick={() => nav('/creator/rate-card')}>
            View rate card
          </Button>
        </Card>
        <Card padding="md" radius="xl">
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <IconTile icon={GridViewIcon} size={68} iconSize={28} />
              <div className="display" style={{ fontSize: 26, marginTop: 22 }}>
                Portfolio
              </div>
              <p className={a.metaSm} style={{ marginTop: 4, lineHeight: 1.4 }}>
                Showcase your work and past collaborations
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, width: 130 }}>
              {(['gold', 'noir', 'silk', 'glow'] as const).map((k) => (
                <span key={k} style={{ height: 66, borderRadius: 10, overflow: 'hidden' }}>
                  <Art kind={k} />
                </span>
              ))}
            </div>
          </div>
          <Button size="md" variant="tint" trailing={<Icon icon={ArrowRight01Icon} size={16} />} style={{ marginTop: 14 }} onClick={() => nav('/creator/portfolio')}>
            View portfolio
          </Button>
        </Card>
      </div>

      <Footer>
        <Button block trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => nav('/creator/deals', { replace: true })}>
          Explore new opportunities
        </Button>
        <button type="button" style={{ textAlign: 'center', color: 'var(--gold-deep)', fontSize: 17, padding: 12 }} onClick={() => nav('/creator/home', { replace: true })}>
          Go to dashboard
        </button>
      </Footer>
    </Page>
  )
}
