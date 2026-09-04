export type Creator = {
  id: string
  name: string
  arabicName?: string
  city: string
  country: string
  tags: string[]
  fit: number
  gcc: number
  rateFrom: string
  followers: string
  er: string
  avgViews: string
  about: string
  languages: string[]
  tone: 'rose' | 'sand' | 'olive' | 'stone' | 'noir' | 'cream'
  topMatch?: boolean
  /** Derived from `country` — every creator in this dataset is GCC-based. */
  region: 'GCC' | 'Global'
  /** Numeric starting rate (AED), parsed from `rateFrom`, for budget-range filtering. */
  budgetFrom: number
  /** Audience age range this creator's followers skew toward. */
  audienceAge: [number, number]
  /** Content formats this creator offers, for the Refine "Deliverables" filter. */
  deliverables: string[]
}

export const creators: Creator[] = [
  {
    id: 'mira-alia',
    name: 'Mira Alia',
    arabicName: 'ميرا عليا',
    city: 'Dubai',
    country: 'UAE',
    tags: ['Beauty', 'Lifestyle', 'Luxury'],
    fit: 94,
    gcc: 71,
    rateFrom: 'AED 8.5K',
    followers: '512K',
    er: '6.7%',
    avgViews: '12.3M',
    about:
      'Dubai-based content creator sharing beauty, lifestyle and everyday luxury. Fluent in Arabic and English.',
    languages: ['العربية', 'English'],
    tone: 'sand',
    topMatch: true,
    region: 'GCC',
    budgetFrom: 8500,
    audienceAge: [20, 34],
    deliverables: ['Instagram post', 'Instagram story', 'Reel'],
  },
  {
    id: 'nouf-al-qasimi',
    name: 'Nouf Al Qasimi',
    city: 'Riyadh',
    country: 'KSA',
    tags: ['Beauty', 'Fashion'],
    fit: 92,
    gcc: 65,
    rateFrom: 'AED 7.5K',
    followers: '356K',
    er: '4.8%',
    avgViews: '8.1M',
    about: 'Riyadh-based beauty and fashion creator with a focus on modern elegance and modest style.',
    languages: ['العربية', 'English'],
    tone: 'rose',
    region: 'GCC',
    budgetFrom: 7500,
    audienceAge: [22, 36],
    deliverables: ['Instagram post', 'Reel', 'TikTok video'],
  },
  {
    id: 'leen-haddad',
    name: 'Leen Haddad',
    city: 'Dubai',
    country: 'UAE',
    tags: ['Beauty', 'Lifestyle'],
    fit: 90,
    gcc: 68,
    rateFrom: 'AED 6K',
    followers: '287K',
    er: '4.6%',
    avgViews: '6.4M',
    about: 'Lifestyle storyteller covering skincare rituals, travel and slow living across the Gulf.',
    languages: ['العربية', 'English'],
    tone: 'stone',
    region: 'GCC',
    budgetFrom: 6000,
    audienceAge: [13, 19],
    deliverables: ['Instagram post', 'Instagram story'],
  },
  {
    id: 'aseel-bahrani',
    name: 'Aseel Bahrani',
    city: 'Doha',
    country: 'Qatar',
    tags: ['Beauty'],
    fit: 88,
    gcc: 60,
    rateFrom: 'AED 5.5K',
    followers: '248K',
    er: '4.3%',
    avgViews: '5.2M',
    about: 'Doha-based creator known for luminous skincare tutorials and product deep-dives.',
    languages: ['العربية', 'English'],
    tone: 'olive',
    region: 'GCC',
    budgetFrom: 5500,
    audienceAge: [24, 40],
    deliverables: ['Instagram post', 'Instagram story'],
  },
  {
    id: 'lama-al-nuaimi',
    name: 'Lama Al-Nuaimi',
    city: 'Dubai',
    country: 'UAE',
    tags: ['Lifestyle', 'Fashion', 'Travel'],
    fit: 91,
    gcc: 71,
    rateFrom: 'AED 7K',
    followers: '420K',
    er: '4.8%',
    avgViews: '9.6M',
    about: 'Fashion and travel creator with a strong GCC audience and premium brand collaborations.',
    languages: ['العربية', 'English'],
    tone: 'noir',
    region: 'GCC',
    budgetFrom: 7000,
    audienceAge: [21, 35],
    deliverables: ['Instagram post', 'Reel', 'YouTube video'],
  },
]

export const recentCreators = [
  { id: 'noor-al-hamad', name: 'Noor Al Hamad', bio: 'Modest fashion & daily style', city: 'Dubai, UAE', followers: '42.3K', tone: 'sand' },
  { id: 'lama-alsubaie', name: 'Lama Alsubaie', bio: 'Modest looks & styling', city: 'Riyadh, Saudi Arabia', followers: '38.7K', tone: 'stone' },
  { id: 'hessa-almarri', name: 'Hessa AlMarri', bio: 'Modest fashion & lifestyle', city: 'Abu Dhabi, UAE', followers: '27.1K', tone: 'noir' },
  { id: 'mariam-aldossari', name: 'Mariam AlDossari', bio: 'Minimal modest style', city: 'Kuwait City, Kuwait', followers: '19.4K', tone: 'cream' },
] as const

export const recommendedSearches = [
  'Modest fashion creators in Dubai',
  'Hijab fashion creators GCC',
  'Abaya style influencers',
  'Modest fashion outfit ideas',
  'Arabic fashion creators',
  'Muslim women styling creators',
]

export type ShortlistCreator = {
  id: string
  name: string
  country: string
  followers: string
  er: string
  tone: Creator['tone']
}

export const shortlistGroups: { id: string; title: string; icon: 'star' | 'trend' | 'target'; creators: ShortlistCreator[] }[] = [
  {
    id: 'premium',
    title: 'Premium fit',
    icon: 'star',
    creators: [
      { id: 'dana-al-qasimi', name: 'Dana Al Qasimi', country: 'UAE', followers: '356K', er: '4.8%', tone: 'rose' },
      { id: 'noor-al-mazrouei', name: 'Noor Al Mazrouei', country: 'Saudi Arabia', followers: '287K', er: '4.6%', tone: 'sand' },
      { id: 'aseel-al-bloushi', name: 'Aseel Al Bloushi', country: 'UAE', followers: '248K', er: '4.3%', tone: 'stone' },
      { id: 'hessa-al-suwaidi', name: 'Hessa Al Suwaidi', country: 'Kuwait', followers: '216K', er: '4.1%', tone: 'olive' },
      { id: 'lama-al-khaled', name: 'Lama Al Khaled', country: 'Qatar', followers: '198K', er: '4.0%', tone: 'cream' },
    ],
  },
  {
    id: 'rising',
    title: 'Rising',
    icon: 'trend',
    creators: [
      { id: 'joud-al-harbi', name: 'Joud Al Harbi', country: 'Saudi Arabia', followers: '142K', er: '5.2%', tone: 'sand' },
      { id: 'maryam-hasan', name: 'Maryam Hasan', country: 'UAE', followers: '128K', er: '5.1%', tone: 'stone' },
      { id: 'hind-al-dossari', name: 'Hind Al Dossari', country: 'Saudi Arabia', followers: '112K', er: '4.9%', tone: 'rose' },
      { id: 'reem-al-kaabi', name: 'Reem Al Kaabi', country: 'UAE', followers: '98K', er: '4.7%', tone: 'olive' },
    ],
  },
  {
    id: 'niche',
    title: 'Niche',
    icon: 'target',
    creators: [
      { id: 'latifa-al-ali', name: 'Latifa Al Ali', country: 'UAE', followers: '76K', er: '6.1%', tone: 'cream' },
      { id: 'sara-al-shehhi', name: 'Sara Al Shehhi', country: 'Oman', followers: '54K', er: '6.3%', tone: 'noir' },
      { id: 'maha-al-mansoori', name: 'Maha Al Mansoori', country: 'Bahrain', followers: '42K', er: '5.8%', tone: 'rose' },
    ],
  },
]

export const compareCreators = [
  { id: 'lama-almarri', name: 'Lama Almarri', city: 'Dubai, UAE', niche: 'Beauty & Skincare', followers: '412K', er: '7.8%', fit: 92, rate: '$4,800 – $6,200', tone: 'noir' as const },
  { id: 'noor-alsaadi', name: 'Noor Alsaadi', city: 'Riyadh, Saudi Arabia', niche: 'Beauty & Lifestyle', followers: '286K', er: '6.4%', fit: 87, rate: '$3,200 – $4,800', tone: 'stone' as const },
  { id: 'hessa-alnaqbi', name: 'Hessa Alnaqbi', city: 'Abu Dhabi, UAE', niche: 'Beauty & Fashion', followers: '198K', er: '5.6%', fit: 78, rate: '$2,200 – $3,400', tone: 'sand' as const },
]

export const campaigns = [
  { id: 'ramadan-2026', name: 'Ramadan 2026', status: 'In review' as const, creators: 18, pieces: 24, spend: '1.26M', spentPct: 62, tone: 'arch' as const },
  { id: 'summer-collection', name: 'Summer Collection', status: 'Live' as const, creators: 12, pieces: 18, spend: '840K', spentPct: 41, tone: 'wave' as const },
  { id: 'glow-launch', name: 'Glow Launch', status: 'Draft' as const, creators: 0, pieces: 0, spend: '0', spentPct: 0, tone: 'gold' as const },
]

export const industries = [
  'Beauty & Personal Care',
  'Fashion & Apparel',
  'Food & Beverage',
  'Technology',
  'Travel & Hospitality',
  'Health & Wellness',
  'Luxury & Jewellery',
  'Home & Lifestyle',
]

export const headquarters = [
  'Dubai, United Arab Emirates',
  'Abu Dhabi, United Arab Emirates',
  'Riyadh, Saudi Arabia',
  'Jeddah, Saudi Arabia',
  'Doha, Qatar',
  'Kuwait City, Kuwait',
  'Manama, Bahrain',
  'Muscat, Oman',
  'London, United Kingdom',
]

export const markets = [
  { id: 'gcc-global', label: 'GCC + Global', hint: 'GCC countries and international markets' },
  { id: 'gcc', label: 'GCC only', hint: 'UAE, KSA, Qatar, Kuwait, Bahrain, Oman' },
  { id: 'global', label: 'Global', hint: 'International markets outside the GCC' },
]

export const goals = [
  { id: 'awareness', label: 'Awareness' },
  { id: 'launch', label: 'Launch' },
  { id: 'ugc', label: 'UGC' },
  { id: 'store-visits', label: 'Store visits' },
  { id: 'ramadan', label: 'Ramadan' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'fitness', label: 'Fitness' },
]

export const defaultTeam = [
  { id: 't1', role: 'Owner', name: 'Faisal Al Zarooni', email: 'faisal@lumenstudios.ae', tag: 'Owner', tone: 'sand' as const, photo: true, access: 'Owner' as const },
  { id: 't2', role: 'Campaign lead', name: 'Maha Al Mansoori', email: 'maha@lumenstudios.ae', tag: 'Lead', tone: 'noir' as const, photo: true, access: 'Admin' as const },
  { id: 't3', role: 'Finance', name: 'Yousef Al Nuaimi', email: 'yousef@lumenstudios.ae', tag: 'Finance', tone: 'noir' as const, photo: false, access: 'Member' as const },
  { id: 't4', role: 'Reviewer', name: 'Reem Al Hefzi', email: 'reem@lumenstudios.ae', tag: 'Reviewer', tone: 'stone' as const, photo: true, access: 'Viewer' as const },
]
