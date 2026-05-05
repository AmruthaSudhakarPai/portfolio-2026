'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">AP</span>
            <p className="footer-tagline">
              Full Stack Developer crafting scalable, high-performance web applications. Based in Texas.
            </p>
          </div>

          <div>
            <div className="footer-heading">Navigation</div>
            <ul className="footer-links">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-heading">Tech</div>
            <ul className="footer-links">
              {['React JS', 'TypeScript', 'Next.js', 'Node.js', 'MongoDB'].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-heading">Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                {
                  label: 'GitHub',
                  href: '#',
                  icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                },
                {
                  label: 'LinkedIn',
                  href: '#',
                  icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                },
                {
                  label: 'samrutha.developer@gmail.com',
                  href: 'mailto:samrutha.developer@gmail.com',
                  icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} className="footer-social-link" style={{ textDecoration: 'none' }}>
                  <div className="social-icon-wrap">{icon}</div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.83rem', color: 'rgba(148, 163, 184, 0.6)' }}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} <span>Amrutha Pai</span>. All rights reserved.
          </p>
          <div className="footer-status">
            <span className="status-dot" />
            Open to new opportunities
          </div>
        </div>
      </footer>
    </>
  )
}
