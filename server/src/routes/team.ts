import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { containers } from '../db/containers'
import { TeamMemberDoc } from '../models/types'
import { requireAuth, requireRole } from '../middleware/auth'
import { validateBody } from '../middleware/validate'

const router = Router()

router.use(requireAuth, requireRole('brand'))

// GET /api/team - list the current brand's team members
router.get('/', async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const { resources } = await containers
      .team()
      .items.query<TeamMemberDoc>({
        query: 'SELECT * FROM c WHERE c.brandId = @brandId ORDER BY c.createdAt ASC',
        parameters: [{ name: '@brandId', value: brandId }],
      })
      .fetchAll()
    res.json({ team: resources })
  } catch (err) {
    next(err)
  }
})

const inviteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().min(1),
  tag: z.string().default(''),
  tone: z.enum(['rose', 'sand', 'olive', 'stone', 'noir', 'cream']).default('sand'),
  access: z.enum(['Owner', 'Admin', 'Member', 'Viewer']).default('Member'),
})

// POST /api/team - invite a member
router.post('/', validateBody(inviteSchema), async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const now = new Date().toISOString()
    const body = req.body as z.infer<typeof inviteSchema>

    const member: TeamMemberDoc = {
      id: randomUUID(),
      brandId,
      role: body.role,
      name: body.name,
      email: body.email,
      tag: body.tag,
      tone: body.tone,
      photo: false,
      access: body.access,
      createdAt: now,
      updatedAt: now,
    }

    const { resource } = await containers.team().items.create(member)
    // NOTE: a real invite flow would send an email here via services/email.ts,
    // similar to signup verification — left as a follow-up since invites
    // aren't part of the auth spec for this pass.
    res.status(201).json({ member: resource })
  } catch (err) {
    next(err)
  }
})

const updateSchema = z.object({
  role: z.string().min(1).optional(),
  access: z.enum(['Owner', 'Admin', 'Member', 'Viewer']).optional(),
})

// PATCH /api/team/:id - update role/access level
router.patch('/:id', validateBody(updateSchema), async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    const { resource: existing } = await containers.team().item(req.params.id, brandId).read<TeamMemberDoc>()
    if (!existing) return res.status(404).json({ error: 'Team member not found' })

    const updated: TeamMemberDoc = {
      ...existing,
      ...(req.body as z.infer<typeof updateSchema>),
      updatedAt: new Date().toISOString(),
    }

    const { resource } = await containers.team().item(req.params.id, brandId).replace(updated)
    res.json({ member: resource })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/team/:id - remove a member
router.delete('/:id', async (req, res, next) => {
  try {
    const brandId = req.user!.sub
    await containers.team().item(req.params.id, brandId).delete()
    res.status(204).send()
  } catch (err: any) {
    if (err.code === 404) return res.status(404).json({ error: 'Team member not found' })
    next(err)
  }
})

export default router
