import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { uploadMedia } from "../services/api";
import "../css/MediaUpload.css";

const MediaUpload = ({ refreshMedia }) => {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadMedia(formData, token);
      setFile(null);
      refreshMedia();
    } catch (error) {
      alert("Upload failed. Try again.");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
};

export default MediaUpload;
