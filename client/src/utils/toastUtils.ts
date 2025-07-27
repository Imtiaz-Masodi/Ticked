import { useToast } from "../hooks/useToast";
import { NotificationType } from "../components/Notification";

/**
 * Utility functions for common toast patterns
 */

export const useApiToast = () => {
  const toast = useToast();

  return {
    /**
     * Show success toast for successful API operations
     */
    apiSuccess: (
      message: string,
      options?: {
        title?: string;
        action?: { label: string; onClick: () => void };
      }
    ) => {
      toast.success(message, {
        title: options?.title || "Success",
        duration: 4000,
        action: options?.action,
      });
    },

    /**
     * Show error toast for failed API operations
     */
    apiError: (
      message?: string,
      options?: { title?: string; duration?: number }
    ) => {
      toast.error(message || "Something went wrong. Please try again.", {
        title: options?.title || "Error",
        duration: options?.duration || 0, // Manual dismiss for errors
      });
    },

    /**
     * Show loading toast (typically used with manual dismissal)
     */
    apiLoading: (message: string = "Loading...") => {
      const toastData = {
        id: `loading-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: NotificationType.INFO,
        message,
        duration: 0, // Manual dismiss
        dismissible: false,
      };

      toast.showToast(message, {
        type: NotificationType.INFO,
        duration: 0,
        dismissible: false,
      });

      return toastData.id;
    },

    /**
     * Show validation error toast
     */
    validationError: (message: string, field?: string) => {
      toast.error(message, {
        title: field ? `${field} Error` : "Validation Error",
        duration: 6000,
      });
    },

    /**
     * Show network error toast
     */
    networkError: () => {
      toast.error(
        "Network error. Please check your connection and try again.",
        {
          title: "Connection Error",
          duration: 0,
          action: {
            label: "Retry",
            onClick: () => window.location.reload(),
          },
        }
      );
    },

    /**
     * Show session expired toast
     */
    sessionExpired: (onLogin?: () => void) => {
      toast.warning("Your session has expired. Please log in again.", {
        title: "Session Expired",
        duration: 0,
        action: onLogin
          ? {
              label: "Login",
              onClick: onLogin,
            }
          : undefined,
      });
    },

    /**
     * Show update available toast
     */
    updateAvailable: (onUpdate?: () => void) => {
      toast.info(
        "A new version is available. Update now for the latest features.",
        {
          title: "Update Available",
          duration: 10000,
          action: onUpdate
            ? {
                label: "Update",
                onClick: onUpdate,
              }
            : undefined,
        }
      );
    },
  };
};
