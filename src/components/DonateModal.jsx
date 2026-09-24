import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Copy, Check, QrCode, CreditCard, Send } from 'lucide-react';

export default function DonateModal({ isOpen, onClose }) {
  const [selectedAmt, setSelectedAmt] = useState(5000);
  const [customAmt, setCustomAmt] = useState('');
  const [copiedPan, setCopiedPan] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'pan') {
      setCopiedPan(true);
      setTimeout(() => setCopiedPan(false), 2000);
    } else {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    }
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card donate-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="modal-header">
          <div className="modal-tag emerald">
            <Heart size={14} fill="#10b981" /> 100% Tax Deductible (Section 80G)
          </div>
          <h2>Make a Difference Today</h2>
          <p>Support underprivileged youth education, sustainable farming, and child cancer aid in India.</p>
        </div>

        {submitted ? (
          <div className="modal-success animate-fade-in">
            <ShieldCheck size={52} className="text-emerald mb-3" />
            <h3>Thank You for Supporting Ekatvabharat Foundation!</h3>
            <p>Your contribution details have been logged. An official 80G Tax Exemption Receipt will be sent to your email.</p>
          </div>
        ) : (
          <div className="donate-body">
            {/* Amount Selection */}
            <div className="amount-picker-grid mb-4">
              {[1000, 2500, 5000, 10000, 25000].map((amt) => (
                <button 
                  key={amt}
                  className={`amt-btn ${selectedAmt === amt ? 'active' : ''}`}
                  onClick={() => { setSelectedAmt(amt); setCustomAmt(''); }}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Direct Bank Account Box */}
            <div className="bank-details-box mb-4">
              <div className="bd-header">
                <CreditCard size={18} className="text-gold" />
                <span>Direct Bank Transfer (NEFT / RTGS / IMPS)</span>
              </div>
              <div className="bd-row">
                <span>Account Name:</span>
                <strong>Ekatvabharat Foundation</strong>
              </div>
              <div className="bd-row">
                <span>Registration No:</span>
                <strong>U85300PN2021NPL206842</strong>
              </div>
              <div className="bd-row">
                <span>PAN Number:</span>
                <strong className="copy-text" onClick={() => handleCopy('AAGCE8045E', 'pan')}>
                  AAGCE8045E {copiedPan ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                </strong>
              </div>
            </div>

            {/* 80G Receipt Request Form */}
            <form onSubmit={handleDonateSubmit} className="receipt-form">
              <h4 className="rf-title">Request 80G Tax Exemption Receipt</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name (as per PAN) *</label>
                  <input type="text" required placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <label>PAN Card Number *</label>
                  <input type="text" required placeholder="ABCDE1234F" style={{ textTransform: 'uppercase' }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" required placeholder="donor@email.com" />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" required placeholder="9876543210" />
                </div>
              </div>

              <button type="submit" className="btn-emerald w-full">
                <Heart size={18} fill="white" /> Submit & Claim 80G Tax Exemption
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .donate-modal { max-width: 600px; }
        .modal-tag.emerald {
          background: #ecfdf5;
          color: #10b981;
        }
        .amount-picker-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .amt-btn {
          padding: 0.75rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.05rem;
          color: #0b192c;
          cursor: pointer;
          transition: all 0.2s;
        }
        .amt-btn.active {
          background: #0b192c;
          color: #ffffff;
          border-color: #0b192c;
        }
        .bank-details-box {
          background: #0b192c;
          color: #ffffff;
          border-radius: 14px;
          padding: 1.25rem;
          font-size: 0.88rem;
        }
        .bd-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: #ff9d23;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bd-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }
        .bd-row span { color: #94a3b8; }
        .copy-text {
          color: #ff9d23;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .receipt-form {
          border-top: 1px solid #e2e8f0;
          padding-top: 1rem;
        }
        .rf-title {
          font-size: 1rem;
          color: #0b192c;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
