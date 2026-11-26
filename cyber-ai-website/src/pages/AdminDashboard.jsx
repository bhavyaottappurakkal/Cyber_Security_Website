import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { saveMediaFile, resolveMediaUrl, deleteMediaFile } from "../utils/mediaStore";
import { getActivityLog, recordActivity, clearActivityLog } from "../utils/activityLog";
import ProgramPageEditor from "../components/ProgramPageEditor";
import { DEFAULT_PROGRAM_PAGES, loadProgramPages } from "../data/programPagesData";
import { DEFAULT_CONTACT_CONTENT, normalizeContactContent } from "../data/contactData";
import "./AdminDashboard.css";

const DEFAULT_DATA = {
  heroContent: {
    eyebrow: "AMRITA VISHWA VIDYAPEETHAM",
    title: "Amrita Centre for Cybersecurity Systems and Networks",
    description:
      "Rigorous engineering, hands-on research and a campus that shapes character as much as careers.",
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
    sectionTitle: "Academics",
    sectionSubtitle:
      "Interdisciplinary degrees designed to inspire rigorous inquiry and creative leadership.",
    menuLinks: [
      { id: 1, label: "Undergraduate Programs", url: "/academics", targetId: "academics" },
      { id: 2, label: "Online Programme", url: "/academics/online-mca", targetId: "academics" },
      { id: 3, label: "Post Graduate Programme", url: "/academics/postgraduate", targetId: "academics" },
      { id: 4, label: "PhD Programme", url: "/academics/phd", targetId: "academics" },
    ],
    featured: {
      image: "/hero-students.jpg",
      mediaItems: [
        { id: 1, type: "image", src: "/hero-students.jpg" },
      ],
      heading: "Interdisciplinary Degrees",
      lead: "Rigorous academic programs built for emerging global challenges.",
      body: "Combining foundational theory with hands-on research laboratories and mentorship.",
      note: "Open for upcoming academic sessions across all degree levels.",
    },
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
  newsEventsMenu: {
    hidden: false,
    title: "News & Events",
    links: [
      { id: 1, label: "Featured News", url: "/news-events", targetId: "news", hidden: false },
      { id: 3, label: "Upcoming Events", url: "/news-events", targetId: "events", hidden: false },
      { id: 5, label: "Distinguished Lectures", url: "/news-events", targetId: "events", hidden: false },
    ],
    featured: {
      hidden: false,
      image: "/sample_headline.jpg",
      heading: "News & Events",
      lead: "Stay updated with featured stories, symposiums, and campus events.",
      body: "Highlighting collaborative research breakthroughs, lectures, and upcoming gatherings.",
      note: "Read the latest announcements and view upcoming event dates.",
      targetId: "news",
    },
  },
  facultyMenu: {
    hidden: false,
    title: "Our Team",
    links: [
      { id: 1, label: "Faculty Leaders", url: "/faculty", targetId: "faculty", hidden: false },
    ],
    featured: {
      hidden: false,
      image: "/hero-students.jpg",
      mediaItems: [{ id: 1, type: "image", src: "/hero-students.jpg" }],
      heading: "Leaders in Their Fields",
      lead: "1,400+ faculty & researchers driving discovery across 20+ centers.",
      body: "Empowering students and scholars to tackle defining global challenges.",
      note: "Discover faculty profiles and research impact.",
      targetId: "faculty",
    },
  },
  programPages: DEFAULT_PROGRAM_PAGES,
  contactContent: DEFAULT_CONTACT_CONTENT,
};

function loadSiteData() {
  try {
    const raw = localStorage.getItem("adminSiteData");
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_DATA,
      ...parsed,
      programPages: loadProgramPages(),
      contactContent: normalizeContactContent(parsed.contactContent),
      heroContent:
        parsed.heroContent?.title === "Research That Moves the World Forward"
          ? DEFAULT_DATA.heroContent
          : { ...DEFAULT_DATA.heroContent, ...(parsed.heroContent || {}) },
      aboutContent: { ...DEFAULT_DATA.aboutContent, ...(parsed.aboutContent || {}) },
      academicsContent: {
        ...DEFAULT_DATA.academicsContent,
        ...(parsed.academicsContent || {}),
        featured: {
          ...DEFAULT_DATA.academicsContent.featured,
          ...(parsed.academicsContent?.featured || {}),
          mediaItems: parsed.academicsContent?.featured?.mediaItems?.length
            ? parsed.academicsContent.featured.mediaItems
            : [
                {
                  id: 1,
                  type: "image",
                  src: parsed.academicsContent?.featured?.image || "/hero-students.jpg",
                },
              ],
        },
        menuLinks: parsed.academicsContent?.menuLinks?.length
          ? parsed.academicsContent.menuLinks
          : DEFAULT_DATA.academicsContent.menuLinks,
        programs: parsed.academicsContent?.programs?.length
          ? parsed.academicsContent.programs
          : DEFAULT_DATA.academicsContent.programs,
      },
      faculty: parsed.faculty?.length ? parsed.faculty : DEFAULT_DATA.faculty,
      news: parsed.news?.length ? parsed.news : DEFAULT_DATA.news,
      events: parsed.events?.length ? parsed.events : DEFAULT_DATA.events,
      newsEventsMenu: {
        ...DEFAULT_DATA.newsEventsMenu,
        ...(parsed.newsEventsMenu || {}),
        links: Array.isArray(parsed.newsEventsMenu?.links)
          ? parsed.newsEventsMenu.links
          : DEFAULT_DATA.newsEventsMenu.links,
        featured: {
          ...DEFAULT_DATA.newsEventsMenu.featured,
          ...(parsed.newsEventsMenu?.featured || {}),
        },
      },
      facultyMenu: {
        ...DEFAULT_DATA.facultyMenu,
        ...(parsed.facultyMenu || {}),
        links: Array.isArray(parsed.facultyMenu?.links)
          ? parsed.facultyMenu.links
          : DEFAULT_DATA.facultyMenu.links,
        featured: {
          ...DEFAULT_DATA.facultyMenu.featured,
          ...(parsed.facultyMenu?.featured || {}),
          mediaItems: parsed.facultyMenu?.featured?.mediaItems?.length
            ? parsed.facultyMenu.featured.mediaItems
            : [
                {
                  id: 1,
                  type: "image",
                  src: parsed.facultyMenu?.featured?.image || "/hero-students.jpg",
                },
              ],
        },
      },
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
    case "internships":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 12h20" />
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
    case "contact":
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "activity":
      return (
        <svg {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    default:
      return null;
  }
}

const SIDEBAR_ITEMS = [
  { key: "overview", label: "Dashboard", icon: "dashboard" },
  { key: "home", label: "Home", icon: "home" },
  { key: "about", label: "Who We Are", icon: "about" },
  { key: "academics", label: "Academics", icon: "academics" },
  { key: "internships", label: "Internships", icon: "internships" },
  { key: "faculty", label: "Our Team", icon: "faculty" },
  { key: "newsEvents", label: "News & Events", icon: "newsEvents" },
  { key: "contact", label: "Contact Us", icon: "contact" },
  { key: "activity", label: "Activity Log", icon: "activity", adminOnly: true },
  { key: "settings", label: "Settings", icon: "settings", isBottom: true },
];

const QUICK_CARDS = [
  { key: "home", label: "Home", icon: "dashboard", highlighted: true },
  { key: "about", label: "Who We Are", icon: "about" },
  { key: "academics", label: "Academics", icon: "academics" },
  { key: "internships", label: "Internships", icon: "internships" },
  { key: "faculty", label: "Our Team", icon: "faculty" },
  { key: "newsEvents", label: "News & Events", icon: "newsEvents" },
  { key: "contact", label: "Contact Us", icon: "contact" },
];

function MediaThumb({ type, src, alt }) {
  const [resolved, setResolved] = useState(() => (src?.startsWith("idb://") ? "" : src));

  useEffect(() => {
    let active = true;
    resolveMediaUrl(src).then((url) => {
      if (active) setResolved(url);
    });
    return () => {
      active = false;
    };
  }, [src]);

  if (!resolved) return null;
  if (type === "video") {
    return <video src={resolved} className="ia-media-thumb" muted playsInline />;
  }
  return <img src={resolved} alt={alt} className="ia-media-thumb" />;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [data, setData] = useState(loadSiteData);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const [newsTab, setNewsTab] = useState("news");
  const [academicsSubTab, setAcademicsSubTab] = useState("overview");
  const [newAcadLink, setNewAcadLink] = useState({ label: "", url: "" });
  const [newMedia, setNewMedia] = useState({ type: "image", src: "" });
  const [newFacultyMedia, setNewFacultyMedia] = useState({ type: "image", src: "" });
  const [newProgram, setNewProgram] = useState({ eyebrow: "", title: "", desc: "", image: "" });
  const [settingsTab, setSettingsTab] = useState("profile");
  const [users, setUsers] = useState(getStoredUsers);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "content_editor" });
  const [resetPwMap, setResetPwMap] = useState({});
  const [activities, setActivities] = useState(getActivityLog);
  const [activityFilterUser, setActivityFilterUser] = useState("all");
  const [activitySearch, setActivitySearch] = useState("");
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

  useEffect(() => {
    const syncActivity = () => setActivities(getActivityLog());
    window.addEventListener("cyberPanelActivityUpdated", syncActivity);
    window.addEventListener("storage", syncActivity);
    return () => {
      window.removeEventListener("cyberPanelActivityUpdated", syncActivity);
      window.removeEventListener("storage", syncActivity);
    };
  }, []);

  const isAdmin = !currentUser?.role || currentUser.role === "admin";

  const getCurrentSectionLabel = () => {
    if (activeSection === "academics") {
      const subMap = {
        overview: "Academics · Home Overview",
        ug: "Academics · Undergraduate Page",
        pg: "Academics · Postgraduate Page",
        online: "Academics · Online MCA Page",
        phd: "Academics · Ph.D. Page",
        internships: "Academics · Internships Page",
      };
      return subMap[academicsSubTab] || "Academics";
    }
    const map = {
      overview: "Dashboard",
      home: "Home Page",
      about: "Who We Are",
      internships: "Internships Page",
      faculty: "Our Team",
      newsEvents: "News & Events",
      contact: "Contact Us",
      settings: "Settings",
      activity: "Activity Log",
    };
    return map[activeSection] || activeSection;
  };

  const logAction = (action, sectionOverride) => {
    const next = recordActivity({
      user: currentUser?.name || "Admin",
      email: currentUser?.email || "vysakh@am.amrita.edu",
      role: currentUser?.role || "admin",
      section: sectionOverride || getCurrentSectionLabel(),
      action,
    });
    setActivities(next);
  };

  const showToast = (msg, type = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const persistData = (nextData, msg = "Changes saved successfully!", sectionOverride) => {
    try {
      localStorage.setItem("adminSiteData", JSON.stringify(nextData));
      setData(nextData);
      window.dispatchEvent(new Event("adminSiteDataUpdated"));
      logAction(msg, sectionOverride);
      showToast(msg, "success");
    } catch {
      showToast("Storage limit reached. Try using a video URL or smaller file.", "error");
    }
  };

  const handleAcademicsImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    if (isVideo && file.size > 10 * 1024 * 1024) {
      showToast("Video size must be below 10 MB.", "error");
      e.target.value = "";
      return;
    }
    try {
      const idbKey = await saveMediaFile(file);
      const nextItems = [
        ...(data.academicsContent.featured?.mediaItems || []),
        { id: Date.now(), type: isVideo ? "video" : "image", src: idbKey, name: file.name },
      ];
      const nextData = {
        ...data,
        academicsContent: {
          ...data.academicsContent,
          featured: {
            ...data.academicsContent.featured,
            mediaItems: nextItems,
          },
        },
      };
      persistData(nextData, `${isVideo ? "Video" : "Image"} "${file.name}" uploaded and saved!`);
    } catch {
      showToast("Could not store media file in browser storage.", "error");
    }
    e.target.value = "";
  };

  const handleFacultyMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    if (isVideo && file.size > 10 * 1024 * 1024) {
      showToast("Video size must be below 10 MB.", "error");
      e.target.value = "";
      return;
    }
    try {
      const idbKey = await saveMediaFile(file);
      const nextItems = [
        ...(data.facultyMenu?.featured?.mediaItems || []),
        { id: Date.now(), type: isVideo ? "video" : "image", src: idbKey, name: file.name },
      ];
      const nextData = {
        ...data,
        facultyMenu: {
          ...data.facultyMenu,
          featured: {
            ...data.facultyMenu.featured,
            image: isVideo ? data.facultyMenu.featured?.image || "" : idbKey,
            mediaItems: nextItems,
          },
        },
      };
      persistData(
        nextData,
        `Our Team Spotlight ${isVideo ? "Video" : "Image"} "${file.name}" uploaded and saved!`
      );
    } catch {
      showToast("Could not store media file in browser storage.", "error");
    }
    e.target.value = "";
  };

  const handleProgramImageUpload = async (e, idx = null) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const idbKey = await saveMediaFile(file);
      if (idx === null) {
        setNewProgram((prev) => ({ ...prev, image: idbKey }));
        showToast(`Image "${file.name}" attached to new card`, "success");
      } else {
        const updated = [...data.academicsContent.programs];
        const prevImg = updated[idx].image;
        if (prevImg) deleteMediaFile(prevImg);
        updated[idx] = { ...updated[idx], image: idbKey };
        persistData(
          { ...data, academicsContent: { ...data.academicsContent, programs: updated } },
          "Card image updated and saved!"
        );
      }
    } catch {
      showToast("Could not store image file.", "error");
    }
    e.target.value = "";
  };

  const handleLogout = () => {
    logAction("Signed out of Admin Portal", "Authentication");
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
    if (pwForm.newPw.length < 6 || pwForm.newPw !== pwForm.confirmPw) {
      showToast("New passwords must match (min 6 chars)", "error");
      return;
    }
    // Built-in admin password update
    if (!currentUser?.id || currentUser.id === "builtin-admin") {
      const stored = localStorage.getItem("adminPassword") || "Cyber@Secure#2026";
      if (pwForm.currentPw !== stored) {
        showToast("Current password is incorrect", "error");
        return;
      }
      localStorage.setItem("adminPassword", pwForm.newPw);
      setPwForm({ currentPw: "", newPw: "", confirmPw: "" });
      logAction("Updated own account password", "Settings · Security");
      showToast("Password updated successfully!", "success");
      return;
    }
    // Sub-user (Content Editor / Event Editor / Added Admin) password update
    const allUsers = getStoredUsers();
    const idx = allUsers.findIndex((u) => u.id === currentUser.id);
    if (idx === -1 || allUsers[idx].password !== pwForm.currentPw) {
      showToast("Current password is incorrect", "error");
      return;
    }
    const nextUsers = [...allUsers];
    nextUsers[idx] = { ...nextUsers[idx], password: pwForm.newPw };
    setUsers(nextUsers);
    localStorage.setItem("cyberPanelUsers", JSON.stringify(nextUsers));
    setPwForm({ currentPw: "", newPw: "", confirmPw: "" });
    logAction("Updated own account password", "Settings · Security");
    showToast("Password updated successfully!", "success");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const trimmedEmail = newUser.email.trim().toLowerCase();
    if (!trimmedEmail || !newUser.password.trim()) {
      showToast("Email and password are required", "error");
      return;
    }
    if (newUser.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (
      trimmedEmail === "vysakh@am.amrita.edu" ||
      users.some((u) => (u.email || "").trim().toLowerCase() === trimmedEmail)
    ) {
      showToast("A user with this email already exists", "error");
      return;
    }
    const created = {
      id: Date.now(),
      name: newUser.name.trim() || trimmedEmail.split("@")[0],
      email: trimmedEmail,
      password: newUser.password,
      role: newUser.role || "content_editor",
      active: true,
      createdAt: new Date().toISOString(),
    };
    const nextUsers = [...users, created];
    setUsers(nextUsers);
    localStorage.setItem("cyberPanelUsers", JSON.stringify(nextUsers));
    setNewUser({ name: "", email: "", password: "", role: "content_editor" });
    logAction(
      `Added new user "${created.name}" (${created.email}) as ${created.role}`,
      "Settings · User Management"
    );
    showToast(`User "${created.name}" added!`);
  };

  const handleUpdateUserPassword = (userId) => {
    const nextPw = (resetPwMap[userId] || "").trim();
    if (nextPw.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    const target = users.find((u) => u.id === userId);
    const nextUsers = users.map((u) =>
      u.id === userId ? { ...u, password: nextPw } : u
    );
    setUsers(nextUsers);
    localStorage.setItem("cyberPanelUsers", JSON.stringify(nextUsers));
    setResetPwMap((prev) => ({ ...prev, [userId]: "" }));
    logAction(
      `Reset password for "${target?.name || target?.email}"`,
      "Settings · User Management"
    );
    showToast(`Password updated for ${target?.name || target?.email}`);
  };

  const handleToggleUserActive = (userId) => {
    const target = users.find((u) => u.id === userId);
    const nextActive = target?.active === false;
    const nextUsers = users.map((u) =>
      u.id === userId ? { ...u, active: nextActive } : u
    );
    setUsers(nextUsers);
    localStorage.setItem("cyberPanelUsers", JSON.stringify(nextUsers));
    logAction(
      `${nextActive ? "Activated" : "Disabled"} user "${target?.name || target?.email}"`,
      "Settings · User Management"
    );
    showToast(`User ${nextActive ? "activated" : "disabled"}`);
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
            {SIDEBAR_ITEMS.filter((item) => !item.adminOnly || isAdmin).map((item) => (
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

              <div className="ia-cms-section" style={{ marginTop: "24px" }}>
                <div className="ia-cms-section-head">
                  <h3>Home Page Sections (Hide / Show / Edit / Add / Delete)</h3>
                </div>

                <div className="ia-list" style={{ marginBottom: "16px" }}>
                  {[
                    { key: "hero", label: "Hero Banner" },
                    { key: "welcome", label: "Welcome & Introduction" },
                    { key: "onlineMca", label: "Amrita Online MCA Spotlight" },
                    { key: "academics", label: "Academics Overview Grid" },
                    { key: "research", label: "Research Focus Areas" },
                    { key: "inside", label: "Inside the Center (Partners, Placements, Publications)" },
                  ].map((sec) => {
                    const isHidden = data.homeSectionVisibility?.[sec.key] === false;
                    return (
                      <div key={sec.key} className="ia-list-row" style={{ justifyContent: "space-between", opacity: isHidden ? 0.6 : 1 }}>
                        <span>
                          <strong>{sec.label}</strong> {isHidden ? "(Hidden)" : ""}
                        </span>
                        <button
                          type="button"
                          className="ia-btn-secondary"
                          onClick={() => {
                            const updated = {
                              ...data,
                              homeSectionVisibility: {
                                ...(data.homeSectionVisibility || {}),
                                [sec.key]: isHidden,
                              },
                            };
                            persistData(updated, `${sec.label} ${isHidden ? "shown" : "hidden"} on Home page`);
                          }}
                        >
                          {isHidden ? "Show Section" : "Hide Section"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Home Sections */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "14px" }}>
                  {(data.homeCustomSections || []).map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="ia-cms-band"
                      style={sec.hidden ? { opacity: 0.6, borderStyle: "dashed" } : undefined}
                    >
                      <div className="ia-cms-band-head">
                        <input
                          type="text"
                          className="ia-cms-band-title-input"
                          placeholder="Section Title"
                          value={sec.title}
                          onChange={(e) => {
                            const next = [...(data.homeCustomSections || [])];
                            next[idx] = { ...sec, title: e.target.value };
                            setData({ ...data, homeCustomSections: next });
                          }}
                        />
                        <div className="ia-cms-actions">
                          <button
                            type="button"
                            className="ia-btn-secondary"
                            onClick={() => {
                              const next = [...(data.homeCustomSections || [])];
                              next[idx] = { ...sec, hidden: !sec.hidden };
                              setData({ ...data, homeCustomSections: next });
                            }}
                          >
                            {sec.hidden ? "Show" : "Hide"}
                          </button>
                          <button
                            type="button"
                            className="ia-btn-danger"
                            onClick={() => {
                              const next = (data.homeCustomSections || []).filter((s) => s.id !== sec.id);
                              persistData({ ...data, homeCustomSections: next }, "Home section deleted");
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        className="ia-cms-textarea"
                        placeholder="Section description..."
                        value={sec.body || ""}
                        onChange={(e) => {
                          const next = [...(data.homeCustomSections || [])];
                          next[idx] = { ...sec, body: e.target.value };
                          setData({ ...data, homeCustomSections: next });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    onClick={() => {
                      const next = [
                        ...(data.homeCustomSections || []),
                        { id: `hsec-${Date.now()}`, title: "New Home Section", body: "Enter section content here.", hidden: false },
                      ];
                      setData({ ...data, homeCustomSections: next });
                    }}
                  >
                    + Add Custom Home Section
                  </button>
                  <button
                    type="button"
                    className="ia-btn-primary"
                    onClick={() => persistData(data, "Home sections saved!")}
                  >
                    Save Home Sections
                  </button>
                </div>
              </div>

              <div className="ia-list-card" style={{ marginTop: "20px", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div>
                  <strong>Home — Academics Section &amp; Cards</strong>
                  <div className="ia-muted">Edit the Home page Academics heading, subtitle, cards, and card images</div>
                </div>
                <button
                  type="button"
                  className="ia-btn-primary"
                  onClick={() => setActiveSection("academics")}
                >
                  Edit Section &amp; Cards →
                </button>
              </div>
            </div>
          )}

          {activeSection === "about" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Who We Are</h1>
                <p>Update the Campus Spotlight &amp; Who We Are section content</p>
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
                <p>Full edit access for Home Academics spotlight and Undergraduate, Postgraduate, Online MCA &amp; Ph.D. pages</p>
              </div>

              <div className="ia-tabs" style={{ marginBottom: "20px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "overview" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("overview")}
                >
                  Home Academics
                </button>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "ug" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("ug")}
                >
                  Undergraduate
                </button>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "pg" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("pg")}
                >
                  Postgraduate
                </button>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "online" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("online")}
                >
                  Online MCA
                </button>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "phd" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("phd")}
                >
                  Ph.D.
                </button>
                <button
                  type="button"
                  className={`ia-tab ${academicsSubTab === "internships" ? "is-active" : ""}`}
                  onClick={() => setAcademicsSubTab("internships")}
                >
                  Internships
                </button>
              </div>

              {academicsSubTab === "overview" && (
              <>
              <div className="ia-form">
                  <div className="ia-field">
                    <span>Spotlight Slideshow — Images &amp; Videos (plays continuously)</span>
                    <div className="ia-list" style={{ marginBottom: "10px" }}>
                      {(data.academicsContent.featured?.mediaItems || []).map((item, idx) => (
                        <div key={item.id} className="ia-list-row">
                          <div className="ia-media-thumb-wrap">
                            <MediaThumb type={item.type} src={item.src} alt={`Slide ${idx + 1}`} />
                          </div>
                          <span className="ia-tag">{item.type === "video" ? "VIDEO" : "IMAGE"}</span>
                          <input
                            type="text"
                            style={{ flex: 1 }}
                            value={item.name || item.src}
                            readOnly={item.src?.startsWith("idb://")}
                            onChange={(e) => {
                              const updated = [...data.academicsContent.featured.mediaItems];
                              updated[idx] = { ...item, src: e.target.value };
                              setData({
                                ...data,
                                academicsContent: {
                                  ...data.academicsContent,
                                  featured: { ...data.academicsContent.featured, mediaItems: updated },
                                },
                              });
                            }}
                          />
                          <button
                            type="button"
                            className="ia-btn-danger"
                            onClick={() => {
                              deleteMediaFile(item.src);
                              const updated = data.academicsContent.featured.mediaItems.filter(
                                (m) => m.id !== item.id
                              );
                              persistData(
                                {
                                  ...data,
                                  academicsContent: {
                                    ...data.academicsContent,
                                    featured: { ...data.academicsContent.featured, mediaItems: updated },
                                  },
                                },
                                "Media item removed from slideshow"
                              );
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="ia-inline-form" style={{ marginBottom: "8px" }}>
                      <select
                        className="ia-select"
                        value={newMedia.type}
                        onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                      <input
                        type="text"
                        placeholder={
                          newMedia.type === "video"
                            ? "Video URL (e.g. /promo.mp4 or https://.../video.mp4)"
                            : "Image URL (e.g. /sample_hero_img.jpg)"
                        }
                        value={newMedia.src}
                        onChange={(e) => setNewMedia({ ...newMedia, src: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ia-btn-primary"
                        onClick={() => {
                          if (!newMedia.src.trim()) return;
                          const nextItems = [
                            ...(data.academicsContent.featured?.mediaItems || []),
                            { id: Date.now(), type: newMedia.type, src: newMedia.src.trim() },
                          ];
                          persistData(
                            {
                              ...data,
                              academicsContent: {
                                ...data.academicsContent,
                                featured: {
                                  ...data.academicsContent.featured,
                                  mediaItems: nextItems,
                                },
                              },
                            },
                            `${newMedia.type === "video" ? "Video" : "Image"} added to slideshow!`
                          );
                          setNewMedia({ ...newMedia, src: "" });
                        }}
                      >
                        + Add {newMedia.type === "video" ? "Video" : "Image"}
                      </button>
                    </div>

                    <label className="ia-upload-btn">
                      Upload Image or Video File (Video &lt; 10 MB)
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleAcademicsImageUpload}
                        hidden
                      />
                    </label>
                  </div>

                  <label className="ia-field">
                    <span>Spotlight Heading</span>
                    <input
                      type="text"
                      value={data.academicsContent.featured?.heading || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          academicsContent: {
                            ...data.academicsContent,
                            featured: {
                              ...data.academicsContent.featured,
                              heading: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Bold Lead Text</span>
                    <input
                      type="text"
                      value={data.academicsContent.featured?.lead || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          academicsContent: {
                            ...data.academicsContent,
                            featured: {
                              ...data.academicsContent.featured,
                              lead: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Description Text</span>
                    <textarea
                      rows={2}
                      value={data.academicsContent.featured?.body || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          academicsContent: {
                            ...data.academicsContent,
                            featured: {
                              ...data.academicsContent.featured,
                              body: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Footer Note (Italic)</span>
                    <input
                      type="text"
                      value={data.academicsContent.featured?.note || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          academicsContent: {
                            ...data.academicsContent,
                            featured: {
                              ...data.academicsContent.featured,
                              note: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </label>

                  <div className="ia-field">
                    <span>Academics Menu Links</span>
                    <div className="ia-list">
                      {(data.academicsContent.menuLinks || []).map((lnk, idx) => (
                        <div key={lnk.id} className="ia-list-row">
                          <input
                            type="text"
                            style={{ flex: 1 }}
                            placeholder="Link label"
                            value={lnk.label}
                            onChange={(e) => {
                              const updated = [...data.academicsContent.menuLinks];
                              updated[idx] = { ...lnk, label: e.target.value };
                              setData({
                                ...data,
                                academicsContent: { ...data.academicsContent, menuLinks: updated },
                              });
                            }}
                          />
                          <input
                            type="text"
                            style={{ flex: 0.8 }}
                            placeholder="Section or URL (optional)"
                            value={lnk.url || ""}
                            onChange={(e) => {
                              const updated = [...data.academicsContent.menuLinks];
                              updated[idx] = { ...lnk, url: e.target.value };
                              setData({
                                ...data,
                                academicsContent: { ...data.academicsContent, menuLinks: updated },
                              });
                            }}
                          />
                          <button
                            type="button"
                            className="ia-btn-danger"
                            onClick={() => {
                              const updated = data.academicsContent.menuLinks.filter(
                                (item) => item.id !== lnk.id
                              );
                              persistData(
                                {
                                  ...data,
                                  academicsContent: { ...data.academicsContent, menuLinks: updated },
                                },
                                "Menu link removed and saved!"
                              );
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="ia-inline-form" style={{ marginBottom: 0 }}>
                      <input
                        type="text"
                        placeholder="New menu link label (e.g. Certificate Courses)"
                        value={newAcadLink.label}
                        onChange={(e) => setNewAcadLink({ ...newAcadLink, label: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="URL or path (optional, e.g. /academics)"
                        value={newAcadLink.url}
                        onChange={(e) => setNewAcadLink({ ...newAcadLink, url: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ia-btn-primary"
                        onClick={() => {
                          if (!newAcadLink.label.trim()) return;
                          const updated = [
                            ...(data.academicsContent.menuLinks || []),
                            {
                              id: Date.now(),
                              label: newAcadLink.label.trim(),
                              targetId: "academics",
                              url: newAcadLink.url.trim(),
                            },
                          ];
                          persistData(
                            {
                              ...data,
                              academicsContent: { ...data.academicsContent, menuLinks: updated },
                            },
                            "Academics menu link added and saved!"
                          );
                          setNewAcadLink({ label: "", url: "" });
                        }}
                      >
                        + Add Link
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ia-btn-primary"
                    onClick={() => persistData(data, "Academics menu & spotlight saved successfully!")}
                  >
                    Save Academics Changes
                  </button>
                </div>

              {/* Academics Page Section & Cards (Add / Edit / Delete + Image) */}
              <div className="ia-form" style={{ marginTop: "24px" }}>
                <div className="ia-page-head" style={{ marginBottom: "8px" }}>
                  <h2 style={{ fontSize: "1.2rem", margin: "0 0 4px" }}>Home — Academics Page Section &amp; Cards</h2>
                  <p>Edit the Home page Academics section title, subtitle, and add, edit, or delete cards with optional images</p>
                </div>

                <label className="ia-field">
                  <span>Section Heading</span>
                  <input
                    type="text"
                    value={data.academicsContent.sectionTitle || "Academics"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        academicsContent: {
                          ...data.academicsContent,
                          sectionTitle: e.target.value,
                        },
                      })
                    }
                  />
                </label>

                <label className="ia-field">
                  <span>Section Subtitle</span>
                  <input
                    type="text"
                    value={data.academicsContent.sectionSubtitle || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        academicsContent: {
                          ...data.academicsContent,
                          sectionSubtitle: e.target.value,
                        },
                      })
                    }
                  />
                </label>

                <div className="ia-field">
                  <span>Add New Academic Card</span>
                  <div className="ia-inline-form" style={{ marginBottom: "8px" }}>
                    <input
                      type="text"
                      placeholder="Category (e.g. Undergraduate)"
                      value={newProgram.eyebrow}
                      onChange={(e) => setNewProgram({ ...newProgram, eyebrow: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Card Title"
                      value={newProgram.title}
                      onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={newProgram.desc}
                      onChange={(e) => setNewProgram({ ...newProgram, desc: e.target.value })}
                    />
                  </div>
                  <div className="ia-inline-form" style={{ marginBottom: 0 }}>
                    <input
                      type="text"
                      placeholder="Image URL (optional, e.g. /hero-students.jpg)"
                      value={newProgram.image}
                      onChange={(e) => setNewProgram({ ...newProgram, image: e.target.value })}
                    />
                    <label className="ia-upload-btn">
                      Upload Card Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProgramImageUpload(e, null)}
                        hidden
                      />
                    </label>
                    <button
                      type="button"
                      className="ia-btn-primary"
                      onClick={() => {
                        if (!newProgram.title.trim()) return;
                        const updated = [
                          ...data.academicsContent.programs,
                          {
                            id: Date.now(),
                            eyebrow: newProgram.eyebrow.trim() || "Program",
                            title: newProgram.title.trim(),
                            desc: newProgram.desc.trim(),
                            image: newProgram.image.trim(),
                          },
                        ];
                        persistData(
                          {
                            ...data,
                            academicsContent: { ...data.academicsContent, programs: updated },
                          },
                          "Academic card added and saved!"
                        );
                        setNewProgram({ eyebrow: "", title: "", desc: "", image: "" });
                      }}
                    >
                      + Add Card
                    </button>
                  </div>
                </div>

                <div className="ia-list" style={{ marginBottom: "8px" }}>
                  {data.academicsContent.programs.map((prog, idx) => (
                    <div key={prog.id} className="ia-list-card">
                      <div className="ia-list-row" style={{ border: "none", padding: 0 }}>
                        <span className="ia-tag">{prog.eyebrow}</span>
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            if (prog.image) deleteMediaFile(prog.image);
                            const updated = data.academicsContent.programs.filter(
                              (p) => p.id !== prog.id
                            );
                            persistData(
                              {
                                ...data,
                                academicsContent: { ...data.academicsContent, programs: updated },
                              },
                              "Academic card deleted and saved!"
                            );
                          }}
                        >
                          Delete
                        </button>
                      </div>

                      <div className="ia-field">
                        <span>Card Image (URL or Upload)</span>
                        <div className="ia-img-edit-row">
                          {prog.image && (
                            <div className="ia-media-thumb-wrap">
                              <MediaThumb type="image" src={prog.image} alt={prog.title} />
                            </div>
                          )}
                          <div className="ia-img-inputs">
                            <input
                              type="text"
                              placeholder="Image URL (optional)"
                              value={prog.image || ""}
                              readOnly={prog.image?.startsWith("idb://")}
                              onChange={(e) => {
                                const updated = [...data.academicsContent.programs];
                                updated[idx] = { ...prog, image: e.target.value };
                                setData({
                                  ...data,
                                  academicsContent: { ...data.academicsContent, programs: updated },
                                });
                              }}
                            />
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                              <label className="ia-upload-btn">
                                Upload Image
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleProgramImageUpload(e, idx)}
                                  hidden
                                />
                              </label>
                              {prog.image && (
                                <button
                                  type="button"
                                  className="ia-btn-danger"
                                  onClick={() => {
                                    deleteMediaFile(prog.image);
                                    const updated = [...data.academicsContent.programs];
                                    updated[idx] = { ...prog, image: "" };
                                    persistData(
                                      {
                                        ...data,
                                        academicsContent: { ...data.academicsContent, programs: updated },
                                      },
                                      "Card image removed"
                                    );
                                  }}
                                >
                                  Remove Image
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ia-field">
                        <span>Category / Eyebrow</span>
                        <input
                          type="text"
                          value={prog.eyebrow}
                          onChange={(e) => {
                            const updated = [...data.academicsContent.programs];
                            updated[idx] = { ...prog, eyebrow: e.target.value };
                            setData({
                              ...data,
                              academicsContent: { ...data.academicsContent, programs: updated },
                            });
                          }}
                        />
                      </div>

                      <div className="ia-field">
                        <span>Title</span>
                        <input
                          type="text"
                          value={prog.title}
                          onChange={(e) => {
                            const updated = [...data.academicsContent.programs];
                            updated[idx] = { ...prog, title: e.target.value };
                            setData({
                              ...data,
                              academicsContent: { ...data.academicsContent, programs: updated },
                            });
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
                            setData({
                              ...data,
                              academicsContent: { ...data.academicsContent, programs: updated },
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ia-btn-primary"
                  onClick={() => persistData(data, "Academics section & cards saved successfully!")}
                >
                  Save Academics Section
                </button>
              </div>
              </>
              )}

              {academicsSubTab !== "overview" && (
                <ProgramPageEditor
                  programKey={academicsSubTab}
                  page={data.programPages?.[academicsSubTab]}
                  showToast={showToast}
                  onChangePage={(updatedPage) =>
                    setData({
                      ...data,
                      programPages: {
                        ...data.programPages,
                        [academicsSubTab]: updatedPage,
                      },
                    })
                  }
                  onSavePage={(updatedPage, msg) =>
                    persistData(
                      {
                        ...data,
                        programPages: {
                          ...data.programPages,
                          [academicsSubTab]: updatedPage,
                        },
                      },
                      msg
                    )
                  }
                  onResetPage={() =>
                    persistData(
                      {
                        ...data,
                        programPages: {
                          ...data.programPages,
                          [academicsSubTab]: DEFAULT_PROGRAM_PAGES[academicsSubTab],
                        },
                      },
                      "Page reset to default content!"
                    )
                  }
                />
              )}
            </div>
          )}

          {activeSection === "internships" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Internships Page</h1>
                <p>Full admin access to edit, add, delete, swap, and upload/change images across the Internships page</p>
              </div>
              <ProgramPageEditor
                programKey="internships"
                page={data.programPages?.internships || DEFAULT_PROGRAM_PAGES.internships}
                showToast={showToast}
                onChangePage={(updatedPage) =>
                  setData({
                    ...data,
                    programPages: {
                      ...data.programPages,
                      internships: updatedPage,
                    },
                  })
                }
                onSavePage={(updatedPage, msg) =>
                  persistData(
                    {
                      ...data,
                      programPages: {
                        ...data.programPages,
                        internships: updatedPage,
                      },
                    },
                    msg
                  )
                }
                onResetPage={() =>
                  persistData(
                    {
                      ...data,
                      programPages: {
                        ...data.programPages,
                        internships: DEFAULT_PROGRAM_PAGES.internships,
                      },
                    },
                    "Internships page reset to default content!"
                  )
                }
              />
            </div>
          )}

          {activeSection === "faculty" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Our Team</h1>
                <p>Add or remove team &amp; faculty members</p>
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

              {/* Our Team Mega Menu Editor (Edit / Delete / Swap / Hide / Add / Image) */}
              <div className="ia-form" style={{ marginTop: "28px" }}>
                <div className="ia-cms-section">
                  <div className="ia-cms-section-head">
                    <h3>
                      Our Team Dropdown Mega Menu{" "}
                      {data.facultyMenu?.hidden && (
                        <span style={{ fontSize: "0.72rem", color: "#b91c1c", marginLeft: "6px" }}>(HIDDEN)</span>
                      )}
                    </h3>
                    <div className="ia-cms-actions">
                      <button
                        type="button"
                        className="ia-btn-secondary"
                        onClick={() =>
                          setData({
                            ...data,
                            facultyMenu: {
                              ...data.facultyMenu,
                              hidden: !data.facultyMenu?.hidden,
                            },
                          })
                        }
                      >
                        {data.facultyMenu?.hidden ? "Show Menu" : "Hide Menu"}
                      </button>
                      <button
                        type="button"
                        className="ia-btn-secondary"
                        onClick={() => {
                          if (window.confirm("Reset Our Team Mega Menu to defaults?")) {
                            persistData(
                              { ...data, facultyMenu: DEFAULT_DATA.facultyMenu },
                              "Our Team Mega Menu reset to defaults!"
                            );
                          }
                        }}
                      >
                        Reset Default
                      </button>
                    </div>
                  </div>

                  <label className="ia-field">
                    <span>Menu Heading</span>
                    <input
                      type="text"
                      value={data.facultyMenu?.title || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          facultyMenu: { ...data.facultyMenu, title: e.target.value },
                        })
                      }
                    />
                  </label>

                  <div className="ia-field">
                    <span>Menu Links (Add / Edit / Swap / Hide / Delete)</span>
                    <div className="ia-list" style={{ marginBottom: "10px" }}>
                      {(data.facultyMenu?.links || []).map((lnk, idx) => {
                        const links = data.facultyMenu.links;
                        const updateLink = (patch) => {
                          const next = [...links];
                          next[idx] = { ...lnk, ...patch };
                          setData({
                            ...data,
                            facultyMenu: { ...data.facultyMenu, links: next },
                          });
                        };
                        const swapLinks = (a, b) => {
                          if (b < 0 || b >= links.length) return;
                          const next = [...links];
                          [next[a], next[b]] = [next[b], next[a]];
                          setData({
                            ...data,
                            facultyMenu: { ...data.facultyMenu, links: next },
                          });
                        };
                        return (
                          <div
                            key={lnk.id || idx}
                            className="ia-list-row"
                            style={{ flexWrap: "wrap", opacity: lnk.hidden ? 0.55 : 1 }}
                          >
                            <input
                              type="text"
                              className="ia-cms-input"
                              style={{ flex: 1, minWidth: "150px" }}
                              placeholder="Link Label"
                              value={lnk.label || ""}
                              onChange={(e) => updateLink({ label: e.target.value })}
                            />
                            <input
                              type="text"
                              className="ia-cms-input"
                              style={{ flex: 1, minWidth: "150px" }}
                              placeholder="URL (e.g. /faculty or https://...)"
                              value={lnk.url || ""}
                              onChange={(e) => updateLink({ url: e.target.value })}
                            />
                            <button
                              type="button"
                              className="ia-btn-secondary"
                              onClick={() => updateLink({ hidden: !lnk.hidden })}
                            >
                              {lnk.hidden ? "Show" : "Hide"}
                            </button>
                            <button
                              type="button"
                              className="ia-btn-swap"
                              disabled={idx === 0}
                              onClick={() => swapLinks(idx, idx - 1)}
                              title="Move Up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="ia-btn-swap"
                              disabled={idx === links.length - 1}
                              onClick={() => swapLinks(idx, idx + 1)}
                              title="Move Down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              className="ia-btn-danger"
                              onClick={() =>
                                setData({
                                  ...data,
                                  facultyMenu: {
                                    ...data.facultyMenu,
                                    links: links.filter((_, i) => i !== idx),
                                  },
                                })
                              }
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      className="ia-btn-secondary"
                      onClick={() =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            links: [
                              ...(data.facultyMenu?.links || []),
                              { id: Date.now(), label: "New Link", url: "/faculty", targetId: "faculty", hidden: false },
                            ],
                          },
                        })
                      }
                    >
                      + Add Menu Link
                    </button>
                  </div>
                </div>

                {/* Featured Spotlight Card */}
                <div
                  className="ia-cms-section"
                  style={data.facultyMenu?.featured?.hidden ? { opacity: 0.6 } : undefined}
                >
                  <div className="ia-cms-section-head">
                    <h3>
                      Featured Spotlight Card{" "}
                      {data.facultyMenu?.featured?.hidden && (
                        <span style={{ fontSize: "0.72rem", color: "#b91c1c", marginLeft: "6px" }}>(HIDDEN)</span>
                      )}
                    </h3>
                    <button
                      type="button"
                      className="ia-btn-secondary"
                      onClick={() =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            featured: {
                              ...data.facultyMenu.featured,
                              hidden: !data.facultyMenu?.featured?.hidden,
                            },
                          },
                        })
                      }
                    >
                      {data.facultyMenu?.featured?.hidden ? "Show Card" : "Hide Card"}
                    </button>
                  </div>

                  <div className="ia-field">
                    <span>Featured Media — Images &amp; Videos (Video below 10 MB)</span>
                    <div className="ia-list" style={{ marginBottom: "10px" }}>
                      {(data.facultyMenu?.featured?.mediaItems || []).map((item, idx) => {
                        const items = data.facultyMenu.featured.mediaItems || [];
                        const swapMedia = (a, b) => {
                          if (b < 0 || b >= items.length) return;
                          const next = [...items];
                          [next[a], next[b]] = [next[b], next[a]];
                          persistData(
                            {
                              ...data,
                              facultyMenu: {
                                ...data.facultyMenu,
                                featured: { ...data.facultyMenu.featured, mediaItems: next },
                              },
                            },
                            "Our Team Spotlight media reordered"
                          );
                        };
                        return (
                          <div key={item.id || idx} className="ia-list-row" style={{ flexWrap: "wrap", gap: "10px" }}>
                            <MediaThumb type={item.type} src={item.src} alt={item.name || "Spotlight media"} />
                            <div style={{ flex: 1, minWidth: "160px" }}>
                              <strong>{item.type === "video" ? "Video" : "Image"}</strong>
                              <div className="ia-muted" style={{ wordBreak: "break-all" }}>
                                {item.name || (item.src?.startsWith("idb://") ? "Uploaded custom file" : item.src)}
                              </div>
                            </div>
                            <div className="ia-cms-actions">
                              <button
                                type="button"
                                className="ia-btn-swap"
                                disabled={idx === 0}
                                onClick={() => swapMedia(idx, idx - 1)}
                                title="Move Up"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="ia-btn-swap"
                                disabled={idx === items.length - 1}
                                onClick={() => swapMedia(idx, idx + 1)}
                                title="Move Down"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                className="ia-btn-danger"
                                onClick={() => {
                                  if (item.src?.startsWith("idb://")) deleteMediaFile(item.src);
                                  const next = items.filter((_, i) => i !== idx);
                                  persistData(
                                    {
                                      ...data,
                                      facultyMenu: {
                                        ...data.facultyMenu,
                                        featured: {
                                          ...data.facultyMenu.featured,
                                          mediaItems: next,
                                          image: next[0]?.type === "image" ? next[0].src : "",
                                        },
                                      },
                                    },
                                    "Our Team Spotlight media removed"
                                  );
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="ia-inline-form" style={{ marginBottom: "10px", flexWrap: "wrap" }}>
                      <select
                        className="ia-cms-input"
                        style={{ width: "auto" }}
                        value={newFacultyMedia.type}
                        onChange={(e) => setNewFacultyMedia({ ...newFacultyMedia, type: e.target.value })}
                      >
                        <option value="image">Image URL</option>
                        <option value="video">Video URL</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Paste image or video URL (e.g. /hero-students.jpg or https://...mp4)"
                        value={newFacultyMedia.src}
                        onChange={(e) => setNewFacultyMedia({ ...newFacultyMedia, src: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ia-btn-secondary"
                        onClick={() => {
                          if (!newFacultyMedia.src.trim()) return;
                          const next = [
                            ...(data.facultyMenu?.featured?.mediaItems || []),
                            { id: Date.now(), type: newFacultyMedia.type, src: newFacultyMedia.src.trim() },
                          ];
                          persistData(
                            {
                              ...data,
                              facultyMenu: {
                                ...data.facultyMenu,
                                featured: { ...data.facultyMenu.featured, mediaItems: next },
                              },
                            },
                            `Added ${newFacultyMedia.type} URL to Our Team Spotlight`
                          );
                          setNewFacultyMedia({ type: "image", src: "" });
                        }}
                      >
                        + Add URL
                      </button>
                    </div>

                    <label className="ia-upload-btn">
                      Upload Image or Video (&lt; 10 MB)
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFacultyMediaUpload}
                        hidden
                      />
                    </label>
                  </div>

                  <label className="ia-field">
                    <span>Card Heading</span>
                    <input
                      type="text"
                      value={data.facultyMenu?.featured?.heading || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            featured: { ...data.facultyMenu.featured, heading: e.target.value },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Lead Line</span>
                    <input
                      type="text"
                      value={data.facultyMenu?.featured?.lead || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            featured: { ...data.facultyMenu.featured, lead: e.target.value },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Body Description</span>
                    <textarea
                      rows={2}
                      value={data.facultyMenu?.featured?.body || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            featured: { ...data.facultyMenu.featured, body: e.target.value },
                          },
                        })
                      }
                    />
                  </label>

                  <label className="ia-field">
                    <span>Footer Note</span>
                    <input
                      type="text"
                      value={data.facultyMenu?.featured?.note || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          facultyMenu: {
                            ...data.facultyMenu,
                            featured: { ...data.facultyMenu.featured, note: e.target.value },
                          },
                        })
                      }
                    />
                  </label>
                </div>

                <button
                  type="button"
                  className="ia-btn-primary"
                  onClick={() => persistData(data, "Our Team Mega Menu saved!")}
                >
                  Save Our Team Mega Menu
                </button>
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
                <button
                  type="button"
                  className={`ia-tab ${newsTab === "menu" ? "is-active" : ""}`}
                  onClick={() => setNewsTab("menu")}
                >
                  Mega Menu ({(data.newsEventsMenu?.links || []).length})
                </button>
              </div>

              {newsTab === "menu" ? (
                <div className="ia-form">
                  <div className="ia-cms-section">
                    <div className="ia-cms-section-head">
                      <h3>
                        News &amp; Events Dropdown Menu{" "}
                        {data.newsEventsMenu?.hidden && (
                          <span style={{ fontSize: "0.72rem", color: "#b91c1c", marginLeft: "6px" }}>(HIDDEN)</span>
                        )}
                      </h3>
                      <div className="ia-cms-actions">
                        <button
                          type="button"
                          className="ia-btn-secondary"
                          onClick={() =>
                            setData({
                              ...data,
                              newsEventsMenu: {
                                ...data.newsEventsMenu,
                                hidden: !data.newsEventsMenu?.hidden,
                              },
                            })
                          }
                        >
                          {data.newsEventsMenu?.hidden ? "Show Menu" : "Hide Menu"}
                        </button>
                        <button
                          type="button"
                          className="ia-btn-secondary"
                          onClick={() => {
                            if (window.confirm("Reset News & Events Mega Menu to defaults?")) {
                              persistData(
                                { ...data, newsEventsMenu: DEFAULT_DATA.newsEventsMenu },
                                "News & Events Mega Menu reset to defaults!"
                              );
                            }
                          }}
                        >
                          Reset Default
                        </button>
                      </div>
                    </div>

                    <label className="ia-field">
                      <span>Menu Heading</span>
                      <input
                        type="text"
                        value={data.newsEventsMenu?.title || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            newsEventsMenu: { ...data.newsEventsMenu, title: e.target.value },
                          })
                        }
                      />
                    </label>

                    <div className="ia-field">
                      <span>Menu Links (Add / Edit / Swap / Hide / Delete)</span>
                      <div className="ia-list" style={{ marginBottom: "10px" }}>
                        {(data.newsEventsMenu?.links || []).map((lnk, idx) => {
                          const links = data.newsEventsMenu.links;
                          const updateLink = (patch) => {
                            const next = [...links];
                            next[idx] = { ...lnk, ...patch };
                            setData({
                              ...data,
                              newsEventsMenu: { ...data.newsEventsMenu, links: next },
                            });
                          };
                          const swapLinks = (a, b) => {
                            if (b < 0 || b >= links.length) return;
                            const next = [...links];
                            [next[a], next[b]] = [next[b], next[a]];
                            setData({
                              ...data,
                              newsEventsMenu: { ...data.newsEventsMenu, links: next },
                            });
                          };
                          return (
                            <div
                              key={lnk.id || idx}
                              className="ia-list-row"
                              style={{ flexWrap: "wrap", opacity: lnk.hidden ? 0.55 : 1 }}
                            >
                              <input
                                type="text"
                                className="ia-cms-input"
                                style={{ flex: 1, minWidth: "150px" }}
                                placeholder="Link Label"
                                value={lnk.label || ""}
                                onChange={(e) => updateLink({ label: e.target.value })}
                              />
                              <input
                                type="text"
                                className="ia-cms-input"
                                style={{ flex: 1, minWidth: "150px" }}
                                placeholder="URL (e.g. /news-events or https://...)"
                                value={lnk.url || ""}
                                onChange={(e) => updateLink({ url: e.target.value })}
                              />
                              <button
                                type="button"
                                className="ia-btn-secondary"
                                onClick={() => updateLink({ hidden: !lnk.hidden })}
                              >
                                {lnk.hidden ? "Show" : "Hide"}
                              </button>
                              <button
                                type="button"
                                className="ia-btn-swap"
                                disabled={idx === 0}
                                onClick={() => swapLinks(idx, idx - 1)}
                                title="Move Up"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="ia-btn-swap"
                                disabled={idx === links.length - 1}
                                onClick={() => swapLinks(idx, idx + 1)}
                                title="Move Down"
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                className="ia-btn-danger"
                                onClick={() =>
                                  setData({
                                    ...data,
                                    newsEventsMenu: {
                                      ...data.newsEventsMenu,
                                      links: links.filter((_, i) => i !== idx),
                                    },
                                  })
                                }
                              >
                                Delete
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        className="ia-btn-secondary"
                        onClick={() =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              links: [
                                ...(data.newsEventsMenu?.links || []),
                                { id: Date.now(), label: "New Link", url: "/news-events", targetId: "news", hidden: false },
                              ],
                            },
                          })
                        }
                      >
                        + Add Menu Link
                      </button>
                    </div>
                  </div>

                  {/* Featured Spotlight Card */}
                  <div
                    className="ia-cms-section"
                    style={data.newsEventsMenu?.featured?.hidden ? { opacity: 0.6 } : undefined}
                  >
                    <div className="ia-cms-section-head">
                      <h3>
                        Featured Spotlight Card{" "}
                        {data.newsEventsMenu?.featured?.hidden && (
                          <span style={{ fontSize: "0.72rem", color: "#b91c1c", marginLeft: "6px" }}>(HIDDEN)</span>
                        )}
                      </h3>
                      <button
                        type="button"
                        className="ia-btn-secondary"
                        onClick={() =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              featured: {
                                ...data.newsEventsMenu.featured,
                                hidden: !data.newsEventsMenu?.featured?.hidden,
                              },
                            },
                          })
                        }
                      >
                        {data.newsEventsMenu?.featured?.hidden ? "Show Card" : "Hide Card"}
                      </button>
                    </div>

                    <div className="ia-field">
                      <span>Featured Image (Upload / Change / URL / Remove)</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        {data.newsEventsMenu?.featured?.image && (
                          <MediaThumb
                            type="image"
                            src={data.newsEventsMenu.featured.image}
                            alt="News & Events featured"
                          />
                        )}
                        <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "6px" }}>
                          <input
                            type="text"
                            placeholder="/sample_headline.jpg or https://..."
                            value={
                              data.newsEventsMenu?.featured?.image?.startsWith("idb://")
                                ? "Uploaded custom image (stored in browser)"
                                : data.newsEventsMenu?.featured?.image || ""
                            }
                            readOnly={data.newsEventsMenu?.featured?.image?.startsWith("idb://")}
                            onChange={(e) =>
                              setData({
                                ...data,
                                newsEventsMenu: {
                                  ...data.newsEventsMenu,
                                  featured: { ...data.newsEventsMenu.featured, image: e.target.value },
                                },
                              })
                            }
                          />
                          <div className="ia-cms-actions">
                            <label className="ia-upload-btn" style={{ margin: 0 }}>
                              {data.newsEventsMenu?.featured?.image ? "Change Image" : "Upload Image"}
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  try {
                                    const idbKey = await saveMediaFile(file);
                                    const prevImg = data.newsEventsMenu?.featured?.image;
                                    if (prevImg?.startsWith("idb://")) deleteMediaFile(prevImg);
                                    const updated = {
                                      ...data,
                                      newsEventsMenu: {
                                        ...data.newsEventsMenu,
                                        featured: { ...data.newsEventsMenu.featured, image: idbKey },
                                      },
                                    };
                                    persistData(updated, `Featured image "${file.name}" uploaded!`);
                                  } catch {
                                    showToast("Could not store image.", "error");
                                  }
                                  e.target.value = "";
                                }}
                              />
                            </label>
                            {data.newsEventsMenu?.featured?.image && (
                              <button
                                type="button"
                                className="ia-btn-danger"
                                onClick={() => {
                                  const prevImg = data.newsEventsMenu?.featured?.image;
                                  if (prevImg?.startsWith("idb://")) deleteMediaFile(prevImg);
                                  persistData(
                                    {
                                      ...data,
                                      newsEventsMenu: {
                                        ...data.newsEventsMenu,
                                        featured: { ...data.newsEventsMenu.featured, image: "" },
                                      },
                                    },
                                    "Featured image removed."
                                  );
                                }}
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="ia-field">
                      <span>Card Heading</span>
                      <input
                        type="text"
                        value={data.newsEventsMenu?.featured?.heading || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              featured: { ...data.newsEventsMenu.featured, heading: e.target.value },
                            },
                          })
                        }
                      />
                    </label>

                    <label className="ia-field">
                      <span>Lead Line</span>
                      <input
                        type="text"
                        value={data.newsEventsMenu?.featured?.lead || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              featured: { ...data.newsEventsMenu.featured, lead: e.target.value },
                            },
                          })
                        }
                      />
                    </label>

                    <label className="ia-field">
                      <span>Body Description</span>
                      <textarea
                        rows={2}
                        value={data.newsEventsMenu?.featured?.body || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              featured: { ...data.newsEventsMenu.featured, body: e.target.value },
                            },
                          })
                        }
                      />
                    </label>

                    <label className="ia-field">
                      <span>Footer Note</span>
                      <input
                        type="text"
                        value={data.newsEventsMenu?.featured?.note || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            newsEventsMenu: {
                              ...data.newsEventsMenu,
                              featured: { ...data.newsEventsMenu.featured, note: e.target.value },
                            },
                          })
                        }
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    className="ia-btn-primary"
                    onClick={() => persistData(data, "News & Events Mega Menu saved!")}
                  >
                    Save News &amp; Events Mega Menu
                  </button>
                </div>
              ) : newsTab === "news" ? (
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

          {activeSection === "contact" && (
            <div className="ia-panel">
              <div className="ia-page-head">
                <h1>Contact Us</h1>
                <p>Full admin access to edit address, phone numbers, emails, websites, map, and quick contact cards across the Contact page &amp; Footer</p>
              </div>

              <div className="ia-form">
                {/* Contact Section Visibility */}
                <div className="ia-cms-section">
                  <div className="ia-cms-section-head">
                    <h3>Contact Page Sections (Hide / Show)</h3>
                  </div>
                  <div className="ia-list">
                    {[
                      { key: "hero", label: "Contact Hero Banner" },
                      { key: "contactMain", label: "Contact Information & Message Form" },
                    ].map((sec) => {
                      const isHidden = !!data.contactContent.hiddenSections?.[sec.key];
                      return (
                        <div key={sec.key} className="ia-list-row" style={{ justifyContent: "space-between", opacity: isHidden ? 0.6 : 1 }}>
                          <span>
                            <strong>{sec.label}</strong> {isHidden ? "(Hidden)" : ""}
                          </span>
                          <button
                            type="button"
                            className="ia-btn-secondary"
                            onClick={() => {
                              const updated = {
                                ...data,
                                contactContent: {
                                  ...data.contactContent,
                                  hiddenSections: {
                                    ...(data.contactContent.hiddenSections || {}),
                                    [sec.key]: !isHidden,
                                  },
                                },
                              };
                              persistData(updated, `${sec.label} ${isHidden ? "shown" : "hidden"}`);
                            }}
                          >
                            {isHidden ? "Show Section" : "Hide Section"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Page Header & Intro */}
                <div className="ia-inline-form">
                  <label className="ia-field">
                    <span>Hero Eyebrow Label</span>
                    <input
                      type="text"
                      value={data.contactContent.heroLabel || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, heroLabel: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label className="ia-field">
                    <span>Hero Heading</span>
                    <input
                      type="text"
                      value={data.contactContent.heroTitle || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, heroTitle: e.target.value },
                        })
                      }
                    />
                  </label>
                </div>

                <label className="ia-field">
                  <span>Hero Subtitle</span>
                  <textarea
                    rows={2}
                    value={data.contactContent.heroSubtitle || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactContent: { ...data.contactContent, heroSubtitle: e.target.value },
                      })
                    }
                  />
                </label>

                <div className="ia-inline-form">
                  <label className="ia-field">
                    <span>Contact Section Heading</span>
                    <input
                      type="text"
                      value={data.contactContent.sectionTitle || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, sectionTitle: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label className="ia-field">
                    <span>Form Section Heading</span>
                    <input
                      type="text"
                      value={data.contactContent.formHeading || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, formHeading: e.target.value },
                        })
                      }
                    />
                  </label>
                </div>

                <label className="ia-field">
                  <span>Contact Section Intro</span>
                  <textarea
                    rows={2}
                    value={data.contactContent.sectionIntro || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactContent: { ...data.contactContent, sectionIntro: e.target.value },
                      })
                    }
                  />
                </label>

                {/* Address Lines */}
                <div className="ia-field">
                  <span>Address Lines (line 1 is also used as the Footer brand title)</span>
                  <div className="ia-list" style={{ marginBottom: "8px" }}>
                    {(data.contactContent.addressLines || []).map((line, idx) => (
                      <div key={idx} className="ia-list-row" style={{ gap: "8px" }}>
                        <input
                          type="text"
                          style={{ flex: 1 }}
                          value={line}
                          onChange={(e) => {
                            const updated = [...data.contactContent.addressLines];
                            updated[idx] = e.target.value;
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, addressLines: updated },
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const updated = data.contactContent.addressLines.filter((_, i) => i !== idx);
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, addressLines: updated },
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() =>
                      setData({
                        ...data,
                        contactContent: {
                          ...data.contactContent,
                          addressLines: [...(data.contactContent.addressLines || []), ""],
                        },
                      })
                    }
                  >
                    + Add Address Line
                  </button>
                </div>

                {/* Phone Numbers */}
                <div className="ia-field">
                  <span>Phone Numbers</span>
                  <div className="ia-list" style={{ marginBottom: "8px" }}>
                    {(data.contactContent.phoneNumbers || []).map((phone, idx) => (
                      <div key={idx} className="ia-list-row" style={{ gap: "8px" }}>
                        <input
                          type="text"
                          style={{ flex: 1 }}
                          value={phone}
                          placeholder="+91 (0) 476 2804517"
                          onChange={(e) => {
                            const updated = [...data.contactContent.phoneNumbers];
                            updated[idx] = e.target.value;
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, phoneNumbers: updated },
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const updated = data.contactContent.phoneNumbers.filter((_, i) => i !== idx);
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, phoneNumbers: updated },
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() =>
                      setData({
                        ...data,
                        contactContent: {
                          ...data.contactContent,
                          phoneNumbers: [...(data.contactContent.phoneNumbers || []), ""],
                        },
                      })
                    }
                  >
                    + Add Phone Number
                  </button>
                </div>

                {/* Emails */}
                <div className="ia-field">
                  <span>Email Addresses</span>
                  <div className="ia-list" style={{ marginBottom: "8px" }}>
                    {(data.contactContent.emails || []).map((email, idx) => (
                      <div key={idx} className="ia-list-row" style={{ gap: "8px" }}>
                        <input
                          type="email"
                          style={{ flex: 1 }}
                          value={email}
                          placeholder="cyber@am.amrita.edu"
                          onChange={(e) => {
                            const updated = [...data.contactContent.emails];
                            updated[idx] = e.target.value;
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, emails: updated },
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const updated = data.contactContent.emails.filter((_, i) => i !== idx);
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, emails: updated },
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() =>
                      setData({
                        ...data,
                        contactContent: {
                          ...data.contactContent,
                          emails: [...(data.contactContent.emails || []), ""],
                        },
                      })
                    }
                  >
                    + Add Email
                  </button>
                </div>

                {/* Websites */}
                <div className="ia-field">
                  <span>Websites</span>
                  <div className="ia-list" style={{ marginBottom: "8px" }}>
                    {(data.contactContent.websites || []).map((site, idx) => (
                      <div key={site.id || idx} className="ia-list-row" style={{ gap: "8px", flexWrap: "wrap" }}>
                        <input
                          type="text"
                          style={{ flex: 1, minWidth: "160px" }}
                          placeholder="Display label"
                          value={site.label || ""}
                          onChange={(e) => {
                            const updated = [...data.contactContent.websites];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, websites: updated },
                            });
                          }}
                        />
                        <input
                          type="url"
                          style={{ flex: 1.4, minWidth: "200px" }}
                          placeholder="https://..."
                          value={site.url || ""}
                          onChange={(e) => {
                            const updated = [...data.contactContent.websites];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, websites: updated },
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="ia-btn-danger"
                          onClick={() => {
                            const updated = data.contactContent.websites.filter((_, i) => i !== idx);
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, websites: updated },
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() =>
                      setData({
                        ...data,
                        contactContent: {
                          ...data.contactContent,
                          websites: [
                            ...(data.contactContent.websites || []),
                            { id: Date.now(), label: "", url: "" },
                          ],
                        },
                      })
                    }
                  >
                    + Add Website
                  </button>
                </div>

                {/* Map Settings */}
                <div className="ia-inline-form">
                  <label className="ia-field">
                    <span>Map Card Title</span>
                    <input
                      type="text"
                      value={data.contactContent.mapTitle || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, mapTitle: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label className="ia-field">
                    <span>Map Card Subtitle</span>
                    <input
                      type="text"
                      value={data.contactContent.mapSubtitle || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactContent: { ...data.contactContent, mapSubtitle: e.target.value },
                        })
                      }
                    />
                  </label>
                </div>

                <label className="ia-field">
                  <span>Google Maps URL</span>
                  <input
                    type="url"
                    value={data.contactContent.mapUrl || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactContent: { ...data.contactContent, mapUrl: e.target.value },
                      })
                    }
                  />
                </label>

                <label className="ia-field">
                  <span>Form Intro Text</span>
                  <textarea
                    rows={2}
                    value={data.contactContent.formIntro || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactContent: { ...data.contactContent, formIntro: e.target.value },
                      })
                    }
                  />
                </label>

                {/* Quick Inquiry Contacts */}
                <div className="ia-field">
                  <span>Quick Inquiry Contact Cards</span>
                  <div className="ia-list" style={{ marginBottom: "8px" }}>
                    {(data.contactContent.quickContacts || []).map((qc, idx) => (
                      <div
                        key={qc.id || idx}
                        className="ia-list-row"
                        style={{ flexDirection: "column", alignItems: "stretch", gap: "8px" }}
                      >
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <input
                            type="text"
                            style={{ width: "70px" }}
                            placeholder="Icon"
                            value={qc.icon || ""}
                            onChange={(e) => {
                              const updated = [...data.contactContent.quickContacts];
                              updated[idx] = { ...updated[idx], icon: e.target.value };
                              setData({
                                ...data,
                                contactContent: { ...data.contactContent, quickContacts: updated },
                              });
                            }}
                          />
                          <input
                            type="text"
                            style={{ flex: 1, minWidth: "160px" }}
                            placeholder="Card Title"
                            value={qc.title || ""}
                            onChange={(e) => {
                              const updated = [...data.contactContent.quickContacts];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setData({
                                ...data,
                                contactContent: { ...data.contactContent, quickContacts: updated },
                              });
                            }}
                          />
                          <input
                            type="email"
                            style={{ flex: 1, minWidth: "180px" }}
                            placeholder="Email"
                            value={qc.email || ""}
                            onChange={(e) => {
                              const updated = [...data.contactContent.quickContacts];
                              updated[idx] = { ...updated[idx], email: e.target.value };
                              setData({
                                ...data,
                                contactContent: { ...data.contactContent, quickContacts: updated },
                              });
                            }}
                          />
                          <button
                            type="button"
                            className="ia-btn-danger"
                            onClick={() => {
                              const updated = data.contactContent.quickContacts.filter((_, i) => i !== idx);
                              setData({
                                ...data,
                                contactContent: { ...data.contactContent, quickContacts: updated },
                              });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Short description"
                          value={qc.desc || ""}
                          onChange={(e) => {
                            const updated = [...data.contactContent.quickContacts];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setData({
                              ...data,
                              contactContent: { ...data.contactContent, quickContacts: updated },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() =>
                      setData({
                        ...data,
                        contactContent: {
                          ...data.contactContent,
                          quickContacts: [
                            ...(data.contactContent.quickContacts || []),
                            { id: Date.now(), icon: "💬", title: "", email: "cyber@am.amrita.edu", desc: "" },
                          ],
                        },
                      })
                    }
                  >
                    + Add Quick Contact Card
                  </button>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                  <button
                    type="button"
                    className="ia-btn-primary"
                    onClick={() => persistData(data, "Contact Us details saved successfully!")}
                  >
                    Save Contact Us
                  </button>
                  <button
                    type="button"
                    className="ia-btn-secondary"
                    onClick={() => {
                      const resetData = { ...data, contactContent: DEFAULT_CONTACT_CONTENT };
                      persistData(resetData, "Contact Us reset to default details");
                    }}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "activity" && isAdmin && (
            <div className="ia-panel">
              <div className="ia-page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1>Activity Log</h1>
                  <p>Track every edit, upload, hide, delete, and login across the Admin Portal (who edited what &amp; where)</p>
                </div>
                {activities.length > 0 && (
                  <button
                    type="button"
                    className="ia-btn-danger"
                    onClick={() => {
                      if (window.confirm("Clear all activity log history?")) {
                        clearActivityLog();
                        setActivities([]);
                        showToast("Activity log cleared");
                      }
                    }}
                  >
                    Clear Log
                  </button>
                )}
              </div>

              <div className="ia-inline-form" style={{ flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search by section, action, or user..."
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                />
                <select
                  className="ia-cms-input"
                  style={{ width: "auto", minWidth: "180px" }}
                  value={activityFilterUser}
                  onChange={(e) => setActivityFilterUser(e.target.value)}
                >
                  <option value="all">All Users ({activities.length})</option>
                  {Array.from(new Set(activities.map((a) => a.email || a.user))).map((uKey) => (
                    <option key={uKey} value={uKey}>
                      {uKey}
                    </option>
                  ))}
                </select>
              </div>

              {(() => {
                const q = activitySearch.trim().toLowerCase();
                const filtered = activities.filter((a) => {
                  const userMatch =
                    activityFilterUser === "all" || (a.email || a.user) === activityFilterUser;
                  const textMatch =
                    !q ||
                    (a.user || "").toLowerCase().includes(q) ||
                    (a.email || "").toLowerCase().includes(q) ||
                    (a.section || "").toLowerCase().includes(q) ||
                    (a.action || "").toLowerCase().includes(q);
                  return userMatch && textMatch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="ia-list-card">
                      <p className="ia-muted" style={{ margin: 0 }}>
                        No activities recorded yet. Any edit, save, upload, or login will appear here automatically.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="ia-list">
                    {filtered.map((act) => {
                      const roleText =
                        act.role === "content_editor"
                          ? "Content Editor"
                          : act.role === "event_editor"
                            ? "Event Editor"
                            : "Admin";
                      const formattedTime = (() => {
                        try {
                          return new Date(act.timestamp).toLocaleString();
                        } catch {
                          return act.timestamp;
                        }
                      })();
                      return (
                        <div key={act.id} className="ia-list-row" style={{ flexWrap: "wrap", alignItems: "flex-start", gap: "10px" }}>
                          <div style={{ flex: 1, minWidth: "240px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                              <strong>{act.user}</strong>
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  padding: "2px 8px",
                                  borderRadius: "999px",
                                  background: act.role === "admin" ? "#dbeafe" : "#fef3c7",
                                  color: act.role === "admin" ? "#1e40af" : "#92400e",
                                }}
                              >
                                {roleText}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  background: "#f1f5f9",
                                  color: "#0f172a",
                                  border: "1px solid #cbd5e1",
                                }}
                              >
                                {act.section}
                              </span>
                            </div>
                            <div style={{ fontSize: "0.92rem", color: "#1e293b" }}>{act.action}</div>
                            {act.email && (
                              <div className="ia-muted" style={{ fontSize: "0.78rem", marginTop: "2px" }}>
                                {act.email}
                              </div>
                            )}
                          </div>
                          <div className="ia-muted" style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                            {formattedTime}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
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
                {isAdmin && (
                <button
                  type="button"
                  className={`ia-tab ${settingsTab === "users" ? "is-active" : ""}`}
                  onClick={() => setSettingsTab("users")}
                >
                  Content Editors &amp; Users ({users.length})
                </button>
                )}
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

              {settingsTab === "users" && isAdmin && (
                <>
                  <form className="ia-inline-form" style={{ flexWrap: "wrap" }} onSubmit={handleAddUser}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email / Login ID"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="Password (min 6 chars)"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <select
                      className="ia-cms-input"
                      style={{ width: "auto" }}
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="content_editor">Content Editor</option>
                      <option value="event_editor">Event Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="ia-btn-primary">
                      + Add User
                    </button>
                  </form>

                  <div className="ia-list">
                    {users.length === 0 && (
                      <div className="ia-list-card">
                        <p className="ia-muted" style={{ margin: 0 }}>
                          No content editors added yet. Use the form above to create a new Content Editor account.
                        </p>
                      </div>
                    )}
                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="ia-list-row"
                        style={{ flexWrap: "wrap", gap: "10px", opacity: u.active === false ? 0.6 : 1 }}
                      >
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <strong>{u.name || u.email}</strong>{" "}
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              background: u.active === false ? "#fee2e2" : "#dcfce7",
                              color: u.active === false ? "#991b1b" : "#166534",
                            }}
                          >
                            {u.active === false ? "Disabled" : "Active"}
                          </span>
                          <div className="ia-muted">
                            {u.email} · {u.role === "content_editor" ? "Content Editor" : u.role === "event_editor" ? "Event Editor" : "Admin"}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                          <input
                            type="password"
                            className="ia-cms-input"
                            style={{ width: "160px" }}
                            placeholder="New password"
                            value={resetPwMap[u.id] || ""}
                            onChange={(e) =>
                              setResetPwMap((prev) => ({ ...prev, [u.id]: e.target.value }))
                            }
                          />
                          <button
                            type="button"
                            className="ia-btn-secondary"
                            onClick={() => handleUpdateUserPassword(u.id)}
                          >
                            Set Password
                          </button>
                          <button
                            type="button"
                            className="ia-btn-secondary"
                            onClick={() => handleToggleUserActive(u.id)}
                          >
                            {u.active === false ? "Activate" : "Disable"}
                          </button>
                          <button
                            type="button"
                            className="ia-btn-danger"
                            onClick={() => {
                              const next = users.filter((item) => item.id !== u.id);
                              setUsers(next);
                              localStorage.setItem("cyberPanelUsers", JSON.stringify(next));
                              logAction(
                                `Deleted user "${u.name || u.email}" (${u.email})`,
                                "Settings · User Management"
                              );
                              showToast("User removed");
                            }}
                          >
                            Delete
                          </button>
                        </div>
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
