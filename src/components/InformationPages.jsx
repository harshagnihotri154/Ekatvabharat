import React from "react";
import { ArrowUpRight } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import { EvidenceStrip } from "./TrustSections";
export const informationPages = {
  "/transparency": {
    title: "Transparency",
    heading: "Know the work.\nKnow the foundation.",
    description:
      "The organisation behind your contribution, the evidence in our records and the documents you can request.",
  },
  "/get-involved": {
    title: "Get involved",
    heading: "Your time. your skills.\nA shared purpose.",
    description:
      "Explore volunteering, learning and partnership opportunities with our Pune team.",
  },
  "/privacy": {
    title: "Privacy",
    heading: "Your information.\nHandled with purpose.",
    description: "How the website uses enquiry and contribution details.",
  },
  "/donation-policy": {
    title: "Donation information",
    heading: "Give with clarity.\nKnow what comes next.",
    description:
      "Payment confirmation, contribution preferences, refunds and documentation.",
  },
  "/admin": {
    title: "Foundation administration",
    heading: "Foundation\nWorkspace.",
    description:
      "Restricted access for donation reconciliation and enquiry follow-up.",
  },
};
export default function InformationPages({ path, openContact }) {
  if (path === "/transparency")
    return (
      <>
        <EvidenceStrip />
        <section className="container section page-split">
          <div>
            <p className="eyebrow">OUR ORGANISATION</p>
            <h2>
              Rooted in Pune.
              <br />
              Established in 2021.
            </h2>
          </div>
          <div>
            <p>
              Ekatvabharat Foundation’s source materials identify it as a
              Section 8 nonprofit incorporated in 2021, with registration number
              U85300PN2021NPL206842.
            </p>
            <h3>Kranti Naikwadi–Ilake</h3>
            <p>
              Founder & President, as identified in the foundation profile and
              Earn & Learn materials. The foundation’s stated focus brings
              together education, employability, community care and sustainable
              livelihoods.
            </p>
            <p>
              Registered office: Pune.
            </p>
          </div>
        </section>
        <section className="page-tinted section">
          <div className="container">
            <p className="eyebrow">DOCUMENTS & REPORTING</p>
            <h2>
              Ask the questions
              <br />
              that matter.
            </h2>
            <p className="page-intro">
              Historical materials provide context. Ask for current approvals
              and financial documents before making a funding or tax decision.
            </p>
            <div className="document-list">
              {[
                [
                  "Registration",
                  "The registration identity is recorded in the foundation’s materials. Request the incorporation certificate.",
                ],
                [
                  "Tax approvals",
                  "Foundation materials list 12A and 80G. Request current approval copies, validity dates and the applicable deduction category.",
                ],
                [
                  "Annual accounts & reports",
                  "Request audited accounts and an activity report for the financial year you want to review. Downloadable copies have not yet been published on this website.",
                ],
                [
                  "CSR documentation",
                  "Request current CSR registration and project-specific budgets, reporting expectations and delivery arrangements.",
                ],
              ].map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button
                    className="text-link"
                    onClick={() => openContact(`${title} documents`)}
                  >
                    Request from the team <ArrowUpRight size={17} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="container section reading-width">
          <p className="eyebrow">READING OUR ACTIVITY RECORDS</p>
          <h2>Context builds trust.</h2>
          <p>
            The 2024–25 foundation presentation records four completed
            hospitality batches supported by Yardi Software. It also describes
            collaboration with Lighthouse Communities and GOYN. These records do
            not establish current batch availability or ongoing partner
            endorsement.
          </p>
          <p>
            Our community photographs come from the supplied activity archive.
            Dates are not supplied for every event. We do not present
            illustrative program images as photographs of delivered work.
          </p>
          <p>
            Agriculture is presented as an area for planning and collaboration.
            Proposal targets are not counted as completed outcomes. We have not
            published unsupported impact totals, placement guarantees or
            spending percentages.
          </p>
          <a href="/community" className="text-link">
            Explore the community archive <ArrowUpRight size={17} />
          </a>
        </section>
      </>
    );
  if (path === "/get-involved")
    return (
      <section className="container section">
        <div className="participation-grid">
          {[
            [
              "Volunteer your time",
              "Share your skills, availability and preferred location. The team will discuss suitable opportunities and any role-specific safeguarding or onboarding steps.",
              "Volunteering",
            ],
            [
              "Explore a course",
              "Tell us what you would like to learn. Ask about the next intake, eligibility, fees and practical-training arrangements before making a commitment.",
              "Course admission",
            ],
            [
              "Build a partnership",
              "Bring your organisation’s interests, proposed location and timeframe. Discuss a realistic project scope and reporting plan with the team.",
              "CSR partnership",
            ],
          ].map(([title, text, topic]) => (
            <article key={topic}>
              <h2>{title}</h2>
              <p>{text}</p>
              <button className="text-link" onClick={() => openContact(topic)}>
                Start a conversation <ArrowUpRight size={17} />
              </button>
            </article>
          ))}
        </div>
        <div className="page-split section">
          <div>
            <p className="eyebrow">TELL US A LITTLE ABOUT YOURSELF</p>
            <h2>
              Find your
              <br />
              next step.
            </h2>
            <p>
              You do not need to donate to get involved. Share an interest or a
              question and help us understand where you could participate.
            </p>
          </div>
          <EnquiryForm topic="Volunteering" />
        </div>
      </section>
    );
  if (path === "/privacy")
    return (
      <section className="container section reading-width policy-copy">
        <p className="eyebrow">WEBSITE NOTICE · 15 NOVEMBER 2026</p>
        <h2>What we collect</h2>
        <p>
          Enquiry forms collect your name, email, topic and message so the
          foundation can respond and track follow-up. Contribution forms collect
          your name, email, chosen amount, cause preference and consent,
          alongside payment references and status.
        </p>
        <h3>Payment information</h3>
        <p>
          When online payments are enabled, Razorpay handles payment entry and
          processing. The foundation website does not store card numbers, card
          security codes, UPI PINs or banking passwords. Payment records and
          acknowledgements are stored by the foundation’s service.
        </p>
        <h3>Storage and access</h3>
        <p>
          Enquiries and donation records are stored in the foundation’s
          database. Authorised administrators can view them for follow-up,
          reconciliation and documentation. Configured email services deliver
          enquiries and acknowledgements. Do not send Aadhaar copies, banking
          credentials or medical records through these forms.
        </p>
        <h3>Browser storage and measurement</h3>
        <p>
          A temporary reference in your browser session lets you return to a
          contribution’s payment status. Administration uses an essential,
          time-limited session cookie. The service counts donation-page and
          checkout starts in aggregate; these counters do not contain donor
          names or email addresses. The website also loads Google Tag Manager
          to manage measurement tags. The measurements and browser storage used
          by those tags depend on the tags configured and published for this site.
        </p>
        <h3>Your choices</h3>
        <p>
          Contact{" "}
          <a href="mailto:info@ekatvabharat.org">info@ekatvabharat.org</a> to
          ask about access, correction or deletion of your information.
          Accounting and statutory obligations may require some donation records
          to be retained. A form submission does not subscribe you to marketing.
        </p>
        <h3>External services and images</h3>
        <p>
          Payment checkout uses Razorpay. Map links open Google Maps. Program
          illustrations are labelled as illustrative; community photographs are
          from the foundation archive. Contact us about an image or information
          you would like reviewed.
        </p>
      </section>
    );
  if (path === "/donation-policy")
    return (
      <section className="container section reading-width policy-copy">
        <p className="eyebrow">CONTRIBUTION INFORMATION</p>
        <h2>
          From your gift
          <br />
          to confirmation.
        </h2>
        <h3>One-time contributions</h3>
        <p>
          Choose an amount and cause preference. Online checkout, when enabled,
          accepts Indian rupees through the methods available for the
          foundation’s Razorpay account. No donor account is required. Monthly
          giving is not currently offered.
        </p>
        <h3>Who can contribute online</h3>
        <p>
          The online flow is intended for Indian citizens giving their own funds
          from an Indian bank account. Contact the foundation about other
          circumstances before paying. International or foreign-source
          contributions require separate eligibility and banking arrangements;
          they are not enabled by this website.
        </p>
        <h3>Cause preferences</h3>
        <p>
          Your choice helps communicate what matters to you; it is not a
          restricted-grant agreement. For agriculture projects, designated
          funding, institutional grants or specific deliverables, agree on the
          project and terms with the foundation first.
        </p>
        <h3>Payment confirmation and receipts</h3>
        <p>
          A payment is confirmed after server-side verification of its captured
          status. If confirmation is pending, check the status before trying
          again. An acknowledgement is queued to the email you supplied after
          confirmation. Contact us if it does not arrive. Bank transfers require
          manual reconciliation.
        </p>
        <h3>Refund requests and payment problems</h3>
        <p>
          If a contribution was duplicated, made in error, or has an unresolved
          payment issue, contact info@ekatvabharat.org or +91 92727 99605 with
          the date, amount and payment reference. Do not send your PIN or OTP.
          The team will review the transaction and explain the available next
          steps. A refund is not guaranteed by submitting a request; approved
          refunds are handled through the original payment route where
          supported.
        </p>
        <h3>Tax documentation</h3>
        <p>
          A payment acknowledgement is not a statutory tax certificate. Request
          current tax approvals and the applicable donation certificate from the
          foundation. Eligibility depends on the approval, donor circumstances
          and rules for the donation year; no tax saving is guaranteed.
        </p>
        <a href="/donate" className="button button-gold">
          Make a contribution <ArrowUpRight size={18} />
        </a>
      </section>
    );
  return null;
}
