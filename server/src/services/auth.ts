import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { env } from '../config/env'
import { Role } from '../models/types'

export interface JwtPayload {
  sub: string
  role: Role
  email: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn as any })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwt.secret) as JwtPayload
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function tokenExpiry(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString()
}
