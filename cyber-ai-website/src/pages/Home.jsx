import { useState, useEffect, useRef } from 'react'
import './Home.css'

const HERO_SLIDES = [
  {
    image: '/hero-students.jpg',
    eyebrow: 'Featured Story',
    title: 'Research That Moves the World Forward',
    desc: 'A template showcase for breakthrough research, interdisciplinary collaboration, and global academic impact.',
    ctaLabel: 'Explore Research',
    ctaTarget: 'news',
  },
  {
    image: '/sample_hero_img.jpg',
    eyebrow: 'Campus & Innovation',
    title: 'A Historic Investment in Education',
    desc: 'Expanding opportunities across science, engineering, humanities, and creative inquiry for future leaders.',
    ctaLabel: 'Learn More',
    ctaTarget: 'feature',
  },
  {
    image: '/sample_headline.jpg',
    eyebrow: 'Academic Excellence',
    title: 'Preparing Leaders for Tomorrow',
    desc: 'Connecting rigorous scholarship with real-world problem solving across every discipline.',
    ctaLabel: 'Explore Academics',
    ctaTarget: 'academics',
  },
]

const FEATURED_NEWS_MAIN = {
  image: '/sample_headline.jpg',
  category: 'Rankings & Impact',
  title: 'University Ranks Among Top Institutions Worldwide in Interdisciplinary Science',
  excerpt:
    'Recognition highlights collaborative research initiatives, faculty leadership, and cross-disciplinary academic programs.',
}

const FEATURED_NEWS_LIST = [
  {
    image: '/sample_top.jpg',
    category: 'Campus',
    title: 'Inside Our Top-Ranked Technology-Ready Campus',
  },
  {
    image: '/hero-students.jpg',
    category: 'Leadership',
    title: 'Recognized Among Leading Colleges for Future Leaders',
  },
  {
    image: '/sample_hero_img.jpg',
    category: 'Open Learning',
    title: 'Expanding Access to Core Courses Through Open Learning',
  },
  {
    image: '/sample_headline.jpg',
    category: 'Research',
    title: 'National Faculty Awards Support Wide-Ranging Discovery',
  },
]

const CAROUSEL_ITEMS = [
  {
    image: '/sample_hero_img.jpg',
    eyebrow: 'Initiative 01',
    title: 'A Historic Investment to Build a New Model',
    desc: 'Modern facilities, collaborative studios, and cross-campus research hubs designed for discovery.',
  },
  {
    image: '/hero-students.jpg',
    eyebrow: 'Initiative 02',
    title: 'Interdisciplinary Laboratories & Research Centers',
    desc: 'Bringing together scholars, engineers, and designers to solve complex societal challenges.',
  },
  {
    image: '/sample_top.jpg',
    eyebrow: 'Initiative 03',
    title: 'Global Partnerships & Community Engagement',
    desc: 'Connecting campus research with public institutions, industry partners, and global communities.',
  },
]

const FACULTY_STATS = [
  { stat: '1,400+', label: 'Faculty & Researchers' },
  { stat: '20+', label: 'Interdisciplinary Centers' },
  { stat: '100+', label: 'Countries Represented' },
]

const VERTICAL_TABS = [
  {
    id: 'tab-1',
    title: 'Founding Vision & Discovery',
    heading: 'Pioneering Practical & Theoretical Scholarship',
    desc: 'Since our founding, bold ideas and hands-on inquiry have shaped new fields of study and transformed industries.',
    image: '/sample_hero_img.jpg',
  },
  {
    id: 'tab-2',
    title: 'Interdisciplinary Research',
    heading: 'Breaking Boundaries Across Disciplines',
    desc: 'Collaborations between engineering, science, policy, and design create solutions that no single field could achieve alone.',
    image: '/hero-students.jpg',
  },
  {
    id: 'tab-3',
    title: 'Global Impact & Future',
    heading: 'Shaping the Next Century of Innovation',
    desc: 'Equipping students and researchers with the tools, ethics, and curiosity to lead in a rapidly changing world.',
    image: '/sample_headline.jpg',
  },
]

const ACADEMIC_CARDS = [
  {
    eyebrow: 'Undergraduate',
    title: 'Undergraduate Programs',
    desc: 'Flexible, rigorous degree programs combining foundational theory with hands-on project experience.',
  },
  {
    eyebrow: 'Graduate',
    title: 'Master’s & Professional Degrees',
    desc: 'Specialized graduate education designed for advanced technical depth and leadership.',
  },
  {
    eyebrow: 'Doctoral',
    title: 'Ph.D. & Research Fellowships',
    desc: 'Original research alongside world-renowned faculty mentors in state-of-the-art laboratories.',
  },
]

const EVENTS_LIST = [
  {
    month: 'NOV',
    day: '18',
    title: 'Annual Research & Innovation Symposium',
    meta: '10:00 AM · Main Auditorium',
  },
  {
    month: 'DEC',
    day: '04',
    title: 'Distinguished Lecture Series: Future of Science',
    meta: '4:30 PM · Lecture Hall A',
  },
  {
    month: 'DEC',
    day: '12',
    title: 'Graduate Admissions & Program Information Session',
    meta: '2:00 PM · Virtual & On-Campus',
  },
]

function RevealSection({ id, className, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(id === 'home')
  const [replay, setReplay] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onNavigate = (e) => {
      if (e.detail?.id === id) {
        setVisible(true)
        setReplay(false)
        requestAnimationFrame(() => setReplay(true))
      }
    }
    window.addEventListener('section-navigate', onNavigate)
    return () => window.removeEventListener('section-navigate', onNavigate)
  }, [id])

  return (
    <section
      id={id}
      ref={ref}
      className={`${className} cmu-section-anchor ${visible ? 'cmu-visible' : ''} ${replay ? 'cmu-replay' : ''}`}
    >
      {children}
    </section>
  )
}

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)

  const [cmsData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminSiteData') || 'null')
    } catch {
      return null
    }
  })

  const heroSlides = HERO_SLIDES.map((slide, idx) => {
    if (idx === 0 && cmsData?.heroContent) {
      return {
        ...slide,
        title: cmsData.heroContent.title || slide.title,
        desc: cmsData.heroContent.description || slide.desc,
        ctaLabel: cmsData.heroContent.btn1 || slide.ctaLabel,
      }
    }
    return slide
  })

  const newsItems = cmsData?.news?.length
    ? cmsData.news.slice(0, 4).map((n, i) => ({
        image: FEATURED_NEWS_LIST[i % FEATURED_NEWS_LIST.length].image,
        category: n.category || 'News',
        title: n.title,
      }))
    : FEATURED_NEWS_LIST

  const eventsItems = cmsData?.events?.length
    ? cmsData.events.slice(0, 3).map((ev) => ({
        month: (ev.month || 'NOV').toUpperCase().slice(0, 3),
        day: ev.day || '18',
        title: ev.title,
        meta: ev.venue || ev.time || 'Campus Auditorium',
      }))
    : EVENTS_LIST

  const facultyStats = cmsData?.faculty?.length
    ? [
        { stat: `${cmsData.faculty.length}+`, label: 'Faculty & Researchers' },
        ...FACULTY_STATS.slice(1),
      ]
    : FACULTY_STATS

  const featureTitle =
    cmsData?.aboutContent?.hero?.title || 'Celebration of Innovation & Heritage'
  const featureDesc =
    cmsData?.aboutContent?.overview?.paragraphs?.[0] ||
    'Highlighting milestones, community stories, and collaborative achievements across our campus and global network.'

  const academicItems = cmsData?.academicsContent?.programs?.length
    ? cmsData.academicsContent.programs
    : ACADEMIC_CARDS

  useEffect(() => {
    if (heroPaused) return
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroPaused])

  const scrollToSection = (e, targetId) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.dispatchEvent(new CustomEvent('section-navigate', { detail: { id: targetId } }))
    }
  }

  return (
    <div className="cmu-page">
      {/* 1. HERO (Hero Hero--home Hero--tall theme-dark) */}
      <section
        id="home"
        className="Hero Hero--home Hero--tall theme-dark cmu-section-anchor"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className="cmu-hero-viewport">
          <div
            className="cmu-hero-track"
            style={{ transform: `translateX(-${heroSlide * 100}%)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div key={idx} className="cmu-hero-slide">
                <img src={slide.image} alt={slide.title} className="cmu-hero-img" />
                <div className="cmu-hero-overlay" aria-hidden="true" />
                <div className="cmu-wrap cmu-hero-inner">
                  <div className="cmu-hero-content">
                    <span className="cmu-eyebrow cmu-eyebrow--red">{slide.eyebrow}</span>
                    <h1 className="cmu-h1">{slide.title}</h1>
                    <p className="cmu-hero-lead">{slide.desc}</p>
                    <a
                      href={`#${slide.ctaTarget}`}
                      onClick={(e) => scrollToSection(e, slide.ctaTarget)}
                      className="cmu-btn cmu-btn--red"
                    >
                      {slide.ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="cmu-arrow cmu-arrow--prev"
          onClick={() => setHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="cmu-arrow cmu-arrow--next"
          onClick={() => setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="cmu-dots" aria-label="Hero slide indicators">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`cmu-dot ${heroSlide === idx ? 'is-active' : ''}`}
              onClick={() => setHeroSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. NEWS & EVENTS COMBINED (Section Section--gray Section--bg-split-alt) */}
      <RevealSection id="news" className="Section Section--gray Section--bg-split-alt">
        <div className="cmu-wrap">
          <div className="cmu-section-hd">
            <h2 className="cmu-h2">News &amp; Events</h2>
          </div>

          <div className="cmu-news-layout">
            <article className="cmu-news-lead">
              <div className="cmu-news-lead-img">
                <img src={FEATURED_NEWS_MAIN.image} alt={FEATURED_NEWS_MAIN.title} />
              </div>
              <div className="cmu-news-lead-body">
                <span className="cmu-eyebrow">{FEATURED_NEWS_MAIN.category}</span>
                <h3 className="cmu-h3">{FEATURED_NEWS_MAIN.title}</h3>
                <p>{FEATURED_NEWS_MAIN.excerpt}</p>
                <a href="#news" onClick={(e) => e.preventDefault()} className="cmu-link">
                  Read More →
                </a>
              </div>
            </article>

            <div className="cmu-news-grid">
              {newsItems.map((item, idx) => (
                <article key={idx} className="cmu-news-card">
                  <div className="cmu-news-card-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cmu-news-card-body">
                    <span className="cmu-eyebrow">{item.category}</span>
                    <h4 className="cmu-h5">{item.title}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="events" style={{ marginTop: '56px' }}>
            <div className="cmu-section-hd">
              <h3 className="cmu-h3">Upcoming Events</h3>
            </div>

            <div className="cmu-events-grid">
              {eventsItems.map((ev, idx) => (
                <div key={idx} className="cmu-event-card">
                  <div className="cmu-event-date">
                    <span className="cmu-event-month">{ev.month}</span>
                    <span className="cmu-event-day">{ev.day}</span>
                  </div>
                  <div className="cmu-event-info">
                    <h4 className="cmu-h5">{ev.title}</h4>
                    <p className="cmu-event-meta">{ev.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 3. FEATURE PANEL (FeaturePanel) */}
      <RevealSection id="feature" className="FeaturePanel">
        <div className="cmu-feature-grid">
          <div className="cmu-feature-media">
            <img src="/sample_top.jpg" alt="Feature highlight" />
          </div>
          <div className="cmu-feature-body">
            <span className="cmu-eyebrow cmu-eyebrow--light">Campus Spotlight</span>
            <h2 className="cmu-h2 cmu-h2--white">{featureTitle}</h2>
            <p className="cmu-feature-text">
              {featureDesc}
            </p>
            <a
              href="#academics"
              onClick={(e) => scrollToSection(e, 'academics')}
              className="cmu-btn cmu-btn--outline-white"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </RevealSection>

      {/* 5. FACULTY STATS & TESTIMONIAL (Section) */}
      <RevealSection id="faculty" className="Section Section--white">
        <div className="cmu-wrap">
          <div className="cmu-section-hd">
            <h2 className="cmu-h2">Faculty Who Are Leaders in Their Fields</h2>
          </div>

          <div className="cmu-stats-grid">
            {facultyStats.map((item, idx) => (
              <div key={idx} className="cmu-stat-card">
                <div className="cmu-stat-num">{item.stat}</div>
                <div className="cmu-stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <blockquote className="cmu-quote-box">
            <p className="cmu-quote-text">
              “Our community thrives where curiosity meets real-world impact—empowering students and faculty to tackle the defining challenges of our era.”
            </p>
            <footer className="cmu-quote-author">— Faculty Leadership &amp; Academic Council</footer>
          </blockquote>
        </div>
      </RevealSection>

      {/* 5. ACADEMICS (Section Section--centered Section--black Section--bg-split) */}
      <RevealSection id="academics" className="Section Section--centered Section--black Section--bg-split">
        <div className="cmu-wrap">
          <div className="cmu-section-hd cmu-section-hd--center">
            <h2 className="cmu-h2 cmu-h2--white">Academics</h2>
            <p className="cmu-section-sub cmu-section-sub--light">
              Interdisciplinary degrees designed to inspire rigorous inquiry and creative leadership.
            </p>
          </div>

          <div className="cmu-academics-grid">
            {academicItems.map((card, idx) => (
              <div key={idx} className="cmu-academic-card">
                <span className="cmu-eyebrow">{card.eyebrow}</span>
                <h3 className="cmu-h4">{card.title}</h3>
                <p>{card.desc}</p>
                <a href="#academics" onClick={(e) => e.preventDefault()} className="cmu-link">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
