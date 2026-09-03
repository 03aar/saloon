/** Dummy auth helpers — no backend; everything is local and instant. */
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export function passwordRules(pw: string) {
  return [
    { label: 'At least 8 characters', ok: pw.length >= 8 },
    { label: 'Include a number', ok: /\d/.test(pw) },
    { label: 'Include an uppercase letter', ok: /[A-Z]/.test(pw) },
  ]
}

export function nameFromEmail(email: string) {
  const local = email.split('@')[0] ?? ''
  const word = local.split(/[._-]/)[0] || 'there'
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name
}

export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
