import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { Art } from '../../components/Art'
import { Avatar } from '../../components/Avatar'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { insights } from '../../data/insights'
import { useSeo } from '../../components/Seo'
import m from './marketing.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export default function PulseArticle() {
  const nav = useNavigate()
  const { slug } = useParams()
  const article = insights.find((a) => a.slug === slug)
  const more = insights.filter((a) => a.slug !== slug).slice(0, 3)

  useSeo({
    title: article ? article.title : 'Article not found',
    description: article ? article.excerpt : 'This Bloop Pulse story may have been moved or removed.',
    path: `/pulse/${slug ?? ''}`,
    type: 'article',
  })

  if (!article) {
    return (
      <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MarketingNav />
        <div className={m.containerNarrow} style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h1 className={m.sectionTitle}>Article not found</h1>
          <p className={m.sectionLead} style={{ margin: '12px auto 0' }}>
            This Bloop Pulse story may have been moved or removed.
          </p>
          <button type="button" onClick={() => nav('/pulse')} style={{ marginTop: 24, color: 'var(--primary)', fontWeight: 500 }}>
            Back to Bloop Pulse
          </button>
        </div>
        <Footer />
      </motion.main>
    )
  }

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <article style={{ paddingTop: 48 }}>
        <div className={m.containerNarrow}>
          <button type="button" onClick={() => nav('/pulse')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--ink-2)' }}>
            <Icon icon={ArrowLeft02Icon} size={16} /> Bloop Pulse
          </button>
          <span className={m.articleKicker} style={{ display: 'block', marginTop: 24 }}>
            {article.kicker}
          </span>
          <h1 className={m.heroTitle} style={{ fontSize: 'clamp(32px, 4.6vw, 52px)', margin: '10px 0 0', textAlign: 'left' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
            <Avatar name={article.author} size={40} tone="noir" />
            <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>
              {article.author} · {article.date} · {article.readMins} min read
            </span>
          </div>
        </div>

        <div className={m.containerNarrow} style={{ marginTop: 36 }}>
          <div style={{ aspectRatio: '16 / 8', borderRadius: 28, overflow: 'hidden' }}>
            <Art kind={article.art} />
          </div>
        </div>

        <div className={m.containerNarrow} style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {article.stats && (
            <div className={m.grid3} style={{ marginBottom: 8 }}>
              {article.stats.map((st) => (
                <div key={st.l} className={m.card} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 30, color: 'var(--ink)' }}>{st.v}</div>
                  <div style={{ marginTop: 6, fontSize: 13.5, color: 'var(--muted)' }}>{st.l}</div>
                </div>
              ))}
            </div>
          )}
          {article.body.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              {p}
            </p>
          ))}
          {article.pullQuote && (
            <blockquote style={{ margin: '10px 0', padding: '4px 0 4px 24px', borderLeft: '3px solid var(--primary)', fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.4, color: 'var(--ink)' }}>
              “{article.pullQuote}”
            </blockquote>
          )}
        </div>
      </article>

      <section className={m.section}>
        <div className={m.container}>
          <h2 className={m.sectionTitle} style={{ fontSize: 26 }}>
            More from Bloop Pulse
          </h2>
          <div className={m.grid3} style={{ marginTop: 28 }}>
            {more.map((a) => (
              <button key={a.slug} type="button" className={m.card} style={{ textAlign: 'left' }} onClick={() => nav(`/pulse/${a.slug}`)}>
                <span style={{ display: 'block', aspectRatio: '4 / 3', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
                  <Art kind={a.art} />
                </span>
                <span className={m.articleKicker}>{a.kicker}</span>
                <div className={m.cardTitle} style={{ marginTop: 6 }}>
                  {a.title}
                </div>
                <span className={m.articleMeta} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                  Read story <Icon icon={ArrowRight02Icon} size={14} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
