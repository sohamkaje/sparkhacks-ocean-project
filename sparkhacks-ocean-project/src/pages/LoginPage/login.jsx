import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add login logic here
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">🌊 EcoTide</h1>
        <h2>Welcome Back</h2>
        <p>Join us in reducing the carbon footprint</p>
        <button className="google-login" onClick={handleLogin}>
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <button className="home-button" onClick={() => navigate("/home")}>
          Explore EcoTide
        </button>
      </div>
    </div>
  );
};

export default Login;
