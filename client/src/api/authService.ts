import { LoginFormValues } from "../sections/Login/Login.types";
import { ApiResponse } from "../types/ApiResponse";
import { LoginResponseType } from "../types/LoginResponseType";
import { AUTH_TOKEN } from "../utils/constants";
import { ApiResponseStatus } from "../utils/enums";
import { axiosInstance } from "./apiClient";

type LoginReturnType = {
  success: boolean;
  message?: string;
};

async function login(
  requestPayload: LoginFormValues
): Promise<LoginReturnType> {
  try {
    const response = await axiosInstance.post<ApiResponse<LoginResponseType>>(
      "/account/signin",
      requestPayload
    );
    const { status, message, payload } = response.data;
    if (status == ApiResponseStatus.success && payload?.authToken) {
      localStorage.setItem(AUTH_TOKEN, payload.authToken);
      return { success: true };
    } else {
      return { success: false, message };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export const authService = {
  login,
};
