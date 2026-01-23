import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Display from "./pages/Display";
import StaffPanel from "./pages/StaffPanel";
import Logs from "./pages/Logs";
import Login from "./pages/Login";
import Layout from "./components/Layout.js";

// Website pages
import Home from "./website_pages/Home";
import About from "./website_pages/About";
import Services from "./website_pages/Services";
import Contact from "./website_pages/Contact";
import Location from "./website_pages/Location";
import Navbar from "./components/Navbar";
import PatientLogin from "./website_pages/PatientLogin";
import DoctorLogin from "./website_pages/DoctorLogin";
import StaffLogin from "./website_pages/StaffLogin";
import DoctorDashboard from "./website_pages/DoctorDashboard";

// Protect internal systems using JWT
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/staff/login" />;
}

// Wrap website pages with navbar
function WebsitePage({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC WEBSITE (DEFAULT) ===== */}
        <Route path="/" element={<WebsitePage><Home /></WebsitePage>} />
        <Route path="/home" element={<WebsitePage><Home /></WebsitePage>} />
        <Route path="/about" element={<WebsitePage><About /></WebsitePage>} />
        <Route path="/services" element={<WebsitePage><Services /></WebsitePage>} />
        <Route path="/contact" element={<WebsitePage><Contact /></WebsitePage>} />
        <Route path="/location" element={<WebsitePage><Location /></WebsitePage>} />

        {/* ===== PUBLIC QUEUE DISPLAY ===== */}
        <Route path="/display" element={<Display />} />

        {/* ===== INTERNAL QUEUE AUTH (legacy) ===== */}
        <Route path="/login" element={<Login onLogin={() => {}} />} />

        {/* ===== STAFF OPERATIONS ===== */}
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <Layout>
                <StaffPanel />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/staff/logs"
          element={
            <PrivateRoute>
              <Layout>
                <Logs />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* ===== PORTAL LOGINS ===== */}
        <Route path="/patients/login" element={<WebsitePage><PatientLogin /></WebsitePage>} />
        <Route path="/doctor/login" element={<WebsitePage><DoctorLogin /></WebsitePage>} />
        <Route path="/staff/login" element={<WebsitePage><StaffLogin /></WebsitePage>} />

        {/* ===== DOCTOR PORTAL ===== */}
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute>
              <WebsitePage>
                <DoctorDashboard />
              </WebsitePage>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
