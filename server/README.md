# Bloop Server

A real backend for the Bloop brand↔creator marketplace app, backed by **Azure Cosmos DB** (SQL API), Express, and TypeScript. This lives entirely under `server/` — the existing Vite/React frontend in `src/` is untouched.

## Setup

```bash
cd server
npm install
cp .env.example .env
# then edit .env and fill in your real Cosmos DB credentials (see below)
npm run seed   # bootstraps the database/containers and loads demo data
npm run dev    # starts the API on http://localhost:4000
```

### `.env` variables

| Variable | Description |
|---|---|
| `COSMOS_ENDPOINT` | Your Cosmos DB account URI, e.g. `https://your-account.documents.azure.com:443/` |
| `COSMOS_KEY` | Cosmos DB primary (or secondary) key |
| `COSMOS_DATABASE` | Database name to create/use (default `bloop`) |
| `JWT_SECRET` | Long random string used to sign auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGIN` | Allowed origin for the frontend, e.g. `http://localhost:5173` |

There is **no live Cosmos DB account in this development environment**, so the server and seed script cannot actually be run here — but the code is complete and type-checks cleanly (`npx tsc --noEmit`), and will run as-is once real Cosmos credentials are supplied.

## Database self-provisioning

`src/db/bootstrap.ts` calls `createIfNotExists` for the database and every container, so pointing this service at a brand-new, empty Cosmos DB account and running `npm run seed` (or just `npm run dev`, which does not bootstrap automatically — run `npm run seed` first, or `npx ts-node src/db/bootstrap.ts` to only bootstrap) is enough to get a working schema. Containers and partition keys:

| Container | Partition key | Purpose |
|---|---|---|
| `users` | `/id` | Brand + creator accounts, auth |
| `campaigns` | `/brandId` | Campaigns, owned by a brand |
| `creators` | `/id` | Creator marketplace profiles |
| `threads` | `/id` | Message threads |
| `messages` | `/threadId` | Messages within a thread |
| `offers` | `/campaignId` | Offers made against a campaign |
| `notifications` | `/userId` | Per-user notifications |
| `team` | `/brandId` | A brand's team members |

## Seed data & demo logins

`npm run seed` bootstraps the DB and loads data equivalent to `src/data/mock.ts` (the frontend's `creators`, `campaigns`, and `defaultTeam` arrays), plus a demo thread/message/notification, and two demo accounts:

| Role | Email | Password |
|---|---|---|
| Brand | `brand@bloop.demo` | `Password123!` |
| Creator | `creator@bloop.demo` | `Password123!` |

## Endpoints

All bodies are JSON. Authenticated routes require `Authorization: Bearer <token>`.

### Auth (`/api/auth`)

| Method & path | Auth | Body | Response |
|---|---|---|---|
| `POST /signup` | – | `{ role: 'brand'\|'creator', name, email, password, company? }` (company required for `role: 'brand'`) | `201 { token, user }` |
| `POST /login` | – | `{ email, password }` | `200 { token, user }` |
| `POST /verify-email` | – | `{ token }` | `200 { message }` |
| `POST /request-password-reset` | – | `{ email }` | `200 { message }` (always 200, does not leak whether the email exists) |
| `POST /reset-password` | – | `{ token, password }` | `200 { message }` |
| `GET /me` | required | – | `200 { user }` |

**Email delivery is stubbed.** `src/services/email.ts` logs verification and password-reset links to the console instead of sending real email, because no email provider (SendGrid/Resend/etc.) is configured in this environment. It is gated behind `EMAIL_PROVIDER_API_KEY` — when that env var is set, wire up a real provider call inside `sendEmail()` in that file (the integration point is commented clearly in the code); until then it always falls back to console logging so auth flows stay fully testable.

### Campaigns (`/api/campaigns`) — all require auth

| Method & path | Role | Body | Response |
|---|---|---|---|
| `GET /` | any | – | `200 { campaigns: [] }` (current brand's own) |
| `GET /:id` | any | – | `200 { campaign }` or `404` |
| `POST /` | brand | `{ name, objectives?, description?, dates?, category?, budget?, tier?, shortlist?, status?, tone? }` | `201 { campaign }` |
| `PUT /:id` | brand | partial campaign fields | `200 { campaign }` or `404` |
| `DELETE /:id` | brand | – | `204` or `404` |

### Creators (`/api/creators`) — all require auth

| Method & path | Query params | Response |
|---|---|---|
| `GET /` | `category`, `region` (`GCC`\|`Global`), `minEngagement`, `budgetMin`, `budgetMax`, `deliverables` (comma-separated), `limit` | `200 { creators: [], total }` — filters are applied as real Cosmos SQL `WHERE` clauses (not client-side), e.g. `ARRAY_CONTAINS(c.tags, @category)`, `c.engagementRate >= @minEngagement`, rate-range overlap on `rateMin`/`rateMax` |
| `GET /:id` | – | `200 { creator }` or `404` |

### Messages (`/api/messages`) — all require auth

| Method & path | Body | Response |
|---|---|---|
| `GET /threads` | – | `200 { threads: [] }` for the current user |
| `GET /threads/:threadId` | – | `200 { thread, messages: [] }` (403 if not a participant) |
| `POST /threads/:threadId` | `{ body }` | `201 { message }` |

### Notifications (`/api/notifications`) — all require auth

| Method & path | Response |
|---|---|
| `GET /` | `200 { notifications: [] }` for the current user |
| `PATCH /:id/read` | `200 { notification }` |
| `PATCH /read-all` | `200 { updated: <count> }` |

### Team (`/api/team`) — all require auth + brand role

| Method & path | Body | Response |
|---|---|---|
| `GET /` | – | `200 { team: [] }` |
| `POST /` | `{ name, email, role, tag?, tone?, access? }` | `201 { member }` |
| `PATCH /:id` | `{ role?, access? }` | `200 { member }` or `404` |
| `DELETE /:id` | – | `204` or `404` |

## What's stubbed / pending

- **Email delivery** — see above; logs to console, real provider not wired up (no API key available here).
- **Frontend integration** — `src/store/AppContext.tsx` currently persists everything to `localStorage` with mock data from `src/data/mock.ts`. Swapping that for real calls into this API (sign-in/sign-up hitting `/api/auth`, campaigns/creators/team/messages/notifications hitting their respective routes, JWT storage/refresh, etc.) is a separate follow-up piece of work and was intentionally **not** done in this pass — this pass only builds the backend service itself.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the API with hot reload (`ts-node-dev`) |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run the compiled build |
| `npm run seed` | Bootstrap the DB/containers and load demo data |
| `npm run typecheck` | `tsc --noEmit` |
