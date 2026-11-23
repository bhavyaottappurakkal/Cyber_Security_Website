import { Link } from "react-router-dom";
import "./Academics.css";

export default function OnlineMCA() {
  return (
    <div className="cmu-subpage">
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          <span>Academics</span>
          <span className="cmu-crumb-sep">/</span>
          <span className="cmu-crumb-current">Online Programme</span>
        </div>
      </div>

      {/* 2. Intro Header */}
      <section className="cmu-sub-intro">
        <div className="cmu-sub-wrap">
          <h1 className="cmu-sub-h1">Online MCA Programme</h1>
          <p className="cmu-sub-lead">
            A globally recognized, UGC-entitled Online Master of Computer Applications (MCA) in Cybersecurity offered through Amrita Online — designed for domestic and international students as well as working professionals.
          </p>
          <p className="cmu-sub-body">
            Delivered with the academic rigor of Amrita Vishwa Vidyapeetham (NAAC ‘A++’ Grade, World’s Top 100 in THE Impact Rankings) and mentored by faculty at the Center for Cybersecurity Systems and Networks.
          </p>
        </div>
      </section>

      {/* 3. Band 1 (Grey): Program Highlights & Flexibility */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Program Highlights &amp; Learning Experience</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Flexible 2-Year (4-Semester) Online Format</h3>
              <p>
                Interactive live weekend sessions, recorded lectures, virtual cybersecurity labs, and continuous mentorship tailored for working professionals and full-time learners worldwide.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Globally Recognized Degree</h3>
              <p>
                Equivalent to an on-campus postgraduate degree with industry-aligned training in secure software development, cloud defense, ethical hacking, and cyber governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Band 2 (White): Technical Communities */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Technical Communities &amp; Ecosystem</h2>
          <div className="cmu-col2-grid">
            <div id="bios" className="cmu-col2-card">
              <h3 className="cmu-col2-title">team bi0s (Bios)</h3>
              <p>
                Online learners gain exposure to CTF challenges, security workshops, and national cybersecurity initiatives led by Amrita’s top-ranked team bi0s.
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
              <h3 className="cmu-col2-title">amFOSS (Foss)</h3>
              <p>
                Engage with Amrita’s open-source engineering community, collaborative coding projects, and global open-source mentorship programs.
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

      {/* 5. Band 3 (Grey): Eligibility & Career Support */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Eligibility &amp; Financial Support</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Admissions &amp; Eligibility</h3>
              <p>
                Open to graduates from BCA, B.Sc. (CS/IT), B.E./B.Tech., or any bachelor’s degree with Mathematics at 10+2 or graduation level, with dedicated onboarding for international applicants.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Scholarships &amp; Career Advancement</h3>
              <p>
                Flexible semester-wise fee structure, merit scholarships, and dedicated career guidance connecting graduates to cybersecurity engineering, SOC leadership, and cloud security roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Band 4 (White): 4-Semester Curriculum */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Curriculum (4-Semester Online MCA Cybersecurity)</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 1–2: Computing &amp; Network Foundations</h3>
              <p>
                Advanced Data Structures, Operating Systems, Database Security, Computer Networks, Python &amp; Secure Coding, and Applied Cryptography.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 3–4: Cloud, AI Security &amp; Capstone</h3>
              <p>
                Penetration Testing &amp; Vulnerability Assessment, Cloud &amp; DevSecOps Security, AI-Driven Threat Detection, Cyber Law &amp; Compliance, and Industry Capstone Project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
