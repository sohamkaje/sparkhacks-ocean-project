import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/login";
import DashBoard from 

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
