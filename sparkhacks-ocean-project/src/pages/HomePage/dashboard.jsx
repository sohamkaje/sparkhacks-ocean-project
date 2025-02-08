import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import ProgressBar from "./progress_bar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [highlightedTask, setHighlightedTask] = useState(null);
  const [progress, setProgress] = useState(0);

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
          .map((line) =>
            line.replace(/\*\*/g, "").replace(/^\d+\.\s*/, "").trim()
          )
          .map((task) => ({ name: task, status: "INCOMPLETE" }));

        setTasks(taskList);
        setCompletedTasks(new Array(taskList.length).fill(false));
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([
          { name: "Error loading tasks. Please try again.", status: "INCOMPLETE" },
        ]);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (index) => {
  setCompletedTasks((prev) => {
    const newCompletedTasks = [...prev];
    newCompletedTasks[index] = !newCompletedTasks[index];

    // Calculate progress: 25% per completed task, max out at 100%
    const completedCount = newCompletedTasks.filter(Boolean).length;
    setProgress(Math.min(completedCount * 25, 100)); // Cap at 100%

    return newCompletedTasks;
  });

  setHighlightedTask(index);

  setTimeout(() => {
    setHighlightedTask(null);
  }, 500);
};

  const handleComplete = () => {
    const taskStatuses = tasks.map((task, index) => ({
      name: task.name,
      status: completedTasks[index] ? "COMPLETE" : "INCOMPLETE",
    }));
    console.log("Task statuses submitted:", taskStatuses);
  };

  return (
    <div className="dashboard-container">
      {/* Background Elements */}
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
      <div className="fish"></div>
      <div className="shark"></div>
      <div className="sand"></div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Task List */}
      <div className="task-list">
        <div className="checklist-header">
          <span className="checklist-number"></span>
          <h2 className="checklist-title">Daily Tasks</h2>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <button
                className={`task-button ${completedTasks[index] ? "clicked" : ""} 
                ${highlightedTask === index ? "highlight" : ""}`}
                onClick={() => handleTaskClick(index)}
              >
                {task.name}
              </button>
            </li>
          ))}
        </ol>
        {completedTasks.filter(Boolean).length >= 4 && (
          <button className="completed-button" onClick={handleComplete}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
