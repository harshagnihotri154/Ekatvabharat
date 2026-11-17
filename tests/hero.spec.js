import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('hero rotation, controls, keyboard and reduced motion', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const hero = page.locator('#home');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Many journeys. One shared future.');
  await page.clock.fastForward(3100);
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('A skill to learn. A future to build.');
  await hero.getByRole('button', { name: 'Next slide', exact: true }).click();
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Small acts of care. Stronger communities.');
  await page.clock.fastForward(15000);
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Small acts of care. Stronger communities.');
  await page.keyboard.press('ArrowRight');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Many journeys. One shared future.');
  await expect(hero.getByRole('link', { name: 'Support our work' })).toHaveCount(1);
  await expect(hero.getByRole('link', { name: 'Support our work' })).toHaveAttribute('href', '/donate');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(hero.getByRole('button', { name: 'Play slideshow' })).toBeVisible();
  await page.clock.fastForward(15000);
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Many journeys. One shared future.');
});

for (const width of [390, 1440]) test(`hero visual and accessibility checks ${width}`, async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (let index = 1; index <= 3; index++) {
    await page.getByRole('button', { name: new RegExp(`Show slide ${index}:`) }).click();
    await page.locator('#home').evaluate(async el => Promise.all([...el.querySelectorAll('img')].map(img => img.decode())));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `artifacts/hero-slide-${index}-${width}.png` });
    expect((await new AxeBuilder({ page }).include('#home').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  }
  expect(errors).toEqual([]);
});
