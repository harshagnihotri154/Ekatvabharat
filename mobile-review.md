# Mobile design review

Scope: homepage discovery, program exploration, donation entry and shared mobile layouts. Existing desktop design preserved. Browser: Chromium via previously approved Playwright, 390 × 844 audit viewport; additional checks at 320, 360, 768, 1024 and 1440px and landscape.

1. Home — improved. Initial image overlay obscured the doctor and child; text and navigation dominated the photograph. Replaced on phones with an unobscured image above a solid text panel. All four slides share grid rows and button positions. Evidence: `artifacts/mobile-review/01-before-home.png`, `01-after-home.png`.
2. Programs — improved. Narrow two-column cards produced small text, long wrapping and excessive vertical gaps. Replaced with single-column editorial rows: image left, title/copy/action right. Evidence: `artifacts/mobile-review/02-after-programs.png`. Initial element capture contained sticky-header artifacts and was not accepted as final comparison evidence; DOM and viewport captures informed the fix.
3. Donation — improved. Refined the panel, input sizing and mobile spacing; retained verified bank-transfer flow and documentation. Evidence: `artifacts/mobile-review/03-after-donate.png`, mobile donation dialog captures from tests.

Mobile menu, footer, contact pages and dialogs received consistent mobile-only styling in `src/mobile.css`. Form inputs use 16px text to avoid automatic iOS input zoom. Native-device Safari behavior was not directly tested.

Validation: 11 Playwright tests passed, including shared hero row coordinates and no clipping across seven viewport configurations. Automated axe accessibility checks passed on covered screens; these are not exhaustive accessibility certification. Production build passed. Desktop before/after full-page screenshots at 1440 × 1000 were pixel-identical (full content 1440 × 9251).

final result: passed
