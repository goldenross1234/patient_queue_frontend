import { useEffect, useState } from "react";
import api from "./api";

export default function StaffPanel() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const loadQueue = async () => {
    const res = await api.get("queue/");
    setPatients(res.data);
  };

  useEffect(() => {
    loadQueue();
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

      <h3>Today's Queue</h3>
      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            #{p.queue_number} — {p.patient_name} ({p.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  form: { display: "flex", gap: "10px", marginBottom: "20px" },
  nextBtn: {
    background: "#16a34a",
    color: "white",
    padding: "10px 20px",
    border: "none",
    fontSize: "16px",
  },
};
