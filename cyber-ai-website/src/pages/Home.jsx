import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const ACADEMICS_OVERVIEW = [
  { label: 'B.Tech. in CSE (Cyber Security)', path: '/academics' },
  { label: 'M.Tech. in Cybersecurity', path: '/academics/postgraduate' },
  { label: 'Ph.D. in Cybersecurity', path: '/academics/phd' },
  { label: 'Online MCA in Cybersecurity', path: '/academics/online-mca' },
]

const RESEARCH_FOCUS_AREAS = [
  'Agentic AI Systems',
  'Physical AI and Intelligent Autonomous Systems',
  'AI Sovereignty and Trusted AI Infrastructure',
  'Cloud Computing & Hypervisor Security',
  'Internet of Things (IoT) Security',
  'Cryptography',
  'Healthcare Security',
  'Big Data Analytics',
  'Automotive Security',
  'Security Data Visualization',
  'Security Education',
]

const INSIDE_THE_CENTER = [
  {
    title: 'Partners',
    desc: 'Strategic research partnerships with premier global universities and Indian government organizations such as the Indian Space Research Organisation (ISRO) and the Department of Science and Technology (DST).',
    link: '/placements',
  },
  {
    title: 'Placements',
    desc: 'Consistent high-quality placements managed by the Directorate of Corporate & Industry Relations (CIR) across top multinational technology and cybersecurity firms.',
    link: '/placements',
  },
  {
    title: 'Publications',
    desc: 'Extensive research contributions published in internationally renowned journals and conferences.',
    link: '/projects',
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
  return (
    <div className="cmu-page">
      {/* 1. HERO BANNER */}
      <section id="home" className="Hero Hero--home Hero--tall theme-dark cmu-section-anchor">
        <div className="cmu-hero-slide">
          <img
            src="/cybersecurity-lab.jpg"
            alt="Amrita Center for Cybersecurity Systems and Networks"
            className="cmu-hero-img"
          />
          <div className="cmu-hero-overlay" aria-hidden="true" />
          <div className="cmu-wrap cmu-hero-inner">
            <div className="cmu-hero-content">
              <span className="cmu-eyebrow cmu-eyebrow--red">
                Center of Relevance &amp; Excellence (CORE)
              </span>
              <h1 className="cmu-h1">
                Amrita Center for Cybersecurity Systems and Networks
              </h1>
              <p className="cmu-hero-lead">
                Fostering innovative research and education in Cybersecurity and Artificial Intelligence through partnerships across industry, academia, and the government.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME & INTRODUCTION (ALTERNATING LEFT/RIGHT PHOTO & DESCRIPTION) */}
      <RevealSection id="feature" className="FeaturePanel">
        {/* Row 1: Photo Left, Welcome & Introduction Right */}
        <div className="cmu-feature-grid">
          <div className="cmu-feature-media">
            <img
              src="/cybersecurity-lab.jpg"
              alt="Amrita Center for Cybersecurity Systems and Networks Lab"
            />
          </div>
          <div className="cmu-feature-body">
            <span className="cmu-eyebrow cmu-eyebrow--light">Welcome &amp; Introduction</span>
            <h2 className="cmu-h2 cmu-h2--white">
              Amrita Center for Cybersecurity Systems and Networks
            </h2>
            <p className="cmu-feature-text">
              The Amrita Center for Cybersecurity Systems and Networks promotes partnerships between industry, academia, and the government to foster innovative research and education in cybersecurity, thus enhancing knowledge, deriving solutions, benefiting society, and mitigating risks. The Center is supported by the Government of India through many of its Departments and Mission REACH programs. As a designated Center of Relevance and Excellence (CORE) for cybersecurity in India, the Center fosters a core group of experts who disseminate knowledge across the ever-expanding frontiers of cybersecurity and AI.
            </p>
          </div>
        </div>

        {/* Row 2: Description Left, Photo Right */}
        <div className="cmu-feature-grid cmu-feature-grid--reversed">
          <div className="cmu-feature-media">
            <img src="/campus-life.jpg" alt="Amrita Campus Life and Online MCA" />
          </div>
          <div className="cmu-feature-body">
            <span className="cmu-eyebrow cmu-eyebrow--light">Amrita Online</span>
            <h2 className="cmu-h2 cmu-h2--white">Online MCA Cybersecurity</h2>
            <p className="cmu-feature-text">
              The Center also offers the globally recognized Online MCA Cybersecurity program through Amrita Online, attracting students and working professionals from around the world.
            </p>
            <Link to="/academics/online-mca" className="cmu-btn cmu-btn--outline-white">
              Explore Online MCA →
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* 3. QUICK OVERVIEW OF CORE SECTIONS */}
      <RevealSection id="faculty" className="Section Section--white">
        <div className="cmu-wrap">
          <div id="academics">
            <div className="cmu-section-hd">
              {/* <span className="cmu-eyebrow">Quick Overview of Core Sections</span> */}
              <h2 className="cmu-h2">Academics</h2>
            </div>

            <div className="cmu-academics-grid cmu-academics-grid--4" style={{ marginBottom: '64px' }}>
              {ACADEMICS_OVERVIEW.map((prog, idx) => (
                <Link key={idx} to={prog.path} className="cmu-overview-prog-card">
                  <span className="cmu-research-num">0{idx + 1}</span>
                  <h3 className="cmu-h5">{prog.label}</h3>
                  <span className="cmu-link">Learn More →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="cmu-section-hd">
            {/* <span className="cmu-eyebrow">Quick Overview of Core Sections</span> */}
            <h2 className="cmu-h2">Research Focus</h2>
          </div>

          <div className="cmu-research-grid">
            {RESEARCH_FOCUS_AREAS.map((area, idx) => (
              <div key={idx} className="cmu-research-item">
                <span className="cmu-research-num">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="cmu-research-name">{area}</span>
              </div>
            ))}
          </div>

          <div id="news" style={{ marginTop: '64px' }}>
            <div className="cmu-section-hd">
              {/* <span className="cmu-eyebrow">Quick Overview of Core Sections</span> */}
              <h2 className="cmu-h2">Inside the Center</h2>
            </div>

            <div id="events" className="cmu-inside-grid">
              {INSIDE_THE_CENTER.map((item, idx) => (
                <div key={idx} className="cmu-inside-card">
                  <h3 className="cmu-h4">{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link to={item.link} className="cmu-link">
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
