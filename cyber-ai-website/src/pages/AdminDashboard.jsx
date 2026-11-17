import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// ─── Role Definitions ─────────────────────────────────────────────────────────
// admin        → full access to everything including user management
// content_editor → can edit hero, highlights, speakers, faculty, research, contact — NOT events/news/users
// event_editor   → can ONLY edit news and events
const ROLE_META = {
  admin: { label: "Admin", color: "role-admin", icon: "👑", sections: "ALL" },
  content_editor: {
    label: "Content Editor",
    color: "role-content",
    icon: "✏️",
    sections: [
      "overview",
      "heroContent",
      "highlights",
      "speakers",
      "faculty",
      "researchAreas",
      "contactInfo",
      "changePassword",
    ],
  },
  event_editor: {
    label: "Event Editor",
    color: "role-event",
    icon: "🗓️",
    sections: ["overview", "news", "events", "changePassword"],
  },
};

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
      icon: "🔬",
    },
    {
      id: 2,
      date: "28 Jul 2026",
      title: "Amrita Researchers Win Best Paper Award at ACL 2026 Workshop",
      excerpt:
        "Amrita researchers were recognized at the ACL 2026 Workshop for their innovative study on generative AI.",
      tag: "Achievement",
      icon: "🏆",
    },
    {
      id: 3,
      date: "20 May 2026",
      title:
        "Campus to the United Nations: amFOSS Student Selected for UNECE Assignment",
      excerpt:
        "Amrita student Surendran from the amFOSS community has been selected for a UN open-source initiative.",
      tag: "Students",
      icon: "🌍",
    },
    {
      id: 4,
      date: "14 Dec 2025",
      title:
        "AI Safety Conclave Releases White Paper on Ethical AI for the Global South",
      excerpt:
        "The AI Safety Conclave held at Amrita produced a landmark white paper on ethical and safe AI.",
      tag: "Events",
      icon: "📋",
    },
    {
      id: 5,
      date: "09 Jul 2024",
      title: "Announcement of Phase III of Student Induction Programme",
      excerpt:
        "The Center announces Phase III of its comprehensive Student Induction Programme for the new B.Tech. batch.",
      tag: "Academics",
      icon: "🎓",
    },
  ],
  events: [
    {
      id: 1,
      title: "AI Safety Conclave",
      desc: "High-level symposium addressing safe, ethical, and sovereign AI frameworks for India and the Global South.",
      icon: "🛡️",
      type: "Annual Event",
      tags: "AI Safety, Policy, Ethics",
    },
    {
      id: 2,
      title: "InCTF — India Capture The Flag",
      desc: "India's premier national CTF cybersecurity competition organized by the Center.",
      icon: "🏁",
      type: "Annual Competition",
      tags: "CTF, Competition, Students",
    },
    {
      id: 3,
      title: "ShaktiCon",
      desc: "International cybersecurity conference dedicated to empowering women in cybersecurity.",
      icon: "⚡",
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
      icon: "🏛️",
    },
    {
      id: 2,
      name: "J. Satyanarayana",
      title: "Department of Electronics and IT (DeitY), Govt. of India",
      category: "Government",
      icon: "🏛️",
    },
    {
      id: 3,
      name: "Vijay Bhatkar",
      title: "IIT Delhi, Architect of PARAM Supercomputers",
      category: "Academia",
      icon: "🎓",
    },
    {
      id: 4,
      name: "Esther Dyson",
      title: "Founder of ICANN",
      category: "Industry",
      icon: "🌐",
    },
    {
      id: 5,
      name: "Herbert Bos",
      title: "Vrije Universiteit Amsterdam, Netherlands",
      category: "Academia",
      icon: "🎓",
    },
    {
      id: 6,
      name: "Ravi Sandhu",
      title: "University of Texas at San Antonio, USA",
      category: "Academia",
      icon: "🎓",
    },
    {
      id: 7,
      name: "Gene Tsudik",
      title: "University of California, USA",
      category: "Academia",
      icon: "🎓",
    },
    {
      id: 8,
      name: "K. Venkatesh Prasad",
      title: "Ford Motor Company, USA",
      category: "Industry",
      icon: "🏭",
    },
    {
      id: 9,
      name: "Lipika Dey",
      title: "Tata Consultancy Services (TCS)",
      category: "Industry",
      icon: "💼",
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
      icon: "👩‍💼",
      isLeadership: "true",
    },
  ],
  researchAreas: [
    {
      id: 1,
      icon: "🤖",
      title: "Agentic AI & Autonomous Cyber Defense",
      shortDesc:
        "Intelligent agents for autonomous threat detection and adaptive defense.",
      color: "area-blue",
    },
    {
      id: 2,
      icon: "🦾",
      title: "Physical AI and Embodied Intelligence",
      shortDesc:
        "AI for autonomous systems, robotics, drones, and intelligent machines.",
      color: "area-cyan",
    },
    {
      id: 3,
      icon: "🔐",
      title: "AI Sovereignty and Trusted AI Infrastructure",
      shortDesc:
        "Sovereign AI platforms, federated learning, privacy-preserving architectures.",
      color: "area-teal",
    },
    {
      id: 4,
      icon: "☁️",
      title: "Cloud-Based Soft Sensors & Hypervisor Re-Architecture",
      shortDesc:
        "Security-enabled data object (SEDO) layer for insider threat protection.",
      color: "area-blue",
    },
    {
      id: 5,
      icon: "📡",
      title: "Internet of Things (IoT) and Security",
      shortDesc:
        "Secure device identification, registration, and concurrent event processing.",
      color: "area-teal",
    },
    {
      id: 6,
      icon: "🔑",
      title: "Cryptography & Boolean Functions",
      shortDesc:
        "Boolean function classification and higher-order nonlinearities.",
      color: "area-blue",
    },
    {
      id: 7,
      icon: "🏥",
      title: "Healthcare Security",
      shortDesc:
        "Securing connected medical devices, wearables, and implantable devices.",
      color: "area-cyan",
    },
    {
      id: 8,
      icon: "📊",
      title: "Big Data Analytics Platform",
      shortDesc:
        "Distributed parallel database with auto-scalable ML analytics for IoT data.",
      color: "area-navy",
    },
    {
      id: 9,
      icon: "🚗",
      title: "Automotive Security",
      shortDesc:
        "Secure automotive infotainment platforms for safe inter-vehicular data exchange.",
      color: "area-teal",
    },
    {
      id: 10,
      icon: "🎓",
      title: "Security Education",
      shortDesc:
        "Innovative approaches to cybersecurity education, training, and awareness.",
      color: "area-navy",
    },
  ],
  highlights: [
    {
      id: 1,
      icon: "🛡️",
      title: "CORE Designation",
      badge: "Govt. of India",
      desc: "Designated as a Center of Relevance and Excellence (CORE) for Cybersecurity in India.",
    },
    {
      id: 2,
      icon: "🏆",
      title: "Accredited 'A++' Grade",
      badge: "NAAC Accredited",
      desc: "Accredited 'A++' Grade by NAAC.",
    },
    {
      id: 3,
      icon: "🌍",
      title: "World's Top 100",
      badge: "THE Impact Rankings",
      desc: "Ranked in the World's Top 100 Universities in Times Higher Education (THE) Impact Rankings.",
    },
    {
      id: 4,
      icon: "💡",
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
};

// ─── All Sections (admin sees all) ───────────────────────────────────────────
const ALL_SECTIONS = [
  { key: "overview", label: "Dashboard", icon: "📊" },
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
    if (ROLE_META[userRole].sections === "ALL") return true;
    return ROLE_META[userRole].sections.includes(s.key);
  });

  const [activeSection, setActiveSection] = useState("overview");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("adminSiteData");
    return saved ? JSON.parse(saved) : INITIAL_DATA;
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

  // ── Sync hero / contact local copies ────────────────────────────────────
  useEffect(() => {
    setLocalHero({ ...data.heroContent });
  }, [data.heroContent]);
  useEffect(() => {
    setLocalContact({ ...data.contactInfo });
  }, [data.contactInfo]);

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

  // ── User Management ───────────────────────────────────────────────────────
  const openAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: "",
      email: "",
      password: "",
      role: "content_editor",
      active: true,
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
    });
    setUserFormError("");
    setShowUserForm(true);
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
      icon: "📰",
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
      icon: "🗓️",
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
      icon: "🎤",
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
      icon: "👨‍🏫",
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
      icon: "🔬",
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
      icon: "⭐",
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
              label: "News Items",
              count: data.news.length,
              icon: "📰",
              section: "news",
            },
            {
              label: "Events",
              count: data.events.length,
              icon: "🗓️",
              section: "events",
            },
            {
              label: "Speakers",
              count: data.speakers.length,
              icon: "🎤",
              section: "speakers",
            },
            {
              label: "Faculty",
              count: data.faculty.length,
              icon: "👨‍🏫",
              section: "faculty",
            },
            {
              label: "Research Areas",
              count: data.researchAreas.length,
              icon: "🔬",
              section: "researchAreas",
            },
            ...(isAdmin
              ? [
                  {
                    label: "Users",
                    count: totalUsers,
                    icon: "👥",
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
                { label: "Add News", section: "news", icon: "➕" },
                { label: "Add Event", section: "events", icon: "➕" },
                { label: "Add Speaker", section: "speakers", icon: "➕" },
                { label: "Add Faculty", section: "faculty", icon: "➕" },
                {
                  label: "Add User",
                  section: "users",
                  icon: "👤",
                  action: "addUser",
                },
                { label: "Edit Hero", section: "heroContent", icon: "✏️" },
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
                <label>Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) =>
                    setUserForm({ ...userForm, role: e.target.value })
                  }
                >
                  <option value="content_editor">
                    ✏️ Content Editor — Hero, Highlights, Speakers, Faculty,
                    Research, Contact
                  </option>
                  <option value="event_editor">
                    🗓️ Event Editor — News & Events only
                  </option>
                </select>
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
                <span className="text-muted">Protected</span>
              </td>
            </tr>

            {/* Dynamic users */}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-row">
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
                content_editor: "linear-gradient(135deg,#2a7fff,#1a56cc)",
                event_editor: "linear-gradient(135deg,#059669,#047857)",
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

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && (
            <div className="sidebar-brand">
              <span className="brand-icon">🛡️</span>
              <div>
                <div className="brand-title">CyberPanel</div>
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
              🌐 View Site
            </a>
          </div>
        </div>
        <div className="dash-content">{renderSection()}</div>
      </main>
    </div>
  );
}
