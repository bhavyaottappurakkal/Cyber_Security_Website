import { useState, useEffect } from "react";
import "./Academics.css";

// ── Default Academics Data ────────────────────────────────────────────────────
export const DEFAULT_ACADEMICS_CONTENT = {
  hero: {
    eyebrow: "Academics · Academic Programmes",
    title: "Under Graduate Programme",
    subtitle:
      "A four-year B.Tech that blends strong computing fundamentals with research, open source, security and a values-driven campus life.",
  },
  heroStats: [
    { id: 1, value: "4 yrs", label: "B.Tech duration" },
    { id: 2, value: "8", label: "Semesters" },
    { id: 3, value: "160+", label: "Credits" },
    { id: 4, value: "95%", label: "Placement record" },
  ],
  studentLife: {
    title: "Student life @Amrita",
    intro: "",
    items: [
      {
        id: 1,
        title: "Clubs & Chapters",
        text: "Coding, robotics, design, music, dance and literary clubs run entirely by students.",
      },
      {
        id: 2,
        title: "Hackathons",
        text: "Round-the-year hackathons and CTFs, with teams travelling to national and global finals.",
      },
      {
        id: 3,
        title: "Sports & Wellness",
        text: "Playgrounds, indoor courts, yoga and meditation sessions as part of campus life.",
      },
      {
        id: 4,
        title: "Service Learning",
        text: "Live-in-labs and community projects that apply technology to real village problems.",
      },
    ],
  },
  pride: {
    title: "Our Pride",
    intro: "Achievements our undergraduates are known for.",
    items: [
      {
        id: 1,
        stat: "#1",
        text: "Ranked team at international Capture The Flag (CTF) competitions",
      },
      {
        id: 2,
        stat: "GSoC",
        text: "Dozens of students selected for Google Summer of Code every year",
      },
      {
        id: 3,
        stat: "ICPC",
        text: "Regular presence at ACM ICPC regional and world finals",
      },
      {
        id: 4,
        stat: "Papers",
        text: "Undergraduates publishing at peer-reviewed international conferences",
      },
    ],
  },
  communities: {
    title: "Student-run Communities",
    intro: "",
    items: [
      {
        id: 1,
        tag: "Cyber security",
        name: "team bi0s",
        text: "team bi0s — the student cyber security research group behind our CTF wins, workshops and security research.",
        href: "https://bi0s.in",
      },
      {
        id: 2,
        tag: "Open source",
        name: "amFOSS",
        text: "amFOSS — the free and open source software community where students learn, mentor and contribute to global projects.",
        href: "https://amfoss.in",
      },
    ],
  },
  scholarships: {
    title: "Scholarships",
    intro: "Making quality education accessible to every deserving student.",
    items: [
      {
        id: 1,
        title: "Merit Scholarship",
        text: "Tuition fee waiver based on rank in the Amrita Entrance Examination (AEEE) / JEE.",
      },
      {
        id: 2,
        title: "Need-based Support",
        text: "Financial assistance for deserving students from economically weaker backgrounds.",
      },
      {
        id: 3,
        title: "Sports & Cultural",
        text: "Concessions for students with outstanding state or national-level achievements.",
      },
      {
        id: 4,
        title: "Government Schemes",
        text: "Guidance to apply for central and state government scholarship schemes.",
      },
    ],
  },
  overseas: {
    title: "Overseas Experience",
    intro: "Spend part of your degree abroad with our international partner universities.",
    dualDegreeTitle: "Dual Degree",
    dualDegreeText:
      "Study the first years at Amrita and complete your degree at a partner university, graduating with degrees from both institutions.",
    dualDegreePartners: [
      { id: 1, name: "University at Buffalo, USA" },
      { id: 2, name: "Arizona State University, USA" },
      { id: 3, name: "University of New Mexico, USA" },
      { id: 4, name: "Vrije Universiteit Amsterdam, Netherlands" },
    ],
    exchangeTitle: "Student Exchange",
    exchangeText:
      "Spend a semester or a summer research internship at a partner university, with credits transferred back to your Amrita degree.",
    exchangeCountries: [
      { id: 1, name: "Germany" },
      { id: 2, name: "France" },
      { id: 3, name: "Italy" },
      { id: 4, name: "Japan" },
      { id: 5, name: "Sweden" },
      { id: 6, name: "Finland" },
    ],
  },
  curriculum: {
    title: "Curriculum",
    intro: "A semester-wise view of the B.Tech Computer Science & Engineering curriculum.",
    years: [
      {
        id: 1,
        year: "Year 1",
        semesters: [
          {
            id: 101,
            name: "Semester 1",
            courses: [
              "Calculus",
              "Problem Solving & Algorithmic Thinking",
              "Computer Programming",
              "Engineering Physics",
              "Fundamentals of Electrical & Electronics",
              "Amrita Values Programme",
            ],
          },
          {
            id: 102,
            name: "Semester 2",
            courses: [
              "Linear Algebra",
              "Object Oriented Programming",
              "Digital Electronics",
              "Engineering Chemistry",
              "Elements of Computing Systems",
              "Glimpses of Indian Culture",
            ],
          },
        ],
      },
      {
        id: 2,
        year: "Year 2",
        semesters: [
          {
            id: 201,
            name: "Semester 3",
            courses: [
              "Discrete Mathematics",
              "Data Structures & Algorithms I",
              "Computer Organisation & Architecture",
              "Probability & Statistics",
              "User Interface Design",
            ],
          },
          {
            id: 202,
            name: "Semester 4",
            courses: [
              "Data Structures & Algorithms II",
              "Operating Systems",
              "Database Management Systems",
              "Theory of Computation",
              "Introduction to AI & Machine Learning",
            ],
          },
        ],
      },
      {
        id: 3,
        year: "Year 3",
        semesters: [
          {
            id: 301,
            name: "Semester 5",
            courses: [
              "Computer Networks",
              "Software Engineering",
              "Compiler Design",
              "Professional Elective I",
              "Live-in-Labs",
            ],
          },
          {
            id: 302,
            name: "Semester 6",
            courses: [
              "Distributed Systems",
              "Cyber Security",
              "Machine Learning",
              "Professional Elective II",
              "Open Elective",
            ],
          },
        ],
      },
      {
        id: 4,
        year: "Year 4",
        semesters: [
          {
            id: 401,
            name: "Semester 7",
            courses: [
              "Cloud Computing",
              "Professional Elective III",
              "Professional Elective IV",
              "Project Phase I",
            ],
          },
          {
            id: 402,
            name: "Semester 8",
            courses: [
              "Project Phase II / Industry Internship",
              "Professional Elective V",
            ],
          },
        ],
      },
    ],
  },
  internships: {
    title: "Internships",
    intro: "Industry experience through Amrita's Corporate and Industry Relations (CIR) team.",
    earliestSemester: 4,
    minWeeks: 4,
    maxWeeks: 24,
    sourceUrl: "https://www.amrita.edu/department/cir/internship-placements/",
    items: [
      {
        id: 1,
        title: "Industry exposure",
        text: "CIR connects students with industry internship opportunities across disciplines and campuses.",
      },
      {
        id: 2,
        title: "Selection",
        text: "Eligibility, academic requirements and selection processes are set by the recruiting organisation. An opportunity does not guarantee an internship offer.",
      },
    ],
  },
  placements: {
    title: "Placements",
    intro: "Career preparation and recruitment support through Corporate and Industry Relations (CIR).",
    note: "Campus- and batch-specific recruiter lists, placement percentages and salary figures are not listed here; refer to the official CIR information for published details.",
    sourceUrl: "https://www.amrita.edu/department/cir/internship-placements/",
    trainingUrl: "https://www.amrita.edu/department/cir/career-competency-development/",
    items: [
      {
        id: 1,
        title: "Career preparation",
        text: "CIR supports career counselling, aptitude and verbal skills training, goal setting and job-search preparation.",
      },
      {
        id: 2,
        title: "Campus recruitment",
        text: "Participating companies assess eligible students across campuses using their stated branch and academic criteria.",
      },
      {
        id: 3,
        title: "Offers & eligibility",
        text: "Recruiter requirements and selection results determine individual offers. Placement opportunities are not a guarantee of employment.",
      },
    ],
  },
  events: {
    title: "Events",
    intro: "Talks, workshops and webinars for undergraduate students.",
    items: [
      {
        id: 1,
        type: "Talk",
        date: "Dec 04, 2026",
        title: "The Future of Systems Programming",
        by: "Guest speaker from industry",
      },
      {
        id: 2,
        type: "Workshop",
        date: "Dec 12, 2026",
        title: "Hands-on Reverse Engineering",
        by: "team bi0s",
      },
      {
        id: 3,
        type: "Webinar",
        date: "Jan 09, 2027",
        title: "Contributing to Open Source in 2027",
        by: "amFOSS",
      },
      {
        id: 4,
        type: "Workshop",
        date: "Jan 22, 2027",
        title: "Applied Machine Learning Bootcamp",
        by: "Department faculty",
      },
    ],
  },
  socialMedia: {
    title: "Social Media",
    intro: "Follow along for campus updates, achievements and announcements.",
    links: [
      {
        id: 1,
        name: "Instagram",
        handle: "@amritauniversity",
        href: "https://www.instagram.com/amritauniversity/",
      },
      {
        id: 2,
        name: "LinkedIn",
        handle: "Amrita Vishwa Vidyapeetham",
        href: "https://www.linkedin.com/school/amrita-vishwa-vidyapeetham/",
      },
      {
        id: 3,
        name: "YouTube",
        handle: "Amrita Vishwa Vidyapeetham",
        href: "https://www.youtube.com/@AmritaVishwaVidyapeetham",
      },
      {
        id: 4,
        name: "Facebook",
        handle: "AmritaUniversity",
        href: "https://www.facebook.com/AmritaUniversity",
      },
    ],
  },
  alumni: {
    title: "Alumni",
    intro: "Where our undergraduates go next.",
    items: [
      {
        id: 1,
        name: "Ananya R.",
        batch: "B.Tech CSE, 2019",
        role: "Software Engineer, Google",
        quote: "The clubs taught me as much as the classrooms — I learned to build, break and ship.",
      },
      {
        id: 2,
        name: "Rahul M.",
        batch: "B.Tech CSE, 2018",
        role: "Security Researcher",
        quote: "Late nights at the lab with the CTF team set the direction of my entire career.",
      },
      {
        id: 3,
        name: "Meera S.",
        batch: "B.Tech CSE, 2020",
        role: "MS, Carnegie Mellon University",
        quote: "Undergraduate research gave me publications and the confidence to pursue graduate school.",
      },
    ],
  },
};

// Helper to normalize stored data with defaults
function normalizeAcademics(raw) {
  if (!raw) return DEFAULT_ACADEMICS_CONTENT;
  return {
    ...DEFAULT_ACADEMICS_CONTENT,
    ...raw,
    hero: { ...DEFAULT_ACADEMICS_CONTENT.hero, ...(raw.hero || {}) },
    heroStats: raw.heroStats || DEFAULT_ACADEMICS_CONTENT.heroStats,
    studentLife: {
      ...DEFAULT_ACADEMICS_CONTENT.studentLife,
      ...(raw.studentLife || {}),
      items: raw.studentLife?.items || (Array.isArray(raw.studentLife) ? raw.studentLife : DEFAULT_ACADEMICS_CONTENT.studentLife.items),
    },
    pride: {
      ...DEFAULT_ACADEMICS_CONTENT.pride,
      ...(raw.pride || {}),
      items: raw.pride?.items || (Array.isArray(raw.pride) ? raw.pride : DEFAULT_ACADEMICS_CONTENT.pride.items),
    },
    communities: {
      ...DEFAULT_ACADEMICS_CONTENT.communities,
      ...(raw.communities || {}),
      items: raw.communities?.items || (Array.isArray(raw.communities) ? raw.communities : DEFAULT_ACADEMICS_CONTENT.communities.items),
    },
    scholarships: {
      ...DEFAULT_ACADEMICS_CONTENT.scholarships,
      ...(raw.scholarships || {}),
      items: raw.scholarships?.items || (Array.isArray(raw.scholarships) ? raw.scholarships : DEFAULT_ACADEMICS_CONTENT.scholarships.items),
    },
    overseas: {
      ...DEFAULT_ACADEMICS_CONTENT.overseas,
      ...(raw.overseas || {}),
      dualDegreePartners: raw.overseas?.dualDegreePartners || raw.dualDegreePartners || DEFAULT_ACADEMICS_CONTENT.overseas.dualDegreePartners,
      exchangeCountries: raw.overseas?.exchangeCountries || raw.exchangeCountries || DEFAULT_ACADEMICS_CONTENT.overseas.exchangeCountries,
    },
    curriculum: {
      ...DEFAULT_ACADEMICS_CONTENT.curriculum,
      ...(raw.curriculum || {}),
      years: raw.curriculum?.years || (Array.isArray(raw.curriculum) ? raw.curriculum : DEFAULT_ACADEMICS_CONTENT.curriculum.years),
    },
    internships: {
      ...DEFAULT_ACADEMICS_CONTENT.internships,
      ...(raw.internships || raw.internship || {}),
      items: raw.internships?.items || raw.internship?.items || DEFAULT_ACADEMICS_CONTENT.internships.items,
    },
    placements: {
      ...DEFAULT_ACADEMICS_CONTENT.placements,
      ...(raw.placements || raw.placement || {}),
      items: raw.placements?.items || raw.placement?.items || DEFAULT_ACADEMICS_CONTENT.placements.items,
    },
    events: {
      ...DEFAULT_ACADEMICS_CONTENT.events,
      ...(raw.events && !Array.isArray(raw.events) ? raw.events : {}),
      items: Array.isArray(raw.events) ? raw.events : (raw.events?.items || DEFAULT_ACADEMICS_CONTENT.events.items),
    },
    socialMedia: {
      ...DEFAULT_ACADEMICS_CONTENT.socialMedia,
      ...(raw.socialMedia || {}),
      links: raw.socialMedia?.links || (Array.isArray(raw.socialMedia) ? raw.socialMedia : DEFAULT_ACADEMICS_CONTENT.socialMedia.links),
    },
    alumni: {
      ...DEFAULT_ACADEMICS_CONTENT.alumni,
      ...(raw.alumni && !Array.isArray(raw.alumni) ? raw.alumni : {}),
      items: Array.isArray(raw.alumni) ? raw.alumni : (raw.alumni?.items || DEFAULT_ACADEMICS_CONTENT.alumni.items),
    },
  };
}

// ── Reusable Section Component ────────────────────────────────────────────────
function UGSection({ id, index, title, intro, children }) {
  return (
    <section id={id} className="ug-section">
      <p className="ug-eyebrow">{index}</p>
      <h2 className="ug-section-title">{title}</h2>
      {intro && <p className="ug-section-intro">{intro}</p>}
      <div className="ug-section-body">{children}</div>
    </section>
  );
}

// ── Academics Main Page ───────────────────────────────────────────────────────
export default function Academics() {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSiteData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.academicsContent) {
          return normalizeAcademics(parsed.academicsContent);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ACADEMICS_CONTENT;
  });

  // Listen to local storage updates and custom updates from Admin
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("adminSiteData");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.academicsContent) {
            setContent(normalizeAcademics(parsed.academicsContent));
          }
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

  const [activeYear, setActiveYear] = useState(() => {
    return content.curriculum?.years?.[0]?.year || "Year 1";
  });

  // Keep activeYear valid if curriculum changes
  useEffect(() => {
    if (content.curriculum?.years?.length > 0) {
      const exists = content.curriculum.years.some((y) => y.year === activeYear);
      if (!exists) {
        setActiveYear(content.curriculum.years[0].year);
      }
    }
  }, [content.curriculum, activeYear]);

  const {
    hero,
    heroStats,
    studentLife,
    pride,
    communities,
    scholarships,
    overseas,
    curriculum,
    internships,
    placements,
    events,
    socialMedia,
    alumni,
  } = content;

  return (
    <div className="academics-page">
      {/* ── Hero ── */}
      <section className="ug-hero">
        <div className="ug-hero-overlay" />
        <div className="container ug-hero-content">
          <p className="ug-eyebrow ug-eyebrow--accent">
            {hero?.eyebrow || "Academics · Academic Programmes"}
          </p>
          <h1 className="ug-hero-title">
            {hero?.title || "Under Graduate Programme"}
          </h1>
          <p className="ug-hero-subtitle">
            {hero?.subtitle ||
              "A four-year B.Tech that blends strong computing fundamentals with research, open source, security and a values-driven campus life."}
          </p>
          {heroStats && heroStats.length > 0 && (
            <dl className="ug-hero-stats">
              {heroStats.map((s) => (
                <div key={s.id || s.label} className="ug-hero-stat">
                  <dt className="ug-hero-stat-label">{s.label}</dt>
                  <dd className="ug-hero-stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ── Page Body ── */}
      <div className="container ug-page-body">

        {/* 01 · Student Life */}
        {studentLife?.items?.length > 0 && (
          <UGSection
            id="student-life"
            index="01"
            title={studentLife.title || "Student life @Amrita"}
            intro={studentLife.intro}
          >
            <ul className="ug-life-list">
              {studentLife.items.map((item) => (
                <li key={item.id || item.title} className="ug-life-item">
                  <p className="ug-item-heading">{item.title}</p>
                  <p className="ug-item-text">{item.text}</p>
                </li>
              ))}
            </ul>
          </UGSection>
        )}

        {/* 02 · Our Pride */}
        {pride?.items?.length > 0 && (
          <UGSection
            id="our-pride"
            index="02"
            title={pride.title || "Our Pride"}
            intro={pride.intro || "Achievements our undergraduates are known for."}
          >
            <div className="ug-pride-grid">
              {pride.items.map((item) => (
                <div key={item.id || item.stat} className="ug-pride-card">
                  <p className="ug-pride-stat">{item.stat}</p>
                  <p className="ug-pride-text">{item.text}</p>
                </div>
              ))}
            </div>
          </UGSection>
        )}

        {/* 03 · 04 · Student-run Communities */}
        {communities?.items?.length > 0 && (
          <section id="communities" className="ug-section">
            <p className="ug-eyebrow">03 · 04</p>
            <h2 className="ug-section-title">
              {communities.title || "Student-run Communities"}
            </h2>
            {communities.intro && (
              <p className="ug-section-intro">{communities.intro}</p>
            )}
            <div className="ug-section-body ug-communities-grid">
              {communities.items.map((c) => (
                <div key={c.id || c.name} className="ug-community-card">
                  <p className="ug-community-tag">{c.tag}</p>
                  <p className="ug-community-name">{c.name}</p>
                  <p className="ug-community-text">{c.text}</p>
                  {c.href && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      Visit {c.name} ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 05 · Scholarships */}
        {scholarships?.items?.length > 0 && (
          <UGSection
            id="scholarships"
            index="05"
            title={scholarships.title || "Scholarships"}
            intro={scholarships.intro || "Making quality education accessible to every deserving student."}
          >
            <div className="ug-scholarships">
              {scholarships.items.map((s) => (
                <div key={s.id || s.title} className="ug-scholarship-row">
                  <p className="ug-item-heading">{s.title}</p>
                  <p className="ug-item-text">{s.text}</p>
                </div>
              ))}
            </div>
          </UGSection>
        )}

        {/* 06 · Overseas Experience */}
        {overseas && (
          <UGSection
            id="overseas"
            index="06"
            title={overseas.title || "Overseas Experience"}
            intro={overseas.intro || "Spend part of your degree abroad with our international partner universities."}
          >
            <div className="ug-overseas-grid">
              <div className="ug-overseas-card">
                <span className="ug-overseas-icon">✈️</span>
                <h3 className="ug-overseas-card-title">
                  {overseas.dualDegreeTitle || "Dual Degree"}
                </h3>
                <p className="ug-item-text">
                  {overseas.dualDegreeText ||
                    "Study the first years at Amrita and complete your degree at a partner university, graduating with degrees from both institutions."}
                </p>
                {overseas.dualDegreePartners?.length > 0 && (
                  <ul className="ug-partner-list">
                    {overseas.dualDegreePartners.map((p) => (
                      <li key={p.id || p.name} className="ug-partner-item">
                        <span className="ug-dot" />
                        {p.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="ug-overseas-card">
                <span className="ug-overseas-icon">🔄</span>
                <h3 className="ug-overseas-card-title">
                  {overseas.exchangeTitle || "Student Exchange"}
                </h3>
                <p className="ug-item-text">
                  {overseas.exchangeText ||
                    "Spend a semester or a summer research internship at a partner university, with credits transferred back to your Amrita degree."}
                </p>
                {overseas.exchangeCountries?.length > 0 && (
                  <div className="ug-country-tags">
                    {overseas.exchangeCountries.map((c) => (
                      <span key={c.id || c.name} className="ug-country-tag">
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </UGSection>
        )}

        {/* 07 · Curriculum */}
        {curriculum?.years?.length > 0 && (
          <UGSection
            id="curriculum"
            index="07"
            title={curriculum.title || "Curriculum"}
            intro={curriculum.intro || "A semester-wise view of the B.Tech Computer Science & Engineering curriculum."}
          >
            <div className="ug-year-tabs">
              {curriculum.years.map((yr) => (
                <button
                  key={yr.id || yr.year}
                  onClick={() => setActiveYear(yr.year)}
                  className={`ug-year-tab${activeYear === yr.year ? " ug-year-tab--active" : ""}`}
                >
                  {yr.year}
                </button>
              ))}
            </div>

            {curriculum.years
              .filter((yr) => yr.year === activeYear)
              .map((yr) => (
                <div key={yr.id || yr.year} className="ug-semesters-grid">
                  {yr.semesters?.map((sem) => (
                    <div key={sem.id || sem.name} className="ug-semester-card">
                      <p className="ug-eyebrow">{sem.name}</p>
                      <ol className="ug-course-list">
                        {sem.courses?.map((course, idx) => (
                          <li key={`${course}-${idx}`} className="ug-course-item">
                            <span className="ug-course-num">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            {course}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              ))}
          </UGSection>
        )}

        {/* 08 · Internships */}
        {internships && (
          <UGSection
            id="internships"
            index="08"
            title={internships.title || "Internships"}
            intro={internships.intro}
          >
            <dl className="ug-internship-stats">
              <div>
                <dt className="ug-dl-label">Earliest start</dt>
                <dd className="ug-dl-value">
                  End of Semester {internships.earliestSemester || 4}
                </dd>
              </div>
              <div>
                <dt className="ug-dl-label">Undergraduate internship duration</dt>
                <dd className="ug-dl-value">
                  {internships.minWeeks || 4}–{internships.maxWeeks || 24} weeks
                </dd>
              </div>
            </dl>
            {internships.items?.length > 0 && (
              <div className="ug-internship-items">
                {internships.items.map((item) => (
                  <div key={item.id || item.title} className="ug-internship-item">
                    <h3 className="ug-item-heading">{item.title}</h3>
                    <p className="ug-item-text">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
            {internships.sourceUrl && (
              <a
                href={internships.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary ug-outline-btn"
              >
                Official internship information ↗
              </a>
            )}
          </UGSection>
        )}

        {/* 09 · Placements */}
        {placements && (
          <UGSection
            id="ug-placements"
            index="09"
            title={placements.title || "Placements"}
            intro={placements.intro}
          >
            {placements.items?.length > 0 && (
              <div className="ug-placements-list">
                {placements.items.map((item) => (
                  <div key={item.id || item.title} className="ug-placement-row">
                    <h3 className="ug-item-heading">{item.title}</h3>
                    <p className="ug-item-text">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
            {placements.note && (
              <p className="ug-placement-note">{placements.note}</p>
            )}
            <div className="ug-placement-links">
              {placements.sourceUrl && (
                <a
                  href={placements.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary ug-outline-btn"
                >
                  Official placement information ↗
                </a>
              )}
              {placements.trainingUrl && (
                <a
                  href={placements.trainingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary ug-outline-btn"
                >
                  Career preparation ↗
                </a>
              )}
            </div>
          </UGSection>
        )}

        {/* 10 · Events */}
        {events?.items?.length > 0 && (
          <UGSection
            id="events"
            index="10"
            title={events.title || "Events"}
            intro={events.intro || "Talks, workshops and webinars for undergraduate students."}
          >
            <ul className="ug-events-list">
              {events.items.map((ev) => (
                <li key={ev.id || ev.title} className="ug-event-item">
                  <span className="ug-event-type">{ev.type}</span>
                  <div className="ug-event-info">
                    <p className="ug-event-title">{ev.title}</p>
                    <p className="ug-event-by">{ev.by}</p>
                  </div>
                  <span className="ug-event-date">📅 {ev.date}</span>
                </li>
              ))}
            </ul>
          </UGSection>
        )}

        {/* 11 · Social Media */}
        {socialMedia?.links?.length > 0 && (
          <UGSection
            id="social-media"
            index="11"
            title={socialMedia.title || "Social Media"}
            intro={socialMedia.intro || "Follow along for campus updates, achievements and announcements."}
          >
            <div className="ug-social-grid">
              {socialMedia.links.map((s) => (
                <a
                  key={s.id || s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ug-social-card"
                >
                  <span>
                    <span className="ug-social-name">{s.name}</span>
                    <span className="ug-social-handle">{s.handle}</span>
                  </span>
                  <span className="ug-social-arrow">↗</span>
                </a>
              ))}
            </div>
          </UGSection>
        )}

        {/* 12 · Alumni */}
        {alumni?.items?.length > 0 && (
          <UGSection
            id="alumni"
            index="12"
            title={alumni.title || "Alumni"}
            intro={alumni.intro || "Where our undergraduates go next."}
          >
            <div className="ug-alumni-grid">
              {alumni.items.map((a) => (
                <figure key={a.id || a.name} className="ug-alumni-card">
                  <span className="ug-quote-icon">❝</span>
                  <blockquote className="ug-alumni-quote">"{a.quote}"</blockquote>
                  <figcaption className="ug-alumni-caption">
                    <span className="ug-alumni-name">{a.name}</span>
                    <span className="ug-alumni-meta">
                      {a.batch} · {a.role}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </UGSection>
        )}

      </div>
    </div>
  );
}
