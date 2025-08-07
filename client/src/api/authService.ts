import { authHelper } from "../helpers/authHelper";
import { LoginFormValues } from "../sections/LoginForm";
import { RegistrationFormValues } from "../sections/RegistrationForm";
import { AccountVerificationResponseType } from "../types/AccountVerificationResponseType";
import { ApiResponse } from "../types/ApiResponse";
import { LoginResponseType } from "../types/LoginResponseType";
import { ServiceReturnType } from "../types/ServiceReturnType";
import { ApiResponseStatus } from "../utils/enums";
import { axiosInstance } from "./apiClient";

async function login(requestPayload: LoginFormValues): Promise<ServiceReturnType> {
  try {
    const response = await axiosInstance.post<ApiResponse<LoginResponseType>>("/account/signin", requestPayload);
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
): Promise<ServiceReturnType<undefined>> {
  try {
    const response = await axiosInstance.post<ApiResponse<undefined>>("/account/signup", requestPayload);
    const { status, message, payload } = response.data;
    if (status === ApiResponseStatus.success) {
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

async function verifyEmail({ email, otp }: { email: string; otp: string }): Promise<ServiceReturnType> {
  try {
    const requestPayload = { email, otp };
    const response = await axiosInstance.post<ApiResponse<AccountVerificationResponseType>>(
      "/account/verify",
      requestPayload
    );
    const { status, message, payload } = response.data;
    if (status === ApiResponseStatus.success) {
      if (payload?.authToken) authHelper.saveUserToken(payload.authToken);
      return { success: true, message };
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

async function resendOTP(requestPayload: { email: string }): Promise<ServiceReturnType> {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>("/account/resend-otp", requestPayload);
    const { status, message } = response.data;
    if (status === ApiResponseStatus.success) {
      return { success: true, message };
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
  verifyEmail,
  resendOTP,
};
