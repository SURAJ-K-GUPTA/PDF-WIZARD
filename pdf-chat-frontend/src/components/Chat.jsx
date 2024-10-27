import React, { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";

function Chat({ chatHistory }) {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory]); // Trigger the effect whenever chatHistory updates

  return (
    <div
      ref={chatWindowRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-10rem)]"
    >
      {chatHistory.map((chat, index) => (
        <ChatBubble key={index} question={chat.question} answer={chat.answer} />
      ))}
    </div>
  );
}

export default Chat;
