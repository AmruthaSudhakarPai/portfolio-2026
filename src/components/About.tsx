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
      <section id="about" className="about-section" ref={sectionRef}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="section-label">Get to know me</span>
            <h2 className="section-title">About <span>Me</span></h2>
          </div>

          <div className={`about-grid fade-in-up ${inView ? 'visible' : ''}`}>
            <div className="about-text">
              <p>
                I&apos;m a dedicated <strong>Full Stack Developer</strong> with 13+ years of professional experience crafting robust, scalable web applications. I specialize in building responsive, user-centric interfaces using modern technologies.
              </p>
              <p>
                  Throughout my career at <strong>Walmart, Sam&apos;s Club</strong> and <strong>AT&T</strong>, I&apos;ve developed deep expertise in full-stack development, micro-frontend architecture, cross-browser compatibility, and agile methodologies.
              </p>
              <p>
                I&apos;m passionate about clean code, performance optimization, and delivering digital experiences that make a real impact.
              </p>

              <div className="stats-row">
                <div className="stat-card">
                  <span className="stat-number"><Counter target={13} suffix="+" /></span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number"><Counter target={7} /></span>
                  <span className="stat-label">Companies</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number"><Counter target={10} suffix="+" /></span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-card">
                <div className="card-title">Professional Background</div>
                <ul className="check-list">
                  {[
                    '13+ years in full stack web development',
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
