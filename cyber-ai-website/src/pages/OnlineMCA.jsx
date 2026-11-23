import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_ONLINE_MCA_CONTENT,
  getAcademicHeroAnimationClass,
  getAcademicHeroGradientClass,
  normalizeOnlineMCA,
} from "../data/academicsData";
import "./Academics.css";

const MCA_TOC_ITEMS = [
  { num: "01", label: "Program Highlights", target: "highlights" },
  { num: "02", label: "Curriculum", target: "curriculum" },
  { num: "03", label: "Corporate Hiring", target: "placements" },
  { num: "04", label: "Frequently Asked Questions", target: "faqs" },
];

export default function OnlineMCA() {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSiteData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.onlineMcaContent) return normalizeOnlineMCA(parsed.onlineMcaContent);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ONLINE_MCA_CONTENT;
  });

  const [activeSection, setActiveSection] = useState("highlights");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSemTab, setActiveSemTab] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("adminSiteData");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.onlineMcaContent) setContent(normalizeOnlineMCA(parsed.onlineMcaContent));
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

      const sectionIds = ["highlights", "curriculum", "placements", "faqs"];
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

  const { hero, heroStats, highlights, curriculum, placements, faqs, customAreas } = content;

  return (
    <div className="academics-page">
      {/* ── HERO BANNER ── */}
      <section id="top" className="ug-hero-section">
        <div className="ug-hero-viewport">
          <img
            src={hero?.bgImage || "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1920&q=85"}
            alt="Online MCA Cybersecurity"
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

                <h1 className="ug-hero-title">{hero?.title || "Online MCA Programme"}</h1>
                <p className="ug-hero-subtitle">
                  {hero?.subtitle ||
                    "A globally recognized, fully online Master of Computer Applications in Cybersecurity — designed for students and working professionals worldwide."}
                </p>

                <div className="ug-hero-actions">
                  <a href="#curriculum" className="ug-btn-crimson">
                    Explore 4-Semester Curriculum
                  </a>
                  <a href="#highlights" className="ug-btn-glass">
                    Discover Program Highlights
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── TWO-COLUMN MAIN CONTENT ── */}
      <main className="ug-container ug-main-wrap">
        <div className="ug-mobile-jumpbar-wrap">
          <div className="ug-mobile-jumpbar">
            {MCA_TOC_ITEMS.map((item) => (
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
                <span className="ug-sidebar-badge">01–04</span>
              </div>
              <nav className="ug-toc-nav">
                {MCA_TOC_ITEMS.map((item) => (
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

          {/* Main Content Area */}
          <div className="ug-content">
            {/* 01 · Highlights */}
            {highlights && highlights.length > 0 && (
              <section id="highlights" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">01</span>
                  <span className="ug-section-tag">Distinct Advantages</span>
                </div>
                <h2 className="ug-section-title">Why Choose Online MCA in Cybersecurity</h2>
                <p className="ug-section-intro">
                  Learn from wherever you are with flexible weekend schedules, virtual cloud sandboxes, and a degree equivalent in standing to on-campus MCA.
                </p>

                <div className="ug-grid ug-grid--2col">
                  {highlights.map((h) => (
                    <div key={h.id} className="ug-card">
                      {h.image && (
                        <div className="ug-card-img-wrap" style={{ height: "160px", marginBottom: "16px", borderRadius: "8px", overflow: "hidden" }}>
                          <img
                            src={h.image}
                            alt={h.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.parentElement.style.display = "none"; }}
                          />
                        </div>
                      )}
                      <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{h.icon || "⭐"}</div>
                      <h3 className="ug-card-title">{h.title}</h3>
                      <p className="ug-card-text">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 02 · Curriculum */}
            {curriculum && curriculum.length > 0 && (
              <section id="curriculum" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">02</span>
                  <span className="ug-section-tag">Structured Learning</span>
                </div>
                <h2 className="ug-section-title">Four-Semester Curriculum</h2>
                <p className="ug-section-intro">
                  Master fundamentals of computing, network defense, penetration testing, cloud security, and complete an industry capstone project.
                </p>

                <div className="ug-year-tabs" style={{ marginBottom: "24px" }}>
                  {curriculum.map((sem, idx) => (
                    <button
                      key={sem.id || idx}
                      className={`ug-year-tab ${activeSemTab === idx ? "active" : ""}`}
                      onClick={() => setActiveSemTab(idx)}
                    >
                      <span className="ug-year-tab-title">{sem.sem}</span>
                      <span className="ug-year-tab-sub">Courses</span>
                    </button>
                  ))}
                </div>

                {curriculum[activeSemTab] && (
                  <div className="ug-curriculum-panel" style={{ background: "#fff", padding: "28px", borderRadius: "12px", border: "1px solid var(--ug-slatex-200)" }}>
                    <h3 style={{ fontSize: "1.2rem", color: "var(--ug-cybernavy)", margin: "0 0 16px", fontWeight: 700 }}>
                      {curriculum[activeSemTab].sem}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                      {(curriculum[activeSemTab].courses || []).map((c, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 16px",
                            background: "var(--ug-icetint)",
                            borderRadius: "8px",
                            border: "1px solid var(--ug-slatex-200)",
                            fontSize: "0.92rem",
                            color: "var(--ug-cybernavy)",
                            fontWeight: 600,
                          }}
                        >
                          <span style={{ color: "var(--ug-cybercyan)", fontWeight: 700 }}>✓</span>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* 03 · Placements */}
            {placements && placements.length > 0 && (
              <section id="placements" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--royal-tint">03</span>
                  <span className="ug-section-tag">Career Outcomes</span>
                </div>
                <h2 className="ug-section-title">Corporate Hiring &amp; Placements</h2>
                <p className="ug-section-intro">
                  Graduates of our online programs are hired as security analysts, penetration testers, SOC engineers, and compliance consultants across global enterprises.
                </p>

                <div className="ug-grid ug-grid--3col">
                  {placements.map((p) => (
                    <div key={p.id} className="ug-card" style={{ textAlign: "center", padding: "24px" }}>
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.company}
                          style={{ height: "36px", maxWidth: "120px", objectFit: "contain", margin: "0 auto 12px" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      <div style={{ fontWeight: 800, color: "var(--ug-cybernavy)", fontSize: "1.1rem", marginBottom: "4px" }}>
                        {p.company}
                      </div>
                      <div style={{ fontSize: "0.86rem", color: "var(--ug-slatex-500)" }}>{p.role}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 04 · FAQs */}
            {faqs && faqs.length > 0 && (
              <section id="faqs" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">04</span>
                  <span className="ug-section-tag">Admissions &amp; Queries</span>
                </div>
                <h2 className="ug-section-title">Frequently Asked Questions</h2>
                <p className="ug-section-intro">
                  Everything you need to know about eligibility, degree validity, exams, and tuition fees.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {faqs.map((faq) => {
                    const isOpen = openFaq === faq.id;
                    return (
                      <div
                        key={faq.id}
                        style={{
                          background: "#fff",
                          border: "1px solid var(--ug-slatex-200)",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                          style={{
                            width: "100%",
                            padding: "18px 20px",
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "var(--ug-cybernavy)",
                          }}
                        >
                          <span>{faq.q}</span>
                          <span style={{ fontSize: "1.2rem", color: "var(--ug-crimson)" }}>{isOpen ? "−" : "+"}</span>
                        </button>
                        {isOpen && (
                          <div
                            style={{
                              padding: "0 20px 18px",
                              fontSize: "0.94rem",
                              color: "var(--ug-slatex-700)",
                              lineHeight: 1.7,
                              borderTop: "1px solid var(--ug-slatex-100)",
                              paddingTop: "12px",
                            }}
                          >
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Custom Areas */}
            {customAreas && customAreas.length > 0 && (
              <section id="custom-areas" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--cyan-tint">05</span>
                  <span className="ug-section-tag">Program Features</span>
                </div>
                <h2 className="ug-section-title">Specialized Certifications &amp; Labs</h2>
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
                        <span className="ug-stat-badge ug-stat-badge--cyan" style={{ marginBottom: "10px" }}>
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
                background: "linear-gradient(135deg, var(--ug-cybernavy) 0%, #0369a1 100%)",
                borderRadius: "16px",
                padding: "60px 40px",
                textAlign: "center",
                color: "#fff",
                margin: "40px 0",
              }}
            >
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontFamily: "var(--ug-font-serif)", color: "#fff", marginBottom: "16px" }}>
                Begin Your Online MCA in Cybersecurity
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto 32px", fontSize: "1.05rem", lineHeight: 1.6 }}>
                UGC-entitled, NAAC A++ degree. Cohort admissions currently open with flexible fee payment options.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/contact" className="ug-btn-crimson" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                  Apply Online Now
                </Link>
                <Link to="/academics" className="ug-btn-glass" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                  ← Explore All Programs
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
