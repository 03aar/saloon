import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight02Icon, SparklesIcon } from '@hugeicons/core-free-icons'
import { Icon } from '../../components/Icon'
import { Art } from '../../components/Art'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { insights } from '../../data/insights'
import { useSeo } from '../../components/Seo'
import m from './marketing.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease },
}

export default function Pulse() {
  useSeo({
    title: 'Bloop Pulse',
    description: 'Data, playbooks and guides on creator marketing across the GCC, from the Bloop team.',
    path: '/pulse',
  })
  const nav = useNavigate()
  const [featured, ...rest] = insights

  return (
    <motion.main className={m.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.4, ease }}>
      <MarketingNav />

      <section className={[m.mesh, m.hero].join(' ')}>
        <div className={m.meshContent}>
          <div className={m.container}>
            <span className={m.heroKicker}>
              <Icon icon={SparklesIcon} size={15} color="var(--primary)" />
              Bloop Pulse
            </span>
            <h1 className={m.heroTitle} style={{ fontSize: 'clamp(38px, 5.6vw, 64px)' }}>
              Data and playbooks from the marketplace.
            </h1>
            <p className={m.heroSub}>Rate benchmarks, campaign breakdowns and guides from Team Bloop — for the brands and creators building on the platform.</p>
          </div>
        </div>
      </section>

      <section className={m.section} style={{ paddingTop: 0 }}>
        <div className={m.container}>
          <motion.button
            type="button"
            className={m.card}
            style={{ display: 'flex', alignItems: 'center', gap: 28, textAlign: 'left', width: '100%' }}
            onClick={() => nav(`/pulse/${featured.slug}`)}
            {...fadeUp}
          >
            <span style={{ width: 220, height: 180, borderRadius: 18, overflow: 'hidden', flexShrink: 0 }}>
              <Art kind={featured.art} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className={m.articleKicker}>{featured.kicker}</span>
              <span className={m.articleTitle} style={{ display: 'block', fontSize: 26, marginTop: 8 }}>
                {featured.title}
              </span>
              <p className={m.cardDesc} style={{ marginTop: 10, maxWidth: 520 }}>
                {featured.excerpt}
              </p>
              <span className={m.articleMeta} style={{ marginTop: 14, display: 'block' }}>
                {featured.author} · {featured.date} · {featured.readMins} min read
              </span>
            </span>
            <Icon icon={ArrowRight02Icon} size={22} />
          </motion.button>

          <div style={{ marginTop: 8 }}>
            {rest.map((a) => (
              <button key={a.slug} type="button" className={m.articleRow} onClick={() => nav(`/pulse/${a.slug}`)}>
                <span className={m.articleThumb}>
                  <Art kind={a.art} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className={m.articleKicker}>{a.kicker}</span>
                  <span className={m.articleTitle} style={{ display: 'block' }}>
                    {a.title}
                  </span>
                  <span className={m.articleMeta}>
                    {a.author} · {a.date} · {a.readMins} min read
                  </span>
                </span>
                <Icon icon={ArrowRight02Icon} size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
