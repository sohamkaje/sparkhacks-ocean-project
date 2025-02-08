import React from "react";
import "./Home.css";
import fish from "../../assets/yellow-fish.svg";
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      <header className="top-bar">
        <h1>DeepBlue</h1>
        <nav>
          <a href="#">About</a>
          <a href="#">Our Mission</a>
          <a href="#">Contact</a>
          <a href="#">Learn More</a>
        </nav>
      </header>

      {/* Ocean Background with Floating Elements */}
      <div className="ocean">
        <div className="wave"></div>
        <img src={fish} className="fish swim-left" alt="Swimming Fish" />
        <img src={jellyfish} className="jellyfish float" alt="Floating Jellyfish" />
      </div>

      {/* Main Info Box */}
      <div className="info-box">
        <h1 className="title">Join the Wave</h1>
        <h2 className="subtitle">Reduce Your Carbon Footprint</h2>
        <p className="description">
          Join us in making the planet a better place for future generations.
        </p>
        <div className="button-container">
          <a href="/learn-more" className="button">Learn More</a>
          <a href="/dashboard" className="button show-tasks">Start Now</a>
        </div>
      </div>

      {/* Footer with Partners */}
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

export default Home;
