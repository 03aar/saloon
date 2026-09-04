import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight01Icon, Bookmark02Icon, Globe02Icon, InformationCircleIcon, Location01Icon, MoreHorizontalIcon, PlayCircleIcon, PlayIcon, SentIcon, TradeUpIcon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { Ring } from '../../components/Ring'
import { Art, type ArtKind } from '../../components/Art'
import { SectionHeader } from '../../components/SectionHeader'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { ScreenHeader } from '../../components/ScreenHeader'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { creators } from '../../data/mock'
import a from '../../components/app.module.css'
import s from './brand.module.css'

const portfolio: { v: string; art: ArtKind }[] = [
  { v: '1.8M', art: 'silk' },
  { v: '2.3M', art: 'gold' },
  { v: '1.2M', art: 'marble' },
  { v: '2.0M', art: 'arch' },
  { v: '1.6M', art: 'noir' },
]

export default function CreatorProfile() {
  const nav = useNavigate()
  const { id } = useParams()
  const { state, toggleShortlist } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`creator-${id}`)
  const c = creators.find((x) => x.id === id)

  if (!c) {
    return (
      <Page layout="app">
        <ScreenHeader title="Creator not found" back="/discover" sub="This profile may have been removed or the link is incorrect." />
      </Page>
    )
  }
  const shortlisted = state.shortlist.includes(c.id)

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <IconButton label="Back" onClick={() => nav(-1)}>
          <Icon icon={ArrowRight01Icon} size={22} style={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <IconButton label="More options" onClick={() => toast('Share, report or block coming from this menu', 'info')}>
          <Icon icon={MoreHorizontalIcon} size={22} />
        </IconButton>
      </div>

      {loading ? (
        <ScreenSkeleton hero={520} tiles={4} rows={1} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <section className={s.profileHero} style={{ marginTop: 18 }}>
            <span className={s.profileArt}>
              <Art kind="silk" />
              <span style={{ position: 'absolute', right: 18, top: 24 }}>
                <Avatar name={c.name} size={230} tone={c.tone} portrait />
              </span>
            </span>
            <div className={s.profileBody}>
              <div className={s.profileName}>
                {c.name} <Verified size={26} />
              </div>
              {c.arabicName && <div className={s.arabic}>{c.arabicName}</div>}
              <span className={s.featLoc} style={{ marginTop: 16, fontSize: 17 }}>
                <Icon icon={Location01Icon} size={20} />
                {c.city}, {c.country}
              </span>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {c.tags.map((t) => (
                  <Chip key={t} size="sm">
                    {t}
                  </Chip>
                ))}
              </div>
              <div className={s.fitRow}>
                <Ring value={c.fit} size={104} stroke={7}>
                  <span className="display" style={{ fontSize: 40 }}>
                    {c.fit}
                  </span>
                </Ring>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>Excellent Fit</div>
                  <p className={a.meta} style={{ marginTop: 4, maxWidth: 180, lineHeight: 1.4 }}>
                    Great match for your brand and audience <Icon icon={InformationCircleIcon} size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
                  </p>
                </div>
              </div>
            </div>
            <div className={s.profileActions}>
              <Button leading={<Icon icon={SentIcon} size={22} />} onClick={() => nav(`/creators/${c.id}/offer`)}>
                Send offer
              </Button>
              <Button
                variant="outline"
                leading={<Icon icon={Bookmark02Icon} size={22} />}
                onClick={() => {
                  toggleShortlist(c.id)
                  toast(shortlisted ? 'Removed from shortlist' : 'Added to shortlist')
                }}
                style={{ background: shortlisted ? 'var(--gold-tint)' : '#fff' }}
              >
                {shortlisted ? 'Shortlisted' : 'Shortlist'}
              </Button>
            </div>
          </section>

          <div className={s.statsCard} style={{ marginTop: 16 }}>
            {[
              { i: UserGroupIcon, v: c.followers, l: 'Followers' },
              { i: TradeUpIcon, v: c.er, l: 'Engagement Rate' },
              { i: PlayCircleIcon, v: c.avgViews, l: 'Avg. Views' },
              { i: Globe02Icon, v: `${c.gcc - 3}%`, l: 'GCC Audience' },
            ].map((st) => (
              <div key={st.l}>
                <Icon icon={st.i} size={24} style={{ margin: '0 auto' }} />
                <b>{st.v}</b>
                <span>{st.l}</span>
              </div>
            ))}
          </div>

          <Card padding="lg" style={{ marginTop: 16 }} radius="xl">
            <h2 className="display" style={{ fontSize: 30 }}>
              About {c.name.split(' ')[0]}
            </h2>
            <p className={a.sub} style={{ marginTop: 10, fontSize: 15 }}>
              {c.about}
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {c.languages.map((l) => (
                <Chip key={l} size="sm" tone="soft">
                  {l}
                </Chip>
              ))}
            </div>
          </Card>

          <div className={a.section}>
            <SectionHeader title="Portfolio" size="lg" action="View all" onAction={() => toast('Full portfolio opens in the creator media kit', 'info')} />
            <div className={a.wrapScroller}>
              {portfolio.map((p, i) => (
                <button key={i} type="button" className={s.portfolio} onClick={() => toast('Playing preview (demo)', 'info')} aria-label={`Portfolio item ${i + 1}`}>
                  <Art kind={p.art} />
                  <span className={s.portfolioViews}>
                    <Icon icon={PlayIcon} size={14} />
                    {p.v}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={a.section}>
            <SectionHeader title="Audience Overview" size="lg" action="View insights" onAction={() => nav(`/creators/${c.id}/insights`)} />
            <div className={s.audience}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Top Locations</div>
                {[
                  ['UAE', 48],
                  ['Saudi Arabia', 22],
                  ['Kuwait', 12],
                ].map(([l, v]) => (
                  <div key={l} className={s.audRow}>
                    <span>{l}</span>
                    <span className={[a.bar, a.barThin].join(' ')}>
                      <span className={a.barFill} style={{ width: `${v}%` }} />
                    </span>
                    <b>{v}%</b>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Age Range</div>
                {[
                  ['18–24', 26],
                  ['25–34', 52],
                  ['35–44', 22],
                ].map(([l, v]) => (
                  <div key={l} className={s.audRow}>
                    <span>{l}</span>
                    <span className={[a.bar, a.barThin].join(' ')}>
                      <span className={a.barFill} style={{ width: `${v}%` }} />
                    </span>
                    <b>{v}%</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}
