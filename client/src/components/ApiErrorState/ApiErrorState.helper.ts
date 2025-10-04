import {
  isNetworkError,
  isAuthError,
  isPermissionError,
  isServerError,
  isNotFoundError,
  RTKQueryError,
  parseRTKQueryError,
} from "../../utils/errorUtils";
import { Icons } from "../Icon/IconMap";

// Determine error type and appropriate UI
export const getErrorConfig = (error: RTKQueryError) => {
  if (isNetworkError(error)) {
    return {
      icon: Icons.cloudOff,
      iconColor: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      defaultTitle: "Connection Error",
      defaultMessage: "Please check your internet connection and try again.",
      defaultRetry: true,
    };
  }

  if (isAuthError(error)) {
    return {
      icon: Icons.account,
      iconColor: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      defaultTitle: "Authentication Required",
      defaultMessage: "Please log in to access this resource.",
      defaultRetry: false,
    };
  }

  if (isPermissionError(error)) {
    return {
      icon: Icons.warning,
      iconColor: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      defaultTitle: "Access Denied",
      defaultMessage: "You don't have permission to access this resource.",
      defaultRetry: false,
    };
  }

  if (isNotFoundError(error)) {
    return {
      icon: Icons.info,
      iconColor: "text-gray-500 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-900/30",
      defaultTitle: "Not Found",
      defaultMessage: "The requested resource was not found.",
      defaultRetry: false,
    };
  }

  if (isServerError(error)) {
    return {
      icon: Icons.error,
      iconColor: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      defaultTitle: "Server Error",
      defaultMessage: "Something went wrong on our end. Please try again later.",
      defaultRetry: true,
    };
  }

  // Default error config
  const parsedError = parseRTKQueryError(error);
  return {
    icon: Icons.warning,
    iconColor: "text-red-500 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    defaultTitle: "Error",
    defaultMessage: parsedError.message,
    defaultRetry: true,
  };
};
