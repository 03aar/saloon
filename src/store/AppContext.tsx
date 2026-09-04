import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultTeam, type Creator } from '../data/mock'

export type Role = 'brand' | 'creator'

export type Session = {
  role: Role
  email: string
  name: string
  company?: string
}

export type BrandProfile = {
  name: string
  industry: string
  website: string
  hq: string
  tagline: string
}

export type Planning = {
  goals: string[]
  market: string
  budget: [number, number]
}

export type AccessLevel = 'Owner' | 'Admin' | 'Member' | 'Viewer'

export type TeamMember = {
  id: string
  role: string
  name: string
  email: string
  tag: string
  tone: 'sand' | 'noir' | 'stone' | 'rose' | 'olive' | 'cream'
  photo: boolean
  access: AccessLevel
}

export type Approvals = Record<'content' | 'budget' | 'contract' | 'payout', string>

export type Filters = {
  region: 'GCC' | 'Global' | 'Both'
  categories: string[]
  age: [number, number]
  engagement: number
  budget: [number, number]
  deliverables: string[]
}

export type CampaignDraft = {
  name: string
  objectives: string[]
  description: string
  dates: string
  category: string
  budget: number
  tier: string
  shortlist: string[]
}

export type AppState = {
  session: Session | null
  pendingRole: Role
  brand: BrandProfile
  planning: Planning
  team: TeamMember[]
  approvals: Approvals
  onboardingComplete: boolean
  saved: string[]
  shortlist: string[]
  filters: Filters
  campaign: CampaignDraft
  searchQuery: string
}

const STORAGE_KEY = 'bloop.state.v1'

export const defaultFilters: Filters = {
  region: 'Both',
  categories: ['Beauty'],
  age: [18, 35],
  engagement: 3,
  budget: [5000, 25000],
  deliverables: ['Instagram post', 'Instagram story', 'Reel'],
}

// Minimum engagement rate (%) required for each "Engagement quality" step in Refine.
const ENGAGEMENT_THRESHOLDS = [0, 1, 2, 3, 5]

/** Whether a mock Creator satisfies the current `state.filters`. Used by Discover and Search. */
export function matchesFilters(creator: Creator, filters: Filters): boolean {
  if (filters.region !== 'Both' && creator.region !== filters.region) return false

  if (filters.categories.length > 0 && !creator.tags.some((t) => filters.categories.includes(t))) return false

  const [ageMin, ageMax] = filters.age
  const [cAgeMin, cAgeMax] = creator.audienceAge
  if (cAgeMax < ageMin || cAgeMin > ageMax) return false

  const erNum = parseFloat(creator.er)
  const minEngagement = ENGAGEMENT_THRESHOLDS[filters.engagement] ?? 0
  if (!Number.isNaN(erNum) && erNum < minEngagement) return false

  const [budgetMin, budgetMax] = filters.budget
  if (creator.budgetFrom < budgetMin || creator.budgetFrom > budgetMax) return false

  if (filters.deliverables.length > 0 && !creator.deliverables.some((d) => filters.deliverables.includes(d))) return false

  return true
}

const initialState: AppState = {
  session: null,
  pendingRole: 'brand',
  brand: {
    name: 'Noura Beauty Co.',
    industry: 'Beauty & Personal Care',
    website: 'nourabeauty.com',
    hq: 'Dubai, United Arab Emirates',
    tagline: 'Beauty that empowers.',
  },
  planning: {
    goals: [],
    market: 'gcc-global',
    budget: [50, 100],
  },
  team: defaultTeam,
  approvals: {
    content: 'Require 2 of 3 to approve',
    budget: 'Require 2 of 3 to approve',
    contract: 'Require 2 of 3 to approve',
    payout: 'Require 2 of 3 to approve',
  },
  onboardingComplete: false,
  saved: [],
  shortlist: [],
  filters: defaultFilters,
  campaign: {
    name: 'Ramadan Glow Launch',
    objectives: ['awareness'],
    description:
      'Introduce our new skincare collection launching this Ramadan. We’re looking for creators who can authentically showcase the glow journey through engaging content that resonates with our audience across GCC and beyond.',
    dates: 'Mar 1 – Mar 31',
    category: 'Beauty',
    budget: 84000,
    tier: 'premium',
    shortlist: [],
  },
  searchQuery: 'modest fashion creators',
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return { ...initialState, ...parsed, filters: { ...defaultFilters, ...(parsed.filters ?? {}) } }
  } catch {
    return initialState
  }
}

type Ctx = {
  state: AppState
  update: (patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => void
  signIn: (s: Session) => void
  signOut: () => void
  toggleSaved: (id: string) => void
  toggleShortlist: (id: string) => void
  reset: () => void
}

const AppContext = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable */
    }
  }, [state])

  const update = useCallback<Ctx['update']>((patch) => {
    setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  }, [])

  const signIn = useCallback((session: Session) => {
    setState((s) => ({
      ...s,
      session,
      brand: session.company ? { ...s.brand, name: session.company } : s.brand,
    }))
  }, [])

  const signOut = useCallback(() => {
    setState((s) => ({ ...initialState, brand: s.brand, planning: s.planning, team: s.team }))
  }, [])

  const toggleSaved = useCallback((id: string) => {
    setState((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] }))
  }, [])

  const toggleShortlist = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : [...s.shortlist, id],
    }))
  }, [])

  const reset = useCallback(() => setState(initialState), [])

  const value = useMemo(() => ({ state, update, signIn, signOut, toggleSaved, toggleShortlist, reset }), [
    state,
    update,
    signIn,
    signOut,
    toggleSaved,
    toggleShortlist,
    reset,
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
