import { Router } from 'express'
import { containers } from '../db/containers'
import { NotificationDoc } from '../models/types'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.use(requireAuth)

// GET /api/notifications - list for the current user
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const { resources } = await containers
      .notifications()
      .items.query<NotificationDoc>({
        query: 'SELECT * FROM c WHERE c.userId = @userId ORDER BY c.createdAt DESC',
        parameters: [{ name: '@userId', value: userId }],
      })
      .fetchAll()
    res.json({ notifications: resources })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/notifications/:id/read - mark one as read
router.patch('/:id/read', async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const { resource } = await containers.notifications().item(req.params.id, userId).read<NotificationDoc>()
    if (!resource) return res.status(404).json({ error: 'Notification not found' })

    resource.read = true
    const { resource: updated } = await containers.notifications().item(req.params.id, userId).replace(resource)
    res.json({ notification: updated })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/notifications/read-all - mark all as read for the current user
router.patch('/read-all', async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const { resources } = await containers
      .notifications()
      .items.query<NotificationDoc>({
        query: 'SELECT * FROM c WHERE c.userId = @userId AND c.read = false',
        parameters: [{ name: '@userId', value: userId }],
      })
      .fetchAll()

    await Promise.all(
      resources.map((n) => {
        n.read = true
        return containers.notifications().item(n.id, userId).replace(n)
      })
    )

    res.json({ updated: resources.length })
  } catch (err) {
    next(err)
  }
})

export default router
