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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .projects-section {
          padding: 7rem 1.5rem;
          background: radial-gradient(ellipse at 90% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 55%), #050816;
          position: relative;
        }
        .projects-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .project-card {
          background: rgba(15, 18, 40, 0.65);
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.3s;
          cursor: default;
        }
        .project-card-border {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, transparent 30%, var(--accent) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .project-card:hover .project-card-border { opacity: 1; }
        .project-card-inner {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-number {
          font-family: 'Syne', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 1rem;
          -webkit-text-stroke: 1px;
          opacity: 0.08;
          color: white;
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
        }
        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 0.875rem;
          line-height: 1.3;
          padding-right: 3rem;
        }
        .project-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: rgba(148, 163, 184, 0.75);
          line-height: 1.75;
          flex: 1;
          margin-bottom: 1.5rem;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }
        .project-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          padding: 0.25rem 0.6rem;
          border-radius: 5px;
          border: 1px solid;
          letter-spacing: 0.02em;
        }
        .project-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: gap 0.2s;
        }
        .project-link:hover { gap: 0.6rem; }
        .project-divider {
          height: 1px;
          margin-bottom: 1.25rem;
          opacity: 0.15;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }
      `}</style>

      <section id="projects" className="projects-section" ref={sectionRef}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#818cf8', display: 'block', marginBottom: '0.75rem' }}>
              What I've built
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
