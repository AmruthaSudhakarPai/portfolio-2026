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
  const [focused, setFocused] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef as React.RefObject<Element>)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      }
    } catch (error) {
      console.error('Error submitting form:', error)
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-section {
          padding: 7rem 1.5rem;
          background: radial-gradient(ellipse at 50% 80%, rgba(99, 102, 241, 0.07) 0%, transparent 60%), #050816;
          position: relative;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(110, 231, 183, 0.3), transparent);
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3.5rem;
          max-width: 1000px;
          margin: 0 auto;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        .contact-info-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #e2e8f0;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .contact-info-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: rgba(148, 163, 184, 0.7);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-bottom: 1rem;
        }
        .contact-item-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-item-icon svg {
          width: 16px;
          height: 16px;
          stroke: #818cf8;
        }
        .contact-item-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(148, 163, 184, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.1rem;
        }
        .contact-item-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #cbd5e1;
        }
        .glass-form {
          background: rgba(15, 18, 40, 0.7);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 20px;
          padding: 2.25rem;
          backdrop-filter: blur(15px);
          position: relative;
          overflow: hidden;
        }
        .glass-form::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.5), transparent);
        }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(148, 163, 184, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          color: white;
          padding: 0.875rem;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 0.5rem;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }
        .submit-btn:active { transform: scale(0.99); }
        .success-msg {
          background: rgba(110, 231, 183, 0.08);
          border: 1px solid rgba(110, 231, 183, 0.25);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #6ee7b7;
          text-align: center;
          margin-top: 1rem;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .placeholder-style::placeholder { color: rgba(100, 116, 139, 0.6); }
      `}</style>

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
                  <div className="contact-item-value">amrutha.pai@example.com</div>
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
                  <div className="contact-item-value">Collin County, Texas</div>
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
                  <div className="contact-item-value">linkedin.com/in/amrutha-pai</div>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
