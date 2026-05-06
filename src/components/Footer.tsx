'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="footer">
          <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} <span>Amrutha Pai</span> · Full stack Developer · <a href="https://www.linkedin.com/in/amrutha-p-864b0491/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>LinkedIn</a> · <a href="https://github.com/AmruthaSudhakarPai" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Github</a>.
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
