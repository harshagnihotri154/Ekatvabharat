import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import {once} from "node:events";
import {mkdir,writeFile} from "node:fs/promises";
import express from "express";
import {SMTPServer} from "smtp-server";
import {chromium} from "@playwright/test";
import {openDatabase,collections} from "../server/database.mjs";
import {createApp} from "../server/app.mjs";
import {createWorker} from "../server/worker.mjs";
const uri=process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27018/?replicaSet=ebf-local";
const dbName=`ebf_uat_${randomUUID().replaceAll('-','').slice(0,24)}`;
const db=await openDatabase(uri,dbName);
const messages=[];let rejectMail=false;
const smtp=new SMTPServer({authOptional:true,disabledCommands:['STARTTLS'],onData(stream,_session,callback){let body='';stream.on('data',chunk=>body+=chunk);stream.on('end',()=>{if(rejectMail)return callback(new Error('Temporary UAT delivery failure'));messages.push(body);callback();});}});
await new Promise(resolve=>smtp.listen(0,'127.0.0.1',resolve));
const host=express();const server=host.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}`;
const token=randomUUID()+randomUUID();
const env={APP_ORIGINS:base,ADMIN_TOKEN:token,CONTACT_EMAIL:'uat-inbox@example.test',SMTP_HOST:'127.0.0.1',SMTP_PORT:String(smtp.server.address().port),SMTP_FROM:'uat@example.test'};
const gateway={enabled:false,mode:'disabled'};
const {app,updatePayment}=createApp({db,gateway,env});host.use(app);host.use(express.static('dist'));host.use((_req,res)=>res.status(404).sendFile('404.html',{root:'dist'}));
const worker=createWorker({db,gateway,updatePayment,env});const checks=[];let browser;
try {
 browser=await chromium.launch({executablePath:process.env.CHROME_PATH});const page=await browser.newPage();
 await page.route('https://www.googletagmanager.com/**',r=>r.fulfill({body:''}));
 const submit=async(name)=>{await page.getByLabel('Your name').fill(name);await page.getByLabel('Email address',{exact:true}).fill('uat@example.test');await page.getByLabel('Your message').fill('UAT only: please verify that this enquiry is saved and visible to the admin.');await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await page.getByRole('status').filter({hasText:'Your enquiry is saved.'}).waitFor();};
 for(const topic of ['General enquiry','Course admission','Volunteering','CSR partnership']){await page.goto(base+'/contact');await page.getByRole('button',{name:topic,exact:true}).click();await submit('UAT '+topic);}
 await page.goto(base+'/get-involved');await submit('UAT Get involved');
 assert.equal(await db.count('enquiries'),5);assert.equal(await db.count('outbox'),5);checks.push('PASS: four contact modal topics and get-involved form persisted to real isolated MongoDB.');
 const row=await db.findOne('enquiries',{name:'UAT General enquiry'});
 const retry=await fetch(base+'/api/enquiries',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({requestKey:row.request_key,name:row.name,email:row.email,topic:row.topic,message:row.message,consent:true})});assert.equal(retry.status,200);assert.equal(await db.count('enquiries'),5);checks.push('PASS: retried request does not duplicate enquiry or notification.');
 const blocked=await fetch(base+'/api/enquiries',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json'},body:'{}'});assert.equal(blocked.status,403);checks.push('PASS: untrusted origin rejected.');
 rejectMail=true;await worker.runOnce();assert.equal(messages.length,0);assert.equal(await db.count('outbox',{status:'pending'}),5);
 rejectMail=false;await db.update('outbox',{id:`enquiry:${row.id}`},{$set:{next_attempt:0}});await worker.runOnce();assert.equal(messages.length,1);assert(messages[0].includes('uat-inbox@example.test'));assert(messages[0].includes(row.id));
 for(const mail of await db.list('outbox',{status:'pending'}))await db.update('outbox',{id:mail.id},{$set:{next_attempt:0}});
 await worker.runOnce();assert.equal(messages.length,5);await worker.runOnce();assert.equal(messages.length,5);checks.push('PASS: SMTP failure retained pending mail; retry delivered to local SMTP capture; sent mail not resent.');
 const fresh=await openDatabase(uri,dbName);assert.equal(await fresh.count('enquiries'),5);await fresh.close();checks.push('PASS: records survive fresh database connection.');
 await page.goto(base+'/admin');await page.getByLabel('Administrator access token').fill(token);await page.getByRole('button',{name:'Sign in',exact:true}).click();await page.getByText('UAT General enquiry ·',{exact:false}).waitFor();
 const updated=page.waitForResponse(response=>response.url().includes('/api/admin/enquiries/') && response.request().method()==='PATCH');await page.getByLabel('Follow-up status').first().selectOption('closed');assert.equal((await updated).status(),200);assert.equal(await db.count('enquiries',{status:'closed'}),1);await page.reload();await page.getByText('UAT General enquiry ·',{exact:false}).waitFor();
 await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.getByRole('button',{name:'Sign in',exact:true}).waitFor();checks.push('PASS: admin login, saved records, follow-up update, session reload and logout.');
 assert.equal((await fetch(base+'/api/admin/overview')).status,401);
 await page.goto(base+'/donate');await page.getByRole('button',{name:'Continue with my contribution'}).click();assert.equal(await page.getByRole('button',{name:/Contribute ₹/}).count(),0);checks.push('PASS: unconfigured payments do not offer a live checkout.');
 console.log(checks.join('\n'));
 await mkdir('artifacts',{recursive:true});await writeFile('artifacts/uat-results.json',JSON.stringify({completedAt:new Date().toISOString(),databaseTarget:uri.includes('mongodb.net')?'Atlas isolated test database':'local isolated test database',environment:'local production frontend + real isolated MongoDB + local SMTP capture',checks,externalEmailSent:false,realPaymentMade:false},null,2));
} finally {
 worker.close();await browser?.close();await new Promise(resolve=>server.close(resolve));await new Promise(resolve=>smtp.close(resolve));
 for(const table of collections)await db.remove(table,{});await db.close();
}
