import React from "react";

function ChatBubble({ question, answer }) {
  const aiLogo = process.env.REACT_APP_AI_LOGO;

  return (
    <div className="space-y-4 px-4 py-2">
      {/* User Question */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-purple-200 flex items-center justify-center rounded-full text-purple-600 font-bold">
          S
        </div>
        <div className="bg-white text-gray-800 px-4 py-2 rounded-lg max-w-full lg:max-w-2xl md:max-w-lg border border-gray-300 shadow-sm">
          {question}
        </div>
      </div>

      {/* AI Answer */}
      <div className="flex items-center space-x-2 justify-start">
        <img
          src={aiLogo}
          alt="AI Logo"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
        <div className="bg-white text-gray-800 px-4 py-2 rounded-lg max-w-full lg:max-w-2xl md:max-w-lg border border-gray-300 shadow-sm">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
