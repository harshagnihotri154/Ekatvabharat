import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage evidence, navigation, program dialog and enquiries", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Many journeys. One shared future.",
  );
  await expect(
    page.getByRole("link", { name: "Our records" }),
  ).toHaveAttribute("href", "/transparency");
  await page
    .getByRole("button", { name: "Explore program: Skills & livelihoods", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toContainText("2024–25");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "View photographs", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog").locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Send an enquiry", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send enquiry", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(errors).toEqual([]);
});
for (const width of [360, 390, 768, 1024, 1440])
  test(`responsive pages ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/donate",
      "/transparency",
      "/get-involved",
      "/programs",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
    }
  });
