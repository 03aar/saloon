import { useNavigate } from 'react-router-dom'
import { ArrowDown01Icon, ArrowRight01Icon, BankIcon, CheckmarkCircle02Icon, Clock01Icon, DollarCircleIcon, InformationCircleIcon, Notification01Icon, SecurityCheckIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Chip } from '../../components/Chip'
import { Avatar } from '../../components/Avatar'
import { IconTile } from '../../components/IconTile'
import { Bars } from '../../components/Charts'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { payouts } from '../../data/payouts'
import a from '../../components/app.module.css'


export default function Earnings() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('earnings')

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 16 }}>
        <h1 className={['display', a.h1].join(' ')} style={{ fontSize: 'clamp(54px, 15vw, 74px)' }}>
          Earnings
        </h1>
        <div className={a.actions} style={{ alignItems: 'center' }}>
          <IconButton label="Notifications" variant="plain" dot onClick={() => nav('/notifications')}>
            <Icon icon={Notification01Icon} size={24} />
          </IconButton>
          <button type="button" aria-label="Profile" onClick={() => nav('/creator/settings')}>
            <Avatar name={state.session?.name ?? 'Mira'} size={72} tone="noir" portrait />
          </button>
        </div>
      </div>

      {loading ? (
        <ScreenSkeleton hero={380} tiles={3} rows={4} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card tone="dark" padding="md" style={{ marginTop: 22, position: 'relative', overflow: 'hidden' }} radius="xl" className={a.dark}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>
                  Available to payout <Icon icon={InformationCircleIcon} size={16} />
                </div>
                <div className={a.numXl} style={{ color: '#fff', marginTop: 12, fontSize: 60 }}>
                  AED 42,800
                </div>
                <div className={a.status} style={{ marginTop: 12, color: 'var(--gold)', fontSize: 17 }}>
                  <i />
                  Ready
                </div>
                <div style={{ marginTop: 44, color: 'rgba(255,255,255,0.65)', fontSize: 17 }}>Total earnings</div>
                <div style={{ fontSize: 22, marginTop: 4 }}>AED 126,450</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ height: 180, paddingTop: 20 }}>
                  <Bars data={[20, 35, 30, 50, 60, 75, 100]} gap={10} radius={3} color="var(--gold)" height={180} />
                </div>
                <button type="button" onClick={() => toast('This month • Last month • This year', 'info')} style={{ color: '#fff', fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                  This month <Icon icon={ArrowDown01Icon} size={16} />
                </button>
              </div>
            </div>
          </Card>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            <div className={a.splitStats} style={{ textAlign: 'center' }}>
              {[
                [Clock01Icon, 'Pending', 'AED 18,550', '3 payouts'],
                [SecurityCheckIcon, 'Approved', 'AED 27,600', '2 payouts'],
                [Tick02Icon, 'Paid', 'AED 86,300', '8 payouts'],
              ].map(([ic, l, v, d]) => (
                <div key={l as string} style={{ padding: '10px 6px' }}>
                  <IconTile icon={ic as typeof Clock01Icon} size={84} iconSize={30} tone="surface" strokeWidth={1.2} />
                  <div style={{ fontSize: 19, marginTop: 16 }}>{l as string}</div>
                  <div className="display" style={{ fontSize: 26, marginTop: 8 }}>
                    {v as string}
                  </div>
                  <div className={a.meta} style={{ marginTop: 6 }}>
                    {d as string}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="md" style={{ marginTop: 14 }} radius="xl">
            <div className={a.between}>
              <h2 className="display" style={{ fontSize: 30 }}>
                Payout history
              </h2>
              <button type="button" className={a.link} style={{ fontSize: 17 }} onClick={() => toast('Showing full history', 'info')}>
                View all
              </button>
            </div>
            <div style={{ marginTop: 6 }}>
              {payouts.map((p) => (
                <button key={p.id} type="button" className={a.listRow} onClick={() => nav(`/creator/earnings/${p.id}`)} style={{ padding: '18px 0' }}>
                  <IconTile icon={p.status === 'Approved' ? DollarCircleIcon : CheckmarkCircle02Icon} size={70} iconSize={30} tone="outline" strokeWidth={1.2} />
                  <span className={a.listRowBody}>
                    <span style={{ fontSize: 19 }}>Payout – {p.status}</span>
                    <span className={a.meta} style={{ display: 'block', marginTop: 2 }}>
                      {p.date}
                    </span>
                  </span>
                  <span className="display" style={{ fontSize: 26 }}>
                    {p.amount}
                  </span>
                  <Icon icon={ArrowRight01Icon} size={20} />
                </button>
              ))}
            </div>
          </Card>

          <div className={a.banner} style={{ marginTop: 14, padding: 20 }}>
            <span style={{ width: 100, height: 100, borderRadius: 20, background: 'var(--surface-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon icon={BankIcon} size={44} strokeWidth={1.2} />
            </span>
            <div className={a.bannerBody}>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Payment method</div>
              <div className={a.meta} style={{ fontSize: 17, marginTop: 2 }}>
                Emirates NBD &nbsp;&nbsp;•••• 1234
              </div>
              <div style={{ marginTop: 8 }}>
                <Chip size="xs" tone="tintLight">
                  Verified
                </Chip>
              </div>
            </div>
            <Button size="md" variant="outline" onClick={() => toast('Payment methods (demo)', 'info')} style={{ color: 'var(--gold-deep)' }}>
              Manage
            </Button>
          </div>
        </>
      )}
    </Page>
  )
}
