'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .footer {
          background: #030612;
          border-top: 1px solid rgba(99, 102, 241, 0.12);
          padding: 4rem 1.5rem 2rem;
          position: relative;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), rgba(56, 189, 248, 0.4), transparent);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto 3rem;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(135deg, #818cf8 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
          display: block;
        }
        .footer-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.55);
          line-height: 1.7;
          max-width: 240px;
        }
        .footer-heading {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 1.25rem;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .footer-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.6);
          text-decoration: none;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
        }
        .footer-links a:hover { color: #818cf8; }
        .footer-social-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .social-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .social-icon-wrap:hover {
          background: rgba(99, 102, 241, 0.18);
          border-color: rgba(99, 102, 241, 0.4);
        }
        .social-icon-wrap svg {
          width: 14px;
          height: 14px;
          stroke: #818cf8;
        }
        .footer-bottom {
          max-width: 1100px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(99, 102, 241, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(148, 163, 184, 0.4);
        }
        .footer-copy span {
          color: #818cf8;
        }
        .footer-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(110, 231, 183, 0.7);
        }
        .status-dot {
          width: 6px;
          height: 6px;
          background: #6ee7b7;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

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
