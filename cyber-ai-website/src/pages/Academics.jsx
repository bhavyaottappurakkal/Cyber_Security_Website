import './Academics.css'

const ugPrograms = [
  {
    degree: 'B.Tech.',
    title: 'Computer Science and Engineering (Cyber Security)',
    duration: '4 Years',
    type: 'Full-Time',
    overview: 'A 4-year full-time undergraduate degree engineering program focused on computer science fundamentals, network defense, cryptography, secure software development, and AI-driven security.',
    admission: 'Via Amrita Entrance Examination – Engineering (AEEE) or JEE Mains.',
    highlights: [
      'Network defense & penetration testing',
      'Cryptography & secure software development',
      'AI-driven cybersecurity techniques',
      'Ethical hacking & digital forensics',
      'Industry internships & projects',
    ],
    icon: '💻',
  },
  {
    degree: 'B.Tech.',
    title: 'Artificial Intelligence (AI) and Data Science (Cyber Physical Systems and Security)',
    duration: '4 Years',
    type: 'Full-Time',
    overview: 'Specialized undergraduate track combining AI, Data Science, and Cyber-Physical Systems security.',
    admission: 'Via Amrita Entrance Examination – Engineering (AEEE) or JEE Mains.',
    highlights: [
      'Artificial Intelligence & Machine Learning',
      'Cyber-Physical Systems security',
      'Data Science & Big Data Analytics',
      'Embedded systems & IoT security',
      'AI-driven threat intelligence',
    ],
    icon: '🤖',
  },
  {
    degree: 'B.C.A.',
    title: 'Honours in Cyber Security',
    duration: '3 Years',
    type: 'Full-Time',
    overview: 'Undergraduate computing application program focused on foundational cybersecurity operations and defense.',
    highlights: [
      'Foundational cybersecurity operations',
      'Network security & monitoring',
      'Digital forensics basics',
      'Security audit & compliance',
      'Ethical hacking fundamentals',
    ],
    icon: '🔐',
  },
]

const pgPrograms = [
  {
    degree: 'M.Tech.',
    title: 'Cyber Security Systems & Networks',
    duration: '2 Years',
    type: 'Full-Time',
    overview: 'A 2-year postgraduate engineering program offering advanced specialization in systems security, network forensics, cloud security, and AI defense, with opportunities for international dual degrees and year-long industry internships.',
    highlights: [
      'Systems security & network forensics',
      'Cloud security & hypervisor architecture',
      'AI-powered defense mechanisms',
      'International dual degree options (VU Amsterdam, Italy)',
      'Year-long industry internship opportunities',
    ],
    icon: '🔬',
  },
  {
    degree: 'M.C.A.',
    title: 'Cyber Security',
    duration: '2 Years',
    type: 'Full-Time',
    overview: 'Master of Computer Applications with a dedicated specialization in cybersecurity.',
    highlights: [
      'Advanced cybersecurity concepts',
      'Application security & secure development',
      'Incident response & management',
      'Cyber law & policy',
      'Industry-ready capstone projects',
    ],
    icon: '📱',
  },
]

const docPrograms = [
  {
    degree: 'Ph.D.',
    title: 'Cyber Security Systems and Networks',
    duration: 'Flexible (3–6 Years)',
    type: 'Full-Time / Part-Time',
    overview: 'Advanced doctoral research program in Agentic AI defense, Physical AI, Sovereign AI, Cloud Trust Modeling, Cryptography, IoT Security, and Critical Infrastructure Protection.',
    highlights: [
      'Agentic AI defense systems',
      'Physical AI & embodied intelligence',
      'Sovereign AI & trusted infrastructure',
      'Cloud Trust Modeling & cryptography',
      'Critical Infrastructure Protection',
      'IoT Security research',
    ],
    icon: '🔭',
  },
]

const onlinePrograms = [
  {
    degree: 'Online MCA',
    title: 'Cybersecurity (Amrita Online)',
    duration: '2 Years',
    type: 'Online / Flexible',
    overview: 'A flexible postgraduate degree program tailored for domestic and international students as well as working professionals.',
    highlights: [
      'Flexible online learning format',
      'Industry-relevant cybersecurity curriculum',
      'Live sessions with expert faculty',
      'Global student community',
      'Career advancement for professionals',
    ],
    icon: '🌐',
  },
]

function ProgramCard({ program, levelColor }) {
  return (
    <div className="program-detail-card">
      <div className="pdc-header">
        <div className="pdc-icon">{program.icon}</div>
        <div className="pdc-meta">
          <span className={`badge ${levelColor}`}>{program.type}</span>
          <h3 className="pdc-degree">{program.degree}</h3>
          <h4 className="pdc-title">{program.title}</h4>
          <div className="pdc-duration">⏱ {program.duration}</div>
        </div>
      </div>
      <div className="pdc-body">
        <p className="pdc-overview">{program.overview}</p>
        {program.admission && (
          <div className="pdc-admission">
            <strong>Admissions:</strong> {program.admission}
          </div>
        )}
        <div className="pdc-highlights">
          <h5>Key Areas</h5>
          <ul>
            {program.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Academics() {
  return (
    <div className="academics-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Academics</span>
          <h1>World-Class Cybersecurity Education</h1>
          <p>Comprehensive programs at every level — from undergraduate to doctoral — shaping the next generation of cybersecurity experts and AI researchers.</p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="academics-stats-bar">
        <div className="container academics-stats">
          {[
            { n: '4', l: 'Academic Levels' },
            { n: '7+', l: 'Degree Programs' },
            { n: '100%', l: 'Placement Support' },
            { n: '5+', l: 'Global University Partners' },
          ].map((s, i) => (
            <div key={i} className="ac-stat">
              <div className="ac-stat-num">{s.n}</div>
              <div className="ac-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UG Programs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Level 1</span>
            <h2 className="section-title">Undergraduate Programs</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Build a strong foundation in cybersecurity, AI, and computing.</p>
          </div>
          <div className="programs-list">
            {ugPrograms.map((p, i) => (
              <ProgramCard key={i} program={p} levelColor="badge-green" />
            ))}
          </div>
        </div>
      </section>

      {/* PG Programs */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Level 2</span>
            <h2 className="section-title">Postgraduate Programs</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Advanced specialization with international dual-degree and industry opportunities.</p>
          </div>
          <div className="programs-list">
            {pgPrograms.map((p, i) => (
              <ProgramCard key={i} program={p} levelColor="badge-blue" />
            ))}
          </div>
        </div>
      </section>

      {/* PhD */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Level 3</span>
            <h2 className="section-title">Doctoral Programs</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Push the boundaries of knowledge through original research in cybersecurity and AI.</p>
          </div>
          <div className="programs-list">
            {docPrograms.map((p, i) => (
              <ProgramCard key={i} program={p} levelColor="badge-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Online */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Online Learning</span>
            <h2 className="section-title">Online Degree Programs</h2>
            <div className="divider"></div>
            <p className="section-subtitle">Flexible programs for working professionals and international students.</p>
          </div>
          <div className="programs-list">
            {onlinePrograms.map((p, i) => (
              <ProgramCard key={i} program={p} levelColor="badge-navy" />
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="section section-dark">
        <div className="container admissions-cta">
          <h2>Apply to Amrita CyberAI Center</h2>
          <p>Take the first step toward a career in cybersecurity and AI. Our programs are designed to prepare you for real-world challenges.</p>
          <div className="cta-actions" style={{justifyContent:'center', marginTop:'32px'}}>
            <a href="https://www.amrita.edu/admissions" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Apply Now</a>
            <a href="mailto:cyber@am.amrita.edu" className="btn btn-secondary btn-lg">Contact Admissions</a>
          </div>
        </div>
      </section>
    </div>
  )
}

