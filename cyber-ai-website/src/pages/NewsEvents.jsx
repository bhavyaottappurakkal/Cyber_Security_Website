import "./NewsEvents.css";

const news = [
  {
    date: "30 Jul 2026",
    title:
      "Amrita Vishwa Vidyapeetham Reveals How AI is Industrialising Online Scams After Interviews with Insiders and Trafficking Survivors",
    excerpt:
      "Groundbreaking research from Amrita reveals the systematic use of AI in orchestrating large-scale online scams and exploitation networks, based on first-hand accounts from insiders and survivors.",
    tag: "Research",
  },
  {
    date: "28 Jul 2026",
    title:
      "Amrita Vishwa Vidyapeetham Researchers Win Best Paper Award at ACL 2026 Workshop for Study on Generative AI's Moral Advice",
    excerpt:
      "Amrita researchers were recognized at the prestigious ACL 2026 Workshop for their innovative study examining how generative AI systems provide moral guidance and the ethical implications therein.",
    tag: "Achievement",
  },
  {
    date: "20 May 2026",
    title:
      "Campus to the United Nations: amFOSS Student Surendran Selected for UNECE Open Source Assignment",
    excerpt:
      "In a remarkable achievement, Amrita student Surendran from the amFOSS community has been selected to contribute to a United Nations Economic Commission for Europe open-source initiative.",
    tag: "Students",
  },
  {
    date: "14 Dec 2025",
    title:
      "AI Safety Conclave at Amrita Releases White Paper on Ethical and Safe AI for the Global South",
    excerpt:
      "The AI Safety Conclave held at Amrita produced a landmark white paper outlining frameworks for ethical and safe AI development tailored for India and the Global South.",
    tag: "Events",
  },
  {
    date: "09 Jul 2024",
    title:
      "Announcement of Phase III of Student Induction Programme for B.Tech. Batch",
    excerpt:
      "The Center announces the commencement of Phase III of its comprehensive Student Induction Programme for the new B.Tech. batch, designed to acquaint students with the Center's research and culture.",
    tag: "Academics",
  },
];

const events = [
  {
    title: "AI Safety Conclave",
    desc: "High-level symposium addressing safe, ethical, and sovereign AI frameworks for India and the Global South. Features policy discussions, research presentations, and collaborative white paper development.",

    type: "Annual Event",
    tags: ["AI Safety", "Policy", "Ethics"],
  },
  {
    title: "InCTF — India Capture The Flag",
    desc: "India's premier national Capture the Flag (CTF) cybersecurity competition and training program organized by the Center. Open to students across India to test and develop their hacking skills.",
    icon: "🏁",
    type: "Annual Competition",
    tags: ["CTF", "Competition", "Students"],
  },
  {
    title: "ShaktiCon",
    desc: "International cybersecurity conference, trainings, and competition dedicated to empowering women in cybersecurity. Features talks, workshops, and networking opportunities.",
    icon: "⚡",
    type: "Annual Conference",
    tags: ["Women in Cybersecurity", "Conference", "Training"],
  },
];

export default function NewsEvents() {
  return (
    <div className="news-page">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="page-hero-label">News &amp; Events</span>
          <h1>News &amp; Events</h1>
          <p>
            Stay updated with the latest research breakthroughs, achievements,
            and upcoming events at the Center.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Latest Updates</span>
            <h2 className="section-title">Latest News</h2>
            <div className="divider"></div>
          </div>
          <div className="news-list">
            {news.map((n, i) => (
              <div key={i} className="news-item">
                <div className="ni-icon-wrap">
                  <div className="ni-icon">{n.icon}</div>
                  {i < news.length - 1 && <div className="ni-line"></div>}
                </div>
                <div className="ni-content">
                  <div className="ni-meta">
                    <span className="ni-date">📅 {n.date}</span>
                    <span
                      className={`badge ${
                        n.tag === "Achievement"
                          ? "badge-gold"
                          : n.tag === "Students"
                            ? "badge-green"
                            : n.tag === "Events"
                              ? "badge-blue"
                              : "badge-navy"
                      }`}
                    >
                      {n.tag}
                    </span>
                  </div>
                  <h3 className="ni-title">{n.title}</h3>
                  <p className="ni-excerpt">{n.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Events */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Flagship Initiatives</span>
            <h2 className="section-title">
              Flagship Events &amp; Student Initiatives
            </h2>
            <div className="divider"></div>
            <p className="section-subtitle">
              Signature events organized by the Center that bring together the
              global cybersecurity community.
            </p>
          </div>
          <div className="events-grid">
            {events.map((e, i) => (
              <div key={i} className="event-card">
                <div className="ec-top">
                  <div className="ec-icon">{e.icon}</div>
                  <span className="badge badge-blue">{e.type}</span>
                </div>
                <h3 className="ec-title">{e.title}</h3>
                <p className="ec-desc">{e.desc}</p>
                <div className="ec-tags">
                  {e.tags.map((t, j) => (
                    <span key={j} className="ec-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section section-dark">
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
        >
          <h2>Stay Updated</h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              marginTop: "12px",
              fontSize: "1.05rem",
            }}
          >
            Follow the Center's research updates, event announcements, and news.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "32px",
            }}
          >
            <a
              href="mailto:cyber@am.amrita.edu"
              className="btn btn-primary btn-lg"
            >
              Subscribe to Updates
            </a>
            <a href="/contact" className="btn btn-secondary btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
