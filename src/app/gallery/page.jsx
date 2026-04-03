"use client";

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'

const categories = ['All', 'Gym Floor', 'Classes', 'Equipment', 'Community', 'Events']

const galleryItems = [
  { src: null, alt: 'Main gym floor with premium equipment', category: 'Gym Floor', color: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' },
  { src: null, alt: 'HIIT class in action', category: 'Classes', color: 'linear-gradient(135deg, #C9A84C 0%, #a8893e 100%)' },
  { src: null, alt: 'Hammer Strength equipment rack', category: 'Equipment', color: 'linear-gradient(135deg, #222222 0%, #333333 100%)' },
  { src: null, alt: 'Group yoga session', category: 'Classes', color: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)' },
  { src: null, alt: 'Members celebrating together', category: 'Community', color: 'linear-gradient(135deg, #a8893e 0%, #7a6b30 100%)' },
  { src: null, alt: 'Free weights zone', category: 'Gym Floor', color: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)' },
  { src: null, alt: 'Boxing ring area', category: 'Equipment', color: 'linear-gradient(135deg, #404040 0%, #1a1a1a 100%)' },
  { src: null, alt: 'Spin class studio', category: 'Classes', color: 'linear-gradient(135deg, #d4b85e 0%, #a8893e 100%)' },
  { src: null, alt: 'Annual fitness competition', category: 'Events', color: 'linear-gradient(135deg, #333333 0%, #111111 100%)' },
  { src: null, alt: 'Cardio zone with treadmills', category: 'Gym Floor', color: 'linear-gradient(135deg, #C9A84C 0%, #333333 100%)' },
  { src: null, alt: 'Team workout session', category: 'Community', color: 'linear-gradient(135deg, #2a2a2a 0%, #181818 100%)' },
  { src: null, alt: 'CrossFit competition event', category: 'Events', color: 'linear-gradient(135deg, #a8893e 0%, #222222 100%)' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeCategory)

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const goNext = () => setLightbox(prev => (prev + 1) % filtered.length)
  const goPrev = () => setLightbox(prev => (prev - 1 + filtered.length) % filtered.length)

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="container">
          <span className="badge">Our Space</span>
          <h1>The <span className="text-accent">Gallery</span></h1>
          <p>Take a virtual tour of our world-class facility and vibrant community.</p>
        </div>
      </div>

      <section className="section" id="gallery-section">
        <div className="container">
          {/* CATEGORY FILTER */}
          <ScrollReveal>
            <div className="gallery-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`gallery-filter ${activeCategory === cat ? 'gallery-filter--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* GALLERY GRID */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <ScrollReveal key={`${item.alt}-${i}`} delay={i * 60}>
                <div
                  className="gallery-item"
                  onClick={() => openLightbox(i)}
                  id={`gallery-item-${i}`}
                >
                  <div
                    className="gallery-item__img"
                    style={{ background: item.src ? `url(${item.src}) center/cover` : item.color }}
                  >
                    <div className="gallery-item__label">{item.alt}</div>
                  </div>
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__category">{item.category}</span>
                    <span className="gallery-item__zoom">View</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}><X size={24} /></button>
          <button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft size={32} /></button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <div
              className="lightbox__image"
              style={{ background: filtered[lightbox].src ? `url(${filtered[lightbox].src}) center/cover` : filtered[lightbox].color }}
            >
              <p className="lightbox__caption">{filtered[lightbox].alt}</p>
            </div>
          </div>
          <button className="lightbox__next" onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight size={32} /></button>
        </div>
      )}

      <style>{`
        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          flex-wrap: wrap;
          margin-bottom: var(--space-2xl);
        }
        .gallery-filter {
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: var(--fs-sm);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
          background: var(--color-bg-card);
        }
        .gallery-filter--active {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
        }
        .gallery-filter:hover:not(.gallery-filter--active) {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
        }
        .gallery-item {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
        }
        .gallery-item__img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: var(--space-md);
          transition: transform var(--transition-slow);
        }
        .gallery-item:hover .gallery-item__img {
          transform: scale(1.08);
        }
        .gallery-item__label {
          font-size: var(--fs-xs);
          color: rgba(255,255,255,0.7);
          text-align: center;
          font-weight: var(--fw-medium);
        }
        .gallery-item__overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .gallery-item:hover .gallery-item__overlay {
          opacity: 1;
        }
        .gallery-item__category {
          font-size: var(--fs-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
        }
        .gallery-item__zoom {
          font-family: var(--font-heading);
          font-size: var(--fs-lg);
          text-transform: uppercase;
        }

        /* LIGHTBOX */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInUp 0.3s ease;
        }
        .lightbox__close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          z-index: 10;
          transition: color var(--transition-fast);
        }
        .lightbox__close:hover { color: var(--color-accent); }
        .lightbox__prev,
        .lightbox__next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          z-index: 10;
          transition: color var(--transition-fast);
        }
        .lightbox__prev { left: 20px; }
        .lightbox__next { right: 20px; }
        .lightbox__prev:hover,
        .lightbox__next:hover { color: var(--color-accent); }
        .lightbox__content {
          max-width: 80vw;
          max-height: 80vh;
        }
        .lightbox__image {
          width: 70vw;
          height: 70vh;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: var(--space-xl);
        }
        .lightbox__caption {
          color: white;
          font-size: var(--fs-md);
          text-align: center;
          background: rgba(0,0,0,0.5);
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-md);
        }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .lightbox__image { width: 90vw; height: 50vh; }
          .gallery-filter {
            padding: 0.4rem 0.875rem;
            font-size: var(--fs-xs);
          }
        }
      `}</style>
    </div>
  )
}
