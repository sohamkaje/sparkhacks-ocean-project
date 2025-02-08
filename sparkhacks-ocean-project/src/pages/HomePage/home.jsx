import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [response, setResponse] = useState("Generating response...");
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const hardcodedPrompt = "Give Me 10 Tasks to Help the Environment";

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: hardcodedPrompt }],
            temperature: 0.7,
            max_tokens: 256,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        setResponse(res.data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching response:", error);
        setResponse("Error generating response. Please try again.");
      }
    };

    fetchResponse();
  }, []);

  // Function to format response into a list if applicable
  const formatResponse = (text) => {
    const taskList = text
      .split("\n") // Split by line breaks
      .filter((line) => line.match(/^\d+\./)) // Keep only numbered lines
      .map((line) => line.replace(/^\d+\.\s*/, "")); // Remove number prefixes

    return taskList.length > 0 ? (
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    ) : (
      <p>{text}</p> // Default to paragraph if no list is detected
    );
  };

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

      {/* Right Side - AI Response */}
      <aside className="ai-container">
        <h2>AI-Powered Insights</h2>
        <p className="ai-question">
          <strong>AI Question:</strong> {hardcodedPrompt}
        </p>
        <div className="ai-response-box">
          <strong>AI Response:</strong>
          {formatResponse(response)}
        </div>
      </aside>
    </div>
  );
};

export default Home;
