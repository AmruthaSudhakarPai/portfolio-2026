'use client'

import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: '◈',
    color: '#818cf8',
    glow: 'rgba(99, 102, 241, 0.2)',
    items: ['React JS', 'TypeScript', 'Next.js', 'Redux', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'SASS/LESS', 'jQuery', 'AJAX', 'Angular 2/4', 'Bootstrap'],
  },
  {
    title: 'Backend',
    icon: '⬡',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.2)',
    items: ['Node.js', 'Express.js', 'REST API', 'Mongoose', 'Core Java', 'SOA', 'Multi-threaded Programming'],
  },
  {
    title: 'Database',
    icon: '◉',
    color: '#6ee7b7',
    glow: 'rgba(110, 231, 183, 0.2)',
    items: ['MongoDB', 'MariaDB', 'Oracle', 'SQL', 'Firebase'],
  },
  {
    title: 'Tools & Platforms',
    icon: '⬟',
    color: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.2)',
    items: ['Git', 'GitHub', 'JIRA', 'NPM', 'NX', 'Webpack', 'Figma', 'Invision', 'VSCode', 'WebStorm'],
  },
  {
    title: 'Methodologies',
    icon: '◇',
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.2)',
    items: ['Agile', 'Kanban', 'SDLC', 'MVC Design Patterns', 'Cross-browser Compatibility', 'Module Federation'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>)

  return (
    <>
      <section id="skills" className="skills-section" ref={sectionRef}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#818cf8', display: 'block', marginBottom: '0.75rem' }}>
              What I work with
            </span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '3.5rem' }}>
              Skills &{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Expertise
              </span>
            </h2>
          </div>

          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={cat.title}
                className={`skill-card fade-up ${inView ? 'show' : ''}`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  borderColor: inView ? `${cat.color}25` : undefined,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}50`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${cat.glow}`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}25`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="skill-card-header"
                  style={{ '--card-color': cat.color } as React.CSSProperties}
                >
                  <div
                    className="skill-icon"
                    style={{ background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}30` }}
                  >
                    {cat.icon}
                  </div>
                  <span className="skill-card-title">{cat.title}</span>
                </div>
                <div className="tags-wrap">
                  {cat.items.map(skill => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        background: `${cat.color}0d`,
                        color: cat.color,
                        borderColor: `${cat.color}30`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
