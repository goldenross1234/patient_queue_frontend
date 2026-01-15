import { useEffect, useState } from "react";
import api from "../api";

export default function StaffPanel() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logs, setLogs] = useState([]);

  const loadQueue = async () => {
    const res = await api.get("queue/");
    setPatients(res.data);
  };

  const loadLogs = async () => {
    const res = await api.get("logs/");
    setLogs(res.data);
  };

  useEffect(() => {
    loadQueue();
    loadLogs();

    const timer = setInterval(() => {
      loadQueue();
      loadLogs();
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const addPatient = async () => {
    if (!name || !email) return;
    await api.post("queue/", { patient_name: name, email });
    setName("");
    setEmail("");
    loadQueue();
  };

  const serveNext = async () => {
    await api.post("queue/serve_next/");
    loadQueue();
    loadLogs();
  };

  return (
    <div style={styles.container}>
      <h2>Staff Queue Control</h2>

      <div style={styles.form}>
        <input
          placeholder="Patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <button style={styles.nextBtn} onClick={serveNext}>
        Serve Next
      </button>

      <div style={styles.grid}>
        {/* Queue */}
        <div>
          <h3>Today's Queue</h3>
          <ul>
            {patients.map((p) => (
              <li key={p.id}>
                #{p.queue_number} — {p.patient_name} ({p.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Logs */}
        <div>
          <h3>System Logs</h3>
          <div style={styles.logBox}>
            {logs.map((l) => (
              <div key={l.id} style={styles.logLine}>
                {new Date(l.timestamp).toLocaleTimeString()} —{" "}
                <strong>{l.event}</strong>: {l.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", fontFamily: "Arial" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  nextBtn: {
    background: "#16a34a",
    color: "white",
    padding: "10px 20px",
    border: "none",
    fontSize: "16px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  logBox: {
    height: "300px",
    overflowY: "auto",
    background: "#f1f5f9",
    padding: "10px",
    border: "1px solid #cbd5f5",
    fontSize: "14px",
  },
  logLine: {
    padding: "4px 0",
    borderBottom: "1px solid #e5e7eb",
  },
};
