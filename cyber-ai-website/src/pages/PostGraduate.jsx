import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_POSTGRADUATE_CONTENT, normalizePostgraduate } from "../data/academicsData";
import "./Academics.css";

// ── Table of Contents Items ──────────────────────────────────────────────────
const PG_TOC_ITEMS = [
  { num: "01", label: "Specializations", target: "specializations" },
  { num: "02", label: "Research Labs", target: "labs" },
  { num: "03", label: "Research Impact", target: "pride" },
  { num: "04", label: "Fellowships & Stipends", target: "fellowships" },
  { num: "05", label: "Dual Degree", target: "dual-degree" },
  { num: "06", label: "Curriculum", target: "curriculum" },
  { num: "07", label: "Internships", target: "internships" },
  { num: "08", label: "Placements", target: "placements" },
  { num: "09", label: "Alumni Voices", target: "alumni" },
];

export default function PostGraduate() {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSiteData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.postgraduateContent) return normalizePostgraduate(parsed.postgraduateContent);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_POSTGRADUATE_CONTENT;
  });

  const [activeSection, setActiveSection] = useState("specializations");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSemTab, setActiveSemTab] = useState(0);

  // Sync with adminSiteData
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("adminSiteData");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.postgraduateContent) setContent(normalizePostgraduate(parsed.postgraduateContent));
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("adminSiteDataUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("adminSiteDataUpdated", handleUpdate);
    };
  }, []);

  // Scrollspy & Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionIds = [
        "specializations",
        "labs",
        "pride",
        "fellowships",
        "dual-degree",
        "curriculum",
        "internships",
        "placements",
        "alumni",
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    hero,
    heroStats,
    specializations,
    researchLabs,
    fellowships,
    dualDegreePartners,
    curriculum,
    internships,
    placements,
    alumni,
    customAreas,
  } = content;

  return (
    <div className="academics-page">
      {/* ── HERO BANNER ── */}
      <section id="top" className="ug-hero-section">
        <div className="ug-hero-viewport">
          <img
            src={hero?.bgImage || "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1920&q=85"}
            alt="Postgraduate Cybersecurity Research"
            className="ug-hero-slide-img ug-animate-ken-burns"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="ug-hero-gradient-1" />
          <div className="ug-tech-dot-grid" />

          <div className="ug-hero-foreground">
            <div className="ug-container ug-hero-content-wrapper">
              <div className="ug-hero-inner">
                <div className="ug-breadcrumb-pill">
                  <span className="ug-breadcrumb-dot" />
                  <Link to="/academics" className="ug-breadcrumb-section" style={{ color: "inherit", textDecoration: "none" }}>
                    Academics
                  </Link>
                  <span className="ug-breadcrumb-sep">·</span>
                  <span className="ug-breadcrumb-page">{hero?.eyebrow || "Postgraduate Programme"}</span>
                </div>

                <h1 className="ug-hero-title">{hero?.title || "M.Tech in Cybersecurity"}</h1>
                <p className="ug-hero-subtitle">
                  {hero?.subtitle ||
                    "Advanced specialization in systems security, cloud defense, AI-driven protection, and cryptographic engineering with international dual-degree pathways at top global universities."}
                </p>

                <div className="ug-hero-actions">
                  <a href="#curriculum" className="ug-btn-crimson">
                    Explore Syllabus
                  </a>
                  <a href="#dual-degree" className="ug-btn-glass">
                    Dual Degree Pathways
                  </a>
                  <a href="#fellowships" className="ug-btn-glass">
                    GATE &amp; Fellowships
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Bar */}
        <div className="ug-stats-bar">
          <div className="ug-container">
            <div className="ug-stats-grid">
              {(heroStats || []).map((s) => (
                <div
                  key={s.id}
                  className={`ug-stat-card${s.valueStyle === "crimson" ? " ug-stat-card--crimson-hover" : ""}`}
                >
                  <div>
                    <div className="ug-stat-label">{s.label}</div>
                    <div className={`ug-stat-value${s.valueStyle === "crimson" ? " ug-stat-value--crimson" : ""}`}>
                      {s.value}
                    </div>
                  </div>
                  <div className={`ug-stat-badge ug-stat-badge--${s.badgeStyle || "crimson"}`}>
                    {s.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <main className="ug-container ug-main-wrap">
        {/* Mobile Quick-Jump Bar */}
        <div className="ug-mobile-jumpbar-wrap">
          <div className="ug-mobile-jumpbar">
            {PG_TOC_ITEMS.map((item) => (
              <a key={item.num} href={`#${item.target}`} className="ug-jump-pill">
                {item.num} {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="ug-main-layout">
          {/* ── STICKY SIDEBAR ── */}
          <aside className="ug-sidebar">
            <div className="ug-sidebar-box">
              <div className="ug-sidebar-header">
                <span className="ug-sidebar-title">On This Page</span>
                <span className="ug-sidebar-badge">01–09</span>
              </div>
              <nav className="ug-toc-nav">
                {PG_TOC_ITEMS.map((item) => (
                  <a
                    key={`${item.num}-${item.label}`}
                    href={`#${item.target}`}
                    className={`ug-toc-link${activeSection === item.target ? " active" : ""}`}
                  >
                    <span className="ug-toc-num">{item.num}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
              <div className="ug-sidebar-cta">
                <a href="#curriculum" className="ug-btn-nav">
                  <span>Jump to Syllabus</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT COLUMN ── */}
          <div className="ug-content">
            {/* ── 01 · SPECIALIZATIONS ── */}
            {specializations && specializations.length > 0 && (
              <section id="specializations" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">01</span>
                  <span className="ug-section-tag">Core Specializations</span>
                </div>
                <h2 className="ug-section-title">What You Will Master</h2>
                <p className="ug-section-intro">
                  Four specialized tracks combining deep technical rigor with hands-on systems hacking, formal proofs, and autonomous threat operations.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {specializations.map((sp) => (
                    <div
                      key={sp.id}
                      className="ug-card"
                      style={{
                        borderTop: `4px solid ${
                          sp.color === "crimson"
                            ? "var(--ug-crimson)"
                            : sp.color === "cyan"
                            ? "var(--ug-cybercyan)"
                            : "var(--ug-royal)"
                        }`,
                      }}
                    >
                      {sp.image && (
                        <div className="ug-card-img-wrap" style={{ height: "160px", marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                          <img
                            src={sp.image}
                            alt={sp.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.parentElement.style.display = "none"; }}
                          />
                        </div>
                      )}
                      <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{sp.icon || "🔐"}</div>
                      <h3 className="ug-card-title">{sp.title}</h3>
                      <p className="ug-card-text">{sp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 02 · RESEARCH LABS & TESTBEDS ── */}
            {researchLabs && researchLabs.length > 0 && (
              <section id="labs" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">02</span>
                  <span className="ug-section-tag">Research Infrastructure</span>
                </div>
                <h2 className="ug-section-title">Flagship Research Labs &amp; Testbeds</h2>
                <p className="ug-section-intro">
                  Postgraduate researchers work directly in government-funded and industry-sponsored testbeds tackling mission-critical cybersecurity problems.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {researchLabs.map((lab) => (
                    <div key={lab.id} className="ug-card">
                      {lab.image && (
                        <div className="ug-card-img-wrap" style={{ height: "160px", marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                          <img
                            src={lab.image}
                            alt={lab.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.parentElement.style.display = "none"; }}
                          />
                        </div>
                      )}
                      <span className={`ug-stat-badge ug-stat-badge--${lab.tagStyle || "crimson"}`} style={{ marginBottom: "12px" }}>
                        {lab.tag || "RESEARCH LAB"}
                      </span>
                      <h3 className="ug-card-title">{lab.name}</h3>
                      <p className="ug-card-text">{lab.focus}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 03 · RESEARCH IMPACT & PRIDE ── */}
            <section id="pride" className="ug-reveal-section">
              <div className="ug-section-badge-row">
                <span className="ug-section-num ug-section-num--royal-tint">03</span>
                <span className="ug-section-tag">National Impact</span>
              </div>
              <h2 className="ug-section-title">Our Research Impact</h2>
              <p className="ug-section-intro">
                M.Tech scholars routinely publish in top-tier IEEE/ACM proceedings, contribute to national defense directives, and report critical zero-day vulnerabilities.
              </p>

              <div className="ug-pride-grid">
                <div className="ug-pride-card">
                  <span className="ug-pride-tag ug-pride-tag--crimson">IEEE / ACM TRANSACTIONS</span>
                  <div className="ug-pride-meta">High Impact Research</div>
                  <h3 className="ug-pride-title">Peer-Reviewed Top Tier Publications</h3>
                  <p className="ug-pride-text">
                    M.Tech scholars present original contributions at IEEE S&amp;P, USENIX Security, ACM CCS, and NDSS workshops.
                  </p>
                </div>

                <div className="ug-pride-card">
                  <span className="ug-pride-tag ug-pride-tag--cyan">DEFENSE &amp; ISRO</span>
                  <div className="ug-pride-meta">National Security</div>
                  <h3 className="ug-pride-title">Funded Critical Infrastructure Projects</h3>
                  <p className="ug-pride-text">
                    Hands-on contribution to MeitY, DRDO, and ISRO research deliverables protecting SCADA, satellite links, and sovereign AI pipelines.
                  </p>
                </div>

                <div className="ug-pride-card">
                  <span className="ug-pride-tag ug-pride-tag--royal">GLOBAL CTFs</span>
                  <div className="ug-pride-meta">Offensive Research</div>
                  <h3 className="ug-pride-title">DEF CON CTF &amp; Global Cyber Wargames</h3>
                  <p className="ug-pride-text">
                    Postgraduate mentors spearhead team bi0s at global finals, analyzing new binary architectures and novel mitigation bypasses.
                  </p>
                </div>

                <div className="ug-pride-card">
                  <span className="ug-pride-tag ug-pride-tag--crimson">PATENTS &amp; CVEs</span>
                  <div className="ug-pride-meta">Vulnerability Disclosure</div>
                  <h3 className="ug-pride-title">Responsible Disclosure &amp; Intellectual Property</h3>
                  <p className="ug-pride-text">
                    Over 50+ CVEs acknowledged by Microsoft, Google, Apple, and Cisco alongside patents filed in quantum and hardware trust security.
                  </p>
                </div>
              </div>
            </section>

            {/* ── 04 · FELLOWSHIPS & STIPENDS ── */}
            {fellowships && fellowships.length > 0 && (
              <section id="fellowships" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">04</span>
                  <span className="ug-section-tag">Financial Support</span>
                </div>
                <h2 className="ug-section-title">Fellowships, GATE Stipends &amp; Waivers</h2>
                <p className="ug-section-intro">
                  Generous monthly stipends, government fellowships, and research assistantships enable postgraduate students to focus fully on engineering excellence.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {fellowships.map((f) => (
                    <div
                      key={f.id}
                      className="ug-scholarship-card"
                      style={{
                        borderLeft: `4px solid ${
                          f.labelColor === "crimson"
                            ? "var(--ug-crimson)"
                            : f.labelColor === "cyan"
                            ? "var(--ug-cybercyan)"
                            : "var(--ug-royal)"
                        }`,
                      }}
                    >
                      <span className={`ug-scholarship-tag ug-scholarship-tag--${f.labelColor || "crimson"}`}>
                        {f.label}
                      </span>
                      <h3 className="ug-scholarship-title">{f.title}</h3>
                      <p className="ug-scholarship-text">{f.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 05 · DUAL DEGREE PATHWAYS ── */}
            {dualDegreePartners && dualDegreePartners.length > 0 && (
              <section id="dual-degree" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">05</span>
                  <span className="ug-section-tag">Global Horizons</span>
                </div>
                <h2 className="ug-section-title">International Dual Degree Pathways</h2>
                <p className="ug-section-intro">
                  Earn two degrees simultaneously: complete Year 1 at Amrita and Year 2 at one of our prestigious global partner universities with streamlined credit transfer.
                </p>

                <div className="ug-dualdegree-grid">
                  {dualDegreePartners.map((p) => (
                    <div key={p.id} className="ug-dualdegree-card">
                      <div className="ug-dualdegree-flag">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          p.flag || "🌐"
                        )}
                      </div>
                      <div className="ug-dualdegree-name">{p.name}</div>
                      <div className="ug-dualdegree-loc">{p.country}</div>
                    </div>
                  ))}
                </div>

                <div className="ug-exchange-card" style={{ marginTop: "24px" }}>
                  <div className="ug-exchange-title">Coordinated via Amrita Center for International Programs (ACIP)</div>
                  <p className="ug-exchange-subtext">
                    Dedicated advising on visa processing, partner tuition waivers, thesis co-advisorship, and overseas research placements.
                  </p>
                </div>
              </section>
            )}

            {/* ── 06 · CURRICULUM ── */}
            {curriculum && curriculum.length > 0 && (
              <section id="curriculum" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--royal-tint">06</span>
                  <span className="ug-section-tag">Academic Pathway</span>
                </div>
                <h2 className="ug-section-title">Course Curriculum &amp; Syllabus</h2>
                <p className="ug-section-intro">
                  A four-semester progression blending foundational systems security, advanced electives, funded research internships, and master thesis defense.
                </p>

                {/* Semester Selector Tabs */}
                <div className="ug-year-tabs" style={{ marginBottom: "24px" }}>
                  {curriculum.map((sem, idx) => (
                    <button
                      key={sem.id || idx}
                      className={`ug-year-tab ${activeSemTab === idx ? "active" : ""}`}
                      onClick={() => setActiveSemTab(idx)}
                    >
                      <span className="ug-year-tab-title">{sem.sem}</span>
                      <span className="ug-year-tab-sub">{sem.credits || "Courses"}</span>
                    </button>
                  ))}
                </div>

                {/* Active Semester Course Details */}
                {curriculum[activeSemTab] && (
                  <div className="ug-curriculum-panel" style={{ background: "#fff", padding: "28px", borderRadius: "12px", border: "1px solid var(--ug-slatex-200)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--ug-slatex-200)", paddingBottom: "12px" }}>
                      <h3 style={{ fontSize: "1.25rem", color: "var(--ug-cybernavy)", margin: 0, fontWeight: 700 }}>
                        {curriculum[activeSemTab].sem}
                      </h3>
                      {curriculum[activeSemTab].credits && (
                        <span className="ug-stat-badge ug-stat-badge--cyan">
                          {curriculum[activeSemTab].credits}
                        </span>
                      )}
                    </div>

                    <div className="ug-courses-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
                      {(curriculum[activeSemTab].courses || []).map((course, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "14px 16px",
                            background: "var(--ug-icetint)",
                            borderRadius: "8px",
                            border: "1px solid var(--ug-slatex-200)",
                          }}
                        >
                          <span style={{ color: "var(--ug-crimson)", fontWeight: 700, fontSize: "1.1rem" }}>▸</span>
                          <span style={{ fontSize: "0.92rem", color: "var(--ug-cybernavy)", fontWeight: 600, lineHeight: 1.5 }}>
                            {course}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* ── 07 · INTERNSHIPS ── */}
            {internships && internships.length > 0 && (
              <section id="internships" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">07</span>
                  <span className="ug-section-tag">Industry Immersion</span>
                </div>
                <h2 className="ug-section-title">Research Internships &amp; Fellowships</h2>
                <p className="ug-section-intro">
                  During Semester 3 and 4, M.Tech scholars complete full-time funded internships at top global tech companies and national research laboratories.
                </p>

                <div className="ug-grid ug-grid--3col">
                  {internships.map((item) => (
                    <div key={item.id} className="ug-card" style={{ textAlign: "center", padding: "24px" }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.company}
                          style={{ height: "36px", maxWidth: "120px", objectFit: "contain", margin: "0 auto 12px" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <h3 className="ug-card-title" style={{ fontSize: "1.1rem", marginBottom: "6px" }}>{item.company}</h3>
                      <div style={{ fontSize: "0.85rem", color: "var(--ug-slatex-500)", marginBottom: "10px" }}>{item.role}</div>
                      {item.stipend && (
                        <span className="ug-stat-badge ug-stat-badge--cyan" style={{ fontSize: "0.78rem" }}>
                          {item.stipend}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 08 · PLACEMENTS ── */}
            {placements && placements.length > 0 && (
              <section id="placements" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--royal-tint">08</span>
                  <span className="ug-section-tag">Career Trajectories</span>
                </div>
                <h2 className="ug-section-title">Where Our M.Tech Graduates Lead</h2>
                <p className="ug-section-intro">
                  From Silicon Valley tech giants to national cyber commands, our alumni occupy senior security engineering, threat research, and executive roles.
                </p>

                <div className="ug-grid ug-grid--4col">
                  {placements.map((p) => (
                    <div
                      key={p.id}
                      className="ug-card"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        background: "#fff",
                      }}
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.company}
                          style={{ height: "32px", maxWidth: "120px", objectFit: "contain", margin: "0 auto 10px" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div style={{ fontWeight: 700, color: "var(--ug-cybernavy)", fontSize: "1rem", marginBottom: "4px" }}>
                        {p.company}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--ug-slatex-500)" }}>{p.role}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 09 · ALUMNI VOICES ── */}
            {alumni && alumni.length > 0 && (
              <section id="alumni" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">09</span>
                  <span className="ug-section-tag">Alumni Voices</span>
                </div>
                <h2 className="ug-section-title">Heard From Our M.Tech Alumni</h2>
                <p className="ug-section-intro">
                  Reflections from graduates who transformed their research at Amrita into world-class careers.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {alumni.map((a) => (
                    <div
                      key={a.id}
                      className="ug-card"
                      style={{
                        padding: "28px",
                        borderLeft: `4px solid ${
                          a.color === "cyan"
                            ? "var(--ug-cybercyan)"
                            : a.color === "crimson"
                            ? "var(--ug-crimson)"
                            : "var(--ug-royal)"
                        }`,
                      }}
                    >
                      <p style={{ fontStyle: "italic", color: "var(--ug-slatex-700)", lineHeight: 1.8, marginBottom: "20px", fontSize: "0.95rem" }}>
                        "{a.quote}"
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        {a.image ? (
                          <img
                            src={a.image}
                            alt={a.name}
                            style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "50%",
                              background:
                                a.color === "cyan"
                                  ? "var(--ug-cybercyan)"
                                  : a.color === "crimson"
                                  ? "var(--ug-crimson)"
                                  : "var(--ug-royal)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              flexShrink: 0,
                            }}
                          >
                            {a.initials || "AL"}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--ug-cybernavy)", fontSize: "0.98rem" }}>
                            {a.name}
                          </div>
                          <div style={{ fontSize: "0.82rem", color: "var(--ug-slatex-500)", marginTop: "2px" }}>
                            {a.batch} · {a.org}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 10 · CUSTOM DYNAMIC AREAS (Admin added) ── */}
            {customAreas && customAreas.length > 0 && (
              <section id="custom-areas" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">10</span>
                  <span className="ug-section-tag">Featured Highlights</span>
                </div>
                <h2 className="ug-section-title">Specialized Programs &amp; Centers</h2>
                <div className="ug-grid ug-grid--2col">
                  {customAreas.map((area, idx) => (
                    <div key={area.id || idx} className="ug-card">
                      {area.image && (
                        <div className="ug-card-img-wrap" style={{ height: "180px", marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                          <img
                            src={area.image}
                            alt={area.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.parentElement.style.display = "none"; }}
                          />
                        </div>
                      )}
                      {area.tag && (
                        <span className="ug-stat-badge ug-stat-badge--crimson" style={{ marginBottom: "10px" }}>
                          {area.tag}
                        </span>
                      )}
                      <h3 className="ug-card-title">{area.title}</h3>
                      <p className="ug-card-text">{area.desc || area.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── CTA BANNER ── */}
            <section
              className="ug-reveal-section"
              style={{
                background: "linear-gradient(135deg, var(--ug-cybernavy) 0%, #1e1b4b 100%)",
                borderRadius: "16px",
                padding: "60px 40px",
                textAlign: "center",
                color: "#fff",
                margin: "40px 0",
              }}
            >
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontFamily: "var(--ug-font-serif)", color: "#fff", marginBottom: "16px" }}>
                Ready to Advance Your Cybersecurity Career?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto 32px", fontSize: "1.05rem", lineHeight: 1.6 }}>
                Applications are open for M.Tech in Cybersecurity at Amrita Vishwa Vidyapeetham. GATE stipends, dual-degree pathways, and funded research seats available.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/contact" className="ug-btn-crimson" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                  Apply for M.Tech
                </Link>
                <Link to="/academics" className="ug-btn-glass" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                  ← All Academic Programmes
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ── FLOATING BACK TO TOP ── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="ug-back-to-top"
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--ug-crimson)",
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            zIndex: 99,
            transition: "transform 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
