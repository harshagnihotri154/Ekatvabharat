import React, { useState } from 'react';
import { Calculator, Heart, ShieldCheck, Copy, Check } from 'lucide-react';

export default function TaxCalculator80G({ openDonateModal }) {
  const [donationAmount, setDonationAmount] = useState(25000);
  const [taxSlab, setTaxSlab] = useState(0.30);
  const [copied, setCopied] = useState(false);

  const deductibleAmount = donationAmount * 0.50;
  const taxSavings = deductibleAmount * taxSlab;
  const netCost = donationAmount - taxSavings;

  const handleCopyPAN = () => {
    navigator.clipboard.writeText('AAGCE8045E');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="nicdark-calc-section" id="donate">
      <div className="container">
        <div className="calc-card-container nicdark-card">
          <div className="calc-grid">
            {/* Left Column Input */}
            <div className="calc-col-left">
              <div className="section-tag-nicdark">
                <Calculator size={14} /> SECTION 80G TAX CALCULATOR
              </div>
              <h2>CALCULATE YOUR TAX SAVINGS</h2>
              <p className="calc-desc">
                Donations to Ekatvabharat Foundation qualify for <strong>50% deduction</strong> under Section 80G of the Indian Income Tax Act.
              </p>

              <div className="form-group mb-6">
                <label className="form-label-nicdark">Enter Contribution Amount (₹)</label>
                <div className="input-currency-box">
                  <span className="currency-sign">₹</span>
                  <input 
                    type="number"
                    className="calc-input-field"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Math.max(0, Number(e.target.value)))}
                    step="1000"
                  />
                </div>
                <input 
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="calc-slider-nicdark"
                />
              </div>

              <div className="form-group mb-6">
                <label className="form-label-nicdark">Select Income Tax Slab:</label>
                <div className="slab-btn-group">
                  <button className={`slab-chip ${taxSlab === 0.10 ? 'active' : ''}`} onClick={() => setTaxSlab(0.10)}>10% Slab</button>
                  <button className={`slab-chip ${taxSlab === 0.20 ? 'active' : ''}`} onClick={() => setTaxSlab(0.20)}>20% Slab</button>
                  <button className={`slab-chip ${taxSlab === 0.30 ? 'active' : ''}`} onClick={() => setTaxSlab(0.30)}>30% Slab</button>
                </div>
              </div>

              <div className="quick-chip-row">
                <span>Quick Select:</span>
                {[5000, 10000, 25000, 50000, 100000].map((amt) => (
                  <button key={amt} className="amt-chip" onClick={() => setDonationAmount(amt)}>
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column Output Summary */}
            <div className="calc-col-right">
              <div className="output-box-dark">
                <div className="ob-header">
                  <ShieldCheck size={20} className="text-amber" />
                  <span>80G DEDUCTION BREAKDOWN</span>
                </div>

                <div className="ob-row">
                  <span>Gross Donation:</span>
                  <strong>₹{donationAmount.toLocaleString('en-IN')}</strong>
                </div>

                <div className="ob-row">
                  <span>80G Deductible (50%):</span>
                  <strong className="text-cyan">₹{deductibleAmount.toLocaleString('en-IN')}</strong>
                </div>

                <div className="ob-row highlight-row">
                  <div>
                    <span className="ob-lbl-bold">ESTIMATED TAX SAVED:</span>
                    <span className="ob-sub">({(taxSlab * 100)}% tax bracket)</span>
                  </div>
                  <strong className="text-orange-big">₹{taxSavings.toLocaleString('en-IN')}</strong>
                </div>

                <div className="ob-row net-row">
                  <span>Net Effective Cost:</span>
                  <strong className="text-amber-big">₹{netCost.toLocaleString('en-IN')}</strong>
                </div>

                <div className="mt-4">
                  <button className="btn-nicdark-primary w-full" onClick={openDonateModal}>
                    <Heart size={18} fill="white" /> DONATE & CLAIM 80G RECEIPT
                  </button>
                </div>

                <div className="pan-box mt-3" onClick={handleCopyPAN}>
                  <span>EBF PAN: <strong>AAGCE8045E</strong></span>
                  <span className="copy-act">{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED!' : 'COPY PAN'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nicdark-calc-section {
          padding: 5rem 0;
          background: #f5f7fa;
        }
        .calc-card-container {
          padding: 3rem;
          background: #ffffff;
        }
        .calc-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }
        .calc-col-left h2 {
          font-size: 2rem;
          color: #18202a;
          margin-bottom: 0.5rem;
        }
        .calc-desc {
          color: #64748b;
          font-size: 0.98rem;
          margin-bottom: 1.5rem;
        }
        .form-label-nicdark {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          color: #18202a;
          margin-bottom: 0.5rem;
        }
        .input-currency-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        .currency-sign {
          position: absolute;
          left: 1rem;
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: #ff5722;
        }
        .calc-input-field {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.5rem;
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: #18202a;
          border: 2px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
        }
        .calc-input-field:focus { border-color: #ff5722; }
        .calc-slider-nicdark {
          width: 100%;
          margin-top: 0.75rem;
          accent-color: #ff5722;
          cursor: pointer;
        }
        .slab-btn-group { display: flex; gap: 0.5rem; }
        .slab-chip {
          flex: 1;
          padding: 0.6rem;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: #475569;
          cursor: pointer;
        }
        .slab-chip.active {
          background: #18202a;
          color: #ffffff;
          border-color: #18202a;
        }
        .quick-chip-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: #64748b;
        }
        .amt-chip {
          padding: 0.3rem 0.7rem;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.82rem;
          color: #18202a;
          cursor: pointer;
        }
        .amt-chip:hover { border-color: #ff5722; color: #ff5722; }

        .output-box-dark {
          background: #18202a;
          color: #ffffff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .ob-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.88rem;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .text-amber { color: #ffb300; }
        .text-cyan { color: #38bdf8; }
        .ob-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
          font-size: 0.95rem;
        }
        .highlight-row {
          background: rgba(255, 87, 34, 0.15);
          border: 1px solid rgba(255, 87, 34, 0.3);
          border-radius: 10px;
          padding: 0.85rem 1rem;
        }
        .ob-lbl-bold { font-family: var(--font-heading); font-weight: 800; color: #ffffff; }
        .ob-sub { display: block; font-size: 0.75rem; color: #94a3b8; }
        .text-orange-big { color: #ff5722; font-size: 1.4rem; font-family: var(--font-heading); font-weight: 900; }
        .text-amber-big { color: #ffb300; font-size: 1.4rem; font-family: var(--font-heading); font-weight: 900; }
        .pan-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.5rem 0.85rem;
          border-radius: 6px;
          font-size: 0.8rem;
          color: #cbd5e1;
          cursor: pointer;
        }
        .copy-act { color: #ffb300; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem; }

        @media (max-width: 992px) {
          .calc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
