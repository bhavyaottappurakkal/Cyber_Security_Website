import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const SECTION_IDS = [
  'home',
  'news',
  'feature',
  'faculty',
  'academics',
]

const MEGA_MENUS = {
  about: {
    title: 'About',
    targetId: 'feature',
    links: [
      { label: 'About Us', targetId: 'home' },
      { label: 'Leadership', targetId: 'faculty' },
      { label: 'Vision, Mission & Values', targetId: 'feature' },
      { label: 'Traditions', targetId: 'feature' },
      { label: 'Rankings & Awards', targetId: 'news' },
      { label: 'Campus', targetId: 'home' },
      { label: 'Global Locations', targetId: 'academics' },
    ],
    featured: {
      image: '/sample_hero_img.jpg',
      heading: 'Campus & Vision',
      lead: 'Meet our boldest initiative yet: reimagining interdisciplinary learning.',
      body: 'Designed to bring together researchers, students, and industry partners in collaborative spaces.',
      note: 'Conceptual overview. Explore our latest milestones and strategic roadmap.',
      targetId: 'feature',
    },
  },
  academics: {
    title: 'Academics',
    targetId: 'academics',
    links: [
      { label: 'Undergraduate Programs', targetId: 'academics' },
      { label: 'Master’s Degrees', targetId: 'academics' },
      { label: 'Doctoral & Ph.D.', targetId: 'academics' },
      { label: 'Online Programs', targetId: 'academics' },
      { label: 'Faculty & Mentors', targetId: 'faculty' },
      { label: 'Academic Events', targetId: 'news' },
    ],
    featured: {
      image: '/hero-students.jpg',
      heading: 'Interdisciplinary Degrees',
      lead: 'Rigorous academic programs built for emerging global challenges.',
      body: 'Combining foundational theory with hands-on research laboratories and mentorship.',
      note: 'Open for upcoming academic sessions across all degree levels.',
      targetId: 'academics',
    },
  },
  faculty: {
    title: 'Faculty',
    targetId: 'faculty',
    links: [
      { label: 'Faculty Leaders', targetId: 'faculty' },
      { label: 'Research Metrics', targetId: 'faculty' },
      { label: 'Academic Council', targetId: 'faculty' },
      { label: 'Upcoming Lectures', targetId: 'news' },
    ],
    featured: {
      image: '/hero-students.jpg',
      heading: 'Leaders in Their Fields',
      lead: '1,400+ faculty & researchers driving discovery across 20+ centers.',
      body: 'Empowering students and scholars to tackle defining global challenges.',
      note: 'Discover faculty profiles and research impact.',
      targetId: 'faculty',
    },
  },
  'news-events': {
    title: 'News & Events',
    targetId: 'news',
    links: [
      { label: 'Featured News', targetId: 'news' },
      { label: 'Rankings & Impact', targetId: 'news' },
      { label: 'Upcoming Events', targetId: 'events' },
      { label: 'Annual Symposium', targetId: 'events' },
      { label: 'Distinguished Lectures', targetId: 'events' },
      { label: 'Admissions Sessions', targetId: 'events' },
    ],
    featured: {
      image: '/sample_headline.jpg',
      heading: 'News & Events',
      lead: 'Stay updated with featured stories, symposiums, and campus events.',
      body: 'Highlighting collaborative research breakthroughs, lectures, and upcoming gatherings.',
      note: 'Read the latest announcements and view upcoming event dates.',
      targetId: 'news',
    },
  },
}

const NAV_ITEMS = [
  { key: 'home', label: 'Home', targetId: 'home' },
  { key: 'about', label: 'About', targetId: 'feature', hasMega: true },
  { key: 'academics', label: 'Academics', targetId: 'academics', hasMega: true },
  { key: 'faculty', label: 'Faculty', targetId: 'faculty', hasMega: true },
  { key: 'news-events', label: 'News & Events', targetId: 'news', hasMega: true },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    const onClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setActiveSection(id)
    setOpenMenu(null)

    if (location.pathname !== '/') {
      navigate(id === 'home' ? '/' : `/#${id}`)
      return
    }

    window.history.replaceState(null, '', id === 'home' ? '/' : `#${id}`)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.dispatchEvent(new CustomEvent('section-navigate', { detail: { id } }))
  }

  const activeMega = openMenu ? MEGA_MENUS[openMenu] : null

  return (
    <header
      ref={headerRef}
      className={`site-header cmu-header ${isScrolled ? 'header-scrolled' : ''}`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="cmu-header-bar">
        <div className="container cmu-header-inner">
          {/* Left Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="cmu-wordmark-logo"
            aria-label="Amrita Center for Cybersecurity Systems and Networks home"
          >
            <img
              src="/amrita-cyber-logo.jpg"
              alt="Amrita Center for Cybersecurity Systems and Networks"
              className="cmu-header-logo"
            />
          </a>

          {/* Right Navigation Links + Search Button */}
          <div className="cmu-header-right">
            <nav className="desktop-nav" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const isOpen = openMenu === item.key
                const isActive =
                  isOpen || (!openMenu && activeSection === item.targetId)
                return (
                  <a
                    key={item.key}
                    href={`#${item.targetId}`}
                    onMouseEnter={() => setOpenMenu(item.hasMega ? item.key : null)}
                    onClick={(e) => {
                      if (item.hasMega) {
                        e.preventDefault()
                        setOpenMenu(isOpen ? null : item.key)
                      } else {
                        handleNavClick(e, item.targetId)
                      }
                    }}
                    className={`desk-link ${isActive ? 'active' : ''} ${isOpen ? 'is-open' : ''}`}
                    aria-expanded={item.hasMega ? isOpen : undefined}
                  >
                    <span>{item.label}</span>
                    {item.hasMega && (
                      <span className="desk-caret" aria-hidden="true">
                        {isOpen ? '▴' : '▾'}
                      </span>
                    )}
                  </a>
                )
              })}
            </nav>

            <button
              type="button"
              className="cmu-search-btn"
              onClick={(e) => handleNavClick(e, 'news')}
              aria-label="Search or jump to news"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Seamless Dark Full-Width Mega Menu */}
      {activeMega && (
        <div className="cmu-megamenu" role="region" aria-label={`${activeMega.title} menu`}>
          <div className="container cmu-megamenu-inner">
            <div className="cmu-mega-left">
              <h3 className="cmu-mega-title">{activeMega.title}</h3>
              <div className="cmu-mega-links">
                {activeMega.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link.targetId}`}
                    onClick={(e) => handleNavClick(e, link.targetId)}
                    className="cmu-mega-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`#${activeMega.featured.targetId}`}
              onClick={(e) => handleNavClick(e, activeMega.featured.targetId)}
              className="cmu-mega-featured"
            >
              <div className="cmu-mega-feat-img">
                <img src={activeMega.featured.image} alt={activeMega.featured.heading} />
              </div>
              <div className="cmu-mega-feat-body">
                <h4 className="cmu-mega-feat-heading">{activeMega.featured.heading}</h4>
                <p className="cmu-mega-feat-lead">{activeMega.featured.lead}</p>
                <p className="cmu-mega-feat-text">{activeMega.featured.body}</p>
                <p className="cmu-mega-feat-note">{activeMega.featured.note}</p>
              </div>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
