# Run and publish

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` creates the deployable static site in `dist/`. Publish that directory on a static host with HTTPS. The build generates `/about/index.html`, `/programs/index.html`, `/community/index.html`, `/partnerships/index.html`, `/donate/index.html` and `/contact/index.html`. Use directory-index serving (standard on static hosts) for clean page URLs. A `404.html` is included for hosts supporting custom error documents. The app currently assumes deployment at the domain root.

## Verification

```sh
npx playwright install chromium
npm test
npm audit
```

The ten Playwright tests check desktop, 360px, 390px, 768px and 1024px layouts; slideshow transitions and pause; navigation; dialogs and keyboard focus; gallery; FAQs; email handoff; image loading; and automated WCAG A/AA checks. Screenshots are in `artifacts/`. Desktop screenshots use 1440px width.

## Contact and donation behavior

There is no backend or payment gateway. Enquiries create a draft in the visitor's email application and require the visitor to send it. Donation buttons open amount and cause selection followed by direct bank-transfer instructions. Kotak Bank details were sourced from the foundation profile and confirmed current by the user. Copy controls and email/phone follow-up are available. Transfers happen outside the website; there is no automatic payment verification or receipt issuance. No form data is stored by the website, and the interface does not claim that an enquiry or payment was received. Direct phone/email links provide a fallback when no email app is configured.

If online payment collection or in-page form delivery is wanted, connect a payment provider and server-side mail service before advertising those features. No secrets belong in client code.

## Assets and content

- Existing program illustrations are optimized WebP files in `public/images/`; the page identifies them as illustrative.
- Community archive photos are displayed using CSS crops; opening the gallery reveals the original supplied collage.
- The supplied foundation logo is arranged as a horizontal lockup using crops from its source image.
- Fonts are hosted locally; license files are in `public/fonts/`.
- Program definitions, contact details, FAQs and partner names are in `src/App.jsx`. Donation amounts, causes and bank details are in `src/components/Giving.jsx`.
- Earlier unused components remain in `src/components/` for reference; they are not imported or shipped in the active bundle.

The frontend is built and locally verified. Hosting, email delivery, payment processing, and cross-browser Safari/Firefox checks are not performed by this build.
