import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import {
  createHash,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { z } from "zod";
import { causes, maxDonationPaise } from "../shared/causes.js";
import { validSignature } from "./payments.mjs";
const hash = (value) => createHash("sha256").update(value).digest("hex");
const now = () => new Date().toISOString();
const person = {
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
};
const donateSchema = z.object({
  ...person,
  amount: z.number().int().min(100).max(maxDonationPaise),
  cause: z.enum(causes),
  consent: z.literal(true),
  domestic: z.literal(true),
  requestKey: z.string().uuid(),
  accessToken: z.string().regex(/^[a-f0-9]{64}$/),
});
const enquirySchema = z.object({
  ...person,
  topic: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(3000),
  consent: z.literal(true),
  requestKey: z.string().uuid(),
  website: z.string().max(0).optional(),
});
async function queue(db, id, recipient, subject, body) {
  await db.update("outbox", { id }, { $setOnInsert: { id, recipient, subject, body, created_at: now(), status: "pending", attempts: 0, next_attempt: 0 } }, { upsert: true });
}
export function createApp({ db, gateway, env = process.env }) {
  const app = express();
  app.disable("x-powered-by");
  if (env.TRUST_PROXY === "1") app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use("/api", (_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  const origins = new Set(
    (env.APP_ORIGINS || "http://127.0.0.1:3000,http://localhost:3000").split(
      ",",
    ),
  );
  app.use("/api", (req, res, next) => {
    if (
      req.path === "/payments/webhook" ||
      ["GET", "HEAD"].includes(req.method)
    )
      return next();
    if (!origins.has(req.get("origin")))
      return res.status(403).json({ error: "Request origin not allowed." });
    next();
  });
  const updatePayment = (payment) => db.transaction(async (tx) => {
    const row = await tx.findOne("donations", { order_id: payment.order_id });
    if (
      !row ||
      row.mode !== gateway.mode ||
      payment.currency !== "INR" ||
      payment.amount !== row.amount ||
      !/^pay_[\w]+$/.test(payment.id)
    )
      throw new Error("Payment does not match the donation.");
    // Late failures from other attempts must never overwrite a captured payment.
    if (!["captured", "refunded"].includes(payment.status)) return row;
    if (row.payment_id && row.payment_id !== payment.id)
      throw new Error("Unexpected payment for this order.");
    const refunded = payment.amount_refunded || 0;
    const status =
      refunded >= row.amount
        ? "refunded"
        : refunded > 0
          ? "partially_refunded"
          : "paid";
    // Provider state may be eventually consistent: never roll a refund back.
    if (refunded < row.refunded) return row;
      const receipt = row.receipt_number || `EBF-${row.id}`;
      await tx.update("donations", { id: row.id }, { $set: { status, payment_id: payment.id, refunded, receipt_number: receipt, updated_at: now() } });
      if (status === "paid")
        await queue(
          tx,
          `receipt:${row.id}`,
          row.email,
          `${row.mode === "test" ? "[TEST — no money collected] " : ""}Your Ekatvabharat contribution acknowledgement`,
          `Thank you, ${row.name}.\n\nWe have confirmed your contribution of INR ${(row.amount / 100).toFixed(2)}.\nReference: ${receipt}\nPayment: ${payment.id}\nCause preference: ${row.cause}\n\nThis payment acknowledgement is not a statutory tax certificate. Contact info@ekatvabharatfoundation.com for applicable documentation.\nEkatvabharat Foundation`,
        );
    return tx.findOne("donations", { id: row.id });
  });
  app.post(
    "/api/payments/webhook",
    express.raw({ type: "application/json", limit: "256kb" }),
    async (req, res) => {
      if (
        !Buffer.isBuffer(req.body) ||
        !validSignature(
          req.body,
          req.get("x-razorpay-signature"),
          env.RAZORPAY_WEBHOOK_SECRET,
        )
      )
        return res.status(400).json({ error: "Invalid webhook signature." });
      try {
        const event = JSON.parse(req.body.toString());
        const eventId = req.get("x-razorpay-event-id");
        if (!eventId || eventId.length > 200)
          return res.status(400).json({ error: "Event ID required." });
        if (await db.findOne("payment_events", { id: eventId }))
          return res.json({ received: true });
        const entity = event.payload?.payment?.entity;
        const paymentId =
          entity?.id || event.payload?.refund?.entity?.payment_id;
        if (
          ["payment.captured", "order.paid", "refund.processed"].includes(
            event.event,
          ) &&
          paymentId
        ) {
          if (!/^pay_[\w]+$/.test(paymentId))
            throw new Error("Invalid payment ID.");
          const payment = await gateway.payment(paymentId);
          // Other applications may share the merchant account. Ignore unrelated orders.
          if (
            await db.findOne("donations", { order_id: payment.order_id })
          )
            await updatePayment(payment);
        }
        await db.update("payment_events", { id: eventId }, { $setOnInsert: { id: eventId, processed_at: now() } }, { upsert: true });
        res.json({ received: true });
      } catch {
        res
          .status(503)
          .json({ error: "Event could not be processed. Please retry." });
      }
    },
  );
  app.use(express.json({ limit: "20kb" }));
  app.use(
    "/api",
    rateLimit({
      windowMs: 60000,
      limit: 90,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );
  const writeLimit = rateLimit({
    windowMs: 600000,
    limit: 15,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
  app.get("/api/health", async (_req, res) => {
    await db.ping();
    res.json({ ok: true });
  });
  app.get("/api/config", (_req, res) =>
    res.json({
      paymentsEnabled: gateway.enabled,
      mode: gateway.mode,
      currency: "INR",
    }),
  );
  app.post("/api/donations", writeLimit, async (req, res) => {
    const parsed = donateSchema.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(400)
        .json({ error: "Enter valid donor details, amount and consent." });
    if (!gateway.enabled)
      return res
        .status(503)
        .json({
          error:
            "Online contributions are not available yet. Please use bank transfer or contact the foundation.",
        });
    const data = parsed.data;
    let row = await db.findOne("donations", { request_key: data.requestKey });
    if (row) {
      if (
        row.access_hash !== hash(data.accessToken) ||
        row.amount !== data.amount ||
        row.email !== data.email ||
        row.name !== data.name ||
        row.cause !== data.cause
      )
        return res
          .status(409)
          .json({
            error:
              "This request has already been used. Start a new contribution.",
          });
      if (row.order_id && row.status === "pending")
        return res.json({
          id: row.id,
          orderId: row.order_id,
          keyId: gateway.keyId,
          amount: row.amount,
          currency: "INR",
          mode: gateway.mode,
        });
      return res
        .status(409)
        .json({
          error:
            "This contribution is already processing. Check its status before trying again.",
        });
    }
    const id = randomUUID();
    try {
      await db.insert("donations", { id, access_hash: hash(data.accessToken), request_key: data.requestKey,
        name: data.name, email: data.email, amount: data.amount, cause: data.cause, mode: gateway.mode,
        created_at: now(), updated_at: now(), status: "creating", refunded: 0, consent_version: "2026-11-15" });
    } catch (error) {
      if (error.code === 11000) return res.status(409).json({ error: "This contribution is already processing. Check its status before trying again." });
      throw error;
    }
    try {
      const order = await gateway.createOrder(data.amount, id);
      if (
        !/^order_[\w]+$/.test(order.id) ||
        order.amount !== data.amount ||
        order.currency !== "INR"
      )
        throw new Error("Invalid order");
      await db.update("donations", { id }, { $set: { order_id: order.id, status: "pending", updated_at: now() } });
      res
        .status(201)
        .json({
          id,
          orderId: order.id,
          keyId: gateway.keyId,
          amount: data.amount,
          currency: "INR",
          mode: gateway.mode,
        });
    } catch {
      // Do not blindly retry an ambiguous provider timeout: that could create duplicate orders.
      await db.update("donations", { id }, { $set: { status: "order_error", updated_at: now() } });
      res
        .status(502)
        .json({
          error:
            "Checkout could not be opened. No payment has been requested. Please try again later or contact us.",
          id,
        });
    }
  });
  const donor = async (req, res, next) => {
    const row = await db.findOne("donations", { id: req.params.id });
    const token = req.get("authorization")?.replace(/^Bearer /, "") || "";
    if (!row || row.access_hash !== hash(token))
      return res.status(404).json({ error: "Contribution not found." });
    req.donation = row;
    next();
  };
  const summary = (row) => ({
    id: row.id,
    amount: row.amount,
    cause: row.cause,
    mode: row.mode,
    status: row.status,
    receipt: row.receipt_number,
    refunded: row.refunded,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    checkout: row.order_id
      ? {
          id: row.id,
          orderId: row.order_id,
          keyId: gateway.keyId,
          amount: row.amount,
          currency: "INR",
          mode: gateway.mode,
        }
      : null,
  });
  app.get("/api/donations/:id", donor, (req, res) =>
    res.json(summary(req.donation)),
  );
  app.post("/api/donations/:id/verify", donor, async (req, res) => {
    const row = req.donation;
    const data = z
      .object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string().regex(/^pay_[\w]+$/),
        razorpay_signature: z.string(),
      })
      .safeParse(req.body);
    if (
      !data.success ||
      data.data.razorpay_order_id !== row.order_id ||
      !validSignature(
        `${row.order_id}|${data.data.razorpay_payment_id}`,
        data.data.razorpay_signature,
        env.RAZORPAY_KEY_SECRET,
      )
    )
      return res
        .status(400)
        .json({
          error:
            "Payment verification failed. Please contact the foundation with your payment reference.",
        });
    try {
      const payment = await gateway.payment(data.data.razorpay_payment_id);
      if (payment.order_id !== row.order_id)
        throw new Error("Mismatched order");
      res.json(summary(await updatePayment(payment)));
    } catch {
      res
        .status(503)
        .json({
          error:
            "Confirmation is pending. Do not pay again; check this contribution shortly.",
        });
    }
  });
  app.post("/api/enquiries", writeLimit, async (req, res) => {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(400)
        .json({
          error: "Please enter your name, email, topic, message and consent.",
        });
    const data = parsed.data;
    const old = await db.findOne("enquiries", { request_key: data.requestKey });
    if (old) return res.json({ id: old.id });
    const id = randomUUID();
    try {
      await db.transaction(async (tx) => {
        await tx.insert("enquiries", { id, request_key: data.requestKey, name: data.name, email: data.email,
          topic: data.topic, message: data.message, created_at: now(), status: "new", consent_version: "2026-11-15" });
        await queue(tx, `enquiry:${id}`, env.CONTACT_EMAIL || "info@ekatvabharatfoundation.com",
          `Website enquiry: ${data.topic}`, `${data.name}\n${data.email}\nReference: ${id}\n\n${data.message}`);
      });
    } catch (error) {
      if (error.code === 11000) {
        const existing = await db.findOne("enquiries", { request_key: data.requestKey });
        if (existing) return res.json({ id: existing.id });
      }
      throw error;
    }
    res.status(201).json({ id });
  });
  app.post("/api/events", async (req, res) => {
    if (!["donation_view", "checkout_start"].includes(req.body?.name))
      return res.status(400).end();
    await db.update("metrics", { name: req.body.name }, { $inc: { total: 1 } }, { upsert: true });
    res.status(204).end();
  });
  const cookieName = "ebf_admin";
  const loginLimit = rateLimit({
    windowMs: 900000,
    limit: 8,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
  app.post("/api/admin/login", loginLimit, async (req, res) => {
    const expected = env.ADMIN_TOKEN;
    if (!expected || expected.length < 32)
      return res
        .status(503)
        .json({ error: "Administration is not configured." });
    const supplied = typeof req.body?.token === "string" ? req.body.token : "";
    if (
      !timingSafeEqual(Buffer.from(hash(supplied)), Buffer.from(hash(expected)))
    )
      return res.status(401).json({ error: "Invalid access token." });
    const token = randomBytes(32).toString("hex");
    await db.remove("admin_sessions", { expires_at: { $lt: Date.now() } });
    await db.insert("admin_sessions", { token_hash: hash(token), expires_at: Date.now() + 3600000 });
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin",
      maxAge: 3600000,
    });
    res.json({ ok: true });
  });
  app.use("/api/admin", async (req, res, next) => {
    const token =
      (req.get("cookie") || "")
        .split(";")
        .map((x) => x.trim())
        .find((x) => x.startsWith(`${cookieName}=`))
        ?.slice(cookieName.length + 1) || "";
    if (!(await db.findOne("admin_sessions", { token_hash: hash(token), expires_at: { $gt: Date.now() } })))
      return res.status(401).json({ error: "Sign in to continue." });
    req.sessionHash = hash(token);
    next();
  });
  app.post("/api/admin/logout", async (req, res) => {
    await db.remove("admin_sessions", { token_hash: req.sessionHash });
    res.clearCookie(cookieName, { path: "/api/admin" });
    res.json({ ok: true });
  });
  app.get("/api/admin/overview", async (req, res) => {
    const page = Math.max(
      0,
      Math.min(10000, Number.parseInt(req.query.page) || 0),
    );
    const [donations, enquiries, totals, email, metrics] = await Promise.all([
      db.list("donations", {}, { skip: page * 50, projection: { _id: 0, access_hash: 0, request_key: 0 } }),
      db.list("enquiries", {}, { skip: page * 50, projection: { _id: 0, request_key: 0 } }),
      db.aggregate("donations", [{ $group: { _id: null, count: { $sum: 1 }, received: { $sum: { $cond: [
        { $and: [{ $eq: ["$mode", "live"] }, { $in: ["$status", ["paid", "partially_refunded", "refunded"]] }] },
        { $subtract: ["$amount", "$refunded"] }, 0 ] } } } }]),
      db.aggregate("outbox", [{ $group: { _id: "$status", count: { $sum: 1 } } }, { $project: { _id: 0, status: "$_id", count: 1 } }]),
      db.list("metrics"),
    ]);
    res.json({ donations, enquiries, totals: { count: totals[0]?.count || 0, received: totals[0]?.received || 0 }, email, metrics, page });
  });
  app.patch("/api/admin/enquiries/:id", async (req, res) => {
    if (!["new", "in_progress", "closed"].includes(req.body?.status))
      return res.status(400).json({ error: "Invalid status." });
    const result = await db.update("enquiries", { id: req.params.id }, { $set: { status: req.body.status } });
    if (!result.matchedCount) return res.status(404).json({ error: "Enquiry not found." });
    res.json({ ok: true });
  });
  app.post("/api/admin/donations/:id/reconcile", async (req, res) => {
    const row = await db.findOne("donations", { id: req.params.id });
    if (!row?.order_id)
      return res
        .status(400)
        .json({
          error: "No provider order available. Review the merchant dashboard.",
        });
    try {
      for (const p of (await gateway.orderPayments(row.order_id)).items || [])
        await updatePayment(p);
      res.json({ ok: true });
    } catch {
      res.status(502).json({ error: "Reconciliation could not complete." });
    }
  });
  app.get("/api/admin/export", async (req, res) => {
    const rows = await db.list("donations", {}, { limit: 10000, projection: { _id: 0, access_hash: 0, request_key: 0, name: 0, email: 0 } });
    const columns = [
      "id",
      "created_at",
      "amount",
      "cause",
      "mode",
      "status",
      "refunded",
      "order_id",
      "payment_id",
      "receipt_number",
    ];
    const csv = (value) =>
      '"' +
      String(value ?? "")
        .replace(/^[=+@-]/, "'$&")
        .replaceAll('"', '""') +
      '"';
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="donations-paise.csv"',
    );
    res.send(
      [
        columns.join(","),
        ...rows.map((row) => columns.map((c) => csv(row[c])).join(",")),
      ].join("\r\n"),
    );
  });
  app.use("/api", (_req, res) =>
    res.status(404).json({ error: "Endpoint not found." }),
  );
  app.use((err, _req, res, _next) => {
    res
      .status(err.type === "entity.too.large" ? 413 : 500)
      .json({ error: "Request could not be completed." });
  });
  return { app, updatePayment };
}
