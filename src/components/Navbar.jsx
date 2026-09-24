import React, { useState, useEffect } from 'react';
import { Heart, Building2, Menu, X, ChevronRight, Phone } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, openCsrModal, openDonateModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Causes & Courses' },
    { id: 'csr', label: 'CSR Partnerships' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`elegant-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Ultra-Clean Minimal Top Announcement Bar */}
      <div className="top-announcement">
        <div className="container top-announcement-inner">
          <div className="announcement-text">
            <span className="badge-dot"></span>
            <span>Registered Section 8 NGO (Reg No: U85300PN2021NPL206842) • 12A & 80G Tax Exempt</span>
          </div>
          <div className="announcement-contact">
            <a href="tel:9272799605" className="phone-link"><Phone size={12} /> +91 9272799605</a>
            <span className="sep">•</span>
            <a href="mailto:info@ekatvabharat.org" className="email-link">info@ekatvabharat.org</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="container nav-row">
          {/* Elegant Brand Logo */}
          <div className="brand-wrap" onClick={() => setActiveTab('home')}>
            <div className="brand-logo-mark">
              <Heart size={20} fill="#ff5722" color="#ff5722" />
            </div>
            <div className="brand-name-group">
              <span className="brand-title">EKATVABHARAT</span>
              <span className="brand-sub">FOUNDATION</span>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <div className="nav-links-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="nav-actions-desktop">
            <button className="btn-csr-outline" onClick={openCsrModal}>
              <Building2 size={15} /> Partner CSR
            </button>
            <button className="btn-donate-pill" onClick={openDonateModal}>
              <Heart size={15} fill="white" color="white" /> Donate Now
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in">
          <div className="mobile-links-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                <span>{item.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <div className="mobile-action-group">
            <button className="btn-donate-pill w-full" onClick={() => { openDonateModal(); setMobileMenuOpen(false); }}>
              <Heart size={16} fill="white" color="white" /> Donate (80G Tax Exemption)
            </button>
            <button className="btn-csr-outline w-full" onClick={() => { openCsrModal(); setMobileMenuOpen(false); }}>
              <Building2 size={16} /> Corporate CSR Partner
            </button>
          </div>
        </div>
      )}

      <style>{`
        .elegant-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }
        .elegant-header.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .top-announcement {
          background: #0f172a;
          color: #94a3b8;
          font-size: 0.76rem;
          padding: 0.35rem 0;
        }
        .top-announcement-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .announcement-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #cbd5e1;
          font-weight: 500;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
        }
        .announcement-contact {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .phone-link, .email-link {
          color: #cbd5e1;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.2s;
        }
        .phone-link:hover, .email-link:hover { color: #ff5722; }
        .sep { color: #475569; }

        .navbar-main {
          padding: 0.9rem 0;
        }
        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .brand-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
        }
        .brand-logo-mark {
          width: 38px;
          height: 38px;
          background: #fff3f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 87, 34, 0.2);
        }
        .brand-name-group {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .brand-sub {
          font-size: 0.68rem;
          font-weight: 700;
          color: #ff5722;
          letter-spacing: 0.18em;
          line-height: 1.2;
        }

        /* Desktop Nav Items */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .nav-btn {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.92rem;
          color: #475569;
          cursor: pointer;
          padding: 0.4rem 0;
          position: relative;
          transition: color 0.2s;
        }
        .nav-btn:hover {
          color: #0f172a;
        }
        .nav-btn.active {
          color: #ff5722;
          font-weight: 700;
        }
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #ff5722;
          border-radius: 2px;
        }

        /* Desktop Actions */
        .nav-actions-desktop {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .btn-csr-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          background: transparent;
          border: 1px solid #cbd5e1;
          border-radius: 100px;
          color: #334155;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-csr-outline:hover {
          border-color: #0f172a;
          color: #0f172a;
          background: #f8fafc;
        }
        .btn-donate-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.3rem;
          background: linear-gradient(135deg, #ff5722, #e64a19);
          border: none;
          border-radius: 100px;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(255, 87, 34, 0.25);
          transition: all 0.2s;
        }
        .btn-donate-pill:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(255, 87, 34, 0.35);
        }

        /* Mobile Hamburger Toggle */
        .mobile-hamburger {
          display: none;
          background: none;
          border: none;
          color: #0f172a;
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-menu-drawer {
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .mobile-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0.5rem;
          background: none;
          border: none;
          border-bottom: 1px solid #f8fafc;
          color: #334155;
          font-weight: 600;
          font-size: 0.98rem;
          cursor: pointer;
        }
        .mobile-menu-item.active {
          color: #ff5722;
        }
        .mobile-action-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .w-full { width: 100%; justify-content: center; }

        @media (max-width: 992px) {
          .nav-links-desktop, .nav-actions-desktop, .announcement-contact {
            display: none;
          }
          .mobile-hamburger {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
