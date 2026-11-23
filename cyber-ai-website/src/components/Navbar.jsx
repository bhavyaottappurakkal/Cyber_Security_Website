import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resolveMediaUrl } from '../utils/mediaStore'
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
    title: 'Who We Are',
    targetId: 'feature',
    links: [
      { label: 'About Us', targetId: 'home' },
      { label: 'Leadership', targetId: 'faculty' },
      { label: 'Vision, Mission & Values', targetId: 'feature' },
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
      { label: 'Undergraduate Programs', url: '/academics', targetId: 'academics' },
      { label: 'Online Programme', url: '/academics/online-mca', targetId: 'academics' },
      { label: 'Post Graduate Programme', url: '/academics/postgraduate', targetId: 'academics' },
      { label: 'PhD Programme', url: '/academics/phd', targetId: 'academics' },
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
    title: 'Our Team',
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
  { key: 'about', label: 'Who We Are', targetId: 'feature', hasMega: true },
  { key: 'academics', label: 'Academics', targetId: 'academics', hasMega: true },
  { key: 'faculty', label: 'Our Team', targetId: 'faculty', hasMega: true },
  { key: 'news-events', label: 'News & Events', targetId: 'news', hasMega: true },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [openMenu, setOpenMenu] = useState(null)
  const [spotSlide, setSpotSlide] = useState(0)
  const [resolvedMediaSrc, setResolvedMediaSrc] = useState('')
  const [cmsAcademics, setCmsAcademics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('adminSiteData') || 'null')
      return saved?.academicsContent || null
    } catch {
      return null
    }
  })
  const headerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const syncCms = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('adminSiteData') || 'null')
        setCmsAcademics(saved?.academicsContent || null)
      } catch {
        setCmsAcademics(null)
      }
    }
    window.addEventListener('adminSiteDataUpdated', syncCms)
    window.addEventListener('storage', syncCms)
    return () => {
      window.removeEventListener('adminSiteDataUpdated', syncCms)
      window.removeEventListener('storage', syncCms)
    }
  }, [])

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
    if (location.pathname !== '/') {
      if (location.pathname.startsWith('/academics')) {
        setActiveSection('academics')
      } else if (location.pathname === '/about') {
        setActiveSection('feature')
      } else if (location.pathname === '/faculty') {
        setActiveSection('faculty')
      } else if (location.pathname === '/news-events') {
        setActiveSection('news')
      } else {
        setActiveSection('')
      }
      return
    }

    if (location.hash) {
      setActiveSection(location.hash.slice(1))
    } else {
      setActiveSection('home')
    }

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
  }, [location.pathname, location.hash])

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

  const activeMega = openMenu
    ? openMenu === 'academics' && cmsAcademics
      ? {
          ...MEGA_MENUS.academics,
          links: cmsAcademics.menuLinks?.length
            ? cmsAcademics.menuLinks.map((lnk, idx) => {
                if (lnk.url && (lnk.url.startsWith('/') || lnk.url.startsWith('http'))) return lnk
                const lower = (lnk.label || '').toLowerCase()
                if (lower.includes('online')) return { ...lnk, url: '/academics/online-mca' }
                if (lower.includes('post') || lower.includes('master')) return { ...lnk, url: '/academics/postgraduate' }
                if (lower.includes('phd') || lower.includes('doctor')) return { ...lnk, url: '/academics/phd' }
                if (lower.includes('undergrad') || lower.includes('under grad')) return { ...lnk, url: '/academics' }
                return { ...lnk, url: `/academics/program/${lnk.id ?? idx}` }
              })
            : MEGA_MENUS.academics.links,
          featured: {
            ...MEGA_MENUS.academics.featured,
            ...(cmsAcademics.featured || {}),
          },
        }
      : MEGA_MENUS[openMenu]
    : null

  const featuredMedia = activeMega?.featured?.mediaItems?.length
    ? activeMega.featured.mediaItems
    : activeMega?.featured?.image
      ? [{ id: 1, type: 'image', src: activeMega.featured.image }]
      : []

  const currentMedia = featuredMedia.length
    ? featuredMedia[spotSlide % featuredMedia.length]
    : null

  useEffect(() => {
    let active = true
    const raw = currentMedia?.src || activeMega?.featured?.image || ''
    if (!raw.startsWith('idb://')) {
      setResolvedMediaSrc(raw)
      return
    }
    resolveMediaUrl(raw).then((url) => {
      if (active) setResolvedMediaSrc(url)
    })
    return () => {
      active = false
    }
  }, [currentMedia?.src, activeMega?.featured?.image])

  useEffect(() => {
    setSpotSlide(0)
  }, [openMenu])

  useEffect(() => {
    if (!activeMega || featuredMedia.length <= 1) return
    if (currentMedia?.type === 'video') return
    const timer = setTimeout(() => {
      setSpotSlide((prev) => (prev + 1) % featuredMedia.length)
    }, 4000)
    return () => clearTimeout(timer)
  }, [activeMega, spotSlide, featuredMedia.length, currentMedia?.type])

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
                    href={link.url || `#${link.targetId || 'academics'}`}
                    onClick={(e) => {
                      if (link.url && link.url.startsWith('/')) {
                        e.preventDefault()
                        setOpenMenu(null)
                        navigate(link.url)
                      } else if (link.url && link.url.startsWith('http')) {
                        setOpenMenu(null)
                      } else {
                        handleNavClick(e, link.targetId || 'academics')
                      }
                    }}
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
                {currentMedia?.type === 'video' ? (
                  <video
                    key={`${resolvedMediaSrc}-${spotSlide}`}
                    src={resolvedMediaSrc}
                    autoPlay
                    muted
                    playsInline
                    loop={featuredMedia.length === 1}
                    onEnded={() => setSpotSlide((prev) => (prev + 1) % featuredMedia.length)}
                    className="cmu-mega-video"
                  />
                ) : (
                  <img
                    src={resolvedMediaSrc || activeMega.featured.image}
                    alt={activeMega.featured.heading}
                  />
                )}
                {featuredMedia.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="cmu-mega-slide-btn cmu-mega-slide-prev"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSpotSlide((prev) => (prev - 1 + featuredMedia.length) % featuredMedia.length)
                      }}
                      aria-label="Previous media"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="cmu-mega-slide-btn cmu-mega-slide-next"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSpotSlide((prev) => (prev + 1) % featuredMedia.length)
                      }}
                      aria-label="Next media"
                    >
                      ›
                    </button>
                    <div className="cmu-mega-slide-dots">
                      {featuredMedia.map((m, idx) => (
                        <span
                          key={m.id || idx}
                          className={`cmu-mega-slide-dot ${spotSlide % featuredMedia.length === idx ? 'is-active' : ''}`}
                        />
                      ))}
                    </div>
                  </>
                )}
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
