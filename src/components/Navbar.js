import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      background: "#0f172a",
      padding: "12px 24px",
      display: "flex",
      gap: "20px",
      alignItems: "center"
    }}>
      <span style={{ color: "white", fontWeight: "bold" }}>
        OB-GYN Clinic
      </span>

      <Link to="/home" style={{ color: "white" }}>Home</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
      <Link to="/services" style={{ color: "white" }}>Services</Link>
      <Link to="/contact" style={{ color: "white" }}>Contact</Link>
      <Link to="/location" style={{ color: "white" }}>Location</Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: "16px" }}>
        <Link to="/patients/login" style={{ color: "#38bdf8" }}>
          Patient Login
        </Link>
        <Link to="/doctor/login" style={{ color: "#38bdf8" }}>
          Doctor Login
        </Link>
        <Link to="/staff/login" style={{ color: "#fbbf24" }}>
          Staff Login
        </Link>
        <Link to="/" style={{ color: "#a5f3fc" }}>
          View Queue
        </Link>
      </div>
    </div>
  );
}
