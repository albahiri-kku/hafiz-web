import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import MaqraaPage from "./pages/MaqraaPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/maqraa" element={<MaqraaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
