import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiResponse } from "../types/ApiResponse";
import { ApiResponseStatus } from "./enums";
import { NotificationType } from "../components/Notification";
import { ErrorNotificationConfig, DEFAULT_ERROR_NOTIFICATION_CONFIG } from "../types/ApiErrorNotification";

/**
 * Type for RTK Query error objects
 */
export type RTKQueryError = FetchBaseQueryError | SerializedError;

/**
 * Type for parsed error information
 */
interface ParsedError {
  message: string;
  status?: number;
  isApiFailure: boolean;
  originalError: RTKQueryError;
}

/**
 * Default error messages for common HTTP status codes
 */
const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request. Please check your input and try again.",
  401: "You are not authorized to access this resource. Please log in again.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  408: "Request timeout. Please try again.",
  409: "There was a conflict with your request. Please try again.",
  422: "The data you provided is invalid. Please check and try again.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Internal server error. Please try again later.",
  502: "Service temporarily unavailable. Please try again later.",
  503: "Service temporarily unavailable. Please try again later.",
  504: "Gateway timeout. Please try again later.",
};

/**
 * Parse RTK Query error and extract meaningful information
 * Follows the backend response format: { status: "success" | "failed", message: string, payload?: any }
 */
export function parseRTKQueryError(error: RTKQueryError): ParsedError {
  // Handle FetchBaseQueryError (HTTP errors)
  if ("status" in error) {
    const status = typeof error.status === "number" ? error.status : undefined;

    // Check if error.data has the standard API response format
    if (error.data && typeof error.data === "object") {
      const apiResponse = error.data as ApiResponse<unknown>;

      // If the response follows our standard format and has failed status
      if (apiResponse.status === ApiResponseStatus.failed && apiResponse.message) {
        return {
          message: apiResponse.message,
          status,
          isApiFailure: true,
          originalError: error,
        };
      }

      // If it's an object but doesn't follow standard format, try to extract message
      if ("message" in apiResponse && typeof apiResponse.message === "string") {
        return {
          message: apiResponse.message,
          status,
          isApiFailure: false,
          originalError: error,
        };
      }
    }

    // Fall back to default error messages based on status code
    if (status && DEFAULT_ERROR_MESSAGES[status]) {
      return {
        message: DEFAULT_ERROR_MESSAGES[status],
        status,
        isApiFailure: false,
        originalError: error,
      };
    }

    // Generic error based on status
    return {
      message: `Request failed with status ${status || "unknown"}. Please try again.`,
      status,
      isApiFailure: false,
      originalError: error,
    };
  }

  if (error.code === "ERR_NETWORK") {
    return {
      message: "Network error. Please check your connection.",
      isApiFailure: false,
      originalError: error,
    };
  }

  // Handle SerializedError (network errors, etc.)
  if ("message" in error && error.message) {
    return {
      message: error.message,
      isApiFailure: false,
      originalError: error,
    };
  }

  // Fallback for unknown error formats
  return {
    message: "An unexpected error occurred. Please try again.",
    isApiFailure: false,
    originalError: error,
  };
}

/**
 * Extract user-friendly error message from RTK Query error
 */
export function getErrorMessage(error: RTKQueryError): string {
  return parseRTKQueryError(error).message;
}

/**
 * Check if the error is due to network/connectivity issues
 */
export function isNetworkError(error: RTKQueryError): boolean {
  if ("status" in error) {
    return error.status === "FETCH_ERROR" || error.status === "TIMEOUT_ERROR";
  }

  if ("message" in error && error.message) {
    const message = error.message.toLowerCase();
    return (
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("timeout") ||
      message.includes("connection")
    );
  }

  return false;
}

/**
 * Check if the error is due to authentication issues
 */
export function isAuthError(error: RTKQueryError): boolean {
  if ("status" in error) {
    return error.status === 401;
  }
  return false;
}

/**
 * Check if the error is due to authorization/permission issues
 */
export function isPermissionError(error: RTKQueryError): boolean {
  if ("status" in error) {
    return error.status === 403;
  }
  return false;
}

/**
 * Check if the error indicates resource not found
 */
export function isNotFoundError(error: RTKQueryError): boolean {
  if ("status" in error) {
    return error.status === 404;
  }
  return false;
}

/**
 * Check if the error indicates validation/bad request
 */
export function isValidationError(error: RTKQueryError): boolean {
  if ("status" in error) {
    return error.status === 400 || error.status === 422;
  }
  return false;
}

/**
 * Check if the error indicates server error
 */
export function isServerError(error: RTKQueryError): boolean {
  if ("status" in error && typeof error.status === "number") {
    return error.status >= 500;
  }
  return false;
}

/**
 * Check if error is RTK Query error (moved from errorNotificationService)
 */
export function isRTKQueryError(error: unknown): error is RTKQueryError {
  return typeof error === "object" && error !== null && (("status" in error && "data" in error) || "message" in error);
}

/**
 * Extract error message from various error types
 */
export function extractErrorMessage(error: unknown, customMessage?: string, showHttpErrors: boolean = true): string {
  // Use custom error message if provided
  if (customMessage) {
    return customMessage;
  }

  // Handle RTK Query errors
  if (isRTKQueryError(error)) {
    const parsedError = parseRTKQueryError(error);

    // Check if we should show HTTP errors
    if (parsedError.status && !showHttpErrors) {
      return "";
    }

    return parsedError.message;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Handle objects with message property
  if (typeof error === "object" && error !== null && "message" in error) {
    const errorObj = error as { message: unknown };
    if (typeof errorObj.message === "string") {
      return errorObj.message;
    }
  }

  // Fallback error message
  return "An unexpected error occurred. Please try again.";
}

// ===== ERROR NOTIFICATION FUNCTIONS =====

/**
 * Event name for error notifications
 */
export const ERROR_NOTIFICATION_EVENT = "error_notification";

/**
 * Handle API response errors and show appropriate notifications
 */
export const handleApiError = (error: unknown, config: ErrorNotificationConfig = {}): void => {
  const finalConfig = { ...DEFAULT_ERROR_NOTIFICATION_CONFIG, ...config };

  // If error notifications are disabled, return early
  if (!finalConfig.showErrorToast) {
    return;
  }

  // If custom error handler is provided, use it instead
  if (finalConfig.onError) {
    const errorMessage = extractErrorMessage(error, finalConfig.customErrorMessage, finalConfig.showHttpErrors);
    finalConfig.onError(error, errorMessage);
    return;
  }

  const errorMessage = extractErrorMessage(error, finalConfig.customErrorMessage, finalConfig.showHttpErrors);

  if (errorMessage) {
    dispatchErrorNotificationEvent(errorMessage, finalConfig.errorToastType);
  }
};

/**
 * Handle successful API responses that might contain error status
 */
export const handleApiResponseError = (response: ApiResponse<unknown>, config: ErrorNotificationConfig = {}): void => {
  const finalConfig = { ...DEFAULT_ERROR_NOTIFICATION_CONFIG, ...config };

  // Check if we should handle API failures
  if (!finalConfig.showApiFailures || !finalConfig.showErrorToast) {
    return;
  }

  // Check if response indicates failure
  if (response.status === ApiResponseStatus.failed && response.message) {
    if (finalConfig.onError) {
      finalConfig.onError(response, response.message);
      return;
    }

    const errorMessage = finalConfig.customErrorMessage || response.message;
    dispatchErrorNotificationEvent(errorMessage, finalConfig.errorToastType);
  }
};

/**
 * Dispatch error notification event
 */
const dispatchErrorNotificationEvent = (message: string, type: NotificationType): void => {
  const errorEvent = new CustomEvent(ERROR_NOTIFICATION_EVENT, {
    detail: {
      notificationType: type,
      errorMessage: message,
    },
  });
  document.dispatchEvent(errorEvent);
};
