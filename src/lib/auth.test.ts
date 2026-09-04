import { describe, expect, it } from 'vitest'
import { firstName, greeting, isEmail, nameFromEmail, passwordRules } from './auth'

describe('auth helpers', () => {
  it('validates email addresses', () => {
    expect(isEmail('name@company.com')).toBe(true)
    expect(isEmail('  name@company.com ')).toBe(true)
    expect(isEmail('name@company')).toBe(false)
    expect(isEmail('not an email')).toBe(false)
  })

  it('reports each password rule independently', () => {
    expect(passwordRules('short').map((r) => r.ok)).toEqual([false, false, false])
    expect(passwordRules('longenough').map((r) => r.ok)).toEqual([true, false, false])
    expect(passwordRules('Bloop2026').map((r) => r.ok)).toEqual([true, true, true])
  })

  it('derives a display name from an email', () => {
    expect(nameFromEmail('mira.alia@example.com')).toBe('Mira')
    expect(nameFromEmail('@example.com')).toBe('There')
  })

  it('returns the first name and a time-of-day greeting', () => {
    expect(firstName('Noura Beauty Co.')).toBe('Noura')
    expect(greeting(new Date('2026-01-01T08:00:00'))).toBe('Good morning')
    expect(greeting(new Date('2026-01-01T14:00:00'))).toBe('Good afternoon')
    expect(greeting(new Date('2026-01-01T21:00:00'))).toBe('Good evening')
  })
})
