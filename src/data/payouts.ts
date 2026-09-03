export type Payout = { id: string; status: 'Approved' | 'Paid'; date: string; amount: string; campaign: string; invoice: string; release: string }

export const payouts: Payout[] = [
  { id: 'p1', status: 'Approved', date: 'Apr 28, 2026', amount: 'AED 21,800', campaign: 'Summer Campaign', invoice: 'INV-78241', release: 'May 20, 2026' },
  { id: 'p2', status: 'Paid', date: 'Apr 14, 2026', amount: 'AED 24,500', campaign: 'Eid Collection Reveal', invoice: 'INV-78102', release: 'Apr 14, 2026' },
  { id: 'p3', status: 'Paid', date: 'Mar 31, 2026', amount: 'AED 19,000', campaign: 'Scented Moments', invoice: 'INV-77930', release: 'Mar 31, 2026' },
  { id: 'p4', status: 'Paid', date: 'Mar 16, 2026', amount: 'AED 21,000', campaign: 'Summer Skin Edit', invoice: 'INV-77811', release: 'Mar 16, 2026' },
  { id: 'p5', status: 'Paid', date: 'Feb 28, 2026', amount: 'AED 21,800', campaign: 'Winter Warmth', invoice: 'INV-77540', release: 'Feb 28, 2026' },
]
