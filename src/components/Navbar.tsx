'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <style>{`
        .nav-glass {
          background: ${scrolled ? 'rgba(5, 8, 22, 0.85)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: ${scrolled ? '1px solid rgba(99, 102, 241, 0.15)' : 'none'};
          transition: all 0.4s ease;
        }
        .nav-logo-text {
          background: linear-gradient(135deg, #818cf8 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.5px;
        }
        .nav-link {
          color: rgba(203, 213, 225, 0.75);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s;
          padding: 0.25rem 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #818cf8, #38bdf8);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: #e2e8f0;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-menu {
          background: rgba(5, 8, 22, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(99, 102, 241, 0.15);
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: #818cf8;
          border-radius: 2px;
          transition: all 0.3s;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>

      <nav className={`nav-glass fixed w-full top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="nav-logo-text">AP</Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className="hamburger-line" style={{ transform: isOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <span className="hamburger-line" style={{ opacity: isOpen ? 0 : 1 }} />
              <span className="hamburger-line" style={{ transform: isOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu md:hidden py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link block py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
