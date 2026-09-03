import type { Tone } from '../components/Avatar'

export type Draft = { id: string; name: string; campaign: string; deliverable: string; len: string; frames: number; due: string; ago: string; tone: Tone; photo: boolean }

export const drafts: Draft[] = [
  { id: 'd1', name: 'Mira Al Farsi', campaign: 'Luxe Reveal', deliverable: 'IG Reel', len: '28s', frames: 6, due: 'Due Tomorrow', ago: 'Submitted 2h ago', tone: 'sand', photo: true },
  { id: 'd2', name: 'Layla Hassan', campaign: 'Glow Launch', deliverable: 'IG Story Set', len: '3 slides', frames: 3, due: 'Due in 2 days', ago: 'Submitted 6h ago', tone: 'noir', photo: true },
  { id: 'd3', name: 'Omar Khalid', campaign: 'Urban Edge', deliverable: 'TikTok Video', len: '45s', frames: 4, due: 'Due in 3 days', ago: 'Submitted 9h ago', tone: 'stone', photo: true },
  { id: 'd4', name: 'Sara Al Mansoori', campaign: 'Summer Drop', deliverable: 'IG Reel', len: '30s', frames: 5, due: 'Due in 4 days', ago: 'Submitted 11h ago', tone: 'cream', photo: false },
]
