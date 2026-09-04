import { useNavigate } from 'react-router-dom'
import { Bookmark02Icon, Compass01Icon, Location01Icon, Notification01Icon, Search01Icon, SecurityCheckIcon, SlidersHorizontalIcon, SparklesIcon, StarIcon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { IconTile } from '../../components/IconTile'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Chip } from '../../components/Chip'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp, matchesFilters } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { creators } from '../../data/mock'
import a from '../../components/app.module.css'
import s from './brand.module.css'

export default function Discover() {
  const nav = useNavigate()
  const { state, toggleSaved } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('discover')
  const top = creators[0]
  // "More creators you'll love" reflects the current filters from Refine/Search — everything
  // else on the page (the featured hero) stays as the app's single top overall match.
  const more = creators.filter((c) => c.id !== top.id && matchesFilters(c, state.filters)).slice(0, 3)
  const saved = (id: string) => state.saved.includes(id)

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <Avatar name={state.brand.name} size={56} tone="cream" />
        <IconButton label="Notifications" variant="plain" dot onClick={() => nav('/notifications')}>
          <Icon icon={Notification01Icon} size={24} />
        </IconButton>
      </div>
      <h1 className={['display', s.hello].join(' ')} style={{ marginTop: 16 }}>
        Discover
        <br />
        creators
      </h1>

      <div className={s.searchBar} style={{ marginTop: 24 }}>
        <button type="button" className={s.searchInput} onClick={() => nav('/search')} aria-label="Search creators">
          <Icon icon={Search01Icon} size={24} color="var(--ink)" />
          Beauty creators in GCC
        </button>
        <IconButton label="Filters" size="lg" onClick={() => nav('/refine')}>
          <Icon icon={SlidersHorizontalIcon} size={22} />
        </IconButton>
      </div>

      {loading ? (
        <ScreenSkeleton hero={420} tiles={3} rows={1} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <section className={s.featured} aria-label="Top match">
            <div className={s.featPhoto}>
              <Art kind="silk" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar name={top.name} size={150} tone="sand" portrait />
              </div>
            </div>
            <div className={s.featBody}>
              <div>
                <Chip size="sm" tone="tintLight" leading={<Icon icon={StarIcon} size={14} />}>
                  Top match
                </Chip>
              </div>
              <div className={s.featName}>
                {top.name} <Verified size={22} />
              </div>
              <span className={s.featLoc}>
                <Icon icon={Location01Icon} size={16} />
                {top.city}, {top.country}
              </span>
              <div style={{ marginTop: 12 }}>
                <Chip size="sm" tone="soft">
                  {top.tags[0]} &nbsp;+&nbsp; {top.tags[1]}
                </Chip>
              </div>
              <div className={s.featStats}>
                <div>
                  <b>{top.fit}</b>
                  <span>Fit score</span>
                  <i />
                </div>
                <div>
                  <b>{top.gcc}%</b>
                  <span>GCC audience</span>
                  <i style={{ width: '50%' }} />
                </div>
              </div>
              <div className={s.featPrice}>
                <small>From</small>
                <b>{top.rateFrom}</b>{' '}
                <span style={{ marginLeft: 6, display: 'inline-block' }}>
                  <Chip size="xs">Per post</Chip>
                </span>
              </div>
            </div>
            <div className={s.featActions}>
              <Button variant="soft" size="md" leading={<Icon icon={Bookmark02Icon} size={20} />} onClick={() => {
                toggleSaved(top.id)
                toast(saved(top.id) ? 'Removed from saved' : 'Saved to your list')
              }}>
                {saved(top.id) ? 'Saved' : 'Save'}
              </Button>
              <Button size="md" onClick={() => nav(`/creators/${top.id}`)}>
                View profile
              </Button>
            </div>
          </section>

          <div className={a.section}>
            <div className={a.title} style={{ marginBottom: 12 }}>
              Why she’s a great fit
            </div>
            <div className={s.why}>
              {[
                { icon: UserGroupIcon, t: 'Strong GCC audience', d: '71% from GCC' },
                { icon: SparklesIcon, t: 'High engagement', d: '4.8% avg. ER' },
                { icon: SecurityCheckIcon, t: 'Brand safe', d: 'High trust score' },
              ].map((w) => (
                <div key={w.t} className={s.whyCard}>
                  <IconTile icon={w.icon} size={46} iconSize={22} />
                  <b>{w.t}</b>
                  <span>{w.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={a.section}>
            <div className={a.between} style={{ marginBottom: 12 }}>
              <div className={a.title}>More creators you’ll love</div>
              <button type="button" className={a.link} onClick={() => nav('/search')}>
                See all
              </button>
            </div>
            {more.length === 0 ? (
              <EmptyState
                title="No creators match your filters"
                sub="Try widening your region, budget or age range in Refine."
                action="Edit filters"
                onAction={() => nav('/refine')}
              />
            ) : (
            <div className={s.miniCreatorRow}>
              {more.map((c) => (
                <div key={c.id} className={s.miniCreator}>
                  <div className={s.miniCreatorTop}>
                    <button type="button" onClick={() => nav(`/creators/${c.id}`)} aria-label={`View ${c.name}`}>
                      <Avatar name={c.name} size={96} tone={c.tone} portrait shape="square" />
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={a.between} style={{ alignItems: 'flex-start' }}>
                        <button type="button" className={s.miniName} onClick={() => nav(`/creators/${c.id}`)} style={{ textAlign: 'left' }}>
                          {c.name} <Verified size={16} />
                        </button>
                        <IconButton label={saved(c.id) ? 'Unsave' : 'Save'} size="sm" active={saved(c.id)} onClick={() => toggleSaved(c.id)}>
                          <Icon icon={Bookmark02Icon} size={16} />
                        </IconButton>
                      </div>
                      <div className={a.metaSm} style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        <Icon icon={Location01Icon} size={12} />
                        {c.city}, {c.country}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        {c.tags.slice(0, 2).map((t) => (
                          <Chip key={t} size="xs" tone="soft">
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={s.miniStats}>
                    <span>
                      <b>{c.fit}</b> Fit
                    </span>
                    <span>
                      <b>{c.gcc}%</b> GCC
                    </span>
                    <span style={{ textAlign: 'right' }}>
                      From
                      <br />
                      <b>{c.rateFrom}</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>

          <div className={a.banner} style={{ marginTop: 10 }}>
            <IconTile icon={Compass01Icon} size={56} iconSize={26} />
            <div className={a.bannerBody}>
              <div className={a.bannerTitle}>Refine your search</div>
              <div className={a.bannerSub}>Use filters to find creators by audience, niche, rates and more.</div>
            </div>
            <Button size="sm" onClick={() => nav('/refine')}>
              Show filters
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
