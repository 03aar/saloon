# Salon

Creator partnerships, curated. A production-quality web app implementation of the Salon product design: a two-sided marketplace where **brands** discover creators, run campaigns and approve content, and **creators** find deals, pitch, collaborate and get paid.

Built with React 19, TypeScript, Vite, React Router 7, Framer Motion and [Hugeicons](https://hugeicons.com) (the only icon set used). Typography is self-hosted Playfair Display (display/headlines — the high-contrast editorial serif used for the wordmark and every screen title) and Google Sans (body/UI text, numbers, buttons).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production bundle on :4173
npm test           # unit + routing tests (Vitest, jsdom)
npm run typecheck  # tsc -b
npm run lint       # oxlint
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

One bottom navigation component serves both roles (brand: Home, Discover, Create, Campaigns, Profile; creator: Home, Deals, Pitch, Collabs, Profile).

## States

Every data screen has a loading skeleton, an error state with retry, and (where a list can be empty) an empty state. Append `?state=loading` or `?state=error` to any app route to force those states for QA. The browser going offline shows a banner and turns *Support* into the offline recovery screen. Unknown routes show a branded 404 and a top-level error boundary catches render failures.

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
- **Every route** was rendered headlessly (Playwright) for both roles with console-error capture — no runtime errors, no unstyled/overflowing layouts at phone (390–430px), tablet (768px) or desktop (1280px) widths.
- **Accessibility**: every input has a label or `aria-label`; every icon-only button carries an `aria-label`; focus states are visible (`:focus-visible` outline); `<html lang="en">`; verified against a full-file scan, not spot checks.
- **Security**: no `dangerouslySetInnerHTML`, `eval`, or raw `innerHTML`; no `target="_blank"` without `rel`; no hardcoded secrets; the only `console.*` call is dev-gated inside the error boundary.
- **Resilience**: a top-level error boundary keeps one crashed screen from taking down the app; an offline banner and a dedicated offline recovery screen handle lost connectivity; every data screen has loading, error and (where applicable) empty states.

What intentionally stays out of scope for a design-fidelity demo: a real backend/API, real authentication and payments, and image/CDN assets (see the `Art`/`Avatar` note above).
