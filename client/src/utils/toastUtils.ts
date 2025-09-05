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
        action?: { label: string; onClick: (id: string) => void };
      }
    ) => {
      toast.successToast(message, {
        duration: 4000,
        action: options?.action,
      });
    },

    /**
     * Show error toast for failed API operations
     */
    apiError: (message?: string, options?: { title?: string; duration?: number }) => {
      toast.errorToast(message || "Something went wrong. Please try again.", {
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
    validationError: (message: string) => {
      toast.errorToast(message, {
        duration: 6000,
      });
    },

    /**
     * Show network error toast
     */
    networkError: () => {
      toast.errorToast("Network error. Please check your connection and try again.", {
        duration: 0,
        action: {
          label: "Retry",
          onClick: () => window.location.reload(),
        },
      });
    },

    /**
     * Show session expired toast
     */
    sessionExpired: (onLogin?: () => void) => {
      toast.warningToast("Your session has expired. Please log in again.", {
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
      toast.infoToast("A new version is available. Update now for the latest features.", {
        duration: 10000,
        action: onUpdate
          ? {
              label: "Update",
              onClick: onUpdate,
            }
          : undefined,
      });
    },
  };
};
