/**
 * Seeds a freshly bootstrapped Cosmos DB with demo data matching the shape
 * of the frontend's mock data (src/data/mock.ts): creators, campaigns, and
 * a default team, plus one demo brand user and one demo creator user so the
 * API is immediately testable after seeding.
 *
 * Run with: npm run seed
 */
import { randomUUID } from 'crypto'
import { bootstrapDatabase } from '../src/db/bootstrap'
import { containers } from '../src/db/containers'
import { hashPassword } from '../src/services/auth'
import { CampaignDoc, CreatorDoc, TeamMemberDoc, UserDoc } from '../src/models/types'

const DEMO_PASSWORD = 'Password123!'

// Mirrors src/data/mock.ts `creators`
const mockCreators: Array<Omit<CreatorDoc, 'region' | 'rateMin' | 'rateMax' | 'engagementRate' | 'deliverables' | 'createdAt' | 'updatedAt'>> = [
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
    about: 'Dubai-based content creator sharing beauty, lifestyle and everyday luxury. Fluent in Arabic and English.',
    languages: ['العربية', 'English'],
    tone: 'sand',
    topMatch: true,
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
  },
]

function rateRangeFromLabel(label: string): [number, number] {
  // "AED 8.5K" -> approximate a [min, max] band in AED for filtering purposes.
  const match = label.match(/([\d.]+)K/)
  const base = match ? parseFloat(match[1]) * 1000 : 5000
  return [Math.round(base * 0.8), Math.round(base * 1.3)]
}

function engagementFromLabel(label: string): number {
  return parseFloat(label.replace('%', '')) || 0
}

// Mirrors src/data/mock.ts `campaigns` (brandId filled in with the demo brand)
const mockCampaignsBase = [
  { id: 'ramadan-2026', name: 'Ramadan 2026', status: 'In review' as const, creators: 18, pieces: 24, spend: '1.26M', spentPct: 62, tone: 'arch' },
  { id: 'summer-collection', name: 'Summer Collection', status: 'Live' as const, creators: 12, pieces: 18, spend: '840K', spentPct: 41, tone: 'wave' },
  { id: 'glow-launch', name: 'Glow Launch', status: 'Draft' as const, creators: 0, pieces: 0, spend: '0', spentPct: 0, tone: 'gold' },
]

// Mirrors src/data/mock.ts `defaultTeam`
const mockTeamBase = [
  { id: 't1', role: 'Owner', name: 'Faisal Al Zarooni', email: 'faisal@lumenstudios.ae', tag: 'Owner', tone: 'sand' as const, photo: true, access: 'Owner' as const },
  { id: 't2', role: 'Campaign lead', name: 'Maha Al Mansoori', email: 'maha@lumenstudios.ae', tag: 'Lead', tone: 'noir' as const, photo: true, access: 'Admin' as const },
  { id: 't3', role: 'Finance', name: 'Yousef Al Nuaimi', email: 'yousef@lumenstudios.ae', tag: 'Finance', tone: 'noir' as const, photo: false, access: 'Member' as const },
  { id: 't4', role: 'Reviewer', name: 'Reem Al Hefzi', email: 'reem@lumenstudios.ae', tag: 'Reviewer', tone: 'stone' as const, photo: true, access: 'Viewer' as const },
]

async function seed() {
  console.log('Bootstrapping Cosmos DB (database + containers)...')
  await bootstrapDatabase()

  const now = new Date().toISOString()

  console.log('Seeding demo users...')
  const passwordHash = await hashPassword(DEMO_PASSWORD)

  const demoBrandUser: UserDoc = {
    id: 'demo-brand-user',
    role: 'brand',
    name: 'Faisal Al Zarooni',
    email: 'brand@bloop.demo',
    passwordHash,
    company: 'Noura Beauty Co.',
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  }

  const demoCreatorUser: UserDoc = {
    id: 'demo-creator-user',
    role: 'creator',
    name: 'Mira Alia',
    email: 'creator@bloop.demo',
    passwordHash,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  }

  await containers.users().items.upsert(demoBrandUser)
  await containers.users().items.upsert(demoCreatorUser)

  console.log('Seeding creators...')
  for (const c of mockCreators) {
    const [rateMin, rateMax] = rateRangeFromLabel(c.rateFrom)
    const doc: CreatorDoc = {
      ...c,
      region: 'GCC',
      rateMin,
      rateMax,
      engagementRate: engagementFromLabel(c.er),
      deliverables: ['Instagram post', 'Instagram story', 'Reel'],
      createdAt: now,
      updatedAt: now,
    }
    await containers.creators().items.upsert(doc)
  }

  console.log('Seeding campaigns...')
  for (const c of mockCampaignsBase) {
    const doc: CampaignDoc = {
      id: c.id,
      brandId: demoBrandUser.id,
      name: c.name,
      status: c.status,
      objectives: ['awareness'],
      description: `${c.name} campaign (seed data).`,
      dates: 'Mar 1 – Mar 31',
      category: 'Beauty',
      budget: 84000,
      tier: 'premium',
      shortlist: [],
      creators: c.creators,
      pieces: c.pieces,
      spend: c.spend,
      spentPct: c.spentPct,
      tone: c.tone,
      createdAt: now,
      updatedAt: now,
    }
    await containers.campaigns().items.upsert(doc)
  }

  console.log('Seeding team...')
  for (const t of mockTeamBase) {
    const doc: TeamMemberDoc = {
      ...t,
      brandId: demoBrandUser.id,
      createdAt: now,
      updatedAt: now,
    }
    await containers.team().items.upsert(doc)
  }

  console.log('Seeding a demo message thread...')
  const threadId = randomUUID()
  await containers.threads().items.upsert({
    id: threadId,
    participantIds: [demoBrandUser.id, demoCreatorUser.id],
    brandId: demoBrandUser.id,
    creatorId: demoCreatorUser.id,
    subject: 'Ramadan 2026 collaboration',
    lastMessageAt: now,
    createdAt: now,
  })
  await containers.messages().items.upsert({
    id: randomUUID(),
    threadId,
    senderId: demoBrandUser.id,
    senderName: demoBrandUser.name,
    body: 'Hi Mira, we would love to collaborate with you on our Ramadan 2026 campaign!',
    createdAt: now,
    readBy: [demoBrandUser.id],
  })

  console.log('Seeding a demo notification...')
  await containers.notifications().items.upsert({
    id: randomUUID(),
    userId: demoCreatorUser.id,
    type: 'message',
    title: 'New message from Noura Beauty Co.',
    body: 'You have a new campaign collaboration request.',
    read: false,
    createdAt: now,
  })

  console.log('\nSeed complete.')
  console.log(`Demo brand login:   email=${demoBrandUser.email}  password=${DEMO_PASSWORD}`)
  console.log(`Demo creator login: email=${demoCreatorUser.email}  password=${DEMO_PASSWORD}`)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
