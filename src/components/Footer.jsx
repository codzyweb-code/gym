"use client";

import Link from 'next/link';

import { Dumbbell, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { useState } from 'react'

const SocialIcon = ({ d, viewBox = '0 0 24 24', size = 20 }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor">
    <path d={d} />
  </svg>
)

const InstagramIcon = ({ size }) => <SocialIcon size={size} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
const YoutubeIcon = ({ size }) => <SocialIcon size={size} d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
const FacebookIcon = ({ size }) => <SocialIcon size={size} d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
const TwitterIcon = ({ size }) => <SocialIcon size={size} d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <Dumbbell size={24} />
              <span>S4 <span className="text-accent">FITNESS</span></span>
            </Link>
            <p className="footer__desc">
              Sulthan Bathery's leading fitness center. Join our community and achieve real results with expert coaching,
              high-quality equipment, and a welcoming environment.
            </p>
            <div className="footer__socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social"><InstagramIcon size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social"><YoutubeIcon size={20} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social"><FacebookIcon size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social"><TwitterIcon size={20} /></a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <Link href="/about" className="footer__link">About Us</Link>
            <Link href="/services" className="footer__link">Programs</Link>
            <Link href="/membership" className="footer__link">Pricing</Link>
            <Link href="/gallery" className="footer__link">Gallery</Link>
            <Link href="/blog" className="footer__link">Blog</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Contact Info</h4>
            <div className="footer__contact-item">
              <MapPin size={16} className="text-accent" />
              <span>Main Road, Sulthan Bathery, Kerala - 673592</span>
            </div>
            <div className="footer__contact-item">
              <Phone size={16} className="text-accent" />
              <span>+91 98476 58992</span>
            </div>
            <div className="footer__contact-item">
              <Mail size={16} className="text-accent" />
              <span>info@s4fitness.gym</span>
            </div>
            <div className="footer__hours">
              <p><strong>Mon - Fri:</strong> 5:00 AM - 11:00 PM</p>
              <p><strong>Sat - Sun:</strong> 6:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Newsletter</h4>
            <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-md)' }}>
              Get fitness tips, exclusive offers, and updates straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="footer__newsletter">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="footer-newsletter-email"
              />
              <button type="submit" className="btn btn--primary btn--small" id="footer-newsletter-submit">
                {subscribed ? '✓' : 'Subscribe'}
              </button>
            </form>
            {subscribed && <p className="footer__success">Thanks for subscribing! 🎉</p>}
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} S4 Fitness. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top" id="scroll-top-btn">
        <ArrowUp size={20} />
      </button>

      <style>{`
        .footer {
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
          padding: var(--space-4xl) 0 var(--space-xl);
          position: relative;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: var(--space-3xl);
          padding-bottom: var(--space-3xl);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-xl);
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-heading);
          font-size: var(--fs-xl);
          font-weight: var(--fw-bold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-md);
          color: var(--color-accent);
        }
        .footer__desc {
          color: var(--color-text-secondary);
          font-size: var(--fs-sm);
          line-height: 1.7;
          margin-bottom: var(--space-lg);
        }
        .footer__socials {
          display: flex;
          gap: var(--space-sm);
        }
        .footer__social {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }
        .footer__social:hover {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
          transform: translateY(-3px);
        }
        .footer__col {
          display: flex;
          flex-direction: column;
        }
        .footer__heading {
          font-family: var(--font-heading);
          font-size: var(--fs-md);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-lg);
          color: var(--color-text-primary);
        }
        .footer__link {
          color: var(--color-text-secondary);
          font-size: var(--fs-sm);
          padding: var(--space-xs) 0;
          transition: color var(--transition-fast), padding-left var(--transition-fast);
        }
        .footer__link:hover {
          color: var(--color-accent);
          padding-left: var(--space-sm);
        }
        .footer__contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          color: var(--color-text-secondary);
          font-size: var(--fs-sm);
          margin-bottom: var(--space-md);
        }
        .footer__hours {
          margin-top: var(--space-sm);
          color: var(--color-text-secondary);
          font-size: var(--fs-sm);
          line-height: 1.8;
        }
        .footer__newsletter {
          display: flex;
          gap: var(--space-sm);
        }
        .footer__newsletter input {
          flex: 1;
          padding: 0.625rem 0.875rem;
          font-size: var(--fs-sm);
        }
        .footer__success {
          color: var(--color-success);
          font-size: var(--fs-sm);
          margin-top: var(--space-sm);
        }
        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-text-muted);
          font-size: var(--fs-sm);
        }
        .footer__bottom-links {
          display: flex;
          gap: var(--space-lg);
        }
        .footer__bottom-links a {
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
        }
        .footer__bottom-links a:hover {
          color: var(--color-accent);
        }
        .footer__scroll-top {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 44px;
          height: 44px;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
          z-index: var(--z-sticky);
        }
        .footer__scroll-top:hover {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          .footer__bottom {
            flex-direction: column;
            gap: var(--space-md);
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
