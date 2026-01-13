import { BrowserRouter, Routes, Route } from "react-router-dom";
import Display from "./Display";
import StaffPanel from "./StaffPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/staff" element={<StaffPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
