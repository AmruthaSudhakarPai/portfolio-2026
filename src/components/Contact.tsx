'use client'

import { useState, useRef, useEffect } from 'react'

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
        return
      }

      const body = await response.json().catch(() => ({}))
      setError(body.error || 'Failed to send message. Please try again later.')
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Unable to send message. Please check your network and try again.')
    }
  }

  const inputStyle = (name: string) => ({
    width: '100%',
    background: focused === name ? 'rgba(99, 102, 241, 0.06)' : 'rgba(15, 18, 40, 0.6)',
    border: `1px solid ${focused === name ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.15)'}`,
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#e2e8f0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
    display: 'block',
  })

  return (
    <>
      <section id="contact" className="contact-section" ref={sectionRef}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#818cf8', display: 'block', marginBottom: '0.75rem' }}>
              Let&apos;s connect
            </span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '3.5rem' }}>
              Get In{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Touch
              </span>
            </h2>
          </div>

          <div className={`contact-layout fade-up ${inView ? 'show' : ''}`}>
            <div>
              <div className="contact-info-title">Have a project in mind?</div>
              <p className="contact-info-desc">
                I&apos;m always open to discussing new opportunities, interesting projects, or just to have a chat. Feel free to reach out!
              </p>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <a href="mailto:samrutha.developer@gmail.com" className="contact-item-value" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>samrutha.developer@gmail.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <a href="tel:+19136539225" className="contact-item-value" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>+1 (913) 653-9225</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <div className="contact-item-value">Mckinney, Texas</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/amrutha-p-864b0491/" target="_blank" rel="noopener noreferrer" className="contact-item-value" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>Amrutha Pai</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-label">GitHub</div>
                  <a href="https://github.com/AmruthaSudhakarPai" target="_blank" rel="noopener noreferrer" className="contact-item-value" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>AmruthaSudhakarPai</a>
                </div>
              </div>
            </div>

            <div className="glass-form">
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                    className="placeholder-style"
                    style={inputStyle('name')}
                    placeholder="Your name"
                  />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    className="placeholder-style"
                    style={inputStyle('email')}
                    placeholder="your@email.com"
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    className="placeholder-style"
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Send Message →
                </button>
                {submitted && (
                  <div className="success-msg">
                    ✓ Message sent! I&apos;ll get back to you soon.
                  </div>
                )}
                {error && (
                  <div className="success-msg" style={{ background: 'rgba(248, 113, 113, 0.08)', borderColor: 'rgba(248, 113, 113, 0.25)', color: '#fca5a5' }}>
                    ⚠ {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
