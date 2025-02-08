import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
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