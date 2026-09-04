import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { containers } from '../db/containers'
import { CampaignDoc } from '../models/types'
import { requireAuth, requireRole } from '../middleware/auth'
import { validateBody } from '../middleware/validate'

const router = Router()

router.use(requireAuth)

// GET /api/campaigns - list the current brand's campaigns
router.get('/', async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const { resources } = await containers
      .campaigns()
      .items.query<CampaignDoc>({
        query: 'SELECT * FROM c WHERE c.brandId = @brandId ORDER BY c.createdAt DESC',
        parameters: [{ name: '@brandId', value: brandId }],
      })
      .fetchAll()
    res.json({ campaigns: resources })
  } catch (err) {
    next(err)
  }
})

// GET /api/campaigns/:id
router.get('/:id', async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const { resource } = await containers.campaigns().item(req.params.id, brandId).read<CampaignDoc>()
    if (!resource) return res.status(404).json({ error: 'Campaign not found' })
    res.json({ campaign: resource })
  } catch (err) {
    next(err)
  }
})

const createSchema = z.object({
  name: z.string().min(1),
  objectives: z.array(z.string()).default([]),
  description: z.string().default(''),
  dates: z.string().default(''),
  category: z.string().default(''),
  budget: z.number().nonnegative().default(0),
  tier: z.string().default(''),
  shortlist: z.array(z.string()).default([]),
  status: z.enum(['Draft', 'In review', 'Live', 'Completed']).default('Draft'),
  tone: z.string().default('arch'),
})

// POST /api/campaigns - brand only
router.post('/', requireRole('brand'), validateBody(createSchema), async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const now = new Date().toISOString()
    const body = req.body as z.infer<typeof createSchema>

    const campaign: CampaignDoc = {
      id: randomUUID(),
      brandId,
      name: body.name,
      status: body.status,
      objectives: body.objectives,
      description: body.description,
      dates: body.dates,
      category: body.category,
      budget: body.budget,
      tier: body.tier,
      shortlist: body.shortlist,
      creators: 0,
      pieces: 0,
      spend: '0',
      spentPct: 0,
      tone: body.tone,
      createdAt: now,
      updatedAt: now,
    }

    const { resource } = await containers.campaigns().items.create(campaign)
    res.status(201).json({ campaign: resource })
  } catch (err) {
    next(err)
  }
})

const updateSchema = createSchema.partial().extend({
  creators: z.number().int().nonnegative().optional(),
  pieces: z.number().int().nonnegative().optional(),
  spend: z.string().optional(),
  spentPct: z.number().min(0).max(100).optional(),
})

// PUT /api/campaigns/:id - brand only
router.put('/:id', requireRole('brand'), validateBody(updateSchema), async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const { resource: existing } = await containers.campaigns().item(req.params.id, brandId).read<CampaignDoc>()
    if (!existing) return res.status(404).json({ error: 'Campaign not found' })

    const updated: CampaignDoc = {
      ...existing,
      ...(req.body as z.infer<typeof updateSchema>),
      id: existing.id,
      brandId: existing.brandId,
      updatedAt: new Date().toISOString(),
    }

    const { resource } = await containers.campaigns().item(req.params.id, brandId).replace(updated)
    res.json({ campaign: resource })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/campaigns/:id - brand only
router.delete('/:id', requireRole('brand'), async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    await containers.campaigns().item(req.params.id, brandId).delete()
    res.status(204).send()
  } catch (err: any) {
    if (err.code === 404) return res.status(404).json({ error: 'Campaign not found' })
    next(err)
  }
})

export default router
