import { env } from '../config/env'

/**
 * INTEGRATION POINT FOR A REAL EMAIL PROVIDER.
 *
 * No email provider is configured in this environment (no API key, no
 * outbound network to a provider like SendGrid/Resend/Postmark). Instead of
 * silently failing, every "send" here logs the link to the console so the
 * auth flows (signup verification, password reset) remain fully testable
 * end-to-end without a real inbox.
 *
 * To wire up a real provider later:
 *   1. Add EMAIL_PROVIDER_API_KEY (and any other provider config) to .env.
 *   2. Replace the body of `sendEmail` below with an actual API call
 *      (e.g. the Resend or SendGrid SDK), gated on `env.email.providerApiKey`
 *      being present — fall back to the console log when it isn't, so local
 *      dev keeps working without credentials.
 */
async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  if (env.email.providerApiKey) {
    // TODO: call real provider here, e.g.:
    // await resend.emails.send({ from: env.email.from, to, subject, html: body })
    throw new Error('EMAIL_PROVIDER_API_KEY is set but no provider integration is implemented yet.')
  }

  console.log('\n--- [email:stub] No EMAIL_PROVIDER_API_KEY configured, logging instead of sending ---')
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(body)
  console.log('--- [email:stub end] ---\n')
}

export async function sendVerificationEmail(to: string, token: string, appOrigin = 'http://localhost:5173'): Promise<void> {
  const link = `${appOrigin}/verify-email?token=${token}`
  await sendEmail(to, 'Verify your Bloop account', `Click to verify your email: ${link}`)
}

export async function sendPasswordResetEmail(to: string, token: string, appOrigin = 'http://localhost:5173'): Promise<void> {
  const link = `${appOrigin}/reset-password?token=${token}`
  await sendEmail(to, 'Reset your Bloop password', `Click to reset your password: ${link}`)
}
