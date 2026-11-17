import React from "react";
import { ArrowUpRight, FileText } from "lucide-react";
export function EvidenceStrip() {
  return (
    <section
      className="evidence-strip container"
      aria-label="Foundation at a glance"
    >
      <div>
        <strong>2021</strong>
        <span>Established in Pune</span>
      </div>
      <div>
        <strong>4 batches</strong>
        <span>
          Hospitality training · 2024–25 records
        </span>
      </div>
      <div>
        <strong>Pune & PCMC</strong>
        <span>Training & outreach locations</span>
      </div>
      <a href="/transparency">
        Our records <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
export function TrustSection() {
  return (
    <section className="trust-section container section">
      <div>
        <p className="eyebrow">UNDERSTAND BEFORE YOU GIVE</p>
        <h2>
          Good intentions.
          <br />
          Clear information.
        </h2>
        <p>
          Know who is behind the work, what our records show and which documents
          to request before supporting a project.
        </p>
        <a className="button button-navy" href="/transparency">
          Explore our transparency page <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="trust-links">
        {[
          ["Our organisation", "Section 8 company, incorporated in 2021."],
          [
            "Our activity records",
            "Historical program evidence, with its reporting period.",
          ],
          [
            "Your contribution",
            "Payment confirmation, support and documentation explained.",
          ],
        ].map(([title, text]) => (
          <article key={title}>
            <FileText size={22} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
