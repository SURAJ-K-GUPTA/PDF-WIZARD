import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

function ChatInput({ onSubmit, betterAnswer, setBetterAnswer, asking, filename }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!filename) {
      alert("Upload PDF first");
      return;
    }
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    } else {
      alert("Please enter a message");
    }
  };

  return (
    <div className="flex items-center p-2 mb-4 mx-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-100 space-x-2">
      <input
        type="text"
        placeholder="Send a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-md border-0 focus:outline-none"
      />

      <div className="flex items-center space-x-1">
        <label className="text-sm text-gray-500 flex items-center">
          <input
            type="checkbox"
            checked={betterAnswer}
            onChange={(e) => setBetterAnswer(e.target.checked)}
            className="mr-1 bg-white h-4 w-4"
          />
          <span className="hidden sm:inline">Better Answer</span>
        </label>
      </div>

      <button
        onClick={handleSend}
        className="p-2 bg-white rounded-r-md flex items-center justify-center text-gray-500 hover:bg-gray-100 transition duration-150"
        disabled={asking}
      >
        {asking ? (
          <span className="animate-spin">...</span> 
        ) : (
          <LuSendHorizonal className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default ChatInput;
