import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { errorHandler } from './middleware/validate'
import authRoutes from './routes/auth'
import campaignRoutes from './routes/campaigns'
import creatorRoutes from './routes/creators'
import messageRoutes from './routes/messages'
import notificationRoutes from './routes/notifications'
import teamRoutes from './routes/team'

const app = express()

app.use(cors({ origin: env.corsOrigin }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/creators', creatorRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/team', teamRoutes)

app.use((_req, res) => res.status(404).json({ error: 'Not found' }))
app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Bloop API listening on port ${env.port}`)
})
