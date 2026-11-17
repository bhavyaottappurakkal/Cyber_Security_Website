import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ABOUT_CONTENT } from "./About";
import "./AdminDashboard.css";

// ─── Role Definitions ─────────────────────────────────────────────────────────
// admin        → full access to everything including user management
// content_editor → can edit about, hero, highlights, speakers, faculty, research, contact — NOT events/news/users
// about_editor   → can ONLY edit About page (full Add, Edit, Delete privileges)
// event_editor   → can ONLY edit news and events
// custom         → customizable privileges per section and action
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
      "changePassword",
    ],
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
      aboutContent: { view: true, add: true, edit: true, delete: true },
      heroContent: { view: true, add: true, edit: true, delete: true },
      highlights: { view: true, add: true, edit: true, delete: true },
      news: { view: true, add: true, edit: true, delete: true },
      events: { view: true, add: true, edit: true, delete: true },
      speakers: { view: true, add: true, edit: true, delete: true },
      faculty: { view: true, add: true, edit: true, delete: true },
      researchAreas: { view: true, add: true, edit: true, delete: true },
      contactInfo: { view: true, add: true, edit: true, delete: true },
    };
  }
  if (role === "about_editor") {
    return {
      aboutContent: { view: true, add: true, edit: true, delete: true },
      heroContent: { view: false, add: false, edit: false, delete: false },
      highlights: { view: false, add: false, edit: false, delete: false },
      news: { view: false, add: false, edit: false, delete: false },
      events: { view: false, add: false, edit: false, delete: false },
      speakers: { view: false, add: false, edit: false, delete: false },
      faculty: { view: false, add: false, edit: false, delete: false },
      researchAreas: { view: false, add: false, edit: false, delete: false },
      contactInfo: { view: false, add: false, edit: false, delete: false },
    };
  }
  if (role === "event_editor") {
    return {
      aboutContent: { view: false, add: false, edit: false, delete: false },
      heroContent: { view: false, add: false, edit: false, delete: false },
      highlights: { view: false, add: false, edit: false, delete: false },
      news: { view: true, add: true, edit: true, delete: true },
      events: { view: true, add: true, edit: true, delete: true },
      speakers: { view: false, add: false, edit: false, delete: false },
      faculty: { view: false, add: false, edit: false, delete: false },
      researchAreas: { view: false, add: false, edit: false, delete: false },
      contactInfo: { view: false, add: false, edit: false, delete: false },
    };
  }
  // content_editor
  return {
    aboutContent: { view: true, add: true, edit: true, delete: true },
    heroContent: { view: true, add: false, edit: true, delete: false },
    highlights: { view: true, add: true, edit: true, delete: true },
    news: { view: false, add: false, edit: false, delete: false },
    events: { view: false, add: false, edit: false, delete: false },
    speakers: { view: true, add: true, edit: true, delete: true },
    faculty: { view: true, add: true, edit: true, delete: true },
    researchAreas: { view: true, add: true, edit: true, delete: true },
    contactInfo: { view: true, add: false, edit: true, delete: false },
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

  const confirmDelete = (section, id) => setDeleteConfirm({ section, id });
  const doDelete = () => {
    if (!deleteConfirm) return;
    setData((prev) => ({
      ...prev,
      [deleteConfirm.section]: prev[deleteConfirm.section].filter(
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
                        ) : (
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.75rem" }}
                          >
                            No About Access
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
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#c9d1d9",
                    fontWeight: "600",
                  }}
                >
                  About Page Privilege
                </span>
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
