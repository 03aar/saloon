import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { containers } from '../db/containers'
import { MessageDoc, ThreadDoc } from '../models/types'
import { requireAuth } from '../middleware/auth'
import { validateBody } from '../middleware/validate'

const router = Router()

router.use(requireAuth)

// GET /api/messages/threads - threads the current user participates in
router.get('/threads', async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const { resources } = await containers
      .threads()
      .items.query<ThreadDoc>({
        query: 'SELECT * FROM c WHERE ARRAY_CONTAINS(c.participantIds, @userId) ORDER BY c.lastMessageAt DESC',
        parameters: [{ name: '@userId', value: userId }],
      })
      .fetchAll()
    res.json({ threads: resources })
  } catch (err) {
    next(err)
  }
})

// GET /api/messages/threads/:threadId - messages in one thread
router.get('/threads/:threadId', async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const threadId = req.params.threadId

    const { resource: thread } = await containers.threads().item(threadId, threadId).read<ThreadDoc>()
    if (!thread) return res.status(404).json({ error: 'Thread not found' })
    if (!thread.participantIds.includes(userId)) {
      return res.status(403).json({ error: 'Not a participant in this thread' })
    }

    const { resources } = await containers
      .messages()
      .items.query<MessageDoc>({
        query: 'SELECT * FROM c WHERE c.threadId = @threadId ORDER BY c.createdAt ASC',
        parameters: [{ name: '@threadId', value: threadId }],
      })
      .fetchAll()

    res.json({ thread, messages: resources })
  } catch (err) {
    next(err)
  }
})

const postMessageSchema = z.object({ body: z.string().min(1) })

// POST /api/messages/threads/:threadId - post a new message to a thread
router.post('/threads/:threadId', validateBody(postMessageSchema), async (req, res, next) => {
  try {
    const userId = req.user!.sub
    const threadId = req.params.threadId

    const { resource: thread } = await containers.threads().item(threadId, threadId).read<ThreadDoc>()
    if (!thread) return res.status(404).json({ error: 'Thread not found' })
    if (!thread.participantIds.includes(userId)) {
      return res.status(403).json({ error: 'Not a participant in this thread' })
    }

    const now = new Date().toISOString()
    const message: MessageDoc = {
      id: randomUUID(),
      threadId,
      senderId: userId,
      senderName: req.user!.email,
      body: (req.body as z.infer<typeof postMessageSchema>).body,
      createdAt: now,
      readBy: [userId],
    }

    const { resource } = await containers.messages().items.create(message)

    thread.lastMessageAt = now
    await containers.threads().item(threadId, threadId).replace(thread)

    res.status(201).json({ message: resource })
  } catch (err) {
    next(err)
  }
})

export default router
