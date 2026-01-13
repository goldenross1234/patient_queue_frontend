import { useEffect, useState } from "react";

export default function Display() {
  const [current, setCurrent] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.101.144:8000/ws/queue/");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setCurrent(data.queue_number);
      setName(data.patient_name);
    };

    ws.onopen = () => console.log("Connected to queue");
    ws.onerror = (e) => console.error("WS error", e);

    return () => ws.close();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NOW SERVING</h1>
      <div style={styles.number}>{current ?? "--"}</div>
      <div style={styles.name}>{name}</div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  number: {
    fontSize: "8rem",
    fontWeight: "bold",
  },
  name: {
    fontSize: "2rem",
    marginTop: "20px",
  },
};
