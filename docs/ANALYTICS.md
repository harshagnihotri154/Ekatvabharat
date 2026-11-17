# Success events in Google Tag Manager

Container: GTM-MJLCXKX2. GA4 destination: G-6569G8D5JC.

The website pushes these fixed custom events into dataLayer:
- `enquiry_success`: API confirms that the enquiry is saved.
- `donation_success`: server reports paid status and live payment mode. Test, pending, failed and dismissed payments do not count.

No form fields, names, email addresses, reference IDs or payment tokens are included in these event objects. Browser session storage and an in-memory guard suppress repeated confirmations in the same tab/session. This is browser measurement, not financial reporting: blocked scripts, closed tabs and separate browser sessions affect counts. MongoDB is the source of truth for donations.

## Activate in GTM

1. Open container GTM-MJLCXKX2.
2. Create a Custom Event trigger named `Foundation success events`. Enable regex matching and enter `^(enquiry_success|donation_success)$`.
3. Create a Google Analytics: GA4 Event tag. Measurement ID: `G-6569G8D5JC`. Event name: built-in `{{Event}}` variable. Select the trigger above. No event parameters are needed.
4. Preview and verify an enquiry on a staging environment with a mocked API. Do not make a real donation just to test tracking.
5. Submit and publish the container. Mark these event names as key events in GA4 if desired.

Do not add another Google configuration tag: the existing published Google tag already supplies page-view tracking. Do not also configure a second GA4 tag for these same custom events.

GTM account configuration is not performed by this repository. Code changes require deploying the frontend; the API must also be live for successful submissions.

Reference: https://support.google.com/tagmanager/answer/13034206
