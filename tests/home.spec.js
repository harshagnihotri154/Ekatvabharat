import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop programs, gallery, dialog focus, FAQs and accessibility", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "CARE THAT REACHES.",
  );
  await page
    .getByRole("button", {
      name: "Show Women & youth empowerment slide",
      exact: true,
    })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await page
    .getByRole("button", { name: "Show Women & youth empowerment slide" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await page
    .getByRole("button", { name: "Show Skills & livelihoods slide" })
    .click();
  await page
    .getByRole("button", { name: "Support our work", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "View donation details" }),
  ).toBeFocused();
  const modalScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(modalScan.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Support our work", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Explore program", exact: true })
    .nth(1)
    .click();
  await expect(page.getByRole("dialog")).toContainText("farmer producer");
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "View photographs", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog").locator("img")).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "How can I join an Earn & Learn program?" })
    .click();
  await expect(page.locator("#answer-1")).toBeVisible();
  await page
    .getByRole("button", { name: "How can I join an Earn & Learn program?" })
    .click();
  await expect(page.locator("#answer-1")).toBeHidden();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "artifacts/desktop-full.png", fullPage: true });
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
    );
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
});

for (const width of [360, 390, 768, 1024]) {
  test(`responsive ${width}px navigation and overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width <= 900) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .locator("#navigation")
        .getByRole("link", { name: "Our work", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toBeVisible();
      expect(await page.evaluate(() => location.pathname)).toBe("/programs");
      await page.goto("/");
    }
    await page
      .getByRole("button", { name: "Show Community healthcare slide" })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "CARE THAT REACHES.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width === 390) {
      await page
        .getByRole("button", { name: "Show Skills & livelihoods slide" })
        .click();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: "artifacts/mobile-full.png",
        fullPage: true,
      });
      await page.screenshot({ path: "artifacts/mobile-hero.png" });
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(scan.violations).toEqual([]);
    }
  });
}

test("slideshow timing, pause and email handoff are honest", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Pause slideshow" }),
  ).toHaveCount(0);
  await page.clock.fastForward(1900);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "CARE THAT REACHES.",
  );
  await page.clock.fastForward(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await page
    .getByRole("button", { name: "Show Women & youth empowerment slide" })
    .click();
  await page.clock.fastForward(15000);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await page
    .getByRole("button", { name: "Send an enquiry", exact: true })
    .click();
  await page.getByLabel("Your name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("Your message")
    .fill("Please send information about supporting your work.");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message has not been submitted through this website.",
  );
});

test("donation amount, cause, validation and handoff", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const giving = page.locator("#donate");
  await giving.getByRole("button", { name: "₹2,500", exact: true }).click();
  await expect(giving.getByLabel("Donation amount in rupees")).toHaveValue(
    "2500",
  );
  await giving
    .getByLabel("Choose a cause")
    .selectOption("Community healthcare");
  await giving.getByLabel("Donation amount in rupees").fill("0");
  await giving.getByRole("button", { name: "View donation details" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await giving.getByLabel("Donation amount in rupees").fill("750");
  await giving.getByRole("button", { name: "View donation details" }).click();
  await expect(page.getByRole("dialog")).toContainText("₹750");
  await expect(page.getByRole("dialog")).toContainText("Community healthcare");
  await expect(page.getByRole("dialog")).toContainText("7246196719");
  await expect(page.getByRole("dialog")).toContainText("KKBK0001758");
  await expect(
    page.getByRole("link", { name: "Email the donation team" }),
  ).toHaveAttribute("href", /750/);
  await page.getByRole("button", { name: "Change amount or cause" }).click();
  await expect(
    page.getByRole("dialog").getByLabel("Donation amount in rupees"),
  ).toHaveValue("750");
  await expect(
    page.getByRole("dialog").getByLabel("Choose a cause"),
  ).toHaveValue("Community healthcare");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.screenshot({ path: "artifacts/donation-mobile.png" });
});

test("all four hero banners keep the same height at every breakpoint", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const heights = [];
    for (const name of [
      "Skills & livelihoods",
      "Sustainable agriculture",
      "Community healthcare",
      "Women & youth empowerment",
    ]) {
      await page
        .getByRole("button", { name: `Show ${name} slide`, exact: true })
        .click();
      heights.push((await page.locator("#home").boundingBox()).height);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    }
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("hero content rows align across slides without clipping", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [width, height] of [
    [320, 568],
    [360, 667],
    [390, 844],
    [768, 1024],
    [1024, 768],
    [1440, 900],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const positions = [];
    for (const name of [
      "Skills & livelihoods",
      "Sustainable agriculture",
      "Community healthcare",
      "Women & youth empowerment",
    ]) {
      await page
        .getByRole("button", { name: `Show ${name} slide`, exact: true })
        .click();
      positions.push(
        await page.evaluate(() => {
          const hero = document.querySelector(".hero").getBoundingClientRect();
          const copy = document.querySelector(".hero-copy.is-active");
          const bounds = [
            ...copy.querySelectorAll("h1,.hero-description,.hero-actions"),
          ].map((e) => e.getBoundingClientRect());
          const controls = document
            .querySelector(".carousel-bar")
            .getBoundingClientRect();
          return {
            rows: bounds.map((b) => Math.round(b.top - hero.top)),
            fits: bounds.every(
              (b) =>
                b.bottom <= controls.top &&
                b.left >= hero.left &&
                b.right <= hero.right,
            ),
            controlsFit: controls.bottom <= hero.bottom + 1,
          };
        }),
      );
    }
    for (const p of positions) {
      expect(p.rows).toEqual(positions[0].rows);
      expect(p.fits).toBe(true);
      expect(p.controlsFit).toBe(true);
    }
  }
});

test("touch mobile slides advance every two seconds after a tap", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.clock.install();
  await page.goto("http://127.0.0.1:3000/");
  await page.clock.fastForward(1900);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "CARE THAT REACHES.",
  );
  await page.clock.fastForward(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await page
    .getByRole("button", { name: "Show Community healthcare slide" })
    .tap();
  await page.clock.fastForward(2000);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "HER POTENTIAL.",
  );
  await context.close();
});
