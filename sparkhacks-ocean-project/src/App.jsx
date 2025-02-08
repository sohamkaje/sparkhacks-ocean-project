import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/login";
import Home from "./pages/HomePage/home";
import DashBoard from './pages/HomePage/dashboard';
import MissionPage from "./pages/MissionPage/mission"; // Import MissionPage
import ContactPage from "./pages/ContactPage/contact"; // Import ContactPage
import LearnMorePage from "./pages/LearnMorePage/learnMore"; // Import LearnMorePage
import AboutPage from "./pages/AboutPage/about"; // Import AboutPage

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
