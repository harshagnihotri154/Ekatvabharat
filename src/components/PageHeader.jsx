import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function PageHeader({ tag, title, subtitle, breadcrumb, setActiveTab }) {
  return (
    <div className="page-header-banner">
      <div className="container text-center">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <button className="bc-link" onClick={() => setActiveTab && setActiveTab('home')}>Home</button>
          <ChevronRight size={14} className="bc-sep" />
          <span className="bc-current">{breadcrumb || title}</span>
        </div>

        {/* Tag & Headings */}
        {tag && (
          <div className="ph-tag">
            <Sparkles size={14} /> {tag}
          </div>
        )}

        <h1 className="ph-title">{title}</h1>

        {subtitle && (
          <p className="ph-subtitle">{subtitle}</p>
        )}
      </div>

      <style>{`
        .page-header-banner {
          background: linear-gradient(135deg, #18202a 0%, #0f172a 100%);
          color: #ffffff;
          padding: 3.5rem 0 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 1rem;
        }
        .bc-link {
          background: none;
          border: none;
          color: #ff5722;
          font-weight: 700;
          font-family: var(--font-heading);
          cursor: pointer;
        }
        .bc-link:hover { text-decoration: underline; }
        .bc-sep { color: #64748b; }
        .bc-current { color: #e2e8f0; font-weight: 600; }

        .ph-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.95rem;
          background: rgba(255, 87, 34, 0.18);
          color: #ff5722;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .ph-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }
        .ph-subtitle {
          font-size: 1.1rem;
          color: #cbd5e1;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .ph-title { font-size: 2rem; }
          .page-header-banner { padding: 2.5rem 0 2rem; }
        }
      `}</style>
    </div>
  );
}
