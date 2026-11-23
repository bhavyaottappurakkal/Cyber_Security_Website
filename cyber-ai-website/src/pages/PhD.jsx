import { Link } from "react-router-dom";
import "./Academics.css";

export default function PhD() {
  return (
    <div className="cmu-subpage">
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          <span>Academics</span>
          <span className="cmu-crumb-sep">/</span>
          <span className="cmu-crumb-current">PhD Programme</span>
        </div>
      </div>

      {/* 2. Intro Header */}
      <section className="cmu-sub-intro">
        <div className="cmu-sub-wrap">
          <h1 className="cmu-sub-h1">Doctoral Programme (Ph.D.)</h1>
          <p className="cmu-sub-lead">
            A research-intensive Ph.D. in Cyber Security Systems &amp; Networks advancing Agentic AI Systems, Physical AI, Sovereign AI Infrastructure, Cloud Trust Modeling, Cryptography, and Critical Infrastructure Protection.
          </p>
          <p className="cmu-sub-body">
            Doctoral scholars work closely with faculty mentors at Amrita Center for Cybersecurity Systems and Networks on high-impact national and international grants, publishing in premier journals and conferences.
          </p>
        </div>
      </section>

      {/* 3. Band 1 (Grey): Core Doctoral Research Areas */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Doctoral Research Focus Areas</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Agentic AI, Physical AI &amp; Sovereign AI</h3>
              <p>
                Autonomous cyber defense agents, explainable human-AI teaming, embodied intelligence for robotics and autonomous systems, and privacy-preserving sovereign AI platforms.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Cloud, Cryptography, IoT &amp; Healthcare Security</h3>
              <p>
                Hypervisor-level Security Enabled Data Objects (SEDO), formal trust models, Boolean functions &amp; Reed-Muller cryptanalysis, IoT security, automotive infotainment security, and implantable medical device defense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Band 2 (White): Research Collectives */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Research Collectives &amp; Labs</h2>
          <div className="cmu-col2-grid">
            <div id="bios" className="cmu-col2-card">
              <h3 className="cmu-col2-title">team bi0s (Bios)</h3>
              <p>
                Doctoral researchers mentor and collaborate with team bi0s on zero-day vulnerability discovery, firmware/hardware security, and national cyber defense exercises.
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
                Open-source research prototypes, reproducible security benchmarks, and large-scale distributed analytics tooling built in partnership with amFOSS.
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

      {/* 5. Band 3 (Grey): Funding, Fellowships & Global Collaboration */}
      <section className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Fellowships &amp; Global Collaborations</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Funded Fellowships &amp; Government Grants</h3>
              <p>
                Full-time doctoral fellowships supported through institutional scholarships and sponsored R&amp;D projects with ISRO, DST, and TIFAC – Mission REACH.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">International Joint Supervision &amp; Mobility</h3>
              <p>
                Co-advised doctoral pathways and research visits with Vrije Universiteit (VU) Amsterdam, Technical University of Vienna (Austria), University of Göttingen, and leading global labs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Band 4 (White): Doctoral Roadmap */}
      <section className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Doctoral Milestone Roadmap</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Coursework &amp; Qualifying Examination</h3>
              <p>
                Advanced doctoral seminars in research methodology, formal verification, cryptography, and AI security, followed by comprehensive qualifying exams and research proposal defense.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Publications &amp; Dissertation Defense</h3>
              <p>
                Original contributions published in top-tier IEEE/ACM journals and conferences, culminating in the doctoral dissertation and public defense.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
