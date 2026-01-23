import { useEffect, useRef } from "react";
import api from "../api"; // adjust path if needed

function PatientLogin() {
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.accounts) {
      console.error("Google SDK not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id:
        "570583645706-8sgtjpo7ub987eeu3r67chjckg9qgf6d.apps.googleusercontent.com",

      callback: async (response) => {
        try {
          const token = response.credential;
          if (!token) {
            alert("No Google credential received");
            return;
          }

          // ✅ axios + config.js baseURL
          const res = await api.post("patients/google-login/", {
            token,
          });

          localStorage.setItem("patient_access", res.data.access);
          localStorage.setItem("patient_refresh", res.data.refresh);

          // ✅ redirect to intake/dashboard
          window.location.href = "/patients/dashboard";
        } catch (err) {
          console.error("Google login error:", err);
          alert("Google login failed");
        }
      },
    });

    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <h2>Patient Login</h2>
      <div ref={googleBtnRef}></div>
    </div>
  );
}

export default PatientLogin;
