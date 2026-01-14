import { useEffect, useState } from "react";
import api from "./api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("logs/");
      setLogs(res.data);
    };
    load();
    const timer = setInterval(load, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>System Logs</h2>
      <ul>
        {logs.map((l) => (
          <li key={l.id}>
            {new Date(l.timestamp).toLocaleTimeString()} — {l.event}: {l.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
