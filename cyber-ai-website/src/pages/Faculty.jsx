import './Faculty.css'

const faculty = [
  {
    name: 'Dr. Krishnashree Achuthan',
    designation: 'Dean of PG Programs, School of Engineering, Faculty of Engineering',
    roles: [
      'Director, Center for Cybersecurity Systems and Networks, Amritapuri',
      'Director, Technology Business Incubator (TBI), Amritapuri',
    ],
    expertise: ['Cybersecurity', 'AI & Machine Learning', 'Cloud Security', 'IoT Security'],
    icon: '👩‍💼',
    isLeadership: true,
  },
]

const researchFaculty = [
  {
    name: 'Faculty — Agentic AI & Autonomous Systems',
    area: 'Agentic AI, Autonomous Cyber Defense, Multi-Agent Systems',
    icon: '🤖',
  },
  {
    name: 'Faculty — Physical AI & Robotics Security',
    area: 'Physical AI, Embodied Intelligence, Autonomous Vehicles',
    icon: '🦾',
  },
  {
    name: 'Faculty — Cloud Security Research',
    area: 'Cloud Computing Security, Hypervisor Architecture, Trust Models',
    icon: '☁️',
  },
  {
    name: 'Faculty — IoT & Embedded Security',
    area: 'IoT Security, Embedded Systems, Automotive Security',
    icon: '📡',
  },
  {
    name: 'Faculty — Cryptography & Boolean Functions',
    area: 'Cryptography, Boolean Functions, Reed-Muller Codes',
    icon: '🔑',
  },
  {
    name: 'Faculty — Healthcare & Biomedical Security',
    area: 'Healthcare Security, Medical Devices, Privacy & Compliance',
    icon: '🏥',
  },
  {
    name: 'Faculty — Big Data & Analytics',
    area: 'Big Data Platforms, Machine Learning Analytics, IoT Data',
    icon: '📊',
  },
  {
    name: 'Faculty — Security Education & Outreach',
    area: 'CTF Competitions, Security Curriculum, Industry Engagement',
    icon: '🎓',
  },
]

export default function Faculty() {
  return (
    <div className="faculty-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Faculty</span>
          <h1>Leadership &amp; Core Faculty</h1>
          <p>Distinguished researchers, educators, and thought leaders shaping the future of cybersecurity and AI.</p>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Center Leadership</h2>
            <div className="divider"></div>
          </div>
          <div className="leadership-grid">
            {faculty.map((f, i) => (
              <div key={i} className="faculty-leadership-card">
                <div className="flc-avatar">
                  <div className="avatar-placeholder">{f.icon}</div>
                </div>
                <div className="flc-info">
                  <h3>{f.name}</h3>
                  <p className="flc-designation">{f.designation}</p>
                  <ul className="flc-roles">
                    {f.roles.map((r, j) => <li key={j}>{r}</li>)}
                  </ul>
                  <div className="flc-expertise">
                    {f.expertise.map((e, j) => <span key={j} className="badge badge-blue">{e}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Faculty */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Research Faculty</span>
            <h2 className="section-title">Faculty by Research Area</h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              Our faculty are domain experts across the full spectrum of cybersecurity and AI research.
            </p>
          </div>
          <div className="faculty-grid">
            {researchFaculty.map((f, i) => (
              <div key={i} className="faculty-area-card">
                <div className="fac-icon">{f.icon}</div>
                <h4>{f.name}</h4>
                <p className="fac-area">{f.area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborating Faculty Notice */}
      <section className="section">
        <div className="container">
          <div className="faculty-note">
            <div className="fn-icon">ℹ️</div>
            <div className="fn-content">
              <h4>Complete Faculty Directory</h4>
              <p>
                For the complete and up-to-date list of faculty members, their detailed profiles, 
                publications, and research interests, please visit the official Amrita Vishwa 
                Vidyapeetham faculty directory or contact the Center directly.
              </p>
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'16px'}}>
                <a href="https://www.amrita.edu" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Visit Amrita Website</a>
                <a href="mailto:cyber@am.amrita.edu" className="btn btn-outline btn-sm">Contact the Center</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section section-dark">
        <div className="container" style={{textAlign:'center', maxWidth:'700px', margin:'0 auto'}}>
          <h2>Join Our Research Community</h2>
          <p style={{color:'rgba(255,255,255,0.65)', marginTop:'12px', fontSize:'1.05rem'}}>
            We are always looking for talented researchers, postdoctoral fellows, and faculty to join 
            our growing team at the intersection of Cybersecurity and AI.
          </p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginTop:'32px'}}>
            <a href="mailto:cyber@am.amrita.edu" className="btn btn-primary btn-lg">Apply to Join</a>
            <a href="/contact" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
        </div>
      </section>
    </div>
  )
}

