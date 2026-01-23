import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { jwtDecode } from "jwt-decode";

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("token/", { username, password });

      const decoded = jwtDecode(res.data.access);

      // 🔐 Tokens
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // 👤 Identity + permissions (FROM BACKEND)
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("roles", JSON.stringify(decoded.roles || []));

      navigate("/staff");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Staff Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}
