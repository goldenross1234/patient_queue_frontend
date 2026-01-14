import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from "./Display";
import StaffPanel from "./StaffPanel";
import Logs from "./Logs";   // ← THIS WAS MISSING

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/staff/logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  );
}
