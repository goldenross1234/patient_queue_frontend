import { useEffect, useState } from "react";
import api from "./api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("logs/");
        setLogs(res.data);
      } catch (e) {
        console.error("Failed to load logs", e);
      }
    };

    load();
    const timer = setInterval(load, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>System Logs</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {logs.map((l) => (
          <div key={l.id}>
            {new Date(l.timestamp).toLocaleTimeString()} —{" "}
            <strong>{l.event}</strong>: {l.message}
          </div>
        ))}
      </div>
    </div>
  );
}
