import React, { useEffect, useState } from "react";
import { api } from "./EnquiryForm";
export default function AdminPage() {
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [page, setPage] = useState(0);
  async function load(p = page) {
    try {
      setData(await api(`/api/admin/overview?page=${p}`));
      setError("");
    } catch (e) {
      setData(null);
      setError(e.message);
    }
  }
  useEffect(() => {
    load(page);
  }, [page]);
  async function login(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          token: new FormData(e.currentTarget).get("token"),
        }),
      });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function action(path, body, method = "POST") {
    setBusy(true);
    try {
      await api(path, { method, body: JSON.stringify(body) });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="container section admin-workspace">
      {!data ? (
        <form onSubmit={login} className="checkout-panel">
          <h2>TEAM ACCESS</h2>
          <label>
            Administrator access token
            <input
              type="password"
              name="token"
              autoComplete="current-password"
              required
            />
          </label>
          <button disabled={busy} className="button button-gold">
            Sign in
          </button>
          <p className="small-note">
            Use the access token configured by your site administrator.
          </p>
        </form>
      ) : (
        <>
          <div className="action-row">
            <h2>DONATIONS & ENQUIRIES</h2>
            <a className="button button-navy" href="/api/admin/export">
              Export payment records
            </a>
            <button className="text-link" disabled={busy} onClick={() => load()}>Refresh records</button>
            <button
              className="text-link"
              onClick={async () => {
                await api("/api/admin/logout", { method: "POST", body: "{}" });
                setData(null);
              }}
            >
              Sign out
            </button>
          </div>
          <div className="evidence-strip">
            <div>
              <strong>{data.totals.count}</strong>
              <span>Contribution attempts</span>
            </div>
            <div>
              <strong>
                ₹{(data.totals.received / 100).toLocaleString("en-IN")}
              </strong>
              <span>Live captured less refunds</span>
            </div>
            <div>
              <strong>
                {data.email.find((x) => x.status === "pending")?.count || 0}
              </strong>
              <span>Emails awaiting delivery</span>
            </div>
          </div>
          <p className="small-note">
            {data.metrics.map((x) => `${x.name}: ${x.total}`).join(" · ")}.
            Aggregate starts are indicative, not unique visitors.
          </p>
          <h3>Contribution records</h3>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {[
                    "Date / reference",
                    "Donor",
                    "Contribution",
                    "Status",
                    "Action",
                  ].map((x) => (
                    <th key={x}>{x}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.donations.map((d) => (
                  <tr key={d.id}>
                    <td>
                      {new Date(d.created_at).toLocaleDateString()}
                      <small>{d.id}</small>
                    </td>
                    <td>
                      {d.name}
                      <small>{d.email}</small>
                    </td>
                    <td>
                      ₹{(d.amount / 100).toLocaleString("en-IN")}
                      <small>{d.cause}</small>
                    </td>
                    <td>
                      {d.status} ({d.mode})
                      <small>Refunded ₹{d.refunded / 100}</small>
                    </td>
                    <td>
                      <button
                        disabled={busy || !d.order_id}
                        onClick={() =>
                          action(`/api/admin/donations/${d.id}/reconcile`, {})
                        }
                      >
                        Reconcile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!data.donations.length && <p>No contributions on this page.</p>}
          <h3>Enquiries</h3>
          <div className="admin-enquiries">
            {data.enquiries.map((e) => (
              <article key={e.id}>
                <h3>{e.topic}</h3>
                <p>
                  {e.name} · <a href={`mailto:${e.email}`}>{e.email}</a>
                </p>
                <p className="preserve-lines">{e.message}</p>
                <label>
                  Follow-up status
                  <select
                    value={e.status}
                    disabled={busy}
                    onChange={(event) =>
                      action(
                        `/api/admin/enquiries/${e.id}`,
                        { status: event.target.value },
                        "PATCH",
                      )
                    }
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>
                <small>{e.id}</small>
              </article>
            ))}
          </div>
          {!data.enquiries.length && <p>No enquiries on this page.</p>}
          <div className="action-row">
            <button disabled={!page} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>Page {page + 1}</span>
            <button
              disabled={
                data.donations.length < 50 && data.enquiries.length < 50
              }
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
