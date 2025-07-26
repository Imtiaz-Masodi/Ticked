import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../api/apiClient";
import { handleAuthenticationError } from "./authMiddleware";

type CustomBaseQueryType = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

export const customBaseQuery =
  (): BaseQueryFn<CustomBaseQueryType, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      // Handle 401 Unauthorized errors
      if (err.response?.status === 401) {
        handleAuthenticationError();
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
