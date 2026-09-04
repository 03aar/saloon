# Salon

Creator partnerships, curated. A production-quality web app implementation of the Salon product design: a two-sided marketplace where **brands** discover creators, run campaigns and approve content, and **creators** find deals, pitch, collaborate and get paid.

Built with React 19, TypeScript, Vite, React Router 7, Framer Motion and [Hugeicons](https://hugeicons.com) (the only icon set used). Typography is self-hosted Playfair Display (display/headlines — the high-contrast editorial serif used for the wordmark and every screen title) and Google Sans (body/UI text, numbers, buttons).

The palette is a fixed 8-colour system — warm white `#FBF9F7`, soft neutral `#F0EEE9`, sage `#BEDACE`, amber `#F8BC58`, dusty blue `#79ADBE`, coral `#DE8A7A`, ink `#1C1916`, white — with every text/icon variant derived from those hues only (darkened for WCAG-safe text, tinted for soft backgrounds). Amber is the primary accent (replaces the previous gold), coral maps to danger, sage to success, dusty blue to informational accents.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production bundle on :4173
npm test           # unit + routing tests (Vitest, jsdom)
npm run typecheck  # tsc -b
npm run lint       # oxlint
npm run sweep      # headless check of every route, both roles — see below
```

## Demo auth (no backend)

Everything runs locally against an in-memory data layer persisted to `localStorage` (`salon.state.v1`). There is no server.

- **Sign up** as a brand or creator from *Get started → Choose your role*. Brand passwords must be 8+ chars with a number and an uppercase letter (the rules shown on screen); creator passwords need 8+ chars.
- **Log in** with *any* email and password. You are signed in with the role last chosen on *Choose your role* (brand by default).
- **Sign out** from Profile (brand) or Settings (creator). Clearing site data resets the demo.

## Journeys

**Brand**
Splash → Welcome → Choose role → Create brand account → Onboarding (Brand profile → Planning → Campaign room) → Brand room ready → Home.
From Home: Discover → Search / Refine match → Creator profile → Audience fit / Send offer (→ Offer ready sheet); Compare creators → Shortlist → Group offer → Campaign budget → Campaign review → Send to creators; Create → New campaign brief → Compare → Shortlist → Budget → Review; Campaigns → Campaign detail → Timeline / Analytics / Export report; Approvals → Draft approval queue → Content draft review (approve or request edits); Messages → Chat; Notifications; Profile → Privacy, Support.

**Creator**
Create creator account → Onboarding (Shape your profile → Add your best work → Rate card) → Profile is live → Home.
From Home: Deals → Deal filters / Deal detail → Your pitch → Pitch sent; Collabs → Collab detail → Contract terms / Upload draft / Brand feedback; Messages → Chat; Profile (Settings) → Profile analytics, Portfolio editor → Media kit, Earnings → Payout detail, Rate card, Subscription, Privacy, Support, Notifications.

One bottom navigation component serves both roles (brand: Home, Discover, Create, Campaigns, Profile; creator: Home, Deals, Pitch, Collabs, Profile) — a liquid-glass pill bar (heavy blur + saturation, a specular top highlight, fully pill-shaped shell and active-tab indicator). Every actionable button in the app — the shared `Button` component, icon-only triggers, and the ad hoc CTA/selector buttons scattered across screens — is pill-shaped (`border-radius: 999px`); squarish grid tiles and portrait cards keep a large rounded-rect radius instead of a literal pill, since forcing a tall or square tile into a stadium shape reads as broken, not polished.

## States

Every data screen has a loading skeleton, an error state with retry, and (where a list can be empty) an empty state. Append `?state=loading` or `?state=error` to any app route to force those states for QA. The browser going offline shows a banner and turns *Support* into the offline recovery screen. Unknown routes show a branded 404 and a top-level error boundary catches render failures.

This is enforced end to end, not just on the obvious list/detail screens: brand Profile, creator Settings, Media Kit, Portfolio Editor, Subscription, and the payout detail screen all now carry the same loading/error wiring as Deals, Campaigns and the rest — closing gaps a full-app audit found (one screen was silently swallowing the forced `?state=error` QA hook, another had no empty-state guard). Screens that are fundamentally interactive composers — send an offer, review a draft, write a pitch, upload content, accept a contract, set rates — stay instant-render on purpose: they hold live, user-entered form state, and a skeleton flash before a form the user is about to fill in reads as broken, not as care.

## Responsive

The source designs are phone screens, so the layout stays single-column and mobile-first rather than reflowing into a desktop dashboard that doesn't exist in the design. At ≥900px the page gets a deliberately designed backdrop (a soft warm gradient) behind the centred column instead of bare white margin, and at ≥1024px the app column and everything anchored to it (bottom nav, chat composer, sheets) widen slightly for more breathing room. Verified visually at 390px (phone), 768px (tablet) and 1280px (desktop) on the brand home, creator home, Discover and Login screens, plus the automated route sweep at phone width.

## Project layout

```
src/
  components/   design system: Button, TextField, Chip, Card, Avatar, Stepper, BottomNav, Sheet, Toast, Charts, Skeleton…
  screens/      auth + onboarding, brand/, creator/, shared/ (Messages, Chat, Notifications, Settings, Privacy, Support)
  store/        AppContext — session, onboarding data, saved/shortlisted ids, filters, campaign draft (localStorage)
  data/         mock content used across screens
  lib/          auth helpers, useLoad (simulated fetch lifecycle), useOnline
  styles/       tokens (colour, type, radius, shadow), fonts, base
scripts/screenshots.mjs   Playwright visual-QA capture for any set of routes
scripts/route-sweep.mjs   Headless check of all 60+ routes, both roles: console errors + horizontal overflow
```

## Design decisions worth knowing

- Photographic and 3D imagery in the mockups is rendered as on-brand gradient/monogram compositions (`Art`, `Avatar`) so no third-party assets are required; swap in real media by pointing those components at image URLs.
- Step indicators in the source designs were inconsistent (1 of 4, 2 of 3, 3 of 5); both onboardings are implemented as coherent 3-step flows.
- Where the designs did not specify a destination (e.g. "View all"), the action goes to the nearest real screen or shows an informative toast rather than a dead end.

## Production readiness

What's actually been checked, not just assumed:

- **Types & lint**: `tsc -b` and `oxlint` are clean (two informational-only fast-refresh notices on files that intentionally co-export a hook and its types).
- **Tests**: 15 Vitest cases cover the auth helpers, the persisted store (sign in/out, save/shortlist toggles, corrupt-state recovery), and routing (role guards, brand vs. creator navigation, 404, forced error state). `npm test` must pass before shipping a change.
- **Build**: `npm run build` type-checks then bundles; every screen is route-split via `React.lazy`, so the initial JS payload is small and each screen's chunk loads on navigation.
- **Every route** (60+, both roles, signed-out included) is checked by `npm run sweep` — console/page-error capture plus a horizontal-overflow check at 390px. This isn't theoretical: it's how a page-wide typography change was caught leaving three onboarding screens' decorative art bleeding into a phantom horizontal scroll region, fixed with one `overflow-x: hidden` on the shared page shell, then re-verified clean. Also spot-checked visually at tablet (768px) and desktop (1280px).
- **Accessibility**: every input has a label or `aria-label`; every icon-only button carries an `aria-label`; focus states are visible (`:focus-visible` outline); `<html lang="en">`; verified against a full-file scan, not spot checks. Every text colour token was checked against WCAG 2.1 AA (4.5:1 for body text) against every background it's actually used on; four tokens (`--muted`, `--gold-text`, `--gold-deep`, `--danger`) were darkened (hue and saturation preserved, lightness reduced) to pass, and two spots that were using the placeholder-only `--muted-2` token on real content (the login screen's demo-mode note, the Discover search bar's query text) were switched to `--muted`. Known, deliberately deferred: the bright `--gold` token used for small decorative icons falls under the 3:1 non-text minimum on light backgrounds; nearly all of those icons sit next to redundant descriptive text so the information isn't lost, but a couple of unlabelled trend-arrow icons (e.g. on campaign/earnings stat tiles) haven't been individually re-audited — worth a follow-up pass before this ships as a real product rather than a design-fidelity demo.
- **Security**: no `dangerouslySetInnerHTML`, `eval`, or raw `innerHTML`; no `target="_blank"` without `rel`; no hardcoded secrets; the only `console.*` call is dev-gated inside the error boundary.
- **Resilience**: a top-level error boundary keeps one crashed screen from taking down the app; an offline banner and a dedicated offline recovery screen handle lost connectivity; every data screen has loading, error and (where applicable) empty states. A full-app audit (every screen, not a sample) found and fixed three real gaps rather than just cosmetic ones: the Discover search screen was silently ignoring the forced `?state=error` QA hook (it only ever read the `loading` half of `useLoad`); the Collabs list had no guard for an empty collaboration list; and Chat resolved its thread with a `!` non-null assertion that could throw if no thread matched a role, replaced with a real fallback.
- **Colour system**: the entire palette was rebuilt from a fixed 8-colour input set (see above) and re-audited for WCAG 2.1 AA the same way as the previous pass — every derived text/icon tone checked against every background it's actually used on, at 4.5:1 for text and 3:1 for non-text. Same known, deliberately deferred item as before: a few small decorative icons using the raw accent colour directly (not the darkened text-safe variant) sit under the 3:1 non-text minimum on light backgrounds; almost all are paired with redundant descriptive text, but this hasn't been re-audited icon-by-icon.

What intentionally stays out of scope for a design-fidelity demo: a real backend/API, real authentication and payments, and image/CDN assets (see the `Art`/`Avatar` note above).
