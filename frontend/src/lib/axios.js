import axios from "axios";

const apiBaseUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`;
// use const apiBaseUrl = "http://localhost:5001/api" for local development

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;
