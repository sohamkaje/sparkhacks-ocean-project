import React from 'react';
import '../loginpage/login.css'; // Reuse the same CSS file
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg";
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg";

const Contact = () => {
  return (
    <div className="login-container">
      {/* Top Bar */}
      <div className="top-bar"></div>

      {/* Header */}
      <div className="login-header">
        <h1>Contact Us</h1>
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

      {/* Contact Content */}
      <div className="login-box">
        <h2 className="title">Contact Us</h2>
        <p className="subtitle">We'd love to hear from you!</p>
        <p className="description">
          Have questions or feedback? Reach out to us, and we'll get back to you as soon as possible.
        </p>
        <button className="explore-button">Send a Message</button>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Let's connect and make waves together.</p>
        <div className="logos">
          <span>📧</span>
          <span>📞</span>
          <span>💬</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;