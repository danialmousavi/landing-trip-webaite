---
name: Forms Backend Dashboard
overview: Convert this Vinext/Cloudflare landing site into a self-hosted Next.js Node app with Dockerized PostgreSQL, four Persian public form sections on existing pages, local admin/operator auth, private resume storage, and a matching RTL admin inbox.
todos:
  - id: phase-0-runtime
    content: Switch from Vinext/D1 to Next.js Node, Docker Compose Postgres, env, Drizzle PostgreSQL adapter, resume volume
    status: completed
  - id: phase-1-schema
    content: Create users/sessions/submissions schema, shared Zod contracts, Argon2 sessions, PII encryption, seed command
    status: completed
  - id: phase-2-public-api
    content: Implement four form Route Handlers with rate limit, honeypot, idempotency, transactional resume storage
    status: completed
  - id: phase-3-public-ui
    content: Build Persian RTL form sections on home (#contact, join tabs) and B2B (#sponsorship); wire Header/Footer anchors
    status: completed
  - id: phase-4-admin
    content: Build in-app login, protected Persian inbox, status updates, authenticated resume download
    status: completed
  - id: phase-5-verify
    content: Add minimum Vitest/API tests and verify forms + dashboard in browser (desktop/mobile RTL, auth, upload)
    status: completed
isProject: false
---

# Forms, PostgreSQL, and Admin Inbox

## Goal

Ship four public intake forms, persist them in company-owned PostgreSQL, store resumes on a private volume, and let two in-app users (`admin`, `operator`) review submissions from a Persian RTL dashboard that matches the current design system.

No Cloudflare D1/R2, no third-party login, no Express/FastAPI split. Next.js remains the UI and the API.

## Locked decisions

- Stack: Next.js 16 App Router + TypeScript + Drizzle + PostgreSQL 17 in Docker + private filesystem for resumes
- Auth: in-app username/password, Argon2id hashes, opaque session cookies, two seeded users
- Language: Persian copy, errors, and statuses; `dir="rtl"` everywhere
- Placement: embed on existing marketing pages, not new public routes
- Follow-up CRM: schema-ready (`status`, later `notes`) but **read + status change only** in this phase

## Form placement

| Form | Page | Anchor | Existing hook |
|---|---|---|---|
| Contact | [app/page.tsx](app/page.tsx) | `#contact` | Header already points at `#contact`; Footer “تماس با ما”; [FutureTransportBanner](components/ui/FutureTransportBanner/FutureTransportBanner.tsx) “تماس با ما” |
| Driver hiring | [app/page.tsx](app/page.tsx) join section | `#join-drivers` | “استخدام رانندگان”, “به دات‌وان تریپ بپیوندید” |
| Office jobs | [app/page.tsx](app/page.tsx) join section | `#join-office` | “فرصت‌های استخدام” |
| Sponsorship | [app/b2b/page.tsx](app/b2b/page.tsx) | `#sponsorship` | B2B process + Footer ads/collaboration links |

Fix Header/Footer links so they work from every route (`/#contact`, `/#join-drivers`, `/b2b#sponsorship`). Keep `/admin` unlisted in public nav.

```mermaid
flowchart LR
  PublicPages["Home and B2B sections"] --> PublicApi["POST /api/forms/*"]
  PublicApi --> Zod["Shared Zod contracts"]
  Zod --> Services["Submission services"]
  Services --> Postgres["PostgreSQL"]
  Services --> Files["Private resume volume"]

  Login["/admin/login"] --> Sessions["HttpOnly session cookie"]
  Sessions --> Dashboard["/admin inbox"]
  Dashboard --> Queries["Server query services"]
  Queries --> Postgres
  Queries --> Files
```

## Target module layout

Keep Route Handlers thin. Do not put SQL, hashing, or filesystem code in React components.

- [db/schema.ts](db/schema.ts), [db/index.ts](db/index.ts), [drizzle.config.ts](drizzle.config.ts)
- `lib/env.ts` — fail-fast env parsing with Zod
- `lib/auth/` — password, session, `requireUser()`, role checks
- `lib/crypto/pii.ts` — AES-256-GCM for national ID
- `lib/storage/resumes.ts` — validate, write, read, delete
- `lib/submissions/` — one service per form type
- `lib/forms/` — shared Zod schemas + Persian enum labels (imported by client and server)
- `components/forms/` — reusable fields, dropzone, success/error states
- `components/admin/` — inbox table, filters, detail drawer
- `app/api/forms/{contact,drivers,careers,sponsorships}/route.ts`
- `app/api/auth/{login,logout}/route.ts`
- `app/api/admin/submissions/[id]/route.ts` and `.../resume/route.ts`
- `app/admin/login/page.tsx`, `app/admin/(console)/layout.tsx`, `app/admin/(console)/page.tsx`

---

## Phase 0 — Runtime and infrastructure

**Why:** current `npm run dev` goes through Vinext/Wrangler ([scripts/run-framework.mjs](scripts/run-framework.mjs), [db/index.ts](db/index.ts) uses `cloudflare:workers` + D1). PostgreSQL and local files need the Node runtime.

1. Switch scripts to `next dev`, `next build`, `next start`. Set `output: "standalone"` in [next.config.ts](next.config.ts).
2. Add `postgres`, `dotenv`, `argon2`. Keep existing `drizzle-orm`, `zod`, `react-hook-form`, `@hookform/resolvers`.
3. Point Drizzle at PostgreSQL, not SQLite.
4. Add `compose.yaml`, `Dockerfile`, `.dockerignore` as previously specified: Postgres on `127.0.0.1:5432`, resume bind mount, healthcheck, migrate job, app service for VPS.
5. Create ignored `.env` plus committed `.env.example`.
6. Create `data/resumes/` and ignore it. Never put it under `public/`.
7. Confirm `next dev` still serves the existing Persian landing pages.

Required env (no user passwords here):

```dotenv
DATABASE_URL=postgresql://dotone_app:...@127.0.0.1:5432/dotone_trip
APP_ORIGIN=http://localhost:3000
UPLOAD_ROOT=./data/resumes
MAX_RESUME_BYTES=5242880
AUTH_PASSWORD_PEPPER=
PII_ENCRYPTION_KEY=
```

Compose additionally needs `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`. Generate pepper and encryption key as 32-byte Base64 values. Seed admin/operator passwords only via an interactive `npm run db:seed` prompt.

---

## Phase 1 — Schema, contracts, and security primitives

### Database

One inbox table plus typed detail tables (no giant nullable row):

- `users`: `id`, `username`, `passwordHash`, `role` (`admin` | `operator`), `isActive`, `failedLoginCount`, `lockedUntil`, `createdAt`, `updatedAt`
- `sessions`: `id`, `userId`, `tokenHash`, `expiresAt`, `createdAt`, `revokedAt`
- `submissions`: `id` (uuid), `type`, `status` (`new` | `in_review` | `contacted` | `closed`), `idempotencyKey` unique, `createdAt`, `updatedAt`
- `contact_submissions`: name, last name, phone, email, category enum, message
- `driver_applications`: name, last name, phone, **encrypted national ID** + blind index, province, city, address, description
- `job_applications`: name, last name, phone, email, resume metadata (`storageKey`, original name, mime, size)
- `sponsorship_requests`: full name, phone, brand name, activity domain enum
- `audit_events`: actor, action, submissionId, createdAt (no raw PII)

Indexes: `submissions(type, createdAt desc)`, `submissions(status)`, unique `idempotencyKey`.

### Shared Zod contracts

One schema per form in `lib/forms/`. Client and Route Handler use the **same** schema. Enums are closed lists, not free text.

Contact categories (Persian values, stable English keys in DB): `general`, `urgent`, `enterprise`, `car_ride`, `other`.

Sponsorship domains: `tech`, `real_estate`, `finance`, `retail`, `transport`, `media`, `other`.

Validation rules:

- Names: trim, 2–50 chars, Persian/Arabic/Latin letters
- Phone: Iranian mobile `09xxxxxxxxx` after normalizing `+98` / `0098`
- Email: lowercase, RFC-safe max length
- Message/description: 20–2000 chars
- National ID: 10 digits + Iranian checksum
- Resume: only `application/pdf` and `application/vnd.openxmlformats-officedocument.wordprocessingml.document`; max 5 MB; magic-byte check, not only extension
- Reject HTML/script-looking payloads; store as text, never render as HTML in admin

### Auth and crypto

- Argon2id with per-user salt (library default) plus `AUTH_PASSWORD_PEPPER`
- Session token: 32 random bytes, store SHA-256, cookie `trip_session` `HttpOnly` `SameSite=Lax` `Secure` in production, 12h idle / 7d absolute
- Login lockout after 5 failures for 15 minutes
- National ID: AES-256-GCM; list views show masked `********12`; detail decrypt only for authenticated operators
- Never log passwords, national IDs, resume bytes, or full phone numbers

---

## Phase 2 — Public APIs

Endpoints:

- `POST /api/forms/contact` JSON
- `POST /api/forms/drivers` JSON
- `POST /api/forms/careers` `multipart/form-data`
- `POST /api/forms/sponsorships` JSON

Handler pipeline:

1. Method + content-type + body size limits
2. Honeypot field `website` must be empty
3. Per-IP + per-form rate limit (in-memory Map is enough for one Node process; document single-instance assumption)
4. Parse + Zod safeParse
5. Idempotency: if key exists, return the original `201` payload, do not insert again
6. Service write inside a transaction (careers: write temp file, insert row, move file; delete temp on failure)
7. Return `{ id, received: true }` only. Do not echo PII.

Edge cases:

- Duplicate submit / double-click
- Empty file, 0-byte file, renamed `.exe` as `.pdf`
- Path traversal in filename (`../../etc/passwd`) — ignore client name for storage key; use `resumes/{yyyy}/{uuid}.pdf`
- Disk full / missing `UPLOAD_ROOT`
- Invalid UTF-8 / oversized JSON
- SQL injection: parameterized Drizzle only
- XSS: admin UI text nodes only

Auth endpoints:

- `POST /api/auth/login` `{ username, password }`
- `POST /api/auth/logout`
- Admin GET APIs and pages call `requireUser()` server-side. Client hiding is not security.

---

## Phase 3 — Public form UI

Reuse shadcn already in the repo: [components/ui/form.tsx](components/ui/form.tsx), [field.tsx](components/ui/field.tsx), [input.tsx](components/ui/input.tsx), [textarea.tsx](components/ui/textarea.tsx), [select.tsx](components/ui/select.tsx), [button.tsx](components/ui/button.tsx), [sonner.tsx](components/ui/sonner.tsx). Style with existing tokens (`--brand`, `--ink`, `--paper`, IRANSansX, 12px radii) so forms look native to the landing, not like a generic dashboard kit.

Shared pieces in `components/forms/`:

- `FormShell` — section heading, description, success card, pending state
- `TextField`, `PhoneField`, `SelectField`
- `ResumeDropzone` — click/touch file picker + drag-and-drop, keyboard accessible, Persian helper text
- Hidden honeypot
- Client idempotency UUID in `sessionStorage` per form

Join section UX: two tabs on home (`رانندگان` / `فرصت‌های اداری`) so both hiring forms live in the existing recruiting block without adding extra pages.

Behavior:

- Inline Persian field errors
- Disable submit while in flight
- Success replaces the form with a confirmation, keep the idempotency key so refresh does not duplicate
- Network/500 shows a generic “ارسال نشد، دوباره تلاش کنید”
- 422 maps server issues back onto fields
- Resume dropzone shows filename, size, remove action; reject on the client then again on the server

Wire Header `#contact` to `/#contact` and “همکاری با تریپ” to `/#join-drivers`.

---

## Phase 4 — Admin dashboard

Routes:

- `/admin/login` — public, Persian, branded
- `/admin` — protected inbox
- `/admin/submissions/[id]` — detail

Middleware or layout `requireUser()`: unauthenticated → `/admin/login?returnTo=...`.

Inbox:

- Filters: type, status, search by name/phone/email (no national ID search in v1)
- Cursor pagination, newest first
- Status badges
- Operator can set `new → in_review → contacted → closed`
- Resume download only through `GET /api/admin/submissions/:id/resume` (`Content-Disposition: attachment`, no public URL)
- Mask national ID in table; decrypt on detail
- Empty/error/loading states using existing [empty.tsx](components/ui/empty.tsx), [table.tsx](components/ui/table.tsx), [badge.tsx](components/ui/badge.tsx)

Roles: both users can read and update status. Do not build user-management UI in this phase. Seed exactly two users.

---

## Phase 5 — Tests and verification

Minimum necessary, not coverage theater:

- Zod unit tests: valid + invalid for each form, Iranian phone/national ID, file type/size
- Auth tests: bad password, lockout, unauthenticated admin 401
- Submission tests: 201, 422, idempotent replay, resume stored + metadata row
- One Playwright path: submit contact on home → login → row visible

Manual verification (required because this is UI work):

- Desktop and mobile RTL on home contact + join tabs
- B2B sponsorship section
- Drag-and-drop and file-picker resume upload
- Login, logout, cookie not readable by JS
- Direct `/admin` while logged out redirects
- Resume file is not reachable as a static asset

---

## Security and quality bar

- Server validates everything; client validation is UX only
- Parameterized queries, UUID storage keys, private upload root
- Generic public errors; structured logs without PII
- CSRF: same-origin cookie + `Origin`/`Host` check on mutating admin routes (forms are unauthenticated POSTs, so rate-limit + honeypot + size limits)
- Do not commit `.env`, `data/resumes`, or generated secrets
- Do not render user HTML
- Do not use `dangerouslySetInnerHTML` for messages
- Encrypt national IDs at rest
- Keep Vinext/D1 code unused after the Node switch; do not leave a second database path

## Out of scope for this build

- Follow-up notes, assignment, email/SMS, Turnstile, object storage, public registration, password-reset UI, Excel export, multi-instance Redis rate limits

Those wait until the inbox is live. Schema already has `status` so follow-ups can attach later.
