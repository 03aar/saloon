import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Airplane01Icon, ArrowLeft02Icon, ArrowRight02Icon, Bookmark02Icon, Building03Icon, Diamond01Icon, GiftIcon, PerfumeIcon, ShoppingBag02Icon, SlidersHorizontalIcon, Video01Icon, Wallet02Icon } from '@hugeicons/core-free-icons'
import { Page, Footer, TopBar } from '../../components/Page'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Icon } from '../../components/Icon'
import { Chip } from '../../components/Chip'
import { Card } from '../../components/Card'
import { Toggle } from '../../components/Toggle'
import { RangeSlider } from '../../components/RangeSlider'
import { IconTile } from '../../components/IconTile'
import { useToast } from '../../components/Toast'
import a from '../../components/app.module.css'

const cats = [
  { l: 'Beauty', i: PerfumeIcon },
  { l: 'Luxury', i: Diamond01Icon },
  { l: 'Dubai', i: Building03Icon },
  { l: 'Arabic', i: null },
  { l: 'Video', i: Video01Icon },
  { l: 'AED 10K+', i: Wallet02Icon },
]

export default function DealFilters() {
  const nav = useNavigate()
  const { toast } = useToast()
  const [sel, setSel] = useState<string[]>(['Beauty', 'Video'])
  const [range, setRange] = useState<[number, number]>([2000, 50000])
  const [types, setTypes] = useState({ gifted: false, paid: true, travel: true })
  const count = 12 + sel.length * 4 + (types.gifted ? 6 : 0)
  const fmt = (v: number) => `AED ${v.toLocaleString()}${v >= 50000 ? '+' : ''}`

  return (
    <Page layout="app">
      <TopBar
        left={
          <IconButton label="Back" variant="plain" onClick={() => nav('/creator/deals')}>
            <Icon icon={ArrowLeft02Icon} size={26} />
          </IconButton>
        }
        right={
          <IconButton label="Filter presets" size="lg" style={{ borderRadius: 18 }} onClick={() => toast('Saved filter presets (demo)', 'info')}>
            <Icon icon={SlidersHorizontalIcon} size={22} />
          </IconButton>
        }
      />
      <h1 className={['display', a.h1].join(' ')} style={{ marginTop: 22 }}>
        Deal Filters
      </h1>
      <p className={a.sub}>Refine deals that match your content, audience and goals.</p>

      <div className={a.section}>
        <div style={{ fontSize: 24 }}>Categories</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {cats.map((c) => (
            <Chip key={c.l} selected={sel.includes(c.l)} selectedStyle="outline" onClick={() => setSel((l) => (l.includes(c.l) ? l.filter((x) => x !== c.l) : [...l, c.l]))} leading={c.i ? <Icon icon={c.i} size={22} color="var(--gold)" /> : <span style={{ fontFamily: 'var(--font-arabic)', color: 'var(--gold)', fontSize: 22, lineHeight: 1 }}>ض</span>} className="" >
              <span style={{ fontSize: 18, padding: '10px 4px', display: 'inline-block' }}>{c.l}</span>
            </Chip>
          ))}
        </div>
        <button type="button" className={a.link} style={{ marginTop: 14, fontSize: 17 }} onClick={() => toast('Category editor (demo)', 'info')}>
          Edit categories
        </button>
      </div>

      <div className={a.section}>
        <div style={{ fontSize: 24 }}>Payout range</div>
        <Card padding="md" style={{ marginTop: 14 }} radius="xl">
          <div className={a.between}>
            <div>
              <div style={{ fontSize: 20 }}>{fmt(range[0])}</div>
              <div className={a.meta}>Min</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20 }}>{fmt(range[1])}</div>
              <div className={a.meta}>Max</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <Chip size="sm" tone="tintLight">
              Selected range
            </Chip>
            <div style={{ fontSize: 18, marginTop: 8 }}>
              {fmt(range[0])} &nbsp;–&nbsp; {fmt(range[1])}
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <RangeSlider min={500} max={50000} step={500} value={range} onChange={setRange} minLabel="500" maxLabel="50K+" ariaLabel="Payout" />
          </div>
        </Card>
      </div>

      <div className={a.section}>
        <div style={{ fontSize: 24 }}>Deal type</div>
        <Card padding="none" style={{ marginTop: 14 }} radius="xl">
          {[
            { k: 'gifted' as const, i: GiftIcon, t: 'Gifted', d: 'Receive products or services' },
            { k: 'paid' as const, i: ShoppingBag02Icon, t: 'Paid', d: 'Monetary compensation' },
            { k: 'travel' as const, i: Airplane01Icon, t: 'Travel', d: 'Trips and experiences' },
          ].map((r, i) => (
            <div key={r.k} className={a.row} style={{ padding: '16px 20px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <IconTile icon={r.i} size={64} iconSize={28} tone="tint" strokeWidth={1.3} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 500 }}>{r.t}</div>
                <div className={a.meta}>{r.d}</div>
              </div>
              <Toggle checked={types[r.k]} onChange={(v) => setTypes({ ...types, [r.k]: v })} label={r.t} />
            </div>
          ))}
        </Card>
      </div>

      <Footer app>
        <Button block spread trailing={<Icon icon={ArrowRight02Icon} size={22} />} onClick={() => { toast(`Showing ${count} deals`); nav('/creator/deals') }}>
          Show {count} deals
        </Button>
        <div className={a.between}>
          <button type="button" className={a.link} style={{ gap: 10 }} onClick={() => toast('Filter saved')}>
            <IconTile icon={Bookmark02Icon} size={44} iconSize={20} tone="outline" /> Save this filter
          </button>
          <button type="button" style={{ fontSize: 17 }} onClick={() => { setSel([]); setRange([500, 50000]); setTypes({ gifted: true, paid: true, travel: true }) }}>
            Clear all
          </button>
        </div>
      </Footer>
    </Page>
  )
}
