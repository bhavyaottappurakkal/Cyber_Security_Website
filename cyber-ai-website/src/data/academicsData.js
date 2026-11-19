// ── Academic Programs Data & Defaults ─────────────────────────────────────────────

export const DEFAULT_POSTGRADUATE_CONTENT = {
  hero: {
    eyebrow: "Academics · Academic Programmes",
    title: "Postgraduate (M.Tech in Cybersecurity)",
    subtitle:
      "Advanced specialization in systems security, cloud defense, AI-driven protection, and cryptographic engineering with international dual-degree pathways at top global universities.",
    bgImage:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1920&q=85",
  },
  heroStats: [
    { id: 1, value: "2 yrs", label: "M.Tech Duration", badge: "PG", badgeStyle: "cyan" },
    { id: 2, value: "4", label: "Semesters", badge: "SEM", badgeStyle: "royal" },
    { id: 3, value: "80+", label: "Credits", badge: "CR", badgeStyle: "crimson" },
    { id: 4, value: "98%", label: "Placement Record", badge: "CIR", badgeStyle: "crimson", valueStyle: "crimson" },
  ],
  specializations: [
    {
      id: 1,
      icon: "🔐",
      title: "Systems Security & Exploit Analysis",
      desc: "Deep-dive into OS hardening, kernel exploitation, firmware reverse engineering, virtualization isolation, and hardware root-of-trust architectures.",
      color: "crimson",
      image: "",
    },
    {
      id: 2,
      icon: "☁️",
      title: "Cloud Security & DevSecOps",
      desc: "Hypervisor security, container isolation, cloud-native threat modeling, microservices segmentation, and enterprise zero-trust architectures.",
      color: "cyan",
      image: "",
    },
    {
      id: 3,
      icon: "🤖",
      title: "AI-Driven Defence & Agentic Threat Ops",
      desc: "Machine learning for automated vulnerability discovery, adversarial robustness, LLM security pipelines, and autonomous threat defense agents.",
      color: "royal",
      image: "",
    },
    {
      id: 4,
      icon: "🔑",
      title: "Post-Quantum Cryptography & PKI",
      desc: "Lattice-based cryptography, side-channel attack mitigation, formal protocol verification, and national enterprise PKI modernization.",
      color: "crimson",
      image: "",
    },
  ],
  researchLabs: [
    {
      id: 1,
      name: "Center for Cybersecurity Systems & Networks (CCSN)",
      focus: "National defense testbeds, critical infrastructure SCADA/ICS security, and funded R&D collaborations.",
      tag: "FLAGSHIP CENTER",
      tagStyle: "crimson",
      image: "",
    },
    {
      id: 2,
      name: "Vulnerability & Exploitation Research Lab",
      focus: "Automated binary fuzzing, symbolic execution, kernel zero-days, and real-time patch generation.",
      tag: "SYSTEMS & EXPLOIT",
      tagStyle: "cyan",
      image: "",
    },
    {
      id: 3,
      name: "Cloud & Sovereign AI Trust Testbed",
      focus: "Confidential computing, hardware enclaves (Intel SGX, AMD SEV), and AI model provenance verification.",
      tag: "AI & CLOUD",
      tagStyle: "royal",
      image: "",
    },
    {
      id: 4,
      name: "Post-Quantum Cryptography Cell",
      focus: "NIST PQC algorithm verification, cryptanalysis of lightweight primitives, and post-quantum TLS migration.",
      tag: "CRYPTO & PQC",
      tagStyle: "crimson",
      image: "",
    },
  ],
  fellowships: [
    {
      id: 1,
      label: "AICTE GATE FELLOWSHIP",
      labelColor: "crimson",
      title: "GATE Scholarship (₹12,400 / month)",
      text: "Monthly stipend awarded to all GATE-qualified students admitted to the M.Tech Cybersecurity program as per AICTE and MoE guidelines.",
      hoverColor: "crimson",
    },
    {
      id: 2,
      label: "RESEARCH ASSISTANTSHIPS",
      labelColor: "cyan",
      title: "Funded Project Fellowships",
      text: "Graduate research assistantships sponsored by MeitY, DRDO, DST, and ISRO research grants for thesis scholars.",
      hoverColor: "cyan",
    },
    {
      id: 3,
      label: "MERIT & TOPPER AWARDS",
      labelColor: "royal",
      title: "Chancellor's Merit Scholarship",
      text: "Substantial tuition waivers for top academic achievers and proven competitive CTF contributors pursuing PG studies.",
      hoverColor: "royal",
    },
    {
      id: 4,
      label: "GLOBAL DUAL-DEGREE",
      labelColor: "cyan",
      title: "International Dual-Degree Grants",
      text: "Travel subsidies and tuition exchange facilitation via ACIP for students pursuing dual degree programs abroad.",
      hoverColor: "cyan",
    },
  ],
  dualDegreePartners: [
    { id: 1, name: "Purdue University", country: "USA", flag: "🇺🇸", image: "" },
    { id: 2, name: "TU Delft", country: "Netherlands", flag: "🇳🇱", image: "" },
    { id: 3, name: "KIT Karlsruhe", country: "Germany", flag: "🇩🇪", image: "" },
    { id: 4, name: "University of Queensland", country: "Australia", flag: "🇦🇺", image: "" },
    { id: 5, name: "University of Auckland", country: "New Zealand", flag: "🇳🇿", image: "" },
  ],
  curriculum: [
    {
      id: 1,
      sem: "Semester 1",
      credits: "22 Credits · Advanced Core",
      courses: [
        "Advanced Computer Networks & Protocol Security",
        "Modern & Post-Quantum Cryptography",
        "Secure Software Architecture & Engineering",
        "Research Methods, Technical Writing & Ethics",
        "Cyber Threat Modeling & Seminar I",
      ],
    },
    {
      id: 2,
      sem: "Semester 2",
      credits: "22 Credits · Specialization Tracks",
      courses: [
        "Cloud Infrastructure Security & DevSecOps",
        "AI & Machine Learning for Cyber Defence",
        "Formal Methods & Binary Vulnerability Analysis",
        "Elective I: IoT Security / Blockchain Architectures",
        "Security Systems Lab & Seminar II",
      ],
    },
    {
      id: 3,
      sem: "Semester 3",
      credits: "18 Credits · Research & Internship",
      courses: [
        "Master Thesis Phase I (Problem Formulation & Literature Survey)",
        "Industry Internship / National Research Lab Placement",
        "Elective II: Automotive & SCADA Cyber-Physical Security",
        "Advanced Seminar on Zero-Trust Architectures",
      ],
    },
    {
      id: 4,
      sem: "Semester 4",
      credits: "18 Credits · Defense & Publication",
      courses: [
        "Master Thesis Phase II & Final Defense",
        "IEEE / ACM Paper Publication & Patent Submission",
        "Capstone R&D Demonstration & Industry Viva",
      ],
    },
  ],
  internships: [
    { id: 1, company: "Microsoft Research", role: "Security Research Intern", stipend: "₹1,00,000 / mo", image: "" },
    { id: 2, company: "DRDO", role: "Defense Cryptanalysis Fellow", stipend: "Govt Fellowship", image: "" },
    { id: 3, company: "Cisco Systems", role: "Cloud Security Engineer Intern", stipend: "₹85,000 / mo", image: "" },
    { id: 4, company: "ISRO Satellite Center", role: "Embedded Firmware Security Intern", stipend: "Sponsored", image: "" },
    { id: 5, company: "Palo Alto Networks", role: "Threat Intelligence Intern", stipend: "₹95,000 / mo", image: "" },
    { id: 6, company: "Bosch Global", role: "Automotive Security Intern", stipend: "₹65,000 / mo", image: "" },
  ],
  placements: [
    { id: 1, company: "Microsoft", role: "Senior Security Engineer", image: "" },
    { id: 2, company: "Cisco", role: "Threat Intelligence Researcher", image: "" },
    { id: 3, company: "Palo Alto Networks", role: "Cloud Security Architect", image: "" },
    { id: 4, company: "IBM Security", role: "Advanced Penetration Tester", image: "" },
    { id: 5, company: "DRDO", role: "Cyber Defense Scientist", image: "" },
    { id: 6, company: "ISRO", role: "Critical Systems Security Engineer", image: "" },
    { id: 7, company: "Amazon AWS", role: "Cloud Compliance Specialist", image: "" },
    { id: 8, company: "Qualcomm", role: "Hardware Trust & Silicon Security Engineer", image: "" },
  ],
  alumni: [
    {
      id: 1,
      initials: "PK",
      name: "Priya K.",
      batch: "M.Tech Cybersecurity · 2021",
      org: "Security Architect, Microsoft (Redmond)",
      quote:
        "The dual-degree pathway and research mentorship at Amrita gave me a head-start in cloud security that no other PG program could match. Publishing IEEE papers during M.Tech opened direct doors to Seattle.",
      color: "cyan",
      image: "",
    },
    {
      id: 2,
      initials: "SR",
      name: "Suresh R.",
      batch: "M.Tech Cybersecurity · 2020",
      org: "Scientist 'D', DRDO Cyber Directorate",
      quote:
        "Publishing three IEEE papers during my M.Tech and contributing to funded DRDO projects gave me hands-on national defense security experience from day one.",
      color: "royal",
      image: "",
    },
    {
      id: 3,
      initials: "AM",
      name: "Ananya M.",
      batch: "M.Tech Cybersecurity · 2022",
      org: "Threat Researcher, Cisco Talos",
      quote:
        "The rigorous lab environment and 24x7 research access allowed me to discover CVEs and build real malware classification models during my coursework.",
      color: "crimson",
      image: "",
    },
  ],
  customAreas: [],
};

export const DEFAULT_PHD_CONTENT = {
  hero: {
    eyebrow: "Academics · Academic Programmes",
    title: "Ph.D. in Cybersecurity",
    subtitle:
      "Advanced research in Agentic AI, Sovereign AI, Cloud Trust Modeling, and Critical Infrastructure Protection — pushing the frontiers of cybersecurity science.",
    bgImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85",
  },
  heroStats: [
    { id: 1, value: "3–5 yrs", label: "PhD Duration", badge: "PhD", badgeStyle: "royal" },
    { id: 2, value: "10+", label: "Active Labs", badge: "LAB", badgeStyle: "cyan" },
    { id: 3, value: "500+", label: "Publications", badge: "PUB", badgeStyle: "crimson" },
    { id: 4, value: "₹50L+", label: "Annual Funding", badge: "DST", badgeStyle: "crimson", valueStyle: "crimson" },
  ],
  researchAreas: [
    {
      id: 1,
      icon: "🤖",
      title: "Agentic AI Systems & Multi-Agent Security",
      desc: "Research on autonomous AI agents, multi-agent coordination, adversarial jailbreaks, and security of large language model deployments.",
      image: "",
    },
    {
      id: 2,
      icon: "🌐",
      title: "Sovereign & Trusted AI Infrastructure",
      desc: "AI governance frameworks, model auditing, trust verification, and deployment of AI in critical national infrastructure.",
      image: "",
    },
    {
      id: 3,
      icon: "☁️",
      title: "Cloud & Hypervisor Security",
      desc: "Virtualization escapes, container security, cloud-native zero-trust architectures, and secure confidential computing.",
      image: "",
    },
    {
      id: 4,
      icon: "📡",
      title: "IoT & CPS Security",
      desc: "Security of embedded firmware, SCADA systems, automotive ECUs, and industrial control systems against targeted attacks.",
      image: "",
    },
    {
      id: 5,
      icon: "🔑",
      title: "Post-Quantum Cryptography",
      desc: "Lattice-based, hash-based, and code-based cryptographic primitives; NIST PQC standardization and implementation attacks.",
      image: "",
    },
    {
      id: 6,
      icon: "🏥",
      title: "Healthcare & Biomedical Device Security",
      desc: "Security of medical devices, implantable electronics, EHR systems, clinical data integrity, and healthcare IoT.",
      image: "",
    },
  ],
  fundingPartners: [
    { id: 1, name: "DST", fullName: "Department of Science & Technology", image: "" },
    { id: 2, name: "MeitY", fullName: "Ministry of Electronics & IT", image: "" },
    { id: 3, name: "ISRO", fullName: "Indian Space Research Organisation", image: "" },
    { id: 4, name: "DRDO", fullName: "Defence R&D Organisation", image: "" },
    { id: 5, name: "SERB", fullName: "Science and Engineering Research Board", image: "" },
    { id: 6, name: "Intel Labs", fullName: "Intel Collaborative Research", image: "" },
  ],
  fellowships: [
    {
      id: 1,
      label: "NATIONAL FELLOWSHIPS",
      labelColor: "crimson",
      title: "CSIR / UGC-JRF Fellowship",
      text: "Full monthly financial stipend (₹37,000 + HRA) with contingency support for scholars qualifying CSIR/UGC JRF exams.",
      hoverColor: "crimson",
    },
    {
      id: 2,
      label: "INSTITUTIONAL GRANTS",
      labelColor: "cyan",
      title: "Amrita Doctoral Research Fellowship (ADRF)",
      text: "Full tuition waivers and competitive monthly stipends (₹25,000 to ₹35,000) for meritorious full-time PhD candidates.",
      hoverColor: "cyan",
    },
    {
      id: 3,
      label: "PRESTIGIOUS GRANTS",
      labelColor: "royal",
      title: "PMRF / DST-INSPIRE",
      text: "Prime Minister's Research Fellowship (PMRF) support for top-tier graduates pursuing national priority cybersecurity problems.",
      hoverColor: "royal",
    },
    {
      id: 4,
      label: "INDUSTRY SPONSORED",
      labelColor: "cyan",
      title: "Corporate Doctoral Grants",
      text: "Full fellowship funding supported by Cisco Research, Intel, and global technology corporate partner grants.",
      hoverColor: "cyan",
    },
  ],
  phdGuide: [
    {
      id: 1,
      phase: "Year 1",
      activities: [
        "Coursework (formal methods, advanced cryptography, research methods)",
        "Literature survey & state-of-the-art analysis",
        "Qualification examination & doctoral committee formation",
      ],
    },
    {
      id: 2,
      phase: "Year 2",
      activities: [
        "Thesis proposal & comprehensive viva",
        "Initial prototype experiments & paper submissions",
        "Conference presentations (IEEE/ACM)",
      ],
    },
    {
      id: 3,
      phase: "Year 3–4",
      activities: [
        "Core research contributions & patent filings",
        "Journal publications (Q1/Q2 IEEE/ACM Transactions)",
        "Industry or government research collaborations & testbed evaluations",
      ],
    },
    {
      id: 4,
      phase: "Year 5",
      activities: [
        "Thesis writing & peer-review synthesis",
        "Pre-submission synopsis seminar",
        "Doctoral viva voce public examination & degree award",
      ],
    },
  ],
  alumni: [
    {
      id: 1,
      initials: "VA",
      name: "Dr. Vijay A.",
      info: "PhD 2022 · Assistant Professor, IIT Bombay",
      quote:
        "The research environment at Amrita, with direct access to government-funded projects and world-class mentors, was pivotal in my academic career.",
      color: "royal",
      image: "",
    },
    {
      id: 2,
      initials: "LN",
      name: "Dr. Lakshmi N.",
      info: "PhD 2021 · Research Scientist, ISRO",
      quote:
        "Publishing in IEEE S&P and collaborating with ISRO during my PhD gave me industry-level impact from day one of my research career.",
      color: "cyan",
      image: "",
    },
  ],
  customAreas: [],
};

export const DEFAULT_ONLINE_MCA_CONTENT = {
  hero: {
    eyebrow: "Academics · Academic Programmes",
    title: "Online MCA in Cybersecurity",
    subtitle:
      "Globally recognized, fully online Master of Computer Applications in Cybersecurity — designed for students and working professionals worldwide.",
    bgImage:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1920&q=85",
  },
  heroStats: [
    { id: 1, value: "2 yrs", label: "MCA Duration", badge: "PG", badgeStyle: "cyan" },
    { id: 2, value: "4", label: "Semesters", badge: "SEM", badgeStyle: "royal" },
    { id: 3, value: "100%", label: "Online Flexible", badge: "ONLINE", badgeStyle: "crimson" },
    { id: 4, value: "50+", label: "Countries Enrolled", badge: "GLOBAL", badgeStyle: "crimson", valueStyle: "crimson" },
  ],
  highlights: [
    {
      id: 1,
      icon: "🌍",
      title: "Learn From Anywhere",
      desc: "Fully online delivery — attend live sessions or catch up on recordings at your own pace from any country.",
      image: "",
    },
    {
      id: 2,
      icon: "🏛️",
      title: "Globally Recognized Degree",
      desc: "Amrita Vishwa Vidyapeetham (NAAC A++) degree, recognized by UGC and valued worldwide by employers.",
      image: "",
    },
    {
      id: 3,
      icon: "💼",
      title: "Working Professional Friendly",
      desc: "Weekend and evening class schedules designed for working professionals without career disruption.",
      image: "",
    },
    {
      id: 4,
      icon: "🤝",
      title: "Industry Mentorship",
      desc: "Live sessions and guest lectures from industry practitioners at leading cybersecurity organizations.",
      image: "",
    },
    {
      id: 5,
      icon: "🔬",
      title: "Hands-On Virtual Labs",
      desc: "Virtual cybersecurity labs with real-world tools: Metasploit, Wireshark, Kali Linux, cloud security sandboxes.",
      image: "",
    },
    {
      id: 6,
      icon: "📜",
      title: "UGC Entitled Degree",
      desc: "Fully entitled by the UGC — equivalent in standing to any on-campus MCA degree from Amrita.",
      image: "",
    },
  ],
  curriculum: [
    {
      id: 1,
      sem: "Semester 1",
      courses: [
        "Foundations of Cybersecurity & Linux Systems",
        "Network Security & Protocols",
        "Python for Security Automation",
        "Database Architecture & Hardening",
      ],
    },
    {
      id: 2,
      sem: "Semester 2",
      courses: [
        "Ethical Hacking & Penetration Testing",
        "Web Application Security & OWASP Top 10",
        "Cloud Security Fundamentals",
        "Applied Cryptography & Authentication",
      ],
    },
    {
      id: 3,
      sem: "Semester 3",
      courses: [
        "Incident Response & Digital Forensics",
        "Security Operations Center (SOC & SIEM)",
        "AI & Machine Learning for Security",
        "Elective: IoT Security / Blockchain",
      ],
    },
    {
      id: 4,
      sem: "Semester 4",
      courses: [
        "Capstone Project — Industry Problem Statement",
        "Cybersecurity Governance & Compliance (GRC)",
        "Comprehensive Seminar & Final Viva",
      ],
    },
  ],
  placements: [
    { id: 1, company: "TCS", role: "Security Analyst", image: "" },
    { id: 2, company: "Wipro", role: "SOC Analyst", image: "" },
    { id: 3, company: "Infosys", role: "Cloud Security Consultant", image: "" },
    { id: 4, company: "HCL", role: "Penetration Tester", image: "" },
    { id: 5, company: "Capgemini", role: "GRC Analyst", image: "" },
    { id: 6, company: "Accenture", role: "Cyber Threat Analyst", image: "" },
  ],
  faqs: [
    {
      id: 1,
      q: "Who is eligible to apply?",
      a: "Any graduate (B.Sc / BCA / B.Tech / BA / B.Com etc.) with at least 50% marks. Final-year students may also apply.",
    },
    {
      id: 2,
      q: "Is this degree valid for government jobs?",
      a: "Yes. The degree is fully UGC-entitled and equivalent to any regular MCA in all respects including government recruitment.",
    },
    {
      id: 3,
      q: "Do I need to visit the campus?",
      a: "No campus visits are mandatory. All learning, exams, and project evaluations are conducted online.",
    },
    {
      id: 4,
      q: "Can I pursue this alongside a job?",
      a: "Absolutely. The program is specifically designed for working professionals with flexible scheduling.",
    },
    {
      id: 5,
      q: "What is the fee structure?",
      a: "Fees are structured affordably per semester. Scholarships and EMI options are available. Contact admissions for details.",
    },
  ],
  customAreas: [],
};

// Helper normalizers
export function normalizePostgraduate(raw) {
  if (!raw) return DEFAULT_POSTGRADUATE_CONTENT;
  return {
    ...DEFAULT_POSTGRADUATE_CONTENT,
    ...raw,
    hero: { ...DEFAULT_POSTGRADUATE_CONTENT.hero, ...(raw.hero || {}) },
    heroStats: raw.heroStats || DEFAULT_POSTGRADUATE_CONTENT.heroStats,
    specializations: raw.specializations || DEFAULT_POSTGRADUATE_CONTENT.specializations,
    researchLabs: raw.researchLabs || DEFAULT_POSTGRADUATE_CONTENT.researchLabs,
    fellowships: raw.fellowships || DEFAULT_POSTGRADUATE_CONTENT.fellowships,
    dualDegreePartners: raw.dualDegreePartners || DEFAULT_POSTGRADUATE_CONTENT.dualDegreePartners,
    curriculum: raw.curriculum || DEFAULT_POSTGRADUATE_CONTENT.curriculum,
    internships: raw.internships || DEFAULT_POSTGRADUATE_CONTENT.internships,
    placements: raw.placements || DEFAULT_POSTGRADUATE_CONTENT.placements,
    alumni: raw.alumni || DEFAULT_POSTGRADUATE_CONTENT.alumni,
    customAreas: raw.customAreas || [],
  };
}

export function normalizePhD(raw) {
  if (!raw) return DEFAULT_PHD_CONTENT;
  return {
    ...DEFAULT_PHD_CONTENT,
    ...raw,
    hero: { ...DEFAULT_PHD_CONTENT.hero, ...(raw.hero || {}) },
    heroStats: raw.heroStats || DEFAULT_PHD_CONTENT.heroStats,
    researchAreas: raw.researchAreas || DEFAULT_PHD_CONTENT.researchAreas,
    fundingPartners: raw.fundingPartners || DEFAULT_PHD_CONTENT.fundingPartners,
    fellowships: raw.fellowships || DEFAULT_PHD_CONTENT.fellowships,
    phdGuide: raw.phdGuide || DEFAULT_PHD_CONTENT.phdGuide,
    alumni: raw.alumni || DEFAULT_PHD_CONTENT.alumni,
    customAreas: raw.customAreas || [],
  };
}

export function normalizeOnlineMCA(raw) {
  if (!raw) return DEFAULT_ONLINE_MCA_CONTENT;
  return {
    ...DEFAULT_ONLINE_MCA_CONTENT,
    ...raw,
    hero: { ...DEFAULT_ONLINE_MCA_CONTENT.hero, ...(raw.hero || {}) },
    heroStats: raw.heroStats || DEFAULT_ONLINE_MCA_CONTENT.heroStats,
    highlights: raw.highlights || DEFAULT_ONLINE_MCA_CONTENT.highlights,
    curriculum: raw.curriculum || DEFAULT_ONLINE_MCA_CONTENT.curriculum,
    placements: raw.placements || DEFAULT_ONLINE_MCA_CONTENT.placements,
    faqs: raw.faqs || DEFAULT_ONLINE_MCA_CONTENT.faqs,
    customAreas: raw.customAreas || [],
  };
}
