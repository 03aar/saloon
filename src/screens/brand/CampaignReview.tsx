import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, ArrowRight01Icon, Calendar03Icon, File01Icon, Globe02Icon, SecurityCheckIcon, SentIcon, SparklesIcon, SquareLock02Icon, Target02Icon, Tick02Icon, UserGroupIcon, ViewIcon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Card } from '../../components/Card'
import { Art } from '../../components/Art'
import { IconTile } from '../../components/IconTile'
import { Avatar, AvatarStack } from '../../components/Avatar'
import { useApp } from '../../store/AppContext'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

export default function CampaignReview() {
  const nav = useNavigate()
  const { state } = useApp()
  const { toast } = useToast()
  const c = state.campaign
  const [sending, setSending] = useState(false)
  const initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('')

  const send = () => {
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      toast('Campaign sent to creators')
      nav('/campaigns', { replace: true })
    }, 1000)
  }

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" onClick={() => nav(-1)}>
            <Icon icon={ArrowLeft02Icon} size={22} />
          </IconButton>
        }
        right={
          <Button size="sm" variant="soft" leading={<Icon icon={ViewIcon} size={18} />} onClick={() => toast('Creator-side preview (demo)', 'info')}>
            Preview
          </Button>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 18 }}>
        Campaign
        <br />
        Review
      </h1>
      <p className={a.sub}>Review every detail before sending to creators.</p>

      <Card tone="dark" padding="none" style={{ marginTop: 22, position: 'relative' }} radius="xl" className={a.dark}>
        <span style={{ position: 'absolute', inset: 0 }}>
          <Art kind="noir" />
        </span>
        <div style={{ position: 'relative', padding: 24 }}>
          <span style={{ width: 84, height: 84, borderRadius: 18, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--gold)' }}>
            {initials}
          </span>
          <div className="display" style={{ fontSize: 40, color: '#fff', marginTop: 18, lineHeight: 1.05, maxWidth: '75%' }}>
            {c.name}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 10, maxWidth: 300 }}>Celebrate the season with radiance. Showcase our new collection.</p>
          <div className={a.splitStats} style={{ marginTop: 22 }}>
            {[
              [Target02Icon, 'Campaign objective', c.objectives[0] ? c.objectives[0].replace('-', ' ').replace(/^\w/, (m) => m.toUpperCase()) : 'Awareness'],
              [Globe02Icon, 'Markets', 'GCC + Global'],
              [UserGroupIcon, 'Creators', '25–35'],
            ].map(([ic, l, v]) => (
              <div key={l as string} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon icon={ic as typeof Globe02Icon} size={34} strokeWidth={1.2} color="var(--gold)" />
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{l as string}</div>
                  <div style={{ fontSize: 15, marginTop: 2 }}>{v as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className={a.twoCol} style={{ marginTop: 14 }}>
        <Card padding="md" radius="xl" onClick={() => nav('/create/budget')}>
          <div className={a.between}>
            <IconTile icon={Wallet02Icon} size={56} iconSize={26} />
            <IconButton label="Edit budget" size="sm">
              <Icon icon={ArrowRight01Icon} size={16} />
            </IconButton>
          </div>
          <div style={{ fontSize: 17, marginTop: 18 }}>Budget</div>
          <div className="display" style={{ fontSize: 30, marginTop: 6 }}>
            SAR {(c.budget * 1.8).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className={a.divider} style={{ margin: '16px 0 12px' }} />
          {[
            ['Total budget', `SAR ${(c.budget * 1.8).toLocaleString(undefined, { maximumFractionDigits: 0 })}`],
            ['Per creator (avg.)', 'SAR 12,500'],
          ].map(([l, v]) => (
            <div key={l} className={a.between} style={{ fontSize: 14, marginTop: 6 }}>
              <span className={a.meta}>{l}</span>
              <span>{v}</span>
            </div>
          ))}
        </Card>
        <Card padding="md" radius="xl" onClick={() => nav('/create')}>
          <div className={a.between}>
            <IconTile icon={Calendar03Icon} size={56} iconSize={26} />
            <IconButton label="Edit timeline" size="sm">
              <Icon icon={ArrowRight01Icon} size={16} />
            </IconButton>
          </div>
          <div style={{ fontSize: 17, marginTop: 18 }}>Timeline</div>
          <div className="display" style={{ fontSize: 30, marginTop: 6 }}>
            {c.dates}
          </div>
          <div className={a.divider} style={{ margin: '16px 0 12px' }} />
          {[
            ['Briefing', 'Feb 24', true],
            ['Content window', c.dates, false],
            ['Reporting due', 'Apr 7', true],
          ].map(([l, v, g]) => (
            <div key={l as string} className={a.between} style={{ fontSize: 14, marginTop: 6 }}>
              <span className={a.meta}>{l as string}</span>
              <span style={{ color: g ? 'var(--gold-deep)' : 'var(--ink)' }}>{v as string}</span>
            </div>
          ))}
        </Card>
        <Card padding="md" radius="xl" onClick={() => nav('/create/budget')}>
          <div className={a.row}>
            <IconTile icon={File01Icon} size={56} iconSize={26} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17 }}>Deliverables</div>
              <div className="display" style={{ fontSize: 26 }}>
                3 per creator
              </div>
            </div>
            <IconButton label="Edit deliverables" size="sm">
              <Icon icon={ArrowRight01Icon} size={16} />
            </IconButton>
          </div>
          <div className={a.divider} style={{ margin: '16px 0 12px' }} />
          {[
            ['Instagram Post', '1'],
            ['Instagram Story', '3'],
            ['Usage Rights', '30 days'],
          ].map(([l, v]) => (
            <div key={l} className={a.between} style={{ fontSize: 14, marginTop: 8 }}>
              <span className={a.meta}>{l}</span>
              <span style={{ color: 'var(--gold-deep)' }}>{v}</span>
            </div>
          ))}
        </Card>
        <Card padding="md" radius="xl">
          <div className={a.row}>
            <IconTile icon={SecurityCheckIcon} size={56} iconSize={26} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17 }}>Approvals</div>
              <div className="display" style={{ fontSize: 26 }}>
                2 of 2
              </div>
            </div>
            <IconButton label="View approvals" size="sm" onClick={() => nav('/onboarding/brand/team')}>
              <Icon icon={ArrowRight01Icon} size={16} />
            </IconButton>
          </div>
          <div className={a.divider} style={{ margin: '16px 0 4px' }} />
          {[
            ['Laila Al Mansoori', 'Brand Lead', 'noir'],
            ['Omar Khalid', 'Finance Lead', 'stone'],
          ].map(([n, r, t]) => (
            <div key={n} className={a.row} style={{ marginTop: 12 }}>
              <Avatar name={n} size={44} tone={t as 'noir'} portrait />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{n}</div>
                <div className={a.metaSm}>{r}</div>
              </div>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--gold)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon icon={Tick02Icon} size={16} strokeWidth={2.4} />
              </span>
            </div>
          ))}
        </Card>
      </div>

      <button type="button" className={a.banner} style={{ width: '100%', textAlign: 'left', marginTop: 14 }} onClick={() => nav('/compare')}>
        <IconTile icon={SparklesIcon} size={52} iconSize={24} tone="tint" />
        <span className={a.bannerBody}>
          <span className={a.bannerTitle} style={{ fontSize: 17 }}>
            Matching preview
          </span>
          <span className={a.bannerSub} style={{ display: 'block' }}>
            High fit creators ready to receive this campaign.
          </span>
        </span>
        <AvatarStack names={['Mira Alia', 'Yousef K', 'Leen Haddad']} size={40} more={18} tones={['noir', 'stone', 'sand']} />
        <IconButton label="View matches" size="sm">
          <Icon icon={ArrowRight01Icon} size={16} />
        </IconButton>
      </button>

      <Footer app>
        <Button block loading={sending} leading={<Icon icon={SentIcon} size={22} />} onClick={send}>
          Send to creators
        </Button>
        <span className={a.footnote}>
          <Icon icon={SquareLock02Icon} size={14} /> Creators will be notified and can opt in.
        </span>
      </Footer>
    </Page>
  )
}
