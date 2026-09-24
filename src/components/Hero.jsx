import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  GraduationCap, 
  Sprout, 
  Stethoscope, 
  HeartHandshake, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Award,
  Building2,
  Sparkles
} from 'lucide-react';

export default function Hero({ setActiveTab, openCsrModal, openEnrollModal, openDonateModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 'skilling',
      tag: '100% JOB GUARANTEE • VADGAON CAMPUS',
      title: 'EMPOWERING YOUTH WITH 100% JOB-GUARANTEED SKILLS',
      desc: 'Vadgaon Campus offers practical courses in Hospitality F&B Service, Cookery, Sales, and IT with stipends and 100% placement assurance for rural youth.',
      bg: '/website_assets/generated/slide_skilling.jpg',
      primaryBtn: { text: 'APPLY FOR COURSES', action: openEnrollModal, icon: GraduationCap },
      secondaryBtn: { text: 'DONATE NOW (80G TAX EXEMPT)', action: openDonateModal, icon: Heart }
    },
    {
      id: 'agri',
      tag: 'SUSTAINABLE FARMING • FPO UPLIFTMENT',
      title: 'TRANSFORMING RURAL INDIA THROUGH SUSTAINABLE FARMING',
      desc: 'Supporting smallholder farmers across Maharashtra with eco-friendly organic cultivation, soil health testing, and direct market access.',
      bg: '/website_assets/generated/slide_agri.jpg',
      primaryBtn: { text: 'SUPPORT FARMERS DRIVE', action: openDonateModal, icon: Sprout },
      secondaryBtn: { text: 'BECOME A CSR PARTNER', action: openCsrModal, icon: Building2 }
    },
    {
      id: 'health',
      tag: 'PUBLIC HEALTH CARE • CHILD CANCER AID',
      title: 'BRINGING HEALTHCARE & CANCER AID TO EVERY CHILD',
      desc: 'Organizing free health checkup camps across Pune district and sponsoring specialized nutrition packages for children fighting cancer.',
      bg: '/website_assets/generated/slide_health.jpg',
      primaryBtn: { text: 'SPONSOR HEALTH AID', action: openDonateModal, icon: Heart },
      secondaryBtn: { text: 'CONTACT OUR HEALTH TEAM', action: () => setActiveTab('contact'), icon: Stethoscope }
    },
    {
      id: 'women',
      tag: 'CORPORATE CSR PARTNERSHIPS • YARDI SOFTWARE',
      title: 'DRIVING HIGH-IMPACT CORPORATE CSR PARTNERSHIPS',
      desc: 'Collaborating with enterprise leaders like Yardi Software Pvt Ltd and Lighthouse Communities to empower women with digital literacy & SHG support.',
      bg: '/website_assets/generated/slide_women.jpg',
      primaryBtn: { text: 'REQUEST CSR PROPOSAL', action: openCsrModal, icon: Building2 },
      secondaryBtn: { text: 'DONATE NOW (80G TAX EXEMPT)', action: openDonateModal, icon: Heart }
    }
  ];

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Container */}
      <div className="slider-wrapper">
        {slides.map((slide, index) => {
          const PrimaryIcon = slide.primaryBtn.icon;
          const SecondaryIcon = slide.secondaryBtn.icon;
          const isActive = index === currentSlide;

          return (
            <div 
              key={slide.id} 
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.65)), url(${slide.bg})` }}
            >
              <div className="container slide-content-box">
                <div className="slide-text-inner animate-fade-in">
                  <div className="slide-badge">
                    <Sparkles size={14} className="text-orange" /> {slide.tag}
                  </div>

                  <h1 className="slide-title">{slide.title}</h1>

                  <p className="slide-desc">{slide.desc}</p>

                  <div className="slide-cta-row">
                    <button className="btn-nicdark-primary btn-slide-lg" onClick={slide.primaryBtn.action}>
                      <PrimaryIcon size={18} fill={PrimaryIcon === Heart ? 'white' : 'none'} /> {slide.primaryBtn.text}
                    </button>
                    <button className="btn-nicdark-amber btn-slide-lg" onClick={slide.secondaryBtn.action}>
                      <SecondaryIcon size={18} fill={SecondaryIcon === Heart ? '#18202a' : 'none'} /> {slide.secondaryBtn.text}
                    </button>
                  </div>

                  <div className="slide-legal-strip">
                    <span><ShieldCheck size={14} className="text-emerald" /> 100% Tax Exempt (80G)</span>
                    <span className="sep">•</span>
                    <span><Award size={14} className="text-amber" /> NITI Aayog Verified</span>
                    <span className="sep">•</span>
                    <span><Building2 size={14} className="text-orange" /> Section 8 NGO (Reg: U85300PN2021NPL206842)</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous Slide">
          <ChevronLeft size={28} />
        </button>
        <button className="slider-arrow next" onClick={handleNext} aria-label="Next Slide">
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicator Dots */}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Floating Trust Counter Bar */}
      <div className="hero-counter-bar">
        <div className="container counter-inner">
          <div className="counter-item">
            <GraduationCap size={26} className="c-icon orange" />
            <div>
              <span className="c-val">100+</span>
              <span className="c-lbl">Students Skilled (2024-25)</span>
            </div>
          </div>
          <div className="c-sep"></div>

          <div className="counter-item">
            <Building2 size={26} className="c-icon amber" />
            <div>
              <span className="c-val">4 Batches</span>
              <span className="c-lbl">Yardi CSR Completed</span>
            </div>
          </div>
          <div className="c-sep"></div>

          <div className="counter-item">
            <Award size={26} className="c-icon green" />
            <div>
              <span className="c-val">100%</span>
              <span className="c-lbl">Job Placement Guarantee</span>
            </div>
          </div>
          <div className="c-sep"></div>

          <div className="counter-item">
            <Heart size={26} className="c-icon red" />
            <div>
              <span className="c-val">10+</span>
              <span className="c-lbl">Rural Health Camps</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-slider-section {
          position: relative;
          background: #0f172a;
          color: #ffffff;
          overflow: hidden;
        }
        .slider-wrapper {
          position: relative;
          min-height: 540px;
          height: 70vh;
          max-height: 680px;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.8s;
          display: flex;
          align-items: center;
        }
        .hero-slide.active {
          opacity: 1;
          visibility: visible;
        }
        .slide-content-box {
          position: relative;
          z-index: 10;
        }
        .slide-text-inner {
          max-width: 820px;
        }
        .slide-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.95rem;
          background: rgba(255, 87, 34, 0.2);
          color: #ff5722;
          border: 1px solid rgba(255, 87, 34, 0.4);
          border-radius: 100px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
        }
        .slide-title {
          font-family: var(--font-heading);
          font-size: 3.2rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .slide-desc {
          font-size: 1.15rem;
          color: #e2e8f0;
          line-height: 1.6;
          margin-bottom: 2.25rem;
          max-width: 760px;
        }
        .slide-cta-row {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .btn-slide-lg {
          padding: 1.05rem 2.2rem;
          font-size: 0.95rem;
        }
        .slide-legal-strip {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #cbd5e1;
          font-weight: 600;
          flex-wrap: wrap;
        }
        .text-orange { color: #ff5722; }
        .text-emerald { color: #4caf50; }
        .text-amber { color: #ffb300; }
        .sep { color: rgba(255, 255, 255, 0.3); }

        /* Slider Navigation Arrows */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.2s;
        }
        .slider-arrow:hover {
          background: #ff5722;
          border-color: #ff5722;
          transform: translateY(-50%) scale(1.08);
        }
        .slider-arrow.prev { left: 25px; }
        .slider-arrow.next { right: 25px; }

        /* Slider Dots */
        .slider-dots {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.6rem;
          z-index: 20;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          width: 32px;
          border-radius: 100px;
          background: #ff5722;
        }

        /* Floating Trust Counter Bar */
        .hero-counter-bar {
          background: #18202a;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem 0;
        }
        .counter-inner {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .counter-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .c-icon.orange { color: #ff5722; }
        .c-icon.amber { color: #ffb300; }
        .c-icon.green { color: #4caf50; }
        .c-icon.red { color: #ef5350; }

        .c-val {
          display: block;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.5rem;
          color: #ffffff;
          line-height: 1.1;
        }
        .c-lbl {
          font-size: 0.82rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .c-sep {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 992px) {
          .slide-title { font-size: 2.2rem; }
          .slider-arrow { display: none; }
          .c-sep { display: none; }
        }
      `}</style>
    </section>
  );
}
