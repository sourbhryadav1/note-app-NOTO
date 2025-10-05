import axios from "axios";

const apiBaseUrl = `${import.meta.env.VITE_API_URL}/api`;
// const apiBaseUrl = "http://localhost:5001/api";  // use for local development
const api = axios.create({
  baseURL: apiBaseUrl,
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
