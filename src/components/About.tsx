'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref as React.RefObject<Element>)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 40)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          padding: 7rem 1.5rem;
          background: radial-gradient(ellipse at 80% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 60%), #050816;
          position: relative;
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
        }
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #818cf8;
          margin-bottom: 0.75rem;
          display: block;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 3.5rem;
        }
        .section-title span {
          background: linear-gradient(135deg, #818cf8, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; }
        }
        .about-text p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: rgba(148, 163, 184, 0.8);
          line-height: 1.9;
          margin-bottom: 1.25rem;
        }
        .about-text p strong {
          color: #e2e8f0;
          font-weight: 500;
        }
        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }
        .stat-card {
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 12px;
          padding: 1.25rem 1rem;
          text-align: center;
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-3px);
        }
        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #818cf8, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(148, 163, 184, 0.6);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: 0.25rem;
          display: block;
        }
        .glass-card {
          background: rgba(15, 18, 40, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.5), transparent);
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #818cf8;
          margin-bottom: 1.25rem;
          letter-spacing: 0.02em;
        }
        .check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .check-list li {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: rgba(203, 213, 225, 0.8);
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          line-height: 1.5;
        }
        .check-icon {
          width: 18px;
          height: 18px;
          min-width: 18px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .check-icon svg {
          width: 10px;
          height: 10px;
          stroke: #818cf8;
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="section-label">Get to know me</span>
            <h2 className="section-title">About <span>Me</span></h2>
          </div>

          <div className={`about-grid fade-in-up ${inView ? 'visible' : ''}`}>
            <div className="about-text">
              <p>
                I&apos;m a dedicated <strong>Full Stack Developer</strong> with 5+ years of professional experience crafting robust, scalable web applications. I specialize in building responsive, user-centric interfaces using modern technologies.
              </p>
              <p>
                  Throughout my career at <strong>Walmart, Sam&apos;s Club</strong> and <strong>AT&T</strong>, I&apos;ve developed deep expertise in full-stack development, micro-frontend architecture, cross-browser compatibility, and agile methodologies.
              </p>
              <p>
                I&apos;m passionate about clean code, performance optimization, and delivering digital experiences that make a real impact.
              </p>

              <div className="stats-row">
                <div className="stat-card">
                  <span className="stat-number"><Counter target={5} suffix="+" /></span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number"><Counter target={3} /></span>
                  <span className="stat-label">Companies</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number"><Counter target={20} suffix="+" /></span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-card">
                <div className="card-title">Professional Background</div>
                <ul className="check-list">
                  {[
                    '5+ years in full stack web development',
                    'Experience at Walmart, Sam\'s Club and AT&T',
                    'React, TypeScript, Next.js, Node.js specialist',
                    'Micro-frontend architecture with Module Federation',
                    'Agile, Kanban & SDLC methodologies',
                    'Cross-browser compatibility & performance tuning',
                  ].map((item) => (
                    <li key={item}>
                      <span className="check-icon">
                        <svg viewBox="0 0 10 10" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 5l2 2 4-4" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
