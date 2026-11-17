import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response
    .json()
    .catch(() => ({ error: "The service is unavailable. Please try again." }));
  if (!response.ok)
    throw new Error(data.error || "Request could not be completed.");
  return data;
}
export default function EnquiryForm({ topic = "General enquiry" }) {
  const [state, setState] = useState({}),
    requestKey = useRef(crypto.randomUUID());
  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState({ busy: true });
    try {
      const result = await api("/api/enquiries", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          topic: form.get("interest"),
          message: form.get("message"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
          requestKey: requestKey.current,
        }),
      });
      setState({ id: result.id });
    } catch (error) {
      setState({ error: error.message });
    }
  }
  if (state.id)
    return (
      <div className="form-confirmation" role="status">
        <h3>Your enquiry is saved.</h3>
        <p>
          Thank you for getting in touch. The foundation team can follow up
          using the email you provided.
        </p>
        <p className="small-note">Reference: {state.id}</p>
        <a href="/contact" className="text-link">
          Contact details <ArrowUpRight size={17} />
        </a>
      </div>
    );
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
          />
        </label>
      </div>
      <label>
        I’m interested in
        <input
          name="interest"
          defaultValue={topic}
          minLength={2}
          maxLength={150}
          required
        />
      </label>
      <label>
        Your message
        <textarea
          name="message"
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="Tell us your location, interests and how you would like to participate."
          required
        />
      </label>
      <label className="honey" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that the foundation may use these details to respond to my
          enquiry. <a href="/privacy">Privacy information</a>
        </span>
      </label>
      <button className="button button-gold" disabled={state.busy}>
        {state.busy ? "Saving…" : "Send enquiry"}
        <ArrowUpRight size={18} />
      </button>
      {state.error && (
        <p role="alert" className="form-error">
          {state.error} You can also email{" "}
          <a href="mailto:info@ekatvabharat.org">info@ekatvabharat.org</a>.
        </p>
      )}
    </form>
  );
}
