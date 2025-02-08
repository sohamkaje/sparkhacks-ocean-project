import { useState } from "react";
import axios from "axios";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGroqResponse = async () => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      console.error("Error: API key is missing.");
      setResponse("Error: Missing API key.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        API_URL,
        {
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (res.data.choices && res.data.choices.length > 0) {
        setResponse(res.data.choices[0].message.content);
      } else {
        setResponse("No response from AI.");
      }

      console.log("API Response:", res.data);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse(error.response?.data?.error?.message || "Failed to fetch response.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Groq AI Chat</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={fetchGroqResponse} disabled={loading}>
        {loading ? "Generating..." : "Get Response"}
      </button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
}

export default App;
