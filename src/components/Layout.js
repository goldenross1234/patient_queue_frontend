import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const username = localStorage.getItem("username") || "User";

  const isAdmin = roles.includes("admin") || roles.includes("superuser");
  const isStaff = roles.includes("staff");
  const isDoctor = roles.includes("doctor");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={styles.sidebar}>
        <h3>OB-GYNE Clinic</h3>

        <Link to="/display">Public Display</Link>

        {isStaff && <Link to="/staff">Queue Control</Link>}
        {isAdmin && <Link to="/staff/logs">System Logs</Link>}
        {isDoctor && <Link to="/doctor/dashboard">Doctor Dashboard</Link>}

        {/* 👋 Logged-in user */}
        <div style={styles.user}>
          Hello, <strong>{username}</strong>!
        </div>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      <div style={styles.main}>{children}</div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  user: {
    marginTop: "auto",
    marginBottom: "8px",
    fontSize: "14px",
    opacity: 0.9,
  },
  main: {
    flex: 1,
    overflow: "auto",
    background: "#f8fafc",
  },
  logout: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};
