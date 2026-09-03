import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight01Icon, Building03Icon, Female02Icon, Globe02Icon, MoreHorizontalIcon, PieChart01Icon, SecurityCheckIcon, StarIcon, UserGroupIcon, UserIcon, City01Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Avatar } from '../../components/Avatar'
import { Verified } from '../../components/Verified'
import { Card } from '../../components/Card'
import { Sparkline } from '../../components/Charts'
import { Art, type ArtKind } from '../../components/Art'
import { ScreenSkeleton, ErrorState } from '../../components/Skeleton'
import { ScreenHeader } from '../../components/ScreenHeader'
import { useLoad } from '../../lib/useLoad'
import { useToast } from '../../components/Toast'
import { creators } from '../../data/mock'
import a from '../../components/app.module.css'
import s from './brand.module.css'

const cultural: { icon: typeof UserGroupIcon; title: string; fit: string; desc: string; art: ArtKind }[] = [
  { icon: UserGroupIcon, title: 'Audience values', fit: 'Strong alignment', desc: 'Quality, style, and authenticity resonate with your brand.', art: 'silk' },
  { icon: SecurityCheckIcon, title: 'Brand safety', fit: 'High fit', desc: 'Positive sentiment, minimal risk, and brand-safe content.', art: 'gold' },
  { icon: Globe02Icon, title: 'Cultural relevance', fit: 'Strong fit', desc: 'Content reflects local culture and GCC audience interests.', art: 'arch' },
]

export default function AudienceFit() {
  const nav = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const { loading, error, retry } = useLoad(`fit-${id}`)
  const c = creators.find((x) => x.id === id) ?? creators[4]

  return (
    <Page layout="app">
      <div className={a.between} style={{ marginTop: 10 }}>
        <IconButton label="Back" onClick={() => nav(-1)}>
          <Icon icon={ArrowRight01Icon} size={22} style={{ transform: 'rotate(180deg)' }} />
        </IconButton>
        <IconButton label="More options" onClick={() => toast('Export or share these insights from this menu', 'info')}>
          <Icon icon={MoreHorizontalIcon} size={22} />
        </IconButton>
      </div>

      <div className={a.row} style={{ marginTop: 18 }}>
        <Avatar name={c.name} size={110} tone={c.tone} portrait />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 19, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            {c.name} <Verified size={18} />
          </div>
          <div className={a.meta} style={{ marginTop: 4 }}>
            {c.tags.join(' • ')}
          </div>
          <div className={a.meta}>
            {c.city}, {c.country}
          </div>
        </div>
        <Button size="md" variant="soft" onClick={() => nav(`/creators/${c.id}`)}>
          View Profile
        </Button>
      </div>

      <ScreenHeader title="Audience fit" sub="Understand reach, engagement, and cultural alignment across GCC." />

      {loading ? (
        <ScreenSkeleton hero={380} tiles={3} rows={1} />
      ) : error ? (
        <ErrorState onAction={retry} />
      ) : (
        <>
          <section className={[s.heroDark, a.dark].join(' ')} style={{ marginTop: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 42%', gap: 14, position: 'relative' }}>
              <div>
                <span className={a.darkEyebrow}>Overall insight</span>
                <div className={s.heroTitle} style={{ fontSize: 44 }}>
                  Strong GCC fit
                </div>
                <p className={s.heroSub} style={{ maxWidth: 'none' }}>
                  High relevance in your priority markets with consistent engagement.
                </p>
              </div>
              <div style={{ height: 150, color: '#fff' }}>
                <Sparkline data={[20, 26, 24, 36, 34, 48, 44, 60, 58, 74]} grid />
              </div>
            </div>
            <div className={a.splitStats} style={{ marginTop: 26 }}>
              {[
                ['Reach', c.followers, 'Total audience'],
                ['Engagement', c.er, 'Avg. engagement rate'],
                ['GCC share', `${c.gcc}%`, 'Audience in GCC'],
              ].map(([l, v, d]) => (
                <div key={l}>
                  <div className={a.label} style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {l}
                  </div>
                  <div className={a.numLg} style={{ color: '#fff', marginTop: 12 }}>
                    {v}
                  </div>
                  <div className={a.metaSm} style={{ color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>
                    {d}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={a.section}>
            <div className={a.between} style={{ marginBottom: 12 }}>
              <div className={a.title}>Top GCC regions</div>
              <button type="button" className={a.link} onClick={() => toast('Full regional breakdown (demo)', 'info')}>
                View all
              </button>
            </div>
            <div className={s.regions}>
              {[
                ['UAE', '42%', Building03Icon],
                ['KSA', '21%', City01Icon],
                ['Kuwait', '8%', Building03Icon],
              ].map(([n, v, ic]) => (
                <button key={n as string} type="button" className={s.region} onClick={() => toast(`${n}: ${v} of audience`, 'info')}>
                  <Icon icon={ic as typeof Building03Icon} size={28} strokeWidth={1.2} />
                  <b>{n as string}</b>
                  <span>{v as string}</span>
                  <Icon icon={ArrowRight01Icon} size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className={a.section}>
            <h2 className="display" style={{ fontSize: 28 }}>
              Cultural fit
            </h2>
            <p className={a.meta} style={{ marginTop: 4, marginBottom: 14 }}>
              How well the creator’s content aligns with your brand.
            </p>
            <div className={s.cultural}>
              {cultural.map((k) => (
                <div key={k.title} className={s.cultCard}>
                  <div className={s.cultArt}>
                    <span style={{ width: 46, height: 46, borderRadius: '50%', background: '#fff', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon icon={k.icon} size={20} />
                    </span>
                    <Art kind={k.art} />
                  </div>
                  <div className={s.cultBody}>
                    <b>{k.title}</b>
                    <em>{k.fit}</em>
                    <p>{k.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card padding="md" style={{ marginTop: 16 }} radius="xl">
            <div className={a.between}>
              <h3 className="display" style={{ fontSize: 24 }}>
                Audience breakdown
              </h3>
              <button type="button" className={a.link} onClick={() => toast('Detailed demographics (demo)', 'info')}>
                View details
              </button>
            </div>
            <div className={a.splitStats} style={{ marginTop: 16 }}>
              {[
                [UserIcon, '78%', 'Women'],
                [Female02Icon, '22%', 'Men'],
                [PieChart01Icon, '18–34', '62%'],
                [StarIcon, 'Top cities', 'Dubai, Riyadh, Jeddah'],
              ].map(([ic, v, l], i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Icon icon={ic as typeof UserIcon} size={22} color="var(--gold)" />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{v as string}</div>
                    <div className={a.metaSm}>{l as string}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </Page>
  )
}
