import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg"
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg"


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div className="login-container">
      {/* Animated Background Elements */}
      <div className="bubbles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className={`bubble bubble-${index + 1}`}></div>
        ))}
      </div>

      {/* Fish and Shark Elements */}
      <div className="fish" aria-hidden="true"></div>
      <img src={sharkSvg} className="shark" alt="Swimming shark in the ocean" />
      <img src={fish} className="fish" alt="Swimming Fish" />
      <img src={jellyfish} className="jellyfish" alt="Floating Jellyfish" />
      <img src={seaweedSvg} className="seaweed seaweed-1" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-2" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-3" alt="Seaweed" />
      <div className="sand" aria-hidden="true">
      <div className="logos">
      <span aria-label="Partner Aditiya">🌟 Aditiya</span>
          <span aria-label="Partner Vasu">🌟 Vasu</span>
          <span aria-label="Partner Soham">🌟 Soham</span>
          <span aria-label="Partner Shriniket">🌟 Shriniket</span>
          <span aria-label="Partner Mit">🌟 Mit</span>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="top-bar"></div>
      <div className="login-header">
        <h1>DeepBlue</h1>
        <nav>
          <a href="#" aria-label="Learn about DeepBlue">About</a>
          <a href="#" aria-label="Our mission statement">Our Mission</a>
          <a href="#" aria-label="Contact us">Contact</a>
          <a href="#" aria-label="Learn more about DeepBlue">Learn More</a>
        </nav>
      </div>

      {/* Login Box */}
      <div className="login-box">
        <h1 className="title">Join the Wave</h1>
        <h2 className="subtitle">Reduce Your Carbon Footprint</h2>
        <p className="description">
          Collaborate with us to make the planet a better place for future generations.
        </p>
        <button className="google-login" onClick={handleLogin} aria-label="Sign in with Google">
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <button
          className="explore-button"
          onClick={() => navigate("/home")}
          aria-label="Start reducing your carbon footprint"
        >
          Start Reducing Now
        </button>
      </div>

      {/* Footer */}
      {/* <footer className="login-footer">
        
        {/* <div className="logos">
          <span aria-label="Partner Aditiya">🌟 Aditiya</span>
          <span aria-label="Partner Vasu">🌟 Vasu</span>
          <span aria-label="Partner Soham">🌟 Soham</span>
          <span aria-label="Partner Shriniket">🌟 Shriniket</span>
          <span aria-label="Partner Mit">🌟 Mit</span>
        </div> */}
      {/* </footer> */} 
    </div>
  );
};

export default Login;
