import { openDatabase } from "./database.mjs";
import { createGateway } from "./payments.mjs";
import { createApp } from "./app.mjs";
import { startWorker } from "./worker.mjs";
import express from "express";
import { resolve } from "node:path";
const env = process.env;
if (
  env.NODE_ENV === "production" &&
  (!env.APP_ORIGINS?.startsWith("https://") ||
    !env.ADMIN_TOKEN ||
    env.ADMIN_TOKEN.length < 32)
)
  throw new Error(
    "Production requires HTTPS APP_ORIGINS and a strong ADMIN_TOKEN.",
  );
if (
  env.RAZORPAY_KEY_ID?.startsWith("rzp_live_") &&
  env.DONATIONS_LIVE_APPROVED === "true" &&
  (!env.RAZORPAY_WEBHOOK_SECRET || !env.SMTP_HOST || !env.SMTP_FROM)
)
  throw new Error(
    "Live donations require webhooks and receipt email configuration.",
  );
const db = await openDatabase(env.MONGODB_URI, env.MONGODB_DB_NAME || "ekatvabharat");
const gateway = createGateway(env);
const { app, updatePayment } = createApp({ db, gateway, env });
if (env.NODE_ENV === "production" && env.SERVE_FRONTEND !== "false") {
  app.use(express.static(resolve("dist")));
  app.get("/{*path}", (_req, res) =>
    res.status(404).sendFile(resolve("dist/404.html")),
  );
}
const stopWorker = startWorker({ db, gateway, updatePayment, env });
const port = Number(env.PORT || env.API_PORT || 4001);
const host = env.HOST || (env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const server = app.listen(port, host, () =>
  console.log(
    `Foundation API: http://127.0.0.1:${port}; payments ${gateway.enabled ? gateway.mode : "not configured"}`,
  ),
);
for (const event of ["SIGINT", "SIGTERM"])
  process.once(event, () => {
    stopWorker();
    server.close(async () => {
      await db.close();
      process.exit(0);
    });
  });
