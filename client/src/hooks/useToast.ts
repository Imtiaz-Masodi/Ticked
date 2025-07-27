import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addToast,
  removeToast,
  clearAllToasts,
} from "../store/slices/toastSlice";
import { Toast, ToastOptions } from "../types/Toast";
import { NotificationType } from "../components/Notification";

export const useToast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const showToast = (message: string, options: ToastOptions = {}) => {
    const toast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: options.type || NotificationType.INFO,
      title: options.title,
      message,
      duration: options.duration !== undefined ? options.duration : 5000, // Default 5 seconds
      dismissible:
        options.dismissible !== undefined ? options.dismissible : true,
      action: options.action,
    };

    dispatch(addToast(toast));
  };

  const hideToast = (id: string) => {
    dispatch(removeToast(id));
  };

  const clearToasts = () => {
    dispatch(clearAllToasts());
  };

  // Convenience methods
  const success = (message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.SUCCESS });
  };

  const error = (message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.ERROR });
  };

  const warning = (message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.WARNING });
  };

  const info = (message: string, options?: Omit<ToastOptions, "type">) => {
    showToast(message, { ...options, type: NotificationType.INFO });
  };

  return {
    toasts,
    showToast,
    hideToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
};
