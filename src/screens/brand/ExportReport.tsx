import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, Calendar03Icon, ArrowDown01Icon, Csv01Icon, DatabaseIcon, Download04Icon, FavouriteIcon, Link04Icon, MoreHorizontalIcon, Pdf01Icon, SecurityCheckIcon, SquareLock02Icon, TradeUpIcon, UserGroupIcon, ViewIcon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Sparkline } from '../../components/Charts'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const formats = [
  { id: 'pdf', icon: Pdf01Icon, t: 'PDF report', d: 'Comprehensive report with charts, insights, and campaign summary.', m: 'Includes approvals & notes', mi: SecurityCheckIcon, label: 'PDF' },
  { id: 'csv', icon: Csv01Icon, t: 'CSV metrics', d: 'Raw performance data for deeper analysis and reporting.', m: 'All metrics & breakdowns', mi: DatabaseIcon, label: 'CSV' },
  { id: 'link', icon: Link04Icon, t: 'Share link', d: 'Secure link to view the report online with your team or stakeholders.', m: 'View-only • Expires in 30 days', mi: SquareLock02Icon, label: '' },
]

export default function ExportReport() {
  const nav = useNavigate()
  const { id = 'ramadan-2026' } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`export-${id}`)
  const [fmt, setFmt] = useState('pdf')
  const [busy, setBusy] = useState(false)

  const generate = () => {
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      toast(fmt === 'link' ? 'Share link copied to clipboard' : `${fmt.toUpperCase()} report ready — check your downloads`)
    }, 1200)
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        center={
          <span className="display" style={{ fontSize: 24 }}>
            Report Export
          </span>
        }
        right={
          <IconButton label="More" onClick={() => toast('Schedule recurring reports (demo)', 'info')}>
            <Icon icon={MoreHorizontalIcon} size={20} />
          </IconButton>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Export report
      </h1>
      <p className={a.sub}>Download, share, or analyze your campaign performance in your preferred format.</p>

      {loading ? (
        <ScreenSkeleton hero={380} tiles={0} rows={3} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card tone="dark" padding="none" style={{ marginTop: 22 }} radius="xl" className={a.dark}>
            <div style={{ padding: '22px 22px 0' }}>
              <div className={a.between} style={{ alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: 'var(--gold)', fontSize: 15 }}>
                    Campaign <span style={{ opacity: 0.6 }}>•</span> Summer Glow 2026
                  </div>
                  <div style={{ fontSize: 18, marginTop: 4 }}>Overview</div>
                </div>
                <button type="button" onClick={() => toast('Date range picker (demo)', 'info')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 15 }}>
                  <Icon icon={Calendar03Icon} size={16} /> May 1 – May 31 <Icon icon={ArrowDown01Icon} size={14} />
                </button>
              </div>
              <div className={a.splitStats} style={{ marginTop: 26, textAlign: 'center' }}>
                {[
                  [UserGroupIcon, 'Creators', '24', '+20%'],
                  [ViewIcon, 'Impressions', '1.8M', '+32%'],
                  [FavouriteIcon, 'Engagements', '128K', '+28%'],
                  [TradeUpIcon, 'Total Spend', '$86.2K', '+12%'],
                ].map(([ic, l, v, d]) => (
                  <div key={l as string}>
                    <span style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(201,162,74,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                      <Icon icon={ic as typeof ViewIcon} size={24} />
                    </span>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 12 }}>{l as string}</div>
                    <div className={a.num} style={{ color: '#fff', marginTop: 6, fontSize: 30 }}>
                      {v as string}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gold)', marginTop: 6 }}>• {d as string}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 160, marginTop: 10, color: '#fff' }}>
              <Sparkline data={[8, 14, 20, 24, 22, 30, 34, 32, 40, 46, 42, 48, 50, 58]} />
            </div>
          </Card>

          <div className={a.stack} style={{ marginTop: 16 }}>
            {formats.map((f) => {
              const on = fmt === f.id
              return (
                <Card key={f.id} padding="md" radius="xl" as="button" onClick={() => setFmt(f.id)} style={{ borderColor: on ? 'var(--gold)' : undefined, boxShadow: on ? '0 0 0 3px rgba(201,162,74,0.12)' : undefined }} aria-pressed={on}>
                  <div className={a.row} style={{ gap: 18 }}>
                    <span style={{ width: 118, height: 118, borderRadius: 22, border: '1px solid var(--line)', background: 'var(--surface)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--gold)', flexShrink: 0, boxShadow: 'var(--shadow-xs)' }}>
                      <Icon icon={f.icon} size={48} strokeWidth={1.2} />
                      {f.label && <span style={{ fontSize: 14, letterSpacing: '0.06em', fontWeight: 500 }}>{f.label}</span>}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="display" style={{ fontSize: 32 }}>
                        {f.t}
                      </div>
                      <p className={a.meta} style={{ marginTop: 6, fontSize: 16, lineHeight: 1.4 }}>
                        {f.d}
                      </p>
                      <div className={a.metaSm} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon icon={f.mi} size={16} /> {f.m}
                      </div>
                    </div>
                    <span style={{ width: 60, height: 60, borderRadius: '50%', border: `1px solid ${on ? 'var(--gold)' : 'var(--line)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: on ? 'var(--gold-deep)' : 'var(--ink)', flexShrink: 0 }}>
                      <Icon icon={ArrowRight01Icon} size={20} />
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>

          <Footer app>
            <Button block loading={busy} leading={<Icon icon={Download04Icon} size={22} />} onClick={generate} style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
              Generate report
            </Button>
            <span className={a.footnote}>
              <Icon icon={SquareLock02Icon} size={14} /> Your data is encrypted and secure
            </span>
          </Footer>
        </>
      )}
    </Page>
  )
}
