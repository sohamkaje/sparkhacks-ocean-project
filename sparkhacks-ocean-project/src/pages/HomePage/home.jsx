import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="dashboard-container">
      {/* Left Side - Climate Content */}
      <div className="home-container">
        <header>
          <h1>Reduce Your Carbon Footprint</h1>
          <p>Join us in making the planet a cleaner place.</p>
        </header>
        <div className="ocean">
          <div className="wave"></div>
        </div>
        <main>
          <section>
            <h2>Why It Matters</h2>
            <p>
              Carbon emissions contribute to climate change, affecting ecosystems, weather patterns, and sea levels.
            </p>
          </section>
          <section>
            <h2>How You Can Help</h2>
            <ul>
              <li>Use renewable energy sources.</li>
              <li>Reduce waste and recycle.</li>
              <li>Choose sustainable transportation.</li>
              <li>Support eco-friendly products.</li>
            </ul>
          </section>
          <div className="button-container">
            <a href="/learn-more" className="button">Learn More</a>
            <a href="/dashboard" className="button show-tasks">Show 10 Tasks</a>
          </div>
        </main>
        <footer>
          <p>&copy; 2025 Ocean Carbon Initiative. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;