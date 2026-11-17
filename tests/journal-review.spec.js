import AxeBuilder from '@axe-core/playwright';
import {test,expect} from '@playwright/test';
for(const width of [390,1440])test(`journal sections and visual review ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1100});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await page.evaluate(()=>document.fonts.ready);
 await page.locator('img').evaluateAll(imgs=>{for(const img of imgs)img.loading='eager';});
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
 for(const selector of ['#home','.evidence-strip','#about','#programs','#earn-learn','#stories','#partners','.human-story','.trust-section','#donate','#tax-information','#get-involved','.faq-section','.closing','#contact'])await expect(page.locator(selector).first()).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect((await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa"]).analyze()).violations).toEqual([]);
 await page.screenshot({path:`artifacts/journal-home-${width}.png`,fullPage:true});
 await page.screenshot({path:`artifacts/journal-hero-${width}.png`});
});
