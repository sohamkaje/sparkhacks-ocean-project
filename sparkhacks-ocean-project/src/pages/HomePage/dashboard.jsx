import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Dashboard.css";
import sharkSvg from "../../assets/fish-svgrepo-com.svg";
import seaweedSvg from "../../assets/seaweed-svgrepo-com.svg";
import fish from "../../assets/yellow-fish.svg";
import jellyfish from "../../assets/jellyfish-svgrepo-com.svg";
import RoamingItems from "./RoamingItems";
import ProgressBar from "./progress_bar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [highlightedTask, setHighlightedTask] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hideTrash, setHideTrash] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for popup

  const navigate = useNavigate(); // Hook for navigating
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
          name: value.name.replace(/^\d+\.\s*/, ""), 
          status: value.status,
        }));
        setTasks(userTasks);
        setCompletedTasks(userTasks.map((task) => task.status === "COMPLETE"));

        const completedCount = userTasks.filter((task) => task.status === "COMPLETE").length;
        setProgress(Math.min(completedCount * 25, 100));
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
              line.replace(/\*\*/g, "").replace(/^\d+\.\s*/, "").trim()
            )
            .map((task) => ({ name: task, status: "INCOMPLETE" }));

          setTasks(taskList);
          setCompletedTasks(new Array(taskList.length).fill(false));
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setTasks([{ name: "Error loading tasks. Please try again.", status: "INCOMPLETE" }]);
        }
      }
    };

    fetchTasks();
  }, [auth]);

  const handleTaskClick = (index) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = [...prev];
      newCompletedTasks[index] = !newCompletedTasks[index];

      const completedCount = newCompletedTasks.filter(Boolean).length;
      setProgress(Math.min(completedCount * 25, 100));

      return newCompletedTasks;
    });

    setHighlightedTask(index);

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

    setHideTrash(true); // Hide Roaming Trash Items
    setShowPopup(true); // Show Popup after completion
  };

  return (
    <div className="dashboard-container">
      {/* Background Elements */}
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
      <div className="sand"></div>

      {/* Shark and Seaweed should ALWAYS be visible */}
      <img src={sharkSvg} className="shark" alt="Swimming shark in the ocean" />
      <img src={seaweedSvg} className="seaweed seaweed-1" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-2" alt="Seaweed" />
      <img src={seaweedSvg} className="seaweed seaweed-3" alt="Seaweed" />

      {/* Keep Fish and Jellyfish Always Visible */}
      <img src={fish} className="fish" alt="Swimming Fish" />
      <img src={jellyfish} className="jellyfish" alt="Floating Jellyfish" />

      {/* Hide RoamingItems (floating trash) when the Complete button is clicked */}
      {!hideTrash && <RoamingItems />}

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Task List */}
      <div className="task-list">
        <div className="checklist-header">
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

      {/* Popup Message (Shows After Completion) */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Good Job Helping the Planet! 🌍</h2>
            <p>Wait for the next day for tasks to reset.</p>
            <button className="popup-button" onClick={() => navigate("/")}>
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
