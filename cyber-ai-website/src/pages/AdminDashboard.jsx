import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const DEFAULT_DATA = {
  heroContent: {
    title: "Research That Moves the World Forward",
    description:
      "A template showcase for breakthrough research, interdisciplinary collaboration, and global academic impact.",
    btn1: "Explore Research",
  },
  aboutContent: {
    hero: { title: "Celebration of Innovation & Heritage" },
    overview: {
      paragraphs: [
        "Highlighting milestones, community stories, and collaborative achievements across our campus and global network.",
      ],
    },
  },
  academicsContent: {
    programs: [
      {
        id: 1,
        eyebrow: "Undergraduate",
        title: "Undergraduate Programs",
        desc: "Flexible, rigorous degree programs combining foundational theory with hands-on project experience.",
      },
      {
        id: 2,
        eyebrow: "Graduate",
        title: "Master’s & Professional Degrees",
        desc: "Specialized graduate education designed for advanced technical depth and leadership.",
      },
      {
        id: 3,
        eyebrow: "Doctoral",
        title: "Ph.D. & Research Fellowships",
        desc: "Original research alongside world-renowned faculty mentors in state-of-the-art laboratories.",
      },
    ],
  },
  faculty: [
    { id: 1, name: "Dr. Krishnashree Achuthan", role: "Dean & Professor", area: "Cybersecurity Systems" },
    { id: 2, name: "Dr. Sethumadhavan M.", role: "Professor & Head", area: "Cryptography & Privacy" },
    { id: 3, name: "Dr. Prabhaker Mateti", role: "Visiting Professor", area: "Systems & Network Security" },
  ],
  news: [
    { id: 1, category: "Campus", title: "Inside Our Top-Ranked Technology-Ready Campus" },
    { id: 2, category: "Leadership", title: "Recognized Among Leading Colleges for Future Leaders" },
    { id: 3, category: "Open Learning", title: "Expanding Access to Core Courses Through Open Learning" },
    { id: 4, category: "Research", title: "National Faculty Awards Support Wide-Ranging Discovery" },
  ],
  events: [
    { id: 1, month: "NOV", day: "18", title: "Annual Research & Innovation Symposium", venue: "10:00 AM · Main Auditorium" },
    { id: 2, month: "DEC", day: "04", title: "Distinguished Lecture Series: Future of Science", venue: "4:30 PM · Lecture Hall A" },
    { id: 3, month: "DEC", day: "12", title: "Graduate Admissions & Program Information Session", venue: "2:00 PM · Virtual & On-Campus" },
  ],
};

function loadSiteData() {
  try {
    const raw = localStorage.getItem("adminSiteData");
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_DATA,
      ...parsed,
      heroContent: { ...DEFAULT_DATA.heroContent, ...(parsed.heroContent || {}) },
      aboutContent: { ...DEFAULT_DATA.aboutContent, ...(parsed.aboutContent || {}) },
      academicsContent: parsed.academicsContent?.programs
        ? parsed.academicsContent
        : DEFAULT_DATA.academicsContent,
      faculty: parsed.faculty?.length ? parsed.faculty : DEFAULT_DATA.faculty,
      news: parsed.news?.length ? parsed.news : DEFAULT_DATA.news,
      events: parsed.events?.length ? parsed.events : DEFAULT_DATA.events,
    };
  } catch {
    return DEFAULT_DATA;
  }
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("cyberPanelUsers") || "[]");
  } catch {
    return [];
  }
}

/* ── Outline SVG Icons matching mockup ── */
function Icon({ name }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "ia-svg",
  };
  switch (name) {
    case "institute":
      return (
        <svg {...props}>
          <path d="M3 21h18M4 18h16M6 18V9M10 18V9M14 18V9M18 18V9M2 9l10-6 10 6" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...props}>
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );
    case "about":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <circle cx="12" cy="8" r="0.5" fill="currentColor" />
        </svg>
      );
    case "academics":
      return (
        <svg {...props}>
          <path d="M22 10l-10-5-10 5 10 5 10-5z" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
        </svg>
      );
    case "faculty":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "newsEvents":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "user":
      return (
        <svg {...props}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    default:
      return null;
  }
}

const SIDEBAR_ITEMS = [
  { key: "overview", label: "Dashboard", icon: "dashboard" },
  { key: "home", label: "Home", icon: "home" },
  { key: "about", label: "About", icon: "about" },
  { key: "academics", label: "Academics", icon: "academics" },
  { key: "faculty", label: "Faculty", icon: "faculty" },
  { key: "newsEvents", label: "News & Events", icon: "newsEvents" },
  { key: "settings", label: "Settings", icon: "settings", isBottom: true },
];

const QUICK_CARDS = [
  { key: "home", label: "Home", icon: "dashboard", highlighted: true },
  { key: "about", label: "About", icon: "about" },
  { key: "academics", label: "Academics", icon: "academics" },
  { key: "faculty", label: "Faculty", icon: "faculty" },
  { key: "newsEvents", label: "News & Events", icon: "newsEvents" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [data, setData] = useState(loadSiteData);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [newsTab, setNewsTab] = useState("news");
  const [settingsTab, setSettingsTab] = useState("profile");
  const [users, setUsers] = useState(getStoredUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "content_editor" });
  const [pwForm, setPwForm] = useState({ currentPw: "", newPw: "", confirmPw: "" });
  const [newFaculty, setNewFaculty] = useState({ name: "", role: "", area: "" });
  const [newNews, setNewNews] = useState({ category: "Campus", title: "" });
  const [newEvent, setNewEvent] = useState({ month: "NOV", day: "25", title: "", venue: "" });
  const menuRef = useRef(null);

  const [currentUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("adminUser") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") !== "true") {
      navigate("/cyber-panel");
    }
  }, [navigate]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const showToast = (msg, type = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const persistData = (nextData, msg = "Changes saved successfully!") => {
    setData(nextData);
    localStorage.setItem("adminSiteData", JSON.stringify(nextData));
    showToast(msg, "success");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminUser");
    navigate("/cyber-panel");
  };

  const roleLabel =
    currentUser?.role === "content_editor"
      ? "Content Editor"
      : currentUser?.role === "event_editor"
        ? "Event Editor"
        : "Admin";

  const displayName = currentUser?.name || "Admin";

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name.trim()) return;
    const next = {
      ...data,
      faculty: [...data.faculty, { id: Date.now(), ...newFaculty }],
    };
    persistData(next, "Faculty member added");
    setNewFaculty({ name: "", role: "", area: "" });
  };

  const handleDeleteFaculty = (id) => {
    persistData({ ...data, faculty: data.faculty.filter((f) => f.id !== id) }, "Faculty removed");
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNews.title.trim()) return;
    persistData(
      { ...data, news: [{ id: Date.now(), ...newNews }, ...data.news] },
      "News item added"
    );
    setNewNews({ category: "Campus", title: "" });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    persistData(
      { ...data, events: [{ id: Date.now(), ...newEvent }, ...data.events] },
      "Event added"
    );
    setNewEvent({ month: "NOV", day: "25", title: "", venue: "" });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("adminPassword") || "Cyber@Secure#2026";
    if (pwForm.currentPw !== stored) {
      showToast("Current password is incorrect", "error");
      return;
    }
    if (pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirmPw) {
      showToast("New passwords must match (min 6 chars)", "error");
      return;
    }
    localStorage.setItem("adminPassword", pwForm.newPw);
    setPwForm({ currentPw: "", newPw: "", confirmPw: "" });
    showToast("Password updated successfully!", "success");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.email.trim() || !newUser.password.trim()) return;
    const nextUsers = [...users, { id: Date.now(), ...newUser, active: true }];
    setUsers(nextUsers);
    localStorage.setItem("cyberPanelUsers", JSON.stringify(nextUsers));
    setNewUser({ name: "", email: "", password: "", role: "content_editor" });
    showToast("User added");
  };

  return (
    <div className="ia-shell">
      {/* Top Bar */}
      <header className="ia-topbar">
        <div className="ia-brand">
          <span className="ia-brand-icon">
            <Icon name="institute" />
          </span>
          <span className="ia-brand-title">Institute Admin</span>
        </div>

        <div className="ia-topbar-right" ref={menuRef}>
          <span className="ia-role-pill">
            <Icon name="shield" />
            <span>Login as: {roleLabel}</span>
          </span>

          <button
            type="button"
            className="ia-user-btn"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            aria-expanded={userMenuOpen}
          >
            <span className="ia-avatar">
              <Icon name="user" />
            </span>
            <span className="ia-user-name">{displayName}</span>
            <span className="ia-caret">▾</span>
          </button>

          {userMenuOpen && (
            <div className="ia-dropdown">
              <button
                type="button"
                className="ia-drop-item"
                onClick={() => {
                  setActiveSection("settings");
                  setSettingsTab("profile");
                  setUserMenuOpen(false);
                }}
              >
                <Icon name="user" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                className="ia-drop-item"
                onClick={() => {
                  setActiveSection("settings");
                  setSettingsTab("password");
                  setUserMenuOpen(false);
                }}
              >
                <Icon name="settings" />
                <span>Change Password</span>
              </button>
              <button
                type="button"
                className="ia-drop-item ia-drop-logout"
                onClick={handleLogout}
              >
                <span>↔</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="ia-body">
        {/* Left Sidebar */}
        <aside className="ia-sidebar">
          <nav className="ia-nav" aria-label="Admin sections">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`ia-nav-item ${activeSection === item.key ? "is-active" : ""} ${
                  item.isBottom ? "ia-nav-settings" : ""
                }`}
                onClick={() => setActiveSection(item.key)}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ia-main">
          {toast && (
            <div className={`ia-toast ia-toast-${toast.type}`} role="status" aria-live="polite">
              <span className="ia-toast-icon">{toast.type === "error" ? "!" : "✓"}</span>
              <span className="ia-toast-text">{toast.msg}</span>
              <button
                type="button"
                className="ia-toast-close"
                onClick={() => setToast(null)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          {activeSection === "overview" && (
            <div>
              <div className="ia-page-head">
                <h1>Dashboard</h1>
                <p>Manage and update website content</p>
              </div>

              <div className="ia-cards-grid">
                {QUICK_CARDS.map((card) => (
                  <button
                    key={card.key}
                    type="button"
                    className={`ia-quick-card ${card.highlighted ? "is-tinted" : ""}`}
                    onClick={() => setActiveSection(card.key)}
                  >
                    <span className="ia-card-icon">
                      <Icon name={card.icon} />
                    </span>
                    <span className="ia-card-label">{card.label}</span>
                    <span className="ia-card-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === "home" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Home</h1>
                <p>Update the main hero slide headline, description, and CTA button</p>
              </div>

              <form
                className="ia-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  persistData(data, "Home content saved");
                }}
              >
                <label className="ia-field">
                  <span>Hero Headline</span>
                  <input
                    type="text"
                    value={data.heroContent.title}
                    onChange={(e) =>
                      setData({ ...data, heroContent: { ...data.heroContent, title: e.target.value } })
                    }
                  />
                </label>

                <label className="ia-field">
                  <span>Hero Description</span>
                  <textarea
                    rows={3}
                    value={data.heroContent.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        heroContent: { ...data.heroContent, description: e.target.value },
                      })
                    }
                  />
                </label>

                <label className="ia-field">
                  <span>Primary Button Text</span>
                  <input
                    type="text"
                    value={data.heroContent.btn1}
                    onChange={(e) =>
                      setData({ ...data, heroContent: { ...data.heroContent, btn1: e.target.value } })
                    }
                  />
                </label>

                <button type="submit" className="ia-btn-primary">
                  Save Home Changes
                </button>
              </form>
            </div>
          )}

          {activeSection === "about" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>About</h1>
                <p>Update the Campus Spotlight &amp; About section content</p>
              </div>

              <form
                className="ia-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  persistData(data, "About content saved");
                }}
              >
                <label className="ia-field">
                  <span>Spotlight Heading</span>
                  <input
                    type="text"
                    value={data.aboutContent.hero?.title || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutContent: {
                          ...data.aboutContent,
                          hero: { ...data.aboutContent.hero, title: e.target.value },
                        },
                      })
                    }
                  />
                </label>

                <label className="ia-field">
                  <span>Overview Text</span>
                  <textarea
                    rows={4}
                    value={data.aboutContent.overview?.paragraphs?.[0] || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutContent: {
                          ...data.aboutContent,
                          overview: {
                            ...data.aboutContent.overview,
                            paragraphs: [e.target.value],
                          },
                        },
                      })
                    }
                  />
                </label>

                <button type="submit" className="ia-btn-primary">
                  Save About Changes
                </button>
              </form>
            </div>
          )}

          {activeSection === "academics" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Academics</h1>
                <p>Manage Undergraduate, Graduate, and Doctoral program cards</p>
              </div>

              <div className="ia-list">
                {data.academicsContent.programs.map((prog, idx) => (
                  <div key={prog.id} className="ia-list-card">
                    <div className="ia-field">
                      <span>Program Title ({prog.eyebrow})</span>
                      <input
                        type="text"
                        value={prog.title}
                        onChange={(e) => {
                          const updated = [...data.academicsContent.programs];
                          updated[idx] = { ...prog, title: e.target.value };
                          setData({ ...data, academicsContent: { programs: updated } });
                        }}
                      />
                    </div>
                    <div className="ia-field">
                      <span>Description</span>
                      <textarea
                        rows={2}
                        value={prog.desc}
                        onChange={(e) => {
                          const updated = [...data.academicsContent.programs];
                          updated[idx] = { ...prog, desc: e.target.value };
                          setData({ ...data, academicsContent: { programs: updated } });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="ia-btn-primary"
                onClick={() => persistData(data, "Academics saved")}
              >
                Save Academics
              </button>
            </div>
          )}

          {activeSection === "faculty" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Faculty</h1>
                <p>Add or remove faculty members</p>
              </div>

              <form className="ia-inline-form" onSubmit={handleAddFaculty}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Role / Title"
                  value={newFaculty.role}
                  onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Research Area"
                  value={newFaculty.area}
                  onChange={(e) => setNewFaculty({ ...newFaculty, area: e.target.value })}
                />
                <button type="submit" className="ia-btn-primary">
                  + Add
                </button>
              </form>

              <div className="ia-list">
                {data.faculty.map((f) => (
                  <div key={f.id} className="ia-list-row">
                    <div>
                      <strong>{f.name}</strong>
                      <div className="ia-muted">
                        {f.role} {f.area ? `· ${f.area}` : ""}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ia-btn-danger"
                      onClick={() => handleDeleteFaculty(f.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "newsEvents" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>News &amp; Events</h1>
                <p>Manage featured news stories and upcoming campus events</p>
              </div>

              <div className="ia-tabs">
                <button
                  type="button"
                  className={`ia-tab ${newsTab === "news" ? "is-active" : ""}`}
                  onClick={() => setNewsTab("news")}
                >
                  News ({data.news.length})
                </button>
                <button
                  type="button"
                  className={`ia-tab ${newsTab === "events" ? "is-active" : ""}`}
                  onClick={() => setNewsTab("events")}
                >
                  Events ({data.events.length})
                </button>
              </div>

              {newsTab === "news" ? (
                <>
                  <form className="ia-inline-form" onSubmit={handleAddNews}>
                    <input
                      type="text"
                      placeholder="Category (e.g. Campus)"
                      value={newNews.category}
                      onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="News Headline"
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    />
                    <button type="submit" className="ia-btn-primary">
                      + Add News
                    </button>
                  </form>
                  <div className="ia-list">
                    {data.news.map((n) => (
                      <div key={n.id} className="ia-list-row">
                        <div>
                          <span className="ia-tag">{n.category}</span>
                          <strong>{n.title}</strong>
                        </div>
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() =>
                            persistData(
                              { ...data, news: data.news.filter((item) => item.id !== n.id) },
                              "News removed"
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <form className="ia-inline-form" onSubmit={handleAddEvent}>
                    <input
                      type="text"
                      placeholder="Month (NOV)"
                      value={newEvent.month}
                      onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Day (18)"
                      value={newEvent.day}
                      onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Time & Venue"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    />
                    <button type="submit" className="ia-btn-primary">
                      + Add Event
                    </button>
                  </form>
                  <div className="ia-list">
                    {data.events.map((ev) => (
                      <div key={ev.id} className="ia-list-row">
                        <div>
                          <span className="ia-tag">
                            {ev.month} {ev.day}
                          </span>
                          <strong>{ev.title}</strong>
                          <div className="ia-muted">{ev.venue}</div>
                        </div>
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() =>
                            persistData(
                              { ...data, events: data.events.filter((item) => item.id !== ev.id) },
                              "Event removed"
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeSection === "settings" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Settings</h1>
                <p>Account profile, password security, and admin users</p>
              </div>

              <div className="ia-tabs">
                <button
                  type="button"
                  className={`ia-tab ${settingsTab === "profile" ? "is-active" : ""}`}
                  onClick={() => setSettingsTab("profile")}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className={`ia-tab ${settingsTab === "password" ? "is-active" : ""}`}
                  onClick={() => setSettingsTab("password")}
                >
                  Change Password
                </button>
                <button
                  type="button"
                  className={`ia-tab ${settingsTab === "users" ? "is-active" : ""}`}
                  onClick={() => setSettingsTab("users")}
                >
                  Users ({users.length})
                </button>
              </div>

              {settingsTab === "profile" && (
                <div className="ia-list-card">
                  <p>
                    <strong>Name:</strong> {displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser?.email || "vysakh@am.amrita.edu"}
                  </p>
                  <p>
                    <strong>Role:</strong> {roleLabel}
                  </p>
                </div>
              )}

              {settingsTab === "password" && (
                <form className="ia-form" onSubmit={handlePasswordChange}>
                  <label className="ia-field">
                    <span>Current Password</span>
                    <input
                      type="password"
                      value={pwForm.currentPw}
                      onChange={(e) => setPwForm({ ...pwForm, currentPw: e.target.value })}
                    />
                  </label>
                  <label className="ia-field">
                    <span>New Password</span>
                    <input
                      type="password"
                      value={pwForm.newPw}
                      onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                    />
                  </label>
                  <label className="ia-field">
                    <span>Confirm New Password</span>
                    <input
                      type="password"
                      value={pwForm.confirmPw}
                      onChange={(e) => setPwForm({ ...pwForm, confirmPw: e.target.value })}
                    />
                  </label>
                  <button type="submit" className="ia-btn-primary">
                    Update Password
                  </button>
                </form>
              )}

              {settingsTab === "users" && (
                <>
                  <form className="ia-inline-form" onSubmit={handleAddUser}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <button type="submit" className="ia-btn-primary">
                      + Add User
                    </button>
                  </form>
                  <div className="ia-list">
                    {users.map((u) => (
                      <div key={u.id} className="ia-list-row">
                        <div>
                          <strong>{u.name || u.email}</strong>
                          <div className="ia-muted">
                            {u.email} · {u.role}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const next = users.filter((item) => item.id !== u.id);
                            setUsers(next);
                            localStorage.setItem("cyberPanelUsers", JSON.stringify(next));
                            showToast("User removed");
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
