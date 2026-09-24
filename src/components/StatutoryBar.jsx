import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StatutoryBar({ setActiveTab }) {
  const complianceItems = [
    { title: 'Section 8 Registered NGO', reg: 'U85300PN2021NPL206842', badge: 'Est. 2021', color: 'orange' },
    { title: '12A Income Tax Approved', reg: 'Full Tax Exemption', badge: 'Active Status', color: 'green' },
    { title: '80G Tax Exemption (50%)', reg: 'Deductible for Donors', badge: '50% Deduction', color: 'amber' },
    { title: 'NITI Aayog Darpan', reg: 'Govt. Verified NGO', badge: 'Verified ID', color: 'green' },
    { title: 'CSR-1 Registered (MCA)', reg: 'Corporate CSR Eligible', badge: 'CSR Approved', color: 'orange' },
    { title: 'ISO 9001:2015 Certified', reg: 'Quality Standards', badge: 'Certified', color: 'green' }
  ];

  return (
    <section className="statutory-strip-section">
      <div className="container">
        <div className="statutory-top-bar">
          <div className="st-left">
            <ShieldCheck size={22} className="text-orange" />
            <div>
              <h3>Statutory Compliance & Regulatory Governance</h3>
              <p>Ekatvabharat Foundation maintains 100% statutory transparency under Indian MCA & Income Tax regulations.</p>
            </div>
          </div>
          <button className="btn-compliance-link" onClick={() => setActiveTab('about')}>
            Governance & Audit Dashboard <ArrowRight size={16} />
          </button>
        </div>

        <div className="compliance-cards-grid">
          {complianceItems.map((item, idx) => (
            <div key={idx} className="comp-card nicdark-card">
              <div className="comp-header">
                <Award size={18} className={`comp-icon ${item.color}`} />
                <span className={`comp-badge ${item.color}`}>{item.badge}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.reg}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .statutory-strip-section {
          padding: 3rem 0;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }
        .statutory-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .st-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .st-left h3 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: #18202a;
          line-height: 1.2;
        }
        .st-left p {
          color: #64748b;
          font-size: 0.9rem;
        }
        .btn-compliance-link {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.9rem;
          color: #ff5722;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-compliance-link:hover { color: #e64a19; text-decoration: underline; }

        .compliance-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.25rem;
        }
        .comp-card {
          padding: 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .comp-card:hover {
          background: #ffffff;
          border-color: #ff5722;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
        }
        .comp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .comp-icon.orange { color: #ff5722; }
        .comp-icon.green { color: #2e7d32; }
        .comp-icon.amber { color: #ffa000; }

        .comp-badge {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .comp-badge.orange { background: #fff3f0; color: #ff5722; }
        .comp-badge.green { background: #e8f5e9; color: #2e7d32; }
        .comp-badge.amber { background: #fff8e1; color: #ffa000; }

        .comp-card h4 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          color: #18202a;
          margin-bottom: 0.25rem;
          line-height: 1.25;
        }
        .comp-card p {
          font-size: 0.82rem;
          color: #64748b;
        }
      `}</style>
    </section>
  );
}
