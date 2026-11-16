import './About.css'

export default function About() {
  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">About the Center</span>
          <h1>Amrita Center for Cybersecurity<br />Systems and Networks</h1>
          <p>Leading interdisciplinary research and academic training to protect digital assets of public and national importance.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container about-overview">
          <div className="about-overview-text">
            <span className="section-label">Overview</span>
            <h2>Who We Are</h2>
            <div className="divider divider-left"></div>
            <p style={{marginTop:'20px'}}>
              The Amrita Center for Cybersecurity Systems and Networks at Amrita Vishwa Vidyapeetham 
              (Amritapuri Campus) leads interdisciplinary research and academic training to protect 
              digital assets of public and national importance.
            </p>
            <p>
              The Center promotes partnerships between industry, academia, and the government to 
              foster innovative research and education in cybersecurity, thus enhancing knowledge, 
              deriving solutions, benefiting society, and mitigating risks.
            </p>
            <p>
              Supported by the Government of India through many of its Departments and Mission REACH 
              programs, the Center is designated as a <strong>Center of Relevance and Excellence (CORE)</strong> 
              for cybersecurity in India — fostering a core group of experts who disseminate knowledge 
              across the ever-expanding frontiers of cybersecurity and AI.
            </p>
            <p>
              The Center also offers the globally recognized <strong>Online MCA Cybersecurity</strong> 
              program through Amrita Online, attracting students and working professionals from around the world.
            </p>
          </div>
          <div className="about-overview-cards">
            <div className="overview-card">
              <div className="oc-icon">🛡️</div>
              <h4>CORE Center</h4>
              <p>Designated Center of Relevance and Excellence for Cybersecurity in India under Mission REACH, Govt. of India</p>
            </div>
            <div className="overview-card">
              <div className="oc-icon">🏆</div>
              <h4>NAAC A++ Grade</h4>
              <p>Accredited with the highest grade by the National Assessment and Accreditation Council of India</p>
            </div>
            <div className="overview-card">
              <div className="oc-icon">🌍</div>
              <h4>Global Rankings</h4>
              <p>Ranked in World's Top 100 Universities in Times Higher Education (THE) Impact Rankings</p>
            </div>
            <div className="overview-card">
              <div className="oc-icon">💡</div>
              <h4>100+ Patents</h4>
              <p>Patents granted across Amrita Vishwa Vidyapeetham spanning various domains of technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Foundation</span>
            <h2 className="section-title">Mission & Vision</h2>
            <div className="divider"></div>
          </div>
          <div className="mv-grid">
            <div className="mv-card mv-mission">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                Promoting partnership among industry, academia, and the government to foster 
                innovative research and education in Cybersecurity, thus enhancing knowledge, 
                building solutions, and mitigating risks to benefit society.
              </p>
            </div>
            <div className="mv-card mv-vision">
              <div className="mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>
                By way of research and academics, develop an ecosystem to pursue interdisciplinary 
                research to protect digital assets of public and national importance.
              </p>
              <div className="vision-specifics">
                <h5>Specifically:</h5>
                <ol className="vision-list">
                  <li>Explore basic and applied research in Cybersecurity Systems &amp; Networks.</li>
                  <li>Provide education rich in theoretical and practical knowledge infused with ethical values.</li>
                  <li>Develop solutions and techniques for critical challenges and implement them widely for the security of the public while preserving their interests.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Inside the Center</h2>
            <div className="divider"></div>
          </div>
          <div className="inside-grid">
            <div className="inside-card">
              <div className="inside-num">01</div>
              <h4>Academic Excellence</h4>
              <p>
                Comprehensive programs from B.Tech. to Ph.D. in Cybersecurity and AI — 
                combining theoretical foundations with practical skills and ethical training.
              </p>
              <ul className="inside-list">
                <li>B.Tech. in CSE (Cyber Security)</li>
                <li>M.Tech. in Cyber Security Systems &amp; Networks</li>
                <li>Ph.D. in Cyber Security Systems and Networks</li>
                <li>Online MCA in Cybersecurity (Amrita Online)</li>
              </ul>
            </div>
            <div className="inside-card">
              <div className="inside-num">02</div>
              <h4>Research &amp; Innovation</h4>
              <p>
                Cutting-edge research spanning Agentic AI, Cloud Security, IoT, Cryptography, 
                Healthcare Security, Automotive Security, and Big Data Analytics.
              </p>
              <ul className="inside-list">
                <li>Agentic AI &amp; Autonomous Cyber Defense</li>
                <li>Physical AI &amp; Embodied Intelligence</li>
                <li>AI Sovereignty &amp; Trusted AI Infrastructure</li>
                <li>IoT Security &amp; Cryptography</li>
              </ul>
            </div>
            <div className="inside-card">
              <div className="inside-num">03</div>
              <h4>Industry &amp; Government Partners</h4>
              <p>
                Strategic research partnerships with premier global universities and 
                Indian government organizations for real-world impact.
              </p>
              <ul className="inside-list">
                <li>Indian Space Research Organisation (ISRO)</li>
                <li>Department of Science and Technology (DST)</li>
                <li>TIFAC – Mission REACH</li>
                <li>VMware, Cisco, IBM Research, RSA Security</li>
              </ul>
            </div>
            <div className="inside-card">
              <div className="inside-num">04</div>
              <h4>Placements &amp; Global Opportunities</h4>
              <p>
                Consistent high-quality placements and 6–12-month internships at leading 
                multinational technology and cybersecurity firms worldwide.
              </p>
              <ul className="inside-list">
                <li>Top cybersecurity companies globally</li>
                <li>Dual-degree programs at VU Amsterdam, Italy</li>
                <li>Exchange programs at University of Göttingen</li>
                <li>Research internships at SUTD Singapore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Institution Info */}
      <section className="section section-dark">
        <div className="container about-institution">
          <div className="ai-text">
            <span className="page-hero-label">Amrita Vishwa Vidyapeetham</span>
            <h2 style={{color:'var(--white)',margin:'12px 0'}}>Part of a World-Class University</h2>
            <p style={{color:'rgba(255,255,255,0.65)'}}>
              Amrita Vishwa Vidyapeetham is a multi-campus, multi-disciplinary research university 
              spread across India. The Amritapuri Campus, home to the Center for Cybersecurity Systems 
              and Networks, is a hub of innovation and research excellence.
            </p>
            <p style={{color:'rgba(255,255,255,0.65)'}}>
              The university is accredited with 'A++' grade by NAAC, ranked in the World's Top 100 
              Universities in Times Higher Education (THE) Impact Rankings, and has been granted 
              100+ patents across various domains.
            </p>
          </div>
          <div className="ai-stats">
            {[
              { n: 'A++', l: 'NAAC Accreditation' },
              { n: 'Top 100', l: 'THE Impact Rankings' },
              { n: '100+', l: 'Patents Granted' },
              { n: 'CORE', l: 'Mission REACH Designation' },
            ].map((s, i) => (
              <div key={i} className="ai-stat">
                <div className="ai-stat-num">{s.n}</div>
                <div className="ai-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

