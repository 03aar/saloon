import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight02Icon, Bookmark02Icon, DollarCircleIcon, InformationCircleIcon, PencilEdit02Icon, SparklesIcon, UserGroupIcon, UserStar01Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { IconTile } from '../../components/IconTile'
import { Bars } from '../../components/Charts'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { useLoad } from '../../lib/useLoad'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import { compareCreators } from '../../data/mock'
import a from '../../components/app.module.css'

export default function Compare() {
  const nav = useNavigate()
  const { state, update } = useApp()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad('compare')
  const [picked, setPicked] = useState<string[]>([])
  const toggle = (id: string) => setPicked((l) => (l.includes(id) ? l.filter((x) => x !== id) : l.length < 3 ? [...l, id] : l))

  const pts = compareCreators.map((c, i) => ({ x: 16 + i * 34, y: 40 - (c.fit - 70) * 1.1 }))
  const path = `M -4 ${pts[0].y + 8} C 6 ${pts[0].y}, 8 ${pts[0].y}, ${pts[0].x} ${pts[0].y} S ${pts[1].x - 10} ${pts[1].y}, ${pts[1].x} ${pts[1].y} S ${pts[2].x - 10} ${pts[2].y}, ${pts[2].x} ${pts[2].y} S 104 ${pts[2].y + 6}, 106 ${pts[2].y + 10}`

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={PencilEdit02Icon} size={18} />} onClick={() => nav('/create')}>
            Edit selection
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Compare creators
      </h1>
      <p className={a.sub}>Review and compare your top matches side by side.</p>
      <div style={{ marginTop: 14 }}>
        <Chip leading={<Icon icon={SparklesIcon} size={18} color="var(--gold)" />}>Beauty • GCC • Reel • Feb 10 – Feb 24</Chip>
      </div>

      {loading ? (
        <ScreenSkeleton hero={560} tiles={2} rows={0} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <Card tone="dark" padding="none" style={{ marginTop: 18 }} radius="xl" className={a.dark}>
            <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 17 }}>
                Overall fit <Icon icon={InformationCircleIcon} size={16} />
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, border: '1px solid rgba(248,188,88,0.5)', color: 'var(--gold)', fontSize: 14 }}>
                <Icon icon={SparklesIcon} size={14} /> Based on your brief
              </span>
            </div>
            <div style={{ position: 'relative', height: 120, marginTop: 10 }}>
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden>
                <path d={path} fill="none" stroke="var(--gold)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              </svg>
              {compareCreators.map((c, i) => (
                <div key={c.id} style={{ position: 'absolute', left: `${pts[i].x}%`, top: `${(pts[i].y / 60) * 100}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16, transform: 'translateY(-6px)' }}>{c.fit}%</span>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', border: '3px solid var(--gold)' }} />
                </div>
              ))}
            </div>
            <div className={a.grid3} style={{ gap: 0, padding: '0 8px 22px' }}>
              {compareCreators.map((c, i) => {
                const on = picked.includes(c.id)
                return (
                  <button key={c.id} type="button" aria-pressed={on} onClick={() => toggle(c.id)} style={{ padding: '0 8px', borderLeft: i ? '1px solid rgba(255,255,255,0.1)' : 'none', textAlign: 'center', color: '#fff' }}>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar name={c.name} size={104} tone={c.tone} portrait ring={on ? 'gold' : 'none'} />
                      <span style={{ position: 'absolute', left: 0, top: 0, width: 30, height: 30, borderRadius: '50%', background: i === 0 ? 'var(--gold)' : 'var(--surface-3)', color: i === 0 ? '#fff' : 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18 }}>
                        {i + 1}
                      </span>
                    </span>
                    <div style={{ marginTop: 14, fontSize: 17, fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                      {c.name} <Verified size={16} />
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{c.city}</div>
                    <div style={{ marginTop: 10 }}>
                      <Chip size="xs" tone="dark">
                        {c.niche}
                      </Chip>
                    </div>
                    <div style={{ marginTop: 16, fontSize: 17, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                      <Icon icon={UserGroupIcon} size={16} /> {c.followers}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Followers</div>
                    <div style={{ marginTop: 14, fontSize: 17 }}>{c.er}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Eng. rate</div>
                  </button>
                )
              })}
            </div>
          </Card>

          <div className={a.grid2} style={{ marginTop: 14 }}>
            <Card padding="md" radius="xl">
              <div className={a.between} style={{ alignItems: 'flex-start' }}>
                <span style={{ fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Audience quality <Icon icon={InformationCircleIcon} size={14} />
                </span>
                <IconTile icon={UserStar01Icon} size={44} iconSize={20} />
              </div>
              <div className="display" style={{ fontSize: 40, color: 'var(--gold-deep)', marginTop: 6 }}>
                High
              </div>
              <p className={a.meta} style={{ marginTop: 8, lineHeight: 1.4 }}>
                Very authentic audience with strong engagement quality.
              </p>
              <div style={{ marginTop: 18 }}>
                <Bars data={[1, 1, 1, 1, 1]} height={40} activeIndex={undefined} color="var(--surface-3)" />
                <div style={{ display: 'flex', gap: 8, marginTop: -40, height: 40, alignItems: 'flex-end' }}>
                  {[0.7, 0.85, 1, 0, 0].map((h, i) => (
                    <span key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: 6, background: 'var(--gold)' }} />
                  ))}
                </div>
              </div>
              <div className={a.between} style={{ marginTop: 16 }}>
                <span className={a.meta}>Quality score</span>
                <span>
                  <b style={{ color: 'var(--gold-deep)', fontWeight: 500 }}>4.1</b> <span className={a.meta}>/ 5</span>
                </span>
              </div>
            </Card>
            <Card padding="md" radius="xl">
              <div className={a.between} style={{ alignItems: 'flex-start' }}>
                <span style={{ fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Rate range (USD) <Icon icon={InformationCircleIcon} size={14} />
                </span>
                <IconTile icon={DollarCircleIcon} size={44} iconSize={20} />
              </div>
              <div style={{ marginTop: 8 }}>
                {compareCreators.map((c) => (
                  <div key={c.id} className={a.between} style={{ padding: '14px 0', borderBottom: '1px solid var(--line)', fontSize: 15 }}>
                    <span style={{ color: 'var(--ink-2)' }}>{c.name}</span>
                    <span>{c.rate}</span>
                  </div>
                ))}
              </div>
              <p className={a.metaSm} style={{ marginTop: 12 }}>
                Rates may vary based on scope.
              </p>
            </Card>
          </div>

          <div className={a.banner} style={{ marginTop: 14 }}>
            <IconTile icon={SparklesIcon} tone="gold" size={48} iconSize={22} />
            <div className={a.bannerBody}>
              <div className={a.bannerTitle}>Shortlist up to 3 creators to continue</div>
              <div className={a.bannerSub}>You can also save and review later.</div>
            </div>
            <Button size="sm" variant="soft" leading={<Icon icon={Bookmark02Icon} size={16} />} onClick={() => toast('Comparison saved')}>
              Save comparison
            </Button>
          </div>

          <Footer app>
            <Button
              block
              spread
              trailing={<Icon icon={ArrowRight02Icon} size={22} />}
              disabled={picked.length === 0}
              onClick={() => {
                update({ shortlist: Array.from(new Set([...state.shortlist, ...picked])) })
                nav('/shortlist')
              }}
            >
              Choose shortlist ({picked.length}/3)
            </Button>
          </Footer>
        </>
      )}
    </Page>
  )
}
