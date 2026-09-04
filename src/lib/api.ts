// Thin client for the Cosmos DB-backed API in server/. The frontend runs in
// demo mode (localStorage only, no network calls) unless VITE_API_URL is set
// at build time — that's the only thing that switches auth from instant fake
// sign-in to a real signup/login round trip against the backend.
const API_URL = import.meta.env.VITE_API_URL as string | undefined

export const apiEnabled = Boolean(API_URL)

const TOKEN_KEY = 'bloop.token.v1'

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* storage unavailable */
  }
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error || 'Something went wrong. Please try again.', res.status)
  return data as T
}

export type ApiUser = {
  id: string
  role: 'brand' | 'creator'
  name: string
  email: string
  company?: string
  emailVerified: boolean
}

export type AuthResponse = { token: string; user: ApiUser }

export function apiSignup(body: { role: 'brand' | 'creator'; name: string; email: string; password: string; company?: string }) {
  return request<AuthResponse>('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) })
}

export function apiLogin(body: { email: string; password: string }) {
  return request<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(body) })
}

export function apiMe(token: string) {
  return request<{ user: ApiUser }>('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
}

export function apiRequestPasswordReset(email: string) {
  return request<{ message: string }>('/api/auth/request-password-reset', { method: 'POST', body: JSON.stringify({ email }) })
}

export function apiResetPassword(body: { token: string; password: string }) {
  return request<{ message: string }>('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(body) })
}
