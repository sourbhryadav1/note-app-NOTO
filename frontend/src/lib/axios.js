import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/api",  // base url for all the requests
});

export default api;