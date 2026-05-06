'use client'

import { useEffect, useRef, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast',
  'AI Prompt Specialist',
  'AI Developer'
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
      <section id="home" className="hero-section">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Open for new opportunities
          </div>

          <h1 className="hero-name">
            Hi, I&apos;m <span className="hero-name-accent">Amrutha Pai</span>
          </h1>

          <div className="hero-role-wrapper">
            <span>{displayedRole}</span>
            <span className="hero-cursor" />
          </div>

          <p className="hero-desc">
            Crafting seamless, high-performance web experiences with React, Typescript, Node.js, and modern technologies. 13+ years building at Walmart & AT&T.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </button>
            <a className="btn-outline" href="/Amrutha_Pai_Resume.docx" download>
              Download Resume
            </a>
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
