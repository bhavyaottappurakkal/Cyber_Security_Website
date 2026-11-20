import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_PHD_CONTENT,
  getAcademicHeroAnimationClass,
  getAcademicHeroGradientClass,
  normalizePhD,
} from "../data/academicsData";
import "./Academics.css";

const PHD_TOC_ITEMS = [
  { num: "01", label: "Research Thrusts", target: "research" },
  { num: "02", label: "Funding Partners", target: "funding" },
  { num: "03", label: "PhD Roadmap", target: "roadmap" },
  { num: "04", label: "Fellowships", target: "fellowships" },
  { num: "05", label: "Alumni Doctors", target: "alumni" },
];

export default function PhD() {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSiteData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.phdContent) return normalizePhD(parsed.phdContent);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PHD_CONTENT;
  });

  const [activeSection, setActiveSection] = useState("research");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("adminSiteData");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.phdContent) setContent(normalizePhD(parsed.phdContent));
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionIds = ["research", "funding", "roadmap", "fellowships", "alumni"];
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

  const { hero, heroStats, researchAreas, fundingPartners, fellowships, phdGuide, alumni, customAreas } = content;

  return (
    <div className="academics-page">
      {/* ── HERO BANNER ── */}
      <section id="top" className="ug-hero-section">
        <div className="ug-hero-viewport">
          <img
            src={hero?.bgImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85"}
            alt="PhD Research in Cybersecurity"
            className={`ug-hero-slide-img ${getAcademicHeroAnimationClass(hero?.animation)}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className={getAcademicHeroGradientClass(hero?.gradient)} style={{ position: "absolute", inset: 0 }} />
          <div className="ug-tech-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

          <div className="ug-hero-foreground">
            <div className="ug-container ug-hero-content-wrapper">
              <div className="ug-hero-inner">
                <div className="ug-breadcrumb-pill">
                  <span className="ug-breadcrumb-dot" />
                  <Link to="/academics" className="ug-breadcrumb-section" style={{ color: "inherit", textDecoration: "none" }}>
                    Academics
                  </Link>
                  <span className="ug-breadcrumb-sep">·</span>
                  <span className="ug-breadcrumb-page">{hero?.eyebrow || "Academic Programmes"}</span>
                </div>

                <h1 className="ug-hero-title">{hero?.title || "Doctoral Programme"}</h1>
                <p className="ug-hero-subtitle">
                  {hero?.subtitle ||
                    "A research-intensive Ph.D. that pushes the frontiers of Agentic AI, Sovereign AI, Cloud Trust Modeling, and Critical Infrastructure Protection in cybersecurity science."}
                </p>

                <div className="ug-hero-actions">
                  <a href="#roadmap" className="ug-btn-crimson">
                    Explore PhD Roadmap
                  </a>
                  <a href="#research" className="ug-btn-glass">
                    Discover Research Areas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="ug-stats-bar">
          <div className="ug-container">
            <div className="ug-stats-grid">
              {(heroStats || []).map((s) => (
                <div key={s.id} className={`ug-stat-card${s.valueStyle === "crimson" ? " ug-stat-card--crimson-hover" : ""}`}>
                  <div>
                    <div className="ug-stat-label">{s.label}</div>
                    <div className={`ug-stat-value${s.valueStyle === "crimson" ? " ug-stat-value--crimson" : ""}`}>{s.value}</div>
                  </div>
                  <div className={`ug-stat-badge ug-stat-badge--${s.badgeStyle || "royal"}`}>{s.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN MAIN CONTENT ── */}
      <main className="ug-container ug-main-wrap">
        <div className="ug-mobile-jumpbar-wrap">
          <div className="ug-mobile-jumpbar">
            {PHD_TOC_ITEMS.map((item) => (
              <a key={item.num} href={`#${item.target}`} className="ug-jump-pill">
                {item.num} {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="ug-main-layout">
          {/* Sticky Sidebar */}
          <aside className="ug-sidebar">
            <div className="ug-sidebar-box">
              <div className="ug-sidebar-header">
                <span className="ug-sidebar-title">On This Page</span>
                <span className="ug-sidebar-badge">01–05</span>
              </div>
              <nav className="ug-toc-nav">
                {PHD_TOC_ITEMS.map((item) => (
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
                <a href="#roadmap" className="ug-btn-nav">
                  <span>PhD Roadmap</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="ug-content">
            {/* 01 · Research Areas */}
            {researchAreas && researchAreas.length > 0 && (
              <section id="research" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">01</span>
                  <span className="ug-section-tag">Frontier Investigation</span>
                </div>
                <h2 className="ug-section-title">Core Research Thrusts</h2>
                <p className="ug-section-intro">
                  Doctoral scholars investigate high-impact theoretical and applied domains backed by leading funding bodies and international collaborators.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {researchAreas.map((ra) => (
                    <div key={ra.id} className="ug-card">
                      {ra.image && (
                        <div className="ug-card-img-wrap" style={{ height: "160px", marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                          <img
                            src={ra.image}
                            alt={ra.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.parentElement.style.display = "none"; }}
                          />
                        </div>
                      )}
                      <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{ra.icon || "🔬"}</div>
                      <h3 className="ug-card-title">{ra.title}</h3>
                      <p className="ug-card-text">{ra.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 02 · Funding Partners */}
            {fundingPartners && fundingPartners.length > 0 && (
              <section id="funding" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">02</span>
                  <span className="ug-section-tag">R&amp;D Sponsors</span>
                </div>
                <h2 className="ug-section-title">Government &amp; Industry Funding Partners</h2>
                <p className="ug-section-intro">
                  Active sponsored research grants from national defense ministries, premier science agencies, and leading industry research arms.
                </p>

                <div className="ug-grid ug-grid--3col">
                  {fundingPartners.map((fp) => (
                    <div key={fp.id} className="ug-card" style={{ textAlign: "center", padding: "24px" }}>
                      {fp.image && (
                        <img
                          src={fp.image}
                          alt={fp.name}
                          style={{ height: "40px", maxWidth: "120px", objectFit: "contain", margin: "0 auto 12px" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--ug-crimson)", marginBottom: "4px" }}>
                        {fp.name}
                      </div>
                      <div style={{ fontSize: "0.86rem", color: "var(--ug-slatex-700)" }}>
                        {fp.fullName || fp.name}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 03 · PhD Roadmap */}
            {phdGuide && phdGuide.length > 0 && (
              <section id="roadmap" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--royal-tint">03</span>
                  <span className="ug-section-tag">Progression Milestones</span>
                </div>
                <h2 className="ug-section-title">Ph.D. Milestones &amp; Timeline</h2>
                <p className="ug-section-intro">
                  A structured doctoral journey designed to balance rigorous foundational coursework, top-tier publications, and impactful dissertation defense.
                </p>

                <div className="ug-timeline-wrap" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {phdGuide.map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="ug-card"
                      style={{ borderLeft: "4px solid var(--ug-royal)", padding: "24px 28px" }}
                    >
                      <div style={{ fontWeight: 800, color: "var(--ug-royal)", fontSize: "1.1rem", marginBottom: "12px" }}>
                        {step.phase}
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {(step.activities || []).map((act, aIdx) => (
                          <li
                            key={aIdx}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              marginBottom: "8px",
                              fontSize: "0.92rem",
                              color: "var(--ug-slatex-700)",
                            }}
                          >
                            <span style={{ color: "var(--ug-royal)", fontWeight: 700 }}>▸</span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 04 · Fellowships */}
            {fellowships && fellowships.length > 0 && (
              <section id="fellowships" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">04</span>
                  <span className="ug-section-tag">Doctoral Support</span>
                </div>
                <h2 className="ug-section-title">Doctoral Fellowships &amp; Research Grants</h2>
                <p className="ug-section-intro">
                  Full-time Ph.D. scholars receive competitive financial stipends, contingency funding, and travel allowances to present at international venues.
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

            {/* 05 · Alumni Doctors */}
            {alumni && alumni.length > 0 && (
              <section id="alumni" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">05</span>
                  <span className="ug-section-tag">Doctoral Alumni</span>
                </div>
                <h2 className="ug-section-title">Where Our Ph.D. Doctors Serve</h2>
                <p className="ug-section-intro">
                  Our doctoral alumni serve as professors at IITs and leading universities, principal research scientists in defense organizations, and tech research leads.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {alumni.map((a) => (
                    <div
                      key={a.id}
                      className="ug-card"
                      style={{
                        padding: "28px",
                        borderLeft: `4px solid ${a.color === "cyan" ? "var(--ug-cybercyan)" : "var(--ug-royal)"}`,
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
                              background: a.color === "cyan" ? "var(--ug-cybercyan)" : "var(--ug-royal)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              flexShrink: 0,
                            }}
                          >
                            {a.initials || "DR"}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--ug-cybernavy)", fontSize: "0.98rem" }}>
                            {a.name}
                          </div>
                          <div style={{ fontSize: "0.82rem", color: "var(--ug-slatex-500)", marginTop: "2px" }}>
                            {a.info || a.batch}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Custom Areas */}
            {customAreas && customAreas.length > 0 && (
              <section id="custom-areas" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">06</span>
                  <span className="ug-section-tag">Featured Laboratories</span>
                </div>
                <h2 className="ug-section-title">Specialized Research Centers</h2>
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

            {/* CTA */}
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
                Pursue Doctoral Research in Cybersecurity
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto 32px", fontSize: "1.05rem", lineHeight: 1.6 }}>
                Full-time and part-time doctoral admissions are open twice yearly. Contact prospective faculty supervisors or explore funded fellowship positions.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/contact" className="ug-btn-crimson" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                  Inquire for PhD Admissions
                </Link>
                <Link to="/faculty" className="ug-btn-glass" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                  Meet Doctoral Supervisors
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

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
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
