import axios, { AxiosError } from "axios";
import { authHelper } from "../helpers/authHelper";

// Create an Axios instance
const isProduction = process.env.NODE_ENV === 'production';
const axiosInstance = axios.create({
  baseURL: isProduction ? "https://ticked.onrender.com" : "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authHelper.getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // For 401 errors, let them through to be handled by RTK Query middleware
    if (error instanceof AxiosError && error.response?.status === 401) {
      return Promise.reject(error);
    }

    // For other errors with response data, return the response
    if (error instanceof AxiosError && error.response?.data) {
      return error.response;
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
