import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Add01Icon, ArrowUpRight01Icon, Bookmark02Icon, Cancel01Icon, Search01Icon, SlidersHorizontalIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { SectionHeader } from '../../components/SectionHeader'
import { EmptyState, ErrorState, SkCard } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp, matchesFilters } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { recentCreators, recommendedSearches, creators } from '../../data/mock'
import a from '../../components/app.module.css'
import s from './brand.module.css'

const quick = ['GCC', 'Women 25-34', 'Arabic', 'Video']

export default function Search() {
  const nav = useNavigate()
  const { state, update, toggleSaved } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('search', 450)
  const [q, setQ] = useState(state.searchQuery)
  const [active, setActive] = useState<string[]>(quick)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const pool = [
      ...recentCreators.map((r) => ({ id: r.id, name: r.name, bio: r.bio, city: r.city, followers: r.followers, tone: r.tone, full: undefined as (typeof creators)[number] | undefined })),
      ...creators.map((c) => ({ id: c.id, name: c.name, bio: c.tags.join(' & '), city: `${c.city}, ${c.country}`, followers: c.followers, tone: c.tone, full: c })),
    ]

    // Quick-filter chips narrow the pool by a real predicate. Entries without full creator data
    // (recentCreators) can't be evaluated against a given predicate, so they're left in rather
    // than dropped for a dimension the mock data doesn't carry.
    const quickFiltered = pool.filter((p) => {
      if (active.includes('GCC') && p.full && p.full.region !== 'GCC') return false
      if (active.includes('Women 25-34') && p.full) {
        const [min, max] = p.full.audienceAge
        if (max < 25 || min > 34) return false
      }
      if (active.includes('Arabic') && p.full && !p.full.languages.includes('العربية')) return false
      if (active.includes('Video') && p.full) {
        const hasVideo = p.full.deliverables.some((d) => d === 'Reel' || d === 'TikTok video' || d === 'YouTube video')
        if (!hasVideo) return false
      }
      return true
    })

    // Filters set in Refine (region, categories, age, engagement, budget, deliverables) apply to
    // entries with full creator data.
    const refined = quickFiltered.filter((p) => !p.full || matchesFilters(p.full, state.filters))

    if (!term || term === 'modest fashion creators') return refined.slice(0, 4)
    return refined.filter((p) => `${p.name} ${p.bio} ${p.city}`.toLowerCase().includes(term))
  }, [q, active, state.filters])

  const toggleQuick = (k: string) => setActive((l) => (l.includes(k) ? l.filter((x) => x !== k) : [...l, k]))

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <h1 className={['display', s.hello].join(' ')} style={{ fontSize: 'clamp(46px, 12vw, 60px)' }}>
          Search Bloop
        </h1>
        <IconButton label="Filters" size="lg" onClick={() => nav('/refine')}>
          <Icon icon={SlidersHorizontalIcon} size={22} />
        </IconButton>
      </div>

      <div className={s.searchBar} style={{ marginTop: 20 }}>
        <label className={s.searchInput} style={{ borderRadius: 22, height: 64 }}>
          <Icon icon={Search01Icon} size={24} color="var(--ink)" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => update({ searchQuery: q })}
            placeholder="Search creators, niches, cities"
            aria-label="Search"
            autoFocus
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search" style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--surface-3)', color: 'var(--ink-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon={Cancel01Icon} size={14} strokeWidth={2} />
            </button>
          )}
        </label>
      </div>

      <div className={a.scroller} style={{ marginTop: 14, paddingBottom: 4 }}>
        {quick.map((k) => (
          <Chip key={k} selected={active.includes(k)} selectedStyle="outline" onClick={() => toggleQuick(k)} trailing={active.includes(k) ? <Icon icon={Tick02Icon} size={16} color="var(--gold)" /> : undefined}>
            {k}
          </Chip>
        ))}
        <IconButton label="Add filter" onClick={() => nav('/refine')} size="sm" style={{ width: 40, height: 40 }}>
          <Icon icon={Add01Icon} size={18} />
        </IconButton>
      </div>

      <div className={a.section}>
        <SectionHeader title={q.trim() && q.trim().toLowerCase() !== 'modest fashion creators' ? 'Results' : 'Recent creators'} size="lg" action="View all" onAction={() => nav('/discover')} />
        {loading ? (
          <div className={a.stack}>
            <SkCard avatar lines={0} />
            <SkCard avatar lines={0} />
            <SkCard avatar lines={0} />
          </div>
        ) : error ? (
          <Card padding="none">
            <ErrorState onAction={retry} />
          </Card>
        ) : results.length === 0 ? (
          <Card padding="none">
            <EmptyState
              title="No creators found"
              sub={q.trim() ? `We couldn’t find anyone matching “${q}”. Try a broader term or adjust your filters.` : 'No creators match your current filters. Try widening them in Refine.'}
              action={q.trim() ? 'Clear search' : 'Edit filters'}
              onAction={q.trim() ? () => setQ('') : () => nav('/refine')}
            />
          </Card>
        ) : (
          <Card padding="none">
            {results.map((r, i) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <button type="button" onClick={() => nav(`/creators/${creators.some((c) => c.id === r.id) ? r.id : 'mira-alia'}`)} aria-label={`Open ${r.name}`}>
                  <Avatar name={r.name} size={84} tone={r.tone} portrait />
                </button>
                <button type="button" style={{ flex: 1, minWidth: 0, textAlign: 'left' }} onClick={() => nav(`/creators/${creators.some((c) => c.id === r.id) ? r.id : 'mira-alia'}`)}>
                  <span className="display" style={{ fontSize: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {r.name} <Verified size={16} />
                  </span>
                  <span className={a.meta} style={{ display: 'block', marginTop: 4 }}>
                    {r.bio}
                  </span>
                  <span className={a.metaSm} style={{ display: 'block', marginTop: 2 }}>
                    {r.city}
                  </span>
                </button>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16 }}>{r.followers}</div>
                  <div className={a.metaSm}>Followers</div>
                </div>
                <IconButton label={state.saved.includes(r.id) ? 'Unsave' : 'Save'} size="lg" active={state.saved.includes(r.id)} onClick={() => { toggleSaved(r.id); toast(state.saved.includes(r.id) ? 'Removed from saved' : 'Saved') }}>
                  <Icon icon={Bookmark02Icon} size={20} />
                </IconButton>
              </div>
            ))}
          </Card>
        )}
      </div>

      <div className={a.section}>
        <SectionHeader title="Recommended searches" size="lg" />
        <div className={a.grid2}>
          {recommendedSearches.map((r) => (
            <button key={r} type="button" onClick={() => setQ(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 'var(--r-pill)', border: '1px solid var(--line)', background: 'var(--surface)', textAlign: 'left' }}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-deep)', flexShrink: 0 }}>
                <Icon icon={Search01Icon} size={20} />
              </span>
              <span style={{ flex: 1, fontSize: 15, lineHeight: 1.3 }}>{r}</span>
              <Icon icon={ArrowUpRight01Icon} size={18} />
            </button>
          ))}
        </div>
      </div>
    </Page>
  )
}
