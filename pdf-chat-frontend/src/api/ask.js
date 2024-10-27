// src/api/ask.js

export const askQuestion = async (question, fileName, betterAnswer = false) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, file_name: fileName, better_answer: betterAnswer }),
    });
  
    if (!response.ok) {
      throw new Error("Error asking question.");
    }
  
    return await response.json();
  };
  