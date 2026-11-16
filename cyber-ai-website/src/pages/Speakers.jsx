import './Speakers.css'

const speakers = [
  { name: 'Satyanand Mishra', title: 'IAS, Former Chief Information Commissioner of India', category: 'Government', icon: '🏛️' },
  { name: 'J. Satyanarayana', title: 'Department of Electronics and Information Technology (DeitY), Govt. of India', category: 'Government', icon: '🏛️' },
  { name: 'Vijay Bhatkar', title: 'IIT Delhi, Architect of PARAM Supercomputers', category: 'Academia', icon: '🎓' },
  { name: 'Jacob Punnoose', title: 'Ex-DGP, Kerala, India', category: 'Government', icon: '🛡️' },
  { name: 'Esther Dyson', title: 'Founder of ICANN', category: 'Industry', icon: '🌐' },
  { name: 'Herbert Bos', title: 'Vrije Universiteit Amsterdam, Netherlands', category: 'Academia', icon: '🎓' },
  { name: 'Ravi Sandhu', title: 'University of Texas at San Antonio, USA', category: 'Academia', icon: '🎓' },
  { name: 'Gene Tsudik', title: 'University of California, USA', category: 'Academia', icon: '🎓' },
  { name: 'Ethan L. Miller', title: 'University of California, USA', category: 'Academia', icon: '🎓' },
  { name: 'Rajesh Gupta', title: 'University of California, San Diego (UCSD), USA', category: 'Academia', icon: '🎓' },
  { name: 'P. A. Subrahmanyam', title: 'Stanford University, USA', category: 'Academia', icon: '🎓' },
  { name: 'Sajal Das', title: 'Missouri University of Science and Technology, USA', category: 'Academia', icon: '🎓' },
  { name: 'Prabhaker Mateti', title: 'Wright State University, USA', category: 'Academia', icon: '🎓' },
  { name: 'K. Venkatesh Prasad', title: 'Ford Motor Company, USA', category: 'Industry', icon: '🏭' },
  { name: 'Srinivas Jaini', title: 'Silicon Valley Chapter of Cloud Security Alliance', category: 'Industry', icon: '☁️' },
  { name: 'Kaladhar Voruganti', title: 'Equinix', category: 'Industry', icon: '🏭' },
  { name: 'Katerina Mitrokotsa', title: 'LASEC Group', category: 'Academia', icon: '🎓' },
  { name: 'Srinivasan', title: 'Monash University, Australia', category: 'Academia', icon: '🎓' },
  { name: 'Priyadarsi Nanda', title: 'University of Technology, Australia', category: 'Academia', icon: '🎓' },
  { name: 'Yu-Chun Lu', title: 'National Cheng Kung University, Taiwan', category: 'Academia', icon: '🎓' },
  { name: 'Sumit Ganguly', title: 'IIT Kanpur, India', category: 'Academia', icon: '🎓' },
  { name: 'Dattatreya Gaur', title: 'Vice President at Robert Bosch', category: 'Industry', icon: '🏭' },
  { name: 'B. Balasubramanian', title: 'Daimler Benz', category: 'Industry', icon: '🚗' },
  { name: 'Lipika Dey', title: 'Tata Consultancy Services (TCS)', category: 'Industry', icon: '💼' },
]

const categories = ['All', 'Academia', 'Industry', 'Government']

import { useState } from 'react'

export default function Speakers() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? speakers : speakers.filter(s => s.category === filter)

  return (
    <div className="speakers-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Distinguished Speakers</span>
          <h1>Distinguished Speakers &amp; Visitors</h1>
          <p>Eminent researchers, policymakers, and industry pioneers who have engaged with the Center.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{speakers.length}+ Distinguished Visitors</span>
            <h2 className="section-title">Global Experts Who Have Visited the Center</h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              The Center regularly hosts eminent researchers, policymakers, and industry pioneers from around the globe.
            </p>
          </div>

          {/* Filter */}
          <div className="speakers-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
                <span className="filter-count">
                  {cat === 'All' ? speakers.length : speakers.filter(s => s.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="speakers-grid">
            {filtered.map((s, i) => (
              <div key={i} className="speaker-card">
                <div className="sc-avatar">{s.icon}</div>
                <div className="sc-info">
                  <h4 className="sc-name">{s.name}</h4>
                  <p className="sc-title">{s.title}</p>
                  <span className={`badge ${
                    s.category === 'Government' ? 'badge-gold' : 
                    s.category === 'Industry' ? 'badge-blue' : 'badge-green'
                  }`}>{s.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invite CTA */}
      <section className="section section-dark">
        <div className="container" style={{textAlign:'center', maxWidth:'700px', margin:'0 auto'}}>
          <h2>Invite a Speaker or Visit Us</h2>
          <p style={{color:'rgba(255,255,255,0.65)', marginTop:'12px', fontSize:'1.05rem'}}>
            Interested in visiting the Center to give a talk, collaborate on research, or explore partnership opportunities? 
            We welcome distinguished speakers from academia, industry, and government.
          </p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginTop:'32px'}}>
            <a href="mailto:cyber@am.amrita.edu" className="btn btn-primary btn-lg">Propose a Visit</a>
            <a href="/contact" className="btn btn-secondary btn-lg">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

