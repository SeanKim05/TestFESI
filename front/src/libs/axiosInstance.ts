// lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
  }
  return config;
});

export default axiosInstance;
