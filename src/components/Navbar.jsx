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
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo" id="nav-logo">
          <Dumbbell size={28} className="navbar__logo-icon" />
          <span>S4 <span className="text-accent">FITNESS</span></span>
        </Link>

        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar__links-cta">
            {user ? (
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="navbar__avatar" id="nav-avatar-mobile">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Link>
            ) : (
              <>
                <Link href="/login" className="navbar__link" id="nav-login">Login</Link>
                <Link href="/membership" className="btn btn--primary btn--small" id="nav-join">Join Now</Link>
              </>
            )}
          </div>
        </div>

        <div className="navbar__actions">
          {user ? (
            <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} className="navbar__avatar" id="nav-avatar" title={user.name}>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </Link>
          ) : (
            <>
              <Link href="/login" className="navbar__link navbar__login-desktop" id="nav-login-desktop">Login</Link>
              <Link href="/membership" className="btn btn--primary btn--small navbar__cta-desktop" id="nav-join-desktop">
                Join Now
              </Link>
            </>
          )}
          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
          z-index: var(--z-sticky);
          transition: all var(--transition-base);
          background: transparent;
        }
        .navbar--scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
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
          z-index: var(--z-modal);
        }
        .navbar__logo-icon {
          color: var(--color-accent);
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
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
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .navbar__toggle {
          display: none;
          z-index: var(--z-modal);
          color: var(--color-text-primary);
        }
        .navbar__links-cta {
          display: none;
        }

        @media (max-width: 1024px) {
          .navbar__links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            gap: var(--space-xl);
            transform: translateX(100%);
            transition: transform var(--transition-slow);
            z-index: var(--z-overlay);
          }
          .navbar__links--open {
            transform: translateX(0);
          }
          .navbar__link {
            font-size: var(--fs-xl);
            font-family: var(--font-heading);
          }
          .navbar__toggle {
            display: block;
          }
          .navbar__login-desktop,
          .navbar__cta-desktop {
            display: none;
          }
          .navbar__links-cta {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-md);
            margin-top: var(--space-lg);
          }
          .navbar__avatar {
            width: 44px;
            height: 44px;
          }
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
          transition: all var(--transition-base);
          border: 2px solid transparent;
          z-index: var(--z-modal);
        }
        .navbar__avatar:hover {
          border-color: var(--color-accent);
          box-shadow: 0 0 16px rgba(200, 16, 46,0.4);
          transform: scale(1.1);
        }
      `}</style>
    </nav>
  )
}
