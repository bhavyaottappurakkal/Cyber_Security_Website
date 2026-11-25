import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recordActivity } from "../utils/activityLog";
import "./AdminLogin.css";

// Default built-in admin (always present, cannot be deleted)
const BUILTIN_ADMIN = {
  id: "builtin-admin",
  email: "vysakh@am.amrita.edu",
  password: "Cyber@Secure#2026",
  name: "Vysakh",
  role: "admin",
};

function getUsers() {
  try {
    const u = localStorage.getItem("cyberPanelUsers");
    return u ? JSON.parse(u) : [];
  } catch {
    return [];
  }
}

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const normalizedInput = username.trim().toLowerCase();
      const adminPassword =
        localStorage.getItem("adminPassword") || BUILTIN_ADMIN.password;

      // Check built-in admin first
      if (
        normalizedInput === BUILTIN_ADMIN.email.toLowerCase() &&
        password === adminPassword
      ) {
        sessionStorage.setItem("adminAuth", "true");
        sessionStorage.setItem(
          "adminUser",
          JSON.stringify({ ...BUILTIN_ADMIN, password: undefined }),
        );
        recordActivity({
          user: BUILTIN_ADMIN.name,
          email: BUILTIN_ADMIN.email,
          role: BUILTIN_ADMIN.role,
          section: "Authentication",
          action: "Signed in to Admin Portal",
        });
        navigate("/admin/dashboard");
        setLoading(false);
        return;
      }
      // Check sub-users (content editors / event editors / added admins)
      const users = getUsers();
      const match = users.find(
        (u) =>
          (u.email || "").trim().toLowerCase() === normalizedInput &&
          u.password === password &&
          u.active !== false,
      );
      if (match) {
        sessionStorage.setItem("adminAuth", "true");
        sessionStorage.setItem(
          "adminUser",
          JSON.stringify({ ...match, password: undefined }),
        );
        recordActivity({
          user: match.name || match.email,
          email: match.email,
          role: match.role || "content_editor",
          section: "Authentication",
          action: "Signed in to Admin Portal",
        });
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials or account disabled. Access denied.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-page">
      {/* Animated circuit background */}
      <div className="circuit-bg">
        <div className="circuit-line cl-1"></div>
        <div className="circuit-line cl-2"></div>
        <div className="circuit-line cl-3"></div>
        <div className="circuit-line cl-4"></div>
        <div className="circuit-line cl-5"></div>
        <div className="circuit-line cl-6"></div>
        <div className="circuit-dot cd-1"></div>
        <div className="circuit-dot cd-2"></div>
        <div className="circuit-dot cd-3"></div>
        <div className="circuit-dot cd-4"></div>
        <div className="circuit-dot cd-5"></div>
        <div className="circuit-dot cd-6"></div>
        <div className="circuit-dot cd-7"></div>
        <div className="circuit-dot cd-8"></div>
        <div className="circuit-dash dash-1"></div>
        <div className="circuit-dash dash-2"></div>
        <div className="circuit-dash dash-3"></div>
        <div className="circuit-dash dash-4"></div>
        <div className="circuit-dash dash-5"></div>
        <div className="circuit-dash dash-6"></div>
        <div className="circuit-square sq-1"></div>
        <div className="circuit-square sq-2"></div>
        <div className="circuit-square sq-3"></div>
        <div className="circuit-square sq-4"></div>
      </div>

      {/* Login Card */}
      <div className="admin-login-card">
        <div className="card-glow"></div>

        <div className="login-header">
          <div className="shield-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="url(#shieldGrad)"
              />
              <defs>
                <linearGradient
                  id="shieldGrad"
                  x1="3"
                  y1="2"
                  x2="21"
                  y2="23.25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#60c8ff" />
                  <stop offset="1" stopColor="#1a6fff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Cyber Security Department Portal</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              className="login-input"
              placeholder="E-mail or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="16"
                  x2="12.01"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Authenticating...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
