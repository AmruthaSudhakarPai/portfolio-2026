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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .skills-section {
          padding: 7rem 1.5rem;
          background: radial-gradient(ellipse at 10% 60%, rgba(99, 102, 241, 0.06) 0%, transparent 55%), #050816;
          position: relative;
        }
        .skills-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .skill-card {
          background: rgba(15, 18, 40, 0.7);
          border: 1px solid rgba(99, 102, 241, 0.12);
          border-radius: 16px;
          padding: 1.75rem;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
        }
        .skill-card:hover {
          transform: translateY(-4px);
        }
        .skill-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .skill-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
        }
        .skill-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #e2e8f0;
          letter-spacing: 0.02em;
        }
        .tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skill-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          padding: 0.3rem 0.75rem;
          border-radius: 6px;
          border: 1px solid;
          transition: transform 0.2s, opacity 0.2s;
          cursor: default;
          letter-spacing: 0.01em;
        }
        .skill-tag:hover {
          transform: scale(1.05);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }
      `}</style>

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
