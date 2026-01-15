import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Display from "./pages/Display";
import StaffPanel from "./pages/StaffPanel";
import Logs from "./pages/Logs";
import Login from "./pages/Login";
import Layout from "./Layout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/login" element={<Login onLogin={() => {}} />} />

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
      </Routes>
    </BrowserRouter>
  );
}
