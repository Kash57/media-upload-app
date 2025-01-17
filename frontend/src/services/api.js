import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Google Login API
export const googleLogin = (idToken, refreshToken) =>
  API.post("/auth/google-login", { id_token: idToken, refresh_token: refreshToken });

// Media Upload API
export const uploadMedia = (file, token) =>
  API.post("/media/upload", file, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// Fetch User Media API
export const fetchUserMedia = async (token) => {
  const response = await fetch("http://localhost:5000/api/media/media", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }

  const data = await response.json();
  return data;
};

