import { useEffect, useRef, useState, useCallback } from "react";
import api from "./api";

export default function Display() {
  const [current, setCurrent] = useState(null);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("idle"); // idle | calling | serving
  const [progress, setProgress] = useState(0);

  const wsRef = useRef(null);
  const retryRef = useRef(null);
  const progressTimer = useRef(null);

  const loadCurrent = async () => {
    try {
      const res = await api.get("queue/current/");
      setCurrent(res.data.queue_number);
      setName(res.data.patient_name);
      setMode(res.data.queue_number ? "serving" : "idle");
    } catch (e) {
      console.error("Failed to load current queue", e);
    }
  };

  const startProgress = () => {
    setMode("calling");
    setProgress(0);

    if (progressTimer.current) clearInterval(progressTimer.current);

    progressTimer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer.current);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const connectWS = useCallback(() => {
    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(
      window.APP_CONFIG.API_BASE_URL.replace("http", "ws") + "/ws/queue/"
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
      loadCurrent();
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.state === "calling") {
        startProgress();
      }

      if (data.state === "serving") {
        setMode("serving");
        setCurrent(data.queue_number);
        setName(data.patient_name);
      }
    };

    ws.onerror = () => ws.close();

    ws.onclose = () => {
      console.log("WS disconnected – retrying in 2s");
      retryRef.current = setTimeout(connectWS, 2000);
    };
  }, []);

  useEffect(() => {
    loadCurrent();
    connectWS();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (retryRef.current) clearTimeout(retryRef.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [connectWS]);

  return (
    <div style={styles.container}>
      {mode === "calling" ? (
        <>
          <h1 style={styles.title}>Calling next patient…</h1>
          <div style={styles.bar}>
            <div style={{ ...styles.fill, width: `${progress}%` }} />
          </div>
        </>
      ) : (
        <>
          <h1 style={styles.title}>NOW SERVING</h1>
          <div style={styles.number}>{current ?? "--"}</div>
          <div style={styles.name}>{name}</div>
        </>
      )}
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
  title: { fontSize: "3rem", marginBottom: "20px" },
  number: { fontSize: "8rem", fontWeight: "bold" },
  name: { fontSize: "2rem" },

  bar: {
    width: "60%",
    height: "20px",
    background: "#334155",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "30px",
  },
  fill: {
    height: "100%",
    background: "#22c55e",
    transition: "width 0.1s linear",
  },
};
