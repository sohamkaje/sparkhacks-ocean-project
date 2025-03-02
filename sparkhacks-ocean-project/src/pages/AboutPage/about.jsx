import React from 'react';
import '../loginpage/login.css';
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg"
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg"

const About = () => {
  return (
    <div className="login-container">
      {/* Top Bar */}
      <div className="top-bar"></div>

      {/* Header */}
      <div className="login-header">
        <h1>About Us</h1>
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
      <img src={seaweedSvg}  className="seaweed seaweed-2" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-3" alt="Seaweed" />

      {/* Sand */}
      <div className="sand"></div>

      {/* About Content */}
      <div className="login-box">
        <h2 className="title">About Our Project</h2>
        <p className="subtitle">Discover the story behind our mission.</p>
        <p className="description">
            DeepBlue is your personal sustainability coach. Every day, we provide 10 AI-powered eco-tasks tailored to guide you toward a greener lifestyle. As you complete tasks, you’ll see the polluted water in the app clear up in real-time, visualizing the positive impact of your actions. It’s a fun and satisfying way to track your progress and stay motivated!
        </p>
        <button className="explore-button">Learn More</button>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Join us in making the world a better place.</p>
        <div className="logos">
          <span>🌊</span>
          <span>🐟</span>
          <span>🦈</span>
        </div>
      </div>
    </div>
  );
};

export default About;