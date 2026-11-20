import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            <Link to="/" className={`desk-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/about" className={`desk-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            {/* Academics dropdown */}
            <div className="desk-dropdown">
              <Link to="/academics" className={`desk-link ${location.pathname.startsWith('/academics') ? 'active' : ''}`}>
                Academics <span className="desk-dropdown-caret">▾</span>
              </Link>
              <div className="desk-dropdown-menu">
                <Link to="/academics" className="desk-dropdown-item">Undergraduate (B.Tech)</Link>
                <Link to="/academics/postgraduate" className="desk-dropdown-item">Postgraduate (M.Tech)</Link>
                <Link to="/academics/phd" className="desk-dropdown-item">Doctoral (Ph.D.)</Link>
                <Link to="/academics/online-mca" className="desk-dropdown-item">Online MCA</Link>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </header>
  )
}
