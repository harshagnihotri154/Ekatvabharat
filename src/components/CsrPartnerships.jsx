import React from 'react';
import { 
  Building2, 
  CheckCircle, 
  Award, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Download,
  FileCheck
} from 'lucide-react';

export default function CsrPartnerships({ openCsrModal }) {
  const corporatePartners = [
    {
      name: 'Yardi Software Pvt Ltd',
      role: 'Skilling & Women Empowerment Partner',
      batches: '4 Batches Completed (100 Students)',
      area: 'PMC Area, Pune',
      detail: 'Collaborating with EBF for hospitality training to equip underprivileged youth with job-ready skills.'
    },
    {
      name: 'Lighthouse Communities',
      role: 'Hospitality Skilling Partner (2024-25)',
      batches: 'PMC & PCMC Mobilization',
      area: 'Pune Metropolitan Region',
      detail: 'Empowers youth with industry-relevant skills, increasing employability and financial independence.'
    },
    {
      name: 'GOYN (Global Opportunity Youth Network)',
      role: 'Youth Outreach & Material Partner',
      batches: 'Multi-Center Drives',
      area: 'Pune Metropolitan Area',
      detail: 'Supports outreach, promotional activities, and course curriculum development.'
    }
  ];

  return (
    <section className="nicdark-csr-section" id="csr">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="section-tag-nicdark">
            <Building2 size={14} /> CORPORATE SOCIAL RESPONSIBILITY (CSR)
          </div>
          <h2 className="section-title-nicdark">ENTERPRISE CSR PARTNERSHIPS & IMPACT</h2>
          <p className="section-subtitle-nicdark">
            Partner with Ekatvabharat Foundation to fulfill your corporate CSR mandate with 100% Tax Exemption under Section 80G.
          </p>
        </div>

        {/* CSR Dashboard Banner Graphic */}
        <div className="csr-dashboard-box mb-12">
          <img 
            src="/website_assets/generated/csr_impact_dashboard_1790068094724.jpg" 
            alt="Ekatvabharat Foundation CSR Dashboard"
            className="csr-dash-img"
          />
        </div>

        {/* Corporate Success Stories Grid */}
        <div className="csr-partners-grid mb-12">
          {corporatePartners.map((partner, idx) => (
            <div key={idx} className="partner-box nicdark-card">
              <div className="partner-header-box">
                <div className="p-icon-box">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="p-name">{partner.name}</h3>
                  <span className="p-role">{partner.role}</span>
                </div>
              </div>

              <p className="p-detail">{partner.detail}</p>

              <div className="p-pills">
                <span className="p-pill"><CheckCircle size={14} className="text-orange" /> {partner.batches}</span>
                <span className="p-pill"><Users size={14} /> {partner.area}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CSR Call to Action Banner */}
        <div className="csr-cta-banner">
          <div className="csr-cta-content">
            <span className="cta-tag"><Sparkles size={14} /> PARTNER WITH EBF IN 2025-2026</span>
            <h2>Transforming Corporate Mandates into Real Community Impact</h2>
            <p>We provide full CSR-1 MCA registration, quarterly audited financial reports, and dedicated project managers for enterprise partners.</p>

            <div className="csr-cta-btns">
              <button className="btn-nicdark-amber btn-lg" onClick={openCsrModal}>
                <Building2 size={20} /> REQUEST CUSTOM CSR PROPOSAL
              </button>
              <a href="/website_assets/extracted_highlights/slide_4.jpg" download className="btn-nicdark-secondary btn-lg">
                <Download size={20} /> DOWNLOAD CSR PRESENTATION
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nicdark-csr-section {
          padding: 5rem 0;
          background: #ffffff;
        }
        .csr-dashboard-box {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border: 4px solid #ffffff;
        }
        .csr-dash-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .csr-partners-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .partner-box {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .partner-header-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .p-icon-box {
          width: 50px;
          height: 50px;
          background: #fff3f0;
          color: #ff5722;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .p-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: #18202a;
        }
        .p-role {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
        }
        .p-detail {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .p-pills {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .p-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #18202a;
          background: #f1f5f9;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
        }
        .csr-cta-banner {
          background: #18202a;
          color: #ffffff;
          border-radius: 20px;
          padding: 3.5rem 3rem;
          text-align: center;
        }
        .cta-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #ffb300;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }
        .csr-cta-content h2 {
          color: #ffffff;
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .csr-cta-content p {
          color: #cbd5e1;
          font-size: 1.05rem;
          max-width: 760px;
          margin: 0 auto 2rem;
        }
        .csr-cta-btns {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .btn-lg {
          padding: 1rem 2.2rem;
          font-size: 1rem;
        }

        @media (max-width: 992px) {
          .csr-partners-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
