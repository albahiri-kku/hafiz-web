import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import MaqraaPage from "./pages/MaqraaPage";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/maqraa" element={<MaqraaPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
