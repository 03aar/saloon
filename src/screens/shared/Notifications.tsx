import { useNavigate } from 'react-router-dom'
import { ArrowRight01Icon, ChartIncreaseIcon, FileValidationIcon, Notification01Icon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Art } from '../../components/Art'
import { ScreenSkeleton, ErrorState, EmptyState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import a from '../../components/app.module.css'

type N = { t: string; d: string; time: string; unread?: boolean; kind: 'avatar' | 'icon' | 'art' | 'mono'; icon?: typeof Wallet02Icon; name?: string; to: string }

export default function Notifications() {
  const nav = useNavigate()
  const { state } = useApp()
  const role = state.session?.role ?? 'brand'
  const { loading, error, retry } = useLoad(`notifications-${role}`)

  const groups: { label: string; items: N[] }[] =
    role === 'creator'
      ? [
          {
            label: 'Today',
            items: [
              { t: 'Noura viewed your pitch', d: 'She viewed your pitch for the Lumière campaign.', time: '22m ago', unread: true, kind: 'avatar', name: 'Noura', to: '/creator/pitch/sent' },
              { t: 'Draft approved', d: 'Your pitch for the Oasis campaign has been approved.', time: '1h ago', unread: true, kind: 'icon', icon: FileValidationIcon, to: '/creator/collabs' },
              { t: 'Payout scheduled', d: 'AED 8,750.00 will be paid on May 18, 2026.', time: '2h ago', unread: true, kind: 'icon', icon: Wallet02Icon, to: '/creator/earnings' },
            ],
          },
          { label: 'Yesterday', items: [{ t: 'New deal match', d: 'A skincare brand in Dubai wants to collaborate with you.', time: 'Yesterday, 4:35 PM', unread: true, kind: 'art', to: '/creator/deals' }] },
          {
            label: 'This week',
            items: [
              { t: 'Collab invite received', d: 'Studio Riviera invited you to collaborate.', time: 'May 12, 11:20 AM', kind: 'mono', name: 'Studio Riviera', to: '/creator/collabs' },
              { t: 'Analytics milestone', d: 'Your profile views are up 32% this week.', time: 'May 11, 9:10 AM', kind: 'icon', icon: ChartIncreaseIcon, to: '/creator/analytics' },
            ],
          },
        ]
      : [
          {
            label: 'Today',
            items: [
              { t: 'Mira submitted a draft', d: 'A new IG Reel draft is waiting for your review.', time: '2h ago', unread: true, kind: 'avatar', name: 'Mira Alia', to: '/approvals/d1' },
              { t: '3 creator matches ready', d: 'High alignment with your Ramadan Glow brief.', time: '4h ago', unread: true, kind: 'icon', icon: ChartIncreaseIcon, to: '/compare' },
              { t: 'Payout released', d: 'SAR 12,500 released to Lama Almarri.', time: '6h ago', kind: 'icon', icon: Wallet02Icon, to: '/campaigns/ramadan-2026' },
            ],
          },
          { label: 'Yesterday', items: [{ t: 'Contract signed', d: 'Noor Alsaadi signed the Summer Collection contract.', time: 'Yesterday, 3:10 PM', kind: 'icon', icon: FileValidationIcon, to: '/campaigns/summer-collection' }] },
        ]

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <IconButton label="Notifications" size="lg" onClick={() => nav(-1)}>
          <Icon icon={Notification01Icon} size={24} />
        </IconButton>
        <span style={{ position: 'relative' }}>
          <Avatar name={state.session?.name ?? 'You'} size={72} tone={role === 'creator' ? 'noir' : 'cream'} portrait={role === 'creator'} />
          <span style={{ position: 'absolute', right: 2, top: 2, width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)', border: '2px solid var(--bg)' }} />
        </span>
      </div>
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Notifications
      </h1>
      <p className={a.sub}>Stay updated on your {role === 'creator' ? 'deals, collaborations and earnings' : 'campaigns, creators and approvals'}.</p>

      {loading ? (
        <ScreenSkeleton hero={0} tiles={0} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : groups.length === 0 ? (
        <EmptyState icon={Notification01Icon} title="You’re all caught up" sub="New activity will appear here." />
      ) : (
        groups.map((g) => (
          <section key={g.label} className={a.section}>
            <div style={{ fontSize: 20, marginBottom: 12 }}>{g.label}</div>
            <div className={a.stack}>
              {g.items.map((n) => (
                <Card key={n.t} padding="md" radius="xl" onClick={() => nav(n.to)}>
                  <div className={a.row} style={{ gap: 18 }}>
                    {n.kind === 'avatar' && <Avatar name={n.name!} size={140} tone="noir" portrait />}
                    {n.kind === 'icon' && <IconTile icon={n.icon!} size={140} iconSize={64} tone="tint" strokeWidth={1.1} />}
                    {n.kind === 'mono' && <Avatar name={n.name!} size={110} tone="cream" />}
                    {n.kind === 'art' && (
                      <span style={{ width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <Art kind="marble" />
                      </span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 22, fontWeight: 500 }}>{n.t}</div>
                      <p className={a.meta} style={{ fontSize: 16, marginTop: 4, lineHeight: 1.4 }}>
                        {n.d}
                      </p>
                      <div className={a.metaSm} style={{ marginTop: 8 }}>
                        {n.time}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
                      {n.unread && <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--gold)' }} />}
                      <Icon icon={ArrowRight01Icon} size={20} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}
    </Page>
  )
}
