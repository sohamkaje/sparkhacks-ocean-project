import React from 'react';
import '../loginpage/login.css'; // Reuse the same CSS file
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg";
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg";

const Mission = () => {
  return (
    <div className="login-container">
      {/* Top Bar */}
      <div className="top-bar"></div>

      {/* Header */}
      <div className="login-header">
        <h1>Our Mission</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </div>

      {/* Bubbles */}
      <div className="bubbles">
        {[...Array(8)].map((_, index) => (
          <div key={index} className={`bubble bubble-${index + 1}`}></div>
        ))}
      </div>

      {/* Fish */}
      <img src={fish} className="fish" alt="Swimming Fish" />

      {/* Jellyfish */}
      <img src={jellyfish} className="jellyfish" alt="Floating Jellyfish" />

      {/* Shark */}
      <img src={sharkSvg} className="shark" alt="Swimming Shark" />

      {/* Seaweed */}
      <img src={seaweedSvg} className="seaweed seaweed-1" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-2" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-3" alt="Seaweed" />

      {/* Sand */}
      <div className="sand"></div>

      {/* Mission Content */}
      <div className="login-box">
        <h2 className="title">Our Mission</h2>
        <p className="subtitle">Driving change through innovation.</p>
        <p className="description">
          Our mission is to empower individuals and communities by providing sustainable solutions that address global challenges. We believe in the power of technology and collaboration to create a better future for all.
        </p>
        <button className="explore-button">Get Involved</button>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Together, we can make a difference.</p>
        <div className="logos">
          <span>🌍</span>
          <span>💡</span>
          <span>🤝</span>
        </div>
      </div>
    </div>
  );
};

export default Mission;