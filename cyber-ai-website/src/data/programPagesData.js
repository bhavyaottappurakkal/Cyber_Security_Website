import { useState, useEffect } from "react";
import { resolveMediaUrl } from "../utils/mediaStore";

export const DEFAULT_PROGRAM_PAGES = {
  ug: {
    key: "ug",
    tabLabel: "Undergraduate Page",
    themeClass: "cmu-subpage--ug",
    pageBgColor: "#ffffff",
    bandAltBgColor: "#f4f6f9",
    heroBgColor: "#f1f5f9",
    accentColor: "#c59b27",
    breadcrumbLabel: "Undergraduate Programs",
    hero: {
      eyebrow: "Academics · B.Tech. CSE (Cyber Security)",
      title: "Under Graduate Programme",
      lead: "A four-year B.Tech. in Computer Science and Engineering (Cyber Security) that blends strong computing fundamentals with research, open source, security, and a values-driven campus life.",
      body: "At the Amrita Center for Cybersecurity Systems and Networks (Amritapuri Campus), undergraduate students learn in a Government of India designated Center of Relevance and Excellence (CORE), combining classroom rigor with 24/7 hands-on labs, global competitions, and international dual-degree pathways.",
      image: "/ug-program.jpg",
      imageAlt: "Undergraduate students collaborating in the Amrita Cybersecurity Innovation Lab",
      stats: [
        { id: "ug-s1", label: "Duration", value: "4 Years (8 Semesters)" },
        { id: "ug-s2", label: "Degree Awarded", value: "B.Tech. CSE (Cyber Security)" },
        { id: "ug-s3", label: "Campus & Mode", value: "Amritapuri · Full-Time" },
        { id: "ug-s4", label: "Global Pathways", value: "3+1 / 3+2 Dual Degree" },
      ],
    },
    feature: {
      enabled: true,
      reverse: false,
      image: "/campus-life.jpg",
      imageAlt: "Students collaborating on the Amritapuri campus",
      // caption: "Amritapuri Campus · 24/7 Research Labs & Student Innovation Hubs",
      kicker: "Campus Experience",
      title: "Student life @Amrita & Our Pride",
      body: "Life on campus pairs rigorous academic inquiry with collaborative technical clubs, overnight hackathons, holistic wellness, active ACM/IEEE/SIGSAC student chapters, and real-world rural immersion through Live-in-Labs®.",
      highlights: [
        {
          id: "ug-h1",
          text: "Accredited with NAAC ‘A++’ Grade and ranked among the World’s Top 100 Universities in THE Impact Rankings.",
        },
        {
          id: "ug-h2",
          text: "Recognized nationally for student-led cybersecurity breakthroughs, 100+ granted patents across Amrita, and international awards.",
        },
        {
          id: "ug-h3",
          text: "Direct mentorship from faculty and senior researchers in a Govt. of India Mission REACH CORE Center.",
        },
      ],
    },
    bands: [
      {
        id: "ug-b0",
        title: "Our Pride: Student Talent & Accomplishments",
        greyBg: false,
        cards: [
          {
            id: "ug-c0a",
            domId: "our-pride",
            badge: "Student Talent",
            title: "Student Talent",
            body: "Undergraduate students at Amrita cultivate deep technical mastery from day one through peer-mentored research collectives, Capture The Flag (CTF) cybersecurity teams, open-source engineering sprints, Google Summer of Code (GSoC), Outreachy, and active ACM/IEEE/SIGSAC chapters.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "ug-c0b",
            domId: "",
            badge: "Student Accomplishments",
            title: "Student Accomplishments",
            body: "Our students consistently earn top national and international CTF rankings, discover real-world vulnerabilities (CVEs), publish in premier IEEE/ACM venues, contribute to 100+ patents granted across Amrita, and secure high-impact placements at leading global technology and cybersecurity firms.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
      {
        id: "ug-b1",
        title: "Technical Communities: Bios & Foss",
        greyBg: true,
        cards: [
          {
            id: "ug-c1",
            domId: "bios",
            badge: "CTF & Security Research",
            title: "team bi0s (Bios)",
            body: "India’s premier student-run cybersecurity research team and #1 ranked Capture The Flag (CTF) team. Undergraduate students train in binary exploitation, reverse engineering, web & mobile security, cryptography, and hardware security from their very first year.",
            linkLabel: "Visit team bi0s (bi0s.in) →",
            linkUrl: "https://bi0s.in/",
          },
          {
            id: "ug-c2",
            domId: "foss",
            badge: "Open Source Collective",
            title: "amFOSS (Foss)",
            body: "One of India’s leading open-source student collectives, mentoring undergraduates to contribute to global open-source foundations, Google Summer of Code (GSoC), Outreachy, Linux Kernel, and real-world developer tooling.",
            linkLabel: "Visit amFOSS (amfoss.in) →",
            linkUrl: "https://amfoss.in/",
          },
        ],
      },
      {
        id: "ug-b2",
        title: "Scholarships & Overseas Experience",
        greyBg: false,
        cards: [
          {
            id: "ug-c3",
            domId: "",
            badge: "Merit & Grants",
            title: "Scholarships",
            body: "Merit-based tuition waivers are awarded to top applicants through AEEE and JEE Mains, alongside research travel grants, conference sponsorships, and fellowship support for outstanding undergraduate innovators.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "ug-c4",
            domId: "",
            badge: "Global Mobility",
            title: "Overseas Experience — Dual Degree & Student Exchange",
            body: "Dual Degree (3+1 / 3+2): Integrated pathways to earn a B.Tech. from Amrita and an MS from global partner universities in the USA and Europe.\nStudent Exchange: Semester-abroad and thesis research with Vrije Universiteit Amsterdam, University of L’Aquila, University of Göttingen, SUTD, and partners in Japan.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
      {
        id: "ug-b3",
        title: "Curriculum (8-Semester B.Tech. CSE — Cyber Security)",
        greyBg: true,
        cards: [
          {
            id: "ug-c5",
            domId: "",
            badge: "Semesters 1–4",
            title: "Core Computing & Security Foundations",
            body: "Programming in C/Python/Java, Discrete Mathematics, Data Structures & Algorithms, Computer Architecture, Operating Systems, Database Management Systems, Computer Networks, and Foundations of Cryptography.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "ug-c6",
            domId: "",
            badge: "Semesters 5–8",
            title: "Advanced Cybersecurity & AI Defense",
            body: "Network & System Security, Secure Software Engineering, Malware Analysis & Reverse Engineering, Cloud & Hypervisor Security, IoT & Cyber-Physical Security, AI for Cybersecurity, Capstone Research Project, and Industry Internship.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
    ],
  },

  pg: {
    key: "pg",
    tabLabel: "Postgraduate Page",
    themeClass: "cmu-subpage--pg",
    breadcrumbLabel: "Post Graduate Programme",
    hero: {
      eyebrow: "Academics · M.Tech. & M.C.A.",
      title: "Post Graduate Programme",
      lead: "A 2-year M.Tech. in Cyber Security Systems & Networks and M.C.A. in Cyber Security offering advanced specialization in systems security, network forensics, cloud security, and AI defense.",
      body: "Designed at the Amrita Center for Cybersecurity Systems and Networks (Amritapuri Campus), our postgraduate programs combine deep theoretical rigor with sponsored research laboratories, international dual-degree pathways, and year-long industry internships.",
      image: "/cybersecurity-lab.jpg",
      imageAlt: "Postgraduate scholars in the Cyber Security Systems and Networks Research Lab",
      stats: [
        { id: "pg-s1", label: "Duration", value: "2 Years (4 Semesters)" },
        { id: "pg-s2", label: "Degrees Offered", value: "M.Tech. & M.C.A." },
        { id: "pg-s3", label: "Fellowships", value: "GATE / AICTE & R&D Grants" },
        { id: "pg-s4", label: "International", value: "VU Amsterdam & L’Aquila" },
      ],
    },
    feature: {
      enabled: true,
      reverse: true,
      image: "/hero-students.jpg",
      imageAlt: "Postgraduate researchers collaborating on systems and cloud security",
      caption: "Sponsored Systems Security Labs · ISRO, DST & Mission REACH",
      kicker: "Advanced Specialization",
      title: "Postgraduate Programmes & Specializations",
      body: "Postgraduate scholars master kernel internals, formal trust modeling, cloud hypervisor security (SEDO), cryptography, and AI-driven threat intelligence inside dedicated 24/7 research laboratories.",
      highlights: [
        {
          id: "pg-h1",
          text: "M.Tech. in Cyber Security Systems & Networks: 80+ credit engineering degree focused on Systems Security, Cloud Architecture, and AI Defense.",
        },
        {
          id: "pg-h2",
          text: "M.C.A. in Cyber Security: Specialized postgraduate training in secure enterprise architecture, application security, and digital forensics.",
        },
        {
          id: "pg-h3",
          text: "Direct collaboration on national R&D initiatives with ISRO, DST, and industry security teams.",
        },
      ],
    },
    bands: [
      {
        id: "pg-b1",
        title: "Research Labs & Technical Communities",
        greyBg: false,
        cards: [
          {
            id: "pg-c1",
            domId: "bios",
            badge: "Security Research",
            title: "team bi0s & Security Research Labs",
            body: "Postgraduate scholars collaborate with India’s #1 ranked CTF team (team bi0s) and dedicated Center labs on hypervisor security (SEDO), automotive & IoT defense, and sovereign AI infrastructure.",
            linkLabel: "Visit team bi0s (bi0s.in) →",
            linkUrl: "https://bi0s.in/",
          },
          {
            id: "pg-c2",
            domId: "foss",
            badge: "Open Source Systems",
            title: "amFOSS & Open-Source Systems",
            body: "Opportunities to build and maintain open-source security tooling, distributed big-data analytics frameworks, and cloud-native defense platforms alongside amFOSS contributors.",
            linkLabel: "Visit amFOSS (amfoss.in) →",
            linkUrl: "https://amfoss.in/",
          },
        ],
      },
      {
        id: "pg-b2",
        title: "Fellowships & International Dual Degrees",
        greyBg: true,
        cards: [
          {
            id: "pg-c3",
            domId: "",
            badge: "Financial Support",
            title: "GATE Scholarships & Research Fellowships",
            body: "GATE-qualified M.Tech. scholars receive AICTE/institutional stipends, alongside funded project assistantships supported by ISRO, DST, and TIFAC – Mission REACH.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "pg-c4",
            domId: "",
            badge: "Global Mobility",
            title: "International Dual-Degree & Exchange",
            body: "Dual Degree Master’s: Complete your second year and thesis research at Vrije Universiteit (VU) Amsterdam, Netherlands or University of L’Aquila, Italy.\nResearch Exchange: Collaborative placements with University of Göttingen (Germany) and SUTD (Singapore).",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
      {
        id: "pg-b3",
        title: "Curriculum (4-Semester M.Tech. Cyber Security)",
        greyBg: false,
        cards: [
          {
            id: "pg-c5",
            domId: "",
            badge: "Semesters 1–2",
            title: "Core Security & Systems",
            body: "Mathematical Foundations of Cryptography, Secure Operating Systems & Kernel Internals, Network Security & Forensics, Cloud Computing & Virtualization Security, and AI for Cyber Defense.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "pg-c6",
            domId: "",
            badge: "Semesters 3–4",
            title: "Thesis Research & Industry Internship",
            body: "Specialized electives in Agentic AI Security, Automotive & Healthcare Security, Master’s Thesis Dissertation, and 6-to-12 month R&D internships with global technology and cybersecurity leaders.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
    ],
  },

  online: {
    key: "online",
    tabLabel: "Online MCA Page",
    themeClass: "cmu-subpage--online",
    breadcrumbLabel: "Online Programme",
    hero: {
      eyebrow: "Academics · Amrita Online",
      title: "Online MCA Programme",
      lead: "A globally recognized, UGC-entitled Online Master of Computer Applications (MCA) in Cybersecurity offered through Amrita Online — designed for domestic and international students as well as working professionals.",
      body: "Delivered with the academic rigor of Amrita Vishwa Vidyapeetham (NAAC ‘A++’ Grade, World’s Top 100 in THE Impact Rankings) and mentored by faculty at the Center for Cybersecurity Systems and Networks.",
      image: "/sample_hero_img.jpg",
      imageAlt: "Amrita Online MCA Cybersecurity digital learning environment",
      stats: [
        { id: "on-s1", label: "Duration", value: "2 Years (4 Semesters)" },
        { id: "on-s2", label: "Recognition", value: "UGC-Entitled Degree" },
        { id: "on-s3", label: "Delivery Mode", value: "100% Online · Live + Virtual Labs" },
        { id: "on-s4", label: "Audience", value: "Global & Working Professionals" },
      ],
    },
    feature: {
      enabled: true,
      reverse: false,
      image: "/sample_headline.jpg",
      imageAlt: "Interactive virtual labs and online cybersecurity mentorship",
      caption: "Amrita Online · Interactive Weekend Sessions & Cloud Security Labs",
      kicker: "Flexible Global Delivery",
      title: "Program Highlights & Learning Experience",
      body: "Designed for learners across time zones, the Online MCA Cybersecurity program pairs live faculty-led sessions with hands-on virtual security sandboxes and continuous mentorship.",
      highlights: [
        {
          id: "on-h1",
          text: "Interactive live weekend classes, recorded lectures, and 24/7 virtual cybersecurity labs.",
        },
        {
          id: "on-h2",
          text: "Equivalent to an on-campus postgraduate degree with industry-aligned training in cloud defense, ethical hacking, and cyber governance.",
        },
        {
          id: "on-h3",
          text: "Dedicated career advancement support for SOC leadership, DevSecOps, and security engineering roles.",
        },
      ],
    },
    bands: [
      {
        id: "on-b1",
        title: "Technical Communities & Ecosystem",
        greyBg: false,
        cards: [
          {
            id: "on-c1",
            domId: "bios",
            badge: "CTF & Workshops",
            title: "team bi0s (Bios)",
            body: "Online learners gain exposure to CTF challenges, security workshops, and national cybersecurity initiatives led by Amrita’s top-ranked team bi0s.",
            linkLabel: "Visit team bi0s (bi0s.in) →",
            linkUrl: "https://bi0s.in/",
          },
          {
            id: "on-c2",
            domId: "foss",
            badge: "Open Source",
            title: "amFOSS (Foss)",
            body: "Engage with Amrita’s open-source engineering community, collaborative coding projects, and global open-source mentorship programs.",
            linkLabel: "Visit amFOSS (amfoss.in) →",
            linkUrl: "https://amfoss.in/",
          },
        ],
      },
      {
        id: "on-b2",
        title: "Eligibility & Financial Support",
        greyBg: true,
        cards: [
          {
            id: "on-c3",
            domId: "",
            badge: "Admissions",
            title: "Admissions & Eligibility",
            body: "Open to graduates from BCA, B.Sc. (CS/IT), B.E./B.Tech., or any bachelor’s degree with Mathematics at 10+2 or graduation level, with dedicated onboarding for international applicants.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "on-c4",
            domId: "",
            badge: "Scholarships & Careers",
            title: "Scholarships & Career Advancement",
            body: "Flexible semester-wise fee structure, merit scholarships, and dedicated career guidance connecting graduates to cybersecurity engineering, SOC leadership, and cloud security roles.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
      {
        id: "on-b3",
        title: "Curriculum (4-Semester Online MCA Cybersecurity)",
        greyBg: false,
        cards: [
          {
            id: "on-c5",
            domId: "",
            badge: "Semesters 1–2",
            title: "Computing & Network Foundations",
            body: "Advanced Data Structures, Operating Systems, Database Security, Computer Networks, Python & Secure Coding, and Applied Cryptography.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "on-c6",
            domId: "",
            badge: "Semesters 3–4",
            title: "Cloud, AI Security & Capstone",
            body: "Penetration Testing & Vulnerability Assessment, Cloud & DevSecOps Security, AI-Driven Threat Detection, Cyber Law & Compliance, and Industry Capstone Project.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
    ],
  },

  phd: {
    key: "phd",
    tabLabel: "Ph.D. Page",
    themeClass: "cmu-subpage--phd",
    breadcrumbLabel: "PhD Programme",
    hero: {
      eyebrow: "Academics · Doctoral Research",
      title: "Doctoral Programme (Ph.D.)",
      lead: "A research-intensive Ph.D. in Cyber Security Systems & Networks advancing Agentic AI Systems, Physical AI, Sovereign AI Infrastructure, Cloud Trust Modeling, Cryptography, and Critical Infrastructure Protection.",
      body: "Doctoral scholars work closely with faculty mentors at Amrita Center for Cybersecurity Systems and Networks on high-impact national and international grants, publishing in premier journals and conferences.",
      image: "/sample_top.jpg",
      imageAlt: "Doctoral research in Agentic AI, Cryptography, and Critical Infrastructure Security",
      stats: [
        { id: "phd-s1", label: "Track Options", value: "Full-Time & Part-Time" },
        { id: "phd-s2", label: "Funding", value: "Institutional & Govt. Grants" },
        { id: "phd-s3", label: "Research Pillars", value: "Agentic AI, Cloud & Crypto" },
        { id: "phd-s4", label: "Co-Advising", value: "VU Amsterdam & TU Vienna" },
      ],
    },
    feature: {
      enabled: true,
      reverse: true,
      image: "/cybersecurity-lab.jpg",
      imageAlt: "Doctoral Cybersecurity and Sovereign AI Infrastructure Laboratory",
      caption: "Frontier Research · Sovereign AI, Hypervisor Trust & Cryptanalysis",
      kicker: "Doctoral Research Focus",
      title: "Frontier Research Pillars",
      body: "Ph.D. candidates investigate foundational challenges at the intersection of Artificial Intelligence and Cybersecurity, backed by 100+ patents granted across Amrita and active international collaborations.",
      highlights: [
        {
          id: "phd-h1",
          text: "Agentic AI, Physical AI & Sovereign AI: Autonomous cyber defense agents, explainable human-AI teaming, and privacy-preserving sovereign AI platforms.",
        },
        {
          id: "phd-h2",
          text: "Cloud & Cryptography: Hypervisor-level Security Enabled Data Objects (SEDO), formal trust models, and Boolean function / Reed-Muller cryptanalysis.",
        },
        {
          id: "phd-h3",
          text: "Critical Infrastructure: IoT security, automotive infotainment security, and implantable medical device defense.",
        },
      ],
    },
    bands: [
      {
        id: "phd-b1",
        title: "Research Collectives & Labs",
        greyBg: false,
        cards: [
          {
            id: "phd-c1",
            domId: "bios",
            badge: "Vulnerability & Hardware Research",
            title: "team bi0s (Bios)",
            body: "Doctoral researchers mentor and collaborate with team bi0s on zero-day vulnerability discovery, firmware/hardware security, and national cyber defense exercises.",
            linkLabel: "Visit team bi0s (bi0s.in) →",
            linkUrl: "https://bi0s.in/",
          },
          {
            id: "phd-c2",
            domId: "foss",
            badge: "Open-Source Research",
            title: "amFOSS (Foss)",
            body: "Open-source research prototypes, reproducible security benchmarks, and large-scale distributed analytics tooling built in partnership with amFOSS.",
            linkLabel: "Visit amFOSS (amfoss.in) →",
            linkUrl: "https://amfoss.in/",
          },
        ],
      },
      {
        id: "phd-b2",
        title: "Fellowships & Global Collaborations",
        greyBg: true,
        cards: [
          {
            id: "phd-c3",
            domId: "",
            badge: "Doctoral Funding",
            title: "Funded Fellowships & Government Grants",
            body: "Full-time doctoral fellowships supported through institutional scholarships and sponsored R&D projects with ISRO, DST, and TIFAC – Mission REACH.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "phd-c4",
            domId: "",
            badge: "Global Co-Advising",
            title: "International Joint Supervision & Mobility",
            body: "Co-advised doctoral pathways and research visits with Vrije Universiteit (VU) Amsterdam, Technical University of Vienna (Austria), University of Göttingen, and leading global labs.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
      {
        id: "phd-b3",
        title: "Doctoral Milestone Roadmap",
        greyBg: false,
        cards: [
          {
            id: "phd-c5",
            domId: "",
            badge: "Phase 1",
            title: "Coursework & Qualifying Examination",
            body: "Advanced doctoral seminars in research methodology, formal verification, cryptography, and AI security, followed by comprehensive qualifying exams and research proposal defense.",
            linkLabel: "",
            linkUrl: "",
          },
          {
            id: "phd-c6",
            domId: "",
            badge: "Phase 2",
            title: "Publications & Dissertation Defense",
            body: "Original contributions published in top-tier IEEE/ACM journals and conferences, culminating in the doctoral dissertation and public defense.",
            linkLabel: "",
            linkUrl: "",
          },
        ],
      },
    ],
  },
};

function mergePage(defaultPage, storedPage) {
  if (!storedPage) return defaultPage;
  return {
    ...defaultPage,
    ...storedPage,
    pageBgColor: storedPage.pageBgColor ?? defaultPage.pageBgColor ?? "#ffffff",
    bandAltBgColor: storedPage.bandAltBgColor ?? defaultPage.bandAltBgColor ?? "#f4f6f9",
    heroBgColor: storedPage.heroBgColor ?? defaultPage.heroBgColor ?? "#0f172a",
    accentColor: storedPage.accentColor ?? defaultPage.accentColor ?? "",
    hero: {
      ...defaultPage.hero,
      ...(storedPage.hero || {}),
      stats: Array.isArray(storedPage.hero?.stats) ? storedPage.hero.stats : defaultPage.hero.stats,
    },
    feature: {
      ...defaultPage.feature,
      ...(storedPage.feature || {}),
      highlights: Array.isArray(storedPage.feature?.highlights)
        ? storedPage.feature.highlights
        : defaultPage.feature.highlights,
    },
    bands: Array.isArray(storedPage.bands) ? storedPage.bands : defaultPage.bands,
  };
}

export function loadProgramPages() {
  try {
    const raw = localStorage.getItem("adminSiteData");
    if (!raw) return DEFAULT_PROGRAM_PAGES;
    const parsed = JSON.parse(raw);
    const stored = parsed?.programPages || {};
    return {
      ug: mergePage(DEFAULT_PROGRAM_PAGES.ug, stored.ug),
      pg: mergePage(DEFAULT_PROGRAM_PAGES.pg, stored.pg),
      online: mergePage(DEFAULT_PROGRAM_PAGES.online, stored.online),
      phd: mergePage(DEFAULT_PROGRAM_PAGES.phd, stored.phd),
    };
  } catch {
    return DEFAULT_PROGRAM_PAGES;
  }
}

export function useProgramPageData(programKey) {
  const [page, setPage] = useState(() => loadProgramPages()[programKey] || DEFAULT_PROGRAM_PAGES[programKey]);
  const [heroImg, setHeroImg] = useState("");
  const [featureImg, setFeatureImg] = useState("");

  useEffect(() => {
    const sync = () => {
      const next = loadProgramPages()[programKey] || DEFAULT_PROGRAM_PAGES[programKey];
      setPage(next);
    };
    window.addEventListener("adminSiteDataUpdated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("adminSiteDataUpdated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [programKey]);

  useEffect(() => {
    let active = true;
    const src = page?.hero?.image || "";
    if (!src) {
      setHeroImg("");
      return;
    }
    resolveMediaUrl(src).then((url) => {
      if (active) setHeroImg(url);
    });
    return () => {
      active = false;
    };
  }, [page?.hero?.image]);

  useEffect(() => {
    let active = true;
    const src = page?.feature?.image || "";
    if (!src) {
      setFeatureImg("");
      return;
    }
    resolveMediaUrl(src).then((url) => {
      if (active) setFeatureImg(url);
    });
    return () => {
      active = false;
    };
  }, [page?.feature?.image]);

  return { page, heroImg, featureImg };
}

