import axios from "axios";

const api = axios.create({
  // Point to backend API root so calls like "/auth/register" work
  baseURL: "http://localhost:5000/api",
});

export default api;
