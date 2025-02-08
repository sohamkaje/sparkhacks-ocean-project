import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, database, ref, set, get } from '../../Firebase/firebase.js';
import "./login.css";

const Login = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate hook

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(database, `users/${user.uid}`);

      get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          set(userRef, {
            email: user.email,
            name: user.displayName,
            score: 0, // Initialize score if needed
            tasks: {
              "task1": "",
              "task2": "",
              "task3": "",
              "task4": "",
              "task5": "",
              "task6": "",
              "task7": "",
              "task8": "",
              "task9": "",
              "task10": ""
              // Initialize tasks with default status
            }
          }).then(() => {
            console.log("New user added to database:", user.uid);
          }).catch((error) => {
            console.error("Failed to add user to database:", error);
          });
        }
      });

      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      alert("Failed to sign in with Google: " + error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="bubbles">
  {Array.from({ length: 20 }).map((_, index) => (
    <div key={index} className={`bubble bubble-${index + 1}`}></div>
  ))}
</div>

      <div className="fish"></div>
      <img src="shark.svg" className="shark" alt="Swimming Shark" />
      <div className="seaweed"></div>
      <div className="sand"></div>

      <div className="top-bar"></div>
      <div className="login-header">
        <h1>DeepBlue</h1>
        <nav>
          <a href="#">About</a>
          <a href="#">Our Mission</a>
          <a href="#">Contact</a>
          <a href="#">Learn More</a>
        </nav>
      </div>
      <div className="login-box">
        <h1 className="title">Join the Wave</h1>
        <h2 className="subtitle">Reduce Your Carbon Footprint</h2>
        <p className="description">
          Collaborate with us to make the planet a better place for future generations.
        </p>
        <button className="google-login" onClick={handleGoogleLogin}>
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <button className="explore-button" onClick={() => navigate("/home")}>
          Start Reducing Now
        </button>
      </div>
      <footer className="login-footer">
        <p>Our Partners:</p>
        <div className="logos">
          <span>🌟 Aditiya</span>
          <span>🌟 Vasu</span>
          <span>🌟 Soham</span>
          <span>🌟 Shriniket</span>
          <span>🌟 Mit</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
