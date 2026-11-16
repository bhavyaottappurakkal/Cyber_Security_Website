import './Placements.css'

const govPartners = [
  { name: 'ISRO', full: 'Indian Space Research Organisation', desc: 'Strategic research partnerships in space security and advanced systems.', icon: '🚀' },
  { name: 'DST', full: 'Department of Science and Technology, Govt. of India', desc: 'Government research funding and policy collaboration.', icon: '🔬' },
  { name: 'TIFAC', full: 'Technology Information, Forecasting and Assessment Council – Mission REACH', desc: 'Core designation and research mission partnership.', icon: '🏛️' },
]

const industryPartners = [
  { category: 'Cybersecurity & Cloud', companies: ['RSA Security', 'VMware', 'Cisco', 'Dell', 'AppviewX', 'HackerOne'] },
  { category: 'IT & Enterprise', companies: ['IBM Research', 'Oracle', 'SAP Labs India', 'TCS', 'LTIMindtree (Mindtree)', 'Wipro', 'HCL', 'Accenture', 'Cognizant', 'C-DAC'] },
  { category: 'Consulting & Legal', companies: ['PricewaterhouseCoopers (PwC India)', 'Ernst & Young (EY)', 'Trilegal'] },
  { category: 'Semiconductors, Hardware & Telecom', companies: ['Intel Corporation', 'Infineon Technologies', 'ARM Technologies', 'Nokia', 'NXP Semiconductors'] },
  { category: 'Automotive, Healthcare & Industrial', companies: ['Bosch', 'Siemens Healthineers', 'Philips', 'Honeywell', 'Schneider Electric', 'Continental Automotive', 'Daimler Truck Innovation Center', 'Magna International', 'Renault', 'Valeo R&D', 'ABB', 'General Electric (GE)', 'Whirlpool', 'ICU Medical', 'L&T'] },
]

const internationalPartners = [
  { univ: 'Vrije Universiteit (VU) Amsterdam', country: 'Netherlands', type: 'Dual Degree Master\'s & Ph.D. Scholarships', icon: '🇳🇱' },
  { univ: 'University of L\'Aquila', country: 'Italy', type: 'Dual Degree Scholarships', icon: '🇮🇹' },
  { univ: 'University of Göttingen', country: 'Germany', type: 'Exchange Program', icon: '🇩🇪' },
  { univ: 'Singapore University of Technology and Design (SUTD)', country: 'Singapore', type: 'Research Internships', icon: '🇸🇬' },
  { univ: 'Technical University of Vienna', country: 'Austria', type: 'Doctoral Programs', icon: '🇦🇹' },
]

const testimonials = [
  {
    quote: 'I enrolled for dual degree Masters at the Amrita Center for Cybersecurity Systems and Networks, Amritapuri, in the year 2013 and did my second year of Masters at Vrije Universiteit, Amsterdam. As I am writing this, I am at VU pursuing my PhD in system security. Very sincere thanks also to the faculty at Amrita; they strive to bring out the best in us.',
    author: 'Radhesh Krishnan',
    role: 'PhD Student',
    org: 'Vrije Universiteit (VU), Amsterdam',
    icon: '🎓',
  },
  {
    quote: 'My visit to the Amrita Center for Cybersecurity Systems and Networks was truly an eye-opener. They have an excellent set of on-going projects with an emphasis on real societal impact. The wide range of activities the students participate and organize at both the national and international level is truly impressive!',
    author: 'Dr. Praveen Jayachandran',
    role: 'Research Scientist',
    org: 'IBM Research, India',
    icon: '🔬',
  },
]

export default function Placements() {
  return (
    <div className="placements-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Placements &amp; Partners</span>
          <h1>Industry Placements &amp; Global Partnerships</h1>
          <p>Consistent high-quality placements and strategic research partnerships with leading organizations worldwide.</p>
        </div>
      </section>

      {/* Placement Overview */}
      <section className="section">
        <div className="container">
          <div className="placement-overview">
            <div className="po-text">
              <span className="section-label">Placement Excellence</span>
              <h2>Placement Overview</h2>
              <div className="divider divider-left" style={{marginTop:'12px', marginBottom:'20px'}}></div>
              <p>
                The Directorate of Corporate &amp; Industry Relations (CIR) achieves excellent placement 
                outcomes for students each year. A proven track record of consistent, high-quality placements 
                and 6-to-12-month industry internships is one of the primary reasons bright students choose Amrita.
              </p>
              <p>
                Students from the Center have been placed or completed long-term internships (6 to 12 months) 
                as Security Engineers, Malware Researchers, Product Security Interns, and R&amp;D Engineers at 
                leading multinational technology and cybersecurity firms.
              </p>
            </div>
            <div className="po-stats">
              {[
                { n: '6–12', l: 'Month Internships', sub: 'Long-term industry immersion' },
                { n: '50+', l: 'Hiring Partners', sub: 'Multinational companies' },
                { n: '5', l: 'International Universities', sub: 'Dual-degree programs' },
                { n: '100%', l: 'Placement Support', sub: 'Via CIR Directorate' },
              ].map((s, i) => (
                <div key={i} className="po-stat">
                  <div className="po-stat-num">{s.n}</div>
                  <div className="po-stat-label">{s.l}</div>
                  <div className="po-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Government Partners */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Government & Institutional</span>
            <h2 className="section-title">Government &amp; Institutional Partners</h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              We have developed strong working relationships with leading Indian government organizations.
            </p>
          </div>
          <div className="gov-partners-grid">
            {govPartners.map((p, i) => (
              <div key={i} className="gov-partner-card">
                <div className="gpc-icon">{p.icon}</div>
                <div className="gpc-name">{p.name}</div>
                <div className="gpc-full">{p.full}</div>
                <p className="gpc-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Partners */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Industry Recruiters</span>
            <h2 className="section-title">Industry Recruiters &amp; Internship Partners</h2>
            <div className="divider"></div>
          </div>
          <div className="industry-partners">
            {industryPartners.map((cat, i) => (
              <div key={i} className="industry-category">
                <h4 className="ic-category">{cat.category}</h4>
                <div className="ic-companies">
                  {cat.companies.map((c, j) => (
                    <span key={j} className="company-chip">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Partners */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Global Opportunities</span>
            <h2 className="section-title">International Dual-Degree &amp; Exchange Scholarships</h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              Students regularly secure international scholarships, dual-degree master's placements, 
              and research internships at premier global universities.
            </p>
          </div>
          <div className="intl-partners-grid">
            {internationalPartners.map((p, i) => (
              <div key={i} className="intl-partner-card">
                <div className="ipc-flag">{p.icon}</div>
                <div className="ipc-info">
                  <h4>{p.univ}</h4>
                  <div className="ipc-country">{p.country}</div>
                  <span className="badge badge-blue">{p.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What They Say</span>
            <h2 className="section-title">Testimonials</h2>
            <div className="divider"></div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="tc-quote">❝</div>
                <p className="tc-text">{t.quote}</p>
                <div className="tc-author">
                  <div className="tc-avatar">{t.icon}</div>
                  <div>
                    <div className="tc-name">{t.author}</div>
                    <div className="tc-role">{t.role}, {t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

