import { useState, useEffect } from 'react'
import './About.css'

export const DEFAULT_ABOUT_CONTENT = {
  hero: {
    badge: 'ABOUT US',
    titlePrefix: 'Amrita Center for',
    titleTeal: 'Cybersecurity',
    titleSuffix: 'Systems and Networks',
  },
  overview: {
    eyebrow: 'Overview',
    title: 'Who We Are',
    p1: 'The Amrita Center for Cybersecurity Systems and Networks at Amrita Vishwa Vidyapeetham (Amritapuri Campus) leads interdisciplinary research and academic training to protect digital assets of public and national importance.',
    p2: 'Supported by the Government of India through its Departments and Mission REACH programmes, the Center is designated as a Center of Relevance and Excellence (CORE) for Cybersecurity in India — fostering experts who disseminate knowledge across the ever-expanding frontiers of cybersecurity and AI.',
    p3: 'The Center also offers the globally recognised Online MCA in Cybersecurity through Amrita Online, attracting students and working professionals from across the world.',
  },
  overviewCards: [
    {
      id: 1,
      icon: '🛡️',
      title: 'CORE Center',
      desc: 'Designated Center of Relevance & Excellence for Cybersecurity in India under Mission REACH, Govt. of India',
    },
    {
      id: 2,
      icon: '🏆',
      title: 'NAAC A++ Grade',
      desc: 'Highest accreditation grade by the National Assessment and Accreditation Council of India',
    },
    {
      id: 3,
      icon: '🌍',
      title: "World's Top 100",
      desc: "Ranked in the World's Top 100 Universities in Times Higher Education (THE) Impact Rankings",
    },
    {
      id: 4,
      icon: '💡',
      title: '100+ Patents',
      desc: 'Patents granted across Amrita Vishwa Vidyapeetham spanning various domains of technology',
    },
  ],
  mission: {
    title: 'Our Mission',
    text: 'Promoting partnership among industry, academia, and the government to foster innovative research and education in Cybersecurity, thus enhancing knowledge, building solutions, and mitigating risks to benefit society.',
  },
  vision: {
    title: 'Our Vision',
    text: 'By way of research and academics, develop an ecosystem to pursue interdisciplinary research to protect digital assets of public and national importance.',
    specificsLabel: 'Specifically:',
    specifics: [
      {
        id: 1,
        text: 'Explore basic and applied research in Cybersecurity Systems & Networks.',
      },
      {
        id: 2,
        text: 'Provide education rich in theoretical and practical knowledge infused with ethical values.',
      },
      {
        id: 3,
        text: 'Develop solutions and techniques for critical challenges and implement them widely for the security of the public while preserving their interests.',
      },
    ],
  },
  insideOfferings: [
    {
      id: 1,
      num: '01',
      title: 'Academic Excellence',
      desc: 'Comprehensive programs from B.Tech. to Ph.D. in Cybersecurity and AI — combining theoretical foundations with practical skills and ethical training.',
      items: [
        'B.Tech. in CSE (Cyber Security)',
        'M.Tech. in Cyber Security Systems & Networks',
        'Ph.D. in Cyber Security Systems and Networks',
        'Online MCA in Cybersecurity (Amrita Online)',
      ],
    },
    {
      id: 2,
      num: '02',
      title: 'Research & Innovation',
      desc: 'Cutting-edge research spanning Agentic AI, Cloud Security, IoT, Cryptography, Healthcare Security, Automotive Security, and Big Data Analytics.',
      items: [
        'Agentic AI & Autonomous Cyber Defense',
        'Physical AI & Embodied Intelligence',
        'AI Sovereignty & Trusted AI Infrastructure',
        'IoT Security & Cryptography',
      ],
    },
    {
      id: 3,
      num: '03',
      title: 'Industry & Government Partners',
      desc: 'Strategic research partnerships with premier global universities and Indian government organisations for real-world impact.',
      items: [
        'Indian Space Research Organisation (ISRO)',
        'Department of Science and Technology (DST)',
        'TIFAC – Mission REACH',
        'VMware, Cisco, IBM Research, RSA Security',
      ],
    },
    {
      id: 4,
      num: '04',
      title: 'Placements & Global Opportunities',
      desc: 'Consistent high-quality placements and 6–12-month internships at leading multinational technology and cybersecurity firms worldwide.',
      items: [
        'Top cybersecurity companies globally',
        'Dual-degree programs at VU Amsterdam, Italy',
        'Exchange programs at University of Göttingen',
        'Research internships at SUTD Singapore',
      ],
    },
  ],
  university: {
    eyebrow: 'Amrita Vishwa Vidyapeetham',
    title: 'Part of a World-Class University',
    p1: 'Amrita Vishwa Vidyapeetham is a multi-campus, multi-disciplinary research university spread across India. The Amritapuri Campus, home to the Center for Cybersecurity Systems and Networks, is a hub of innovation and research excellence.',
    p2: "Accredited with 'A++' grade by NAAC, ranked in the World's Top 100 Universities in Times Higher Education (THE) Impact Rankings, and holder of 100+ patents across various domains of technology.",
    stats: [
      { id: 1, n: 'A++', l: 'NAAC Accreditation' },
      { id: 2, n: 'Top 100', l: 'THE Impact Rankings' },
      { id: 3, n: '100+', l: 'Patents Granted' },
      { id: 4, n: 'CORE', l: 'Mission REACH Designation' },
    ],
  },
}

export default function About() {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem('adminSiteData')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.aboutContent) {
          return {
            ...DEFAULT_ABOUT_CONTENT,
            ...parsed.aboutContent,
            hero: { ...DEFAULT_ABOUT_CONTENT.hero, ...parsed.aboutContent.hero },
            overview: { ...DEFAULT_ABOUT_CONTENT.overview, ...parsed.aboutContent.overview },
            mission: { ...DEFAULT_ABOUT_CONTENT.mission, ...parsed.aboutContent.mission },
            vision: {
              ...DEFAULT_ABOUT_CONTENT.vision,
              ...parsed.aboutContent.vision,
              specifics: parsed.aboutContent.vision?.specifics || DEFAULT_ABOUT_CONTENT.vision.specifics,
            },
            overviewCards: parsed.aboutContent.overviewCards || DEFAULT_ABOUT_CONTENT.overviewCards,
            insideOfferings: parsed.aboutContent.insideOfferings || DEFAULT_ABOUT_CONTENT.insideOfferings,
            university: {
              ...DEFAULT_ABOUT_CONTENT.university,
              ...parsed.aboutContent.university,
              stats: parsed.aboutContent.university?.stats || DEFAULT_ABOUT_CONTENT.university.stats,
            },
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
    return DEFAULT_ABOUT_CONTENT
  })

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('adminSiteData')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed.aboutContent) {
            setContent({
              ...DEFAULT_ABOUT_CONTENT,
              ...parsed.aboutContent,
              hero: { ...DEFAULT_ABOUT_CONTENT.hero, ...parsed.aboutContent.hero },
              overview: { ...DEFAULT_ABOUT_CONTENT.overview, ...parsed.aboutContent.overview },
              mission: { ...DEFAULT_ABOUT_CONTENT.mission, ...parsed.aboutContent.mission },
              vision: {
                ...DEFAULT_ABOUT_CONTENT.vision,
                ...parsed.aboutContent.vision,
                specifics: parsed.aboutContent.vision?.specifics || DEFAULT_ABOUT_CONTENT.vision.specifics,
              },
              overviewCards: parsed.aboutContent.overviewCards || DEFAULT_ABOUT_CONTENT.overviewCards,
              insideOfferings: parsed.aboutContent.insideOfferings || DEFAULT_ABOUT_CONTENT.insideOfferings,
              university: {
                ...DEFAULT_ABOUT_CONTENT.university,
                ...parsed.aboutContent.university,
                stats: parsed.aboutContent.university?.stats || DEFAULT_ABOUT_CONTENT.university.stats,
              },
            })
          }
        }
      } catch (e) {}
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const { hero, overview, overviewCards, mission, vision, insideOfferings, university } = content

  return (
    <div className="about-page">
      {/* ── Hero Banner ── */}
      <section className="about-hero">
        <div className="about-hero-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 C360,160 1080,0 1440,80 L1440,160 L0,160 Z" fill="rgba(82,169,188,0.08)" />
            <path d="M0,110 C400,50 1040,170 1440,100 L1440,160 L0,160 Z" fill="rgba(82,169,188,0.05)" />
          </svg>
        </div>
        <div className="about-hero-dots" aria-hidden="true">
          {[...Array(8)].map((_, i) => <span key={i} className={`ah-dot ah-dot-${i + 1}`} />)}
        </div>

        <div className="container about-hero-inner">
          <div className="about-hero-left">
            <div className="about-hero-label">
              <span className="ah-label-line" />
              {hero?.badge || 'ABOUT US'}
            </div>
            <h1 className="about-hero-title">
              {hero?.titlePrefix || 'Amrita Center for'}{' '}
              <span className="about-hero-teal">{hero?.titleTeal || 'Cybersecurity'}</span>
              <br />
              {hero?.titleSuffix || 'Systems and Networks'}
            </h1>
            <div className="ah-title-rule" />
          </div>

          <div className="about-hero-right" aria-hidden="true">
            <div className="ah-icon-wrap">
              <svg className="ah-circuit" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="100" r="4" fill="#52a9bc" opacity="0.6" />
                <circle cx="180" cy="80" r="4" fill="#52a9bc" opacity="0.6" />
                <circle cx="100" cy="10" r="4" fill="#52a9bc" opacity="0.4" />
                <circle cx="40" cy="160" r="3" fill="#52a9bc" opacity="0.4" />
                <circle cx="160" cy="150" r="3" fill="#52a9bc" opacity="0.4" />
                <line x1="20" y1="100" x2="55" y2="100" stroke="#52a9bc" strokeWidth="1.5" opacity="0.4" />
                <line x1="145" y1="80" x2="180" y2="80" stroke="#52a9bc" strokeWidth="1.5" opacity="0.4" />
                <line x1="100" y1="10" x2="100" y2="45" stroke="#52a9bc" strokeWidth="1.5" opacity="0.4" />
                <line x1="40" y1="150" x2="60" y2="150" stroke="#52a9bc" strokeWidth="1.5" opacity="0.4" />
                <line x1="140" y1="140" x2="160" y2="150" stroke="#52a9bc" strokeWidth="1.5" opacity="0.4" />
              </svg>
              <svg className="ah-shield" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M60 4 L108 24 L108 72 C108 100 86 124 60 136 C34 124 12 100 12 72 L12 24 Z"
                  fill="none"
                  stroke="#52a9bc"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
                <path
                  d="M60 18 L96 34 L96 72 C96 94 80 112 60 122 C40 112 24 94 24 72 L24 34 Z"
                  fill="rgba(82,169,188,0.12)"
                  stroke="#52a9bc"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  opacity="0.6"
                />
                <rect x="43" y="72" width="34" height="26" rx="4" fill="#52a9bc" opacity="0.85" />
                <path
                  d="M49 72 L49 62 C49 52 71 52 71 62 L71 72"
                  fill="none"
                  stroke="#52a9bc"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="60" cy="82" r="4" fill="white" opacity="0.9" />
                <rect x="58" y="84" width="4" height="7" rx="1" fill="white" opacity="0.9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="about-overview-section">
        <div className="container">
          <div className="about-overview-inner">
            <div className="aov-left">
              <span className="aov-eyebrow">{overview?.eyebrow || 'Overview'}</span>
              <h2 className="aov-title">{overview?.title || 'Who We Are'}</h2>
              <div className="aov-rule" />
              {overview?.p1 && <p className="aov-body">{overview.p1}</p>}
              {overview?.p2 && <p className="aov-body">{overview.p2}</p>}
              {overview?.p3 && <p className="aov-body">{overview.p3}</p>}
            </div>

            <div className="aov-right">
              {(overviewCards || []).map((c) => (
                <div className="aov-card" key={c.id}>
                  <div className="aov-card-icon">{c.icon}</div>
                  <div className="aov-card-body">
                    <h4 className="aov-card-title">{c.title}</h4>
                    <p className="aov-card-desc">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="about-mv-section">
        <div className="about-mv-bg" />
        <div className="container about-mv-inner">
          <div className="about-mv-header">
            <span className="aov-eyebrow">Foundation</span>
            <h2 className="aov-title" style={{ color: '#fff' }}>Mission &amp; Vision</h2>
            <div className="aov-rule aov-rule-light" />
          </div>

          <div className="mv-cards-row">
            {/* Mission */}
            <div className="mv-panel mv-panel-mission">
              <div className="mv-panel-accent" />
              <div className="mv-panel-icon">🎯</div>
              <h3 className="mv-panel-heading">{mission?.title || 'Our Mission'}</h3>
              <p className="mv-panel-text">{mission?.text}</p>
            </div>

            {/* Vision */}
            <div className="mv-panel mv-panel-vision">
              <div className="mv-panel-accent mv-panel-accent-teal" />
              <div className="mv-panel-icon">🔭</div>
              <h3 className="mv-panel-heading">{vision?.title || 'Our Vision'}</h3>
              <p className="mv-panel-text">{vision?.text}</p>
              {vision?.specifics && vision.specifics.length > 0 && (
                <div className="mv-specifics">
                  <p className="mv-specifics-label">{vision?.specificsLabel || 'Specifically:'}</p>
                  <ol className="mv-ol">
                    {vision.specifics.map((pt) => (
                      <li key={pt.id}>{pt.text}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Inside the Center ── */}
      <section className="about-inside-section">
        <div className="container">
          <div className="about-section-hd">
            <span className="aov-eyebrow">What We Offer</span>
            <h2 className="aov-title">Inside the Center</h2>
            <div className="aov-rule" />
          </div>

          <div className="inside-grid">
            {(insideOfferings || []).map((card) => (
              <div className="in-card" key={card.id}>
                <div className="in-card-num">{card.num}</div>
                <h4 className="in-card-title">{card.title}</h4>
                <p className="in-card-desc">{card.desc}</p>
                {card.items && card.items.length > 0 && (
                  <ul className="in-card-list">
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── University Info ── */}
      <section className="about-univ-section">
        <div className="container about-univ-inner">
          <div className="au-text">
            <span className="aov-eyebrow aov-eyebrow-light">{university?.eyebrow || 'Amrita Vishwa Vidyapeetham'}</span>
            <h2 className="au-title">{university?.title || 'Part of a World-Class University'}</h2>
            {university?.p1 && <p className="au-body">{university.p1}</p>}
            {university?.p2 && <p className="au-body">{university.p2}</p>}
          </div>
          <div className="au-stats">
            {(university?.stats || []).map((s) => (
              <div className="au-stat" key={s.id}>
                <div className="au-stat-num">{s.n}</div>
                <div className="au-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
