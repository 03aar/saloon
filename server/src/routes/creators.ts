import { Router } from 'express'
import { z } from 'zod'
import { SqlParameter, SqlQuerySpec } from '@azure/cosmos'
import { containers } from '../db/containers'
import { CreatorDoc } from '../models/types'
import { requireAuth } from '../middleware/auth'
import { validateQuery } from '../middleware/validate'

const router = Router()

const listQuerySchema = z.object({
  category: z.string().optional(),
  region: z.enum(['GCC', 'Global']).optional(),
  minEngagement: z.coerce.number().optional(),
  budgetMin: z.coerce.number().optional(),
  budgetMax: z.coerce.number().optional(),
  deliverables: z.string().optional(), // comma-separated list
  limit: z.coerce.number().int().positive().max(100).optional(),
})

// GET /api/creators?category=Beauty&region=GCC&minEngagement=4&budgetMin=1000&budgetMax=9000&deliverables=Reel,Instagram post
router.get('/', requireAuth, validateQuery(listQuerySchema), async (req, res, next) => {
  try {
    const q = (req as any).validatedQuery as z.infer<typeof listQuerySchema>

    const conditions: string[] = []
    const parameters: SqlParameter[] = []

    if (q.category) {
      conditions.push('ARRAY_CONTAINS(c.tags, @category)')
      parameters.push({ name: '@category', value: q.category })
    }

    if (q.region) {
      conditions.push('c.region = @region')
      parameters.push({ name: '@region', value: q.region })
    }

    if (q.minEngagement !== undefined) {
      conditions.push('c.engagementRate >= @minEngagement')
      parameters.push({ name: '@minEngagement', value: q.minEngagement })
    }

    if (q.budgetMin !== undefined) {
      conditions.push('c.rateMax >= @budgetMin')
      parameters.push({ name: '@budgetMin', value: q.budgetMin })
    }

    if (q.budgetMax !== undefined) {
      conditions.push('c.rateMin <= @budgetMax')
      parameters.push({ name: '@budgetMax', value: q.budgetMax })
    }

    if (q.deliverables) {
      const list = q.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
      const deliverableConditions = list.map((d, i) => {
        const paramName = `@deliverable${i}`
        parameters.push({ name: paramName, value: d })
        return `ARRAY_CONTAINS(c.deliverables, ${paramName})`
      })
      if (deliverableConditions.length > 0) {
        conditions.push(`(${deliverableConditions.join(' OR ')})`)
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const querySpec: SqlQuerySpec = {
      query: `SELECT * FROM c ${whereClause} ORDER BY c.fit DESC`,
      parameters,
    }

    const { resources } = await containers.creators().items.query<CreatorDoc>(querySpec).fetchAll()
    const limited = q.limit ? resources.slice(0, q.limit) : resources
    res.json({ creators: limited, total: resources.length })
  } catch (err) {
    next(err)
  }
})

// GET /api/creators/:id
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const { resource } = await containers.creators().item(req.params.id, req.params.id).read<CreatorDoc>()
    if (!resource) return res.status(404).json({ error: 'Creator not found' })
    res.json({ creator: resource })
  } catch (err) {
    next(err)
  }
})

export default router
