import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sprout, 
  Stethoscope, 
  HeartHandshake, 
  Heart, 
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function ProgramsSection({ openEnrollModal, openDonateModal, openCsrModal }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const causes = [
    {
      id: 'skill',
      category: 'SKILL EDUCATION',
      title: 'Vadgaon Earn & Learn Hospitality Skilling',
      desc: '100% Job-Guaranteed practical training in F&B Service & Cookery for underprivileged youth with stipends at Vadgaon Campus, Pune.',
      img: '/website_assets/generated/cause_skill_hospitality.jpg',
      raised: '₹15,50,000',
      goal: '₹20,000,000',
      progress: 77,
      location: 'Vadgaon Campus, Pune',
      tagColor: 'orange'
    },
    {
      id: 'agri',
      category: 'SUSTAINABLE AGRI',
      title: 'Farmer Producer Organization (FPO) & Organic Farming',
      desc: 'Empowering smallholder farmers across Maharashtra with soil health testing, bio-fertilizers, and direct market access.',
      img: '/website_assets/generated/cause_sustainable_agriculture.jpg',
      raised: '₹8,20,000',
      goal: '₹12,000,000',
      progress: 68,
      location: 'Rural Maharashtra',
      tagColor: 'green'
    },
    {
      id: 'health',
      category: 'HEALTH & CANCER AID',
      title: 'Child Cancer Aid & Pune District Health Camps',
      desc: 'Sponsoring specialized nutrition kits for children fighting cancer and conducting free health awareness camps in rural Pune.',
      img: '/website_assets/generated/cause_health_cancer_aid.jpg',
      raised: '₹6,40,000',
      goal: '₹10,000,000',
      progress: 64,
      location: 'PMC & PCMC Area',
      tagColor: 'red'
    },
    {
      id: 'women',
      category: 'WOMEN EMPOWERMENT',
      title: 'Women Digital Literacy & SHG Entrepreneurship',
      desc: 'Vocational training and micro-funding in collaboration with Yardi Software Pvt Ltd and Lighthouse Communities in PMC/PCMC.',
      img: '/website_assets/generated/cause_women_empowerment.jpg',
      raised: '₹11,000,000',
      goal: '₹15,000,000',
      progress: 73,
      location: 'Pune Metropolitan',
      tagColor: 'amber'
    }
  ];

  const filteredCauses = activeFilter === 'ALL' 
    ? causes 
    : causes.filter(c => c.category.includes(activeFilter));

  const coursesList = [
    { code: 'BMFBS', name: 'F & B Service Hospitality', duration: '2+2 Months', fees: '₹15,520/-', highlight: '100% Job Guarantee' },
    { code: 'BMCOOK', name: 'Professional Cookery & Chef', duration: '1+1 Month', fees: '₹21,500/-', highlight: '100% Job Guarantee' },
    { code: 'BOMCR', name: 'Café & Restaurant Mgmt', duration: '2 Months', fees: 'CSR Sponsored', highlight: 'Startup Support' },
    { code: 'BMSM', name: 'Sales & Marketing Specialist', duration: '2 Months', fees: 'CSR Sponsored', highlight: 'Placement Assist' },
    { code: 'BMSMM', name: 'Social Media Marketing', duration: '2 Months', fees: 'CSR Sponsored', highlight: 'Live Projects' },
    { code: 'BMGD', name: 'Graphic Design & UI Basics', duration: '3 Months', fees: 'CSR Sponsored', highlight: 'Portfolio Build' }
  ];

  return (
    <section className="nicdark-causes-section" id="programs">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="section-tag-nicdark">
            <Sparkles size={14} /> FEATURED CAUSES & INITIATIVES
          </div>
          <h2 className="section-title-nicdark">URGENT CAUSES NEEDING YOUR SUPPORT</h2>
          <p className="section-subtitle-nicdark">
            Your generous contributions directly fund job guarantee training, sustainable agriculture, and child cancer aid across India.
          </p>
        </div>

        {/* Filter Chips Row */}
        <div className="cause-filter-row mb-10">
          {['ALL', 'SKILL', 'AGRI', 'HEALTH', 'WOMEN'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'ALL' ? 'ALL CAUSES' : filter}
            </button>
          ))}
        </div>

        {/* Featured Causes Grid */}
        <div className="causes-grid mb-16">
          {filteredCauses.map((c) => (
            <div key={c.id} className="cause-card nicdark-card">
              <div className="cause-img-box">
                <img src={c.img} alt={c.title} className="cause-img" />
                <span className={`cause-cat-badge ${c.tagColor}`}>{c.category}</span>
                <span className="cause-loc-badge"><MapPin size={12} /> {c.location}</span>
              </div>

              <div className="cause-card-body">
                <div>
                  <h3 className="cause-title">{c.title}</h3>
                  <p className="cause-desc">{c.desc}</p>
                </div>

                {/* Nicdark Progress Widget */}
                <div className="cause-progress-wrap">
                  <div className="cause-progress-header">
                    <span>RAISED: <strong className="text-orange">{c.raised}</strong></span>
                    <span>GOAL: <strong>{c.goal}</strong></span>
                  </div>
                  <div className="cause-progress-bar">
                    <div className="cause-progress-fill" style={{ width: `${c.progress}%` }}></div>
                  </div>
                  <div className="progress-perc">{c.progress}% FUNDED</div>
                </div>

                <div className="cause-btn-row">
                  <button className="btn-nicdark-primary btn-sm" onClick={openDonateModal}>
                    <Heart size={16} fill="white" /> DONATE NOW
                  </button>
                  <button className="btn-nicdark-secondary btn-sm" onClick={openEnrollModal}>
                    ENROLL / APPLY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Directory Banner */}
        <div className="courses-catalog-box nicdark-card">
          <div className="cc-header">
            <div>
              <span className="cc-tag">Vadgaon Campus Flagship</span>
              <h2>Skill Development Course Directory (2025-2026)</h2>
            </div>
            <button className="btn-nicdark-amber" onClick={openEnrollModal}>
              <GraduationCap size={20} /> APPLY FOR COURSES NOW
            </button>
          </div>

          <div className="courses-grid-box">
            {coursesList.map((item, idx) => (
              <div key={idx} className="c-item-box">
                <div className="c-top">
                  <span className="c-code">{item.code}</span>
                  <span className="c-badge">{item.highlight}</span>
                </div>
                <h4>{item.name}</h4>
                <div className="c-info-row">
                  <span><Clock size={13} /> <strong>{item.duration}</strong></span>
                  <span>Fee: <strong>{item.fees}</strong></span>
                </div>
                <button className="btn-apply-c" onClick={openEnrollModal}>
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .nicdark-causes-section {
          padding: 4.5rem 0;
          background: #f5f7fa;
        }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-16 { margin-bottom: 4rem; }
        
        .cause-filter-row {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          padding: 0.5rem 1.25rem;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.85rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { border-color: #ff5722; color: #ff5722; }
        .filter-btn.active {
          background: #ff5722;
          color: #ffffff;
          border-color: #ff5722;
          box-shadow: 0 4px 12px rgba(255, 87, 34, 0.3);
        }

        .causes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .cause-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 16px;
        }
        .cause-img-box {
          position: relative;
          height: 260px;
          overflow: hidden;
        }
        .cause-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .cause-card:hover .cause-img {
          transform: scale(1.05);
        }
        .cause-cat-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 0.35rem 0.85rem;
          border-radius: 4px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.78rem;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .cause-cat-badge.orange { background: #ff5722; }
        .cause-cat-badge.green { background: #2e7d32; }
        .cause-cat-badge.red { background: #d32f2f; }
        .cause-cat-badge.amber { background: #ffa000; }

        .cause-loc-badge {
          position: absolute;
          bottom: 15px;
          right: 15px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
        }

        .cause-card-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }
        .cause-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          color: #18202a;
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }
        .cause-desc {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }
        .text-orange { color: #ff5722; }
        .progress-perc {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          color: #ff5722;
          text-align: right;
          margin-top: 0.3rem;
        }
        .cause-btn-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
        .btn-sm {
          padding: 0.65rem 1.25rem;
          font-size: 0.88rem;
          flex: 1;
        }

        .courses-catalog-box {
          padding: 2.5rem;
          background: #ffffff;
          border-radius: 20px;
        }
        .cc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .cc-tag {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          color: #ff5722;
          text-transform: uppercase;
        }
        .cc-header h2 {
          font-size: 1.8rem;
          color: #18202a;
        }
        .courses-grid-box {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .c-item-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem;
        }
        .c-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .c-code {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          color: #ff5722;
          background: #fff3f0;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        .c-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: #2e7d32;
          background: #e8f5e9;
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
        }
        .c-item-box h4 {
          font-size: 1.1rem;
          color: #18202a;
          margin-bottom: 0.75rem;
        }
        .c-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.85rem;
        }
        .c-info-row span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .btn-apply-c {
          width: 100%;
          padding: 0.55rem;
          background: #18202a;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-apply-c:hover { background: #ff5722; }

        @media (max-width: 992px) {
          .causes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
