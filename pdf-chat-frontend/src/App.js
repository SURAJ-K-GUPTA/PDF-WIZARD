import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import { fetchHistory, askQuestion, uploadFile } from "./api";

function App() {
  const [filename, setFilename] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [betterAnswer, setBetterAnswer] = useState(false);
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (filename) {
      loadHistory(filename);
    }
  }, [filename]);

  useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Set initial height on load
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadHistory = async (file) => {
    const history = await fetchHistory(file);
    setChatHistory(history);
  };

  const handleUpload = async (file) => {
    setLoading(true);
    const response = await uploadFile(file);
    setFilename(response.filename);
    setLoading(false);
  };

  const handleAskQuestion = async (question) => {
    setAsking(true);
    const response = await askQuestion(question, filename, betterAnswer);
    setChatHistory((prev) => [...prev, { question, answer: response.answer }]);
    setAsking(false);
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: `${appHeight}px` }}
    >
      <Navbar onUpload={handleUpload} filename={filename} loading={loading} />
      <Chat chatHistory={chatHistory} />
      <ChatInput
        onSubmit={handleAskQuestion}
        betterAnswer={betterAnswer}
        setBetterAnswer={setBetterAnswer}
        asking={asking}
        filename={filename}
      />
    </div>
  );
}

export default App;
