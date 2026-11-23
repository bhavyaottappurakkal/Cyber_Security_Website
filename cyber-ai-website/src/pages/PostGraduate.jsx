import { Link } from "react-router-dom";
import "./Academics.css";

export default function PostGraduate() {
  return (
    <div className="cmu-subpage">
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          <span>Academics</span>
          <span className="cmu-crumb-sep">/</span>
          <span className="cmu-crumb-current">Post Graduate Programme</span>
        </div>
      </div>

      {/* 2. Intro Header */}
      <section className="cmu-sub-intro">
        <div className="cmu-sub-wrap">
          <h1 className="cmu-sub-h1">Post Graduate Programme</h1>
          <p className="cmu-sub-lead">
            A 2-year M.Tech. in Cyber Security Systems &amp; Networks and M.C.A. in Cyber Security offering advanced specialization in systems security, network forensics, cloud security, and AI defense.
          </p>
          <p className="cmu-sub-body">
            Designed at the Amrita Center for Cybersecurity Systems and Networks (Amritapuri Campus), our postgraduate programs combine deep theoretical rigor with sponsored research laboratories, international dual-degree pathways, and year-long industry internships.
          </p>
        </div>
      </section>

      {/* 3. Band 1 (Grey): Programmes & Specializations */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Postgraduate Programmes &amp; Specializations</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">M.Tech. in Cyber Security Systems &amp; Networks</h3>
              <p>
                A 2-year (4-semester, 80+ credit) engineering degree focused on Systems &amp; Kernel Security, Formal Trust Modeling, Cloud &amp; Hypervisor Architecture, Cryptography, and AI-Driven Threat Intelligence.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">M.C.A. in Cyber Security</h3>
              <p>
                Master of Computer Applications with a dedicated specialization in cybersecurity engineering, secure enterprise architecture, application security, and digital forensics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Band 2 (White): Research Labs & Communities */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Research Labs &amp; Technical Communities</h2>
          <div className="cmu-col2-grid">
            <div id="bios" className="cmu-col2-card">
              <h3 className="cmu-col2-title">team bi0s &amp; Security Research Labs</h3>
              <p>
                Postgraduate scholars collaborate with India’s #1 ranked CTF team (team bi0s) and dedicated Center labs on hypervisor security (SEDO), automotive &amp; IoT defense, and sovereign AI infrastructure.
              </p>
              <a
                href="https://bi0s.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="cmu-sub-link"
              >
                Visit team bi0s (bi0s.in) →
              </a>
            </div>

            <div id="foss" className="cmu-col2-card">
              <h3 className="cmu-col2-title">amFOSS &amp; Open-Source Systems</h3>
              <p>
                Opportunities to build and maintain open-source security tooling, distributed big-data analytics frameworks, and cloud-native defense platforms alongside amFOSS contributors.
              </p>
              <a
                href="https://amfoss.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="cmu-sub-link"
              >
                Visit amFOSS (amfoss.in) →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Band 3 (Grey): Fellowships & International Dual Degrees */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Fellowships &amp; International Dual Degrees</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">GATE Scholarships &amp; Research Fellowships</h3>
              <p>
                GATE-qualified M.Tech. scholars receive AICTE/institutional stipends, alongside funded project assistantships supported by ISRO, DST, and TIFAC – Mission REACH.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">International Dual-Degree &amp; Exchange</h3>
              <p>
                <strong>Dual Degree Master’s:</strong> Complete your second year and thesis research at Vrije Universiteit (VU) Amsterdam, Netherlands or University of L’Aquila, Italy.<br />
                <strong>Research Exchange:</strong> Collaborative placements with University of Göttingen (Germany) and SUTD (Singapore).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Band 4 (White): 4-Semester Curriculum */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Curriculum (4-Semester M.Tech. Cyber Security)</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 1–2: Core Security &amp; Systems</h3>
              <p>
                Mathematical Foundations of Cryptography, Secure Operating Systems &amp; Kernel Internals, Network Security &amp; Forensics, Cloud Computing &amp; Virtualization Security, and AI for Cyber Defense.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 3–4: Thesis Research &amp; Industry Internship</h3>
              <p>
                Specialized electives in Agentic AI Security, Automotive &amp; Healthcare Security, Master’s Thesis Dissertation, and 6-to-12 month R&amp;D internships with global technology and cybersecurity leaders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
