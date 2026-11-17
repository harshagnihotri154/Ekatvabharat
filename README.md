# Ekatvabharat Foundation

A React/Vite website with an Express payment and enquiry service. The design retains the foundation’s navy-and-saffron identity. Program copy distinguishes documented historical activity from proposals and areas for collaboration.

## Run locally

Requires Node.js 22.12+, npm and MongoDB (Atlas or a local MongoDB Community replica set). The runtime uses MongoDB; SQLite is used only by the optional legacy import command.

```sh
npm ci
# On first setup only, copy .env.example to .env (do not overwrite existing secrets).
npm run admin:setup
npm run db:local  # keep this terminal open; requires mongod installed
# In another terminal:
npm run dev
```

Open http://127.0.0.1:3000. Vite proxies `/api` to the API on port 4001. The ignored `.env` contains configuration and a generated administrator token. Sign in at `/admin` using `ADMIN_TOKEN` from that file. Do not share it publicly. The admin session expires after one hour.

## Implemented

- Consistent homepage message, historical evidence strip and transparency links.
- Program detail sections with activities, evidence, status and next steps.
- Transparency, participation, privacy and donation-information pages.
- English, Hindi and Marathi contribution guidance (forms and policies remain English).
- One-time Razorpay checkout: server-created orders, signature verification, capture confirmation, signed webhooks, duplicate protection and pending-payment recovery.
- Persistent donation records, refund status reconciliation, aggregate counters, protected admin dashboard and CSV export (amounts in paise; at most 10,000 records per export).
- Server-backed enquiries with follow-up status and an email outbox.
- Acknowledgement emails after captured payment, with retries when SMTP is configured. These are not statutory tax certificates.
- Bank-transfer instructions remain available, with manual reconciliation.

## Configuration and current limits

Online payments are **not enabled by default**. Set test Razorpay credentials in `.env` to exercise the provider’s test environment. No Razorpay credentials were supplied during development; automated payment tests use an injected provider and mocked browser checkout, not real provider transactions.

SMTP credentials are also required for actual email delivery. Without SMTP, submissions are saved and messages remain queued for administrators; the website does not pretend to have delivered email.

Read [DEPLOYMENT.md](DEPLOYMENT.md) for staging, webhook, HTTPS and live-mode setup. Read [docs/CONTENT-AND-UPGRADE.md](docs/CONTENT-AND-UPGRADE.md) for content sources, implementation decisions and remaining owner-supplied requirements.

Recurring donations, international contributions, tax-certificate generation, automated bank-transfer matching and publication of current legal/financial documents are not enabled. Translation guidance needs foundation review before production publication. New campaigns need an approved scope and documented budget before fundraising targets are shown.

## Commands

```sh
npm run build       # frontend and route-specific HTML output
npm run test:api    # isolated MongoDB databases; local replica set required; no real payments/emails
npm test           # browser journeys, accessibility and responsive checks
npm run admin:setup # generate token if one is not already set
npm start           # production API + built static site; HTTPS reverse proxy required
```

For installed Chrome on macOS:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm test
```

## Structure

- `src/data/programs.js`: evidence-backed program content.
- `src/components/`: active reusable UI, checkout, enquiries and administration.
- `shared/causes.js`: cause allowlist and contribution amount limit shared by client/server.
- `server/`: database, payment integration, HTTP endpoints and background delivery/reconciliation.
- `tests/api/`: payment verification and permission tests.
- `tests/*.spec.js`: browser tests.
- `.data/`: ignored local MongoDB files and retained legacy SQLite source; never commit donor records.
- `extracted_text/`: supplied source material, not public website downloads.

The obsolete standalone components, simulated forms and tax calculator have been removed. Original organisational source documents remain untouched. Do not publish them wholesale: some include private data, obsolete claims or third-party proposals.

## MongoDB storage

Set `MONGODB_URI` and `MONGODB_DB_NAME` in server-only environment variables. Local development uses `mongodb://127.0.0.1:27018/?replicaSet=ebf-local`. Production should use your Atlas connection string and a separate production database. No credentials belong in frontend variables or Git. See [DEPLOYMENT.md](DEPLOYMENT.md) for cloud setup.

`npm run db:migrate -- /absolute/path/to/ebf.sqlite` imports legacy SQLite records without modifying the source or overwriting existing MongoDB IDs. Stop API writes during migration. Admin sessions are not imported. Tests use `TEST_MONGODB_URI` when set, otherwise the local replica set, and generate isolated database names.

## Search visibility

The production build prerenders the existing React pages, adds route-specific search/social metadata and structured data, and generates `sitemap.xml` and `robots.txt`. Keep the build command as `npm run build` and output directory as `dist` on Vercel.

See [the SEO plan and owner checklist](docs/SEO-PLAN.md) for Search Console, content and local visibility work. Run `npm run test:seo` after building (requires Playwright Chromium or `CHROME_PATH`). The official canonical domain is configured in `src/seo/pages.js`.
