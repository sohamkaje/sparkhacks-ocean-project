import React from 'react';
import '../loginpage/login.css'; // Reuse the same CSS file
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg";
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg";

const LearnMore = () => {
  return (
    <div className="login-container">
      {/* Top Bar */}
      <div className="top-bar"></div>

      {/* Header */}
      <div className="login-header">
        <h1>Learn More</h1>
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

      {/* Learn More Content */}
      <div className="login-box">
        <h2 className="title">Learn More</h2>
        <p className="subtitle">Dive deeper into our initiatives.</p>
        <p className="description">
          Explore our projects, read about our impact, and discover how you can contribute to our mission. Together, we can create a sustainable future for everyone.
        </p>
        <button className="explore-button">Explore Projects</button>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Join us in creating a sustainable future.</p>
        <div className="logos">
          <span>📚</span>
          <span>🌱</span>
          <span>💧</span>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;