const ACTIVITY_STORAGE_KEY = "cyberPanelActivityLog";
const MAX_ENTRIES = 300;

export function getActivityLog() {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordActivity({ user, email, role, section, action }) {
  try {
    const entry = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      user: user || "Admin",
      email: email || "",
      role: role || "admin",
      section: section || "General",
      action: action || "Updated content",
    };
    const next = [entry, ...getActivityLog()].slice(0, MAX_ENTRIES);
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cyberPanelActivityUpdated"));
    return next;
  } catch {
    return [];
  }
}

export function clearActivityLog() {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, "[]");
    window.dispatchEvent(new Event("cyberPanelActivityUpdated"));
  } catch {
    // ignore
  }
}

