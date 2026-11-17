# Deploying the upgraded website

## Runtime

Use Node.js 22.12+ with an always-running Node web service and MongoDB Atlas (or a managed MongoDB replica set). The backend requires MongoDB transactions; a standalone MongoDB server is rejected at startup. Keep one app/worker instance until mail delivery has a distributed claim mechanism; multiple workers could deliver the same queued email concurrently.

`npm run build` builds the frontend. `npm start` serves frontend and API together, using the hosting `PORT` (or `API_PORT`, default 4001) and binding to `0.0.0.0` in production. Put the service behind HTTPS. Local development binds to localhost. No production records are written to the website's filesystem.

## MongoDB Atlas setup

1. Create an Atlas project and cluster for the foundation. Choose an appropriate region and backup-enabled tier for production data.
2. Create an application database user with read/write access to the `ekatvabharat` database. Add the hosting server's outbound IP addresses to Atlas Network Access.
3. Copy the Node.js driver connection string from Atlas Connect. Set `MONGODB_URI` in the hosting service's secret environment settings. URL-encode special characters in the username/password. Never expose this string in `VITE_` variables or commit it.
4. Set `MONGODB_DB_NAME=ekatvabharat`, `NODE_ENV=production`, `APP_ORIGINS=https://YOUR_DOMAIN` and a strong `ADMIN_TOKEN`. Use a separate database and credentials for staging. The API creates required collections and unique indexes on startup.
5. Set `TRUST_PROXY=1` only behind a single trusted proxy which replaces forwarded headers. Configure build `npm ci && npm run build`, start `npm start`, and health check `/api/health`.
6. Configure Atlas backups and retention appropriate for donor records; test restoration to a separate database before launch. An Atlas connection alone does not guarantee that backups are enabled on the selected tier.
7. Sign in at `/admin` using the server's admin token. Enquiries, donation records, follow-up status, pending email counts and CSV export read from MongoDB. Refresh records to fetch newly submitted details.

Collections: `enquiries`, `donations`, `outbox`, `payment_events`, `admin_sessions`, `metrics`. No card numbers or UPI PINs are stored. Donation updates and receipt queueing are transactional. Enquiry storage and notification queueing are transactional. Request IDs and payment IDs have unique indexes.

Sources: [Atlas application connections](https://www.mongodb.com/docs/atlas/driver-connection/), [Node driver transactions](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/).

### Importing the existing local SQLite data

Pause application writes. Keep the source SQLite file and its WAL files intact. Point the migration environment at the intended MongoDB target, then run:

```sh
npm run db:migrate -- /absolute/path/to/ebf.sqlite
```

The import reads SQLite consistently and writes all imported collections in one MongoDB transaction. Existing IDs are skipped, never overwritten; unique-key conflicts abort the transaction. It is suitable for the small legacy database in this project. Large migrations need batching and a dedicated migration window. Administrators sign in again after import. Compare counts and records in the admin panel before enabling public traffic. Retain the source securely for rollback; do not import development test data into production.

### Current verification status

MongoDB integration has been exercised against a local MongoDB replica set. Atlas credentials have not been supplied and no remote cluster or live website has been provisioned. Production requires the owner’s Atlas and hosting settings.

## Razorpay test setup

1. Complete the foundation’s merchant onboarding and obtain test credentials through its account. Confirm donation eligibility and enabled methods with Razorpay.
2. Set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` and a separate `RAZORPAY_WEBHOOK_SECRET` in server-only environment variables. Do not use a `VITE_` prefix for secrets.
3. Use a separate staging database and HTTPS staging origin. Test and live donation records are labelled; do not reuse a staging database for production.
4. Configure automatic capture and a webhook URL at `https://YOUR_DOMAIN/api/payments/webhook` for `payment.captured`, `order.paid` and `refund.processed`.
5. Test success, declined/failed payment, dismissed checkout, delayed capture, closed browser, duplicate webhooks, refunds and lost callback delivery. The server confirms only matching captured payments. Authorised-only payments remain pending.
6. A provider-order timeout is stored as `order_error`, not blindly retried. Check the merchant dashboard and the application record before taking manual action. Pending known orders are reconciled by the background worker and can be reconciled from `/admin`.

Implementation sources: [Standard Checkout](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/), [webhook validation and ordering](https://razorpay.com/docs/webhooks/validate-test/).

## Email and operations

Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD and SMTP_FROM. Use a verified sender domain. `CONTACT_EMAIL` receives enquiry notifications. Messages are durably queued and retried with backoff. SMTP delivery is at-least-once: a crash after provider acceptance can cause a duplicate delivery despite the stable message ID. No email is sent in the automated test suite.

Run `npm run admin:setup` to generate an ignored local token; use a secret manager for production. Protect access to it, rotate it on staff changes, and restrict the admin route at the proxy where appropriate. Monitor email backlog, pending donations, order errors and API health. Application capture status is not bank settlement status; reconcile settlements and approved refunds against Razorpay’s dashboard. Refunds are initiated by authorised staff in that dashboard, not by the public website.

The admin dashboard provides transaction references, refund status, enquiry follow-up and restricted CSV export. It is a single-team access-token system, not a multi-user finance system with individual audit trails.

## Before live collection

- Supply approved live merchant credentials and a production webhook secret.
- Confirm domestic donation eligibility, current foundation documents and approved donation/refund wording. Disable international acceptance in merchant configuration; a donor checkbox is not legal eligibility verification.
- Obtain foundation/accountant review of privacy, retention, tax-document collection and receipt requirements. Payment acknowledgements are not statutory donation certificates. The website does not collect PAN/Aadhaar through its general forms.
- Supply publishable redacted current certificates and financial reports. Do not publish private source attachments.
- Configure email delivery, HTTPS, durable backups and monitoring.
- After the above, set `DONATIONS_LIVE_APPROVED=true` on the production service. Live keys alone do not enable checkout.
- Perform an explicitly authorised small live payment and refund; confirm receipt email, webhook processing and merchant settlement visibility.

No live payment or refund was performed during implementation. Monthly subscriptions and foreign-source contributions remain separate future work requiring account eligibility, mandate/cancellation handling and appropriate approval.
