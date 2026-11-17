import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Research', path: '/research' },
  { label: 'Projects & White Papers', path: '/projects' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Placements & Partners', path: '/placements' },
  { label: 'Distinguished Speakers', path: '/speakers' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="main-navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" aria-label="Amrita Center for Cybersecurity Systems and Networks home">
            <img
              src="/amrita-cyber-logo.jpg"
              alt="Amrita Center for Cybersecurity Systems and Networks"
              className="navbar-cyber-logo"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/about" className={`desk-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to="/academics" className={`desk-link ${location.pathname === '/academics' ? 'active' : ''}`}>Academics</Link>
            <Link to="/research" className={`desk-link ${location.pathname === '/research' ? 'active' : ''}`}>Research</Link>
            <Link to="/projects" className={`desk-link ${location.pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
            <Link to="/faculty" className={`desk-link ${location.pathname === '/faculty' ? 'active' : ''}`}>Faculty</Link>
            <Link to="/placements" className={`desk-link ${location.pathname === '/placements' ? 'active' : ''}`}>Placements</Link>
          </nav>

          <div className="navbar-end">
            <span className="navbar-divider" aria-hidden="true"></span>
            <img
              src="/amrita-university-logo.jpeg"
              alt="Amrita Vishwa Vidyapeetham"
              className="navbar-university-logo"
            />
            <button 
              className={`menu-toggle-btn ${drawerOpen ? 'open' : ''}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={drawerOpen}
            >
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Full Navigation Drawer Overlay ── */}
      <div className={`nav-drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <img src="/amrita-university-logo.jpeg" alt="Logo" className="drawer-logo" />
            <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              ✕
            </button>
          </div>

          <div className="drawer-content">
            <div className="drawer-section-title">Navigation Directory</div>
            <nav className="drawer-nav-list">
              {navItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`drawer-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="drawer-num">0{idx + 1}</span>
                  <span className="drawer-label">{item.label}</span>
                  <span className="drawer-arrow">→</span>
                </Link>
              ))}
            </nav>

            <div className="drawer-footer-info">
              <div className="df-item">
                <span className="df-label">Address</span>
                <span className="df-val">Amritapuri Campus, Clappanna P.O., Kollam, Kerala 690525</span>
              </div>
              <div className="df-item">
                <span className="df-label">Direct Contact</span>
                <span className="df-val">+91 (0) 476 2804517 · cyber@am.amrita.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
