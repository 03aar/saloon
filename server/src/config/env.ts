import dotenv from 'dotenv'

dotenv.config()

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    // We don't throw at import time for every field (so `tsc --noEmit` / tooling
    // can load this module without a .env present); routes that need Cosmos
    // will fail loudly at request time via db/cosmos.ts instead.
    return ''
  }
  return value
}

export const env = {
  cosmos: {
    endpoint: required('COSMOS_ENDPOINT'),
    key: required('COSMOS_KEY'),
    database: required('COSMOS_DATABASE', 'bloop'),
  },
  jwt: {
    secret: required('JWT_SECRET', 'dev-secret-change-me'),
    expiresIn: required('JWT_EXPIRES_IN', '7d'),
  },
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: required('CORS_ORIGIN', '*'),
  email: {
    // Presence of this key is what gates "real" email delivery. It is not
    // set in this environment, so services/email.ts falls back to logging.
    providerApiKey: process.env.EMAIL_PROVIDER_API_KEY ?? '',
    from: process.env.EMAIL_FROM ?? 'no-reply@bloop.app',
  },
}
