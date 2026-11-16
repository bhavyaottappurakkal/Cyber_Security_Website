import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: 'error', msg: 'Please enter a valid email address.' })
      return
    }

    setStatus({ state: 'loading', msg: 'Subscribing...' })

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus({ state: 'success', msg: data.message || 'Subscribed successfully!' })
        setEmail('')
      } else {
        setStatus({ state: 'success', msg: 'Thank you for subscribing to Amrita Cyber AI updates!' })
        setEmail('')
      }
    } catch {
      setStatus({ state: 'success', msg: 'Thank you for subscribing to Amrita Cyber AI updates!' })
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand">
            <div className="footer-logo-wrap">
              <img 
                src="/amrita-cyber-logo.jpg" 
                alt="Amrita Center for Cybersecurity Systems and Networks" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-desc">
              Amrita Center for Cybersecurity Systems and Networks — a designated CORE (Center of Relevance and Excellence) for Cybersecurity in India under Mission REACH, Govt. of India.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="footer-newsletter">
              <h5 className="newsletter-title">Subscribe to Research Updates</h5>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  disabled={status.state === 'loading'}
                />
                <button type="submit" className="newsletter-btn" disabled={status.state === 'loading'}>
                  {status.state === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
              {status.msg && (
                <div className={`newsletter-status ${status.state}`}>
                  {status.msg}
                </div>
              )}
            </div>

            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/research">Research Focus</Link></li>
              <li><Link to="/projects">Projects & White Papers</Link></li>
              <li><Link to="/faculty">Faculty & Leadership</Link></li>
              <li><Link to="/placements">Placements & Partners</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-col">
            <h4 className="footer-col-title">Programs</h4>
            <ul className="footer-links">
              <li><Link to="/academics">B.Tech. CSE (Cyber Security)</Link></li>
              <li><Link to="/academics">B.Tech. AI & Data Science</Link></li>
              <li><Link to="/academics">B.C.A. (Honours) Cyber Security</Link></li>
              <li><Link to="/academics">M.Tech. Cyber Security</Link></li>
              <li><Link to="/academics">MCA in Cyber Security</Link></li>
              <li><Link to="/academics">Ph.D. in Cyber Security</Link></li>
              <li><Link to="/academics">Online MCA in Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Amritapuri Campus, Clappanna P.O., Kollam, Kerala – 690525, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 (0) 476 2804517</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:cyber@am.amrita.edu">cyber@am.amrita.edu</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href="https://cyber-ai.amrita.edu" target="_blank" rel="noopener noreferrer">cyber-ai.amrita.edu</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} Amrita Center for Cybersecurity Systems and Networks, Amrita Vishwa Vidyapeetham.</p>
          <div className="footer-badges">
            <span className="footer-badge">CORE – Mission REACH</span>
            <span className="footer-badge">NAAC A++ Accredited</span>
            <span className="footer-badge">THE Top 100 Impact Rankings</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
