import test from "node:test";
import assert from "node:assert/strict";
import { createHmac, randomUUID, randomBytes } from "node:crypto";
import { openDatabase, collections } from "../../server/database.mjs";
import { createApp } from "../../server/app.mjs";
import { createGateway } from "../../server/payments.mjs";
const origin = "http://localhost:3000",
  secret = "test-secret",
  hookSecret = "webhook-secret";
const signature = (message, key = secret) =>
  createHmac("sha256", key).update(message).digest("hex");
async function fixture(t) {
  const databaseName = `ebf_test_${randomUUID().replaceAll("-", "").slice(0,24)}`;
  const db = await openDatabase(process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27018/?replicaSet=ebf-local", databaseName);
  let orders = 0,
    payment = {
      id: "pay_verified",
      order_id: "order_1",
      amount: 100000,
      currency: "INR",
      status: "captured",
      amount_refunded: 0,
    };
  const gateway = {
    enabled: true,
    mode: "test",
    keyId: "rzp_test_example",
    createOrder: async (amount) => ({
      id: `order_${++orders}`,
      amount,
      currency: "INR",
    }),
    payment: async () => payment,
    orderPayments: async () => ({ items: [payment] }),
  };
  const { app } = createApp({
    db,
    gateway,
    env: {
      APP_ORIGINS: origin,
      RAZORPAY_KEY_SECRET: secret,
      RAZORPAY_WEBHOOK_SECRET: hookSecret,
      ADMIN_TOKEN: "a".repeat(64),
    },
  });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    for (const table of collections) await db.remove(table, {});
    await db.close();
  });
  const url = `http://127.0.0.1:${server.address().port}`;
  const call = async (path, body, headers = {}, method = "POST") => {
    const response = await fetch(url + path, {
      method,
      headers: {
        Origin: origin,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return {
      status: response.status,
      headers: response.headers,
      body: await response.json().catch(() => null),
    };
  };
  const data = {
    name: "Test Donor",
    email: "test@example.test",
    amount: 100000,
    cause: "Where it is needed most",
    consent: true,
    domestic: true,
    requestKey: randomUUID(),
    accessToken: randomBytes(32).toString("hex"),
  };
  const create = () => call("/api/donations", data);
  const verify = (id) =>
    call(
      `/api/donations/${id}/verify`,
      {
        razorpay_order_id: "order_1",
        razorpay_payment_id: "pay_verified",
        razorpay_signature: signature("order_1|pay_verified"),
      },
      { Authorization: `Bearer ${data.accessToken}` },
    );
  const webhook = async (id = "event_1") => {
    const body = JSON.stringify({
      event: "payment.captured",
      payload: { payment: { entity: payment } },
    });
    return fetch(url + "/api/payments/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": signature(body, hookSecret),
        "x-razorpay-event-id": id,
      },
      body,
    });
  };
  return {
    databaseName,
    db,
    call,
    data,
    create,
    verify,
    webhook,
    gateway,
    setPayment: (value) => {
      payment = { ...payment, ...value };
    },
    orders: () => orders,
  };
}
test("server creates one order for retried requests and rejects changed amounts", async (t) => {
  const f = await fixture(t);
  assert.equal((await f.create()).status, 201);
  assert.equal((await f.create()).status, 200);
  assert.equal(f.orders(), 1);
  f.data.amount = 200000;
  assert.equal((await f.create()).status, 409);
});
test("invalid amounts, missing domestic declaration and consent are rejected", async (t) => {
  const f = await fixture(t);
  for (const patch of [
    { amount: 0 },
    { amount: 100.5 },
    { amount: 100000001 },
    { domestic: false },
    { consent: false },
    { cause: "unknown" },
  ])
    assert.equal(
      (await f.call("/api/donations", { ...f.data, ...patch })).status,
      400,
    );
  assert.equal(f.orders(), 0);
});
test("unsigned, cross-origin and unauthorised operations fail", async (t) => {
  const f = await fixture(t);
  const { body } = await f.create();
  assert.equal(
    (await f.call(`/api/donations/${body.id}`, undefined, {}, "GET")).status,
    404,
  );
  assert.equal(
    (await f.call("/api/enquiries", {}, { Origin: "https://evil.test" }))
      .status,
    403,
  );
  assert.equal(
    (await f.call("/api/admin/overview", undefined, {}, "GET")).status,
    401,
  );
  assert.equal((await f.call("/api/payments/webhook", {})).status, 400);
  assert.equal(
    (
      await f.call(
        `/api/donations/${body.id}/verify`,
        {
          razorpay_order_id: "order_1",
          razorpay_payment_id: "pay_verified",
          razorpay_signature: "0".repeat(64),
        },
        { Authorization: `Bearer ${f.data.accessToken}` },
      )
    ).status,
    400,
  );
});
test("only captured matching payments confirm a donation; receipts are queued once", async (t) => {
  const f = await fixture(t);
  const { body } = await f.create();
  f.setPayment({ status: "authorized" });
  assert.equal((await f.verify(body.id)).body.status, "pending");
  assert.equal(await f.db.count("outbox"), 0);
  f.setPayment({ status: "captured", amount: 1 });
  assert.equal((await f.verify(body.id)).status, 503);
  f.setPayment({ amount: 100000, currency: "USD" });
  assert.equal((await f.verify(body.id)).status, 503);
  f.setPayment({ currency: "INR" });
  assert.equal((await f.verify(body.id)).body.status, "paid");
  assert.equal((await f.verify(body.id)).body.status, "paid");
  assert.equal(await f.db.count("outbox"), 1);
});
test("webhook confirms without a browser callback, deduplicates and cannot undo refunds", async (t) => {
  const f = await fixture(t);
  const { body } = await f.create();
  assert.equal((await f.webhook()).status, 200);
  assert.equal((await f.webhook()).status, 200);
  assert.equal(
    await f.db.count("payment_events"),
    1,
  );
  f.setPayment({ amount_refunded: 50000 });
  await f.webhook("event_2");
  assert.equal(
    (await f.db.findOne("donations", { id: body.id })).status,
    "partially_refunded",
  );
  f.setPayment({ amount_refunded: 0 });
  await f.webhook("late_event");
  assert.equal(
    (await f.db.findOne("donations")).refunded,
    50000,
  );
});
test("enquiries persist and deduplicate; admin session can manage follow-up and logout", async (t) => {
  const f = await fixture(t);
  const enquiry = {
    name: "Test Person",
    email: "person@example.test",
    topic: "Volunteering",
    message: "I would like to help with skills training.",
    consent: true,
    requestKey: randomUUID(),
  };
  const { body } = await f.call("/api/enquiries", enquiry);
  await f.call("/api/enquiries", enquiry);
  assert.equal(await f.db.count("enquiries"), 1);
  const login = await f.call("/api/admin/login", { token: "a".repeat(64) });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  assert.match(login.headers.get("set-cookie"), /HttpOnly/i);
  assert.equal(
    (await f.call("/api/admin/overview", undefined, { Cookie: cookie }, "GET"))
      .body.enquiries[0].id,
    body.id,
  );
  await f.call(
    `/api/admin/enquiries/${body.id}`,
    { status: "closed" },
    { Cookie: cookie },
    "PATCH",
  );
  assert.equal(
    (await f.db.findOne("enquiries")).status,
    "closed",
  );
  await f.call("/api/admin/logout", {}, { Cookie: cookie });
  assert.equal(
    (await f.call("/api/admin/overview", undefined, { Cookie: cookie }, "GET"))
      .status,
    401,
  );
});
test("provider failure does not silently create another order or mark a donation paid", async (t) => {
  const f = await fixture(t);
  f.gateway.createOrder = async () => {
    throw new Error("timeout");
  };
  assert.equal((await f.create()).status, 502);
  assert.equal((await f.create()).status, 409);
  assert.equal(
    (await f.db.findOne("donations")).status,
    "order_error",
  );
});
test("live keys stay disabled until explicit launch configuration", () => {
  assert.equal(
    createGateway({
      RAZORPAY_KEY_ID: "rzp_live_x",
      RAZORPAY_KEY_SECRET: "secret",
    }).enabled,
    false,
  );
  assert.equal(createGateway({}).enabled, false);
});

test("concurrent submissions create one enquiry and one notification", async (t) => {
  const f = await fixture(t);
  const enquiry = { name: "Concurrent Test", email: "concurrent@example.test", topic: "Volunteering", message: "I would like to volunteer for skills training.", consent: true, requestKey: randomUUID() };
  const results = await Promise.all(Array.from({ length: 5 }, () => f.call("/api/enquiries", enquiry)));
  assert.ok(results.every(result => [200, 201].includes(result.status)));
  assert.equal(new Set(results.map(result => result.body.id)).size, 1);
  assert.equal(await f.db.count("enquiries"), 1);
  assert.equal(await f.db.count("outbox"), 1);
});

test("concurrent payment confirmations queue one receipt and keep donor secrets out of admin", async (t) => {
  const f = await fixture(t);
  const { body } = await f.create();
  const results = await Promise.all(Array.from({ length: 4 }, () => f.verify(body.id)));
  assert.ok(results.every(result => result.body.status === "paid"));
  assert.equal(await f.db.count("outbox"), 1);
  const login = await f.call("/api/admin/login", { token: "a".repeat(64) });
  const cookie = login.headers.get("set-cookie").split(";")[0];
  const overview = await f.call("/api/admin/overview", undefined, { Cookie: cookie }, "GET");
  assert.equal(overview.body.donations[0].name, f.data.name);
  assert.equal(overview.body.donations[0].access_hash, undefined);
  assert.equal(overview.body.donations[0].request_key, undefined);
  assert.equal(overview.body.totals.received, 0); // Test payments are not live income.
});

test("failed multi-collection writes roll back", async (t) => {
  const f = await fixture(t);
  await assert.rejects(f.db.transaction(async (tx) => {
    await tx.insert("enquiries", { id: randomUUID(), request_key: randomUUID(), name: "Rollback test" });
    throw new Error("simulated queue failure");
  }), /simulated queue failure/);
  assert.equal(await f.db.count("enquiries"), 0);
});


test("saved enquiry remains available through a fresh MongoDB connection", async (t) => {
  const f = await fixture(t);
  const result = await f.call("/api/enquiries", { name: "Persistence Test", email: "persist@example.test", topic: "Volunteering", message: "I would like to support the foundation.", consent: true, requestKey: randomUUID() });
  assert.equal(result.status, 201);
  const reconnected = await openDatabase(process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27018/?replicaSet=ebf-local", f.databaseName);
  try { assert.equal((await reconnected.findOne("enquiries", { id: result.body.id })).email, "persist@example.test"); }
  finally { await reconnected.close(); }
});
