import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, FileText } from 'lucide-react';

export default function CsrModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="modal-header">
          <div className="modal-tag">
            <Building2 size={16} /> Enterprise CSR Engagement
          </div>
          <h2>Request Corporate CSR Partnership Proposal</h2>
          <p>Partner with EBF for skilling, healthcare, and sustainable agriculture drives with 100% Section 80G tax benefit.</p>
        </div>

        {submitted ? (
          <div className="modal-success animate-fade-in">
            <CheckCircle2 size={48} className="text-emerald mb-3" />
            <h3>CSR Proposal Request Received!</h3>
            <p>Our CSR Partnerships Lead will share a tailored proposal & budget breakdown with your team within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company / Organization Name *</label>
                <input type="text" required placeholder="e.g. Yardi Systems / Infosys CSR" />
              </div>
              <div className="form-group">
                <label>Contact Person & Designation *</label>
                <input type="text" required placeholder="e.g. Anish Mehta (CSR Head)" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Work Email *</label>
                <input type="email" required placeholder="e.g. corporate@company.com" />
              </div>
              <div className="form-group">
                <label>Direct Phone / Mobile *</label>
                <input type="tel" required placeholder="e.g. 9876543210" />
              </div>
            </div>

            <div className="form-group">
              <label>Target CSR Focus Pillar</label>
              <select>
                <option value="Hospitality Skilling">Youth Hospitality & Cookery Skilling (PMC/PCMC)</option>
                <option value="Agriculture">Sustainable Agriculture & Farmer FPO Development</option>
                <option value="Cancer Aid">Child Cancer Aid & Nutrition Distribution</option>
                <option value="Women Empowerment">Women Entrepreneurship & Digital Literacy</option>
                <option value="Multi-Pillar">Multi-Pillar Strategic Partnership</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Annual CSR Budget (Optional)</label>
              <select>
                <option value="Below 5 Lakhs">Below ₹5 Lakhs</option>
                <option value="5 - 15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
                <option value="15 - 50 Lakhs">₹15 Lakhs - ₹50 Lakhs</option>
                <option value="Above 50 Lakhs">Above ₹50 Lakhs</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full">
              <Send size={18} /> Send CSR Proposal Request
            </button>
          </form>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(11, 25, 44, 0.85);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .modal-card {
          position: relative;
          max-width: 650px;
          width: 100%;
          background: #ffffff;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f1f5f9;
          border: none;
          color: #475569;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal-close-btn:hover { background: #cbd5e1; }
        .modal-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: #fff6e9;
          color: #ff9d23;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .modal-header h2 {
          font-size: 1.6rem;
          color: #0b192c;
          margin-bottom: 0.4rem;
        }
        .modal-header p {
          color: #64748b;
          font-size: 0.92rem;
          margin-bottom: 1.5rem;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .modal-success {
          text-align: center;
          padding: 2.5rem 1rem;
        }
        .modal-success h3 {
          color: #0b192c;
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .modal-success p {
          color: #475569;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
