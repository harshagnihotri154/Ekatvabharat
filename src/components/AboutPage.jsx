import React from 'react';
import PageHeader from './PageHeader';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  Eye, 
  Heart, 
  Users,
  FileText,
  Download,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function AboutPage({ setActiveTab, openCsrModal }) {
  const complianceList = [
    { title: 'Section 8 License', reg: 'U85300PN2021NPL206842', dept: 'Ministry of Corporate Affairs', status: 'Active (2021)' },
    { title: '12A Exemption', reg: 'Income Tax Act 1961', dept: 'Income Tax Department', status: 'Approved' },
    { title: '80G Certification', reg: 'Tax Exemption for Donors', dept: 'Income Tax Department', status: 'Approved (50% Deduction)' },
    { title: 'NITI Aayog Darpan', reg: 'Unique ID Verified', dept: 'NITI Aayog, Govt of India', status: 'Verified' },
    { title: 'CSR-1 Registration', reg: 'MCA CSR Portal', dept: 'Ministry of Corporate Affairs', status: 'CSR Eligible' },
    { title: 'ISO 9001:2015', reg: 'Quality Management Systems', dept: 'International Accreditation', status: 'Certified' }
  ];

  return (
    <div className="about-page-view animate-fade-in">
      <PageHeader 
        tag="ABOUT EKATVABHARAT FOUNDATION"
        title="OUR MISSION, LEADERSHIP & GOVERNANCE"
        subtitle="Incorporated in 2021 as a Section 8 non-profit organization in Pune, Maharashtra to eliminate extreme poverty and empower rural youth and farmers."
        breadcrumb="About Us & Compliance"
        setActiveTab={setActiveTab}
      />

      <div className="container py-16">
        {/* Vision & Mission Grid */}
        <div className="vmv-grid mb-16">
          <div className="vmv-card nicdark-card">
            <div className="vmv-icon orange">
              <Eye size={28} />
            </div>
            <h3>Our Vision</h3>
            <p>
              Driven by the vision of empowering people with market-relevant skills, self-dignity, and technological tools so that every individual can earn a sustainable livelihood.
            </p>
          </div>

          <div className="vmv-card nicdark-card">
            <div className="vmv-icon green">
              <Target size={28} />
            </div>
            <h3>Our Mission</h3>
            <p>
              Empower children, youth, and women through strategic programming in Health, Environment, Education, Agriculture, and Secure Livelihoods alongside valued corporate & institutional partners.
            </p>
          </div>

          <div className="vmv-card nicdark-card">
            <div className="vmv-icon amber">
              <Heart size={28} />
            </div>
            <h3>Our Core Values</h3>
            <ul className="values-checklist">
              <li><CheckCircle2 size={16} className="text-emerald" /> Dignity & Respect for all individuals</li>
              <li><CheckCircle2 size={16} className="text-emerald" /> Professional & Accountable Execution</li>
              <li><CheckCircle2 size={16} className="text-emerald" /> 100% Financial Transparency & Governance</li>
            </ul>
          </div>
        </div>

        {/* Executive Leadership Section */}
        <div className="leadership-section nicdark-card mb-16">
          <div className="leadership-grid">
            <div className="leader-img-box">
              <img 
                src="/website_assets/extracted_highlights/slide_2.jpg" 
                alt="Mrs. Kranti Naikwadi Ilake - President EBF"
                className="leader-photo"
              />
              <span className="leader-tag-pill">President & Executive Director</span>
            </div>

            <div className="leader-bio">
              <span className="leader-sub">FOUNDER'S MESSAGE</span>
              <h2>Mrs. Kranti Naikwadi Ilake</h2>
              <h4 className="leader-title-role">President, Ekatvabharat Foundation</h4>
              <p className="leader-quote">
                "At Ekatvabharat Foundation, we believe that true social transformation occurs when underprivileged youth are given job-guaranteed skills, farmers receive sustainable technology, and children get compassionate healthcare."
              </p>

              <div className="leader-meta-grid">
                <div className="lm-item">
                  <strong>Registered Section 8 NGO</strong>
                  <span>Reg No: U85300PN2021NPL206842</span>
                </div>
                <div className="lm-item">
                  <strong>Headquarters & Campus</strong>
                  <span>Katraj Office & Vadgaon Hub, Pune</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Governance Table */}
        <div className="compliance-section-box">
          <div className="text-center mb-10">
            <div className="section-tag-nicdark">
              <ShieldCheck size={14} /> STATUTORY COMPLIANCE & TRANSPARENCY
            </div>
            <h2 className="section-title-nicdark">GOVERNANCE & CERTIFICATION DASHBOARD</h2>
            <p className="section-subtitle-nicdark">
              Ekatvabharat Foundation maintains 100% statutory transparency, annual audit disclosures, and governance standards under Indian laws.
            </p>
          </div>

          <div className="table-card nicdark-card">
            <table className="compliance-table-styled">
              <thead>
                <tr>
                  <th>Certification / License</th>
                  <th>Registration / Reference ID</th>
                  <th>Governing Body</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complianceList.map((item, idx) => (
                  <tr key={idx}>
                    <td className="td-name">
                      <Award size={18} className="text-orange" /> {item.title}
                    </td>
                    <td className="td-code">{item.reg}</td>
                    <td>{item.dept}</td>
                    <td>
                      <span className="badge-status-approved">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .about-page-view { background: #ffffff; }
        .py-16 { padding: 4rem 0; }
        .mb-16 { margin-bottom: 4rem; }
        .mb-10 { margin-bottom: 2.5rem; }

        .vmv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .vmv-card {
          padding: 2.25rem;
          background: #ffffff;
          border-radius: 16px;
        }
        .vmv-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .vmv-icon.orange { background: #fff3f0; color: #ff5722; }
        .vmv-icon.green { background: #e8f5e9; color: #2e7d32; }
        .vmv-icon.amber { background: #fff8e1; color: #ffa000; }

        .vmv-card h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: #18202a;
          margin-bottom: 0.75rem;
        }
        .vmv-card p {
          color: #64748b;
          font-size: 0.98rem;
          line-height: 1.6;
        }
        .values-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          color: #334155;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .values-checklist li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .leadership-section {
          padding: 3rem;
          background: #f8fafc;
          border-radius: 20px;
        }
        .leadership-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 3rem;
          align-items: center;
        }
        .leader-img-box {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .leader-photo {
          width: 100%;
          height: auto;
          display: block;
        }
        .leader-tag-pill {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background: #18202a;
          color: #ffb300;
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.78rem;
        }
        .leader-sub {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          color: #ff5722;
          letter-spacing: 0.08em;
        }
        .leader-bio h2 {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          color: #18202a;
          margin-bottom: 0.2rem;
        }
        .leader-title-role {
          font-size: 1rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        .leader-quote {
          font-size: 1.05rem;
          color: #334155;
          font-style: italic;
          line-height: 1.65;
          margin-bottom: 1.75rem;
        }
        .leader-meta-grid {
          display: flex;
          gap: 2rem;
        }
        .lm-item strong {
          display: block;
          font-family: var(--font-heading);
          color: #18202a;
          font-size: 0.95rem;
        }
        .lm-item span {
          font-size: 0.82rem;
          color: #64748b;
        }

        .table-card {
          border-radius: 16px;
          overflow-x: auto;
        }
        .compliance-table-styled {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .compliance-table-styled th {
          background: #18202a;
          color: #ffffff;
          padding: 1.1rem 1.25rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.9rem;
        }
        .compliance-table-styled td {
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.95rem;
          color: #334155;
        }
        .td-name {
          font-family: var(--font-heading);
          font-weight: 800;
          color: #18202a;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .td-code {
          font-family: monospace;
          font-weight: 600;
          color: #ff5722;
        }
        .badge-status-approved {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          background: #e8f5e9;
          color: #2e7d32;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.78rem;
          border-radius: 100px;
        }

        @media (max-width: 992px) {
          .leadership-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
