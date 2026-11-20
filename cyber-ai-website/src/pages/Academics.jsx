import { useState, useEffect, useRef, useCallback } from "react";
import { getAcademicHeroAnimationClass, getAcademicHeroGradientClass } from "../data/academicsData";
import "./Academics.css";

// ── Default Academics Data ────────────────────────────────────────────────────
export const DEFAULT_ACADEMICS_CONTENT = {
  hero: {
    eyebrow: "Academics · Academic Programmes",
    title: "Under Graduate Programme",
    subtitle:
      "A four-year B.Tech that blends strong computing fundamentals with research, open source, security and a values-driven campus life.",
    animation: "ken-burns",
    gradient: "crimson",
    slideInterval: 6500,
  },
  heroStats: [
    { id: 1, value: "4 yrs", label: "B.Tech Duration", badge: "UG", badgeStyle: "crimson" },
    { id: 2, value: "8", label: "Semesters", badge: "SEM", badgeStyle: "cyan" },
    { id: 3, value: "160+", label: "Credits", badge: "CR", badgeStyle: "royal" },
    { id: 4, value: "95%", label: "Placement Record", badge: "CIR", badgeStyle: "crimson", valueStyle: "crimson" },
  ],
  studentLife: {
    title: "Student life @Amrita",
    intro:
      "Life on campus pairs rigorous academic inquiry with collaborative technical clubs, overnight hackathons, holistic wellness, and real-world rural immersion.",
    items: [
      {
        id: 1,
        title: "Clubs & Chapters",
        text: "Active student chapters of ACM, IEEE, SIGSAC, and student-led research collectives fostering peer mentorship from day one.",
        tagColor: "crimson",
        iconStyle: "crimson",
      },
      {
        id: 2,
        title: "Hackathons",
        text: "Year-round national CTFs, cyber-defense wargames, and rapid prototyping hackathons hosted on campus.",
        tagColor: "cyan",
        iconStyle: "cyan",
      },
      {
        id: 3,
        title: "Sports & Wellness",
        text: "Outdoor courts, indoor athletics, yoga, and Integrated Amrita Meditation (IAM®) for mental clarity and physical vitality.",
        tagColor: "royal",
        iconStyle: "royal",
      },
      {
        id: 4,
        title: "Service Learning",
        text: "Credit-bearing Live-in-Labs® field immersion connecting classroom theory with humanitarian technology deployment.",
        tagColor: "crimson",
        iconStyle: "crimson",
      },
    ],
  },
  pride: {
    title: "Our Pride",
    intro:
      "Undergraduate researchers and competitive programmers consistently place Amrita on the global map across cybersecurity, open source, and algorithmic computing.",
    items: [
      {
        id: 1,
        tag: "CTF RANKING #1",
        tagStyle: "crimson",
        source: "CTFTime",
        title: "#1 Ranked team at international CTF competitions",
        text: "Consistently ranked India's #1 cybersecurity team on CTFTime, competing in DEF CON CTF, PlaidCTF, and global cyber-defense finals.",
      },
      {
        id: 2,
        tag: "OPEN SOURCE",
        tagStyle: "cyan",
        source: "Google",
        title: "GSoC selections",
        text: "Among the highest Google Summer of Code selection rates worldwide every year, contributing to Linux, KDE, Wikimedia, and security foundations.",
      },
      {
        id: 3,
        tag: "ALGORITHMS",
        tagStyle: "royal",
        source: "ACM ICPC",
        title: "ACM ICPC regional & world finals",
        text: "Multiple appearances at the ICPC World Finals and host venue for the prestigious ACM ICPC Asia Regional Contests.",
      },
      {
        id: 4,
        tag: "PUBLICATIONS",
        tagStyle: "crimson",
        source: "IEEE / ACM",
        title: "Peer-reviewed international conference papers",
        text: "Undergraduate co-authors publishing novel vulnerability research, formal verification, and AI security papers at top-tier venues.",
      },
    ],
  },
  communities: {
    title: "Flagship Research & Open-Source Collectives",
    intro:
      "Two internationally acclaimed student-run communities anchored at Amrita mentor undergraduates from their very first semester.",
    items: [
      {
        id: 1,
        tag: "03 · CYBERSECURITY",
        est: "Est. 2007",
        name: "team bi0s",
        text: "Cyber security research group focusing on binary exploitation, reverse engineering, cryptography, web security, hardware security, and digital forensics. Organizers of InCTF & InCTFj.",
        url: "bi0s.in",
        href: "https://bi0s.in",
        linkLabel: "Visit team bi0s",
        variant: "dark",
      },
      {
        id: 2,
        tag: "04 · OPEN SOURCE",
        est: "FOSS @ Amrita",
        name: "amFOSS",
        text: "Free and open source software community empowering undergraduates to build production-grade software, contribute to global upstream repositories, and excel in GSoC and Outreachy.",
        url: "amfoss.in",
        href: "https://amfoss.in",
        linkLabel: "Visit amFOSS",
        variant: "light",
      },
    ],
  },
  scholarships: {
    title: "Scholarships",
    intro:
      "Substantial tuition waivers and financial assistance ensure deserving students can pursue engineering and cybersecurity research without financial barriers.",
    items: [
      {
        id: 1,
        label: "UP TO 100% TUITION WAIVER",
        labelColor: "crimson",
        title: "Merit Scholarship via AEEE/JEE",
        text: "Awarded at admission based on top ranks in Amrita Entrance Examination – Engineering (AEEE) or JEE Main percentiles, renewable annually based on CGPA.",
        hoverColor: "crimson",
      },
      {
        id: 2,
        label: "EQUITY & ACCESS",
        labelColor: "cyan",
        title: "Need-based Support",
        text: "Dedicated fee concessions and institutional bursaries for talented students from economically disadvantaged backgrounds.",
        hoverColor: "cyan",
      },
      {
        id: 3,
        label: "EXCELLENCE BEYOND CLASSROOM",
        labelColor: "royal",
        title: "Sports & Cultural",
        text: "Special scholarships recognizing national and state-level achievers in athletics, classical arts, and cultural representation.",
        hoverColor: "royal",
      },
      {
        id: 4,
        label: "NATIONAL PORTALS",
        labelColor: "cyan",
        title: "Government Schemes",
        text: "Full facilitation for AICTE Pragati, Saksham, National Scholarship Portal (NSP), and central/state merit-cum-means fellowships.",
        hoverColor: "cyan",
      },
    ],
  },
  overseas: {
    title: "Overseas Experience",
    intro:
      "Study abroad through integrated Dual Degree pathways, semester exchanges, and funded international research internships across North America, Europe, and Asia.",
    dualDegreeTitle: "Dual Degree Partner Universities",
    dualDegreePartners: [
      { id: 1, name: "University at Buffalo", location: "SUNY · New York, USA" },
      { id: 2, name: "Arizona State University", location: "Tempe · Arizona, USA" },
      { id: 3, name: "University of New Mexico", location: "Albuquerque · NM, USA" },
      { id: 4, name: "Vrije Universiteit Amsterdam", location: "Amsterdam · Netherlands" },
    ],
    exchangeTitle: "Student Exchange Destinations",
    exchangeSubtext:
      "Tuition-waived bilateral semester exchange & thesis fellowships across partner institutions:",
    exchangeCountries: [
      { id: 1, name: "🇩🇪 Germany" },
      { id: 2, name: "🇫🇷 France" },
      { id: 3, name: "🇮🇹 Italy" },
      { id: 4, name: "🇯🇵 Japan" },
      { id: 5, name: "🇸🇪 Sweden" },
      { id: 6, name: "🇫🇮 Finland" },
    ],
    exchangeFootnote: "Coordinated via Amrita Center for International Programs (ACIP)",
  },
  curriculum: {
    title: "Curriculum",
    intro:
      "Structured across four progressive years—building mathematical & hardware foundations in Year 1, systems & security cores in Years 2–3, and specialized cybersecurity tracks & capstone research in Year 4.",
    years: [
      {
        id: 1,
        year: "Year 1",
        semLabel: "(Sem 1 & 2)",
        semesters: [
          {
            id: 101,
            name: "Semester 1",
            credits: "21 Credits · Foundation",
            courses: [
              { code: "19MAT101", name: "Calculus" },
              { code: "19CSE100", name: "Problem Solving & Algorithmic Thinking" },
              { code: "19CSE102", name: "Computer Programming" },
              { code: "19PHY101", name: "Engineering Physics" },
              { code: "19EEE111", name: "Fundamentals of Electrical & Electronics" },
              { code: "19AVP103", name: "Amrita Values Programme" },
            ],
          },
          {
            id: 102,
            name: "Semester 2",
            credits: "22 Credits · Computing Core",
            courses: [
              { code: "19MAT112", name: "Linear Algebra" },
              { code: "19CSE111", name: "Object Oriented Programming" },
              { code: "19ECE111", name: "Digital Electronics" },
              { code: "19CHY101", name: "Engineering Chemistry" },
              { code: "19CSE113", name: "Elements of Computing Systems" },
              { code: "19CUL111", name: "Glimpses of Indian Culture" },
            ],
          },
        ],
      },
      {
        id: 2,
        year: "Year 2",
        semLabel: "(Sem 3 & 4)",
        semesters: [
          {
            id: 201,
            name: "Semester 3",
            credits: "22 Credits · Systems & Structures",
            courses: [
              { code: "19MAT205", name: "Discrete Mathematics & Graph Theory" },
              { code: "19CSE201", name: "Data Structures & Algorithms" },
              { code: "19CSE202", name: "Computer Organization & Architecture" },
              { code: "19CYS201", name: "Foundations of Cybersecurity & Linux Internals" },
              { code: "19CSE204", name: "Database Management Systems" },
              { code: "19AVP201", name: "Amrita Values Programme II" },
            ],
          },
          {
            id: 202,
            name: "Semester 4",
            credits: "22 Credits · Networks & Crypto",
            courses: [
              { code: "19MAT213", name: "Probability, Statistics & Number Theory" },
              { code: "19CSE211", name: "Design & Analysis of Algorithms" },
              { code: "19CSE212", name: "Operating Systems & Kernel Programming" },
              { code: "19CSE213", name: "Computer Networks & Protocol Security" },
              { code: "19CYS211", name: "Applied Cryptography" },
              { code: "19SSK211", name: "Soft Skills & Technical Communication" },
            ],
          },
        ],
      },
      {
        id: 3,
        year: "Year 3",
        semLabel: "(Sem 5 & 6)",
        semesters: [
          {
            id: 301,
            name: "Semester 5",
            credits: "21 Credits · Offensive & Defensive Security",
            courses: [
              { code: "19CSE301", name: "Theory of Computation & Formal Languages" },
              { code: "19CYS301", name: "Binary Exploitation & Reverse Engineering" },
              { code: "19CYS302", name: "Web & Cloud Application Security" },
              { code: "19CSE304", name: "Machine Learning for Cyber Defense" },
              { code: "19CYS331", name: "Professional Elective I (Malware Analysis)" },
              { code: "19LIV390", name: "Live-in-Labs® Service Learning Project" },
            ],
          },
          {
            id: 302,
            name: "Semester 6",
            credits: "21 Credits · Distributed & Hardware Security",
            courses: [
              { code: "19CSE311", name: "Compiler Design & Program Analysis" },
              { code: "19CYS311", name: "Network Defense, SOC & Incident Response" },
              { code: "19CYS312", name: "Embedded Systems & IoT Security" },
              { code: "19CYS341", name: "Professional Elective II (Digital Forensics)" },
              { code: "19CYS342", name: "Professional Elective III (Blockchain Security)" },
              { code: "19CYS398", name: "Undergraduate Security Research Seminar" },
            ],
          },
        ],
      },
      {
        id: 4,
        year: "Year 4",
        semLabel: "(Sem 7 & 8)",
        semesters: [
          {
            id: 401,
            name: "Semester 7",
            credits: "18 Credits · Specialization & Thesis I",
            courses: [
              { code: "19CYS401", name: "Cyber Threat Intelligence & Penetration Testing" },
              { code: "19CYS402", name: "Secure Software Engineering & DevSecOps" },
              { code: "19CYS451", name: "Professional Elective IV (Zero-Trust Architecture)" },
              { code: "19CYS452", name: "Open Elective (Cyber Law, Privacy & Ethics)" },
              { code: "19CYS495", name: "B.Tech Capstone Project · Phase I" },
            ],
          },
          {
            id: 402,
            name: "Semester 8",
            credits: "14 Credits · Capstone / Industry Track",
            courses: [
              {
                code: "19CYS499",
                name: "B.Tech Capstone Thesis · Phase II (or Full-Semester CIR Industry / Overseas Research Internship)",
              },
              { code: "19CYS461", name: "Advanced Topics in Post-Quantum & AI Security" },
              { code: "19CYS490", name: "Comprehensive Viva-Voce & Publication Portfolio" },
            ],
          },
        ],
      },
    ],
  },
  internships: {
    title: "Internships",
    intro:
      "Facilitated through Amrita's Directorate of Corporate & Industry Relations (CIR), connecting undergraduates with global cybersecurity labs, product companies, and research institutions.",
    earliestSemester: 4,
    minWeeks: 4,
    maxWeeks: 24,
    sourceUrl: "https://www.amrita.edu/ahead/cir/",
    details: [
      {
        id: 1,
        label: "Industry Exposure:",
        text: "Students intern across product security teams, threat intelligence units, cloud infrastructure providers, and academic research labs in India and abroad.",
      },
      {
        id: 2,
        label: "Selection & Eligibility Notes:",
        text: "Internships are allocated through merit-based technical assessments, coding/CTF evaluations, and faculty research recommendations in accordance with CIR guidelines.",
      },
    ],
  },
  placements: {
    title: "Placements",
    intro:
      "A dedicated placement and career competency framework prepares graduates for high-impact roles in security engineering, systems architecture, and software development.",
    note: "Campus- and batch-specific recruiter lists, placement percentages and salary figures are not listed here; refer to the official CIR information for published details.",
    sourceUrl: "https://www.amrita.edu/placements/",
    trainingUrl: "https://www.amrita.edu/ahead/cir/",
    items: [
      {
        id: 1,
        step: "STEP 01",
        stepColor: "cyan",
        title: "Career Preparation",
        text: "Structured quantitative aptitude, systems design, mock technical interviews, and domain-specific security workshops led by CIR mentors.",
        hoverColor: "cyan",
      },
      {
        id: 2,
        step: "STEP 02",
        stepColor: "crimson",
        title: "Campus Recruitment",
        text: "Over 200+ global technology, cybersecurity, FinTech, and R&D organizations recruit annually across Super-Dream, Dream, and Core tiers.",
        hoverColor: "crimson",
      },
      {
        id: 3,
        step: "STEP 03",
        stepColor: "royal",
        title: "Offers & Eligibility",
        text: "Transparent single-offer and dream-upgrade policies ensuring equitable opportunities for all eligible graduating students.",
        hoverColor: "royal",
      },
    ],
  },
  events: {
    title: "Events",
    intro:
      "Upcoming distinguished talks, hands-on security workshops, and open-source webinars hosted by the Centre and student chapters.",
    items: [
      {
        id: 1,
        type: "Distinguished Talk",
        typeStyle: "default",
        date: "DEC 04, 2026",
        dateStyle: "crimson",
        location: "Main University Auditorium",
        title: "Hardware Root-of-Trust & Post-Quantum Cryptography",
      },
      {
        id: 2,
        type: "Hands-on Workshop",
        typeStyle: "cyan",
        date: "DEC 18, 2026",
        dateStyle: "cyan",
        location: "team bi0s Lab",
        title: "Binary Exploitation & Kernel Fuzzing Bootcamp",
      },
      {
        id: 3,
        type: "Webinar",
        typeStyle: "royal",
        date: "JAN 09, 2027",
        dateStyle: "royal",
        location: "amFOSS & ACIP",
        title: "Preparing for GSoC & International Dual Degree Applications",
      },
      {
        id: 4,
        type: "Symposium",
        typeStyle: "crimson",
        date: "JAN 22, 2027",
        dateStyle: "crimson",
        location: "Centre for Cybersecurity",
        title: "AI-Driven Threat Intelligence & Autonomous Cyber Defense",
      },
    ],
  },
  socialMedia: {
    title: "Social Media",
    intro:
      "Follow daily campus life, CTF victories, research milestones, and admission announcements across Amrita's verified channels.",
    links: [
      {
        id: 1,
        platform: "INSTAGRAM",
        platformColor: "crimson",
        name: "@amritauniversity",
        desc: "Campus stories, fests & student spotlights ↗",
        href: "https://www.instagram.com/amritauniversity/",
        hoverColor: "crimson",
      },
      {
        id: 2,
        platform: "LINKEDIN",
        platformColor: "cyan",
        name: "Amrita University",
        desc: "Research breakthroughs, alumni & placements ↗",
        href: "https://www.linkedin.com/school/amrita-vishwa-vidyapeetham-official/",
        hoverColor: "cyan",
      },
      {
        id: 3,
        platform: "YOUTUBE",
        platformColor: "crimson",
        name: "Amrita Official",
        desc: "Keynotes, webinars & lab walkthroughs ↗",
        href: "https://www.youtube.com/@AmritaUniversity",
        hoverColor: "crimson",
      },
      {
        id: 4,
        platform: "FACEBOOK",
        platformColor: "royal",
        name: "Amrita Vishwa Vidyapeetham",
        desc: "Community updates & campus events ↗",
        href: "https://www.facebook.com/AmritaUniversity/",
        hoverColor: "royal",
      },
    ],
  },
  alumni: {
    title: "Alumni",
    intro: "Where our undergraduates go next.",
    items: [
      {
        id: 1,
        initials: "AR",
        batchStyle: "crimson",
        batch: "CLASS OF 2019",
        name: "Ananya R.",
        meta: "B.Tech CSE, 2019 · Software Engineer, Google",
        quote:
          "Starting open-source contributions in my first year with amFOSS gave me the confidence to build large-scale distributed systems. The peer mentorship on campus shaped my entire engineering career.",
        avatarStyle: "crimson",
      },
      {
        id: 2,
        initials: "RM",
        batchStyle: "cyan",
        batch: "CLASS OF 2018",
        name: "Rahul M.",
        meta: "B.Tech CSE, 2018 · Security Researcher",
        quote:
          "Competing in international CTFs with team bi0s taught me how real-world systems break and how to defend them rigorously. That hands-on lab culture is unmatched anywhere in the country.",
        avatarStyle: "dark",
      },
      {
        id: 3,
        initials: "MS",
        batchStyle: "royal",
        batch: "CLASS OF 2020",
        name: "Meera S.",
        meta: "B.Tech CSE, 2020 · MS, Carnegie Mellon University",
        quote:
          "Faculty mentorship in formal methods and systems security directly paved the way for my graduate research at CMU. Amrita combines deep technical rigor with genuine human values.",
        avatarStyle: "royal",
      },
    ],
  },
};

// ── Normalize ─────────────────────────────────────────────────────────────────
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
      items:
        raw.studentLife?.items ||
        (Array.isArray(raw.studentLife)
          ? raw.studentLife
          : DEFAULT_ACADEMICS_CONTENT.studentLife.items),
    },
    pride: {
      ...DEFAULT_ACADEMICS_CONTENT.pride,
      ...(raw.pride || {}),
      items:
        raw.pride?.items ||
        (Array.isArray(raw.pride)
          ? raw.pride
          : DEFAULT_ACADEMICS_CONTENT.pride.items),
    },
    communities: {
      ...DEFAULT_ACADEMICS_CONTENT.communities,
      ...(raw.communities || {}),
      items:
        raw.communities?.items ||
        (Array.isArray(raw.communities)
          ? raw.communities
          : DEFAULT_ACADEMICS_CONTENT.communities.items),
    },
    scholarships: {
      ...DEFAULT_ACADEMICS_CONTENT.scholarships,
      ...(raw.scholarships || {}),
      items:
        raw.scholarships?.items ||
        (Array.isArray(raw.scholarships)
          ? raw.scholarships
          : DEFAULT_ACADEMICS_CONTENT.scholarships.items),
    },
    overseas: {
      ...DEFAULT_ACADEMICS_CONTENT.overseas,
      ...(raw.overseas || {}),
      dualDegreePartners:
        raw.overseas?.dualDegreePartners ||
        raw.dualDegreePartners ||
        DEFAULT_ACADEMICS_CONTENT.overseas.dualDegreePartners,
      exchangeCountries:
        raw.overseas?.exchangeCountries ||
        raw.exchangeCountries ||
        DEFAULT_ACADEMICS_CONTENT.overseas.exchangeCountries,
    },
    curriculum: {
      ...DEFAULT_ACADEMICS_CONTENT.curriculum,
      ...(raw.curriculum || {}),
      years:
        raw.curriculum?.years ||
        (Array.isArray(raw.curriculum)
          ? raw.curriculum
          : DEFAULT_ACADEMICS_CONTENT.curriculum.years),
    },
    internships: {
      ...DEFAULT_ACADEMICS_CONTENT.internships,
      ...(raw.internships || raw.internship || {}),
    },
    placements: {
      ...DEFAULT_ACADEMICS_CONTENT.placements,
      ...(raw.placements || raw.placement || {}),
      items:
        raw.placements?.items ||
        raw.placement?.items ||
        DEFAULT_ACADEMICS_CONTENT.placements.items,
    },
    events: {
      ...DEFAULT_ACADEMICS_CONTENT.events,
      ...(raw.events && !Array.isArray(raw.events) ? raw.events : {}),
      items: Array.isArray(raw.events)
        ? raw.events
        : raw.events?.items || DEFAULT_ACADEMICS_CONTENT.events.items,
    },
    socialMedia: {
      ...DEFAULT_ACADEMICS_CONTENT.socialMedia,
      ...(raw.socialMedia || {}),
      links:
        raw.socialMedia?.links ||
        (Array.isArray(raw.socialMedia)
          ? raw.socialMedia
          : DEFAULT_ACADEMICS_CONTENT.socialMedia.links),
    },
    alumni: {
      ...DEFAULT_ACADEMICS_CONTENT.alumni,
      ...(raw.alumni && !Array.isArray(raw.alumni) ? raw.alumni : {}),
      items: Array.isArray(raw.alumni)
        ? raw.alumni
        : raw.alumni?.items || DEFAULT_ACADEMICS_CONTENT.alumni.items,
    },
  };
}

// ── Slide data ────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=85",
    alt: "Cybersecurity Operations and Server Infrastructure Lab",
    gradientClass: "ug-hero-gradient-1",
    label: "01 / 04 · Network Defense & Systems Lab",
  },
  {
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=85",
    alt: "Cybersecurity Systems & Network Operations Lab",
    gradientClass: "ug-hero-gradient-2",
    label: "02 / 04 · Cybersecurity & CTF Labs",
  },
  {
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85",
    alt: "Undergraduate Students Collaborating on Open Source & Security",
    gradientClass: "ug-hero-gradient-3",
    label: "03 / 04 · Open Source & Collaboration",
  },
  {
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=85",
    alt: "Amrita Engineering Graduation & Academic Excellence",
    gradientClass: "ug-hero-gradient-4",
    label: "04 / 04 · Academic & Global Excellence",
  },
];

const CAMPUS_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1400&q=80",
    alt: "Clubs and Technical Chapters",
    tag: "PILLAR 01 · CLUBS & CHAPTERS",
    tagStyle: "crimson",
    title: "Peer-Mentored Technical Clubs & Chapters",
    desc: "Late-evening research sprints, IEEE & ACM student chapters, and hands-on hardware/security labs.",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    alt: "National Hackathons and Capture The Flag",
    tag: "PILLAR 02 · HACKATHONS",
    tagStyle: "cyan",
    title: "InCTF & 36-Hour National Hackathons",
    desc: "Students organize and compete in India's premier cybersecurity Capture-The-Flag and product buildathons.",
  },
  {
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80",
    alt: "Sports and Integrated Wellness",
    tag: "PILLAR 03 · SPORTS & WELLNESS",
    tagStyle: "royal",
    title: "Integrated Amrita Meditation & Athletics",
    desc: "Balanced residential living with coastal sports arenas, yoga, and Integrated Amrita Meditation (IAM®).",
  },
  {
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80",
    alt: "Live-in-Labs Service Learning",
    tag: "PILLAR 04 · SERVICE LEARNING",
    tagStyle: "crimson",
    title: "Live-in-Labs® Rural Immersion",
    desc: "Applying computing and engineering skills to co-design sustainable solutions with rural communities across India.",
  },
];

const MARQUEE_ITEMS = [
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=240&q=75",
    title: "team bi0s CTF Labs",
    sub: "#1 Ranked in India",
    subStyle: "cyan",
    borderStyle: "cyan",
  },
  {
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=240&q=75",
    title: "amFOSS Open Source",
    sub: "GSoC Mentorship",
    subStyle: "crimson",
    borderStyle: "crimson",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=240&q=75",
    title: "Hackathons & ICPC",
    sub: "World Finals Contenders",
    subStyle: "royal",
    borderStyle: "cyan",
  },
  {
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=240&q=75",
    title: "Global Dual Degrees",
    sub: "USA · Europe · Japan",
    subStyle: "crimson",
    borderStyle: "crimson",
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=240&q=75",
    title: "Live-in-Labs®",
    sub: "Service Learning",
    subStyle: "cyan",
    borderStyle: "cyan",
  },
];

const OVERSEAS_PANELS = [
  {
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80",
    alt: "Dual Degree Partner Campuses in USA",
    overlayClass: "ug-overseas-overlay-1",
    label: "Panel 01 / 02 · Integrated Dual Degree (3+1 / 3+2)",
    labelColor: "#7dd3fc",
    title: "Earn B.Tech from Amrita & MS from Global Partner Universities",
    desc: "Seamless credit transfer with partner institutions in the United States and the Netherlands.",
  },
  {
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
    alt: "European & Japanese Semester Exchange",
    overlayClass: "ug-overseas-overlay-2",
    label: "Panel 02 / 02 · Erasmus+ & Bilateral Exchange",
    labelColor: "#bae6fd",
    title: "Semester Abroad & Thesis Research in Europe & Japan",
    desc: "Spend one or two semesters conducting cybersecurity or systems research at partner labs.",
  },
];

const TOC_ITEMS = [
  { num: "01", label: "Student life @Amrita", target: "student-life" },
  { num: "02", label: "Our Pride", target: "our-pride" },
  { num: "03", label: "team bi0s", target: "communities" },
  { num: "04", label: "amFOSS", target: "communities" },
  { num: "05", label: "Scholarships", target: "scholarships" },
  { num: "06", label: "Overseas Experience", target: "overseas" },
  { num: "07", label: "Curriculum", target: "curriculum" },
  { num: "08", label: "Internships", target: "internships" },
  { num: "09", label: "Placements", target: "placements" },
  { num: "10", label: "Events", target: "events" },
  { num: "11", label: "Social Media", target: "social-media" },
  { num: "12", label: "Alumni", target: "alumni" },
];

const SECTION_IDS = [
  "student-life","our-pride","communities","scholarships",
  "overseas","curriculum","internships","placements",
  "events","social-media","alumni",
];

// ── Academics Page ────────────────────────────────────────────────────────────
export default function Academics() {
  /* ── Content from localStorage ── */
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSiteData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.academicsContent) return normalizeAcademics(parsed.academicsContent);
      }
    } catch (e) { console.error(e); }
    return DEFAULT_ACADEMICS_CONTENT;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const stored = localStorage.getItem("adminSiteData");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.academicsContent) setContent(normalizeAcademics(parsed.academicsContent));
        }
      } catch (e) { console.error(e); }
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("adminSiteDataUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("adminSiteDataUpdated", handleUpdate);
    };
  }, []);

  /* ── Hero slider ── */
  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef(null);
  const heroSlideInterval = Number(content.hero?.slideInterval) || 6500;

  const startHeroTimer = useCallback(() => {
    clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), heroSlideInterval);
  }, [heroSlideInterval]);

  useEffect(() => { startHeroTimer(); return () => clearInterval(heroTimer.current); }, [startHeroTimer]);

  const goHero = (idx) => { setHeroIdx(idx); startHeroTimer(); };
  const nextHero = () => goHero((heroIdx + 1) % HERO_SLIDES.length);
  const prevHero = () => goHero((heroIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  /* ── Campus carousel ── */
  const [campusIdx, setCampusIdx] = useState(0);
  const [campusPaused, setCampusPaused] = useState(false);
  const campusTimer = useRef(null);

  useEffect(() => {
    campusTimer.current = setInterval(() => {
      if (!campusPaused) setCampusIdx(i => (i + 1) % CAMPUS_SLIDES.length);
    }, 5200);
    return () => clearInterval(campusTimer.current);
  }, [campusPaused]);

  const goCampus = (idx) => setCampusIdx(idx);
  const nextCampus = () => setCampusIdx(i => (i + 1) % CAMPUS_SLIDES.length);
  const prevCampus = () => setCampusIdx(i => (i - 1 + CAMPUS_SLIDES.length) % CAMPUS_SLIDES.length);

  /* ── Overseas panel ── */
  const [overseasIdx, setOverseasIdx] = useState(0);
  const toggleOverseas = () => setOverseasIdx(i => (i + 1) % 2);

  /* ── Curriculum year ── */
  const [activeYearId, setActiveYearId] = useState(1);

  /* ── Alumni slider ── */
  const [alumniIdx, setAlumniIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAlumniIdx(i => (i + 1) % (content.alumni?.items?.length || 3)), 7500);
    return () => clearInterval(t);
  }, [content.alumni?.items?.length]);

  const goAlumni = (idx) => setAlumniIdx(idx);
  const nextAlumni = () => setAlumniIdx(i => (i + 1) % (content.alumni?.items?.length || 3));
  const prevAlumni = () => setAlumniIdx(i => (i - 1 + (content.alumni?.items?.length || 3)) % (content.alumni?.items?.length || 3));

  /* ── Toast ── */
  const [toast, setToast] = useState({ visible: false, msg: "" });
  const toastTimer = useRef(null);
  const openToast = (msg) => {
    setToast({ visible: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ visible: false, msg: "" }), 3600);
  };

  /* ── Scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll(".ug-reveal-section");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── TOC scroll-spy ── */
  const [activeSection, setActiveSection] = useState("student-life");
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current = "student-life";
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { hero, heroStats, studentLife, pride, communities, scholarships, overseas, curriculum, internships, placements, events, socialMedia, alumni } = content;

  const activeYearData = curriculum?.years?.find(y => y.id === activeYearId) || curriculum?.years?.[0];

  return (
    <div className="academics-page">

      {/* ── HERO SECTION ── */}
      <section id="top" className="ug-hero-section">
        <div className="ug-hero-viewport">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`ug-hero-fade-slide${idx === heroIdx ? " active" : ""}`}
            >
              <img
                src={idx === 0 && hero?.bgImage ? hero.bgImage : slide.img}
                alt={slide.alt}
                className={`ug-hero-slide-img ${getAcademicHeroAnimationClass(hero?.animation)}`}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div className={`absolute inset-0 ${getAcademicHeroGradientClass(hero?.gradient)}`} style={{ position: "absolute", inset: 0 }}></div>
            </div>
          ))}

          {/* Dot grid overlay */}
          <div className="ug-tech-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}></div>

          {/* Foreground content */}
          <div className="ug-hero-foreground">
            <div className="ug-container ug-hero-content-wrapper">
              <div className="ug-hero-inner">
                {/* Breadcrumb pill */}
                <div className="ug-breadcrumb-pill">
                  <span className="ug-breadcrumb-dot"></span>
                  <span className="ug-breadcrumb-section">Academics</span>
                  <span className="ug-breadcrumb-sep">·</span>
                  <span className="ug-breadcrumb-page">Academic Programmes</span>
                </div>

                <h1 className="ug-hero-title">{hero?.title || "Under Graduate Programme"}</h1>
                <p className="ug-hero-subtitle">{hero?.subtitle || "A four-year B.Tech that blends strong computing fundamentals with research, open source, security and a values-driven campus life."}</p>

                <div className="ug-hero-actions">
                  <a href="#curriculum" className="ug-btn-crimson">Explore 8-Semester Curriculum</a>
                  <a href="#student-life" className="ug-btn-glass">Discover Campus Life</a>
                </div>
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="ug-hero-controls">
            <span className="ug-hero-slide-label">{HERO_SLIDES[heroIdx].label}</span>
            <div className="ug-hero-dots">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goHero(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`ug-hero-dot${idx === heroIdx ? " active" : ""}`}
                />
              ))}
            </div>
            <div className="ug-hero-nav-group">
              <button onClick={prevHero} aria-label="Previous slide" className="ug-hero-nav-btn">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={nextHero} aria-label="Next slide" className="ug-hero-nav-btn">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Stat Cards Bar ── */}
        <div className="ug-stats-bar">
          <div className="ug-container">
            <div className="ug-stats-grid">
              {heroStats.map((s) => (
                <div key={s.id} className={`ug-stat-card${s.valueStyle === "crimson" ? " ug-stat-card--crimson-hover" : ""}`}>
                  <div>
                    <div className="ug-stat-label">{s.label}</div>
                    <div className={`ug-stat-value${s.valueStyle === "crimson" ? " ug-stat-value--crimson" : ""}`}>{s.value}</div>
                  </div>
                  <div className={`ug-stat-badge ug-stat-badge--${s.badgeStyle}`}>{s.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <main className="ug-container ug-main-wrap">

        {/* Mobile quick-jump bar */}
        <div className="ug-mobile-jumpbar-wrap">
          <div className="ug-mobile-jumpbar">
            {TOC_ITEMS.map((item) => (
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
                <span className="ug-sidebar-badge">01–12</span>
              </div>
              <nav className="ug-toc-nav">
                {TOC_ITEMS.map((item) => (
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

          {/* ── MAIN CONTENT ── */}
          <div className="ug-content">

            {/* ── 01 · STUDENT LIFE ── */}
            {studentLife?.items?.length > 0 && (
              <section id="student-life" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">01</span>
                  <span className="ug-section-tag">Campus Ecosystem</span>
                </div>
                <h2 className="ug-section-title">{studentLife.title || "Student life @Amrita"}</h2>
                <p className="ug-section-intro">{studentLife.intro}</p>

                {/* Campus Carousel */}
                <div
                  className="ug-carousel-container"
                  onMouseEnter={() => setCampusPaused(true)}
                  onMouseLeave={() => setCampusPaused(false)}
                >
                  <div
                    className="ug-carousel-track ug-slide-track"
                    style={{ transform: `translateX(-${campusIdx * 100}%)` }}
                  >
                    {CAMPUS_SLIDES.map((slide, idx) => (
                      <div key={idx} className="ug-carousel-slide">
                        <img
                          src={slide.img}
                          alt={slide.alt}
                          onError={e => { e.target.style.display = "none"; }}
                        />
                        <div className="ug-carousel-overlay"></div>
                        <div className="ug-carousel-caption">
                          <span className={`ug-carousel-tag ug-carousel-tag--${slide.tagStyle}`}>{slide.tag}</span>
                          <h3 className="ug-carousel-heading">{slide.title}</h3>
                          <p className="ug-carousel-desc">{slide.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={prevCampus} className="ug-carousel-nav-btn ug-carousel-nav-btn--left" aria-label="Previous">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button onClick={nextCampus} className="ug-carousel-nav-btn ug-carousel-nav-btn--right" aria-label="Next">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </button>

                  <div className="ug-carousel-dots">
                    {CAMPUS_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goCampus(idx)}
                        aria-label={`Pillar ${idx + 1}`}
                        className={`ug-carousel-dot${idx === campusIdx ? " active" : ""}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Synced Pillar Cards */}
                <div className="ug-pillar-grid">
                  {studentLife.items.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => goCampus(idx)}
                      className={`ug-pillar-card${idx === campusIdx ? " active" : ""}`}
                    >
                      <div className="ug-pillar-header">
                        <div className="ug-pillar-left">
                          <div className={`ug-pillar-icon ug-pillar-icon--${item.iconStyle || "crimson"}`}>
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <h3 className="ug-pillar-title">{item.title}</h3>
                        </div>
                        <span className="ug-pillar-action">
                          {idx === campusIdx ? "ACTIVE SLIDE" : "VIEW SLIDE"}
                        </span>
                      </div>
                      <p className="ug-pillar-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 02 · OUR PRIDE ── */}
            {pride?.items?.length > 0 && (
              <section id="our-pride" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson">02</span>
                  <span className="ug-section-tag">Global Recognition</span>
                </div>
                <h2 className="ug-section-title">{pride.title || "Our Pride"}</h2>
                <p className="ug-section-intro">{pride.intro}</p>

                <div className="ug-pride-grid">
                  {pride.items.map((item) => (
                    <div key={item.id} className="ug-pride-card">
                      <div className="ug-pride-card-header">
                        <span className={`ug-pride-tag ug-pride-tag--${item.tagStyle || "crimson"}`}>
                          {item.tag || item.stat}
                        </span>
                        <span className="ug-pride-source">{item.source}</span>
                      </div>
                      <h3 className="ug-pride-heading">{item.title || item.text}</h3>
                      {item.text && item.title && (
                        <p className="ug-pride-text">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 03 & 04 · COMMUNITIES ── */}
            {communities?.items?.length > 0 && (
              <section id="communities" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">03 · 04</span>
                  <span className="ug-section-tag">Student-Run Communities</span>
                </div>
                <h2 className="ug-section-title">{communities.title || "Flagship Research & Open-Source Collectives"}</h2>
                <p className="ug-section-intro">{communities.intro}</p>

                <div className="ug-community-grid">
                  {communities.items.map((c) => (
                    <div
                      key={c.id}
                      className={`ug-community-card ug-community-card--${c.variant === "light" ? "light" : "dark"}`}
                    >
                      {c.variant !== "light" && <div className="ug-community-dot-bg"></div>}
                      <div className="ug-community-top">
                        <div className="ug-community-badges">
                          <span className={`ug-community-tag ug-community-tag--${c.variant === "light" ? "crimson" : "cyan"}`}>
                            {c.tag}
                          </span>
                          <span className="ug-community-est" style={{ color: c.variant === "light" ? "#64748b" : "#7dd3fc" }}>
                            {c.est}
                          </span>
                        </div>
                        <h3 className="ug-community-name">{c.name}</h3>
                        <p className="ug-community-text" style={{ color: c.variant === "light" ? "#334155" : "#e2e8f0" }}>
                          {c.text}
                        </p>
                      </div>
                      <div
                        className="ug-community-footer"
                        style={{ borderTopColor: c.variant === "light" ? "#e2e8f0" : "#1E3A5F" }}
                      >
                        <span
                          className="ug-community-url"
                          style={{ color: c.variant === "light" ? "#8B1538" : "#0EA5E9" }}
                        >
                          {c.url}
                        </span>
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`ug-community-link ug-community-link--${c.variant === "light" ? "crimson" : "cyan"}`}
                        >
                          {c.linkLabel} ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 05 · SCHOLARSHIPS ── */}
            {scholarships?.items?.length > 0 && (
              <section id="scholarships" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson">05</span>
                  <span className="ug-section-tag">Financial Aid &amp; Merit</span>
                </div>
                <h2 className="ug-section-title">{scholarships.title || "Scholarships"}</h2>
                <p className="ug-section-intro">{scholarships.intro}</p>

                <div className="ug-scholarship-grid">
                  {scholarships.items.map((s) => (
                    <div key={s.id} className="ug-scholarship-card">
                      <div className={`ug-scholarship-label`} style={{ color: s.labelColor === "crimson" ? "var(--ug-crimson)" : s.labelColor === "royal" ? "var(--ug-royal)" : "var(--ug-cybercyan)" }}>
                        {s.label || s.title}
                      </div>
                      <h3 className="ug-scholarship-heading">{s.title}</h3>
                      <p className="ug-scholarship-text">{s.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 06 · OVERSEAS EXPERIENCE ── */}
            {overseas && (
              <section id="overseas" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">06</span>
                  <span className="ug-section-tag">Global Mobility</span>
                </div>
                <h2 className="ug-section-title">{overseas.title || "Overseas Experience"}</h2>
                <p className="ug-section-intro">{overseas.intro}</p>

                {/* Sliding Dual Panel */}
                <div className="ug-overseas-panels">
                  <div
                    className="ug-overseas-track ug-slide-track"
                    style={{ transform: `translateX(-${overseasIdx * 100}%)` }}
                  >
                    {OVERSEAS_PANELS.map((panel, idx) => (
                      <div key={idx} className="ug-overseas-panel">
                        <img
                          src={panel.img}
                          alt={panel.alt}
                          onError={e => { e.target.style.display = "none"; }}
                        />
                        <div className={`absolute inset-0 ${panel.overlayClass}`} style={{ position: "absolute", inset: 0 }}></div>
                        <div className="ug-overseas-content">
                          <span className="ug-overseas-panel-label" style={{ color: panel.labelColor }}>
                            {panel.label}
                          </span>
                          <h3 className="ug-overseas-panel-title">{panel.title}</h3>
                          <p className="ug-overseas-panel-desc">{panel.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={toggleOverseas} className="ug-overseas-toggle-btn">
                    Slide Showcase ↔
                  </button>
                </div>

                {/* Info Grid */}
                <div className="ug-overseas-info-grid">
                  <div className="ug-overseas-info-box">
                    <h3 className="ug-overseas-info-title">
                      <span className="ug-overseas-info-dot" style={{ background: "var(--ug-crimson)" }}></span>
                      {overseas.dualDegreeTitle || "Dual Degree Partner Universities"}
                    </h3>
                    <div className="ug-partner-grid">
                      {overseas.dualDegreePartners?.map((p) => (
                        <div key={p.id} className="ug-partner-card">
                          <div className="ug-partner-name">{p.name}</div>
                          <div className="ug-partner-location">{p.location}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ug-overseas-info-box" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 className="ug-overseas-info-title">
                        <span className="ug-overseas-info-dot" style={{ background: "var(--ug-cybercyan)" }}></span>
                        {overseas.exchangeTitle || "Student Exchange Destinations"}
                      </h3>
                      <p className="ug-overseas-subtext">{overseas.exchangeSubtext}</p>
                      <div className="ug-country-tags">
                        {overseas.exchangeCountries?.map((c) => (
                          <span key={c.id} className="ug-country-tag">{c.name}</span>
                        ))}
                      </div>
                    </div>
                    <div className="ug-overseas-footnote">{overseas.exchangeFootnote}</div>
                  </div>
                </div>
              </section>
            )}

            {/* ── 07 · CURRICULUM ── */}
            {curriculum?.years?.length > 0 && (
              <section id="curriculum" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">07</span>
                  <span className="ug-section-tag">160+ Credits · 8 Semesters</span>
                </div>
                <h2 className="ug-section-title">{curriculum.title || "Curriculum"}</h2>
                <p className="ug-section-intro">{curriculum.intro}</p>

                <div className="ug-curriculum-box">
                  <div className="ug-curriculum-tabs">
                    {curriculum.years.map((yr) => (
                      <button
                        key={yr.id}
                        onClick={() => setActiveYearId(yr.id)}
                        className={`ug-curriculum-tab${yr.id === activeYearId ? " active" : ""}`}
                      >
                        {yr.year}
                        <span className="ug-tab-sem">{yr.semLabel}</span>
                      </button>
                    ))}
                  </div>

                  <div className="ug-curriculum-content">
                    {activeYearData && (
                      <div className="ug-semesters-grid">
                        {activeYearData.semesters?.map((sem) => (
                          <div key={sem.id} className="ug-semester-card">
                            <div className="ug-semester-header">
                              <h3 className="ug-semester-name">{sem.name}</h3>
                              {sem.credits && (
                                <span className="ug-semester-credits">{sem.credits}</span>
                              )}
                            </div>
                            <ul className="ug-course-list">
                              {sem.courses?.map((course, cidx) => {
                                const courseName = typeof course === "string" ? course : course.name;
                                const courseCode = typeof course === "object" ? course.code : null;
                                return (
                                  <li key={cidx} className="ug-course-item">
                                    <div className="ug-course-left">
                                      <span className="ug-course-num">{String(cidx + 1).padStart(2, "0")}</span>
                                      <span className="ug-course-name">{courseName}</span>
                                    </div>
                                    {courseCode && <span className="ug-course-code">{courseCode}</span>}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── 08 · INTERNSHIPS ── */}
            {internships && (
              <section id="internships" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">08</span>
                  <span className="ug-section-tag">Corporate &amp; Industry Relations</span>
                </div>
                <h2 className="ug-section-title">{internships.title || "Internships"}</h2>
                <p className="ug-section-intro">{internships.intro}</p>

                <div className="ug-internship-box">
                  <div className="ug-internship-stats">
                    <div className="ug-internship-stat">
                      <div className="ug-internship-stat-label" style={{ color: "var(--ug-cybercyan)" }}>Earliest Start</div>
                      <div className="ug-internship-stat-value">End of Semester {internships.earliestSemester || 4}</div>
                      <div className="ug-internship-stat-hint">Summer research &amp; engineering internships</div>
                    </div>
                    <div className="ug-internship-stat">
                      <div className="ug-internship-stat-label" style={{ color: "var(--ug-crimson)" }}>Duration</div>
                      <div className="ug-internship-stat-value">{internships.minWeeks || 4}–{internships.maxWeeks || 24} weeks</div>
                      <div className="ug-internship-stat-hint">Short summer sprints to full Semester 8 industry tracks</div>
                    </div>
                  </div>

                  <div className="ug-internship-details">
                    {(internships.details || internships.items)?.map((item) => (
                      <div key={item.id} className="ug-internship-detail">
                        <strong>{item.label || item.title}</strong>{" "}
                        {item.text}
                      </div>
                    ))}
                  </div>

                  <div className="ug-internship-footer">
                    <span className="ug-internship-footer-label">Directorate of Corporate &amp; Industry Relations (CIR)</span>
                    {internships.sourceUrl && (
                      <a href={internships.sourceUrl} target="_blank" rel="noreferrer" className="ug-btn-outline">
                        Official CIR Internship Portal ↗
                      </a>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── 09 · PLACEMENTS ── */}
            {placements && (
              <section id="placements" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">09</span>
                  <span className="ug-section-tag">Career Outcomes</span>
                </div>
                <h2 className="ug-section-title">{placements.title || "Placements"}</h2>
                <p className="ug-section-intro">{placements.intro}</p>

                <div className="ug-placement-steps">
                  {placements.items?.map((item) => (
                    <div key={item.id} className="ug-placement-step">
                      <div
                        className="ug-placement-step-num"
                        style={{
                          color: item.stepColor === "crimson" ? "var(--ug-crimson)" :
                                 item.stepColor === "royal" ? "var(--ug-royal)" : "var(--ug-cybercyan)"
                        }}
                      >
                        {item.step || `STEP 0${item.id}`}
                      </div>
                      <h3 className="ug-placement-step-title">{item.title}</h3>
                      <p className="ug-placement-step-text">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="ug-placement-note">
                  <p className="ug-placement-note-text">
                    <strong>Official Note:</strong>{" "}
                    {placements.note || "Placement statistics and recruiter drives are centrally verified and published by Amrita's Directorate of Corporate & Industry Relations."}
                  </p>
                  <div className="ug-placement-links">
                    {placements.sourceUrl && (
                      <a href={placements.sourceUrl} target="_blank" rel="noreferrer" className="ug-btn-dark">
                        Official placement information ↗
                      </a>
                    )}
                    {placements.trainingUrl && (
                      <a href={placements.trainingUrl} target="_blank" rel="noreferrer" className="ug-btn-light">
                        Career preparation ↗
                      </a>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── 10 · EVENTS ── */}
            {events?.items?.length > 0 && (
              <section id="events" className="ug-reveal-section">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson-tint">10</span>
                  <span className="ug-section-tag">Academic Calendar</span>
                </div>
                <h2 className="ug-section-title">{events.title || "Events"}</h2>
                <p className="ug-section-intro">{events.intro}</p>

                <div className="ug-events-list">
                  {events.items.map((ev) => (
                    <div key={ev.id} className="ug-event-item">
                      <div className="ug-event-main">
                        <div
                          className={`ug-event-date ug-event-date--${ev.dateStyle || "crimson"}`}
                        >
                          {ev.date}
                        </div>
                        <div>
                          <div className="ug-event-meta">
                            <span
                              className="ug-event-type-badge"
                              style={{
                                background: ev.typeStyle === "cyan" ? "var(--ug-cybercyan-tint)" :
                                            ev.typeStyle === "royal" ? "var(--ug-royal-tint)" :
                                            ev.typeStyle === "crimson" ? "var(--ug-crimson-tint)" : "var(--ug-icetint)",
                                color: ev.typeStyle === "cyan" ? "var(--ug-cybercyan)" :
                                       ev.typeStyle === "royal" ? "var(--ug-royal)" :
                                       ev.typeStyle === "crimson" ? "var(--ug-crimson)" : "var(--ug-slatex-900)",
                              }}
                            >
                              {ev.type}
                            </span>
                            {ev.location && <span className="ug-event-location">· {ev.location}</span>}
                            {ev.by && !ev.location && <span className="ug-event-location">· {ev.by}</span>}
                          </div>
                          <h3 className="ug-event-title">{ev.title}</h3>
                        </div>
                      </div>
                      <button
                        onClick={() => openToast(`Registered reminder for ${ev.date} — ${ev.title}.`)}
                        className="ug-event-rsvp-btn"
                      >
                        RSVP →
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── 11 · SOCIAL MEDIA ── */}
            {socialMedia?.links?.length > 0 && (
              <section id="social-media" className="ug-reveal-section ug-alt-bg">
                <div className="ug-section-badge-row">
                  <span className="ug-section-num ug-section-num--crimson">11</span>
                  <span className="ug-section-tag">Official Channels</span>
                </div>
                <h2 className="ug-section-title">{socialMedia.title || "Social Media"}</h2>
                <p className="ug-section-intro">{socialMedia.intro}</p>

                <div className="ug-social-grid">
                  {socialMedia.links.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`ug-social-card ug-social-card--${s.hoverColor || "crimson"}`}
                    >
                      <div
                        className="ug-social-platform"
                        style={{
                          color: s.platformColor === "crimson" ? "var(--ug-crimson)" :
                                 s.platformColor === "royal" ? "var(--ug-royal)" : "var(--ug-cybercyan)"
                        }}
                      >
                        {s.platform}
                      </div>
                      <div className="ug-social-name">{s.name || s.handle}</div>
                      <p className="ug-social-desc">{s.desc}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* ── 12 · ALUMNI ── */}
            {alumni?.items?.length > 0 && (
              <section id="alumni" className="ug-reveal-section">
                <div className="ug-alumni-header">
                  <div>
                    <div className="ug-section-badge-row">
                      <span className="ug-section-num ug-section-num--crimson-tint">12</span>
                      <span className="ug-section-tag">Graduate Voices</span>
                    </div>
                    <h2 className="ug-section-title">{alumni.title || "Alumni"}</h2>
                  </div>
                  <div className="ug-alumni-nav">
                    <button onClick={prevAlumni} aria-label="Previous testimonial" className="ug-alumni-nav-btn">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button onClick={nextAlumni} aria-label="Next testimonial" className="ug-alumni-nav-btn">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>

                <div className="ug-alumni-slider-wrap">
                  <div
                    className="ug-alumni-track ug-slide-track"
                    style={{ transform: `translateX(-${alumniIdx * 100}%)` }}
                  >
                    {alumni.items.map((a, idx) => (
                      <div key={a.id || idx} className="ug-alumni-slide">
                        <div className="ug-alumni-card-inner">
                          <div className="ug-alumni-card-top">
                            <span
                              className="ug-alumni-batch-badge"
                              style={{
                                background: a.batchStyle === "cyan" ? "var(--ug-cybercyan-tint)" :
                                            a.batchStyle === "royal" ? "var(--ug-royal-tint)" : "var(--ug-crimson-tint)",
                                color: a.batchStyle === "cyan" ? "var(--ug-cybercyan)" :
                                       a.batchStyle === "royal" ? "var(--ug-royal)" : "var(--ug-crimson)",
                                border: `1px solid ${a.batchStyle === "cyan" ? "rgba(2,132,199,0.2)" : a.batchStyle === "royal" ? "rgba(30,58,138,0.2)" : "rgba(139,21,56,0.2)"}`
                              }}
                            >
                              {a.batch}
                            </span>
                            <span className="ug-alumni-quote-icon">&ldquo;</span>
                          </div>
                          <blockquote className="ug-alumni-blockquote">
                            &ldquo;{a.quote}&rdquo;
                          </blockquote>
                          <div className="ug-alumni-footer">
                            <div
                              className="ug-alumni-avatar"
                              style={{
                                background: a.avatarStyle === "dark" ? "var(--ug-cybernavy)" :
                                            a.avatarStyle === "royal" ? "var(--ug-royal)" : "var(--ug-crimson)",
                                border: a.avatarStyle === "dark" ? "1px solid var(--ug-cybercyan)" : "none"
                              }}
                            >
                              {a.initials}
                            </div>
                            <div>
                              <div className="ug-alumni-name">{a.name}</div>
                              <div className="ug-alumni-meta">{a.meta || `${a.batch} · ${a.role}`}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ug-alumni-dots">
                  {alumni.items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goAlumni(idx)}
                      aria-label={`Alumni ${idx + 1}`}
                      className={`ug-alumni-dot${idx === alumniIdx ? " active" : ""}`}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>{/* end ug-content */}
        </div>{/* end ug-main-layout */}
      </main>

      {/* ── TOAST ── */}
      {toast.visible && (
        <div className="ug-toast">
          <span className="ug-toast-dot"></span>
          <span>{toast.msg}</span>
        </div>
      )}

    </div>
  );
}
