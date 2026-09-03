import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark02Icon, Calendar03Icon, FilterIcon, Image01Icon, PlayIcon, SecurityCheckIcon, SmartPhone01Icon, SparklesIcon, StarIcon, UserGroupIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Chip } from '../../components/Chip'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { Card } from '../../components/Card'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { deals } from '../../data/deals'
import a from '../../components/app.module.css'
import s from './creator.module.css'

const tabs = ['For you', 'New', 'High pay', 'Video', 'Global']

export default function Deals() {
  const nav = useNavigate()
  const { state, toggleSaved } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('deals')
  const [tab, setTab] = useState('For you')
  const featured = deals[0]
  const rest = deals.slice(1).filter((d) => (tab === 'New' ? d.isNew : tab === 'High pay' ? d.max >= 10 : tab === 'Video' ? d.formats.includes('Video') : tab === 'Global' ? d.region === 'Global' : true))

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(54px, 15vw, 74px)' }}>
            Deals
          </h1>
          <p className={a.sub} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
            <Icon icon={SparklesIcon} size={18} color="var(--gold)" /> Curated brand opportunities for you
          </p>
        </div>
        <IconButton label="Filters" size="lg" style={{ width: 64, height: 64 }} onClick={() => nav('/creator/deals/filters')}>
          <Icon icon={FilterIcon} size={24} />
        </IconButton>
      </div>

      <div className={a.scroller} style={{ marginTop: 18 }}>
        {tabs.map((t) => (
          <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)} style={{ height: 60, padding: '0 26px', borderRadius: 999, border: `1px solid ${tab === t ? 'var(--dark)' : 'var(--line)'}`, background: tab === t ? 'var(--dark)' : 'var(--surface)', color: tab === t ? '#fff' : 'var(--ink)', fontSize: 18 }}>
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <ScreenSkeleton hero={480} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <section className={s.dealCard} style={{ marginTop: 16 }} aria-label="Featured deal">
            <div className={s.dealHero}>
              <span className={s.dealHeroArt}>
                <Art kind="arch" />
              </span>
              <div style={{ position: 'relative', maxWidth: '68%' }}>
                <Chip size="sm" leading={<Icon icon={StarIcon} size={14} color="var(--gold)" />}>Featured</Chip>
                <div className="display" style={{ fontSize: 42, marginTop: 60, lineHeight: 1.05 }}>
                  {featured.name}
                </div>
                <div className={a.meta} style={{ fontSize: 20, marginTop: 8 }}>
                  by {featured.brand}
                </div>
                <div className="display" style={{ fontSize: 34, color: 'var(--gold-deep)', marginTop: 14 }}>
                  AED {featured.min}K – {featured.max}K
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                  {featured.formats.map((f) => (
                    <Chip key={f} size="sm" leading={<Icon icon={f === 'Video' ? PlayIcon : f === 'Photo' ? Image01Icon : SmartPhone01Icon} size={14} />}>
                      {f === 'Story' ? 'Story frames' : f}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
            <div className={a.wrapRow} style={{ padding: '16px 20px 18px', gap: 14 }}>
              <span className={a.row} style={{ gap: 10 }}>
                <Icon icon={Calendar03Icon} size={28} strokeWidth={1.2} />
                <span>
                  <span className={a.metaSm} style={{ display: 'block' }}>
                    Due date
                  </span>
                  <span style={{ fontSize: 16 }} className={a.nowrap}>{featured.due}</span>
                </span>
              </span>
              <span style={{ width: 1, height: 40, background: 'var(--line)' }} />
              <span className={a.row} style={{ gap: 10 }}>
                <Icon icon={UserGroupIcon} size={28} strokeWidth={1.2} />
                <span>
                  <span className={a.metaSm} style={{ display: 'block' }} >
                    Creators matched
                  </span>
                  <span style={{ fontSize: 16 }}>{featured.matched}</span>
                </span>
              </span>
              <Button size="md" style={{ marginLeft: 'auto' }} onClick={() => nav(`/creator/deals/${featured.id}`)}>
                View details
              </Button>
            </div>
          </section>

          {rest.length === 0 ? (
            <Card padding="none" style={{ marginTop: 14 }}>
              <EmptyState title="No deals match this filter" sub="Try another category or widen your deal filters." action="Adjust filters" onAction={() => nav('/creator/deals/filters')} />
            </Card>
          ) : (
            <div className={a.stack} style={{ marginTop: 14 }}>
              {rest.map((d) => {
                const saved = state.saved.includes(d.id)
                return (
                  <div key={d.id} className={s.dealRow}>
                    <button type="button" className={s.dealThumb} onClick={() => nav(`/creator/deals/${d.id}`)} aria-label={`Open ${d.name}`}>
                      <Art kind={d.art} />
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <button type="button" style={{ textAlign: 'left', display: 'block', width: '100%' }} onClick={() => nav(`/creator/deals/${d.id}`)}>
                        <div className={s.dealName}>{d.name}</div>
                        <div className={s.dealBy}>by {d.brand}</div>
                        <div className={s.dealPay}>
                          AED {d.min}K – {d.max}K
                        </div>
                      </button>
                      <div className={s.dealFoot}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {d.formats.map((f) => (
                            <Chip key={f} size="xs" leading={<Icon icon={f === 'Video' ? PlayIcon : f === 'Photo' ? Image01Icon : SmartPhone01Icon} size={12} />}>
                              {f === 'Story' && d.id === 'eid-edit' ? 'Story frames' : f}
                            </Chip>
                          ))}
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div className={a.metaSm}>Due {d.due}</div>
                          <div className={a.metaSm}>{d.matched} matched</div>
                        </div>
                      </div>
                    </div>
                    <div className={s.dealTop}>
                      {d.isNew && (
                        <Chip size="xs" tone="tint">
                          New
                        </Chip>
                      )}
                      <IconButton label={saved ? 'Unsave deal' : 'Save deal'} variant="plain" size="sm" active={saved} onClick={() => { toggleSaved(d.id); toast(saved ? 'Removed from saved' : 'Deal saved') }}>
                        <Icon icon={Bookmark02Icon} size={20} />
                      </IconButton>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className={a.banner} style={{ marginTop: 14 }}>
            <IconTile icon={SecurityCheckIcon} size={62} iconSize={28} />
            <div className={a.bannerBody}>
              <div className={a.bannerTitle} style={{ fontSize: 17 }}>
                Safe. Secure. Transparent.
              </div>
              <div className={a.bannerSub}>Escrow protection, clear briefs, and on-time payouts. Always.</div>
            </div>
            <Button size="md" variant="soft" onClick={() => nav('/support')}>
              Learn more
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
