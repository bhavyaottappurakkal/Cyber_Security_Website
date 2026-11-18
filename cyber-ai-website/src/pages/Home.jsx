import { Link } from "react-router-dom";
import "./Home.css";

const keyHighlights = [
  {
    title: "CORE Designation",
    badge: "Govt. of India",
    desc: "Designated as a Center of Relevance and Excellence (CORE) for Cybersecurity in India (Mission REACH, Govt. of India).",
  },
  {
    title: "Accredited 'A++' Grade",
    badge: "NAAC Accredited",
    desc: "Accredited 'A++' Grade by NAAC.",
  },
  {
    title: "World's Top 100",
    badge: "THE Impact Rankings",
    desc: "Ranked in the World’s Top 100 Universities in Times Higher Education (THE) Impact Rankings.",
  },
  {
    title: "100+ Patents Granted",
    badge: "Innovation Record",
    desc: "100+ Patents Granted across Amrita Vishwa Vidyapeetham.",
  },
];

const academicPrograms = [
  {
    name: "B.Tech. in CSE (Cyber Security)",
    level: "Undergraduate Program",
    desc: "4-year engineering program focused on systems security, network forensics, cryptography, and AI-driven defense.",
  },
  {
    name: "M.Tech. in Cybersecurity",
    level: "Postgraduate Program",
    desc: "Advanced specialization in systems security, cloud security, and AI defense with international dual degrees.",
  },
  {
    name: "Ph.D. in Cybersecurity",
    level: "Doctoral Program",
    desc: "Advanced research in Agentic AI, Sovereign AI, Cloud Trust Modeling, and Critical Infrastructure Protection.",
  },
  {
    name: "Online MCA in Cybersecurity",
    level: "Amrita Online",
    desc: "Globally recognized flexible postgraduate degree program for domestic and international students and working professionals.",
  },
];

const researchFocusAreas = [
  { name: "Agentic AI Systems" },
  { name: "Physical AI and Intelligent Autonomous Systems" },
  { name: "AI Sovereignty and Trusted AI Infrastructure" },
  { name: "Cloud Computing & Hypervisor Security" },
  { name: "Internet of Things (IoT) Security" },
  { name: "Cryptography" },
  { name: "Healthcare Security" },
  { name: "Big Data Analytics" },
  { name: "Automotive Security" },
  { name: "Security Data Visualization" },
  { name: "Security Education" },
];

const insideCenterItems = [
  {
    title: "Partners",
    tag: "Strategic Alliances",

    desc: "Strategic research partnerships with premier global universities and Indian government organizations such as the Indian Space Research Organisation (ISRO) and the Department of Science and Technology (DST).",
    link: "/placements",
    linkText: "Explore Partners & Collaborations",
  },
  {
    title: "Placements",
    tag: "Industry Outcomes",

    desc: "Consistent high-quality placements managed by the Directorate of Corporate & Industry Relations (CIR) across top multinational technology and cybersecurity firms.",
    link: "/placements",
    linkText: "View Placement Records & Recruiters",
  },
  {
    title: "Publications",
    tag: "Research Impact",

    desc: "Extensive research contributions published in internationally renowned journals and conferences.",
    link: "/projects",
    linkText: "Explore Projects & White Papers",
  },
];

export default function Home() {
  return (
    <div className="home-page-ref">
      {/* ── 1. HERO BANNER (MATCHING REFERENCE IMAGE) ── */}
      <section className="ref-hero-section">
        <div className="container ref-hero-container">
          <div className="ref-hero-grid">
            {/* Left Column: Editorial Headline & Content */}
            <div className="ref-hero-left">
              {/* Center of Relevance Tag */}
              <div className="ref-hero-tag">
                <span className="ref-tag-line"></span>
                <span className="ref-tag-text">
                  CENTER OF RELEVANCE &amp; EXCELLENCE
                </span>
              </div>

              {/* Main Headline (Editorial Serif Typography) */}
              <h1 className="ref-hero-title">
                Amrita Center for <br />
                <span className="ref-hero-teal">
                  Cybersecurity Systems and Networks
                </span>
              </h1>

              {/* Subtitle / Description */}
              <p className="ref-hero-desc">
                Fostering innovative research and education in Cybersecurity and
                Artificial Intelligence through partnerships across industry,
                academia, and the government.
              </p>

              {/* Action Buttons */}
              <div className="ref-hero-actions">
                <Link to="/research" className="btn-ref-primary">
                  Explore Research
                </Link>
                <Link to="/academics" className="btn-ref-secondary">
                  Academic Programs
                </Link>
              </div>

            </div>

            {/* Right Column: Animated cybersecurity globe */}
            <div className="ref-hero-right">
              <div
                className="cyber-globe-visual"
                role="img"
                aria-label="Animated cybersecurity network globe with a central lock"
              >
                <span className="globe-label globe-label-left">HASH :: OK</span>
                <span className="globe-label globe-label-right">0x4F0CB4</span>
                <span className="globe-label globe-label-bottom">
                  SECURE NETWORK
                </span>
                <svg
                  className="globe-svg"
                  viewBox="0 0 640 640"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="globe-clip">
                      <circle cx="320" cy="320" r="290" />
                    </clipPath>
                  </defs>
                  <circle className="globe-outline" cx="320" cy="320" r="290" />
                  <g className="globe-grid" clipPath="url(#globe-clip)">
                    <ellipse cx="320" cy="320" rx="72" ry="290" />
                    <ellipse cx="320" cy="320" rx="150" ry="290" />
                    <ellipse cx="320" cy="320" rx="222" ry="290" />
                    <ellipse cx="320" cy="320" rx="290" ry="88" />
                    <ellipse cx="320" cy="320" rx="290" ry="172" />
                    <path d="M56 178 Q320 286 584 178" />
                    <path d="M38 430 Q320 332 602 430" />
                    <path d="M118 91 Q260 286 484 548" />
                    <path d="M516 91 Q380 286 132 548" />
                    <path d="M86 305 L208 225 L320 320 L454 236 L562 316" />
                    <path d="M98 398 L222 455 L320 320 L430 444 L550 382" />
                    <path d="M208 225 L222 455 M454 236 L430 444 M86 305 L98 398 M562 316 L550 382" />
                  </g>
                  <g className="globe-orbits">
                    <ellipse
                      className="globe-orbit globe-orbit-one"
                      cx="320"
                      cy="320"
                      rx="370"
                      ry="104"
                    />
                    <ellipse
                      className="globe-orbit globe-orbit-two"
                      cx="320"
                      cy="320"
                      rx="370"
                      ry="104"
                    />
                  </g>
                  <g className="globe-nodes" clipPath="url(#globe-clip)">
                    <circle cx="118" cy="177" r="4" />
                    <circle cx="208" cy="225" r="4" />
                    <circle cx="320" cy="116" r="4" />
                    <circle cx="454" cy="236" r="4" />
                    <circle cx="562" cy="316" r="4" />
                    <circle cx="98" cy="398" r="4" />
                    <circle cx="222" cy="455" r="4" />
                    <circle cx="430" cy="444" r="4" />
                    <circle cx="520" cy="486" r="4" />
                    <circle cx="154" cy="322" r="4" />
                    <circle cx="390" cy="170" r="4" />
                    <circle cx="320" cy="520" r="4" />
                    <circle cx="262" cy="290" r="3" />
                    <circle cx="400" cy="350" r="3" />
                    <circle cx="178" cy="414" r="3" />
                    <circle cx="480" cy="290" r="3" />
                    <circle cx="260" cy="486" r="3" />
                    <circle cx="366" cy="248" r="3" />
                    <circle cx="130" cy="260" r="3" />
                    <circle cx="506" cy="390" r="3" />
                  </g>
                  <circle
                    className="lock-halo lock-halo-outer"
                    cx="320"
                    cy="320"
                    r="64"
                  />
                  <circle
                    className="lock-halo lock-halo-inner"
                    cx="320"
                    cy="320"
                    r="42"
                  />
                  <g className="globe-lock" transform="translate(320 320)">
                    <path d="M-17 -5v-10a17 17 0 0 1 34 0v10" />
                    <rect x="-24" y="-7" width="48" height="39" rx="7" />
                    <circle cx="0" cy="10" r="4" />
                    <path d="M0 14v8" />
                  </g>
                </svg>
                <a
                  className="globe-scroll-link"
                  href="#highlights"
                  aria-label="Scroll to key highlights"
                >
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KEY HIGHLIGHTS SECTION ── */}
      <section id="highlights" className="section ref-highlights-section">
        <div className="container">
          <div className="ref-section-header">
            <span className="ref-sub-heading">Institutional Prestige</span>
            <h2 className="ref-section-title">Key Institutional Highlights</h2>
            <div className="ref-accent-bar"></div>
          </div>

          <div className="highlights-quad-grid">
            {keyHighlights.map((h, i) => (
              <div key={i} className="highlight-quad-card">
                <div className="hqc-top">
                  <span className="hqc-icon">{h.icon}</span>
                  <span className="hqc-badge">{h.badge}</span>
                </div>
                <h3 className="hqc-title">{h.title}</h3>
                <p className="hqc-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WELCOME & INTRODUCTION ── */}
      <section className="section ref-welcome-section">
        <div className="container">
          <div className="ref-welcome-box">
            <div className="ref-welcome-content">
              <span className="ref-sub-heading">
                Welcome &amp; Introduction
              </span>
              <h2 className="ref-welcome-title">
                Amrita Center for Cybersecurity Systems and Networks
              </h2>
              <div className="ref-accent-bar ref-accent-bar-left"></div>

              <p className="ref-welcome-lead">
                The Amrita Center for Cybersecurity Systems and Networks
                promotes partnerships between industry, academia, and the
                government to foster innovative research and education in
                cybersecurity, thus enhancing knowledge, deriving solutions,
                benefiting society, and mitigating risks.
              </p>

              <p className="ref-welcome-p">
                The Center is supported by the Government of India through many
                of its Departments and Mission REACH programs. As a designated{" "}
                <strong>Center of Relevance and Excellence (CORE)</strong> for
                cybersecurity in India, the Center fosters a core group of
                experts who disseminate knowledge across the ever-expanding
                frontiers of cybersecurity and AI.
              </p>

              {/* Online MCA Callout */}
              <div className="ref-online-mca-banner">
                <div className="mca-badge-icon">🌐</div>
                <div className="mca-badge-info">
                  <h4>Globally Recognized Online MCA Cybersecurity</h4>
                  <p>
                    The Center also offers the globally recognized Online MCA
                    Cybersecurity program through Amrita Online, attracting
                    students and working professionals from around the world.
                  </p>
                </div>
                <Link to="/academics" className="mca-cta-btn">
                  View Program →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. QUICK OVERVIEW OF CORE SECTIONS ── */}

      {/* CORE SECTION 1: ACADEMICS */}
      <section className="section ref-core-academics">
        <div className="container">
          <div className="ref-section-header">
            <span className="ref-sub-heading">
              Quick Overview · Core Section 01
            </span>
            <h2 className="ref-section-title">Academics</h2>
            <div className="ref-accent-bar"></div>
            <p className="ref-section-lead">
              Comprehensive undergraduate, postgraduate, doctoral, and online
              degree programs in Cybersecurity and AI.
            </p>
          </div>

          <div className="ref-programs-grid">
            {academicPrograms.map((prog, idx) => (
              <div key={idx} className="ref-program-card">
                <div className="rpc-top">
                  <span className="rpc-icon">{prog.icon}</span>
                  <span className="rpc-level">{prog.level}</span>
                </div>
                <h3 className="rpc-name">{prog.name}</h3>
                <p className="rpc-desc">{prog.desc}</p>
                <Link to="/academics" className="rpc-action">
                  Learn More <span>→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="ref-center-action">
            <Link to="/academics" className="btn-ref-primary">
              View Full Academics Curriculum →
            </Link>
          </div>
        </div>
      </section>

      {/* CORE SECTION 2: RESEARCH FOCUS */}
      <section className="section ref-core-research">
        <div className="container">
          <div className="ref-section-header">
            <span className="ref-sub-heading">
              Quick Overview · Core Section 02
            </span>
            <h2 className="ref-section-title">Research Focus</h2>
            <div className="ref-accent-bar"></div>
            <p className="ref-section-lead">
              Pioneering interdisciplinary research to protect digital assets of
              public and national importance.
            </p>
          </div>

          <div className="ref-research-grid">
            {researchFocusAreas.map((area, idx) => (
              <div key={idx} className="ref-research-pill">
                <span className="rrp-index">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="rrp-icon">{area.icon}</span>
                <span className="rrp-name">{area.name}</span>
              </div>
            ))}
          </div>

          <div className="ref-center-action">
            <Link to="/research" className="btn-ref-secondary">
              {/* Explore All Detailed Research Descriptions → */}
            </Link>
          </div>
        </div>
      </section>

      {/* CORE SECTION 3: INSIDE THE CENTER */}
      <section className="section ref-core-inside">
        <div className="container">
          <div className="ref-section-header">
            <span className="ref-sub-heading">
              Quick Overview · Core Section 03
            </span>
            <h2 className="ref-section-title">Inside the Center</h2>
            <div className="ref-accent-bar"></div>
            <p className="ref-section-lead">
              Global partnerships, exceptional placement outcomes, and
              internationally recognized research contributions.
            </p>
          </div>

          <div className="ref-inside-grid">
            {insideCenterItems.map((item, idx) => (
              <div key={idx} className="ref-inside-card">
                <div className="ric-header">
                  <div className="ric-icon">{item.icon}</div>
                  <span className="ric-tag">{item.tag}</span>
                </div>
                <h3 className="ric-title">{item.title}</h3>
                <p className="ric-desc">{item.desc}</p>
                <Link to={item.link} className="ric-link">
                  {item.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
