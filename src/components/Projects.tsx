'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

const projects = [
  {
    title: 'MERN Employee Task Management',
    description: 'Full-stack application using Express.js, React, Node.js, and MongoDB for managing employee tasks with custom components, role-based access, and REST API integration.',
    tech: ['React JS', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Mongoose'],
    accent: '#818cf8',
    glow: 'rgba(99, 102, 241, 0.25)',
    number: '01',
  },
  {
    title: 'Responsive Web Applications',
    description: 'Built responsive applications optimized for both mobile and desktop with cross-browser compatibility, utilizing modern build tools and component architecture.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Webpack', 'React JS'],
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    number: '02',
  },
  {
    title: 'Dynamic Client-Side UI',
    description: 'Designed and implemented dynamic client-side JavaScript interfaces with form validation, seamless navigation, AJAX data fetching, and real-time user interactions.',
    tech: ['JavaScript', 'HTML5/CSS3', 'AJAX', 'jQuery', 'JSON', 'Webpack'],
    accent: '#6ee7b7',
    glow: 'rgba(110, 231, 183, 0.25)',
    number: '03',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>)

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = (y - cy) / cy * -6
    const ry = (x - cx) / cx * 6
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }

  const handleTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <>
      <section id="projects" className="projects-section" ref={sectionRef}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#818cf8', display: 'block', marginBottom: '0.75rem' }}>
              What I&apos;ve built
            </span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '3.5rem' }}>
              Featured{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Projects
              </span>
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className={`project-card fade-up ${inView ? 'show' : ''}`}
                style={{
                  transitionDelay: `${i * 0.12}s`,
                  '--accent': project.accent,
                  border: `1px solid ${project.accent}15`,
                } as React.CSSProperties}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltReset}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${project.glow}`
                }}
              >
                <div className="project-card-border" />
                <div className="project-card-inner">
                  <span className="project-number">{project.number}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="project-tag"
                        style={{ background: `${project.accent}0d`, color: project.accent, borderColor: `${project.accent}25` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-divider" style={{ background: project.accent }} />
                  <a href="#" className="project-link" style={{ color: project.accent }}>
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 7h10M7 2l5 5-5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
