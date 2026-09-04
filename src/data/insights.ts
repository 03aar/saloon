import type { ArtKind } from '../components/Art'

export type Insight = {
  slug: string
  kicker: string
  title: string
  excerpt: string
  art: ArtKind
  date: string
  readMins: number
  author: string
  body: string[]
  pullQuote?: string
  stats?: { v: string; l: string }[]
}

export const insights: Insight[] = [
  {
    slug: 'state-of-gcc-creator-marketing-2026',
    kicker: 'Data report',
    title: 'The state of GCC creator marketing, 2026',
    excerpt: 'Budgets, formats and audience trends from over 3,000 campaigns run through Bloop last year.',
    art: 'gold',
    date: 'Feb 2, 2026',
    readMins: 6,
    author: 'Team Bloop',
    stats: [
      { v: '2.4x', l: 'YoY growth in UGC spend' },
      { v: '71%', l: 'Campaigns now GCC + Global' },
      { v: '4.6%', l: 'Median engagement rate' },
    ],
    pullQuote: 'Short-form video and UGC now account for more than two-thirds of every creator budget we see move through the platform.',
    body: [
      'Every year we pull anonymized data from the campaigns run on Bloop to see where brand budgets are actually going — not where surveys say they should go. 2026 is the clearest signal yet that the market has matured past one-off influencer posts into structured, repeatable creator programs.',
      'The headline number is spend: total campaign budgets on the platform grew 2.4x year over year, but the mix shifted even faster than the total. UGC and short-form video now make up more than two-thirds of deliverables, up from just under half in 2025. Static feed posts, once the default ask, are down to a supporting role.',
      'Regionally, the "GCC + Global" targeting option — brands wanting both a home-market and diaspora audience — overtook GCC-only campaigns for the first time. Budget comfort also rose across every tier, with mid-market brands (AED 30K–150K per campaign) growing fastest.',
      'On the creator side, response rates to well-structured briefs are up sharply. Campaigns that included a clear objective, deliverable list and budget range up front converted to signed deals 3x more often than vague outreach — a pattern that held regardless of category.',
    ],
  },
  {
    slug: 'brief-that-attracts-stronger-proposals',
    kicker: 'Playbook',
    title: 'The brief that gets stronger proposals',
    excerpt: 'What separates a campaign brief that fills up in 48 hours from one that sits empty for weeks.',
    art: 'silk',
    date: 'Jan 19, 2026',
    readMins: 5,
    author: 'Team Bloop',
    body: [
      'We looked at the briefs on Bloop that filled their creator roster fastest against the ones that stalled, and the difference rarely comes down to budget. It comes down to specificity.',
      'The strongest briefs name a single, concrete objective (launch awareness, UGC library, store visits) rather than "brand awareness and engagement and sales." Creators can picture the actual deliverable, which means they can picture whether their audience fits — and pitch faster.',
      'Second, they set the budget range up front. Creators consistently tell us that having to ask "what\'s the budget?" as a first message kills momentum; briefs with a visible range get first responses in under six hours on average, versus two days for briefs that hide it.',
      'Finally, the best briefs describe the audience they want reached, not just the product. "Women 25–34 in the GCC interested in clean beauty" gives a creator something to match themselves against. "Anyone who likes skincare" doesn\'t.',
    ],
  },
  {
    slug: 'inside-a-ramadan-campaign',
    kicker: 'Case study',
    title: 'Inside a AED 150K Ramadan launch, brief to payout',
    excerpt: 'How one skincare brand went from an empty campaign draft to 18 signed creators in nine days.',
    art: 'marble',
    date: 'Dec 14, 2025',
    readMins: 7,
    author: 'Team Bloop',
    pullQuote: 'The escrow step is what let us move fast — creators didn\'t need to wait for trust, the funds were already committed.',
    body: [
      'A Dubai-based skincare brand came to Bloop with a straightforward goal: launch a new collection ahead of Ramadan with authentic, GCC-first creator content, and have it live inside three weeks.',
      'They started with the Campaign Budget flow, setting a total of AED 150K split across 2 videos, 4 story frames and 10 UGC clips per creator tier, with 50% paid upfront into escrow. That upfront commitment mattered: creators could see the funds were real before agreeing to anything.',
      'From there, Discover surfaced a shortlist of 34 creators matched on audience overlap and category fit. The brand sent 22 offers; 18 were accepted within 72 hours, all through in-app negotiation rather than email back-and-forth.',
      'Content review ran entirely through the approval queue — drafts in, feedback out, revisions tracked — with the brand\'s two-of-three approval rule catching issues before anything went live. Final payouts released the day after Ramadan-week deliverables were approved, on time for every creator.',
    ],
  },
  {
    slug: 'escrow-and-creator-trust',
    kicker: 'Product',
    title: 'Why escrow changed how creators say yes',
    excerpt: 'A look at how funded-upfront campaigns shortened negotiation time across the platform.',
    art: 'arch',
    date: 'Nov 28, 2025',
    readMins: 4,
    author: 'Team Bloop',
    body: [
      'Before Bloop Escrow, the single biggest source of stalled deals wasn\'t rate disagreement — it was trust. Creators had no way to know a brand would actually pay on delivery, and brands had no way to know a creator would actually deliver.',
      'Escrow removes that question entirely. The moment a campaign is funded, the money exists in a held account, visible to both sides, released only when deliverables are approved. Creators stopped negotiating around "what if they don\'t pay" and started negotiating around scope and timeline instead.',
      'The measurable effect: average time from offer sent to contract signed dropped from just over four days to under fourteen hours. Dispute-related support tickets dropped by more than 60%.',
    ],
  },
  {
    slug: 'rate-cards-decoded',
    kicker: 'Data report',
    title: 'Rate cards, decoded: what brands actually pay in 2026',
    excerpt: 'A breakdown of real creator rates by tier, format and audience size across the GCC.',
    art: 'noir',
    date: 'Nov 6, 2025',
    readMins: 6,
    author: 'Team Bloop',
    stats: [
      { v: 'AED 2K–10K', l: 'Emerging tier, per deliverable' },
      { v: 'AED 10K–30K', l: 'Mid-tier, per deliverable' },
      { v: 'AED 30K+', l: 'Premium tier, per deliverable' },
    ],
    body: [
      'Rate transparency is one of the most requested features on Bloop, so once a year we publish an anonymized breakdown of what\'s actually changing hands — not list prices, but accepted offers.',
      'Rates scale predictably with audience size up to about 500K followers, after which engagement quality and niche fit start to matter more than raw reach. A 90K-follower creator with a 6% engagement rate in a tight niche now regularly out-earns a 400K-follower generalist account.',
      'Format still moves the number more than almost anything else: a single Reel or TikTok video commands roughly 2.5x a static feed post, and usage-rights extensions (paid media, whitelisting) add 30–60% on top of the base rate.',
    ],
  },
  {
    slug: 'media-kit-that-gets-shortlisted',
    kicker: 'Guide',
    title: 'Building a media kit that gets you shortlisted',
    excerpt: 'The five sections brands actually look at first — and the ones creators tend to skip.',
    art: 'wave',
    date: 'Oct 22, 2025',
    readMins: 5,
    author: 'Team Bloop',
    body: [
      'Brands scanning Discover results spend an average of eleven seconds on a creator profile before deciding whether to open the full media kit. That means the first screen has to do most of the work.',
      'The strongest kits lead with a single clear positioning line — category plus audience, not a biography. They follow immediately with the three numbers brands actually check: audience size, engagement rate, and GCC audience share.',
      'Portfolio pieces matter more than follower count once a brand has opened the kit. Three to five recent, relevant pieces outperform a long, unsorted archive — curate hard rather than showing everything you\'ve ever made.',
      'The section creators skip most often, and shouldn\'t: audience breakdown. Age range and top locations are frequently the deciding factor for brands running regional campaigns, and a missing breakdown reads as a missing answer.',
    ],
  },
]
