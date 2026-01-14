import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Display from "./Display";
import StaffPanel from "./StaffPanel";
import Logs from "./Logs";
import Login from "./Login";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public display */}
        <Route path="/" element={<Display />} />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />

        {/* Protected staff area */}
        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <StaffPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff/logs"
          element={
            <PrivateRoute>
              <Logs />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
