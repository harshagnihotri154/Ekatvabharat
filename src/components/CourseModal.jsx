import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Send } from 'lucide-react';

export default function CourseModal({ isOpen, onClose }) {
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
            <GraduationCap size={16} /> Earn & Learn Scheme (Vadgaon Campus)
          </div>
          <h2>Apply for Skill Development Course</h2>
          <p>Get 100% Job Guarantee & practical training in Hospitality, Cookery, Sales, or Graphic Design.</p>
        </div>

        {submitted ? (
          <div className="modal-success animate-fade-in">
            <CheckCircle2 size={48} className="text-emerald mb-3" />
            <h3>Course Application Submitted!</h3>
            <p>Our Vadgaon Campus counselor will call you within 24 hours for document verification and interview scheduling.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Candidate Name *</label>
                <input type="text" required placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input type="tel" required placeholder="e.g. 9876543210" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Course *</label>
                <select required>
                  <option value="BMFBS">F & B Service Hospitality (2+2 Months)</option>
                  <option value="BMCOOK">Cookery & Culinary Arts (1+1 Month)</option>
                  <option value="BOMCR">Café & Restaurant Management</option>
                  <option value="BMSM">Sales & Marketing Specialist</option>
                  <option value="BMSMM">Social Media Marketing</option>
                  <option value="BMGD">Graphic Design & UI Basics</option>
                </select>
              </div>
              <div className="form-group">
                <label>Highest Qualification *</label>
                <select required>
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="Diploma / Graduate">Diploma / Graduate</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Current Residential Area in Pune</label>
              <input type="text" placeholder="e.g. Katraj / Vadgaon / Hadapsar / Pimpri" />
            </div>

            <button type="submit" className="btn-primary w-full">
              <Send size={18} /> Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
