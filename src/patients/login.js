import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";

function PatientLogin() {

  // 🔍 DEBUG: confirm env variable is loaded
  useEffect(() => {
    console.log(
      "REACT_APP_GOOGLE_CLIENT_ID:",
      process.env.REACT_APP_GOOGLE_CLIENT_ID
    );
    console.log("window.google:", window.google);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("GOOGLE SUCCESS:", credentialResponse);

    const token = credentialResponse.credential;

    if (!token) {
      alert("No Google token received");
      return;
    }

    const res = await fetch("/api/patients/google-login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("patient_access", data.access);
      localStorage.setItem("patient_refresh", data.refresh);
      window.location.href = "/patients/dashboard";
    } else {
      console.error("Backend error:", data);
      alert(data.error || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    console.error("GOOGLE SIGN-IN ERROR");
    alert("Google Sign-In failed");
  };

  return (
    <div style={{ marginTop: 80 }}>
      <h2>Patient Login</h2>

      {/* IMPORTANT: force rendering */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme="outline"
        size="large"
        width="300"
      />
    </div>
  );
}

export default PatientLogin;
