// src/api/upload.js

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Error uploading file.");
    }
  
    return await response.json();
  };
  