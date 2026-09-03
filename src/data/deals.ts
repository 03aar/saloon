import type { ArtKind } from '../components/Art'

export type Deal = {
  id: string
  name: string
  brand: string
  min: number
  max: number
  formats: ('Video' | 'Story' | 'Photo')[]
  due: string
  matched: number
  isNew?: boolean
  region: 'GCC' | 'Global'
  art: ArtKind
  category: string
  closes: string
  posted: string
  currency: string
  brief: { objective: string; deliverables: string; deadline: string; budget: string }
}

export const deals: Deal[] = [
  { id: 'ramadan-glow', name: 'Ramadan Glow Launch', brand: 'Noura Beauty Co.', min: 12, max: 18, formats: ['Video', 'Story'], due: 'Jul 10', matched: 96, isNew: true, region: 'GCC', art: 'arch', category: 'Beauty', closes: 'Mar 6', posted: '2h ago', currency: 'SAR', brief: { objective: 'Build excitement for our new Ramadan skincare collection with authentic creator storytelling.', deliverables: '1 Instagram Reel + 3 Stories (Usage rights: 6 months)', deadline: 'Content by Mar 6', budget: 'SAR 12K – 25K' } },
  { id: 'lumen-oud', name: 'Lumen Oud Collection', brand: 'Lumen Fragrances', min: 8, max: 12, formats: ['Video', 'Story'], due: 'Jul 8', matched: 64, isNew: true, region: 'GCC', art: 'gold', category: 'Fragrance', closes: 'Jul 8', posted: '5h ago', currency: 'AED', brief: { objective: 'Introduce the Oud collection to a modern luxury audience across the Gulf.', deliverables: '1 Reel + 2 Stories', deadline: 'Content by Jul 8', budget: 'AED 8K – 12K' } },
  { id: 'eid-edit', name: 'Eid Edit Campaign', brand: 'AURA Jewellery', min: 6, max: 10, formats: ['Photo', 'Story'], due: 'Jul 9', matched: 51, region: 'Global', art: 'silk', category: 'Jewellery', closes: 'Jul 9', posted: '1d ago', currency: 'AED', brief: { objective: 'Showcase the Eid Edit as the season’s gift of choice.', deliverables: '3 Photos + 3 Story frames', deadline: 'Content by Jul 9', budget: 'AED 6K – 10K' } },
  { id: 'silk-reset', name: 'Silk Reset Skincare', brand: 'Silk Lab', min: 5, max: 8, formats: ['Video', 'Story'], due: 'Jul 12', matched: 38, region: 'Global', art: 'marble', category: 'Skincare', closes: 'Jul 12', posted: '2d ago', currency: 'AED', brief: { objective: 'Share a 7-day reset routine with the Silk Reset range.', deliverables: '1 Video + 3 Stories', deadline: 'Content by Jul 12', budget: 'AED 5K – 8K' } },
]
