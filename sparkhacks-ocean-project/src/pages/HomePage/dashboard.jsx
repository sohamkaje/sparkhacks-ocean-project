import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [highlightedTask, setHighlightedTask] = useState(null);

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const hardcodedPrompt = "Give 10 Specific things I can do to help the environment";
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = ref(db, `users/${user.uid}/tasks`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userTasks = Object.entries(snapshot.val()).map(([key, value]) => ({
          name: value.name,
          status: value.status,
        }));
        setTasks(userTasks);
        setCompletedTasks(userTasks.map((task) => task.status === "COMPLETE"));
      } else {
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
              line.replace(/\*\*/g, "").replace(/:\s*$/, "").trim()
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
      }
    };

    fetchTasks();
  }, [auth]);

  const handleTaskClick = (index) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = [...prev];
      newCompletedTasks[index] = !newCompletedTasks[index];
      return newCompletedTasks;
    });

    // Apply highlight class
    setHighlightedTask(index);

    // Remove highlight after animation completes (500ms)
    setTimeout(() => {
      setHighlightedTask(null);
    }, 500);
  };

  const handleComplete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const taskStatuses = tasks.reduce((acc, task, index) => {
      acc[`task${index + 1}`] = {
        name: task.name,
        status: completedTasks[index] ? "COMPLETE" : "INCOMPLETE",
      };
      return acc;
    }, {});

    await set(ref(db, `users/${user.uid}/tasks`), taskStatuses);
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

      {/* Task List */}
      <div className="task-list">
        <div className="checklist-header">
          <span className="checklist-number">1</span>
          <h2 className="checklist-title">10 Tasks to Help the Environment</h2>
        </div>
        <ul>
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
        </ul>
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
