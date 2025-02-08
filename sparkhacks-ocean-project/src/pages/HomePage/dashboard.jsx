import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const hardcodedPrompt = "Give 10 Specific things I can do to help the environment";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: hardcodedPrompt }],
            temperature: 0.7,
            max_tokens: 1024,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const taskList = res.data.choices[0].message.content
          .split("\n")
          .filter((line) => line.includes("**"))
          .map((line) => line.replace(/\*\*/g, '').replace(/:\s*$/, '').trim());

        setTasks(taskList);
        setCompletedTasks(new Array(taskList.length).fill(false));
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks(["Error loading tasks. Please try again."]);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (index) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = [...prev];
      newCompletedTasks[index] = !newCompletedTasks[index];
      return newCompletedTasks;
    });
  };

  return (
    <div className="dashboard-container">
      <div className="checklist-header">
        <span>1</span>
        <h2>10 Tasks to Help the Environment</h2>
      </div>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <button
                className={`task-button ${completedTasks[index] ? "clicked" : ""}`}
                onClick={() => handleTaskClick(index)}
              ></button>
              {task}
            </li>
          ))
        ) : (
          <p>Loading tasks...</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
