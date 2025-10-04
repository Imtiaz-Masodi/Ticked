import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../api/apiClient";
import { handleAuthenticationError } from "./authMiddleware";
import { handleApiError, handleApiResponseError } from "../../utils/errorUtils";
import { ApiResponse } from "../../types/ApiResponse";
import { ApiResponseStatus } from "../../utils/enums";
import { ErrorNotificationConfig } from "../../types/ApiErrorNotification";

type CustomBaseQueryType = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  meta?: {
    errorNotification?: ErrorNotificationConfig;
  };
};

export const customBaseQuery =
  (): BaseQueryFn<CustomBaseQueryType, unknown, unknown> =>
  async ({ url, method, data, params, meta }) => {
    const errorConfig = meta?.errorNotification;

    try {
      const result = await axiosInstance({ url, method, data, params });

      // Check for successful HTTP response but API failure in body
      if (result.data && typeof result.data === "object") {
        const apiResponse = result.data as ApiResponse<unknown>;

        // Handle API failure responses (status: "failed" in response body)
        if (apiResponse.status === ApiResponseStatus.failed) {
          handleApiResponseError(apiResponse, errorConfig);
        }
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      // Handle 401 Unauthorized errors
      if (err.response?.status === 401) {
        handleAuthenticationError();
      }

      // Handle error notification for HTTP errors
      handleApiError(err, errorConfig);

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
