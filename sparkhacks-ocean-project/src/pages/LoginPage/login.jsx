import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./login.css"; // Ensure this CSS file exists and is properly linked

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">EcoTide</h1>
        <h2>Login</h2>
        <p>Sign in to continue</p>
        <button className="google-login">
          <FcGoogle size={24} /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
