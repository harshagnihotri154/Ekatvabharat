import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, X, Eye } from 'lucide-react';

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryItems = [
    {
      src: '/website_assets/generated/gallery_certification_event.jpg',
      title: 'Skill Convocation & Job Placement Ceremony 2025',
      category: 'Placements'
    },
    {
      src: '/website_assets/generated/cause_skill_hospitality.jpg',
      title: 'Hospitality & Culinary Vocational Training (Vadgaon Campus)',
      category: 'Skill Education'
    },
    {
      src: '/website_assets/generated/gallery_agri_drone.jpg',
      title: 'Agricultural Drone Technology & Farmer FPO Drive',
      category: 'Sustainable Agri'
    },
    {
      src: '/website_assets/generated/cause_health_cancer_aid.jpg',
      title: 'Child Healthcare & Cancer Wellness Aid Camp',
      category: 'Healthcare'
    },
    {
      src: '/website_assets/generated/gallery_cookery_class.jpg',
      title: 'Practical Gourmet Cooking & Chef Training Session',
      category: 'Skill Education'
    },
    {
      src: '/website_assets/generated/gallery_health_camp_rural.jpg',
      title: 'Rural Health Checkup & Eye Screening Camp in Pune',
      category: 'Healthcare'
    },
    {
      src: '/website_assets/generated/cause_women_empowerment.jpg',
      title: 'Women Digital Literacy & Computer Vocational Center',
      category: 'Empowerment'
    },
    {
      src: '/website_assets/generated/cause_sustainable_agriculture.jpg',
      title: 'Organic Farming & Soil Rejuvenation Workshop',
      category: 'Sustainable Agri'
    }
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="text-center mb-12">
          <div className="section-tag-nicdark">
            <ImageIcon size={14} /> GROUND REALITIES & FIELD IMPACT
          </div>
          <h2 className="section-title-nicdark">MEDIA & FIELD PHOTO GALLERY</h2>
          <p className="section-subtitle-nicdark">
            High-resolution visual highlights from our skill development batches, health checkup camps, CSR partnerships, and sustainable farming initiatives.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className="gallery-card nicdark-card"
              onClick={() => setSelectedImg(item)}
            >
              <div className="gallery-img-wrap">
                <img src={item.src} alt={item.title} className="gallery-img" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-cat-pill">{item.category}</span>
                  <h4 className="gallery-item-title">{item.title}</h4>
                  <div className="view-photo-badge">
                    <Eye size={16} /> View Photo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImg(null)}>
              <X size={22} />
            </button>
            <img src={selectedImg.src} alt={selectedImg.title} className="lightbox-img" />
            <div className="lightbox-caption-bar">
              <span className="cat-pill-gold">{selectedImg.category}</span>
              <h3>{selectedImg.title}</h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-section {
          padding: 5rem 0;
          background: #ffffff;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .gallery-card {
          cursor: pointer;
          overflow: hidden;
          border-radius: 14px;
        }
        .gallery-img-wrap {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(24, 32, 42, 0.9) 0%, rgba(24, 32, 42, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          opacity: 0.95;
          transition: opacity 0.3s;
        }
        .gallery-cat-pill {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          background: #ff5722;
          color: #ffffff;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.72rem;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }
        .gallery-item-title {
          font-family: var(--font-heading);
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }
        .view-photo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #ffb300;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.8rem;
        }
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .lightbox-modal-content {
          position: relative;
          max-width: 960px;
          width: 100%;
          background: #18202a;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
        }
        .lightbox-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
        }
        .lightbox-close-btn:hover { background: #ff5722; }
        .lightbox-img {
          width: 100%;
          max-height: 560px;
          object-fit: contain;
          background: #000000;
          display: block;
        }
        .lightbox-caption-bar {
          padding: 1.25rem 1.75rem;
          background: #18202a;
          color: #ffffff;
        }
        .cat-pill-gold {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: #ffb300;
          color: #18202a;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.75rem;
          border-radius: 4px;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
        }
        .lightbox-caption-bar h3 {
          font-family: var(--font-heading);
          color: #ffffff;
          font-size: 1.3rem;
        }
      `}</style>
    </section>
  );
}
