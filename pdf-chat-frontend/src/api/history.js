// src/api/history.js

export const fetchHistory = async (filename) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/history/${filename}`);
  
    if (!response.ok) {
      throw new Error("Error fetching history.");
    }
  
    return await response.json();
  };
  