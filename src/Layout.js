import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={styles.sidebar}>
        <h3>OB-GYNE Clinic</h3>

        <Link to="/">Public Display</Link>
        <Link to="/staff">Queue Control</Link>

        {role === "Admin" && <Link to="/staff/logs">System Logs</Link>}

        <button onClick={logout} style={styles.logout}>Logout</button>
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
  main: {
    flex: 1,
    overflow: "auto",
    background: "#f8fafc",
  },
  logout: {
    marginTop: "auto",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};
