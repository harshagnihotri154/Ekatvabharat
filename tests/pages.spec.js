import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const pages = [
  ["Our story", "/about"],
  ["Our work", "/programs"],
  ["Community", "/community"],
  ["CSR partnerships", "/partnerships"],
  ["Contact", "/contact"],
  ["Donate", "/donate"],
];
test("separate pages, navbar/footer links, refresh and accessibility", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const [label, path] of pages) {
    await page
      .locator("header")
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
      page.locator("header").getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.locator("footer").getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("href", path);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  expect(errors).toEqual([]);
  await page
    .locator("footer")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
});
test("mobile pages and primary interactions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [, path] of pages) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/page-${path.slice(1)}-mobile.png`,
      fullPage: true,
    });
  }
  await page.goto("/programs");
  await page
    .getByRole("button", { name: "Enquire about this program" })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/community");
  await page
    .getByRole("button", { name: "View photographs", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog").locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/donate");
  await page.getByRole("button", { name: "View donation details" }).click();
  await expect(page.getByRole("dialog")).toContainText("7246196719");
  await page.keyboard.press("Escape");
  await page.goto("/contact");
  await page.getByRole("button", { name: "Course admission" }).click();
  await expect(
    page.getByRole("dialog").getByLabel("I’m interested in"),
  ).toHaveValue("Course admission");
});
