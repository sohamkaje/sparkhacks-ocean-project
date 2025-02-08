import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/login";
import Home from "./pages/HomePage/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
