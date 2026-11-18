import {readFile,writeFile} from "node:fs/promises";
const supplied = process.argv[2];
if (!supplied) throw new Error("Usage: npm run deploy:connect-api -- https://YOUR-DEPLOYED-API-HOST");
const url = new URL(supplied);
if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/" || /localhost|127\.0\.0\.1/.test(url.hostname)) throw new Error("Supply only a public HTTPS backend origin, without credentials or paths.");
const health = await fetch(`${url.origin}/api/health`, {signal:AbortSignal.timeout(20000)});
if (!health.ok || !(await health.json()).ok) throw new Error("Backend health check must pass before routing live forms to it.");
let config={};
try {config=JSON.parse(await readFile("vercel.json","utf8"));} catch(e) {if(e.code!=="ENOENT")throw e;}
if(config.rewrites && !Array.isArray(config.rewrites)) throw new Error("Existing advanced rewrites require manual review.");
config.rewrites=[{source:"/api/:path*",destination:`${url.origin}/api/:path*`},...(config.rewrites||[]).filter(r=>r.source!=="/api/:path*")];
await writeFile("vercel.json",JSON.stringify(config,null,2)+"\n");
console.log("Verified API health and wrote Vercel /api rewrite. Review, commit and redeploy to activate.");
