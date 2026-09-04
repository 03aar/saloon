import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, ArrowLeft02Icon, Bookmark02Icon, GridViewIcon, Menu01Icon, Moon02Icon, MoreHorizontalIcon, SecurityCheckIcon, SentIcon, StarIcon, Target02Icon, Tick02Icon, TradeUpIcon, UserAdd01Icon, UserGroupIcon, UserIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Card } from '../../components/Card'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { shortlistGroups } from '../../data/mock'
import a from '../../components/app.module.css'

const groupIcon = { star: StarIcon, trend: TradeUpIcon, target: Target02Icon }

export default function Shortlist() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('shortlist')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [removed, setRemoved] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>(() => shortlistGroups.flatMap((g) => g.creators.map((c) => c.id)))

  const groups = shortlistGroups.map((g) => ({ ...g, creators: g.creators.filter((c) => !removed.includes(c.id)) }))
  const total = groups.reduce((n, g) => n + g.creators.length, 0)
  const toggleSel = (id: string) => setSelected((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <>
            <IconButton label="Add creators" onClick={() => nav('/discover')}>
              <Icon icon={UserAdd01Icon} size={20} />
            </IconButton>
            <IconButton label="More" onClick={() => toast('Rename, share or archive this shortlist', 'info')}>
              <Icon icon={MoreHorizontalIcon} size={20} />
            </IconButton>
          </>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Shortlist
      </h1>
      <p className={a.sub} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {total} creators for Ramadan Glow <Icon icon={Moon02Icon} size={18} color="var(--gold)" />
      </p>

      {loading ? (
        <ScreenSkeleton hero={90} tiles={3} rows={2} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : total === 0 ? (
        <Card padding="none" style={{ marginTop: 22 }}>
          <EmptyState icon={Bookmark02Icon} title="Your shortlist is empty" sub="Add creators from Discover to start building your Ramadan Glow line-up." action="Discover creators" onAction={() => nav('/discover')} />
        </Card>
      ) : (
        <>
          <div className={a.grid3} style={{ marginTop: 20 }}>
            {[
              [Bookmark02Icon, String(total), 'Creators'],
              [UserGroupIcon, '1.2M', 'Est. reach'],
              [Wallet02Icon, 'AED 210K', 'Est. budget'],
            ].map(([ic, v, l]) => (
              <div key={l as string} className={a.stat} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 14px' }}>
                <Icon icon={ic as typeof StarIcon} size={26} strokeWidth={1.3} />
                <div>
                  <div className="display" style={{ fontSize: 20, whiteSpace: 'nowrap' }}>
                    {v as string}
                  </div>
                  <div className={a.metaSm}>{l as string}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={a.between} style={{ marginTop: 16 }}>
            <button type="button" className={a.row} style={{ gap: 6, fontSize: 15, color: 'var(--ink-2)' }} onClick={() => toast('Sorted by relevance', 'info')}>
              Sort by: <b style={{ fontWeight: 500, color: 'var(--ink)' }}>Relevance</b> <Icon icon={ArrowDown01Icon} size={16} />
            </button>
            <div className={a.row} style={{ gap: 8, fontSize: 15, color: 'var(--ink-2)' }}>
              View:
              <IconButton label="Grid view" size="sm" active={view === 'grid'} onClick={() => setView('grid')}>
                <Icon icon={GridViewIcon} size={18} />
              </IconButton>
              <IconButton label="List view" size="sm" active={view === 'list'} onClick={() => setView('list')}>
                <Icon icon={Menu01Icon} size={18} />
              </IconButton>
            </div>
          </div>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            {groups.map((g, gi) => {
              const open = !collapsed.includes(g.id)
              return (
                <section key={g.id} style={{ marginTop: gi ? 26 : 0 }}>
                  <div className={a.between}>
                    <div className={a.row} style={{ gap: 10 }}>
                      <span style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                        <Icon icon={groupIcon[g.icon]} size={18} />
                      </span>
                      <h2 className="display" style={{ fontSize: 28 }}>
                        {g.title}
                      </h2>
                    </div>
                    <button type="button" onClick={() => setCollapsed((l) => (open ? [...l, g.id] : l.filter((x) => x !== g.id)))} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 14px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 14 }}>
                      {g.creators.length} creators <Icon icon={ArrowDown01Icon} size={16} style={{ transform: open ? 'none' : 'rotate(-90deg)' }} />
                    </button>
                  </div>
                  {open && (
                    <div style={{ display: view === 'grid' ? 'flex' : 'block', gap: 10, overflowX: 'auto', margin: '14px calc(-1 * var(--page-x)) 0', padding: '0 var(--page-x) 4px' }}>
                      {g.creators.map((c) => {
                        const on = selected.includes(c.id)
                        return view === 'grid' ? (
                          <div key={c.id} style={{ position: 'relative', flexShrink: 0, width: 150, padding: '18px 12px 12px', borderRadius: 18, border: '1px solid var(--line)', background: 'var(--surface)', textAlign: 'left' }}>
                            <button type="button" aria-label="Remove from shortlist" onClick={() => setRemoved((l) => [...l, c.id])} style={{ position: 'absolute', right: 12, top: -1, width: 24, height: 30, background: 'var(--gold)', clipPath: 'polygon(0 0,100% 0,100% 100%,50% 75%,0 100%)' }} />
                            <Avatar name={c.name} size={104} tone={c.tone} portrait />
                            <div className="display" style={{ fontSize: 18, marginTop: 12, lineHeight: 1.1 }}>
                              {c.name}
                            </div>
                            <div className={a.metaSm} style={{ marginTop: 4 }}>
                              {c.country}
                            </div>
                            <div className={a.metaSm} style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Icon icon={UserIcon} size={13} /> {c.followers}
                            </div>
                            <div className={a.metaSm} style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Icon icon={TradeUpIcon} size={13} /> {c.er}
                            </div>
                            <button type="button" aria-pressed={on} aria-label={on ? 'Deselect' : 'Select'} onClick={() => toggleSel(c.id)} style={{ margin: '12px auto 0', display: 'flex', width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line-strong)'}`, alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', background: on ? 'var(--gold-tint)' : 'transparent' }}>
                              {on && <Icon icon={Tick02Icon} size={20} strokeWidth={2.2} />}
                            </button>
                          </div>
                        ) : (
                          <div key={c.id} className={a.listRow}>
                            <Avatar name={c.name} size={52} tone={c.tone} portrait />
                            <div className={a.listRowBody}>
                              <div className={a.listRowTitle}>{c.name}</div>
                              <div className={a.listRowSub}>
                                {c.country} • {c.followers} • {c.er}
                              </div>
                            </div>
                            <button type="button" aria-pressed={on} aria-label={on ? 'Deselect' : 'Select'} onClick={() => toggleSel(c.id)} style={{ width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${on ? 'var(--gold)' : 'var(--line-strong)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                              {on && <Icon icon={Tick02Icon} size={18} strokeWidth={2.2} />}
                            </button>
                          </div>
                        )
                      })}
                      {g.id === 'niche' && view === 'grid' && (
                        <button type="button" onClick={() => nav('/discover')} style={{ flexShrink: 0, width: 150, borderRadius: 'var(--r-lg)', border: '1.5px dashed var(--line-strong)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16 }}>
                          <span style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                            <Icon icon={UserAdd01Icon} size={24} />
                          </span>
                          <span style={{ fontSize: 15 }}>Add creators</span>
                          <span className={a.metaSm}>Grow your shortlist</span>
                        </button>
                      )}
                    </div>
                  )}
                </section>
              )
            })}
          </Card>

          <Footer app>
            <Button
              block
              trailing={<Icon icon={SentIcon} size={24} />}
              disabled={selected.length === 0}
              onClick={() => {
                update({ campaign: { ...state.campaign, shortlist: selected } })
                toast(`Group offer drafted for ${selected.length} creators`)
                nav('/create/budget')
              }}
              style={{ justifyContent: 'space-between', paddingLeft: 26, fontFamily: 'var(--font-display)', fontSize: 24 }}
            >
              Send group offer
            </Button>
            <span className={a.footnote}>
              <Icon icon={SecurityCheckIcon} size={14} color="var(--gold)" /> Only you and your team can view this shortlist
            </span>
          </Footer>
        </>
      )}
    </Page>
  )
}
