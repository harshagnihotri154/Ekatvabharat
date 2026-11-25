import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import express from "express";
import {chromium} from "@playwright/test";
import {seoPages, siteUrl} from "../src/seo/pages.js";
import {pageFaqs} from "../src/data/faqs.js";
import {programDetails} from "../src/data/programs.js";
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const robots = await readFile("dist/robots.txt", "utf8");
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
const app = express();app.use(express.static("dist"));app.use((_req,res)=>res.status(404).sendFile("404.html",{root:"dist"}));
const server = app.listen(0,"127.0.0.1");await new Promise(resolve=>server.once("listening",resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH});
 const context=await browser.newContext();
 await context.route("https://www.googletagmanager.com/**",route=>route.fulfill({body:""}));
 await context.route("**/api/**",route=>route.fulfill({status:503,json:{error:"Unavailable in SEO test"}}));
 const page=await context.newPage();const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("console",m=>{if(m.type()==="error" && /hydrati|Minified React|server HTML/i.test(m.text()))errors.push(m.text());});
 const titles=new Set();
 for(const [path,seo] of Object.entries(seoPages)) {
  const html=await readFile(`dist${path==='/'?'':path}/index.html`,"utf8");
  assert(!html.includes('<div id="root"></div>'),`Empty HTML: ${path}`);
  assert(html.includes('<h1'),`Missing static heading: ${path}`);
  assert(html.includes('info@ekatvabharatfoundation.com'));
  assert(!titles.has(seo.title),'Duplicate title');titles.add(seo.title);
  if(seo.noindex){assert(html.includes('noindex, nofollow'));assert(!sitemap.includes(`${siteUrl}${path}</loc>`));}
  else {
   assert(html.includes(`rel="canonical" href="${siteUrl}${path}"`));
   assert(sitemap.includes(`<loc>${siteUrl}${path}</loc>`));
   const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
   assert.equal(schema['@graph'][0].email,'info@ekatvabharatfoundation.com');
   assert(!JSON.stringify(schema).includes('streetAddress'));
  }
  await page.goto(base+path);await page.waitForTimeout(100);
  assert.equal(await page.title(),seo.title,`Client overwrote title: ${path}`);
  if (pageFaqs[path]) {
   const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
   const faqSchema = schema['@graph'].find(node => node['@type'] === 'FAQPage');
   assert.deepEqual(faqSchema.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), pageFaqs[path]);
   const disclosures = page.locator('details.faq');
   assert.equal(await disclosures.count(), pageFaqs[path].length);
   for (let i = 0; i < pageFaqs[path].length; i++) {
    assert.equal(await disclosures.nth(i).locator('summary').textContent(), pageFaqs[path][i][0]);
    assert.equal(await disclosures.nth(i).locator('p').textContent(), pageFaqs[path][i][1]);
   }
  }
  if (path === '/programs') {
   for (const program of programDetails) assert.equal(await page.locator(`#${program.slug}`).count(), 1);
  }
  assert.equal(await page.locator('h1:visible').count(),1,path);
 }
 await page.goto(base+'/');
 await page.getByRole('button',{name:'Explore program: Skills & livelihoods',exact:true}).click();
 await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');
 await page.goto(base+'/donate?amount=2500');
 await page.getByRole('button',{name:'Continue with my contribution'}).click();
 assert((await page.locator('body').innerText()).includes('2,500'),'Donation query amount lost');
 const missing=await fetch(base+'/missing-page');assert.equal(missing.status,404);assert((await missing.text()).includes('noindex, nofollow'));
 assert.deepEqual(errors,[]);
 const noJs=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJs.newPage();await staticPage.goto(base+'/programs');assert((await staticPage.locator('body').innerText()).includes('Skills & livelihoods'));
 await staticPage.goto(base+'/');
 const lastAnswer = staticPage.locator('details.faq').last();
 await lastAnswer.locator('summary').click();
 assert(await lastAnswer.locator('p').isVisible(), 'FAQ requires JavaScript');
 console.log('SEO checks passed: static content, metadata, schemas, sitemap, 404, hydration, program dialog and donation query.');
} finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
