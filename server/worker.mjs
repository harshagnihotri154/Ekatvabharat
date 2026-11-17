import nodemailer from "nodemailer";
export function startWorker({ db, gateway, updatePayment, env }) {
  const transport =
    env.SMTP_HOST && env.SMTP_FROM
      ? nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: Number(env.SMTP_PORT || 587),
          secure: env.SMTP_PORT === "465",
          auth: env.SMTP_USER
            ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
            : undefined,
          connectionTimeout: 10000,
          socketTimeout: 15000,
        })
      : null;
  let busy = false;
  async function tick() {
    if (busy) return;
    busy = true;
    try {
      if (transport)
        for (const mail of await db.list("outbox", { status: "pending", next_attempt: { $lte: Date.now() } }, { sort: { created_at: 1 }, limit: 10 })) {
          try {
            await transport.sendMail({
              from: env.SMTP_FROM,
              to: mail.recipient,
              subject: mail.subject,
              text: mail.body,
              messageId: `<${mail.id.replaceAll(":", "-")}@${env.MAIL_MESSAGE_DOMAIN || "ekatvabharat.org"}>`,
            });
            await db.update("outbox", { id: mail.id }, { $set: { status: "sent" }, $inc: { attempts: 1 } });
          } catch {
            await db.update("outbox", { id: mail.id }, { $inc: { attempts: 1 }, $set: { next_attempt: Date.now() + Math.min(86400000, 60000 * 2 ** Math.min(mail.attempts, 10)) } });
          }
        }
      if (gateway.enabled)
        for (const row of await db.list("donations", { status: "pending", mode: gateway.mode, updated_at: { $lt: new Date(Date.now() - 60000).toISOString() } }, { sort: { updated_at: 1 }, limit: 10 })) {
          try {
            for (const p of (await gateway.orderPayments(row.order_id)).items ||
              [])
              await updatePayment(p);
            await db.update("donations", { id: row.id }, { $set: { updated_at: new Date().toISOString() } });
          } catch {
            /* Retry next cycle; no optimistic success. */
          }
        }
    } finally {
      busy = false;
    }
  }
  const timer = setInterval(
    () =>
      tick().catch(() =>
        console.error("Background delivery or reconciliation needs attention."),
      ),
    60000,
  );
  timer.unref();
  return () => {
    clearInterval(timer);
    transport?.close();
  };
}
