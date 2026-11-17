# Ekatvabharat Foundation: search visibility plan

Prepared 17 November 2026. Production domain: https://ekatvabharatfoundation.com

## Objective and limits

Help people find the foundation when looking for a Pune NGO, practical skills opportunities, volunteering and community partnerships. Measure qualified enquiries and verified contributions as well as search visibility. A first-place result for the broad term “NGO” cannot be promised. Rankings depend on relevance, competition, content, links and location; installing metadata does not guarantee indexing.

This is an evidence-led implementation plan, not a claim of keyword-volume research. Search Console access and competitor traffic data were not supplied. Validate the initial query priorities against actual impressions after indexing.

## Audit and changes shipped

The live homepage and /about returned an empty React root before JavaScript executed. /robots.txt and /sitemap.xml returned 404. Canonical metadata was absent. JavaScript also overwrote the generated page titles. Unknown URLs already returned 404 on the live deployment. A check of the www hostname failed certificate hostname validation; confirm its DNS, Vercel domain assignment and certificate before enabling the permanent redirect.

Implemented:
- Build-time rendering of actual React page content for all 12 existing routes and the missing-page template. The same content is served to people and crawlers; no crawler-specific hidden text.
- Shared unique search titles and descriptions, also used by the browser so metadata stays consistent after rendering.
- Canonical URLs on the official HTTPS domain, excluding query parameters.
- Organization, WebSite, WebPage and relevant breadcrumb JSON-LD, using known foundation information. Public address remains Pune only. No invented reviews, service totals, tax accreditation or active agriculture-project claims.
- XML sitemap with 11 public canonical pages. Admin is excluded and carries noindex. Missing pages also carry noindex.
- robots.txt allowing public pages and assets; API crawling excluded. Admin is not robots-blocked so crawlers can read its noindex. Authentication remains the security control.
- Social sharing metadata and the existing foundation logo, plus favicon links.
- More specific Pune/volunteering/partnership descriptions without changing the selected visual design.
- Later hero slides use lazy/low-priority image loading. Initial slide still loads eagerly.
- Regression checks for static HTML, metadata, sitemap/schema, browser hydration, 404 status, program dialogs and donation query parameters.

## Query-to-page plan

| Page | Initial search intent | Content responsibility |
|---|---|---|
| / | NGO in Pune; Ekatvabharat Foundation | Clear identity, location, focus areas and ways to help |
| /about | Ekatvabharat NGO; foundation in Pune | Verifiable leadership, origin, registration and mission |
| /programs | skills training NGO Pune; community programs Pune | Earn & Learn details, dated evidence, eligibility enquiry, current availability |
| /get-involved | volunteer NGO Pune; volunteering in Pune | Ways to participate, required skills, time commitment and contact process |
| /partnerships | CSR NGO partnerships Pune | Project scoping, reporting expectations and document enquiries |
| /community | Ekatvabharat activities | Authentic dated activity reports and permissioned photographs |
| /transparency | Ekatvabharat registration and reports | Current public documents, financial/reporting context and contact |
| /contact | Ekatvabharat contact | Consistent official name, email, phone and city |
| /donate | support Ekatvabharat Foundation | Available payment methods and confirmation process, no unsupported tax claims |

No thin duplicate city pages or keyword-stuffed lists. Broader agriculture and healthcare terms should not imply services or completed work the foundation cannot substantiate.

## Owner actions: first week

1. In Vercel, confirm the new main-branch deployment succeeds. Production build remains `npm run build`; output remains `dist`. The SSR bundle is temporary build tooling, not an always-running server.
2. Add the Domain property `ekatvabharatfoundation.com` in Google Search Console. Copy Google's TXT verification record into the domain's DNS and verify. Do not invent a verification value. Keep the TXT record afterward.
3. In Search Console → Sitemaps, submit `https://ekatvabharatfoundation.com/sitemap.xml`. Inspect /, /about, /programs and /get-involved with URL Inspection and request indexing once if eligible.
4. Test / and /programs in Google's Rich Results Test. Structured data is descriptive and does not guarantee a special result. Validate canonical selection after Google recrawls.
5. Confirm www redirects permanently to the preferred non-www domain through hosting domain settings; protect preview deployments from indexing. Do not point the canonical at a temporary Vercel or ngrok URL.
6. Confirm the production API works: enquiry success requires a running backend and Atlas. SMTP and Razorpay live configuration remain separate from SEO. A visible form alone is not proof that submissions work.
7. Publish the success-event GA4 tags described in ANALYTICS.md, then mark actual success events as key events. Do not count clicks as completed donations.
8. Confirm eligibility before claiming a Google Business Profile. Use real details and staffed in-person service arrangements only. Do not fabricate a street address; the website intentionally lists only Pune.

## Content work: weeks 2–4

Owner supplies current program availability, fees (if any), eligibility, dates, named contacts and application steps. Add only verified information to the existing program page. Keep historical 2024–25 batch evidence dated.

Publish one substantive, documented activity update at a time: what happened, when, where (city-level where appropriate), who organised it, what participants did and what can be independently supported. Use original photos with permission and descriptive captions. Never present generated illustrations as evidence of actual beneficiaries.

For volunteering, document actual tasks, available schedules, onboarding steps and any relevant safeguarding process before advertising openings. For CSR, provide an approved project brief, clear scope, reporting expectations and current documentation. Add confirmed official social profile links when available.

## Authority work: weeks 4–8

Request accurate foundation mentions and relevant links from real delivery partners, event hosts, colleges and community organisations. Use genuine relationships; no paid link packages, fake reviews or automated directory spam. Ensure the name, official email, phone and website match across profiles. Partner references must distinguish past collaborations from active agreements.

## Measurement and review: weeks 8–12 and monthly

Use Search Console to compare 28-day periods: indexed canonical pages, non-brand impressions/clicks, query CTR and landing pages. Look at Pune-related and program-specific queries separately from branded searches. Early baseline may be zero; do not invent targets before data exists.

Use GA4 for organic landing-page engagement and verified enquiry conversions after event tags are published. MongoDB/payment records remain the financial source of truth. Review Core Web Vitals field data when enough real traffic exists; use PageSpeed Insights for diagnostics, not a fabricated perfect score. No performance ranking score has been claimed in this implementation.

Prioritise pages that receive relevant impressions but low clicks, or visits without enquiries. Improve relevance and clarity before producing more pages. Publish new program detail pages only when enough distinct, verified content exists; link them from /programs and the sitemap.

## Ongoing checks

Run `npm run build`, then `npm run test:seo` with Playwright Chromium installed (or CHROME_PATH set). The SEO test uses the production files, blocks analytics requests, and does not submit real donations. Keep frontend interaction tests passing. The build removes its temporary `.prerender` folder.

Search Console verification, DNS, Google Business Profile ownership, GTM publishing, original evidence and partner outreach require owner/account actions; none are claimed completed by this code change.

## Primary references

- SEO fundamentals and ranking limits: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- JavaScript rendering and indexing: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Organization markup: https://developers.google.com/search/docs/appearance/structured-data/organization
- Sitemap requirements: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Search Console verification: https://support.google.com/webmasters/answer/9008080
- Business Profile eligibility: https://support.google.com/business/answer/7039811
