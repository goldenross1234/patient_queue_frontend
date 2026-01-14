import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://192.168.101.144:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access);
      onLogin();
      navigate("/staff");
    } catch (e) {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Clinic Login</h2>
      <input placeholder="Username" onChange={(e) => setUser(e.target.value)} />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}
