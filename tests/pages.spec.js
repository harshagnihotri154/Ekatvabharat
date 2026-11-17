import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const path of [
  "/about",
  "/programs",
  "/community",
  "/partnerships",
  "/donate",
  "/contact",
  "/transparency",
  "/get-involved",
  "/privacy",
  "/donation-policy",
  "/admin",
])
  test(`page ${path} structure and accessibility`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
test("donation amount and cause survive navigation and bank fallback stays clear", async ({
  page,
}) => {
  await page.goto("/donate?amount=2500&cause=Skills+%26+livelihoods");
  await expect(page.getByLabel("Donation amount in rupees")).toHaveValue(
    "2500",
  );
  await expect(page.getByLabel("Choose a cause")).toHaveValue(
    "Skills & livelihoods",
  );
  await page
    .getByRole("button", { name: "Continue with my contribution" })
    .click();
  await page.getByText("Prefer a bank transfer?", { exact: true }).click();
  await expect(page.getByText("7246196719")).toBeVisible();
  await expect(
    page.getByText("Make the transfer in your banking app.", { exact: false }),
  ).toBeVisible();
});
test("enquiry success only appears after persistence and errors preserve input", async ({
  page,
}) => {
  await page.route("**/api/enquiries", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Temporarily unavailable" }),
    }),
  );
  await page.goto("/get-involved");
  await page.getByLabel("Your name").fill("Test Volunteer");
  await page.getByLabel("Email address").fill("test@example.test");
  await page
    .getByLabel("Your message")
    .fill("I would like to volunteer for local training.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Temporarily unavailable",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("Test Volunteer");
  await page.route("**/api/enquiries", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ id: "test-reference" }),
    }),
  );
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry is saved.",
  );
});
test("checkout handles captured confirmation without exposing gateway secrets", async ({
  page,
}) => {
  await page.route("**/api/config", (route) =>
    route.fulfill({ json: { paymentsEnabled: true, mode: "test" } }),
  );
  await page.route("**/api/donations", (route) =>
    route.fulfill({
      status: 201,
      json: {
        id: "test-donation",
        orderId: "order_test",
        amount: 100000,
        currency: "INR",
        keyId: "rzp_test_public",
        mode: "test",
      },
    }),
  );
  await page.route("**/api/donations/test-donation/verify", (route) =>
    route.fulfill({
      json: {
        id: "test-donation",
        status: "paid",
        amount: 100000,
        cause: "Where it is needed most",
        receipt: "EBF-test",
      },
    }),
  );
  await page.addInitScript(() => {
    window.Razorpay = class {
      constructor(options) {
        this.options = options;
      }
      on() {}
      open() {
        this.options.handler({
          razorpay_order_id: "order_test",
          razorpay_payment_id: "pay_test",
          razorpay_signature: "test",
        });
      }
    };
  });
  await page.goto("/donate");
  await page
    .getByRole("button", { name: "Continue with my contribution" })
    .click();
  await page.getByLabel("Your name").fill("Test Donor");
  await page
    .getByLabel("Email for your acknowledgement")
    .fill("donor@example.test");
  for (const c of await page.getByRole("checkbox").all()) await c.check();
  await page
    .getByRole("button", { name: "Contribute ₹1,000", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Your payment is confirmed",
  );
});
