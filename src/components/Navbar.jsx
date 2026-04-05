"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Dumbbell } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/membership', label: 'Pricing' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const location = usePathname()

  // Check auth on mount and route change
  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" ? localStorage : {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}}).getItem('s4fitness_user')
      setUser(stored ? JSON.parse(stored) : null)
    } catch { setUser(null) }
  }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* 
        IRON-CLAD FULLSCREEN OVERLAY 
        Moved outside the <nav> to break free from 'containment traps'
      */}
      <div className={`navbar-mobile-overlay ${isOpen ? 'active' : ''}`}>
        <button 
          className="navbar-mobile-close" 
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
        <div className="navbar-mobile-content">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`navbar-mobile-link ${location === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-mobile-footer">
            {user ? (
               <Link 
                href={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className="navbar__avatar" 
                onClick={() => setIsOpen(false)}
                style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
              >
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="btn btn--primary btn--large" 
                onClick={() => setIsOpen(false)}
                style={{ width: '100%', textAlign: 'center' }}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__bg"></div>
        <div className="container navbar__inner">
          <Link href="/" className="navbar__logo">
            <Dumbbell size={28} className="navbar__logo-icon" />
            <span>S4 <span className="text-accent">FITNESS</span></span>
          </Link>

          <div className="navbar__desktop-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`navbar__link ${location === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar__actions">
            {!user && (
              <Link href="/login" className="navbar__link navbar__login-desktop">Login</Link>
            )}
            {!user && (
              <Link href="/membership" className="btn btn--primary btn--small navbar__cta-desktop">
                Join Now
              </Link>
            )}
            {user && (
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="navbar__avatar navbar__avatar-desktop">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Link>
            )}
            <button
              className="navbar__toggle"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        <style>{`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--nav-height);
            z-index: 1000;
            transition: all var(--transition-base);
            background: transparent;
          }
          .navbar__bg {
            position: absolute;
            inset: 0;
            z-index: -1;
            transition: all var(--transition-base);
            background: transparent;
            pointer-events: none;
          }
          .navbar--scrolled .navbar__bg {
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--color-border);
          }
          .navbar__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }
          .navbar__logo {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
            font-family: var(--font-heading);
            font-size: var(--fs-xl);
            font-weight: var(--fw-bold);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .navbar__logo-icon {
            color: var(--color-accent);
          }
          .navbar__desktop-links {
            display: flex;
            align-items: center;
            gap: var(--space-lg);
          }
          .navbar__actions {
            display: flex;
            align-items: center;
            gap: var(--space-md);
          }
          .navbar__toggle {
            display: none;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
          }

          /* ULTRA-CLEAR CRYSTAL GLASSMORPHISM */
          .navbar-mobile-overlay {
            position: fixed;
            inset: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.15)
            ) !important;
            backdrop-filter: blur(25px) !important;
            -webkit-backdrop-filter: blur(25px) !important;
            z-index: 9999999 !important;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            visibility: hidden;
            -webkit-overflow-scrolling: touch;
            border: none !important;
            outline: none !important;
          }
          .navbar-mobile-overlay.active {
            transform: translateX(0);
            visibility: visible;
          }
          
          /* Allow background page to be seen through the blur */
          body:has(.navbar-mobile-overlay.active) {
            overflow: hidden !important;
          }

          .navbar-mobile-close {
            position: fixed;
            top: 2rem;
            right: 2rem;
            color: #ffffff !important;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2) !important;
            cursor: pointer;
            z-index: 10000001 !important;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .navbar-mobile-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            min-height: 100%;
            gap: 1.25rem;
            padding: 7rem 2rem 6rem;
            background: transparent !important;
          }
          .navbar-mobile-link {
            font-family: var(--font-heading);
            font-size: 2.25rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #ffffff !important;
            text-decoration: none !important;
            letter-spacing: 0.05em;
            width: 100%;
            text-align: center;
            padding: 0.75rem 0;
            transition: all 0.3s ease;
            text-shadow: 0 4px 20px rgba(0,0,0,0.9);
          }
          .navbar-mobile-link.active {
            color: var(--color-accent) !important;
            text-shadow: 
              0 0 10px rgba(200, 16, 46, 0.6),
              0 0 20px rgba(200, 16, 46, 0.4),
              0 0 40px rgba(200, 16, 46, 0.2);
            animation: lunarPulse 4s ease-in-out infinite;
          }
          .navbar-mobile-footer {
            margin-top: 3rem;
            width: 100%;
            max-width: 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 6rem;
            position: relative;
            z-index: 10000002;
          }

          @media (max-width: 1024px) {
            .navbar__desktop-links,
            .navbar__login-desktop,
            .navbar__cta-desktop,
            .navbar__avatar-desktop {
              display: none;
            }
            .navbar__toggle {
              display: block;
            }
          }

          .navbar__link {
            font-family: var(--font-body);
            font-size: var(--fs-sm);
            font-weight: var(--fw-medium);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--color-text-secondary);
            transition: color var(--transition-fast);
            position: relative;
          }
          .navbar__link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--color-accent);
            transition: width var(--transition-base);
          }
          .navbar__link:hover,
          .navbar__link--active {
            color: var(--color-text-primary);
          }
          .navbar__link--active::after,
          .navbar__link:hover::after {
            width: 100%;
          }
          .navbar__avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--color-accent), #9A0C22);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-heading);
            font-size: var(--fs-md);
            font-weight: var(--fw-bold);
            color: #fff;
            text-transform: uppercase;
            transition: all 0.3s ease;
          }
          .navbar__avatar:hover {
             transform: scale(1.1);
             box-shadow: 0 0 15px var(--color-accent);
          }
        `}</style>
      </nav>
    </>
  )
}
