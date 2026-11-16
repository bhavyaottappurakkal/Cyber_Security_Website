import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'TRACK-LLM: Transparency, Risk Assessment, Context & Knowledge for Large Language Models',
    desc: 'Researching transparency frameworks, risk assessment methodologies, and contextual reliability in Large Language Models. This project aims to establish principled approaches to evaluating and improving LLM trustworthiness for cybersecurity applications.',
    tags: ['AI Safety', 'LLM', 'Transparency'],
    icon: '🤖',
  },
  {
    id: 2,
    title: 'Artificial Intelligence and Online Exploitation: Investigating Romance Scams, Messaging Scams, and Recruitment Risks',
    desc: 'Investigating how AI is utilized in online exploitation, syndicated romance scams, fraudulent messaging, and illicit recruitment pipelines. Research includes interviews with insiders and trafficking survivors to understand and combat AI-powered exploitation.',
    tags: ['AI Ethics', 'Online Safety', 'Cybercrime'],
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Threat Modeling, Trust Modeling, and Development of Secure Platform in Cloud Environments',
    desc: 'Developing formal trust models, hypervisor security layers (SEDO), and secure cloud platforms. The SEDO layer ensures that control over assets hosted on cloud infrastructure is returned to their rightful owners.',
    tags: ['Cloud Security', 'Trust Models', 'Hypervisor'],
    icon: '☁️',
  },
  {
    id: 4,
    title: 'AIoTm – Secure, Scalable and Interoperable Platform for Internet of Things',
    desc: 'Building a secure, scalable, and interoperable middleware and management platform for heterogeneous IoT deployments. Addresses unique device naming, secure registration, and concurrent event processing.',
    tags: ['IoT', 'Security', 'Middleware'],
    icon: '📡',
  },
  {
    id: 5,
    title: 'Advanced Threat Collection Platforms',
    desc: 'Designing threat intelligence and malware capture systems to monitor and analyze evolving cyber threats. Builds comprehensive threat databases for proactive defense and research.',
    tags: ['Threat Intelligence', 'Malware', 'Defense'],
    icon: '🔍',
  },
  {
    id: 6,
    title: 'Amrita Big Data Framework',
    desc: 'High-availability distributed parallel database and machine learning analytics engine for streaming IoT and security data. Includes auto-scalable architecture, predictive analytics, and customizable mining rule maps.',
    tags: ['Big Data', 'Analytics', 'IoT'],
    icon: '📊',
  },
  {
    id: 7,
    title: 'Backdoor Analysis of Enterprise Applications',
    desc: 'Automated vulnerability and backdoor detection across complex enterprise software stacks. Develops tools and methodologies to identify hidden backdoors and security vulnerabilities at scale.',
    tags: ['Vulnerability', 'Enterprise Security', 'Automation'],
    icon: '🔓',
  },
  {
    id: 8,
    title: 'Healthcare Security',
    desc: 'Securing connected medical devices, wearable sensors, implantable devices, and remote healthcare cloud architectures. Addresses patient safety risks from cybersecurity vulnerabilities in medical ecosystems.',
    tags: ['Healthcare', 'Medical Devices', 'Patient Safety'],
    icon: '🏥',
  },
]

const whitepapers = [
  {
    title: 'Agentic AI Safety Framework for India and the Global South',
    desc: 'A comprehensive policy blueprint addressing safety, ethics, and governance of Agentic AI systems — with particular focus on the unique needs and contexts of India and Global South nations. Released at the AI Safety Conclave, December 2025.',
    icon: '📋',
    year: '2025',
  },
  {
    title: 'AI Sovereignty Blueprint for India and the Global South',
    desc: 'A strategic policy document outlining frameworks for AI sovereignty, data governance, indigenous AI infrastructure, and national digital self-reliance. Provides actionable recommendations for policymakers and institutions.',
    icon: '🗺️',
    year: '2025',
  },
]

export default function Projects() {
  return (
    <div className="projects-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">Projects &amp; White Papers</span>
          <h1>Research Projects &amp; Policy Blueprints</h1>
          <p>Active research projects spanning AI, cloud security, IoT, healthcare, and national policy frameworks.</p>
        </div>
      </section>

      {/* Key Research Projects */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Active Research</span>
            <h2 className="section-title">Key Research Projects</h2>
            <div className="divider"></div>
          </div>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.id} className="project-detail-card">
                <div className="pdc-top">
                  <div className="pdc-proj-icon">{p.icon}</div>
                  <div className="pdc-tags">
                    {p.tags.map((t, i) => <span key={i} className="badge badge-blue">{t}</span>)}
                  </div>
                </div>
                <h3 className="pdc-proj-title">{p.title}</h3>
                <p className="pdc-proj-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White Papers */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Policy & Research</span>
            <h2 className="section-title">White Papers &amp; Policy Blueprints</h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              Evidence-based policy frameworks and research blueprints contributing to national 
              and global cybersecurity and AI governance.
            </p>
          </div>
          <div className="whitepapers-list">
            {whitepapers.map((w, i) => (
              <div key={i} className="whitepaper-card">
                <div className="wp-icon">{w.icon}</div>
                <div className="wp-content">
                  <span className="badge badge-gold">White Paper · {w.year}</span>
                  <h3 className="wp-title">{w.title}</h3>
                  <p className="wp-desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="section section-dark">
        <div className="container" style={{textAlign:'center', maxWidth:'700px', margin:'0 auto'}}>
          <h2>Collaborate on Research</h2>
          <p style={{color:'rgba(255,255,255,0.65)', marginTop:'12px', fontSize:'1.05rem'}}>
            Interested in partnering with us on research projects or contributing to our white paper initiatives? 
            We welcome collaboration from industry, government, and academia.
          </p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginTop:'32px'}}>
            <a href="mailto:cyber@am.amrita.edu" className="btn btn-primary btn-lg">Propose Collaboration</a>
            <a href="/contact" className="btn btn-secondary btn-lg">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

