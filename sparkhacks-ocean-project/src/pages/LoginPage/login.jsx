import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebase"; // Adjust path if needed
import "./login.css";

const Login = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);

      // Navigate to the home page after login
      navigate("/home");
    } catch (error) {
      console.error("Error during Google Sign-In:", error.code, error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">EcoTide</h1>
        <h2>Login</h2>
        <button onClick={handleGoogleLogin}>
          <FcGoogle size={24} /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
