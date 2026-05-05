'use client'

import { useEffect, useRef, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [displayedRole, setDisplayedRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = deleting ? 50 : 100
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayedRole(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIndex(c => c + 1)
        }
      } else {
        setDisplayedRole(current.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setCharIndex(0)
          setRoleIndex(r => (r + 1) % ROLES.length)
        } else {
          setCharIndex(c => c - 1)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(129, 140, 248, ${p.a})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
                      #050816;
          overflow: hidden;
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 1.5rem;
          max-width: 900px;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 100px;
          padding: 0.375rem 1rem;
          font-size: 0.8rem;
          color: #818cf8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 1.75rem;
          animation: fadeInDown 0.6s ease forwards;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          background: #818cf8;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: #f1f5f9;
          margin-bottom: 0.75rem;
          animation: fadeInUp 0.7s ease 0.1s both;
        }
        .hero-name-accent {
          background: linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #6ee7b7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-role-wrapper {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.125rem, 3vw, 1.5rem);
          font-weight: 300;
          color: rgba(148, 163, 184, 0.9);
          margin-bottom: 1.5rem;
          height: 2.2rem;
          animation: fadeInUp 0.7s ease 0.2s both;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #818cf8;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.8s step-end infinite;
        }
        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: rgba(148, 163, 184, 0.65);
          max-width: 540px;
          margin: 0 auto 2.5rem;
          line-height: 1.75;
          animation: fadeInUp 0.7s ease 0.3s both;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.7s ease 0.4s both;
        }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
        }
        .btn-outline {
          background: transparent;
          color: #818cf8;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          border: 1px solid rgba(99, 102, 241, 0.5);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: #818cf8;
          transform: translateY(-2px);
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(148, 163, 184, 0.4);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          animation: fadeIn 1s ease 1s both;
        }
        .scroll-mouse {
          width: 20px;
          height: 32px;
          border: 1.5px solid rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }
        .scroll-wheel {
          width: 3px;
          height: 6px;
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
          animation: scrollAnim 2s ease-in-out infinite;
        }
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollAnim {
          0% { opacity: 1; transform: translateY(0); }
          80% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(10px); }
        }
      `}</style>

      <section id="home" className="hero-section">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open for new opportunities
          </div>

          <h1 className="hero-name">
            Hi, I&apos;m <br />
            <span className="hero-name-accent">Amrutha Pai</span>
          </h1>

          <div className="hero-role-wrapper">
            <span>{displayedRole}</span>
            <span className="hero-cursor" />
          </div>

          <p className="hero-desc">
            Crafting seamless, high-performance web experiences with React, Node.js, and modern technologies. 5+ years building at Walmart & AT&T.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Download Resume
            </button>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          Scroll
        </div>
      </section>
    </>
  )
}
