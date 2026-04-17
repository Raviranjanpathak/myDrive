import axios from "axios";

const API = axios.create({
   baseURL: "https://mydrive-z0ca.onrender.com/api",
   imeout: 5000
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;