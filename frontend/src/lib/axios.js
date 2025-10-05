import axios from "axios";

const apiBaseUrl = (process.env.VITE_API_URL || "http://localhost:5001") + "/api";

const api = axios.create({
    baseURL: apiBaseUrl,
});

export default api;
