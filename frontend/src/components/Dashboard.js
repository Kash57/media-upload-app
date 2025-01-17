import React, { useEffect, useState, useContext } from "react";
import MediaUpload from "./MediaUpload";
import MediaGallery from "./MediaGallery";
import AuthContext from "../context/AuthContext";
import { fetchUserMedia } from "../services/api";
import "../css/Dashboard.css";

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [media, setMedia] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetchUserMedia(token);
      console.log("API Response:", response);
      setMedia(response.files);
    } catch (error) {
      alert("Failed to load media.");
    }
  };

  useEffect(() => {
    if (token) {
      loadMedia();
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}</h1>
        <p>Email: {user?.email}</p>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Media Upload</h2>
        <MediaUpload refreshMedia={loadMedia} />
      </div>

      <div className="dashboard-section">
        <h2>Your Media Gallery</h2>
        <MediaGallery media={media} />
      </div>
    </div>
  );
};

export default Dashboard;
