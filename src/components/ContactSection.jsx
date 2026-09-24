import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Building, Compass, ArrowRight, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section className="nicdark-contact-section" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="section-tag-nicdark">
            <Mail size={14} /> GET IN TOUCH WITH US
          </div>
          <h2 className="section-title-nicdark">CONTACT & CAMPUS LOCATIONS</h2>
          <p className="section-subtitle-nicdark">
            Visit our registered headquarters or Vadgaon training campus in Pune, Maharashtra. We welcome students, corporate CSR partners, and volunteers.
          </p>
        </div>

        {/* Campus Locations Grid */}
        <div className="campus-grid mb-12">
          {/* Campus Card 1: Katraj Headquarters */}
          <div className="campus-card nicdark-card">
            <div className="campus-card-header">
              <div className="c-icon-box orange">
                <Building size={24} />
              </div>
              <div>
                <span className="c-badge orange">CORPORATE HEADQUARTERS</span>
                <h3>Katraj Registered Office</h3>
              </div>
            </div>

            <div className="campus-card-body">
              <p className="c-address">
                <MapPin size={18} className="text-orange shrink-0" />
                <span>A-430, Ideal Park, Gokul Nagar, Katraj-Kondhwa Road, Pune - 411046, Maharashtra, India.</span>
              </p>

              <div className="c-details-list">
                <div className="c-detail-item">
                  <Phone size={15} className="text-muted" />
                  <span>Direct Hotline: <a href="tel:9272799605" className="link-bold">+91 9272799605</a> / <a href="tel:9657723904" className="link-bold">+91 9657723904</a></span>
                </div>
                <div className="c-detail-item">
                  <Mail size={15} className="text-muted" />
                  <span>Official Email: <a href="mailto:info@ekatvabharat.org" className="link-bold">info@ekatvabharat.org</a></span>
                </div>
                <div className="c-detail-item">
                  <Clock size={15} className="text-muted" />
                  <span>Office Hours: <strong>Mon - Sat (9:00 AM - 6:00 PM)</strong></span>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Katraj+Kondhwa+Road+Pune" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-map-link"
              >
                Open in Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Campus Card 2: Vadgaon Skill Campus */}
          <div className="campus-card nicdark-card">
            <div className="campus-img-header">
              <img 
                src="/website_assets/generated/campus_vadgaon_hub.jpg" 
                alt="Vadgaon Skill Training Campus Pune" 
                className="campus-photo"
              />
              <span className="c-badge green pos-tag">FLAGSHIP TRAINING HUB</span>
            </div>

            <div className="campus-card-body">
              <h3>Vadgaon Skill Development Campus</h3>
              <p className="c-address">
                <MapPin size={18} className="text-emerald shrink-0" />
                <span>Vadgaon Campus, Sinhagad Road, Pune, Maharashtra. (Hospitality & Culinary Labs)</span>
              </p>

              <div className="c-details-list">
                <div className="c-detail-item">
                  <Building size={15} className="text-muted" />
                  <span>Facilities: <strong>Culinary Kitchen, F&B Lab, IT Lab, SHG Hub</strong></span>
                </div>
                <div className="c-detail-item">
                  <Phone size={15} className="text-muted" />
                  <span>Admissions Helpline: <a href="tel:9272799605" className="link-bold">+91 9272799605</a></span>
                </div>
                <div className="c-detail-item">
                  <Clock size={15} className="text-muted" />
                  <span>Training Batches: <strong>Daily (9:00 AM - 5:00 PM)</strong></span>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Vadgaon+Sinhagad+Road+Pune" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-map-link green"
              >
                Open Campus Location <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form & Interactive Map Grid */}
        <div className="form-map-grid">
          {/* Interactive Form */}
          <div className="contact-form-card nicdark-card">
            <div className="cf-header">
              <h3>Send a Direct Message to EBF</h3>
              <p>Fill out the form below and our team will get back to you within 24 business hours.</p>
            </div>

            {submitted ? (
              <div className="form-success-box animate-fade-in">
                <CheckCircle2 size={42} className="text-emerald mb-2" />
                <h4>Message Received Successfully!</h4>
                <p>Thank you for reaching out to Ekatvabharat Foundation. Our representative will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="nicdark-form">
                <div className="form-row-2">
                  <div className="form-group-n">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group-n">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group-n">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group-n">
                    <label>Inquiry Type *</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Earn & Learn Course">Earn & Learn Skill Course Application</option>
                      <option value="Corporate CSR">Corporate CSR Partnership</option>
                      <option value="80G Donation">Donation & 80G Tax Exemption Receipt</option>
                      <option value="Health Camp Request">Community Health Camp Request</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-n">
                  <label>Your Message *</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Write your requirement or message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn-nicdark-primary w-full">
                  <Send size={18} /> SUBMIT MESSAGE NOW
                </button>
              </form>
            )}
          </div>

          {/* Interactive Google Map Box */}
          <div className="map-embed-card nicdark-card">
            <div className="map-header">
              <Compass size={20} className="text-orange" />
              <span>Interactive Map View (Pune HQ & Vadgaon Campus)</span>
            </div>
            <div className="iframe-wrap">
              <iframe 
                title="Ekatvabharat Foundation Pune Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60527.12574041797!2d73.81881774026367!3d18.452586718449615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eab034032d89%3A0xb351e06d9106bd25!2sKatraj-Kondhwa%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nicdark-contact-section {
          padding: 5rem 0;
          background: #ffffff;
        }
        .campus-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .campus-card {
          display: flex;
          flex-direction: column;
        }
        .campus-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.75rem 1.75rem 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .c-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .c-icon-box.orange { background: #fff3f0; color: #ff5722; }
        .c-icon-box.green { background: #e8f5e9; color: #2e7d32; }

        .c-badge {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .c-badge.orange { background: #fff3f0; color: #ff5722; }
        .c-badge.green { background: #e8f5e9; color: #2e7d32; }
        .pos-tag { position: absolute; top: 15px; left: 15px; z-index: 5; }

        .campus-card h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: #18202a;
          line-height: 1.25;
          margin-top: 0.2rem;
        }
        .campus-img-header {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .campus-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .campus-card-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .c-address {
          display: flex;
          gap: 0.6rem;
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .shrink-0 { flex-shrink: 0; margin-top: 0.2rem; }
        .c-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #475569;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .c-detail-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .link-bold {
          font-weight: 700;
          color: #18202a;
          transition: color 0.2s;
        }
        .link-bold:hover { color: #ff5722; }
        .btn-map-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 1.25rem;
          background: #18202a;
          color: #ffffff;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-map-link:hover { background: #ff5722; }
        .btn-map-link.green:hover { background: #2e7d32; }

        .form-map-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2rem;
        }
        .contact-form-card {
          padding: 2.25rem;
        }
        .cf-header h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: #18202a;
          margin-bottom: 0.25rem;
        }
        .cf-header p {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .nicdark-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group-n label {
          display: block;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: #18202a;
          margin-bottom: 0.4rem;
        }
        .form-group-n input, .form-group-n select, .form-group-n textarea {
          width: 100%;
          padding: 0.75rem 0.9rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #18202a;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group-n input:focus, .form-group-n select:focus, .form-group-n textarea:focus {
          border-color: #ff5722;
        }
        .form-success-box {
          text-align: center;
          padding: 2.5rem 1.5rem;
          background: #e8f5e9;
          border: 1px solid #a5d6a7;
          border-radius: 14px;
          color: #1b5e20;
        }
        .form-success-box h4 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          margin-bottom: 0.4rem;
        }

        .map-embed-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          height: 100%;
          min-height: 480px;
        }
        .map-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.9rem;
          color: #18202a;
          margin-bottom: 1rem;
        }
        .iframe-wrap {
          flex-grow: 1;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
        }

        @media (max-width: 992px) {
          .campus-grid, .form-map-grid { grid-template-columns: 1fr; }
          .form-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
