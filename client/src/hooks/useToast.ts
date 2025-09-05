import { useToastContext } from "./useToastContext";
import { Toast, ToastOptions } from "../types/Toast";
import { NotificationType } from "../components/Notification";
import { useCallback } from "react";

export const useToast = () => {
  const { toasts, addToast, removeToast, clearAllToasts } = useToastContext();

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const toast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: options.type || NotificationType.INFO,
      message,
      duration: options.duration !== undefined ? options.duration : 5000, // Default 5 seconds
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
      action: options.action,
    };

    addToast(toast);
  }, [addToast]);

  const hideToast = useCallback((id: string) => {
      removeToast(id);
  }, [removeToast]);

  const clearToasts = useCallback(() => {
    clearAllToasts();
  }, [clearAllToasts]);

  // Convenience methods
  const success = useCallback((message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.SUCCESS });
  }, [showToast]);

  const error = useCallback((message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.ERROR });
  }, [showToast]);

  const warning = useCallback((message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.WARNING });
  }, [showToast]);

  const info = useCallback((message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.INFO });
  }, [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    clearToasts,
    successToast: success,
    errorToast: error,
    warningToast: warning,
    infoToast: info,
  };
};
