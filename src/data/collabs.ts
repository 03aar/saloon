import type { ArtKind } from '../components/Art'

export type Collab = { id: string; brand: string; campaign: string; status: 'Draft' | 'In progress' | 'Review'; progress: number; payout: string; dueDays: number; art: ArtKind }

export const collabs: Collab[] = [
  { id: 'summer-glow', brand: 'Lumière Haus', campaign: 'Ramadan Glow Launch', status: 'Draft', progress: 58, payout: 'AED 18K', dueDays: 2, art: 'arch' },
  { id: 'amber-skies', brand: 'Amber Skies', campaign: 'Scented Moments Campaign', status: 'In progress', progress: 72, payout: 'AED 12K', dueDays: 5, art: 'gold' },
  { id: 'bare-co', brand: 'Bare & Co.', campaign: 'Summer Skin Edit', status: 'In progress', progress: 41, payout: 'AED 9K', dueDays: 9, art: 'silk' },
  { id: 'nourah-oud', brand: 'Nourah Oud', campaign: 'Eid Collection Reveal', status: 'Review', progress: 85, payout: 'AED 14K', dueDays: 12, art: 'marble' },
]
