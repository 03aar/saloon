import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, ArrowUpRight01Icon, Message01Icon, Notification01Icon, SparklesIcon, TradeUpIcon, UserGroupIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { IconTile } from '../../components/IconTile'
import { Ring } from '../../components/Ring'
import { AvatarStack } from '../../components/Avatar'
import { Art } from '../../components/Art'
import { SectionHeader } from '../../components/SectionHeader'
import { Card } from '../../components/Card'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { campaigns } from '../../data/mock'
import { firstName, greeting } from '../../lib/auth'
import a from '../../components/app.module.css'
import s from './brand.module.css'

export default function Home() {
  const nav = useNavigate()
  const { state } = useApp()
  const { loading, error, retry } = useLoad('home')
  const name = firstName(state.session?.name ?? state.brand.name)

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 14, alignItems: 'flex-start' }}>
        <h1 className={['display', s.hello].join(' ')} style={{ flex: 1, minWidth: 0 }}>
          {greeting()},
          <br />
          {name}.
        </h1>
        <div className={a.actions} style={{ paddingTop: 10 }}>
          <IconButton label="Notifications" size="lg" dot onClick={() => nav('/notifications')}>
            <Icon icon={Notification01Icon} size={22} />
          </IconButton>
          <IconButton label="Messages" size="lg" onClick={() => nav('/messages')}>
            <Icon icon={Message01Icon} size={22} />
          </IconButton>
        </div>
      </div>

      {loading ? (
        <ScreenSkeleton hero={260} tiles={3} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <p className={a.sub} style={{ marginTop: 6 }}>Here’s what’s happening with your brand.</p>

          <section className={s.heroDark} style={{ marginTop: 24 }} aria-label="Top priority">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, position: 'relative' }}>
              <div style={{ flex: 1 }}>
                <span className={a.darkEyebrow}>
                  <Icon icon={SparklesIcon} size={16} />
                  Top priority
                </span>
                <div className={s.heroTitle}>
                  3 creator matches
                  <br />
                  ready
                </div>
                <p className={s.heroSub}>High alignment with your brief and audience.</p>
                <Button size="md" style={{ marginTop: 22 }} trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => nav('/compare')}>
                  View matches
                </Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
                <Ring value={92} size={128} stroke={5} track="rgba(255,255,255,0.1)">
                  <div className="display" style={{ fontSize: 46, color: '#fff', lineHeight: 1 }}>
                    92
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gold)', marginTop: 4 }}>Match score</div>
                </Ring>
                <AvatarStack names={['Mira Alia', 'Nouf Al Qasimi', 'Leen Haddad']} size={46} more={1} tones={['sand', 'cream', 'noir']} />
              </div>
            </div>
          </section>

          <section className={s.heroSoft} style={{ marginTop: 16 }} aria-label="Next best action">
            <span className={s.heroSoftArt}>
              <Art kind="arch" />
            </span>
            <div style={{ position: 'relative', maxWidth: '62%' }}>
              <div className="eyebrow" style={{ fontSize: 12 }}>
                Next best action
              </div>
              <h2 className="display" style={{ fontSize: 30, marginTop: 14, lineHeight: 1.1 }}>
                Review Ramadan shortlist
              </h2>
              <p className="muted" style={{ marginTop: 10, fontSize: 15 }}>
                6 creators shortlisted for your Ramadan campaign.
              </p>
              <Button size="md" variant="outline" style={{ marginTop: 18 }} trailing={<Icon icon={ArrowRight02Icon} size={20} />} onClick={() => nav('/shortlist')}>
                Review shortlist
              </Button>
            </div>
          </section>

          <div className={a.section}>
            <SectionHeader title="Campaign pulse" size="lg" action="View all" onAction={() => nav('/campaigns')} actionTone="ink" />
            <div className={s.pulse}>
              {[
                { icon: TradeUpIcon, lbl: 'Active campaigns', val: '8', sub: '2 launching this week', up: false },
                { icon: Wallet02Icon, lbl: 'Total spend', val: '2.48M', unit: 'SAR', sub: '18% vs last 7 days', up: true },
                { icon: UserGroupIcon, lbl: 'Content delivered', val: '27', sub: '9 pending approval', up: true },
              ].map((p) => (
                <button key={p.lbl} type="button" className={s.pulseCard} onClick={() => nav('/campaigns')}>
                  <IconTile icon={p.icon} size={48} iconSize={22} />
                  <div className={s.pulseLbl}>{p.lbl}</div>
                  <div className={s.pulseVal}>
                    {p.val}
                    {p.unit && <small>{p.unit}</small>}
                  </div>
                  <div className={s.pulseSub}>
                    {p.up && <Icon icon={ArrowUpRight01Icon} size={14} color="var(--gold)" />}
                    {p.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Card className={a.section} padding="md">
            <h3 className="display" style={{ fontSize: 24 }}>
              Campaigns at a glance
            </h3>
            <div style={{ marginTop: 6 }}>
              {campaigns.slice(0, 2).map((c) => (
                <button key={c.id} type="button" className={s.campRow} onClick={() => nav(`/campaigns/${c.id}`)}>
                  <span className={s.campThumb}>
                    <Art kind={c.tone} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className={s.campName}>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
                      <span className={[a.status, c.status === 'Live' ? a.live : ''].join(' ')} style={{ whiteSpace: 'nowrap' }}>
                        <i />
                        {c.status}
                      </span>
                    </span>
                    <span className={a.metaSm} style={{ display: 'block', marginTop: 4 }}>
                      {c.creators} creators • {c.pieces} content pieces
                    </span>
                    <span className={a.between} style={{ marginTop: 10, fontSize: 13 }}>
                      <span>
                        {c.spend} <small style={{ color: 'var(--muted)', letterSpacing: '0.06em' }}>SAR</small>
                      </span>
                      <span className={a.metaSm}>{c.spentPct}% spent</span>
                    </span>
                    <span className={a.bar} style={{ marginTop: 6 }}>
                      <span className={a.barFill} style={{ width: `${c.spentPct}%` }} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
    </Page>
  )
}
