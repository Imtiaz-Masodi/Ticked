import { authHelper } from "../helpers/authHelper";
import { LoginFormValues } from "../sections/LoginForm";
import { RegistrationFormValues } from "../sections/RegistrationForm";
import { ApiResponse } from "../types/ApiResponse";
import { LoginResponseType } from "../types/LoginResponseType";
import { RegistrationResponseType } from "../types/RegistrationResponseType";
import { ServiceReturnType } from "../types/ServiceReturnType";
import { ApiResponseStatus } from "../utils/enums";
import { axiosInstance } from "./apiClient";

async function login(
  requestPayload: LoginFormValues
): Promise<ServiceReturnType> {
  try {
    const response = await axiosInstance.post<ApiResponse<LoginResponseType>>(
      "/account/signin",
      requestPayload
    );
    const { status, message, payload } = response.data;
    if (status === ApiResponseStatus.success && payload?.authToken) {
      authHelper.saveUserToken(payload.authToken);
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

async function register(
  requestPayload: Omit<RegistrationFormValues, "retypePassword">
): Promise<ServiceReturnType<RegistrationResponseType>> {
  try {
    const response = await axiosInstance.post<
      ApiResponse<RegistrationResponseType>
    >("/account/signup", requestPayload);
    const { status, message, payload } = response.data;
    if (status === ApiResponseStatus.success && payload?.user) {
      authHelper.saveUserToken(payload.authToken);
      return { success: true, message, payload };
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
  register,
};
