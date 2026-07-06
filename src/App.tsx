import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProudMoments from "./pages/ProudMoments";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proud-moments" element={<ProudMoments />} />
    </Routes>
  );
}