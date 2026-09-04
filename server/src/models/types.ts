// Shared entity types persisted in Cosmos DB. Field naming mirrors
// src/data/mock.ts and src/store/AppContext.tsx in the frontend where
// applicable, extended with the fields a real backend needs (ids, auth,
// timestamps, relations).

export type Role = 'brand' | 'creator'

export type AccessLevel = 'Owner' | 'Admin' | 'Member' | 'Viewer'

export type Tone = 'rose' | 'sand' | 'olive' | 'stone' | 'noir' | 'cream'

export interface UserDoc {
  id: string
  role: Role
  name: string
  email: string
  passwordHash: string
  company?: string
  emailVerified: boolean
  verificationToken?: string
  verificationTokenExpiresAt?: string
  resetToken?: string
  resetTokenExpiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface CampaignDoc {
  id: string
  brandId: string
  name: string
  status: 'Draft' | 'In review' | 'Live' | 'Completed'
  objectives: string[]
  description: string
  dates: string
  category: string
  budget: number
  tier: string
  shortlist: string[]
  creators: number
  pieces: number
  spend: string
  spentPct: number
  tone: string
  createdAt: string
  updatedAt: string
}

export interface CreatorDoc {
  id: string
  name: string
  arabicName?: string
  city: string
  country: string
  region: 'GCC' | 'Global'
  tags: string[]
  fit: number
  gcc: number
  rateFrom: string
  rateMin: number
  rateMax: number
  followers: string
  engagementRate: number // numeric, e.g. 6.7 for "6.7%"
  er: string
  avgViews: string
  about: string
  languages: string[]
  deliverables: string[]
  tone: Tone
  topMatch?: boolean
  createdAt: string
  updatedAt: string
}

export interface ThreadDoc {
  id: string
  participantIds: string[]
  brandId?: string
  creatorId?: string
  subject?: string
  lastMessageAt: string
  createdAt: string
}

export interface MessageDoc {
  id: string
  threadId: string
  senderId: string
  senderName: string
  body: string
  createdAt: string
  readBy: string[]
}

export interface OfferDoc {
  id: string
  campaignId: string
  creatorId: string
  brandId: string
  amount: number
  status: 'pending' | 'accepted' | 'declined' | 'countered'
  message?: string
  createdAt: string
  updatedAt: string
}

export interface NotificationDoc {
  id: string
  userId: string
  type: string
  title: string
  body?: string
  read: boolean
  createdAt: string
}

export interface TeamMemberDoc {
  id: string
  brandId: string
  role: string
  name: string
  email: string
  tag: string
  tone: Tone
  photo: boolean
  access: AccessLevel
  createdAt: string
  updatedAt: string
}
