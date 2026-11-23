import { Link } from "react-router-dom";
import "./Academics.css";

export const DEFAULT_ACADEMICS_CONTENT = {
  hero: {
    eyebrow: "Academics · Undergraduate",
    title: "Under Graduate Programme",
    subtitle:
      "A four-year B.Tech. that blends strong computing fundamentals with research, open source, security, and a values-driven campus life.",
  },
};

export default function Academics() {
  return (
    <div className="cmu-subpage">
      {/* 1. Breadcrumbs */}
      <div className="cmu-sub-breadcrumbs">
        <div className="cmu-sub-wrap">
          <Link to="/">Home</Link>
          <span className="cmu-crumb-sep">/</span>
          <span>Academics</span>
          <span className="cmu-crumb-sep">/</span>
          <span className="cmu-crumb-current">Undergraduate Programs</span>
        </div>
      </div>

      {/* 2. Intro Header (Full Width, No "On This Page" Sidebar) */}
      <section className="cmu-sub-intro">
        <div className="cmu-sub-wrap">
          <h1 className="cmu-sub-h1">Under Graduate Programme</h1>
          <p className="cmu-sub-lead">
            A four-year B.Tech. in Computer Science and Engineering (Cyber Security) that blends strong computing fundamentals with research, open source, security, and a values-driven campus life.
          </p>
          <p className="cmu-sub-body">
            At the Amrita Center for Cybersecurity Systems and Networks (Amritapuri Campus), undergraduate students learn in a Government of India designated Center of Relevance and Excellence (CORE), combining classroom rigor with 24/7 hands-on labs, global competitions, and international dual-degree pathways.
          </p>
        </div>
      </section>

      {/* 3. Band 1 (Grey): Student life @Amrita & Our Pride */}
      <section id="student-life" className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Student life @Amrita &amp; Our Pride</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Student life @Amrita</h3>
              <p>
                Life on campus pairs rigorous academic inquiry with collaborative technical clubs, overnight hackathons, holistic wellness, active ACM/IEEE/SIGSAC student chapters, and real-world rural immersion through Live-in-Labs®.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Our Pride</h3>
              <p>
                Amrita Vishwa Vidyapeetham is accredited with NAAC ‘A++’ Grade, ranked among the World’s Top 100 Universities in THE Impact Rankings, and recognized nationally for student-led cybersecurity breakthroughs, patents, and international awards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Band 2 (White): Student Communities — team bi0s & amFOSS */}
      <section id="communities" className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Technical Communities: Bios &amp; Foss</h2>
          <div className="cmu-col2-grid">
            <div id="bios" className="cmu-col2-card">
              <h3 className="cmu-col2-title">team bi0s (Bios)</h3>
              <p>
                India’s premier student-run cybersecurity research team and #1 ranked Capture The Flag (CTF) team. Undergraduate students train in binary exploitation, reverse engineering, web &amp; mobile security, cryptography, and hardware security from their very first year.
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
                One of India’s leading open-source student collectives, mentoring undergraduates to contribute to global open-source foundations, Google Summer of Code (GSoC), Outreachy, Linux Kernel, and real-world developer tooling.
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

      {/* 5. Band 3 (Grey): Scholarships & Overseas Experience */}
      <section id="scholarships" className="cmu-sub-band cmu-sub-band--grey">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Scholarships &amp; Overseas Experience</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Scholarships</h3>
              <p>
                Merit-based tuition waivers are awarded to top applicants through AEEE and JEE Mains, alongside research travel grants, conference sponsorships, and fellowship support for outstanding undergraduate innovators.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Overseas Experience — Dual Degree &amp; Student Exchange</h3>
              <p>
                <strong>Dual Degree (3+1 / 3+2):</strong> Integrated pathways to earn a B.Tech. from Amrita and an MS from global partner universities in the USA and Europe.<br />
                <strong>Student Exchange:</strong> Semester-abroad and thesis research with Vrije Universiteit Amsterdam, University of L’Aquila, University of Göttingen, SUTD, and partners in Japan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Band 4 (White): 8-Semester Curriculum */}
      <section id="curriculum" className="cmu-sub-band">
        <div className="cmu-sub-wrap">
          <h2 className="cmu-sub-h2">Curriculum (8-Semester B.Tech. CSE — Cyber Security)</h2>
          <div className="cmu-col2-grid">
            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 1–4: Core Computing &amp; Security Foundations</h3>
              <p>
                Programming in C/Python/Java, Discrete Mathematics, Data Structures &amp; Algorithms, Computer Architecture, Operating Systems, Database Management Systems, Computer Networks, and Foundations of Cryptography.
              </p>
            </div>

            <div className="cmu-col2-card">
              <h3 className="cmu-col2-title">Semesters 5–8: Advanced Cybersecurity &amp; AI Defense</h3>
              <p>
                Network &amp; System Security, Secure Software Engineering, Malware Analysis &amp; Reverse Engineering, Cloud &amp; Hypervisor Security, IoT &amp; Cyber-Physical Security, AI for Cybersecurity, Capstone Research Project, and Industry Internship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
