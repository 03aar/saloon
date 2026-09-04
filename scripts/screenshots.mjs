// Visual QA helper: `npm run build && npm run preview` then `npm run shots -- "/home|home|brand" "/creator/deals|deals|creator"`.
// Each arg is "path|filename|seed" where seed is "brand", "creator" or empty (signed out). Requires `playwright` (devDependency).
import { chromium } from 'playwright'
const routes = process.argv.slice(2)
const base = process.env.BASE_URL ?? 'http://localhost:4173'
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
page.on('console', (m) => m.type() === 'error' && !m.text().includes('net::') && console.log('CONSOLE', m.text()))
const brand = JSON.stringify({ session: { role: 'brand', email: 'noura@nourabeauty.com', name: 'Noura Beauty Co.', company: 'Noura Beauty Co.' }, onboardingComplete: true, pendingRole: 'brand' })
const creator = JSON.stringify({ session: { role: 'creator', email: 'mira@example.com', name: 'Mira Alia' }, onboardingComplete: true, pendingRole: 'creator' })
await page.goto(base + '/welcome')
for (const r of routes) {
  const [path, name, seed] = r.split('|')
  await page.evaluate((s) => { localStorage.clear(); if (s) localStorage.setItem('salon.state.v1', s) }, seed === 'brand' ? brand : seed === 'creator' ? creator : '')
  await page.goto(base + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  await page.addStyleTag({ content: `[class*="footer"]{position:static!important;background:none!important} div:has(> nav[aria-label="Primary"]){position:absolute!important;bottom:0} body{position:relative} form[style*="position: fixed"]{position:static!important}` })
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${process.env.OUT ?? 'screenshots'}/${name}.png`, fullPage: true })
  console.log('shot', name)
}
await browser.close()
