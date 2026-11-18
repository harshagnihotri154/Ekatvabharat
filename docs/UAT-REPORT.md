# Acceptance verification — 18 November 2026

Status: application checks passed; production acceptance remains incomplete until the API and providers are deployed.

## Verified

- Production frontend build, 25 browser tests and SEO checks passed during this task.
- All 12 API tests passed, including transactional rollback, concurrent request deduplication, admin access, webhook validation and payment state handling. Payment gateway responses in these tests are mocked.
- Browser UAT passed against both a local replica set and an isolated database on the supplied Atlas cluster: all four contact topics and the get-involved form saved enquiries; retries did not duplicate records; a fresh database connection retained records.
- Admin login, enquiry visibility, follow-up updates, reload and logout passed. Unauthenticated admin access and untrusted submission origins were rejected.
- Controlled SMTP failure preserved pending mail; retry delivered five notifications to a local SMTP capture; the next run did not resend completed mail. No external email was sent.
- Unconfigured payments did not offer live checkout. No real payment was made.

Atlas UAT used a local production frontend/API and resolved Atlas hosts because the local DNS resolver timed out on SRV lookup. This proves authenticated Atlas persistence, not the future hosting provider's DNS/network configuration. Test records were removed from the isolated test database; foundation records were not used.

The UAT harness now waits for the actual admin update response rather than a fixed delay. Test database names fit Atlas's length constraint.

## Deployment prepared

`render.yaml` defines one always-running API instance with a fresh generated admin token. It specifies a paid Starter plan; review the dashboard price before creation. No paid service has been provisioned. `npm run deploy:connect-api -- https://YOUR-API.onrender.com` validates API health before generating the Vercel proxy configuration.

## Required production acceptance

1. Create the backend service, configure Atlas URI/network access and verify `/api/health` from that host. Rotate the database password shared in chat; save the replacement only in secret settings.
2. Connect the healthy API to Vercel and redeploy. At the latest check, `https://www.ekatvabharatfoundation.com/api/health` returned 404. Live contact forms are therefore not yet accepted.
3. Submit a clearly labelled enquiry through the public website; verify the matching admin record, HTTPS session, status update and logout through the proxy.
4. Configure SMTP credentials and verify actual delivery to the official mailbox. Local SMTP capture does not prove mailbox delivery.
5. Configure Razorpay test credentials and verify genuine success, failure, cancellation, webhook delivery and delayed confirmation before enabling live payments.

Run `npm run build` and `npm run test:uat` to repeat local UAT. Set `TEST_MONGODB_URI` for an authorised isolated database and `CHROME_PATH` when needed. The detailed machine result is written to ignored `artifacts/uat-results.json`.
