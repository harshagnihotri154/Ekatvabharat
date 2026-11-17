# Programs section — selected photo grid

final result: passed

## Evidence
- Source: `/Users/harshagnihotri/.codex/generated_images/01a12c16-2c5f-7780-b77c-b37430905430/exec-7537d3eb-57b9-4f93-8678-6f2bb4727a45.png` (1487 × 1058).
- Implementation: `artifacts/programs-after.png`, section capture at 1487 × 1100 CSS viewport, DPR 1.
- Same-width side-by-side visual comparison: `artifacts/programs-comparison.png`.
- Mobile: `artifacts/programs-mobile.png`, 390px CSS viewport, DPR 1. Keyboard focus visible on agriculture Explore after closing its dialog.
- State: homepage programs section; all four areas visible. Desktop comparison and mobile capture inspected directly.

## Findings and history
Initial desktop capture wrapped agriculture and healthcare headings unnecessarily. Reduced card title maximum from 28px to 25px; recaptured and inspected combined comparison. Resolved.
No outstanding P0/P1/P2 layout or interaction findings.

## Fidelity surfaces
- Typography: Georgia headings, existing body type, restrained sizing consistent with user's earlier request for smaller text. Clear header and four program titles.
- Layout: two-column grid with paired large photos and text, thin row dividers, bottom-aligned Explore actions. Single-column mobile cards preserve readability.
- Colors: existing cream/navy, sage icons and ochre arrows retained.
- Imagery: existing illustrative program assets reused, with the same subjects as the mockup; exact generated scenes differ. No placeholder images. Alt text identifies illustrations.
- Content: selected concise descriptions and agriculture planning status match; full existing descriptions remain in working dialogs.
- Focused crops unnecessary: individual desktop and mobile captures were legible alongside the combined comparison.

## Checks
Build passed. Journal section-presence, accessibility and overflow tests passed at 390 and 1440. Homepage interaction and responsive tests passed at 360, 390, 768, 1024 and 1440. Updated stale assertions for the previously renamed Our records link and new program-specific accessible button names. Agriculture Explore opens correct dialog and Escape closes it.

## Follow-up polish
P3: existing image scenes differ from the reference; crops and editorial treatment follow the selected layout. Existing body font and slightly smaller typography intentionally preserve site consistency.
