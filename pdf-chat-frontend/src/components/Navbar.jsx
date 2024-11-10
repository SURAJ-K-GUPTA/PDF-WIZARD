import React, { useState } from "react";
import { FiFile, FiPlusCircle } from "react-icons/fi";

function Navbar({ onUpload, filename, loading }) {
  const aiLogo = process.env.REACT_APP_AI_LOGO;

  const [prevFile, setPrevFile] = useState(null); // Track the previous file

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file !== prevFile) {
      // Check if a file is selected and if it's different from the previous one
      setPrevFile(file); // Update the previous file
      onUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        {/* Logo and Title */}
        <img
          src={aiLogo}
          alt="Logo"
          className="h-8 w-8"
        />
        <div className="text-lg font-semibold text-gray-800">PDF WIZARD</div>
        
      </div>

      <div className="flex items-center space-x-4">
        {/* Display filename if a file is uploaded */}
        {filename && (
          <div className="flex items-center text-green-600 space-x-1">
            <FiFile className="h-5 w-5" />
            <span className="text-sm truncate">{filename}</span>
          </div>
        )}

        {/* Upload button */}
        <label className="flex items-center cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-sm bg-gray-200 px-4 py-1 rounded-md hidden md:flex items-center space-x-1 hover:bg-gray-300 transition">
            {/* Full button for larger screens */}
            {loading ? "Uploading..." : (
              <>
                <FiPlusCircle className="h-5 w-5" />
                <span>Upload PDF</span>
              </>
            )}
          </span>
          {/* Icon-only button for small screens */}
          <div className="md:hidden flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 hover:bg-gray-100 transition">
            {loading ? (
              <div className="animate-spin">...</div> // Replace with spinner if desired
            ) : (
              <FiPlusCircle className="text-gray-600 h-6 w-6" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
