import axios, { AxiosError } from "axios";
import { authHelper } from "../helpers/authHelper";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://task-management-app-54i1.onrender.com",
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
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
    if (error instanceof AxiosError && error.response?.data) {
      return error.response;
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
