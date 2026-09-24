import React from 'react';
import { Heart, ShieldCheck, MapPin, Phone, Mail, Award, ArrowUp, Building2 } from 'lucide-react';

export default function Footer({ setActiveTab, openDonateModal, openCsrModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="nicdark-footer">
      {/* Footer Top Action Bar */}
      <div className="footer-top-callout">
        <div className="container callout-inner">
          <div className="callout-left">
            <span className="co-badge">100% TAX DEDUCTIBLE (SECTION 80G)</span>
            <h2>EMPOWER A YOUTH OR SPONSOR A HEALTH CAMP TODAY</h2>
          </div>
          <div className="callout-btns">
            <button className="btn-nicdark-primary" onClick={openDonateModal}>
              <Heart size={18} fill="white" /> DONATE NOW
            </button>
            <button className="btn-nicdark-amber" onClick={openCsrModal}>
              <Building2 size={18} /> PARTNER AS CSR
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-body">
        <div className="container footer-four-cols">
          {/* Col 1 */}
          <div className="f-col">
            <div className="f-brand" onClick={() => setActiveTab('home')}>
              <div className="f-logo-box">
                <Heart size={20} fill="white" />
              </div>
              <div>
                <span className="f-logo-title">EKATVABHARAT</span>
                <span className="f-logo-sub">FOUNDATION</span>
              </div>
            </div>
            <p className="f-about-p">
              Ekatvabharat Foundation incorporated as a Section 8 NGO (est. 2021) strives to eliminate extreme poverty and bridge urban-rural opportunity gaps through skilling, sustainable agriculture, and healthcare.
            </p>
            <div className="f-certs">
              <span><ShieldCheck size={13} /> Section 8 NGO</span>
              <span><Award size={13} /> 12A & 80G Approved</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="f-col">
            <h4 className="f-title">NAVIGATION</h4>
            <ul className="f-nav-list">
              <li><button onClick={() => setActiveTab('home')}>Home</button></li>
              <li><button onClick={() => setActiveTab('about')}>About Us & Governance</button></li>
              <li><button onClick={() => setActiveTab('programs')}>Causes & Courses</button></li>
              <li><button onClick={() => setActiveTab('csr')}>CSR Partnerships</button></li>
              <li><button onClick={() => setActiveTab('gallery')}>Impact Gallery</button></li>
              <li><button onClick={() => setActiveTab('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="f-col">
            <h4 className="f-title">OUR CAUSES</h4>
            <ul className="f-nav-list">
              <li><span>Hospitality & Cookery Skilling</span></li>
              <li><span>100% Job Guarantee Scheme</span></li>
              <li><span>Sustainable Agri & FPOs</span></li>
              <li><span>Child Cancer Aid Program</span></li>
              <li><span>Pune District Health Camps</span></li>
              <li><span>Women Entrepreneurship</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="f-col">
            <h4 className="f-title">CONTACT HEADQUARTERS</h4>
            <div className="f-contact-line">
              <MapPin size={16} className="text-orange" />
              <span>A-430, Ideal Park, Gokul Nagar, Katraj-Kondhwa Road, Pune - 411046</span>
            </div>
            <div className="f-contact-line">
              <MapPin size={16} className="text-amber" />
              <span>Vadgaon Campus, Sinhagad Road, Pune (Training Hub)</span>
            </div>
            <div className="f-contact-line">
              <Phone size={16} className="text-orange" />
              <span>+91 9272799605 / +91 9657723904</span>
            </div>
            <div className="f-contact-line">
              <Mail size={16} className="text-amber" />
              <span>info@ekatvabharat.org</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="footer-bottom-strip">
        <div className="container bottom-inner">
          <span>© {new Date().getFullYear()} Ekatvabharat Foundation. Reg No: <strong>U85300PN2021NPL206842</strong> | PAN: <strong>AAGCE8045E</strong></span>
          <button className="back-to-top" onClick={scrollToTop}>
            TOP <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .nicdark-footer {
          background: #18202a;
          color: #cbd5e1;
        }
        .footer-top-callout {
          background: #ff5722;
          color: #ffffff;
          padding: 2.5rem 0;
        }
        .callout-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .co-badge {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          color: #ffb300;
          letter-spacing: 0.08em;
        }
        .callout-left h2 {
          color: #ffffff;
          font-size: 1.8rem;
          margin-top: 0.2rem;
        }
        .callout-btns {
          display: flex;
          gap: 1rem;
        }
        .footer-main-body {
          padding: 4rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-four-cols {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 2.5rem;
        }
        .f-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }
        .f-logo-box {
          width: 38px;
          height: 38px;
          background: #ff5722;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .f-logo-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.15rem;
          color: #ffffff;
          display: block;
          line-height: 1;
        }
        .f-logo-sub {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          color: #ff5722;
          letter-spacing: 0.18em;
          font-weight: 700;
        }
        .f-about-p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        .f-certs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
        }
        .f-certs span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          color: #e2e8f0;
        }
        .f-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: #ffffff;
          margin-bottom: 1.25rem;
          letter-spacing: 0.05em;
        }
        .f-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .f-nav-list button {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
          text-align: left;
        }
        .f-nav-list button:hover { color: #ff5722; }
        .f-nav-list span { font-size: 0.9rem; color: #94a3b8; }
        .f-contact-line {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.88rem;
          margin-bottom: 0.85rem;
          color: #cbd5e1;
        }
        .footer-bottom-strip {
          background: #0f172a;
          padding: 1.1rem 0;
          font-size: 0.82rem;
          color: #94a3b8;
        }
        .bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .back-to-top {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #ffffff;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          cursor: pointer;
        }

        @media (max-width: 992px) {
          .footer-four-cols { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 576px) {
          .footer-four-cols { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
