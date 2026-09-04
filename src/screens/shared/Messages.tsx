import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, ArrowRight01Icon, Message01Icon, Notification01Icon, PencilEdit01Icon, Pin02Icon, Search01Icon, SlidersHorizontalIcon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Segmented } from '../../components/Segmented'
import { Art } from '../../components/Art'
import { IconTile } from '../../components/IconTile'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { threads } from '../../data/messages'
import a from '../../components/app.module.css'

export default function Messages() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const role = state.session?.role ?? 'brand'
  const { loading, error, retry } = useLoad(`messages-${role}`)
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const src = threads.filter((t) => t.for === role)
    const byTab = tab === 'unread' ? src.filter((t) => t.unread) : tab === 'archived' ? [] : src
    const term = q.trim().toLowerCase()
    return term ? byTab.filter((t) => `${t.name} ${t.campaign} ${t.preview}`.toLowerCase().includes(term)) : byTab
  }, [role, tab, q])
  const unread = threads.filter((t) => t.for === role && t.unread).length
  const base = role === 'brand' ? '/messages' : '/creator/messages'

  return (
    <Page layout="app">
      {role === 'brand' ? (
        <div className={a.between} style={{ marginTop: 10 }}>
          <button type="button" className={a.row} onClick={() => nav('/profile')}>
            <Avatar name={state.brand.name} size={72} tone="cream" ring="gold" />
            <span style={{ textAlign: 'left' }}>
              <span className="display" style={{ fontSize: 26, display: 'flex', alignItems: 'center', gap: 6 }}>
                {state.brand.name} <Icon icon={ArrowDown01Icon} size={18} />
              </span>
              <span className={a.meta} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 16 }}>
                Brand <Verified size={16} />
              </span>
            </span>
          </button>
          <div className={a.actions}>
            <IconButton label="Search" size="lg" style={{ borderRadius: 18 }} onClick={() => document.getElementById('msg-search')?.focus()}>
              <Icon icon={Search01Icon} size={22} />
            </IconButton>
            <IconButton label="Notifications" size="lg" dot style={{ borderRadius: 18 }} onClick={() => nav('/notifications')}>
              <Icon icon={Notification01Icon} size={22} />
            </IconButton>
          </div>
        </div>
      ) : null}
      <div className={a.between} style={{ marginTop: role === 'brand' ? 22 : 16, alignItems: 'flex-start' }}>
        <div>
          <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(50px, 14vw, 68px)' }}>
            Messages
          </h1>
          <p className={a.sub}>{role === 'brand' ? 'Stay in sync with creators and move campaigns forward.' : 'Your conversations with brands'}</p>
        </div>
        {role === 'creator' && (
          <div className={a.actions}>
            <IconButton label="Filter" size="lg" onClick={() => toast('Filter conversations (demo)', 'info')}>
              <Icon icon={SlidersHorizontalIcon} size={20} />
            </IconButton>
            <IconButton label="New message" size="lg" onClick={() => toast('Start a new conversation from a deal', 'info')}>
              <Icon icon={PencilEdit01Icon} size={20} />
            </IconButton>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 14, height: 64, padding: '0 20px', borderRadius: 20, border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <Icon icon={Search01Icon} size={24} color="var(--ink-2)" />
          <input id="msg-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages" aria-label="Search messages" style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontSize: 18 }} />
        </label>
        {role === 'brand' && (
          <IconButton label="Filters" size="lg" style={{ borderRadius: 18, width: 64, height: 64 }} onClick={() => toast('Filter by campaign or status', 'info')}>
            <Icon icon={SlidersHorizontalIcon} size={22} />
          </IconButton>
        )}
      </div>

      {role === 'brand' && (
        <div style={{ marginTop: 18 }}>
          <Segmented variant="dark" items={[{ id: 'all', label: 'All', count: threads.filter((t) => t.for === role).length }, { id: 'unread', label: 'Unread', count: unread }, { id: 'archived', label: 'Archived' }]} value={tab} onChange={setTab} />
        </div>
      )}

      {loading ? (
        <ScreenSkeleton hero={0} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : list.length === 0 ? (
        <Card padding="none" style={{ marginTop: 18 }}>
          <EmptyState icon={Message01Icon} title={q ? 'No matches' : 'No conversations here'} sub={q ? `Nothing matches “${q}”.` : 'Conversations you archive will appear here.'} action={q ? 'Clear search' : undefined} onAction={() => setQ('')} />
        </Card>
      ) : (
        <div className={a.stack} style={{ marginTop: 18 }}>
          {list.map((t) => (
            <Card key={t.id} padding="md" radius="xl" onClick={() => nav(`${base}/${t.id}`)}>
              <div style={{ display: 'flex', gap: 18 }}>
                <Avatar name={t.name} size={role === 'brand' ? 150 : 140} tone={t.tone} portrait={t.photo} shape={role === 'brand' ? 'circle' : 'square'} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={a.between} style={{ alignItems: 'flex-start' }}>
                    <div className="display" style={{ fontSize: 32, display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.05 }}>
                      {t.name} {t.verified && <Verified size={18} />}
                    </div>
                    <span className={a.meta} style={{ whiteSpace: 'nowrap' }}>
                      {t.time}
                    </span>
                  </div>
                  {role === 'brand' ? (
                    <div style={{ marginTop: 10 }}>
                      <Chip size="sm" tone="tintLight">
                        {t.campaign}
                      </Chip>
                    </div>
                  ) : null}
                  <div className={a.between} style={{ alignItems: 'flex-start', marginTop: 10 }}>
                    <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.45, flex: 1 }}>{t.preview}</p>
                    {t.unread && <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6 }} />}
                  </div>
                  {role === 'creator' && (
                    <>
                      <div style={{ marginTop: 12 }}>
                        <Chip size="sm" tone="tintLight">
                          {t.campaign}
                        </Chip>
                      </div>
                      <div className={a.between} style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                        <span className={a.row} style={{ gap: 10, fontSize: 14, color: 'var(--muted)' }}>
                          <Avatar name={t.contact} size={30} tone="stone" portrait /> {t.contact} &nbsp;•&nbsp; {t.title}
                        </span>
                        <Icon icon={Pin02Icon} size={18} color="var(--muted)" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}

          <Card padding="none" radius="xl">
            <div style={{ display: 'grid', gridTemplateColumns: role === 'brand' ? '40% 1fr' : '1fr 40%', gap: 18, alignItems: 'center', padding: 20 }}>
              {role === 'brand' && (
                <span style={{ position: 'relative', height: 200, borderRadius: 18, overflow: 'hidden', display: 'block' }}>
                  <Art kind="marble" />
                  <span style={{ position: 'absolute', right: 14, bottom: 14 }}>
                    <IconTile icon={Message01Icon} tone="outline" size={64} iconSize={28} />
                  </span>
                </span>
              )}
              <div>
                <div className="display" style={{ fontSize: 26, lineHeight: 1.1 }}>
                  Keep conversations moving
                </div>
                <p className={a.meta} style={{ marginTop: 8, fontSize: 15 }}>
                  {role === 'brand' ? 'Reply faster, share approvals, and keep campaigns on track.' : 'Quick replies, files, and details in one place.'}
                </p>
                {role === 'brand' ? (
                  <button type="button" className={a.link} style={{ marginTop: 14, fontSize: 17 }} onClick={() => toast('Best practices guide (demo)', 'info')}>
                    View best practices <Icon icon={ArrowRight01Icon} size={16} />
                  </button>
                ) : (
                  <Button size="sm" style={{ marginTop: 14 }} onClick={() => toast('Messaging tips (demo)', 'info')}>
                    Learn More
                  </Button>
                )}
              </div>
              {role === 'creator' && (
                <span style={{ height: 180, borderRadius: 18, overflow: 'hidden', display: 'block' }}>
                  <Art kind="silk" />
                </span>
              )}
            </div>
          </Card>
        </div>
      )}
    </Page>
  )
}
