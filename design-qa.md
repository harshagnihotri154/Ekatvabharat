# Homepage design QA

final result: passed

## Visual target and scope

Selected direction: second displayed design, extended at the user's request with a long homepage and four-program slideshow. Revised source: `artifacts/design-reference.png`. Original selected reference: `/Users/harshagnihotri/.codex/generated_images/01a0d1c1-1a31-78a3-84c0-fe6c2c6ea046/exec-19a87f73-fb4b-4805-a265-5eddb1558132.png`.

Implementation evidence: `artifacts/desktop-full.png`, `artifacts/desktop-hero.png`, `artifacts/mobile-full.png`, `artifacts/mobile-hero.png`, `artifacts/stories.png`, `artifacts/programs.png`.

Desktop CSS viewport: 1440 × 1000, device scale 1. Mobile CSS viewport: 390 × 844, device scale 1. Full-page captures extend to document height. Revised source is 971 × 1619; it is a conceptual full-page layout rather than a fixed CSS viewport. Compared corresponding hero and section regions proportionally, not as a pixel-difference test. The implementation is intentionally longer with more whitespace, program dialogs and working contact paths. State: first skill-development slide selected, motion paused through reduced-motion preference, menus/dialogs closed. FAQ state in screenshots is collapsed after interaction tests.

## Required fidelity surfaces

- Typography: local Barlow Condensed 700 preserves the reference's bold narrow display headings; local Inter supplies readable interface/body text. Desktop and mobile headline wrapping inspected.
- Layout: navy photographic hero, white header, saffron manifesto, editorial sections, program grid, navy training feature, community photography, partner block, FAQs and footer preserve the selected direction. Mobile stacks major sections and uses a two-column program grid. No horizontal overflow at 360, 390, 768 or 1024px.
- Colors: navy #0b2032, saffron #ffa526, warm cream and cool partnership surface. Automated contrast issue resolved. Focus rings visible.
- Images: supplied logo, local WebP program illustrations and actual activity archives. Individual photo crops inspected in the stories screenshot; original archives remain accessible in dialogs. Illustrations are identified on the page. No invented testimonial or partner logo from the generated mock is reproduced.
- Content: program copy is grounded in supplied foundation materials; unverified monetary totals, employment guarantees and blanket tax promises are excluded. The enquiry UI accurately explains email handoff and lack of on-site payment collection.

## Comparison history

1. Initial browser pass: P2 insufficient contrast on partnership sequence numbers (3.52:1). Changed foreground from #6c7f8c to #506574; desktop/mobile axe checks pass afterward.
2. Initial visual comparison: P2 hard vertical seam at hero photograph boundary. Extended the image across the hero and adjusted overlay; `desktop-hero.png` confirms a continuous photograph.
3. P2 archive thumbnails showed entire presentation collages instead of focused imagery. Added responsive CSS crops to individual photographs, preserving originals in dialogs; `stories.png` confirms the corrected previews.
4. P2 uneven program action alignment and missing mobile space between manifesto sentences. Adjusted program flex layout and text whitespace. Final screenshots and all six tests pass.

Full-view source and implementation were opened together for composition review. Focused hero, story and program screenshots were reviewed for typography, crop, logo integrity and spacing. Mobile hero and full-page captures were reviewed for wrapping, section ordering and control placement.

## Interaction verification

Six passing Playwright tests: carousel selection, timed progression and pause; reduced motion; responsive navigation; program and archive dialogs; Escape dismissal, focus trap and focus restoration; FAQ expansion/collapse; validated email draft handoff with accurate status; loaded images; no page errors. Axe WCAG 2 A/AA and 2.1 AA scans pass on desktop, mobile and contact-dialog states.

Production build passes. Dependency audit reports zero vulnerabilities following Vite/plugin updates.

## Remaining scope limits

No actionable P0/P1/P2 design findings remain in the checked Chromium states. Automated checks do not constitute exhaustive accessibility certification. Safari/Firefox and real-device testing were not run. Email delivery requires the visitor's email client; payment processing is not integrated. The website is not deployed.

## Implementation checklist

- [x] Build the chosen long homepage and carousel.
- [x] Implement main interactions and honest contact fallbacks.
- [x] Verify responsive views and focus behavior.
- [x] Fix contrast and visual findings, repeat checks.
- [x] Produce the static build and deployment notes.

## Follow-up polish

Source archive photographs have varied resolution and lighting. Higher-resolution originals would improve large-screen image sharpness without altering the documented events.

## People-focused refinement and donation flow

User-requested refinement retains the selected visual direction and adds two real-photo sections, including a deep-green giving section with a warm contribution panel. Compared `artifacts/giving-desktop.png`, `artifacts/human-story.png`, updated desktop/mobile full-page captures, and `artifacts/donation-details-mobile.png`. Initial donation photo crop revealed collage borders; changed to a consistent 3:2 container and corrected its crop before final inspection.

Seven Playwright tests pass. Donation coverage includes preset/custom amount selection, rejection of zero, selected cause persistence, editing, and the email handoff. Additional browser checks verified clipboard contents for account number and IFSC and passed an axe scan on the bank-detail screen. Bank details match the supplied profile and were explicitly confirmed current by the user. No payment gateway or automated receipt issuance is claimed.

Final refinement result: passed.

## Donation tax information

Added a responsive tax-documentation section and a donation-dialog note. Official Income Tax Department guidance checked at https://www.incometax.gov.in/iec/foportal/newformpage/forms/form113-114-UM. Wording distinguishes the familiar Section 80G reference from Section 133 and year-dependent certificates. No current foundation approval or fixed saving is asserted without a certificate. Source materials list 80G/12A, but validity could not be established from available files. Seven browser tests and production build pass after correcting a missing component import. Screenshot: `artifacts/tax-information.png`.

## Dedicated pages

Added six dedicated routes with descriptive titles, breadcrumbs, active navbar states and footer links. The long homepage and shared dialogs remain available. Static build emits real per-route entry files with page titles and descriptions. Ten browser tests pass, including direct loads, refresh, all page navigation links, all six page accessibility scans, mobile overflow and page-specific primary actions. Evidence: `artifacts/page-*-mobile.png` and `artifacts/page-about-desktop.png`, `artifacts/page-programs-desktop.png`, `artifacts/page-contact-desktop.png`. Final result: passed.

## Mobile-specific redesign

See `mobile-review.md` for the audit and evidence. Phone-only styles introduce a photo-first hero, shared slide content rows, large program tabs, editorial program rows, warmer donation surfaces and more legible touch interfaces. Desktop screenshots before/after are pixel-identical at the checked 1440px viewport. Eleven browser tests and production build pass. Final result: passed.

## Approved mobile hero option 1

Source: `/Users/harshagnihotri/.codex/generated_images/01a0d1c1-1a31-78a3-84c0-fe6c2c6ea046/exec-94b8dea4-8f56-464e-9156-41dc4cdd8937.png`. Implementation: `artifacts/mobile-option1.png`, CSS viewport 390 × 844, device scale 1. Compared full-width photo, navy fade, condensed white heading, saffron CTA, underlined supporting action and segmented indicators. Retained supplied photograph rather than replacing it with generated people. Shared grid rows preserve consistent position across all four slides; indicator buttons retain 44px touch heights. Source is a 853 × 1844 concept; compared proportional mobile composition. The third progress segment is correctly selected for the initial healthcare slide (source mock showed inconsistent segment numbering). Twelve browser tests pass. Desktop before/after full-page captures are pixel-identical. Final result: passed.
