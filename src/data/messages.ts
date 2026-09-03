import type { Tone } from '../components/Avatar'

export type Thread = {
  id: string
  for: 'brand' | 'creator'
  name: string
  verified: boolean
  campaign: string
  preview: string
  time: string
  unread: boolean
  tone: Tone
  photo: boolean
  contact: string
  title: string
}

export const threads: Thread[] = [
  { id: 'mira-alia', for: 'brand', name: 'Mira Alia', verified: true, campaign: 'Desert Lights Campaign', preview: 'Thanks for sharing the brief. I can send initial ideas by tomorrow.', time: '10:24 AM', unread: true, tone: 'sand', photo: true, contact: 'Mira Alia', title: 'Creator' },
  { id: 'layla-studio', for: 'brand', name: 'Layla Studio', verified: true, campaign: 'Summer Edit Launch', preview: 'Can you confirm the timeline for the first deliverable?', time: 'Yesterday', unread: true, tone: 'cream', photo: false, contact: 'Layla', title: 'Studio' },
  { id: 'omar-visuals', for: 'brand', name: 'Omar Visuals', verified: true, campaign: 'Product Spotlight', preview: 'Here’s the draft from yesterday. Let me know your feedback.', time: 'Mon', unread: false, tone: 'noir', photo: true, contact: 'Omar', title: 'Creator' },
  { id: 'noura-beauty', for: 'creator', name: 'Noura Beauty Co.', verified: true, campaign: 'Offer Received', preview: 'We’d love to collaborate on our summer skincare campaign.', time: '2h', unread: true, tone: 'cream', photo: false, contact: 'Leila Al Mansoori', title: 'Brand Manager' },
  { id: 'velour', for: 'creator', name: 'Velour Fragrance', verified: false, campaign: 'In Discussion', preview: 'Love your content style! Are you available next week for a call?', time: '1d', unread: true, tone: 'noir', photo: false, contact: 'Yara Khoury', title: 'Partnerships Lead' },
  { id: 'aster', for: 'creator', name: 'Aster Atelier', verified: false, campaign: 'Proposal Sent', preview: 'Thanks for the proposal. We’re reviewing it internally.', time: '3d', unread: true, tone: 'stone', photo: false, contact: 'Omar Hassan', title: 'Marketing Director' },
]

export type Msg = { from: 'me' | 'them'; text: string; time: string; seen?: boolean; reaction?: string; card?: 'brief' | 'offer' | 'upload' | 'file' }

export const conversation: Record<'brand' | 'creator', Msg[]> = {
  brand: [
    { from: 'me', text: 'Hi Mira! Excited to collaborate on Summer Radiance 2026 ✨\n\nPlease review the brief and offer below. Let us know if you have any questions.', time: '10:02 AM', card: 'brief' },
    { from: 'me', text: '', time: '10:02 AM', card: 'offer' },
    { from: 'them', text: 'Thanks! The brief looks clear and aligns with my audience. I do have a couple of questions on usage rights.', time: '10:18 AM', reaction: '👍 1' },
    { from: 'me', text: 'Happy to clarify! We’ve included 6 months organic usage across our channels.\nPaid usage can be added as an optional add-on if that works for you.', time: '10:21 AM' },
    { from: 'them', text: 'Perfect, 6 months works. Please share the contract and next steps.', time: '10:24 AM', seen: true },
  ],
  creator: [
    { from: 'them', text: 'Yay! 🎉 We’re so excited to have you on board, Lujain.\n\nWhen you’re ready, please share your first draft for review.', time: '10:12 AM' },
    { from: 'me', text: 'Thank you! I’m finalizing the first draft and will share it shortly.', time: '10:15 AM', seen: true },
    { from: 'them', text: 'Perfect! Please keep the tone aligned with the campaign moodboard we shared.', time: '10:16 AM', card: 'upload' },
    { from: 'me', text: 'Draft uploaded for your review ✨', time: '10:27 AM', seen: true, card: 'file' },
    { from: 'them', text: 'Looks beautiful already! 🙌\nWe’ll review and share feedback soon.', time: '10:32 AM' },
  ],
}
