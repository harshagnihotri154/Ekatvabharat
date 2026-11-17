import { createHmac, timingSafeEqual } from "node:crypto";
export function validSignature(message, signature, secret) {
  if (
    !secret ||
    typeof signature !== "string" ||
    !/^[a-f0-9]{64}$/i.test(signature)
  )
    return false;
  const expected = createHmac("sha256", secret).update(message).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}
export function createGateway(env) {
  const configured = !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
  const live = env.RAZORPAY_KEY_ID?.startsWith("rzp_live_");
  const enabled =
    configured && (!live || env.DONATIONS_LIVE_APPROVED === "true");
  async function request(path, body) {
    if (!enabled) throw new Error("Online payments are not configured.");
    const response = await fetch(`https://api.razorpay.com/v1${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      throw new Error("Payment provider is temporarily unavailable.");
    return response.json();
  }
  return {
    enabled,
    mode: live ? "live" : "test",
    keyId: env.RAZORPAY_KEY_ID,
    createOrder: (amount, receipt) =>
      request("/orders", {
        amount,
        currency: "INR",
        receipt,
        partial_payment: false,
      }),
    payment: (id) => request(`/payments/${encodeURIComponent(id)}`),
    orderPayments: (id) =>
      request(`/orders/${encodeURIComponent(id)}/payments`),
  };
}
