import React, { useState } from "react";
import {
  ArrowRight,
  Heart,
  Copy,
  Phone,
  Mail,
  ArrowLeft,
  Building2,
  FileCheck2,
} from "lucide-react";

export const donationBankConfirmed = true;
const causes = [
  "Where it is needed most",
  "Skills & livelihoods",
  "Community healthcare",
  "Sustainable agriculture",
  "Women & youth empowerment",
];
export function DonationOptions({
  onContinue,
  initialAmount = "1000",
  initialCause = causes[0],
  compact = false,
}) {
  const [amount, setAmount] = useState(initialAmount),
    [cause, setCause] = useState(initialCause);
  return (
    <form
      className={`giving-form ${compact ? "compact" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onContinue({ amount: Number(amount), cause });
      }}
    >
      <fieldset>
        <legend>Choose your contribution</legend>
        <div className="giving-amounts">
          {[500, 1000, 2500, 5000].map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={Number(amount) === value}
              className={Number(amount) === value ? "active" : ""}
              onClick={() => setAmount(String(value))}
            >
              ₹{value.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        Or enter your own amount{" "}
        <span className="currency-input">
          <span aria-hidden="true">₹</span>
          <input
            name="amount"
            aria-label="Donation amount in rupees"
            type="number"
            inputMode="decimal"
            min="1"
            max="10000000"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </span>
      </label>
      <label>
        Choose a cause
        <select
          name="cause"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
        >
          {causes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <div className="giving-summary">
        <Heart size={17} />
        <span>A one-time gift. A shared step forward.</span>
      </div>
      <button className="button button-gold" type="submit">
        {donationBankConfirmed
          ? "View donation details"
          : "Continue with my contribution"}
        <ArrowRight size={18} />
      </button>
      <p className="small-note">
        {donationBankConfirmed
          ? "Donate directly by bank transfer. No payment is taken here."
          : "Our team will share current payment instructions. No payment is taken here."}
      </p>
    </form>
  );
}

export function DonationDetails({ donation, onEdit }) {
  const [copied, setCopied] = useState("");
  async function copy(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(`${label} copied`);
    } catch {
      setCopied(
        "Copy was unavailable. Please select and copy the details below.",
      );
    }
  }
  const summary = `₹${donation.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  const subject = encodeURIComponent(
    `Donation enquiry: ${summary} — ${donation.cause}`,
  );
  const body = encodeURIComponent(
    `Hello Ekatvabharat Foundation,\n\nI would like to contribute ${summary} towards ${donation.cause}. Please share ${donationBankConfirmed ? "receipt requirements, current tax approval details, the applicable donation certificate, and confirm any cause preference arrangements" : "current payment instructions and receipt requirements"}.\n\nMy name:\nMy contact number:\n\nThank you.`,
  );
  return (
    <div className="donation-details">
      <div className="donation-total">
        <Heart size={24} />
        <span>
          <small>YOUR SELECTED CONTRIBUTION</small>
          <strong>{summary}</strong>
          <span>{donation.cause}</span>
        </span>
      </div>
      <button className="text-link edit-gift" onClick={onEdit}>
        <ArrowLeft size={15} /> Change amount or cause
      </button>
      {donationBankConfirmed ? (
        <>
          <h3>
            <Building2 size={20} /> Direct bank transfer
          </h3>
          <dl className="bank-details">
            <div>
              <dt>Account name</dt>
              <dd>Ekatvabharat Foundation</dd>
            </div>
            <div>
              <dt>Bank</dt>
              <dd>Kotak Bank</dd>
            </div>
            <div>
              <dt>Account number</dt>
              <dd>
                7246196719{" "}
                <button
                  className="copy-detail"
                  onClick={() => copy("7246196719", "Account number")}
                  aria-label="Copy account number"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
            <div>
              <dt>IFSC</dt>
              <dd>
                KKBK0001758{" "}
                <button
                  className="copy-detail"
                  onClick={() => copy("KKBK0001758", "IFSC")}
                  aria-label="Copy IFSC"
                >
                  <Copy size={15} />
                </button>
              </dd>
            </div>
          </dl>
          <p className="small-note">
            Make the transfer in your banking app. Then email the transaction
            reference and your contact details to request a receipt. Never share
            your banking password or OTP.
          </p>
        </>
      ) : (
        <p>
          Thank you for choosing to help. Email your contribution preference to
          our team or call us for current donation instructions.
        </p>
      )}
      <div className="donation-tax-note">
        <FileCheck2 size={20} />
        <p>
          <strong>Need documentation for a tax claim?</strong> Ask our team for
          the current approval and applicable donation certificate. Eligibility
          depends on your tax regime and donation year; no tax saving is
          guaranteed.
        </p>
      </div>
      <p className="copy-status" role="status">
        {copied}
      </p>
      <a
        className="button button-gold"
        href={`mailto:info@ekatvabharat.org?subject=${subject}&body=${body}`}
      >
        <Mail size={17} />
        {donationBankConfirmed
          ? "Email the donation team"
          : "Request donation instructions"}
      </a>
      <a className="donation-call" href="tel:+919272799605">
        <Phone size={16} /> Speak with us: +91 92727 99605
      </a>
      <p className="small-note">
        Your selection is a preference, not a completed payment. Please discuss
        restricted contributions with our team.
      </p>
    </div>
  );
}

export function DonationTaxInfo() {
  return (
    <section id="tax-information" className="tax-information section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GIVE WITH CLARITY</p>
            <h2>
              TAX BENEFITS.
              <br />
              CLEAR DOCUMENTATION.
            </h2>
          </div>
          <div>
            <p>
              Planning to claim a donation deduction?
              <br />
              Start with the right records.
            </p>
            <a
              className="text-link"
              href="mailto:info@ekatvabharat.org?subject=Donation%20tax%20approval%20and%20certificate%20enquiry"
            >
              Request tax documents <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div className="tax-info-grid">
          <article>
            <FileCheck2 size={26} />
            <h3>Check eligibility first</h3>
            <p>
              Eligible donations to approved institutions may qualify for a tax
              deduction. Your tax regime, donation year, applicable limits and
              the foundation’s valid approval determine whether you can claim.
            </p>
          </article>
          <article>
            <Building2 size={26} />
            <h3>Keep your transfer records</h3>
            <p>
              Save your bank transaction reference and donation receipt. A
              deduction reduces taxable income; it is not a refund of the
              donated amount or a guaranteed tax saving.
            </p>
          </article>
          <article>
            <Mail size={26} />
            <h3>Request your certificate</h3>
            <p>
              Contact our team with the donation date, amount and transaction
              reference. Ask for the applicable donation certificate and how to
              provide any required donor identification securely.
            </p>
          </article>
        </div>
        <details className="tax-explainer">
          <summary>About 80G and the applicable donation certificate</summary>
          <p>
            Section 80G is the familiar reference under the Income-tax Act,
            1961. Under the Income-tax Act, 2025, the corresponding donation
            deduction is under Section 133. The Income Tax Department lists Form
            114 for donation certificates from tax year 2026–27; Form 10BE
            applies under the earlier framework. Use the rules and certificate
            applicable to your donation year.
          </p>
          <p>
            Our foundation materials list 80G and 12A. Please request the
            current approval, validity period and applicable deduction category
            before making a tax claim. This website does not certify your
            eligibility or calculate a tax saving.
          </p>
          <a
            href="https://www.incometax.gov.in/iec/foportal/newformpage/forms/form113-114-UM"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Income Tax Department guidance <ArrowRight size={16} />
          </a>
        </details>
      </div>
    </section>
  );
}

export default function Giving({ onContinue }) {
  return (
    <section id="donate" className="giving-section section">
      <div className="container giving-grid">
        <div className="giving-story">
          <p className="eyebrow light">
            A LITTLE FROM YOU. POSSIBILITY FOR SOMEONE.
          </p>
          <h2>
            BE THE REASON
            <br />
            SOMEONE TAKES
            <br />
            THEIR NEXT STEP.
          </h2>
          <p>
            A chance to learn. A community that cares. A future with more
            possibilities. Choose the work you want to stand behind.
          </p>
          <div className="giving-community photo-learning">
            <img
              src="/images/learning.webp"
              alt="Children and foundation team members gathered at a community learning activity"
              loading="lazy"
            />
            <span>
              Real connections. Shared possibilities.
              <small>FROM OUR COMMUNITY ARCHIVE</small>
            </span>
          </div>
        </div>
        <div className="giving-panel">
          <p className="eyebrow">MAKE A CONTRIBUTION</p>
          <h3>Give with a purpose.</h3>
          <p>Every act of support begins with a choice.</p>
          <DonationOptions onContinue={onContinue} />
        </div>
      </div>
    </section>
  );
}
