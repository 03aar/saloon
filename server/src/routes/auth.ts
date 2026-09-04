import { Router } from 'express'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { containers } from '../db/containers'
import { UserDoc } from '../models/types'
import { comparePassword, generateToken, hashPassword, signToken, tokenExpiry } from '../services/auth'
import { sendPasswordResetEmail, sendVerificationEmail } from '../services/email'
import { validateBody } from '../middleware/validate'
import { requireAuth } from '../middleware/auth'

const router = Router()

const signupSchema = z
  .object({
    role: z.enum(['brand', 'creator']),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    company: z.string().optional(),
  })
  .refine((data) => data.role !== 'brand' || !!data.company, {
    message: 'company is required for brand signups',
    path: ['company'],
  })

router.post('/signup', validateBody(signupSchema), async (req, res, next) => {
  try {
    const { role, name, email, password, company } = req.body as z.infer<typeof signupSchema>
    const users = containers.users()

    const existing = await users.items
      .query({ query: 'SELECT * FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: email }] })
      .fetchAll()
    if (existing.resources.length > 0) {
      return res.status(409).json({ error: 'An account with that email already exists' })
    }

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()
    const verificationToken = generateToken()

    const user: UserDoc = {
      id: randomUUID(),
      role,
      name,
      email,
      passwordHash,
      company: role === 'brand' ? company : undefined,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiresAt: tokenExpiry(48),
      createdAt: now,
      updatedAt: now,
    }

    await users.items.create(user)
    await sendVerificationEmail(email, verificationToken)

    const token = signToken({ sub: user.id, role: user.role, email: user.email })
    res.status(201).json({ token, user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

router.post('/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body as z.infer<typeof loginSchema>
    const users = containers.users()

    const { resources } = await users.items
      .query({ query: 'SELECT * FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: email }] })
      .fetchAll()
    const user = resources[0] as UserDoc | undefined
    if (!user) return res.status(401).json({ error: 'Invalid email or password' })

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

    const token = signToken({ sub: user.id, role: user.role, email: user.email })
    res.json({ token, user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
})

const verifyEmailSchema = z.object({ token: z.string().min(1) })

router.post('/verify-email', validateBody(verifyEmailSchema), async (req, res, next) => {
  try {
    const { token } = req.body as z.infer<typeof verifyEmailSchema>
    const users = containers.users()

    const { resources } = await users.items
      .query({
        query: 'SELECT * FROM c WHERE c.verificationToken = @token',
        parameters: [{ name: '@token', value: token }],
      })
      .fetchAll()
    const user = resources[0] as UserDoc | undefined
    if (!user) return res.status(400).json({ error: 'Invalid verification token' })
    if (!user.verificationTokenExpiresAt || new Date(user.verificationTokenExpiresAt) < new Date()) {
      return res.status(400).json({ error: 'Verification token has expired' })
    }

    user.emailVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    user.updatedAt = new Date().toISOString()
    await users.item(user.id, user.id).replace(user)

    res.json({ message: 'Email verified successfully' })
  } catch (err) {
    next(err)
  }
})

const requestResetSchema = z.object({ email: z.string().email() })

router.post('/request-password-reset', validateBody(requestResetSchema), async (req, res, next) => {
  try {
    const { email } = req.body as z.infer<typeof requestResetSchema>
    const users = containers.users()

    const { resources } = await users.items
      .query({ query: 'SELECT * FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: email }] })
      .fetchAll()
    const user = resources[0] as UserDoc | undefined

    // Always respond 200 regardless of whether the user exists, to avoid
    // leaking which emails are registered.
    if (user) {
      const resetToken = generateToken()
      user.resetToken = resetToken
      user.resetTokenExpiresAt = tokenExpiry(1)
      user.updatedAt = new Date().toISOString()
      await users.item(user.id, user.id).replace(user)
      await sendPasswordResetEmail(email, resetToken)
    }

    res.json({ message: 'If that email is registered, a reset link has been sent' })
  } catch (err) {
    next(err)
  }
})

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
})

router.post('/reset-password', validateBody(resetPasswordSchema), async (req, res, next) => {
  try {
    const { token, password } = req.body as z.infer<typeof resetPasswordSchema>
    const users = containers.users()

    const { resources } = await users.items
      .query({ query: 'SELECT * FROM c WHERE c.resetToken = @token', parameters: [{ name: '@token', value: token }] })
      .fetchAll()
    const user = resources[0] as UserDoc | undefined
    if (!user) return res.status(400).json({ error: 'Invalid reset token' })
    if (!user.resetTokenExpiresAt || new Date(user.resetTokenExpiresAt) < new Date()) {
      return res.status(400).json({ error: 'Reset token has expired' })
    }

    user.passwordHash = await hashPassword(password)
    user.resetToken = undefined
    user.resetTokenExpiresAt = undefined
    user.updatedAt = new Date().toISOString()
    await users.item(user.id, user.id).replace(user)

    res.json({ message: 'Password reset successfully' })
  } catch (err) {
    next(err)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const users = containers.users()
    const { resource } = await users.item(req.user!.sub, req.user!.sub).read<UserDoc>()
    if (!resource) return res.status(404).json({ error: 'User not found' })
    res.json({ user: toPublicUser(resource) })
  } catch (err) {
    next(err)
  }
})

function toPublicUser(user: UserDoc) {
  const { passwordHash: _passwordHash, verificationToken: _verificationToken, resetToken: _resetToken, ...publicUser } = user
  return publicUser
}

export default router
