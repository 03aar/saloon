// Full-route regression check: loads every route in the app for both roles (and
// signed-out), at phone width (390px) and desktop width (1440px), and fails
// loudly on any console/page error or horizontal overflow. This is what
// actually caught real bugs during development — a global font or layout
// change can silently break a screen no one thought to re-check by hand.
//
// Usage: npm run build && npm run preview -- --port 4174   (in one terminal)
//        npm run sweep                                      (in another)
import { chromium } from 'playwright'

const base = process.env.BASE_URL ?? 'http://localhost:4174'

const routes = [
  ['/', ''],
  ['/welcome', ''],
  ['/role', ''],
  ['/signup/brand', ''],
  ['/signup/creator', ''],
  ['/login', ''],
  ['/onboarding/brand/profile', 'brand'],
  ['/onboarding/brand/planning', 'brand'],
  ['/onboarding/brand/team', 'brand'],
  ['/onboarding/brand/ready', 'brand'],
  ['/onboarding/creator/profile', 'creator'],
  ['/onboarding/creator/work', 'creator'],
  ['/onboarding/creator/rates', 'creator'],
  ['/onboarding/creator/live', 'creator'],
  ['/home', 'brand'],
  ['/discover', 'brand'],
  ['/search', 'brand'],
  ['/refine', 'brand'],
  ['/creators/mira-alia', 'brand'],
  ['/creators/mira-alia/insights', 'brand'],
  ['/creators/mira-alia/offer', 'brand'],
  ['/shortlist', 'brand'],
  ['/compare', 'brand'],
  ['/create', 'brand'],
  ['/create/budget', 'brand'],
  ['/create/review', 'brand'],
  ['/campaigns', 'brand'],
  ['/campaigns/ramadan-2026', 'brand'],
  ['/campaigns/ramadan-2026/timeline', 'brand'],
  ['/campaigns/ramadan-2026/analytics', 'brand'],
  ['/campaigns/ramadan-2026/export', 'brand'],
  ['/approvals', 'brand'],
  ['/approvals/d1', 'brand'],
  ['/profile', 'brand'],
  ['/messages', 'brand'],
  ['/messages/mira-alia', 'brand'],
  ['/notifications', 'brand'],
  ['/creator/home', 'creator'],
  ['/creator/deals', 'creator'],
  ['/creator/deals/filters', 'creator'],
  ['/creator/deals/ramadan-glow', 'creator'],
  ['/creator/pitch', 'creator'],
  ['/creator/pitch/sent', 'creator'],
  ['/creator/collabs', 'creator'],
  ['/creator/collabs/summer-glow', 'creator'],
  ['/creator/collabs/summer-glow/upload', 'creator'],
  ['/creator/collabs/summer-glow/feedback', 'creator'],
  ['/creator/contract', 'creator'],
  ['/creator/messages', 'creator'],
  ['/creator/messages/noura-beauty', 'creator'],
  ['/creator/settings', 'creator'],
  ['/creator/analytics', 'creator'],
  ['/creator/earnings', 'creator'],
  ['/creator/earnings/p1', 'creator'],
  ['/creator/portfolio', 'creator'],
  ['/creator/media-kit', 'creator'],
  ['/creator/rate-card', 'creator'],
  ['/creator/subscription', 'creator'],
  ['/privacy', 'brand'],
  ['/privacy', 'creator'],
  ['/support', 'brand'],
  ['/support', 'creator'],
  ['/this-route-does-not-exist', 'brand'],
]

const brandSeed = JSON.stringify({ session: { role: 'brand', email: 'n@n.co', name: 'Noura Beauty Co.', company: 'Noura Beauty Co.' }, onboardingComplete: true })
const creatorSeed = JSON.stringify({ session: { role: 'creator', email: 'm@m.co', name: 'Mira Alia' }, onboardingComplete: true })

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})

let failures = 0
for (const viewport of [{ width: 390, height: 844, label: 'phone' }, { width: 1440, height: 900, label: 'desktop' }]) {
  const page = await (await browser.newContext({ viewport })).newPage()
  await page.goto(base + '/welcome')
  for (const [path, seed] of routes) {
    const errs = []
    const onErr = (e) => errs.push('pageerror: ' + e.message)
    const onConsole = (m) => { if (m.type() === 'error' && !m.text().includes('net::')) errs.push('console: ' + m.text()) }
    page.on('pageerror', onErr)
    page.on('console', onConsole)
    await page.evaluate((s) => { localStorage.clear(); if (s) localStorage.setItem('salon.state.v1', s) }, seed === 'brand' ? brandSeed : seed === 'creator' ? creatorSeed : '')
    await page.goto(base + path, { waitUntil: 'networkidle', timeout: 15000 }).catch((e) => errs.push('nav: ' + e.message))
    await page.waitForTimeout(400)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
    page.off('pageerror', onErr)
    page.off('console', onConsole)
    const label = `${path} [${seed || 'signed-out'}] @${viewport.label}`
    if (errs.length || overflow) {
      failures++
      console.log(`FAIL ${label}${overflow ? ' OVERFLOW' : ''}`)
      for (const e of errs) console.log('   ' + e)
    } else {
      console.log(`ok   ${label}`)
    }
  }
}
console.log(`\n${routes.length * 2} checks run (phone + desktop), ${failures} with issues`)
await browser.close()
process.exit(failures ? 1 : 0)
