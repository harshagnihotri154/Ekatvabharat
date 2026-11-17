import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { causes, maxDonationPaise } from "../../shared/causes";
import { DonationDetails, DonationOptions, DonationTaxInfo } from "./Giving";
import { api } from "./EnquiryForm";
import DonationGuidance from "./DonationGuidance";
import { trackSuccess } from "../analytics";
let checkoutScript;
function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScript) return checkoutScript;
  checkoutScript = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    const timer = setTimeout(() => {
      script.remove();
      checkoutScript = null;
      reject(new Error("Checkout took too long to load. Please retry."));
    }, 15000);
    script.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      checkoutScript = null;
      reject(
        new Error(
          "Could not load secure checkout. Check your connection and retry.",
        ),
      );
    };
    document.body.append(script);
  });
  return checkoutScript;
}
const money = (p) =>
  `₹${(p / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
function token() {
  return [...crypto.getRandomValues(new Uint8Array(32))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
export default function DonationCheckout() {
  const params = new URLSearchParams(location.search);
  const [donation, setDonation] = useState(null),
    [bank, setBank] = useState(false),
    [config, setConfig] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [result, setResult] = useState(null),
    [statusRef, setStatusRef] = useState(null);
  const request = useRef({
      requestKey: crypto.randomUUID(),
      accessToken: token(),
    }),
    orderRef = useRef(null),
    donor = useRef(null),
    mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    api("/api/config")
      .then(setConfig)
      .catch(() => setConfig({ paymentsEnabled: false }));
    api("/api/events", {
      method: "POST",
      body: JSON.stringify({ name: "donation_view" }),
    }).catch(() => {});
    try {
      const saved = JSON.parse(sessionStorage.getItem("ebf-donation"));
      if (saved?.id && saved?.accessToken) {
        setStatusRef(saved);
        api(`/api/donations/${saved.id}`, {
          headers: { Authorization: `Bearer ${saved.accessToken}` },
        })
          .then(setResult)
          .catch(() => sessionStorage.removeItem("ebf-donation"));
      }
    } catch {}
    return () => {
      mounted.current = false;
    };
  }, []);
  async function refresh(ref = statusRef) {
    if (!ref) return;
    try {
      const next = await api(`/api/donations/${ref.id}`, {
        headers: { Authorization: `Bearer ${ref.accessToken}` },
      });
      if (mounted.current) {
        setResult(next);
        setError("");
      }
    } catch (e) {
      if (mounted.current) setError(e.message);
    }
  }
  useEffect(() => {
    if (result?.status === "paid" && result.mode === "live") {
      trackSuccess("donation_success", result.id);
    }
  }, [result]);
  useEffect(() => {
    if (result?.status !== "pending" || !statusRef) return;
    const timer = setInterval(() => refresh(statusRef), 5000);
    return () => clearInterval(timer);
  }, [result?.status, statusRef]);
  async function pay(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      ...request.current,
      name: form.get("name"),
      email: form.get("email"),
      amount: Math.round(donation.amount * 100),
      cause: donation.cause,
      domestic: form.get("domestic") === "on",
      consent: form.get("consent") === "on",
    };
    try {
      if (!orderRef.current) {
        orderRef.current = await api("/api/donations", {
          method: "POST",
          body: JSON.stringify(body),
        });
        donor.current = body;
      }
      const order = orderRef.current;
      const ref = { id: order.id, accessToken: request.current.accessToken };
      setStatusRef(ref);
      try {
        sessionStorage.setItem("ebf-donation", JSON.stringify(ref));
      } catch {}
      await loadCheckout();
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: "INR",
        order_id: order.orderId,
        name: "Ekatvabharat Foundation",
        description: donation.cause,
        prefill: { name: donor.current.name, email: donor.current.email },
        theme: { color: "#0b2032" },
        modal: {
          ondismiss: () => {
            if (mounted.current) {
              setBusy(false);
              setError(
                "Checkout closed. If money was debited, check payment status before trying again.",
              );
            }
          },
        },
        handler: async (response) => {
          try {
            const verified = await api(`/api/donations/${order.id}/verify`, {
              method: "POST",
              headers: { Authorization: `Bearer ${ref.accessToken}` },
              body: JSON.stringify(response),
            });
            if (mounted.current) setResult(verified);
          } catch (e) {
            if (mounted.current) {
              setResult({
                status: "pending",
                id: order.id,
                amount: order.amount,
                cause: donation.cause,
              });
              setError(e.message);
            }
          } finally {
            if (mounted.current) setBusy(false);
          }
        },
      });
      checkout.on("payment.failed", () => {
        if (mounted.current)
          setError(
            "The payment attempt did not complete. You can retry in checkout or close it and check the status.",
          );
      });
      api("/api/events", {
        method: "POST",
        body: JSON.stringify({ name: "checkout_start" }),
      }).catch(() => {});
      checkout.open();
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }
  function resume() {
    if (!result?.checkout) return;
    setDonation({ amount: result.amount / 100, cause: result.cause });
    orderRef.current = result.checkout;
    donor.current = { name: result.name, email: result.email };
    request.current.accessToken = statusRef.accessToken;
    setResult(null);
    setError(
      "Retry the same contribution only if your previous attempt was not debited.",
    );
  }
  function reset() {
    sessionStorage.removeItem("ebf-donation");
    setResult(null);
    setStatusRef(null);
    setDonation(null);
    orderRef.current = null;
    request.current = { requestKey: crypto.randomUUID(), accessToken: token() };
    setError("");
  }
  const initial = Number(params.get("amount"));
  return (
    <>
      <section className="container section donation-layout">
        <aside className="donation-context">
          <p className="eyebrow">A CONTRIBUTION WITH PURPOSE</p>
          <h2>
            A small step.
            <br />
            Taken together.
          </h2>
          <p>
            Support practical learning, community care and opportunities for a
            more independent life.
          </p>
          <img
            src="/images/learning.webp"
            alt="Community learning activities from the foundation archive"
          />
          <p className="image-note">
            Foundation activity archive · event date not supplied
          </p>
          <div className="donor-promises">
            <p>
              <ShieldCheck size={20} /> No account needed to contribute.
            </p>
            <p>
              Choose an amount you are comfortable with. Cause selections
              express a preference; please contact us before making a restricted
              grant.
            </p>
            <a href="/transparency" className="text-link">
              Know the foundation <ArrowRight size={17} />
            </a>
          </div>
          <DonationGuidance />
        </aside>
        <div className="checkout-panel">
          <ol className="checkout-steps" aria-label="Contribution steps">
            <li aria-current={!donation && !result ? "step" : undefined}>
              1. Your gift
            </li>
            <li aria-current={donation && !result ? "step" : undefined}>
              2. Your details
            </li>
            <li aria-current={result ? "step" : undefined}>3. Confirmation</li>
          </ol>
          {result ? (
            <div role="status" className="payment-result">
              {(result.mode === "test" || config?.mode === "test") && (
                <p className="service-note">
                  Test confirmation — no real donation collected.
                </p>
              )}
              <CheckCircle2 size={32} />
              <h3>
                {result.status === "paid"
                  ? "Thank you for your contribution."
                  : result.status.includes("refund")
                    ? "Your contribution was refunded."
                    : "We’re checking your payment."}
              </h3>
              <p>
                {money(result.amount)} · {result.cause}
              </p>
              <p>
                {result.status === "paid"
                  ? "Your payment is confirmed. An acknowledgement is queued for your email. You can print this confirmation for your records."
                  : result.status.includes("refund")
                    ? `Refund recorded: ${money(result.refunded)}. Contact us for refund support.`
                    : "Please do not pay again if money has been debited. Confirmation can arrive after checkout closes."}
              </p>
              <p className="small-note">
                Reference: {result.receipt || result.id}
              </p>
              {result.status === "pending" && result.checkout && (
                <button className="text-link" onClick={resume}>
                  Resume the same contribution
                </button>
              )}
              <p className="small-note">
                This is a payment acknowledgement, not a statutory donation
                certificate.
              </p>
              <div className="action-row">
                <button
                  className="button button-navy"
                  onClick={() => refresh()}
                >
                  Check payment status
                </button>
                {result.status === "paid" && (
                  <button className="text-link" onClick={() => window.print()}>
                    Print acknowledgement
                  </button>
                )}
              </div>
              {result.status === "paid" && (
                <button className="text-link" onClick={reset}>
                  Make another contribution
                </button>
              )}
              <a className="text-link" href="/contact">
                Need help with this contribution?
              </a>
            </div>
          ) : !donation ? (
            <>
              <h3>Choose your contribution.</h3>
              <p>One-time giving, in Indian rupees.</p>
              <DonationOptions
                initialAmount={
                  initial >= 1 && initial <= maxDonationPaise / 100
                    ? String(initial)
                    : "1000"
                }
                initialCause={
                  causes.includes(params.get("cause"))
                    ? params.get("cause")
                    : causes[0]
                }
                onContinue={(value) => {
                  setDonation(value);
                  setError("");
                }}
              />
            </>
          ) : (
            <>
              <button
                className="text-link"
                disabled={busy || !!orderRef.current}
                onClick={() => {
                  setDonation(null);
                  setBank(false);
                }}
              >
                <ArrowLeft size={17} /> Change amount or cause
              </button>
              <h3>{money(Math.round(donation.amount * 100))}</h3>
              <p>{donation.cause}</p>
              {config?.mode === "test" && config.paymentsEnabled && (
                <p className="service-note">
                  Test checkout — no real donation will be collected.
                </p>
              )}
              {config?.paymentsEnabled ? (
                <form onSubmit={pay}>
                  <label>
                    Your name
                    <input
                      name="name"
                      defaultValue={donor.current?.name}
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      required
                      readOnly={!!orderRef.current}
                    />
                  </label>
                  <label>
                    Email for your acknowledgement
                    <input
                      type="email"
                      name="email"
                      defaultValue={donor.current?.email}
                      autoComplete="email"
                      maxLength={200}
                      required
                      readOnly={!!orderRef.current}
                    />
                  </label>
                  <label className="consent">
                    <input type="checkbox" name="domestic" required />
                    <span>
                      I am an Indian citizen contributing my own funds from an
                      Indian bank account. For other contributions,{" "}
                      <a href="/contact">contact the foundation</a>.
                    </span>
                  </label>
                  <label className="consent">
                    <input type="checkbox" name="consent" required />
                    <span>
                      I agree to the{" "}
                      <a href="/donation-policy">donation terms</a> and use of
                      my details for payment processing and acknowledgement as
                      described in the{" "}
                      <a href="/privacy">privacy information</a>.
                    </span>
                  </label>
                  <button disabled={busy} className="button button-gold">
                    {busy
                      ? "Opening secure checkout…"
                      : `Contribute ${money(Math.round(donation.amount * 100))}`}
                    <ArrowRight size={18} />
                  </button>
                  <p className="small-note">
                    Secure checkout by Razorpay. Available payment methods
                    appear at checkout.
                  </p>
                </form>
              ) : (
                <p className="service-note">
                  {config
                    ? "Online giving is being prepared. You can contribute by bank transfer or contact us for help."
                    : "Checking online payment availability…"}
                </p>
              )}
              {statusRef && (
                <button className="text-link" onClick={() => refresh()}>
                  Check payment status before retrying
                </button>
              )}
              <details
                open={bank}
                onToggle={(e) => setBank(e.currentTarget.open)}
              >
                <summary>Prefer a bank transfer?</summary>
                <DonationDetails donation={donation} />
              </details>
            </>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <p className="checkout-support">
            Questions? <a href="tel:+919272799605">+91 92727 99605</a> ·{" "}
            <a href="/donation-policy">Donation & refund information</a>
          </p>
        </div>
      </section>
      <DonationTaxInfo />
    </>
  );
}
