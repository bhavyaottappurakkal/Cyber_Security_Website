import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ABOUT_CONTENT } from "./About";
import { DEFAULT_ACADEMICS_CONTENT } from "./Academics";
import "./AdminDashboard.css";

// ─── Role Definitions ─────────────────────────────────────────────────────────
// admin           → full access to everything including user management
// content_editor  → can edit about, hero, highlights, speakers, faculty, research, contact, academics
// academic_editor → can ONLY edit Academics page (full Add, Edit, Delete privileges)
// about_editor    → can ONLY edit About page (full Add, Edit, Delete privileges)
// event_editor    → can ONLY edit news and events
// custom          → customizable privileges per section and action
const ROLE_META = {
  admin: { label: "Admin", color: "role-admin", icon: "👑", sections: "ALL" },
  content_editor: {
    label: "Content Editor",
    color: "role-content",
    sections: [
      "overview",
      "aboutContent",
      "heroContent",
      "highlights",
      "speakers",
      "faculty",
      "researchAreas",
      "contactInfo",
      "academicsContent",
      "changePassword",
    ],
  },
  academic_editor: {
    label: "Academic Editor",
    color: "role-academic",
    icon: "🎓",
    sections: ["overview", "academicsContent", "changePassword"],
  },
  about_editor: {
    label: "About Editor",
    color: "role-about",
    sections: ["overview", "aboutContent", "changePassword"],
  },
  event_editor: {
    label: "Event Editor",
    color: "role-event",
    sections: ["overview", "news", "events", "changePassword"],
  },
  custom: {
    label: "Custom Privileges",
    color: "role-custom",
    sections: [],
  },
};

function getPrivilegesForRole(role) {
  if (role === "admin") {
    return {
      aboutContent:      { view: true, add: true, edit: true, delete: true },
      heroContent:       { view: true, add: true, edit: true, delete: true },
      highlights:        { view: true, add: true, edit: true, delete: true },
      news:              { view: true, add: true, edit: true, delete: true },
      events:            { view: true, add: true, edit: true, delete: true },
      speakers:          { view: true, add: true, edit: true, delete: true },
      faculty:           { view: true, add: true, edit: true, delete: true },
      researchAreas:     { view: true, add: true, edit: true, delete: true },
      contactInfo:       { view: true, add: true, edit: true, delete: true },
      academicsContent:  { view: true, add: true, edit: true, delete: true },
    };
  }
  if (role === "academic_editor") {
    return {
      aboutContent:      { view: false, add: false, edit: false, delete: false },
      heroContent:       { view: false, add: false, edit: false, delete: false },
      highlights:        { view: false, add: false, edit: false, delete: false },
      news:              { view: false, add: false, edit: false, delete: false },
      events:            { view: false, add: false, edit: false, delete: false },
      speakers:          { view: false, add: false, edit: false, delete: false },
      faculty:           { view: false, add: false, edit: false, delete: false },
      researchAreas:     { view: false, add: false, edit: false, delete: false },
      contactInfo:       { view: false, add: false, edit: false, delete: false },
      academicsContent:  { view: true,  add: true,  edit: true,  delete: true  },
    };
  }
  if (role === "about_editor") {
    return {
      aboutContent:      { view: true,  add: true,  edit: true,  delete: true  },
      heroContent:       { view: false, add: false, edit: false, delete: false },
      highlights:        { view: false, add: false, edit: false, delete: false },
      news:              { view: false, add: false, edit: false, delete: false },
      events:            { view: false, add: false, edit: false, delete: false },
      speakers:          { view: false, add: false, edit: false, delete: false },
      faculty:           { view: false, add: false, edit: false, delete: false },
      researchAreas:     { view: false, add: false, edit: false, delete: false },
      contactInfo:       { view: false, add: false, edit: false, delete: false },
      academicsContent:  { view: false, add: false, edit: false, delete: false },
    };
  }
  if (role === "event_editor") {
    return {
      aboutContent:      { view: false, add: false, edit: false, delete: false },
      heroContent:       { view: false, add: false, edit: false, delete: false },
      highlights:        { view: false, add: false, edit: false, delete: false },
      news:              { view: true,  add: true,  edit: true,  delete: true  },
      events:            { view: true,  add: true,  edit: true,  delete: true  },
      speakers:          { view: false, add: false, edit: false, delete: false },
      faculty:           { view: false, add: false, edit: false, delete: false },
      researchAreas:     { view: false, add: false, edit: false, delete: false },
      contactInfo:       { view: false, add: false, edit: false, delete: false },
      academicsContent:  { view: false, add: false, edit: false, delete: false },
    };
  }
  // content_editor
  return {
    aboutContent:      { view: true,  add: true,  edit: true,  delete: true  },
    heroContent:       { view: true,  add: false, edit: true,  delete: false },
    highlights:        { view: true,  add: true,  edit: true,  delete: true  },
    news:              { view: false, add: false, edit: false, delete: false },
    events:            { view: false, add: false, edit: false, delete: false },
    speakers:          { view: true,  add: true,  edit: true,  delete: true  },
    faculty:           { view: true,  add: true,  edit: true,  delete: true  },
    researchAreas:     { view: true,  add: true,  edit: true,  delete: true  },
    contactInfo:       { view: true,  add: false, edit: true,  delete: false },
    academicsContent:  { view: true,  add: true,  edit: true,  delete: true  },
  };
}

// ─── Initial Site Data ────────────────────────────────────────────────────────
const INITIAL_DATA = {
  news: [
    {
      id: 1,
      date: "30 Jul 2026",
      title:
        "Amrita Vishwa Vidyapeetham Reveals How AI is Industrialising Online Scams",
      excerpt:
        "Groundbreaking research from Amrita reveals the systematic use of AI in orchestrating large-scale online scams.",
      tag: "Research",
    },
    {
      id: 2,
      date: "28 Jul 2026",
      title: "Amrita Researchers Win Best Paper Award at ACL 2026 Workshop",
      excerpt:
        "Amrita researchers were recognized at the ACL 2026 Workshop for their innovative study on generative AI.",
      tag: "Achievement",
    },
    {
      id: 3,
      date: "20 May 2026",
      title:
        "Campus to the United Nations: amFOSS Student Selected for UNECE Assignment",
      excerpt:
        "Amrita student Surendran from the amFOSS community has been selected for a UN open-source initiative.",
      tag: "Students",
    },
    {
      id: 4,
      date: "14 Dec 2025",
      title:
        "AI Safety Conclave Releases White Paper on Ethical AI for the Global South",
      excerpt:
        "The AI Safety Conclave held at Amrita produced a landmark white paper on ethical and safe AI.",
      tag: "Events",
    },
    {
      id: 5,
      date: "09 Jul 2024",
      title: "Announcement of Phase III of Student Induction Programme",
      excerpt:
        "The Center announces Phase III of its comprehensive Student Induction Programme for the new B.Tech. batch.",
      tag: "Academics",
    },
  ],
  events: [
    {
      id: 1,
      title: "AI Safety Conclave",
      desc: "High-level symposium addressing safe, ethical, and sovereign AI frameworks for India and the Global South.",

      type: "Annual Event",
      tags: "AI Safety, Policy, Ethics",
    },
    {
      id: 2,
      title: "InCTF — India Capture The Flag",
      desc: "India's premier national CTF cybersecurity competition organized by the Center.",

      type: "Annual Competition",
      tags: "CTF, Competition, Students",
    },
    {
      id: 3,
      title: "ShaktiCon",
      desc: "International cybersecurity conference dedicated to empowering women in cybersecurity.",

      type: "Annual Conference",
      tags: "Women in Cybersecurity, Conference, Training",
    },
  ],
  speakers: [
    {
      id: 1,
      name: "Satyanand Mishra",
      title: "IAS, Former Chief Information Commissioner of India",
      category: "Government",
    },
    {
      id: 2,
      name: "J. Satyanarayana",
      title: "Department of Electronics and IT (DeitY), Govt. of India",
      category: "Government",
    },
    {
      id: 3,
      name: "Vijay Bhatkar",
      title: "IIT Delhi, Architect of PARAM Supercomputers",
      category: "Academia",
    },
    {
      id: 4,
      name: "Esther Dyson",
      title: "Founder of ICANN",
      category: "Industry",
    },
    {
      id: 5,
      name: "Herbert Bos",
      title: "Vrije Universiteit Amsterdam, Netherlands",
      category: "Academia",
    },
    {
      id: 6,
      name: "Ravi Sandhu",
      title: "University of Texas at San Antonio, USA",
      category: "Academia",
    },
    {
      id: 7,
      name: "Gene Tsudik",
      title: "University of California, USA",
      category: "Academia",
    },
    {
      id: 8,
      name: "K. Venkatesh Prasad",
      title: "Ford Motor Company, USA",
      category: "Industry",
    },
    {
      id: 9,
      name: "Lipika Dey",
      title: "Tata Consultancy Services (TCS)",
      category: "Industry",
    },
  ],
  faculty: [
    {
      id: 1,
      name: "Dr. Krishnashree Achuthan",
      designation: "Dean of PG Programs, School of Engineering",
      roles:
        "Director, Center for Cybersecurity Systems and Networks, Amritapuri\nDirector, Technology Business Incubator (TBI), Amritapuri",
      expertise:
        "Cybersecurity, AI & Machine Learning, Cloud Security, IoT Security",

      isLeadership: "true",
    },
  ],
  researchAreas: [
    {
      id: 1,

      title: "Agentic AI & Autonomous Cyber Defense",
      shortDesc:
        "Intelligent agents for autonomous threat detection and adaptive defense.",
      color: "area-blue",
    },
    {
      id: 2,

      title: "Physical AI and Embodied Intelligence",
      shortDesc:
        "AI for autonomous systems, robotics, drones, and intelligent machines.",
      color: "area-cyan",
    },
    {
      id: 3,

      title: "AI Sovereignty and Trusted AI Infrastructure",
      shortDesc:
        "Sovereign AI platforms, federated learning, privacy-preserving architectures.",
      color: "area-teal",
    },
    {
      id: 4,

      title: "Cloud-Based Soft Sensors & Hypervisor Re-Architecture",
      shortDesc:
        "Security-enabled data object (SEDO) layer for insider threat protection.",
      color: "area-blue",
    },
    {
      id: 5,

      title: "Internet of Things (IoT) and Security",
      shortDesc:
        "Secure device identification, registration, and concurrent event processing.",
      color: "area-teal",
    },
    {
      id: 6,

      title: "Cryptography & Boolean Functions",
      shortDesc:
        "Boolean function classification and higher-order nonlinearities.",
      color: "area-blue",
    },
    {
      id: 7,

      title: "Healthcare Security",
      shortDesc:
        "Securing connected medical devices, wearables, and implantable devices.",
      color: "area-cyan",
    },
    {
      id: 8,

      title: "Big Data Analytics Platform",
      shortDesc:
        "Distributed parallel database with auto-scalable ML analytics for IoT data.",
      color: "area-navy",
    },
    {
      id: 9,

      title: "Automotive Security",
      shortDesc:
        "Secure automotive infotainment platforms for safe inter-vehicular data exchange.",
      color: "area-teal",
    },
    {
      id: 10,

      title: "Security Education",
      shortDesc:
        "Innovative approaches to cybersecurity education, training, and awareness.",
      color: "area-navy",
    },
  ],
  highlights: [
    {
      id: 1,

      title: "CORE Designation",
      badge: "Govt. of India",
      desc: "Designated as a Center of Relevance and Excellence (CORE) for Cybersecurity in India.",
    },
    {
      id: 2,

      title: "Accredited 'A++' Grade",
      badge: "NAAC Accredited",
      desc: "Accredited 'A++' Grade by NAAC.",
    },
    {
      id: 3,

      title: "World's Top 100",
      badge: "THE Impact Rankings",
      desc: "Ranked in the World's Top 100 Universities in Times Higher Education (THE) Impact Rankings.",
    },
    {
      id: 4,

      title: "100+ Patents Granted",
      badge: "Innovation Record",
      desc: "100+ Patents Granted across Amrita Vishwa Vidyapeetham.",
    },
  ],
  heroContent: {
    tagline: "CENTER OF RELEVANCE & EXCELLENCE",
    title: "Amrita Center for Cybersecurity Systems and Networks",
    description:
      "Fostering innovative research and education in Cybersecurity and Artificial Intelligence through partnerships across industry, academia, and the government.",
    btn1: "Explore Research",
    btn2: "Academic Programs",
  },
  contactInfo: {
    address: "Amritapuri Campus, Clappanna P.O., Kollam, Kerala 690525",
    phone: "+91 (0) 476 2804517",
    email: "cyber@am.amrita.edu",
    mapEmbed: "https://maps.google.com/?q=Amritapuri+Campus+Kerala",
  },
  aboutContent: DEFAULT_ABOUT_CONTENT,
  academicsContent: DEFAULT_ACADEMICS_CONTENT,
};

// ─── All Sections (admin sees all) ───────────────────────────────────────────
const ALL_SECTIONS = [
  { key: "overview", label: "Dashboard", icon: "📊" },
  { key: "aboutContent", label: "About Page", icon: "📖" },
  { key: "heroContent", label: "Hero / Home", icon: "🏠" },
  { key: "highlights", label: "Key Highlights", icon: "⭐" },
  { key: "news", label: "News", icon: "📰" },
  { key: "events", label: "Events", icon: "🗓️" },
  { key: "speakers", label: "Speakers", icon: "🎤" },
  { key: "faculty", label: "Faculty", icon: "👨‍🏫" },
  { key: "researchAreas", label: "Research Areas", icon: "🔬" },
  { key: "contactInfo", label: "Contact Info", icon: "📞" },
  { key: "academicsContent", label: "Academics Page", icon: "🎓" },
  { key: "users", label: "User Management", icon: "👥", adminOnly: true },
  { key: "changePassword", label: "Change Password", icon: "🔑" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function newId(list) {
  return list.length ? Math.max(...list.map((i) => i.id)) + 1 : 1;
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("cyberPanelUsers") || "[]");
  } catch {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem("cyberPanelUsers", JSON.stringify(users));
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  // Current logged-in user
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("adminUser") || "null");
    } catch {
      return null;
    }
  });

  const isAdmin = currentUser?.role === "admin";
  const userRole = currentUser?.role || "admin";

  // Sections visible to current user
  const visibleSections = ALL_SECTIONS.filter((s) => {
    if (s.adminOnly && !isAdmin) return false;
    if (ROLE_META[userRole]?.sections === "ALL") return true;
    if (currentUser?.privileges && currentUser.privileges[s.key]) {
      const p = currentUser.privileges[s.key];
      return typeof p === "boolean" ? p : !!p.view;
    }
    const roleSections = ROLE_META[userRole]?.sections;
    return Array.isArray(roleSections) && roleSections.includes(s.key);
  });

  const hasPrivilege = (section, action = "edit") => {
    if (isAdmin) return true;
    if (!currentUser) return false;
    if (currentUser.privileges && currentUser.privileges[section]) {
      const p = currentUser.privileges[section];
      if (typeof p === "boolean") return p;
      return !!p[action];
    }
    if (userRole === "about_editor" && section === "aboutContent") return true;
    if (userRole === "academic_editor" && section === "academicsContent") return true;
    if (
      userRole === "content_editor" &&
      section !== "news" &&
      section !== "events" &&
      section !== "users"
    )
      return true;
    if (
      userRole === "event_editor" &&
      (section === "news" || section === "events")
    )
      return true;
    return false;
  };

  const [activeSection, setActiveSection] = useState("overview");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("adminSiteData");
    if (!saved) return INITIAL_DATA;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_DATA,
        ...parsed,
        aboutContent: parsed.aboutContent || INITIAL_DATA.aboutContent,
        academicsContent: parsed.academicsContent ? {
          ...DEFAULT_ACADEMICS_CONTENT,
          ...parsed.academicsContent,
          hero: { ...DEFAULT_ACADEMICS_CONTENT.hero, ...(parsed.academicsContent.hero || {}) },
          studentLife: {
            ...DEFAULT_ACADEMICS_CONTENT.studentLife,
            ...(parsed.academicsContent.studentLife || {}),
            items: parsed.academicsContent.studentLife?.items || (Array.isArray(parsed.academicsContent.studentLife) ? parsed.academicsContent.studentLife : DEFAULT_ACADEMICS_CONTENT.studentLife.items),
          },
          pride: {
            ...DEFAULT_ACADEMICS_CONTENT.pride,
            ...(parsed.academicsContent.pride || {}),
            items: parsed.academicsContent.pride?.items || (Array.isArray(parsed.academicsContent.pride) ? parsed.academicsContent.pride : DEFAULT_ACADEMICS_CONTENT.pride.items),
          },
          communities: {
            ...DEFAULT_ACADEMICS_CONTENT.communities,
            ...(parsed.academicsContent.communities || {}),
            items: parsed.academicsContent.communities?.items || (Array.isArray(parsed.academicsContent.communities) ? parsed.academicsContent.communities : DEFAULT_ACADEMICS_CONTENT.communities.items),
          },
          scholarships: {
            ...DEFAULT_ACADEMICS_CONTENT.scholarships,
            ...(parsed.academicsContent.scholarships || {}),
            items: parsed.academicsContent.scholarships?.items || (Array.isArray(parsed.academicsContent.scholarships) ? parsed.academicsContent.scholarships : DEFAULT_ACADEMICS_CONTENT.scholarships.items),
          },
          overseas: {
            ...DEFAULT_ACADEMICS_CONTENT.overseas,
            ...(parsed.academicsContent.overseas || {}),
            dualDegreePartners: parsed.academicsContent.overseas?.dualDegreePartners || parsed.academicsContent.dualDegreePartners || DEFAULT_ACADEMICS_CONTENT.overseas.dualDegreePartners,
            exchangeCountries: parsed.academicsContent.overseas?.exchangeCountries || parsed.academicsContent.exchangeCountries || DEFAULT_ACADEMICS_CONTENT.overseas.exchangeCountries,
          },
          curriculum: {
            ...DEFAULT_ACADEMICS_CONTENT.curriculum,
            ...(parsed.academicsContent.curriculum || {}),
            years: parsed.academicsContent.curriculum?.years || (Array.isArray(parsed.academicsContent.curriculum) ? parsed.academicsContent.curriculum : DEFAULT_ACADEMICS_CONTENT.curriculum.years),
          },
          internships: {
            ...DEFAULT_ACADEMICS_CONTENT.internships,
            ...(parsed.academicsContent.internships || parsed.academicsContent.internship || {}),
            items: parsed.academicsContent.internships?.items || parsed.academicsContent.internship?.items || DEFAULT_ACADEMICS_CONTENT.internships.items,
          },
          placements: {
            ...DEFAULT_ACADEMICS_CONTENT.placements,
            ...(parsed.academicsContent.placements || parsed.academicsContent.placement || {}),
            items: parsed.academicsContent.placements?.items || parsed.academicsContent.placement?.items || DEFAULT_ACADEMICS_CONTENT.placements.items,
          },
          events: {
            ...DEFAULT_ACADEMICS_CONTENT.events,
            ...(parsed.academicsContent.events && !Array.isArray(parsed.academicsContent.events) ? parsed.academicsContent.events : {}),
            items: Array.isArray(parsed.academicsContent.events) ? parsed.academicsContent.events : (parsed.academicsContent.events?.items || DEFAULT_ACADEMICS_CONTENT.events.items),
          },
          socialMedia: {
            ...DEFAULT_ACADEMICS_CONTENT.socialMedia,
            ...(parsed.academicsContent.socialMedia || {}),
            links: parsed.academicsContent.socialMedia?.links || (Array.isArray(parsed.academicsContent.socialMedia) ? parsed.academicsContent.socialMedia : DEFAULT_ACADEMICS_CONTENT.socialMedia.links),
          },
          alumni: {
            ...DEFAULT_ACADEMICS_CONTENT.alumni,
            ...(parsed.academicsContent.alumni && !Array.isArray(parsed.academicsContent.alumni) ? parsed.academicsContent.alumni : {}),
            items: Array.isArray(parsed.academicsContent.alumni) ? parsed.academicsContent.alumni : (parsed.academicsContent.alumni?.items || DEFAULT_ACADEMICS_CONTENT.alumni.items),
          },
        } : DEFAULT_ACADEMICS_CONTENT,
      };
    } catch {
      return INITIAL_DATA;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Academics Page state
  const [acTab, setAcTab] = useState("hero");
  const [acCurriculumYear, setAcCurriculumYear] = useState("Year 1");
  const [acModal, setAcModal] = useState({
    show: false,
    section: "",
    mode: "add",
    item: {},
    meta: {},
  });

  // Single-object section local copies
  const [localHero, setLocalHero] = useState({ ...INITIAL_DATA.heroContent });
  const [localContact, setLocalContact] = useState({
    ...INITIAL_DATA.contactInfo,
  });

  // About Page state & local copies
  const [aboutTab, setAboutTab] = useState("overview"); // overview, cards, missionVision, inside, university
  const [localAboutOverview, setLocalAboutOverview] = useState({
    badge: "ABOUT US",
    titlePrefix: "Amrita Center for",
    titleTeal: "Cybersecurity",
    titleSuffix: "Systems and Networks",
    eyebrow: "Overview",
    title: "Who We Are",
    p1: "",
    p2: "",
    p3: "",
  });
  const [localAboutMission, setLocalAboutMission] = useState({
    missionTitle: "Our Mission",
    missionText: "",
    visionTitle: "Our Vision",
    visionText: "",
    specificsLabel: "Specifically:",
  });
  const [localAboutUniv, setLocalAboutUniv] = useState({
    eyebrow: "Amrita Vishwa Vidyapeetham",
    title: "Part of a World-Class University",
    p1: "",
    p2: "",
  });

  // Modal for About items (Cards, Points, Inside Offerings, Stats)
  const [aboutItemModal, setAboutItemModal] = useState({
    show: false,
    type: "", // 'card' | 'point' | 'offering' | 'stat'
    mode: "add", // 'add' | 'edit'
    item: {},
  });
  const [aboutDeleteModal, setAboutDeleteModal] = useState({
    show: false,
    type: "",
    id: null,
    title: "",
  });

  // Quick privilege edit modal for user management
  const [userPrivilegeModal, setUserPrivilegeModal] = useState({
    show: false,
    userId: null,
    userName: "",
    role: "content_editor",
    privileges: {},
  });

  // Password change
  const [pwForm, setPwForm] = useState({
    current: "",
    newPw: "",
    confirm: "",
    show: false,
  });
  const [pwError, setPwError] = useState("");

  // User management
  const [users, setUsers] = useState(getStoredUsers);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "content_editor",
    active: true,
    privileges: getPrivilegesForRole("content_editor"),
  });
  const [userFormError, setUserFormError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userDeleteConfirm, setUserDeleteConfirm] = useState(null);

  // ── Auth Guard ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") !== "true")
      navigate("/cyber-panel");
  }, [navigate]);

  // ── Persist site data ────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("adminSiteData", JSON.stringify(data));
  }, [data]);

  // ── Persist users ────────────────────────────────────────────────────────
  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  // ── Sync hero / contact / about local copies ────────────────────────────
  useEffect(() => {
    setLocalHero({ ...data.heroContent });
  }, [data.heroContent]);
  useEffect(() => {
    setLocalContact({ ...data.contactInfo });
  }, [data.contactInfo]);

  useEffect(() => {
    if (data.aboutContent) {
      const ac = data.aboutContent;
      setLocalAboutOverview({
        badge: ac.hero?.badge || "ABOUT US",
        titlePrefix: ac.hero?.titlePrefix || "Amrita Center for",
        titleTeal: ac.hero?.titleTeal || "Cybersecurity",
        titleSuffix: ac.hero?.titleSuffix || "Systems and Networks",
        eyebrow: ac.overview?.eyebrow || "Overview",
        title: ac.overview?.title || "Who We Are",
        p1: ac.overview?.p1 || "",
        p2: ac.overview?.p2 || "",
        p3: ac.overview?.p3 || "",
      });
      setLocalAboutMission({
        missionTitle: ac.mission?.title || "Our Mission",
        missionText: ac.mission?.text || "",
        visionTitle: ac.vision?.title || "Our Vision",
        visionText: ac.vision?.text || "",
        specificsLabel: ac.vision?.specificsLabel || "Specifically:",
      });
      setLocalAboutUniv({
        eyebrow: ac.university?.eyebrow || "Amrita Vishwa Vidyapeetham",
        title: ac.university?.title || "Part of a World-Class University",
        p1: ac.university?.p1 || "",
        p2: ac.university?.p2 || "",
      });
    }
  }, [data.aboutContent]);

  // ── Toast ────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminUser");
    navigate("/cyber-panel");
  };

  // ── Generic CRUD ─────────────────────────────────────────────────────────
  const startAdd = (section) => {
    setEditingItem(null);
    setFormData({});
    setShowForm(section);
  };
  const startEdit = (section, item) => {
    setEditingItem(item.id);
    setFormData({ ...item });
    setShowForm(section);
  };
  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  const saveItem = (section) => {
    if (editingItem !== null) {
      setData((prev) => ({
        ...prev,
        [section]: prev[section].map((item) =>
          item.id === editingItem ? { ...formData, id: editingItem } : item,
        ),
      }));
      showToast("Item updated!");
    } else {
      setData((prev) => ({
        ...prev,
        [section]: [
          ...prev[section],
          { ...formData, id: newId(prev[section]) },
        ],
      }));
      showToast("Item added!");
    }
    cancelForm();
  };

  const confirmDelete = (section, id, meta = {}) =>
    setDeleteConfirm({ section, id, meta });

  const doDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.section?.startsWith("ac:")) {
      const path = deleteConfirm.section.slice(3);
      setData((prev) => {
        const ac = prev.academicsContent || DEFAULT_ACADEMICS_CONTENT;
        if (path === "heroStats") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              heroStats: (ac.heroStats || []).filter((i) => i.id !== deleteConfirm.id),
            },
          };
        }
        if (path === "studentLife") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              studentLife: {
                ...ac.studentLife,
                items: (ac.studentLife?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "pride") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              pride: {
                ...ac.pride,
                items: (ac.pride?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "communities") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              communities: {
                ...ac.communities,
                items: (ac.communities?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "scholarships") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              scholarships: {
                ...ac.scholarships,
                items: (ac.scholarships?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "dualDegreePartners") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              overseas: {
                ...ac.overseas,
                dualDegreePartners: (ac.overseas?.dualDegreePartners || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "exchangeCountries") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              overseas: {
                ...ac.overseas,
                exchangeCountries: (ac.overseas?.exchangeCountries || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "internships") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              internships: {
                ...ac.internships,
                items: (ac.internships?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "placements") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              placements: {
                ...ac.placements,
                items: (ac.placements?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "events") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              events: {
                ...ac.events,
                items: (ac.events?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "socialMedia") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              socialMedia: {
                ...ac.socialMedia,
                links: (ac.socialMedia?.links || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "alumni") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              alumni: {
                ...ac.alumni,
                items: (ac.alumni?.items || []).filter((i) => i.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "curriculum.year") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              curriculum: {
                ...ac.curriculum,
                years: (ac.curriculum?.years || []).filter((y) => y.id !== deleteConfirm.id),
              },
            },
          };
        }
        if (path === "curriculum.semester") {
          return {
            ...prev,
            academicsContent: {
              ...ac,
              curriculum: {
                ...ac.curriculum,
                years: (ac.curriculum?.years || []).map((y) => ({
                  ...y,
                  semesters: (y.semesters || []).filter((s) => s.id !== deleteConfirm.id),
                })),
              },
            },
          };
        }
        if (path === "curriculum.course") {
          const { yearId, semId, courseIndex } = deleteConfirm.meta || {};
          return {
            ...prev,
            academicsContent: {
              ...ac,
              curriculum: {
                ...ac.curriculum,
                years: (ac.curriculum?.years || []).map((y) => {
                  if (y.id !== yearId) return y;
                  return {
                    ...y,
                    semesters: (y.semesters || []).map((s) => {
                      if (s.id !== semId) return s;
                      return {
                        ...s,
                        courses: (s.courses || []).filter((_, idx) => idx !== courseIndex),
                      };
                    }),
                  };
                }),
              },
            },
          };
        }
        return prev;
      });
      showToast("Deleted.", "info");
      setDeleteConfirm(null);
      return;
    }
    setData((prev) => ({
      ...prev,
      [deleteConfirm.section]: (prev[deleteConfirm.section] || []).filter(
        (i) => i.id !== deleteConfirm.id,
      ),
    }));
    showToast("Deleted.", "info");
    setDeleteConfirm(null);
  };

  const saveObject = (section, obj) => {
    setData((prev) => ({ ...prev, [section]: obj }));
    showToast("Saved!");
  };

  // ── Password Change ───────────────────────────────────────────────────────
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwError("");
    // Admin's current password lives in localStorage (or default)
    const storedPw =
      localStorage.getItem("adminPassword") || "Cyber@Secure#2026";
    if (pwForm.current !== storedPw) {
      setPwError("Current password is incorrect.");
      return;
    }
    if (pwForm.newPw.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    localStorage.setItem("adminPassword", pwForm.newPw);
    setPwForm({ current: "", newPw: "", confirm: "", show: false });
    showToast("Password updated successfully!");
  };

  // ── About Page Handlers ──────────────────────────────────────────────────
  const saveAboutOverview = () => {
    if (!hasPrivilege("aboutContent", "edit")) {
      showToast(
        "Permission denied: You do not have edit privilege for About Page.",
        "error",
      );
      return;
    }
    setData((prev) => ({
      ...prev,
      aboutContent: {
        ...(prev.aboutContent || DEFAULT_ABOUT_CONTENT),
        hero: {
          badge: localAboutOverview.badge,
          titlePrefix: localAboutOverview.titlePrefix,
          titleTeal: localAboutOverview.titleTeal,
          titleSuffix: localAboutOverview.titleSuffix,
        },
        overview: {
          eyebrow: localAboutOverview.eyebrow,
          title: localAboutOverview.title,
          p1: localAboutOverview.p1,
          p2: localAboutOverview.p2,
          p3: localAboutOverview.p3,
        },
      },
    }));
    showToast("Overview & Header content saved!");
  };

  const saveAboutMissionVision = () => {
    if (!hasPrivilege("aboutContent", "edit")) {
      showToast(
        "Permission denied: You do not have edit privilege for About Page.",
        "error",
      );
      return;
    }
    setData((prev) => ({
      ...prev,
      aboutContent: {
        ...(prev.aboutContent || DEFAULT_ABOUT_CONTENT),
        mission: {
          title: localAboutMission.missionTitle,
          text: localAboutMission.missionText,
        },
        vision: {
          ...(prev.aboutContent?.vision || DEFAULT_ABOUT_CONTENT.vision),
          title: localAboutMission.visionTitle,
          text: localAboutMission.visionText,
          specificsLabel: localAboutMission.specificsLabel,
        },
      },
    }));
    showToast("Mission & Vision text saved!");
  };

  const saveAboutUnivTexts = () => {
    if (!hasPrivilege("aboutContent", "edit")) {
      showToast(
        "Permission denied: You do not have edit privilege for About Page.",
        "error",
      );
      return;
    }
    setData((prev) => ({
      ...prev,
      aboutContent: {
        ...(prev.aboutContent || DEFAULT_ABOUT_CONTENT),
        university: {
          ...(prev.aboutContent?.university ||
            DEFAULT_ABOUT_CONTENT.university),
          eyebrow: localAboutUniv.eyebrow,
          title: localAboutUniv.title,
          p1: localAboutUniv.p1,
          p2: localAboutUniv.p2,
        },
      },
    }));
    showToast("University info saved!");
  };

  const saveAboutItem = (type, itemData, mode) => {
    const actionRequired = mode === "add" ? "add" : "edit";
    if (!hasPrivilege("aboutContent", actionRequired)) {
      showToast(
        `Permission denied: You cannot ${actionRequired} About items.`,
        "error",
      );
      return;
    }
    setData((prev) => {
      const ac = { ...(prev.aboutContent || DEFAULT_ABOUT_CONTENT) };
      if (type === "card") {
        const list = ac.overviewCards || [];
        if (mode === "add") {
          ac.overviewCards = [...list, { ...itemData, id: newId(list) }];
        } else {
          ac.overviewCards = list.map((i) =>
            i.id === itemData.id ? { ...itemData } : i,
          );
        }
      } else if (type === "point") {
        const list = ac.vision?.specifics || [];
        if (mode === "add") {
          ac.vision = {
            ...(ac.vision || {}),
            specifics: [...list, { ...itemData, id: newId(list) }],
          };
        } else {
          ac.vision = {
            ...(ac.vision || {}),
            specifics: list.map((i) =>
              i.id === itemData.id ? { ...itemData } : i,
            ),
          };
        }
      } else if (type === "offering") {
        const list = ac.insideOfferings || [];
        const itemsArr = itemData.itemsText
          ? itemData.itemsText
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(itemData.items)
            ? itemData.items
            : [];
        const formatted = {
          num: itemData.num || "01",
          title: itemData.title || "",
          desc: itemData.desc || "",
          items: itemsArr,
        };
        if (mode === "add") {
          ac.insideOfferings = [...list, { ...formatted, id: newId(list) }];
        } else {
          ac.insideOfferings = list.map((i) =>
            i.id === itemData.id ? { ...formatted, id: itemData.id } : i,
          );
        }
      } else if (type === "stat") {
        const list = ac.university?.stats || [];
        if (mode === "add") {
          ac.university = {
            ...(ac.university || {}),
            stats: [...list, { ...itemData, id: newId(list) }],
          };
        } else {
          ac.university = {
            ...(ac.university || {}),
            stats: list.map((i) =>
              i.id === itemData.id ? { ...itemData } : i,
            ),
          };
        }
      }
      return { ...prev, aboutContent: ac };
    });
    setAboutItemModal({ show: false, type: "", mode: "add", item: {} });
    showToast(mode === "add" ? "Item added to About Page!" : "Item updated!");
  };

  const deleteAboutItem = (type, id) => {
    if (!hasPrivilege("aboutContent", "delete")) {
      showToast(
        "Permission denied: You do not have delete privilege for About Page.",
        "error",
      );
      return;
    }
    setData((prev) => {
      const ac = { ...(prev.aboutContent || DEFAULT_ABOUT_CONTENT) };
      if (type === "card") {
        ac.overviewCards = (ac.overviewCards || []).filter((i) => i.id !== id);
      } else if (type === "point") {
        ac.vision = {
          ...(ac.vision || {}),
          specifics: (ac.vision?.specifics || []).filter((i) => i.id !== id),
        };
      } else if (type === "offering") {
        ac.insideOfferings = (ac.insideOfferings || []).filter(
          (i) => i.id !== id,
        );
      } else if (type === "stat") {
        ac.university = {
          ...(ac.university || {}),
          stats: (ac.university?.stats || []).filter((i) => i.id !== id),
        };
      }
      return { ...prev, aboutContent: ac };
    });
    setAboutDeleteModal({ show: false, type: "", id: null, title: "" });
    showToast("Item deleted from About Page.", "info");
  };

  // ── User Management ───────────────────────────────────────────────────────
  const openAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: "",
      email: "",
      password: "",
      role: "content_editor",
      active: true,
      privileges: getPrivilegesForRole("content_editor"),
    });
    setUserFormError("");
    setShowUserForm(true);
  };

  const openEditUser = (u) => {
    setEditingUser(u.id);
    setUserForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
      active: u.active,
      privileges: u.privileges || getPrivilegesForRole(u.role),
    });
    setUserFormError("");
    setShowUserForm(true);
  };

  const openUserPrivilegeModal = (u) => {
    setUserPrivilegeModal({
      show: true,
      userId: u.id,
      userName: u.name,
      role: u.role,
      privileges: u.privileges || getPrivilegesForRole(u.role),
    });
  };

  const saveUserPrivileges = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userPrivilegeModal.userId
          ? { ...u, privileges: userPrivilegeModal.privileges }
          : u,
      ),
    );
    setUserPrivilegeModal({
      show: false,
      userId: null,
      userName: "",
      privileges: {},
    });
    showToast("User privileges updated successfully!");
  };

  const toggleAboutFullPrivilege = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const currentAbout = u.privileges?.aboutContent || {};
        const hasFull =
          currentAbout.view &&
          currentAbout.add &&
          currentAbout.edit &&
          currentAbout.delete;
        const newAbout = hasFull
          ? { view: false, add: false, edit: false, delete: false }
          : { view: true, add: true, edit: true, delete: true };
        return {
          ...u,
          privileges: {
            ...(u.privileges || getPrivilegesForRole(u.role)),
            aboutContent: newAbout,
          },
        };
      }),
    );
    showToast("About Page privileges updated for user!");
  };

  const toggleAcademicFullPrivilege = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const currentAc = u.privileges?.academicsContent || {};
        const hasFull =
          currentAc.view &&
          currentAc.add &&
          currentAc.edit &&
          currentAc.delete;
        const newAc = hasFull
          ? { view: false, add: false, edit: false, delete: false }
          : { view: true, add: true, edit: true, delete: true };
        return {
          ...u,
          privileges: {
            ...(u.privileges || getPrivilegesForRole(u.role)),
            academicsContent: newAc,
          },
        };
      }),
    );
    showToast("Academics Page privileges updated for user!");
  };

  const saveUser = () => {
    setUserFormError("");
    if (!userForm.name.trim()) {
      setUserFormError("Name is required.");
      return;
    }
    if (!userForm.email.trim()) {
      setUserFormError("Email is required.");
      return;
    }
    if (!userForm.email.includes("@")) {
      setUserFormError("Enter a valid email.");
      return;
    }

    const allEmails = [
      ...users.filter((u) => u.id !== editingUser).map((u) => u.email),
      "vysakh@am.amrita.edu",
    ];
    if (allEmails.includes(userForm.email)) {
      setUserFormError("This email is already in use.");
      return;
    }

    if (editingUser) {
      // Edit — only update password if a new one was entered
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser
            ? {
                ...u,
                name: userForm.name,
                email: userForm.email,
                role: userForm.role,
                active: userForm.active,
                privileges:
                  userForm.privileges || getPrivilegesForRole(userForm.role),
                ...(userForm.password ? { password: userForm.password } : {}),
              }
            : u,
        ),
      );
      showToast("User updated!");
    } else {
      if (!userForm.password) {
        setUserFormError("Password is required for new users.");
        return;
      }
      if (userForm.password.length < 6) {
        setUserFormError("Password must be at least 6 characters.");
        return;
      }
      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        role: userForm.role,
        active: userForm.active,
        privileges: userForm.privileges || getPrivilegesForRole(userForm.role),
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
      showToast("User created successfully!");
    }
    setShowUserForm(false);
  };

  const toggleUserActive = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)),
    );
    showToast("User status updated.", "info");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setUserDeleteConfirm(null);
    showToast("User removed.", "info");
  };

  // ─── Section Configs ──────────────────────────────────────────────────────
  const SECTION_CONFIGS = {
    news: {
      title: "News Articles",
      itemLabel: "News Item",
      desc: "Manage all news articles displayed on the News & Events page.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "date", label: "Date" },
        { key: "title", label: "Title", truncate: true },
        {
          key: "tag",
          label: "Tag",
          render: (v) => (
            <span
              className={`badge badge-${v === "Achievement" ? "gold" : v === "Students" ? "green" : v === "Events" ? "blue" : "navy"}`}
            >
              {v}
            </span>
          ),
        },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "🔬" },
        { key: "date", label: "Date", placeholder: "01 Jan 2026" },
        { key: "title", label: "Title", type: "textarea" },
        { key: "excerpt", label: "Excerpt / Summary", type: "textarea" },
        {
          key: "tag",
          label: "Tag",
          type: "select",
          options: [
            "Research",
            "Achievement",
            "Students",
            "Events",
            "Academics",
          ],
        },
      ],
    },
    events: {
      title: "Flagship Events",
      itemLabel: "Event",
      desc: "Manage flagship events shown on the News & Events page.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "tags", label: "Tags", truncate: true },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "🏁" },
        { key: "title", label: "Event Title" },
        { key: "desc", label: "Description", type: "textarea" },
        { key: "type", label: "Event Type", placeholder: "Annual Conference" },
        {
          key: "tags",
          label: "Tags (comma-separated)",
          placeholder: "CTF, Competition, Students",
        },
      ],
    },
    speakers: {
      title: "Distinguished Speakers",
      itemLabel: "Speaker",
      desc: "Manage the list of distinguished speakers and visitors.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "name", label: "Name" },
        { key: "title", label: "Title / Affiliation", truncate: true },
        {
          key: "category",
          label: "Category",
          render: (v) => (
            <span
              className={`badge badge-${v === "Government" ? "gold" : v === "Industry" ? "blue" : "green"}`}
            >
              {v}
            </span>
          ),
        },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "🎓" },
        { key: "name", label: "Full Name" },
        { key: "title", label: "Title / Affiliation" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: ["Academia", "Industry", "Government"],
        },
      ],
    },
    faculty: {
      title: "Faculty Members",
      itemLabel: "Faculty Member",
      desc: "Manage faculty profiles shown on the Faculty page.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation", truncate: true },
        {
          key: "isLeadership",
          label: "Role",
          render: (v) => (
            <span
              className={`badge badge-${v === "true" || v === true ? "gold" : "blue"}`}
            >
              {v === "true" || v === true ? "Leadership" : "Faculty"}
            </span>
          ),
        },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "👩‍💼" },
        { key: "name", label: "Full Name" },
        { key: "designation", label: "Designation" },
        {
          key: "roles",
          label: "Roles (one per line)",
          type: "textarea",
          placeholder: "Director, Center for Cybersecurity...",
        },
        {
          key: "expertise",
          label: "Expertise (comma-separated)",
          placeholder: "Cybersecurity, AI, Cloud Security",
        },
        {
          key: "isLeadership",
          label: "Leadership Role?",
          type: "select",
          options: ["true", "false"],
        },
      ],
    },
    researchAreas: {
      title: "Research Areas",
      itemLabel: "Research Area",
      desc: "Manage the research focus areas shown on the Research page.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "title", label: "Title", truncate: true },
        { key: "shortDesc", label: "Short Description", truncate: true },
        {
          key: "color",
          label: "Color",
          render: (v) => <span className={`color-badge ${v}`}>{v}</span>,
        },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "🤖" },
        { key: "title", label: "Research Area Title" },
        { key: "shortDesc", label: "Short Description" },
        { key: "fullDesc", label: "Full Description", type: "textarea" },
        {
          key: "color",
          label: "Color Class",
          type: "select",
          options: ["area-blue", "area-cyan", "area-teal", "area-navy"],
        },
      ],
    },
    highlights: {
      title: "Key Highlights",
      itemLabel: "Highlight",
      desc: "Manage the key institutional highlights shown on the Home page.",
      columns: [
        {
          key: "icon",
          label: "Icon",
          render: (v) => <span style={{ fontSize: "1.4rem" }}>{v}</span>,
        },
        { key: "title", label: "Title" },
        { key: "badge", label: "Badge" },
        { key: "desc", label: "Description", truncate: true },
      ],
      fields: [
        { key: "icon", label: "Icon (emoji)", placeholder: "🛡️" },
        { key: "title", label: "Title" },
        { key: "badge", label: "Badge Text", placeholder: "Govt. of India" },
        { key: "desc", label: "Description", type: "textarea" },
      ],
    },
  };

  // ─── Renderers ────────────────────────────────────────────────────────────
  const renderOverview = () => {
    const totalUsers = users.length + 1; // +1 for built-in admin
    return (
      <div className="dash-overview">
        <div className="dash-welcome">
          <div className="welcome-icon">
            {ROLE_META[userRole]?.icon || "🛡️"}
          </div>
          <div>
            <h2>Welcome, {currentUser?.name || "Admin"}</h2>
            <p>
              Logged in as{" "}
              <span className={`role-tag ${ROLE_META[userRole]?.color}`}>
                {ROLE_META[userRole]?.label}
              </span>
              &nbsp;· Manage your assigned sections from the sidebar.
            </p>
          </div>
        </div>

        <div className="overview-stats">
          {[
            {
              label: "About Items",
              count:
                (data.aboutContent?.overviewCards?.length || 0) +
                (data.aboutContent?.insideOfferings?.length || 0),

              section: "aboutContent",
            },
            {
              label: "News Items",
              count: data.news.length,

              section: "news",
            },
            {
              label: "Events",
              count: data.events.length,

              section: "events",
            },
            {
              label: "Speakers",
              count: data.speakers.length,

              section: "speakers",
            },
            {
              label: "Faculty",
              count: data.faculty.length,

              section: "faculty",
            },
            {
              label: "Research Areas",
              count: data.researchAreas.length,

              section: "researchAreas",
            },
            {
              label: "Academics Sections",
              count:
                (data.academicsContent?.studentLife?.length || 0) +
                (data.academicsContent?.pride?.length || 0) +
                (data.academicsContent?.events?.length || 0) +
                (data.academicsContent?.alumni?.length || 0),

              section: "academicsContent",
            },
            ...(isAdmin
              ? [
                  {
                    label: "Users",
                    count: totalUsers,

                    section: "users",
                  },
                ]
              : []),
          ]
            .filter((s) => visibleSections.find((vs) => vs.key === s.section))
            .map((s) => (
              <div
                key={s.section}
                className="stat-card"
                onClick={() => setActiveSection(s.section)}
              >
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-info">
                  <span className="stat-count">{s.count}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
                <span className="stat-arrow">→</span>
              </div>
            ))}
        </div>

        {isAdmin && (
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="qa-grid">
              {[
                {
                  label: "Edit About Page",
                  section: "aboutContent",
                },
                { label: "Add News", section: "news", icon: "➕" },
                { label: "Add Event", section: "events", icon: "➕" },
                { label: "Add Speaker", section: "speakers", icon: "➕" },
                { label: "Add Faculty", section: "faculty", icon: "➕" },
                {
                  label: "Add User",
                  section: "users",

                  action: "addUser",
                },
                { label: "Edit Hero", section: "heroContent" },
                { label: "Edit Academics", section: "academicsContent" },
              ].map((a) => (
                <button
                  key={a.label}
                  className="qa-btn"
                  onClick={() => {
                    setActiveSection(a.section);
                    if (a.action === "addUser") setTimeout(openAddUser, 50);
                    else if (a.label.startsWith("Add"))
                      setTimeout(() => startAdd(a.section), 50);
                  }}
                >
                  <span>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Academics Page Management ─────────────────────────────────────────────
  const renderAcademics = () => {
    const ac = data.academicsContent || DEFAULT_ACADEMICS_CONTENT;
    const canAdd = hasPrivilege("academicsContent", "add");
    const canEdit = hasPrivilege("academicsContent", "edit");
    const canDelete = hasPrivilege("academicsContent", "delete");

    const updateAcSection = (key, updatedVal) => {
      setData((prev) => ({
        ...prev,
        academicsContent: {
          ...(prev.academicsContent || DEFAULT_ACADEMICS_CONTENT),
          [key]: updatedVal,
        },
      }));
      showToast("Section updated!");
    };

    const updateAcList = (key, newList, isNested = false, parentKey = null) => {
      setData((prev) => {
        const currentAc = prev.academicsContent || DEFAULT_ACADEMICS_CONTENT;
        if (isNested && parentKey) {
          return {
            ...prev,
            academicsContent: {
              ...currentAc,
              [parentKey]: {
                ...(currentAc[parentKey] || {}),
                [key]: newList,
              },
            },
          };
        }
        return {
          ...prev,
          academicsContent: {
            ...currentAc,
            [key]: Array.isArray(currentAc[key])
              ? newList
              : { ...(currentAc[key] || {}), items: newList },
          },
        };
      });
    };

    const acTabs = [
      { key: "hero", label: "🏷️ Hero & Stats", count: ac.heroStats?.length },
      { key: "studentLife", label: "🎉 Student Life", count: ac.studentLife?.items?.length },
      { key: "pride", label: "🏆 Our Pride", count: ac.pride?.items?.length },
      { key: "communities", label: "🤝 Communities", count: ac.communities?.items?.length },
      { key: "scholarships", label: "🎓 Scholarships", count: ac.scholarships?.items?.length },
      { key: "overseas", label: "✈️ Overseas", count: (ac.overseas?.dualDegreePartners?.length || 0) + (ac.overseas?.exchangeCountries?.length || 0) },
      { key: "curriculum", label: "📚 Curriculum", count: ac.curriculum?.years?.length },
      { key: "internships", label: "🏢 Internships", count: ac.internships?.items?.length },
      { key: "placements", label: "💼 Placements", count: ac.placements?.items?.length },
      { key: "events", label: "📅 Events", count: ac.events?.items?.length },
      { key: "socialMedia", label: "🌐 Social Media", count: ac.socialMedia?.links?.length },
      { key: "alumni", label: "👨‍🎓 Alumni", count: ac.alumni?.items?.length },
    ];

    const openAcAdd = (section, defaultObj = {}, meta = {}) => {
      setAcModal({ show: true, mode: "add", section, item: defaultObj, meta });
    };

    const openAcEdit = (section, item, meta = {}) => {
      setAcModal({ show: true, mode: "edit", section, item: { ...item }, meta });
    };

    const closeAcModal = () => {
      setAcModal({ show: false, section: "", mode: "add", item: {}, meta: {} });
    };

    const handleSaveAcModal = () => {
      const { section, mode, item, meta } = acModal;

      if (section === "heroStats") {
        const list = ac.heroStats || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("heroStats", updated);
      } else if (section === "studentLife") {
        const list = ac.studentLife?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("studentLife", { ...ac.studentLife, items: updated });
      } else if (section === "pride") {
        const list = ac.pride?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("pride", { ...ac.pride, items: updated });
      } else if (section === "communities") {
        const list = ac.communities?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("communities", { ...ac.communities, items: updated });
      } else if (section === "scholarships") {
        const list = ac.scholarships?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("scholarships", { ...ac.scholarships, items: updated });
      } else if (section === "dualDegreePartners") {
        const list = ac.overseas?.dualDegreePartners || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("overseas", { ...ac.overseas, dualDegreePartners: updated });
      } else if (section === "exchangeCountries") {
        const list = ac.overseas?.exchangeCountries || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("overseas", { ...ac.overseas, exchangeCountries: updated });
      } else if (section === "internshipsItem") {
        const list = ac.internships?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("internships", { ...ac.internships, items: updated });
      } else if (section === "placementsItem") {
        const list = ac.placements?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("placements", { ...ac.placements, items: updated });
      } else if (section === "events") {
        const list = ac.events?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("events", { ...ac.events, items: updated });
      } else if (section === "socialMedia") {
        const list = ac.socialMedia?.links || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("socialMedia", { ...ac.socialMedia, links: updated });
      } else if (section === "alumni") {
        const list = ac.alumni?.items || [];
        const updated = mode === "edit"
          ? list.map((i) => (i.id === item.id ? item : i))
          : [...list, { ...item, id: newId(list) }];
        updateAcSection("alumni", { ...ac.alumni, items: updated });
      } else if (section === "curriculumYear") {
        const years = ac.curriculum?.years || [];
        let updated;
        if (mode === "edit") {
          updated = years.map((y) => (y.id === item.id ? { ...y, year: item.year } : y));
        } else {
          const newYId = newId(years);
          updated = [
            ...years,
            {
              id: newYId,
              year: item.year || `Year ${years.length + 1}`,
              semesters: [
                { id: newYId * 100 + 1, name: `Semester ${years.length * 2 + 1}`, courses: [] },
                { id: newYId * 100 + 2, name: `Semester ${years.length * 2 + 2}`, courses: [] },
              ],
            },
          ];
        }
        updateAcSection("curriculum", { ...ac.curriculum, years: updated });
        if (item.year) setAcCurriculumYear(item.year);
      } else if (section === "curriculumSemester") {
        const years = ac.curriculum?.years || [];
        const updated = years.map((y) => {
          if (y.id !== meta.yearId) return y;
          const sems = y.semesters || [];
          let updatedSems;
          if (mode === "edit") {
            updatedSems = sems.map((s) => (s.id === item.id ? { ...s, name: item.name } : s));
          } else {
            updatedSems = [...sems, { id: newId(sems), name: item.name || `Semester ${sems.length + 1}`, courses: [] }];
          }
          return { ...y, semesters: updatedSems };
        });
        updateAcSection("curriculum", { ...ac.curriculum, years: updated });
      } else if (section === "curriculumCourse") {
        const years = ac.curriculum?.years || [];
        const updated = years.map((y) => {
          if (y.id !== meta.yearId) return y;
          const sems = (y.semesters || []).map((s) => {
            if (s.id !== meta.semId) return s;
            const courses = s.courses || [];
            let updatedCourses;
            if (mode === "edit") {
              updatedCourses = courses.map((c, idx) => (idx === meta.courseIndex ? item.courseName : c));
            } else {
              updatedCourses = [...courses, item.courseName];
            }
            return { ...s, courses: updatedCourses };
          });
          return { ...y, semesters: sems };
        });
        updateAcSection("curriculum", { ...ac.curriculum, years: updated });
      }

      showToast(mode === "edit" ? "Saved successfully!" : "Added successfully!");
      closeAcModal();
    };

    return (
      <div className="section-panel">
        <div className="panel-header">
          <div>
            <h2>🎓 Academics Page Management</h2>
            <p>
              Complete control to modify, edit, add, and delete all content and sections of the
              Undergraduate Academics page.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <span
              className={`priv-badge ${
                canAdd && canEdit && canDelete ? "priv-full" : "priv-about"
              }`}
            >
              {canAdd && canEdit && canDelete
                ? "👑 Full Privilege (Add/Edit/Delete)"
                : `Privileges: ${canAdd ? "Add " : ""}${canEdit ? "Edit " : ""}${
                    canDelete ? "Delete" : ""
                  }`}
            </span>
            <a
              href="/academics"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-priv-quick"
              style={{ textDecoration: "none" }}
            >
              👁️ View Live Academics Page
            </a>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="sub-tabs" style={{ flexWrap: "wrap", gap: "6px" }}>
          {acTabs.map((t) => (
            <button
              key={t.key}
              className={`sub-tab ${acTab === t.key ? "active" : ""}`}
              onClick={() => setAcTab(t.key)}
            >
              {t.label} {t.count != null ? `(${t.count})` : ""}
            </button>
          ))}
        </div>

        {/* ── 01: Hero & Stats ── */}
        {acTab === "hero" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <h3 style={{ color: "#c9d1d9", margin: "0 0 16px", fontSize: "1.1rem" }}>
                Hero Banner Content
              </h3>
              <div className="form-group">
                <label>Eyebrow Label</label>
                <input
                  value={ac.hero?.eyebrow || ""}
                  disabled={!canEdit}
                  placeholder="Academics · Academic Programmes"
                  onChange={(e) =>
                    updateAcSection("hero", { ...ac.hero, eyebrow: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Hero Main Heading</label>
                <input
                  value={ac.hero?.title || ""}
                  disabled={!canEdit}
                  placeholder="Under Graduate Programme"
                  onChange={(e) =>
                    updateAcSection("hero", { ...ac.hero, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Hero Subtitle / Description</label>
                <textarea
                  rows={3}
                  value={ac.hero?.subtitle || ""}
                  disabled={!canEdit}
                  placeholder="A four-year B.Tech that blends strong computing fundamentals..."
                  onChange={(e) =>
                    updateAcSection("hero", { ...ac.hero, subtitle: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Hero banner updated!")}
                >
                  💾 Save Hero Banner
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Hero Highlights / Stats Bar
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("heroStats", { value: "4 yrs", label: "Duration" })}
                >
                  ➕ Add Stat
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Value</th>
                    <th>Label</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.heroStats || []).map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: "700", color: "#38bdf8" }}>{s.value}</td>
                      <td>{s.label}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("heroStats", s)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:heroStats", s.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 02: Student Life ── */}
        {acTab === "studentLife" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.studentLife?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("studentLife", { ...ac.studentLife, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro (Optional)</label>
                <input
                  value={ac.studentLife?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("studentLife", { ...ac.studentLife, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Section title saved!")}
                >
                  💾 Save Section Details
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Student Life Cards / Activities
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("studentLife", { title: "", text: "" })}
                >
                  ➕ Add Activity
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.studentLife?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "600", minWidth: "160px" }}>{item.title}</td>
                      <td>{item.text}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("studentLife", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:studentLife", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 03: Our Pride ── */}
        {acTab === "pride" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.pride?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("pride", { ...ac.pride, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.pride?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("pride", { ...ac.pride, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Section title saved!")}
                >
                  💾 Save Section Details
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Pride / Achievement Badges
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("pride", { stat: "#1", text: "" })}
                >
                  ➕ Add Pride Item
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Stat / Badge</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.pride?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "700", color: "#38bdf8", minWidth: "120px" }}>
                        {item.stat}
                      </td>
                      <td>{item.text}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("pride", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:pride", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 04: Communities ── */}
        {acTab === "communities" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.communities?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("communities", { ...ac.communities, title: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Section title saved!")}
                >
                  💾 Save Section Title
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Student-run Communities
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("communities", { tag: "", name: "", text: "", href: "" })}
                >
                  ➕ Add Community
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Link URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.communities?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="badge badge-green">{item.tag}</span>
                      </td>
                      <td style={{ fontWeight: "700" }}>{item.name}</td>
                      <td>{item.text}</td>
                      <td>
                        <a href={item.href} target="_blank" rel="noreferrer" style={{ color: "#38bdf8" }}>
                          {item.href}
                        </a>
                      </td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("communities", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:communities", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 05: Scholarships ── */}
        {acTab === "scholarships" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.scholarships?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("scholarships", { ...ac.scholarships, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.scholarships?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("scholarships", { ...ac.scholarships, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Section details saved!")}
                >
                  💾 Save Section Details
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Scholarships List
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("scholarships", { title: "", text: "" })}
                >
                  ➕ Add Scholarship
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.scholarships?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "600", minWidth: "160px" }}>{item.title}</td>
                      <td>{item.text}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("scholarships", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:scholarships", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 06: Overseas Experience ── */}
        {acTab === "overseas" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.overseas?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("overseas", { ...ac.overseas, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.overseas?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("overseas", { ...ac.overseas, intro: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label>Dual Degree Title</label>
                  <input
                    value={ac.overseas?.dualDegreeTitle || ""}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("overseas", { ...ac.overseas, dualDegreeTitle: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Exchange Title</label>
                  <input
                    value={ac.overseas?.exchangeTitle || ""}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("overseas", { ...ac.overseas, exchangeTitle: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Dual Degree Description</label>
                <textarea
                  rows={2}
                  value={ac.overseas?.dualDegreeText || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("overseas", { ...ac.overseas, dualDegreeText: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Exchange Description</label>
                <textarea
                  rows={2}
                  value={ac.overseas?.exchangeText || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("overseas", { ...ac.overseas, exchangeText: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Overseas configuration saved!")}
                >
                  💾 Save Overseas Settings
                </button>
              )}
            </div>

            {/* Dual Degree Partners */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Dual Degree Partner Universities
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("dualDegreePartners", { name: "" })}
                >
                  ➕ Add Partner
                </button>
              )}
            </div>

            <div className="dash-table-wrap" style={{ marginBottom: "32px" }}>
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>University Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.overseas?.dualDegreePartners || []).map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: "600" }}>{p.name}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("dualDegreePartners", p)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:dualDegreePartners", p.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exchange Countries */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Student Exchange Countries
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("exchangeCountries", { name: "" })}
                >
                  ➕ Add Country
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Country Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.overseas?.exchangeCountries || []).map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: "600" }}>{c.name}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("exchangeCountries", c)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:exchangeCountries", c.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 07: Curriculum ── */}
        {acTab === "curriculum" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Curriculum Section Title</label>
                <input
                  value={ac.curriculum?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("curriculum", { ...ac.curriculum, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Curriculum Intro</label>
                <input
                  value={ac.curriculum?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("curriculum", { ...ac.curriculum, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Curriculum header saved!")}
                >
                  💾 Save Curriculum Info
                </button>
              )}
            </div>

            {/* Year management header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(ac.curriculum?.years || []).map((yr) => (
                  <button
                    key={yr.id || yr.year}
                    className={`btn ${acCurriculumYear === yr.year ? "btn-primary" : "btn-secondary"}`}
                    style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    onClick={() => setAcCurriculumYear(yr.year)}
                  >
                    {yr.year}
                  </button>
                ))}
              </div>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("curriculumYear", { year: `Year ${(ac.curriculum?.years?.length || 0) + 1}` })}
                >
                  ➕ Add Academic Year
                </button>
              )}
            </div>

            {/* Selected Year Semesters & Courses */}
            {(() => {
              const currentYearObj = (ac.curriculum?.years || []).find((y) => y.year === acCurriculumYear) || ac.curriculum?.years?.[0];
              if (!currentYearObj) {
                return <p className="empty-msg">No curriculum years found.</p>;
              }
              return (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <h3 style={{ margin: 0, color: "#fff", fontSize: "1.2rem" }}>
                        {currentYearObj.year}
                      </h3>
                      {canEdit && (
                        <button
                          className="btn-icon edit"
                          title="Rename Year"
                          onClick={() => openAcEdit("curriculumYear", currentYearObj)}
                        >
                          ✏️
                        </button>
                      )}
                      {canDelete && (
                        <button
                          className="btn-icon delete"
                          title="Delete Entire Year"
                          onClick={() => confirmDelete("ac:curriculum.year", currentYearObj.id)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    {canAdd && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => openAcAdd("curriculumSemester", { name: "" }, { yearId: currentYearObj.id })}
                      >
                        ➕ Add Semester
                      </button>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                    {(currentYearObj.semesters || []).map((sem) => (
                      <div
                        key={sem.id || sem.name}
                        style={{
                          background: "#0d1117",
                          border: "1px solid #30363d",
                          borderRadius: "8px",
                          padding: "16px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #21262d", paddingBottom: "8px" }}>
                          <span style={{ fontWeight: "700", color: "#38bdf8" }}>{sem.name}</span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {canAdd && (
                              <button
                                className="btn-icon"
                                title="Add Course"
                                style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}
                                onClick={() => openAcAdd("curriculumCourse", { courseName: "" }, { yearId: currentYearObj.id, semId: sem.id })}
                              >
                                ➕
                              </button>
                            )}
                            {canEdit && (
                              <button
                                className="btn-icon edit"
                                title="Rename Semester"
                                onClick={() => openAcEdit("curriculumSemester", sem, { yearId: currentYearObj.id })}
                              >
                                ✏️
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn-icon delete"
                                title="Delete Semester"
                                onClick={() => confirmDelete("ac:curriculum.semester", sem.id)}
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Course items */}
                        {sem.courses?.length === 0 ? (
                          <p style={{ color: "#8b949e", fontSize: "0.85rem", fontStyle: "italic" }}>No courses yet.</p>
                        ) : (
                          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                            {sem.courses?.map((course, idx) => (
                              <li
                                key={`${course}-${idx}`}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "6px 10px",
                                  background: "rgba(255,255,255,0.03)",
                                  borderRadius: "6px",
                                  fontSize: "0.875rem",
                                }}
                              >
                                <span>
                                  <span style={{ color: "#8b949e", marginRight: "8px", fontWeight: "600" }}>
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  {course}
                                </span>
                                <div style={{ display: "flex", gap: "4px" }}>
                                  {canEdit && (
                                    <button
                                      className="btn-icon edit"
                                      style={{ padding: "2px 6px", fontSize: "0.75rem" }}
                                      title="Edit Course"
                                      onClick={() => openAcEdit("curriculumCourse", { courseName: course }, { yearId: currentYearObj.id, semId: sem.id, courseIndex: idx })}
                                    >
                                      ✏️
                                    </button>
                                  )}
                                  {canDelete && (
                                    <button
                                      className="btn-icon delete"
                                      style={{ padding: "2px 6px", fontSize: "0.75rem" }}
                                      title="Delete Course"
                                      onClick={() => confirmDelete("ac:curriculum.course", null, { yearId: currentYearObj.id, semId: sem.id, courseIndex: idx })}
                                    >
                                      🗑️
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── 08: Internships ── */}
        {acTab === "internships" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.internships?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("internships", { ...ac.internships, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Intro Text</label>
                <textarea
                  rows={2}
                  value={ac.internships?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("internships", { ...ac.internships, intro: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label>Earliest Semester</label>
                  <input
                    type="number"
                    value={ac.internships?.earliestSemester ?? 4}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("internships", {
                        ...ac.internships,
                        earliestSemester: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Min Duration (Weeks)</label>
                  <input
                    type="number"
                    value={ac.internships?.minWeeks ?? 4}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("internships", {
                        ...ac.internships,
                        minWeeks: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Max Duration (Weeks)</label>
                  <input
                    type="number"
                    value={ac.internships?.maxWeeks ?? 24}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("internships", {
                        ...ac.internships,
                        maxWeeks: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Official Internship URL</label>
                <input
                  value={ac.internships?.sourceUrl || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("internships", { ...ac.internships, sourceUrl: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Internship details saved!")}
                >
                  💾 Save Internship Details
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Internship Highlights / Policies
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("internshipsItem", { title: "", text: "" })}
                >
                  ➕ Add Policy / Highlight
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.internships?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "600", minWidth: "160px" }}>{item.title}</td>
                      <td>{item.text}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("internshipsItem", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:internships", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 09: Placements ── */}
        {acTab === "placements" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.placements?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("placements", { ...ac.placements, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Intro Text</label>
                <textarea
                  rows={2}
                  value={ac.placements?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("placements", { ...ac.placements, intro: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Placement Note / Disclaimer</label>
                <textarea
                  rows={3}
                  value={ac.placements?.note || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("placements", { ...ac.placements, note: e.target.value })
                  }
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label>Official Placement URL</label>
                  <input
                    value={ac.placements?.sourceUrl || ""}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("placements", { ...ac.placements, sourceUrl: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Career Preparation URL</label>
                  <input
                    value={ac.placements?.trainingUrl || ""}
                    disabled={!canEdit}
                    onChange={(e) =>
                      updateAcSection("placements", { ...ac.placements, trainingUrl: e.target.value })
                    }
                  />
                </div>
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Placement details saved!")}
                >
                  💾 Save Placement Info
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Placement Highlights
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("placementsItem", { title: "", text: "" })}
                >
                  ➕ Add Highlight
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.placements?.items || []).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "600", minWidth: "160px" }}>{item.title}</td>
                      <td>{item.text}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("placementsItem", item)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:placements", item.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 10: Events ── */}
        {acTab === "events" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.events?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("events", { ...ac.events, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.events?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("events", { ...ac.events, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Events header saved!")}
                >
                  💾 Save Section Info
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Undergraduate Events (Talks / Workshops / Webinars)
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("events", { type: "Talk", date: "", title: "", by: "" })}
                >
                  ➕ Add Event
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>By / Speaker</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.events?.items || []).map((ev) => (
                    <tr key={ev.id}>
                      <td>
                        <span className="badge badge-blue">{ev.type}</span>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{ev.date}</td>
                      <td style={{ fontWeight: "600" }}>{ev.title}</td>
                      <td>{ev.by}</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("events", ev)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:events", ev.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 11: Social Media ── */}
        {acTab === "socialMedia" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.socialMedia?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("socialMedia", { ...ac.socialMedia, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.socialMedia?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("socialMedia", { ...ac.socialMedia, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Social media header saved!")}
                >
                  💾 Save Section Info
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Social Media Links
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("socialMedia", { name: "", handle: "", href: "" })}
                >
                  ➕ Add Social Link
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Handle / Account</th>
                    <th>Profile URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.socialMedia?.links || []).map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: "700" }}>{s.name}</td>
                      <td style={{ color: "#38bdf8" }}>{s.handle}</td>
                      <td>
                        <a href={s.href} target="_blank" rel="noreferrer" style={{ color: "#8b949e" }}>
                          {s.href}
                        </a>
                      </td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("socialMedia", s)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:socialMedia", s.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 12: Alumni ── */}
        {acTab === "alumni" && (
          <div className="ac-subsection">
            <div className="obj-form" style={{ marginBottom: "28px" }}>
              <div className="form-group">
                <label>Section Title</label>
                <input
                  value={ac.alumni?.title || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("alumni", { ...ac.alumni, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Intro</label>
                <input
                  value={ac.alumni?.intro || ""}
                  disabled={!canEdit}
                  onChange={(e) =>
                    updateAcSection("alumni", { ...ac.alumni, intro: e.target.value })
                  }
                />
              </div>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Alumni section saved!")}
                >
                  💾 Save Section Info
                </button>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#c9d1d9", margin: 0, fontSize: "1.1rem" }}>
                Alumni Testimonials
              </h3>
              {canAdd && (
                <button
                  className="btn btn-primary"
                  onClick={() => openAcAdd("alumni", { name: "", batch: "", role: "", quote: "" })}
                >
                  ➕ Add Testimonial
                </button>
              )}
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>Current Role</th>
                    <th>Quote</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(ac.alumni?.items || []).map((a) => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: "700" }}>{a.name}</td>
                      <td>{a.batch}</td>
                      <td style={{ color: "#38bdf8" }}>{a.role}</td>
                      <td style={{ fontStyle: "italic", maxWidth: "340px" }}>"{a.quote}"</td>
                      <td>
                        <div className="row-actions">
                          {canEdit && (
                            <button
                              className="btn-icon edit"
                              title="Edit"
                              onClick={() => openAcEdit("alumni", a)}
                            >
                              ✏️
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => confirmDelete("ac:alumni", a.id)}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Modal Dialog for Adding / Editing Academics Items ── */}
        {acModal.show && (
          <div className="modal-backdrop" onClick={closeAcModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{acModal.mode === "edit" ? "Edit" : "Add"} Item</h3>
                <button className="modal-close" onClick={closeAcModal}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                {/* Hero Stat Form */}
                {acModal.section === "heroStats" && (
                  <>
                    <div className="form-group">
                      <label>Value (e.g. 4 yrs, 160+)</label>
                      <input
                        value={acModal.item.value || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, value: e.target.value },
                          }))
                        }
                        placeholder="e.g. 4 yrs"
                      />
                    </div>
                    <div className="form-group">
                      <label>Label (e.g. B.Tech duration)</label>
                      <input
                        value={acModal.item.label || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, label: e.target.value },
                          }))
                        }
                        placeholder="e.g. B.Tech duration"
                      />
                    </div>
                  </>
                )}

                {/* Simple Title + Text Form (Student Life, Scholarships, InternshipsItem, PlacementsItem) */}
                {["studentLife", "scholarships", "internshipsItem", "placementsItem"].includes(
                  acModal.section
                ) && (
                  <>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        value={acModal.item.title || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, title: e.target.value },
                          }))
                        }
                        placeholder="Title..."
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows={4}
                        value={acModal.item.text || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, text: e.target.value },
                          }))
                        }
                        placeholder="Description..."
                      />
                    </div>
                  </>
                )}

                {/* Pride Form */}
                {acModal.section === "pride" && (
                  <>
                    <div className="form-group">
                      <label>Stat / Badge (e.g. #1, GSoC, ICPC, Papers)</label>
                      <input
                        value={acModal.item.stat || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, stat: e.target.value },
                          }))
                        }
                        placeholder="#1"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows={3}
                        value={acModal.item.text || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, text: e.target.value },
                          }))
                        }
                        placeholder="Achievement description..."
                      />
                    </div>
                  </>
                )}

                {/* Community Form */}
                {acModal.section === "communities" && (
                  <>
                    <div className="form-group">
                      <label>Tag (e.g. Cyber security, Open source)</label>
                      <input
                        value={acModal.item.tag || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, tag: e.target.value },
                          }))
                        }
                        placeholder="Cyber security"
                      />
                    </div>
                    <div className="form-group">
                      <label>Community Name</label>
                      <input
                        value={acModal.item.name || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, name: e.target.value },
                          }))
                        }
                        placeholder="team bi0s"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows={3}
                        value={acModal.item.text || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, text: e.target.value },
                          }))
                        }
                        placeholder="Description..."
                      />
                    </div>
                    <div className="form-group">
                      <label>Website URL</label>
                      <input
                        value={acModal.item.href || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, href: e.target.value },
                          }))
                        }
                        placeholder="https://bi0s.in"
                      />
                    </div>
                  </>
                )}

                {/* Partner / Country Name Form */}
                {["dualDegreePartners", "exchangeCountries"].includes(acModal.section) && (
                  <div className="form-group">
                    <label>
                      {acModal.section === "dualDegreePartners"
                        ? "Partner University Name"
                        : "Country Name"}
                    </label>
                    <input
                      value={acModal.item.name || ""}
                      onChange={(e) =>
                        setAcModal((m) => ({
                          ...m,
                          item: { ...m.item, name: e.target.value },
                        }))
                      }
                      placeholder={
                        acModal.section === "dualDegreePartners"
                          ? "e.g. University at Buffalo, USA"
                          : "e.g. Germany"
                      }
                    />
                  </div>
                )}

                {/* Curriculum Year */}
                {acModal.section === "curriculumYear" && (
                  <div className="form-group">
                    <label>Academic Year Name</label>
                    <input
                      value={acModal.item.year || ""}
                      onChange={(e) =>
                        setAcModal((m) => ({
                          ...m,
                          item: { ...m.item, year: e.target.value },
                        }))
                      }
                      placeholder="e.g. Year 1 or Foundation Year"
                    />
                  </div>
                )}

                {/* Curriculum Semester */}
                {acModal.section === "curriculumSemester" && (
                  <div className="form-group">
                    <label>Semester Name</label>
                    <input
                      value={acModal.item.name || ""}
                      onChange={(e) =>
                        setAcModal((m) => ({
                          ...m,
                          item: { ...m.item, name: e.target.value },
                        }))
                      }
                      placeholder="e.g. Semester 1"
                    />
                  </div>
                )}

                {/* Curriculum Course */}
                {acModal.section === "curriculumCourse" && (
                  <div className="form-group">
                    <label>Course Title</label>
                    <input
                      value={acModal.item.courseName || ""}
                      onChange={(e) =>
                        setAcModal((m) => ({
                          ...m,
                          item: { ...m.item, courseName: e.target.value },
                        }))
                      }
                      placeholder="e.g. Data Structures & Algorithms I"
                    />
                  </div>
                )}

                {/* Event Form */}
                {acModal.section === "events" && (
                  <>
                    <div className="form-group">
                      <label>Event Type</label>
                      <select
                        value={acModal.item.type || "Talk"}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, type: e.target.value },
                          }))
                        }
                      >
                        {["Talk", "Workshop", "Webinar", "Seminar", "Conference", "Bootcamp"].map(
                          (t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date (e.g. Dec 04, 2026)</label>
                      <input
                        value={acModal.item.date || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, date: e.target.value },
                          }))
                        }
                        placeholder="Dec 04, 2026"
                      />
                    </div>
                    <div className="form-group">
                      <label>Event Title</label>
                      <input
                        value={acModal.item.title || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, title: e.target.value },
                          }))
                        }
                        placeholder="e.g. The Future of Systems Programming"
                      />
                    </div>
                    <div className="form-group">
                      <label>By / Speaker / Host</label>
                      <input
                        value={acModal.item.by || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, by: e.target.value },
                          }))
                        }
                        placeholder="e.g. team bi0s or Guest speaker"
                      />
                    </div>
                  </>
                )}

                {/* Social Media Link Form */}
                {acModal.section === "socialMedia" && (
                  <>
                    <div className="form-group">
                      <label>Platform Name</label>
                      <input
                        value={acModal.item.name || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, name: e.target.value },
                          }))
                        }
                        placeholder="e.g. Instagram, LinkedIn, YouTube"
                      />
                    </div>
                    <div className="form-group">
                      <label>Account / Handle</label>
                      <input
                        value={acModal.item.handle || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, handle: e.target.value },
                          }))
                        }
                        placeholder="e.g. @amritauniversity"
                      />
                    </div>
                    <div className="form-group">
                      <label>URL</label>
                      <input
                        value={acModal.item.href || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, href: e.target.value },
                          }))
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </>
                )}

                {/* Alumni Form */}
                {acModal.section === "alumni" && (
                  <>
                    <div className="form-group">
                      <label>Alumni Full Name</label>
                      <input
                        value={acModal.item.name || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, name: e.target.value },
                          }))
                        }
                        placeholder="e.g. Ananya R."
                      />
                    </div>
                    <div className="form-group">
                      <label>Batch / Graduation</label>
                      <input
                        value={acModal.item.batch || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, batch: e.target.value },
                          }))
                        }
                        placeholder="e.g. B.Tech CSE, 2019"
                      />
                    </div>
                    <div className="form-group">
                      <label>Current Role & Organization</label>
                      <input
                        value={acModal.item.role || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, role: e.target.value },
                          }))
                        }
                        placeholder="e.g. Software Engineer, Google"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quote / Testimonial</label>
                      <textarea
                        rows={3}
                        value={acModal.item.quote || ""}
                        onChange={(e) =>
                          setAcModal((m) => ({
                            ...m,
                            item: { ...m.item, quote: e.target.value },
                          }))
                        }
                        placeholder="Testimonial quote..."
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeAcModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveAcModal}>
                  {acModal.mode === "edit" ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── About Page Management ─────────────────────────────────────────────────
  const renderAbout = () => {
    const about = data.aboutContent || DEFAULT_ABOUT_CONTENT;
    const canAdd = hasPrivilege("aboutContent", "add");
    const canEdit = hasPrivilege("aboutContent", "edit");
    const canDelete = hasPrivilege("aboutContent", "delete");

    return (
      <div className="section-panel">
        <div className="panel-header">
          <div>
            <h2>📖 About Page Management</h2>
            <p>
              Complete control to change, add, edit, and delete all About Page
              content, highlights, mission, vision, offerings, and statistics.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              className={`priv-badge ${canAdd && canEdit && canDelete ? "priv-full" : "priv-about"}`}
            >
              {canAdd && canEdit && canDelete
                ? "👑 Full Privilege (Add/Edit/Del)"
                : `Privileges: ${canAdd ? "Add " : ""}${canEdit ? "Edit " : ""}${canDelete ? "Delete" : ""}`}
            </span>
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-priv-quick"
              style={{ textDecoration: "none" }}
            >
              👁️ View Live About Page
            </a>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="sub-tabs">
          <button
            className={`sub-tab ${aboutTab === "overview" ? "active" : ""}`}
            onClick={() => setAboutTab("overview")}
          >
            🏛️ Overview &amp; Header
          </button>
          <button
            className={`sub-tab ${aboutTab === "cards" ? "active" : ""}`}
            onClick={() => setAboutTab("cards")}
          >
            🛡️ Overview Cards ({about.overviewCards?.length || 0})
          </button>
          <button
            className={`sub-tab ${aboutTab === "missionVision" ? "active" : ""}`}
            onClick={() => setAboutTab("missionVision")}
          >
            🎯 Mission, Vision &amp; Specifics (
            {about.vision?.specifics?.length || 0})
          </button>
          <button
            className={`sub-tab ${aboutTab === "inside" ? "active" : ""}`}
            onClick={() => setAboutTab("inside")}
          >
            💡 Inside the Center ({about.insideOfferings?.length || 0})
          </button>
          <button
            className={`sub-tab ${aboutTab === "university" ? "active" : ""}`}
            onClick={() => setAboutTab("university")}
          >
            🌍 University Info &amp; Stats (
            {about.university?.stats?.length || 0})
          </button>
        </div>

        {/* Tab 1: Overview & Header */}
        {aboutTab === "overview" && (
          <div className="obj-form" style={{ maxWidth: "860px" }}>
            <h3
              style={{
                margin: "0 0 10px",
                color: "#c9d1d9",
                fontSize: "1.1rem",
              }}
            >
              Hero Banner &amp; Main Overview Texts
            </h3>
            <p
              style={{
                margin: "0 0 16px",
                color: "#6e7681",
                fontSize: "0.85rem",
              }}
            >
              Edit the title banner and main descriptive paragraphs at the top
              of the About page.
            </p>

            <div className="form-group">
              <label>Hero Banner Label / Badge</label>
              <input
                value={localAboutOverview.badge || ""}
                onChange={(e) =>
                  setLocalAboutOverview({
                    ...localAboutOverview,
                    badge: e.target.value,
                  })
                }
                placeholder="ABOUT US"
                disabled={!canEdit}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              <div className="form-group">
                <label>Title Prefix</label>
                <input
                  value={localAboutOverview.titlePrefix || ""}
                  onChange={(e) =>
                    setLocalAboutOverview({
                      ...localAboutOverview,
                      titlePrefix: e.target.value,
                    })
                  }
                  placeholder="Amrita Center for"
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Title Teal Word</label>
                <input
                  value={localAboutOverview.titleTeal || ""}
                  onChange={(e) =>
                    setLocalAboutOverview({
                      ...localAboutOverview,
                      titleTeal: e.target.value,
                    })
                  }
                  placeholder="Cybersecurity"
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Title Suffix</label>
                <input
                  value={localAboutOverview.titleSuffix || ""}
                  onChange={(e) =>
                    setLocalAboutOverview({
                      ...localAboutOverview,
                      titleSuffix: e.target.value,
                    })
                  }
                  placeholder="Systems and Networks"
                  disabled={!canEdit}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "12px",
              }}
            >
              <div className="form-group">
                <label>Overview Section Eyebrow</label>
                <input
                  value={localAboutOverview.eyebrow || ""}
                  onChange={(e) =>
                    setLocalAboutOverview({
                      ...localAboutOverview,
                      eyebrow: e.target.value,
                    })
                  }
                  placeholder="Overview"
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Overview Section Title</label>
                <input
                  value={localAboutOverview.title || ""}
                  onChange={(e) =>
                    setLocalAboutOverview({
                      ...localAboutOverview,
                      title: e.target.value,
                    })
                  }
                  placeholder="Who We Are"
                  disabled={!canEdit}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Paragraph 1 (Main Introduction)</label>
              <textarea
                rows={3}
                value={localAboutOverview.p1 || ""}
                onChange={(e) =>
                  setLocalAboutOverview({
                    ...localAboutOverview,
                    p1: e.target.value,
                  })
                }
                placeholder="The Amrita Center for Cybersecurity..."
                disabled={!canEdit}
              />
            </div>

            <div className="form-group">
              <label>Paragraph 2 (CORE Designation &amp; Mission REACH)</label>
              <textarea
                rows={3}
                value={localAboutOverview.p2 || ""}
                onChange={(e) =>
                  setLocalAboutOverview({
                    ...localAboutOverview,
                    p2: e.target.value,
                  })
                }
                placeholder="Supported by the Government of India..."
                disabled={!canEdit}
              />
            </div>

            <div className="form-group">
              <label>Paragraph 3 (Online MCA Program)</label>
              <textarea
                rows={2}
                value={localAboutOverview.p3 || ""}
                onChange={(e) =>
                  setLocalAboutOverview({
                    ...localAboutOverview,
                    p3: e.target.value,
                  })
                }
                placeholder="The Center also offers the globally recognised Online MCA..."
                disabled={!canEdit}
              />
            </div>

            {canEdit ? (
              <button className="btn-save" onClick={saveAboutOverview}>
                💾 Save Overview Content
              </button>
            ) : (
              <span className="text-muted">
                You do not have edit permission for this section.
              </span>
            )}
          </div>
        )}

        {/* Tab 2: Overview Cards */}
        {aboutTab === "cards" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: "#c9d1d9", fontSize: "1.1rem" }}>
                  Overview Highlight Cards
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#6e7681",
                    fontSize: "0.85rem",
                  }}
                >
                  Add, edit, or delete the recognition and highlight cards shown
                  on the About page.
                </p>
              </div>
              {canAdd && (
                <button
                  className="btn-add"
                  onClick={() =>
                    setAboutItemModal({
                      show: true,
                      type: "card",
                      mode: "add",
                      item: { icon: "🛡️", title: "", desc: "" },
                    })
                  }
                >
                  + Add New Card
                </button>
              )}
            </div>

            <div className="about-cards-grid">
              {(about.overviewCards || []).map((c) => (
                <div key={c.id} className="about-item-card">
                  <div className="aic-header">
                    <span className="aic-icon">{c.icon}</span>
                    <span className="badge badge-blue">Highlight Card</span>
                  </div>
                  <h4 className="aic-title">{c.title}</h4>
                  <p className="aic-desc">{c.desc}</p>
                  <div className="aic-footer">
                    {canEdit && (
                      <button
                        className="btn-edit"
                        onClick={() =>
                          setAboutItemModal({
                            show: true,
                            type: "card",
                            mode: "edit",
                            item: { ...c },
                          })
                        }
                      >
                        ✏️ Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className="btn-delete"
                        onClick={() =>
                          setAboutDeleteModal({
                            show: true,
                            type: "card",
                            id: c.id,
                            title: c.title,
                          })
                        }
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {(!about.overviewCards || about.overviewCards.length === 0) && (
                <p
                  className="text-muted"
                  style={{
                    gridColumn: "1 / -1",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  No overview cards yet. Click &quot;+ Add New Card&quot; to
                  create one.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Mission & Vision */}
        {aboutTab === "missionVision" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div className="obj-form" style={{ maxWidth: "860px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#c9d1d9",
                  fontSize: "1.1rem",
                }}
              >
                Mission &amp; Vision Statements
              </h3>
              <div className="form-group">
                <label>Mission Title</label>
                <input
                  value={localAboutMission.missionTitle || ""}
                  onChange={(e) =>
                    setLocalAboutMission({
                      ...localAboutMission,
                      missionTitle: e.target.value,
                    })
                  }
                  placeholder="Our Mission"
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Mission Statement</label>
                <textarea
                  rows={3}
                  value={localAboutMission.missionText || ""}
                  onChange={(e) =>
                    setLocalAboutMission({
                      ...localAboutMission,
                      missionText: e.target.value,
                    })
                  }
                  placeholder="Promoting partnership among industry, academia, and the government..."
                  disabled={!canEdit}
                />
              </div>

              <div className="form-group">
                <label>Vision Title</label>
                <input
                  value={localAboutMission.visionTitle || ""}
                  onChange={(e) =>
                    setLocalAboutMission({
                      ...localAboutMission,
                      visionTitle: e.target.value,
                    })
                  }
                  placeholder="Our Vision"
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Vision Statement</label>
                <textarea
                  rows={3}
                  value={localAboutMission.visionText || ""}
                  onChange={(e) =>
                    setLocalAboutMission({
                      ...localAboutMission,
                      visionText: e.target.value,
                    })
                  }
                  placeholder="By way of research and academics, develop an ecosystem..."
                  disabled={!canEdit}
                />
              </div>

              <div className="form-group">
                <label>Specifically Focus Label</label>
                <input
                  value={localAboutMission.specificsLabel || ""}
                  onChange={(e) =>
                    setLocalAboutMission({
                      ...localAboutMission,
                      specificsLabel: e.target.value,
                    })
                  }
                  placeholder="Specifically:"
                  disabled={!canEdit}
                />
              </div>

              {canEdit ? (
                <button className="btn-save" onClick={saveAboutMissionVision}>
                  💾 Save Mission &amp; Vision Texts
                </button>
              ) : (
                <span className="text-muted">
                  You do not have edit permission for this section.
                </span>
              )}
            </div>

            {/* Specifically Points List with Add/Edit/Delete */}
            <div style={{ maxWidth: "860px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{ margin: 0, color: "#c9d1d9", fontSize: "1.1rem" }}
                  >
                    Vision Focus Points (&quot;Specifically&quot;)
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#6e7681",
                      fontSize: "0.85rem",
                    }}
                  >
                    Add, edit, or delete the numbered focus points under the
                    Vision card.
                  </p>
                </div>
                {canAdd && (
                  <button
                    className="btn-add"
                    onClick={() =>
                      setAboutItemModal({
                        show: true,
                        type: "point",
                        mode: "add",
                        item: { text: "" },
                      })
                    }
                  >
                    + Add Focus Point
                  </button>
                )}
              </div>

              <div className="items-table">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }}>#</th>
                      <th>Focus Point Description</th>
                      <th style={{ width: "140px", textAlign: "right" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(about.vision?.specifics || []).map((pt, idx) => (
                      <tr key={pt.id}>
                        <td>
                          <span className="badge badge-navy">0{idx + 1}</span>
                        </td>
                        <td style={{ color: "#e6edf3", lineHeight: "1.5" }}>
                          {pt.text}
                        </td>
                        <td>
                          <div
                            className="row-actions"
                            style={{ justifyContent: "flex-end" }}
                          >
                            {canEdit && (
                              <button
                                className="btn-edit"
                                onClick={() =>
                                  setAboutItemModal({
                                    show: true,
                                    type: "point",
                                    mode: "edit",
                                    item: { ...pt },
                                  })
                                }
                              >
                                ✏️ Edit
                              </button>
                            )}
                            {canDelete && (
                              <button
                                className="btn-delete"
                                onClick={() =>
                                  setAboutDeleteModal({
                                    show: true,
                                    type: "point",
                                    id: pt.id,
                                    title: `Point ${idx + 1}`,
                                  })
                                }
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!about.vision?.specifics ||
                      about.vision.specifics.length === 0) && (
                      <tr>
                        <td colSpan={3} className="empty-row">
                          No focus points defined yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Inside the Center Offerings */}
        {aboutTab === "inside" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: "#c9d1d9", fontSize: "1.1rem" }}>
                  Inside the Center Offerings
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#6e7681",
                    fontSize: "0.85rem",
                  }}
                >
                  Manage the 4 pillars (Academic Excellence, Research &amp;
                  Innovation, Partners, Placements) or add new offerings.
                </p>
              </div>
              {canAdd && (
                <button
                  className="btn-add"
                  onClick={() =>
                    setAboutItemModal({
                      show: true,
                      type: "offering",
                      mode: "add",
                      item: { num: "05", title: "", desc: "", itemsText: "" },
                    })
                  }
                >
                  + Add New Offering
                </button>
              )}
            </div>

            <div className="about-cards-grid">
              {(about.insideOfferings || []).map((o) => (
                <div key={o.id} className="about-item-card">
                  <div className="aic-header">
                    <span className="aic-num">{o.num}</span>
                    <span className="badge badge-gold">Offering</span>
                  </div>
                  <h4 className="aic-title">{o.title}</h4>
                  <p className="aic-desc">{o.desc}</p>
                  {o.items && o.items.length > 0 && (
                    <ul className="aic-items">
                      {o.items.map((it, idx) => (
                        <li key={idx}>{it}</li>
                      ))}
                    </ul>
                  )}
                  <div className="aic-footer">
                    {canEdit && (
                      <button
                        className="btn-edit"
                        onClick={() =>
                          setAboutItemModal({
                            show: true,
                            type: "offering",
                            mode: "edit",
                            item: {
                              ...o,
                              itemsText: (o.items || []).join("\n"),
                            },
                          })
                        }
                      >
                        ✏️ Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className="btn-delete"
                        onClick={() =>
                          setAboutDeleteModal({
                            show: true,
                            type: "offering",
                            id: o.id,
                            title: o.title,
                          })
                        }
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: University Info & Stats */}
        {aboutTab === "university" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div className="obj-form" style={{ maxWidth: "860px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#c9d1d9",
                  fontSize: "1.1rem",
                }}
              >
                University Section Texts
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "12px",
                }}
              >
                <div className="form-group">
                  <label>Eyebrow</label>
                  <input
                    value={localAboutUniv.eyebrow || ""}
                    onChange={(e) =>
                      setLocalAboutUniv({
                        ...localAboutUniv,
                        eyebrow: e.target.value,
                      })
                    }
                    placeholder="Amrita Vishwa Vidyapeetham"
                    disabled={!canEdit}
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    value={localAboutUniv.title || ""}
                    onChange={(e) =>
                      setLocalAboutUniv({
                        ...localAboutUniv,
                        title: e.target.value,
                      })
                    }
                    placeholder="Part of a World-Class University"
                    disabled={!canEdit}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>University Description 1</label>
                <textarea
                  rows={3}
                  value={localAboutUniv.p1 || ""}
                  onChange={(e) =>
                    setLocalAboutUniv({ ...localAboutUniv, p1: e.target.value })
                  }
                  placeholder="Amrita Vishwa Vidyapeetham is a multi-campus..."
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>University Description 2</label>
                <textarea
                  rows={2}
                  value={localAboutUniv.p2 || ""}
                  onChange={(e) =>
                    setLocalAboutUniv({ ...localAboutUniv, p2: e.target.value })
                  }
                  placeholder="Accredited with A++ grade by NAAC..."
                  disabled={!canEdit}
                />
              </div>
              {canEdit ? (
                <button className="btn-save" onClick={saveAboutUnivTexts}>
                  💾 Save University Texts
                </button>
              ) : (
                <span className="text-muted">
                  You do not have edit permission for this section.
                </span>
              )}
            </div>

            {/* University Stats with Add, Edit, Delete */}
            <div style={{ maxWidth: "860px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{ margin: 0, color: "#c9d1d9", fontSize: "1.1rem" }}
                  >
                    University Statistics &amp; Accreditations
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#6e7681",
                      fontSize: "0.85rem",
                    }}
                  >
                    Add, edit, or delete the statistics displayed in the dark
                    university section.
                  </p>
                </div>
                {canAdd && (
                  <button
                    className="btn-add"
                    onClick={() =>
                      setAboutItemModal({
                        show: true,
                        type: "stat",
                        mode: "add",
                        item: { n: "", l: "" },
                      })
                    }
                  >
                    + Add Statistic
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "14px",
                }}
              >
                {(about.university?.stats || []).map((s) => (
                  <div
                    key={s.id}
                    style={{
                      background: "#161b22",
                      border: "1px solid #21262d",
                      borderRadius: "10px",
                      padding: "16px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "800",
                        color: "#93cfe0",
                        marginBottom: "4px",
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#8b949e",
                        marginBottom: "12px",
                        minHeight: "36px",
                      }}
                    >
                      {s.l}
                    </div>
                    <div
                      className="row-actions"
                      style={{ justifyContent: "center" }}
                    >
                      {canEdit && (
                        <button
                          className="btn-edit"
                          onClick={() =>
                            setAboutItemModal({
                              show: true,
                              type: "stat",
                              mode: "edit",
                              item: { ...s },
                            })
                          }
                        >
                          ✏️ Edit
                        </button>
                      )}
                      {canDelete && (
                        <button
                          className="btn-delete"
                          onClick={() =>
                            setAboutDeleteModal({
                              show: true,
                              type: "stat",
                              id: s.id,
                              title: `${s.n} - ${s.l}`,
                            })
                          }
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHero = () => (
    <div className="section-panel">
      <div className="panel-header">
        <div>
          <h2>🏠 Hero / Home Section</h2>
          <p>Edit the main landing hero section of the website.</p>
        </div>
      </div>
      <div className="obj-form">
        {[
          { key: "tagline", label: "Tagline / Badge Text" },
          { key: "title", label: "Main Headline" },
          { key: "description", label: "Description", textarea: true },
          { key: "btn1", label: "Button 1 Text" },
          { key: "btn2", label: "Button 2 Text" },
        ].map((f) => (
          <div key={f.key} className="form-group">
            <label>{f.label}</label>
            {f.textarea ? (
              <textarea
                value={localHero[f.key] || ""}
                rows={3}
                onChange={(e) =>
                  setLocalHero({ ...localHero, [f.key]: e.target.value })
                }
              />
            ) : (
              <input
                value={localHero[f.key] || ""}
                onChange={(e) =>
                  setLocalHero({ ...localHero, [f.key]: e.target.value })
                }
              />
            )}
          </div>
        ))}
        <button
          className="btn-save"
          onClick={() => saveObject("heroContent", localHero)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="section-panel">
      <div className="panel-header">
        <div>
          <h2>📞 Contact Information</h2>
          <p>Edit the contact details displayed across the website.</p>
        </div>
      </div>
      <div className="obj-form">
        {[
          { key: "address", label: "Address" },
          { key: "phone", label: "Phone Number" },
          { key: "email", label: "Email Address" },
          { key: "mapEmbed", label: "Google Maps Link" },
        ].map((f) => (
          <div key={f.key} className="form-group">
            <label>{f.label}</label>
            <input
              value={localContact[f.key] || ""}
              onChange={(e) =>
                setLocalContact({ ...localContact, [f.key]: e.target.value })
              }
            />
          </div>
        ))}
        <button
          className="btn-save"
          onClick={() => saveObject("contactInfo", localContact)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderChangePassword = () => (
    <div className="section-panel">
      <div className="panel-header">
        <div>
          <h2>🔑 Change Password</h2>
          <p>Update your login password.</p>
        </div>
      </div>
      <form className="obj-form pw-form" onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label>Current Password</label>
          <div className="pw-input-wrap">
            <input
              type={pwForm.show ? "text" : "password"}
              value={pwForm.current}
              onChange={(e) =>
                setPwForm({ ...pwForm, current: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="pw-toggle"
              onClick={() => setPwForm((p) => ({ ...p, show: !p.show }))}
            >
              {pwForm.show ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={pwForm.newPw}
            onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={pwForm.confirm}
            onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
            required
          />
        </div>
        {pwError && <div className="form-error">{pwError}</div>}
        <button type="submit" className="btn-save">
          Update Password
        </button>
      </form>
    </div>
  );

  // ── User Management Panel ─────────────────────────────────────────────────
  const renderUsers = () => (
    <div className="section-panel">
      <div className="panel-header">
        <div>
          <h2>👥 User Management</h2>
          <p>
            Add and manage Content Editors and Event Editors. Only Admin can
            access this section.
          </p>
        </div>
        <button className="btn-add" onClick={openAddUser}>
          + Add User
        </button>
      </div>

      {/* Role legend */}
      <div className="role-legend">
        {Object.entries(ROLE_META).map(([key, meta]) => (
          <div key={key} className={`role-legend-item ${meta.color}`}>
            <span className="rl-icon">{meta.icon}</span>
            <div>
              <strong>{meta.label}</strong>
              <p>
                {key === "admin"
                  ? "Full access to all sections + user management"
                  : key === "content_editor"
                    ? "Can edit Hero, Highlights, Speakers, Faculty, Research, Contact"
                    : "Can only add/edit News and Events"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit User Modal */}
      {showUserForm && (
        <div
          className="form-modal-overlay"
          onClick={() => setShowUserForm(false)}
        >
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <button
                className="form-close"
                onClick={() => setShowUserForm(false)}
              >
                ✕
              </button>
            </div>
            <div className="form-modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, name: e.target.value })
                  }
                  placeholder="e.g. Ravi Kumar"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  placeholder="user@am.amrita.edu"
                />
              </div>
              <div className="form-group">
                <label>
                  {editingUser
                    ? "New Password (leave blank to keep current)"
                    : "Password"}
                </label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  placeholder={
                    editingUser
                      ? "Leave blank to keep unchanged"
                      : "Min. 6 characters"
                  }
                />
              </div>
              <div className="form-group">
                <label>Role Preset</label>
                <select
                  value={userForm.role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    setUserForm({
                      ...userForm,
                      role: newRole,
                      privileges: getPrivilegesForRole(newRole),
                    });
                  }}
                >
                  <option value="content_editor">
                    ✏️ Content Editor — About, Hero, Highlights, Speakers,
                    Faculty, Research, Contact
                  </option>
                  <option value="about_editor">
                    📖 About Editor — Complete privilege on About Page (Add,
                    Edit, Delete)
                  </option>
                  <option value="academic_editor">
                    🎓 Academic Editor — Complete privilege on Academics Page
                    (Add, Edit, Delete)
                  </option>
                  <option value="event_editor">
                    🗓️ Event Editor — News &amp; Events only
                  </option>
                  <option value="admin">
                    👑 Administrator — Full access to all sections &amp; users
                  </option>
                  <option value="custom">
                    ⚙️ Custom Privileges — Granular section &amp; action
                    permissions
                  </option>
                </select>
              </div>

              {/* Privilege Configuration Panel */}
              <div className="form-group">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <label style={{ margin: 0 }}>
                    Section Privileges &amp; Action Permissions
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="btn-priv-quick"
                      onClick={() => {
                        setUserForm((f) => ({
                          ...f,
                          privileges: {
                            ...(f.privileges || getPrivilegesForRole(f.role)),
                            aboutContent: {
                              view: true,
                              add: true,
                              edit: true,
                              delete: true,
                            },
                          },
                        }));
                        showToast(
                          "Full About privilege enabled (Add, Edit, Delete)!",
                        );
                      }}
                    >
                      ⭐ Grant Full About Privilege
                    </button>
                    <button
                      type="button"
                      className="btn-priv-quick btn-priv-academic"
                      onClick={() => {
                        setUserForm((f) => ({
                          ...f,
                          privileges: {
                            ...(f.privileges || getPrivilegesForRole(f.role)),
                            academicsContent: {
                              view: true,
                              add: true,
                              edit: true,
                              delete: true,
                            },
                          },
                        }));
                        showToast(
                          "Full Academics privilege enabled (Add, Edit, Delete)!",
                        );
                      }}
                    >
                      🎓 Grant Full Academic Privilege
                    </button>
                    <button
                      type="button"
                      className="btn-priv-quick btn-priv-gold"
                      onClick={() => {
                        const full = { view: true, add: true, edit: true, delete: true };
                        setUserForm((f) => ({
                          ...f,
                          privileges: {
                            aboutContent: { ...full },
                            heroContent: { ...full },
                            highlights: { ...full },
                            news: { ...full },
                            events: { ...full },
                            speakers: { ...full },
                            faculty: { ...full },
                            researchAreas: { ...full },
                            contactInfo: { ...full },
                            academicsContent: { ...full },
                          },
                        }));
                        showToast("👑 Full privilege granted for ALL sections!");
                      }}
                    >
                      👑 Grant All Privileges
                    </button>
                  </div>
                </div>

                <div className="privilege-box">
                  {/* About Page privilege row */}
                  <div
                    className="privilege-row"
                    style={{ borderLeft: "3px solid #52a9bc" }}
                  >
                    <div className="priv-title-group">
                      <span>📖</span>
                      <span>About Page</span>
                      <span className="priv-badge priv-about">
                        Key Privilege
                      </span>
                    </div>
                    <div className="priv-actions-group">
                      {["view", "add", "edit", "delete"].map((act) => (
                        <label key={act} className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userForm.privileges?.aboutContent?.[act] ?? true
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserForm((f) => ({
                                ...f,
                                privileges: {
                                  ...(f.privileges ||
                                    getPrivilegesForRole(f.role)),
                                  aboutContent: {
                                    ...(f.privileges?.aboutContent || {}),
                                    [act]: val,
                                  },
                                },
                              }));
                            }}
                          />
                          {act.charAt(0).toUpperCase() + act.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Academics Page privilege row */}
                  <div
                    className="privilege-row"
                    style={{ borderLeft: "3px solid #38bdf8" }}
                  >
                    <div className="priv-title-group">
                      <span>🎓</span>
                      <span>Academics Page</span>
                      <span className="priv-badge" style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}>
                        Key Privilege
                      </span>
                    </div>
                    <div className="priv-actions-group">
                      {["view", "add", "edit", "delete"].map((act) => (
                        <label key={act} className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userForm.privileges?.academicsContent?.[act] ?? true
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserForm((f) => ({
                                ...f,
                                privileges: {
                                  ...(f.privileges ||
                                    getPrivilegesForRole(f.role)),
                                  academicsContent: {
                                    ...(f.privileges?.academicsContent || {}),
                                    [act]: val,
                                  },
                                },
                              }));
                            }}
                          />
                          {act.charAt(0).toUpperCase() + act.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Other sections in privilege box */}
                  {[
                    {
                      key: "heroContent",
                      label: "Hero / Home",
                      icon: "🏠",
                      hasAddDelete: false,
                    },
                    {
                      key: "highlights",
                      label: "Highlights",
                      icon: "⭐",
                      hasAddDelete: true,
                    },
                    {
                      key: "news",
                      label: "News",
                      icon: "📰",
                      hasAddDelete: true,
                    },
                    {
                      key: "events",
                      label: "Events",
                      icon: "🗓️",
                      hasAddDelete: true,
                    },
                    {
                      key: "speakers",
                      label: "Speakers",
                      icon: "🎤",
                      hasAddDelete: true,
                    },
                    {
                      key: "faculty",
                      label: "Faculty",
                      icon: "👨‍🏫",
                      hasAddDelete: true,
                    },
                    {
                      key: "researchAreas",
                      label: "Research Areas",
                      icon: "🔬",
                      hasAddDelete: true,
                    },
                    {
                      key: "contactInfo",
                      label: "Contact Info",
                      icon: "📞",
                      hasAddDelete: false,
                    },
                  ].map((sec) => (
                    <div key={sec.key} className="privilege-row">
                      <div className="priv-title-group">
                        <span>{sec.icon}</span>
                        <span>{sec.label}</span>
                      </div>
                      <div className="priv-actions-group">
                        <label className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userForm.privileges?.[sec.key]?.view ?? false
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserForm((f) => ({
                                ...f,
                                privileges: {
                                  ...(f.privileges ||
                                    getPrivilegesForRole(f.role)),
                                  [sec.key]: {
                                    ...(f.privileges?.[sec.key] || {}),
                                    view: val,
                                  },
                                },
                              }));
                            }}
                          />
                          View
                        </label>
                        {sec.hasAddDelete && (
                          <label className="priv-checkbox-label">
                            <input
                              type="checkbox"
                              checked={
                                userForm.privileges?.[sec.key]?.add ?? false
                              }
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUserForm((f) => ({
                                  ...f,
                                  privileges: {
                                    ...(f.privileges ||
                                      getPrivilegesForRole(f.role)),
                                    [sec.key]: {
                                      ...(f.privileges?.[sec.key] || {}),
                                      add: val,
                                    },
                                  },
                                }));
                              }}
                            />
                            Add
                          </label>
                        )}
                        <label className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userForm.privileges?.[sec.key]?.edit ?? false
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserForm((f) => ({
                                ...f,
                                privileges: {
                                  ...(f.privileges ||
                                    getPrivilegesForRole(f.role)),
                                  [sec.key]: {
                                    ...(f.privileges?.[sec.key] || {}),
                                    edit: val,
                                  },
                                },
                              }));
                            }}
                          />
                          Edit
                        </label>
                        {sec.hasAddDelete && (
                          <label className="priv-checkbox-label">
                            <input
                              type="checkbox"
                              checked={
                                userForm.privileges?.[sec.key]?.delete ?? false
                              }
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUserForm((f) => ({
                                  ...f,
                                  privileges: {
                                    ...(f.privileges ||
                                      getPrivilegesForRole(f.role)),
                                    [sec.key]: {
                                      ...(f.privileges?.[sec.key] || {}),
                                      delete: val,
                                    },
                                  },
                                }));
                              }}
                            />
                            Delete
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="toggle-label">
                  <span>Account Active</span>
                  <div
                    className={`toggle-switch ${userForm.active ? "on" : ""}`}
                    onClick={() =>
                      setUserForm((f) => ({ ...f, active: !f.active }))
                    }
                  >
                    <div className="toggle-knob" />
                  </div>
                </label>
              </div>
              {userFormError && (
                <div className="form-error">{userFormError}</div>
              )}
            </div>
            <div className="form-modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowUserForm(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={saveUser}>
                {editingUser ? "Update User" : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirm */}
      {userDeleteConfirm && (
        <div className="form-modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-icon">🗑️</div>
            <h3>Remove User?</h3>
            <p>This user will lose all access immediately.</p>
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={() => setUserDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-delete-confirm"
                onClick={() => deleteUser(userDeleteConfirm)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Built-in admin row */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Privileges</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Built-in admin — read-only */}
            <tr className="builtin-admin-row">
              <td>
                <div className="user-cell">
                  <div
                    className="user-avatar"
                    style={{
                      background: "linear-gradient(135deg,#f59e0b,#d97706)",
                    }}
                  >
                    VA
                  </div>
                  <div>
                    <div className="user-name">Vysakh</div>
                    <div className="user-since">Built-in Admin</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="user-email">vysakh@am.amrita.edu</span>
              </td>
              <td>
                <span className={`role-pill role-admin`}>👑 Admin</span>
              </td>
              <td>
                <span className="status-pill status-active">● Active</span>
              </td>
              <td>
                <span className="priv-badge priv-full">
                  👑 Full Privilege (All)
                </span>
              </td>
              <td>
                <span className="text-muted">Protected</span>
              </td>
            </tr>

            {/* Dynamic users */}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">
                  No sub-users yet. Click "Add User" to create one.
                </td>
              </tr>
            )}
            {users.map((u) => {
              const initials = u.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              const avatarColors = {
                admin: "linear-gradient(135deg,#f59e0b,#d97706)",
                content_editor: "linear-gradient(135deg,#2a7fff,#1a56cc)",
                about_editor: "linear-gradient(135deg,#0d9488,#0f766e)",
                event_editor: "linear-gradient(135deg,#059669,#047857)",
                custom: "linear-gradient(135deg,#9333ea,#7e22ce)",
              };
              return (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div
                        className="user-avatar"
                        style={{ background: avatarColors[u.role] || "#333" }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="user-name">{u.name}</div>
                        <div className="user-since">
                          Added{" "}
                          {new Date(u.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="user-email">{u.email}</span>
                  </td>
                  <td>
                    <span className={`role-pill ${ROLE_META[u.role]?.color}`}>
                      {ROLE_META[u.role]?.icon} {ROLE_META[u.role]?.label}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`status-pill ${u.active ? "status-active" : "status-inactive"}`}
                      onClick={() => toggleUserActive(u.id)}
                    >
                      {u.active ? "● Active" : "○ Inactive"}
                    </button>
                  </td>
                  <td>
                    {u.role === "admin" ? (
                      <span className="priv-badge priv-full">
                        👑 Full Privilege (All)
                      </span>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        {/* About privilege badge */}
                        {u.privileges?.aboutContent?.view &&
                        u.privileges?.aboutContent?.add &&
                        u.privileges?.aboutContent?.edit &&
                        u.privileges?.aboutContent?.delete ? (
                          <span className="priv-badge priv-full">
                            📖 About: Add / Edit / Del
                          </span>
                        ) : u.privileges?.aboutContent?.edit ? (
                          <span className="priv-badge priv-about">
                            📖 About: Edit Only
                          </span>
                        ) : u.privileges?.aboutContent?.view ? (
                          <span className="priv-badge">
                            📖 About: View Only
                          </span>
                        ) : null}

                        {/* Academics privilege badge */}
                        {u.privileges?.academicsContent?.view &&
                        u.privileges?.academicsContent?.add &&
                        u.privileges?.academicsContent?.edit &&
                        u.privileges?.academicsContent?.delete ? (
                          <span className="priv-badge priv-academic-full">
                            🎓 Academics: Add / Edit / Del
                          </span>
                        ) : u.privileges?.academicsContent?.edit ? (
                          <span className="priv-badge priv-academic">
                            🎓 Academics: Edit Only
                          </span>
                        ) : u.privileges?.academicsContent?.view ? (
                          <span className="priv-badge">
                            🎓 Academics: View Only
                          </span>
                        ) : null}

                        {!u.privileges?.aboutContent?.view &&
                         !u.privileges?.academicsContent?.view && (
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            No special access
                          </span>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            type="button"
                            className="btn-priv-quick"
                            onClick={() => openUserPrivilegeModal(u)}
                            title="Configure detailed privileges"
                          >
                            ⚙️ Permissions
                          </button>
                          <button
                            type="button"
                            className="btn-priv-quick"
                            onClick={() => toggleAboutFullPrivilege(u.id)}
                            title="Toggle Full About Privileges"
                          >
                            ⚡ Toggle About
                          </button>
                          <button
                            type="button"
                            className="btn-priv-quick btn-priv-academic"
                            onClick={() => toggleAcademicFullPrivilege(u.id)}
                            title="Toggle Full Academics Privileges"
                          >
                            🎓 Toggle Academics
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEditUser(u)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => setUserDeleteConfirm(u.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Generic list section ──────────────────────────────────────────────────
  const renderListSection = (sectionKey, config) => {
    const items = data[sectionKey] || [];
    return (
      <div className="section-panel">
        <div className="panel-header">
          <div>
            <h2>
              {config.icon} {config.title}
            </h2>
            <p>{config.desc}</p>
          </div>
          <button className="btn-add" onClick={() => startAdd(sectionKey)}>
            + Add New
          </button>
        </div>

        {showForm === sectionKey && (
          <div className="form-modal-overlay" onClick={cancelForm}>
            <div className="form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="form-modal-header">
                <h3>
                  {editingItem ? "Edit" : "Add"} {config.itemLabel}
                </h3>
                <button className="form-close" onClick={cancelForm}>
                  ✕
                </button>
              </div>
              <div className="form-modal-body">
                {config.fields.map((f) => (
                  <div key={f.key} className="form-group">
                    <label>{f.label}</label>
                    {f.type === "select" ? (
                      <select
                        value={formData[f.key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [f.key]: e.target.value })
                        }
                      >
                        <option value="">Select…</option>
                        {f.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        rows={4}
                        value={formData[f.key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [f.key]: e.target.value })
                        }
                        placeholder={f.placeholder || ""}
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[f.key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [f.key]: e.target.value })
                        }
                        placeholder={f.placeholder || ""}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="form-modal-footer">
                <button className="btn-cancel" onClick={cancelForm}>
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={() => saveItem(sectionKey)}
                >
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="items-table">
          <table>
            <thead>
              <tr>
                {config.columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="empty-row">
                    No items. Click "+ Add New" to begin.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  {config.columns.map((c) => (
                    <td key={c.key}>
                      {c.render ? (
                        c.render(item[c.key], item)
                      ) : (
                        <span className={c.truncate ? "cell-truncate" : ""}>
                          {item[c.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn-edit"
                        onClick={() => startEdit(sectionKey, item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => confirmDelete(sectionKey, item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "aboutContent":
        return renderAbout();
      case "academicsContent":
        return renderAcademics();
      case "heroContent":
        return renderHero();
      case "contactInfo":
        return renderContact();
      case "changePassword":
        return renderChangePassword();
      case "users":
        return isAdmin ? (
          renderUsers()
        ) : (
          <div className="section-panel">
            <p>Access denied.</p>
          </div>
        );
      default:
        const cfg = SECTION_CONFIGS[activeSection];
        return cfg ? (
          renderListSection(activeSection, cfg)
        ) : (
          <div className="section-panel">
            <p>Section not found.</p>
          </div>
        );
    }
  };

  // ─── UI ───────────────────────────────────────────────────────────────────
  const initials =
    currentUser?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "VA";

  return (
    <div className="admin-dash">
      {/* Toast */}
      {toast && (
        <div className={`dash-toast dash-toast-${toast.type}`}>
          {toast.type === "success" ? "✅" : "ℹ️"} {toast.msg}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="form-modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-icon">🗑️</div>
            <h3>Delete Item?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button className="btn-delete-confirm" onClick={doDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── About Item Add / Edit Modal ── */}
      {aboutItemModal.show && (
        <div
          className="form-modal-overlay"
          onClick={() =>
            setAboutItemModal({ show: false, type: "", mode: "add", item: {} })
          }
        >
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3>
                {aboutItemModal.mode === "add" ? "+ Add" : "✏️ Edit"}{" "}
                {aboutItemModal.type === "card"
                  ? "Overview Card"
                  : aboutItemModal.type === "point"
                    ? "Vision Focus Point"
                    : aboutItemModal.type === "offering"
                      ? "Inside Offering"
                      : "University Statistic"}
              </h3>
              <button
                className="form-close"
                onClick={() =>
                  setAboutItemModal({
                    show: false,
                    type: "",
                    mode: "add",
                    item: {},
                  })
                }
              >
                ✕
              </button>
            </div>
            <div className="form-modal-body">
              {aboutItemModal.type === "card" && (
                <>
                  <div className="form-group">
                    <label>Icon (Emoji or symbol)</label>
                    <input
                      value={aboutItemModal.item.icon || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, icon: e.target.value },
                        }))
                      }
                      placeholder="🛡️"
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Title</label>
                    <input
                      value={aboutItemModal.item.title || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, title: e.target.value },
                        }))
                      }
                      placeholder="e.g. CORE Center"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={aboutItemModal.item.desc || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, desc: e.target.value },
                        }))
                      }
                      placeholder="Detailed card description..."
                    />
                  </div>
                </>
              )}

              {aboutItemModal.type === "point" && (
                <div className="form-group">
                  <label>Focus Point Description</label>
                  <textarea
                    rows={4}
                    value={aboutItemModal.item.text || ""}
                    onChange={(e) =>
                      setAboutItemModal((prev) => ({
                        ...prev,
                        item: { ...prev.item, text: e.target.value },
                      }))
                    }
                    placeholder="e.g. Explore basic and applied research in Cybersecurity Systems & Networks."
                  />
                </div>
              )}

              {aboutItemModal.type === "offering" && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr",
                      gap: "10px",
                    }}
                  >
                    <div className="form-group">
                      <label>Number</label>
                      <input
                        value={aboutItemModal.item.num || ""}
                        onChange={(e) =>
                          setAboutItemModal((prev) => ({
                            ...prev,
                            item: { ...prev.item, num: e.target.value },
                          }))
                        }
                        placeholder="01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Offering Title</label>
                      <input
                        value={aboutItemModal.item.title || ""}
                        onChange={(e) =>
                          setAboutItemModal((prev) => ({
                            ...prev,
                            item: { ...prev.item, title: e.target.value },
                          }))
                        }
                        placeholder="e.g. Academic Excellence"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                      rows={2}
                      value={aboutItemModal.item.desc || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, desc: e.target.value },
                        }))
                      }
                      placeholder="Brief overview of this pillar..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Bullet Items (one item per line)</label>
                    <textarea
                      rows={4}
                      value={aboutItemModal.item.itemsText || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, itemsText: e.target.value },
                        }))
                      }
                      placeholder="B.Tech. in CSE (Cyber Security)&#10;M.Tech. in Cyber Security Systems & Networks&#10;Ph.D. in Cyber Security"
                    />
                  </div>
                </>
              )}

              {aboutItemModal.type === "stat" && (
                <>
                  <div className="form-group">
                    <label>Stat Number / Value</label>
                    <input
                      value={aboutItemModal.item.n || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, n: e.target.value },
                        }))
                      }
                      placeholder="e.g. A++ or Top 100 or 100+"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stat Label / Description</label>
                    <input
                      value={aboutItemModal.item.l || ""}
                      onChange={(e) =>
                        setAboutItemModal((prev) => ({
                          ...prev,
                          item: { ...prev.item, l: e.target.value },
                        }))
                      }
                      placeholder="e.g. NAAC Accreditation"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="form-modal-footer">
              <button
                className="btn-cancel"
                onClick={() =>
                  setAboutItemModal({
                    show: false,
                    type: "",
                    mode: "add",
                    item: {},
                  })
                }
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={() =>
                  saveAboutItem(
                    aboutItemModal.type,
                    aboutItemModal.item,
                    aboutItemModal.mode,
                  )
                }
              >
                {aboutItemModal.mode === "add"
                  ? "+ Add to About"
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── About Item Delete Confirm Modal ── */}
      {aboutDeleteModal.show && (
        <div className="form-modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-icon">🗑️</div>
            <h3>Delete About Item?</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{aboutDeleteModal.title}</strong>? This action cannot be
              undone.
            </p>
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={() =>
                  setAboutDeleteModal({
                    show: false,
                    type: "",
                    id: null,
                    title: "",
                  })
                }
              >
                Cancel
              </button>
              <button
                className="btn-delete-confirm"
                onClick={() =>
                  deleteAboutItem(aboutDeleteModal.type, aboutDeleteModal.id)
                }
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── User Privilege Quick Modal ── */}
      {userPrivilegeModal.show && (
        <div
          className="form-modal-overlay"
          onClick={() =>
            setUserPrivilegeModal({
              show: false,
              userId: null,
              userName: "",
              role: "content_editor",
              privileges: {},
            })
          }
        >
          <div
            className="form-modal"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="form-modal-header">
              <div>
                <h3 style={{ margin: 0 }}>
                  ⚙️ Configure Privileges: {userPrivilegeModal.userName}
                </h3>
                <span className="text-muted">
                  Grant or restrict permissions for each section.
                </span>
              </div>
              <button
                className="form-close"
                onClick={() =>
                  setUserPrivilegeModal({
                    show: false,
                    userId: null,
                    userName: "",
                    role: "content_editor",
                    privileges: {},
                  })
                }
              >
                ✕
              </button>
            </div>
            <div className="form-modal-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#c9d1d9",
                    fontWeight: "600",
                  }}
                >
                  Section Privileges
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn-priv-quick"
                    onClick={() =>
                      setUserPrivilegeModal((prev) => ({
                        ...prev,
                        privileges: {
                          ...prev.privileges,
                          aboutContent: {
                            view: true,
                            add: true,
                            edit: true,
                            delete: true,
                          },
                        },
                      }))
                    }
                  >
                    ⭐ Grant Full About Privilege (Add, Edit, Delete)
                  </button>
                  <button
                    type="button"
                    className="btn-priv-quick btn-priv-academic"
                    onClick={() =>
                      setUserPrivilegeModal((prev) => ({
                        ...prev,
                        privileges: {
                          ...prev.privileges,
                          academicsContent: {
                            view: true,
                            add: true,
                            edit: true,
                            delete: true,
                          },
                        },
                      }))
                    }
                  >
                    🎓 Grant Full Academic Privilege (Add, Edit, Delete)
                  </button>
                  <button
                    type="button"
                    className="btn-priv-quick btn-priv-gold"
                    onClick={() => {
                      const full = { view: true, add: true, edit: true, delete: true };
                      setUserPrivilegeModal((prev) => ({
                        ...prev,
                        privileges: {
                          aboutContent: { ...full },
                          heroContent: { ...full },
                          highlights: { ...full },
                          news: { ...full },
                          events: { ...full },
                          speakers: { ...full },
                          faculty: { ...full },
                          researchAreas: { ...full },
                          contactInfo: { ...full },
                          academicsContent: { ...full },
                        },
                      }));
                    }}
                  >
                    👑 Grant All Privileges
                  </button>
                </div>
              </div>

              <div className="privilege-box">
                <div
                  className="privilege-row"
                  style={{ borderLeft: "3px solid #52a9bc" }}
                >
                  <div className="priv-title-group">
                    <span>📖</span>
                    <span>About Page</span>
                    <span className="priv-badge priv-about">Key Privilege</span>
                  </div>
                  <div className="priv-actions-group">
                    {["view", "add", "edit", "delete"].map((act) => (
                      <label key={act} className="priv-checkbox-label">
                        <input
                          type="checkbox"
                          checked={
                            userPrivilegeModal.privileges?.aboutContent?.[
                              act
                            ] ?? true
                          }
                          onChange={(e) => {
                            const val = e.target.checked;
                            setUserPrivilegeModal((prev) => ({
                              ...prev,
                              privileges: {
                                ...prev.privileges,
                                aboutContent: {
                                  ...(prev.privileges?.aboutContent || {}),
                                  [act]: val,
                                },
                              },
                            }));
                          }}
                        />
                        {act.charAt(0).toUpperCase() + act.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {[
                  {
                    key: "heroContent",
                    label: "Hero / Home",
                    icon: "🏠",
                    hasAddDelete: false,
                  },
                  {
                    key: "highlights",
                    label: "Highlights",
                    icon: "⭐",
                    hasAddDelete: true,
                  },
                  {
                    key: "news",
                    label: "News",
                    icon: "📰",
                    hasAddDelete: true,
                  },
                  {
                    key: "events",
                    label: "Events",
                    icon: "🗓️",
                    hasAddDelete: true,
                  },
                  {
                    key: "speakers",
                    label: "Speakers",
                    icon: "🎤",
                    hasAddDelete: true,
                  },
                  {
                    key: "faculty",
                    label: "Faculty",
                    icon: "👨‍🏫",
                    hasAddDelete: true,
                  },
                  {
                    key: "researchAreas",
                    label: "Research Areas",
                    icon: "🔬",
                    hasAddDelete: true,
                  },
                  {
                    key: "contactInfo",
                    label: "Contact Info",
                    icon: "📞",
                    hasAddDelete: false,
                  },
                ].map((sec) => (
                  <div key={sec.key} className="privilege-row">
                    <div className="priv-title-group">
                      <span>{sec.icon}</span>
                      <span>{sec.label}</span>
                    </div>
                    <div className="priv-actions-group">
                      <label className="priv-checkbox-label">
                        <input
                          type="checkbox"
                          checked={
                            userPrivilegeModal.privileges?.[sec.key]?.view ??
                            false
                          }
                          onChange={(e) => {
                            const val = e.target.checked;
                            setUserPrivilegeModal((prev) => ({
                              ...prev,
                              privileges: {
                                ...prev.privileges,
                                [sec.key]: {
                                  ...(prev.privileges?.[sec.key] || {}),
                                  view: val,
                                },
                              },
                            }));
                          }}
                        />
                        View
                      </label>
                      {sec.hasAddDelete && (
                        <label className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userPrivilegeModal.privileges?.[sec.key]?.add ??
                              false
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserPrivilegeModal((prev) => ({
                                ...prev,
                                privileges: {
                                  ...prev.privileges,
                                  [sec.key]: {
                                    ...(prev.privileges?.[sec.key] || {}),
                                    add: val,
                                  },
                                },
                              }));
                            }}
                          />
                          Add
                        </label>
                      )}
                      <label className="priv-checkbox-label">
                        <input
                          type="checkbox"
                          checked={
                            userPrivilegeModal.privileges?.[sec.key]?.edit ??
                            false
                          }
                          onChange={(e) => {
                            const val = e.target.checked;
                            setUserPrivilegeModal((prev) => ({
                              ...prev,
                              privileges: {
                                ...prev.privileges,
                                [sec.key]: {
                                  ...(prev.privileges?.[sec.key] || {}),
                                  edit: val,
                                },
                              },
                            }));
                          }}
                        />
                        Edit
                      </label>
                      {sec.hasAddDelete && (
                        <label className="priv-checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              userPrivilegeModal.privileges?.[sec.key]
                                ?.delete ?? false
                            }
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUserPrivilegeModal((prev) => ({
                                ...prev,
                                privileges: {
                                  ...prev.privileges,
                                  [sec.key]: {
                                    ...(prev.privileges?.[sec.key] || {}),
                                    delete: val,
                                  },
                                },
                              }));
                            }}
                          />
                          Delete
                        </label>
                      )}
                    </div>
                  </div>
                ))}

                {/* Academics Page privilege row */}
                <div
                  className="privilege-row"
                  style={{ borderLeft: "3px solid #38bdf8" }}
                >
                  <div className="priv-title-group">
                    <span>🎓</span>
                    <span>Academics Page</span>
                    <span className="priv-badge priv-academic">Key Privilege</span>
                  </div>
                  <div className="priv-actions-group">
                    {["view", "add", "edit", "delete"].map((act) => (
                      <label key={act} className="priv-checkbox-label">
                        <input
                          type="checkbox"
                          checked={
                            userPrivilegeModal.privileges?.academicsContent?.[act] ?? false
                          }
                          onChange={(e) => {
                            const val = e.target.checked;
                            setUserPrivilegeModal((prev) => ({
                              ...prev,
                              privileges: {
                                ...prev.privileges,
                                academicsContent: {
                                  ...(prev.privileges?.academicsContent || {}),
                                  [act]: val,
                                },
                              },
                            }));
                          }}
                        />
                        {act.charAt(0).toUpperCase() + act.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-modal-footer">
              <button
                className="btn-cancel"
                onClick={() =>
                  setUserPrivilegeModal({
                    show: false,
                    userId: null,
                    userName: "",
                    role: "content_editor",
                    privileges: {},
                  })
                }
              >
                Cancel
              </button>
              <button className="btn-save" onClick={saveUserPrivileges}>
                Save Privileges
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && (
            <div className="sidebar-brand">
              <div>
                <div className="brand-title">CyberAdmin</div>
                <div className="brand-sub">Admin Dashboard</div>
              </div>
            </div>
          )}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          {visibleSections.map((s) => (
            <button
              key={s.key}
              className={`nav-item ${activeSection === s.key ? "active" : ""} ${s.adminOnly ? "nav-admin" : ""}`}
              onClick={() => {
                setActiveSection(s.key);
                setShowForm(false);
              }}
              title={!sidebarOpen ? s.label : ""}
            >
              <span className="nav-icon">{s.icon}</span>
              {sidebarOpen && <span className="nav-label">{s.label}</span>}
              {s.adminOnly && sidebarOpen && (
                <span className="nav-admin-badge">Admin</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
          {sidebarOpen && (
            <div className="admin-identity">
              <div className="ai-avatar">{initials}</div>
              <div className="ai-info">
                <div className="ai-name">{currentUser?.name || "Admin"}</div>
                <div className={`ai-role-badge ${ROLE_META[userRole]?.color}`}>
                  {ROLE_META[userRole]?.icon} {ROLE_META[userRole]?.label}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <div className="dash-topbar">
          <div className="topbar-left">
            <span className="topbar-section">
              {visibleSections.find((s) => s.key === activeSection)?.label ||
                "Dashboard"}
            </span>
          </div>
          <div className="topbar-right">
            <div className="topbar-stats">
              {[
                { label: "News", val: data.news.length },
                { label: "Events", val: data.events.length },
                ...(isAdmin ? [{ label: "Users", val: users.length + 1 }] : []),
              ].map((s) => (
                <div key={s.label} className="topbar-stat">
                  <span className="ts-val">{s.val}</span>
                  <span className="ts-label">{s.label}</span>
                </div>
              ))}
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="view-site-btn"
            >
              View Site
            </a>
          </div>
        </div>
        <div className="dash-content">{renderSection()}</div>
      </main>
    </div>
  );
}
