import React, { createContext, useReducer, ReactNode, useMemo, useCallback, useEffect } from "react";
import { Toast } from "../types/Toast";
import { ERROR_NOTIFICATION_EVENT } from "../utils/errorUtils";

// Action types
type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: string }
  | { type: "CLEAR_ALL_TOASTS" };

// State interface
interface ToastState {
  toasts: Toast[];
}

// Context interface
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Initial state
const initialState: ToastState = {
  toasts: [],
};

// Reducer function
const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST": {
      // Limit to maximum 5 toasts at once
      const newToasts =
        state.toasts.length >= 5 ? [...state.toasts.slice(1), action.payload] : [...state.toasts, action.payload];
      return {
        ...state,
        toasts: newToasts,
      };
    }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    case "CLEAR_ALL_TOASTS":
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
};

// Create context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider component
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = useCallback((toast: Toast) => {
    dispatch({ type: "ADD_TOAST", payload: toast });
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  }, []);

  const clearAllToasts = useCallback(() => {
    dispatch({ type: "CLEAR_ALL_TOASTS" });
  }, []);

  useEffect(() => {
    const listener = (event: Event) => {
      const { errorMessage, notificationType } = (event as CustomEvent).detail;
      addToast({
        id: Date.now().toString(),
        message: errorMessage,
        type: notificationType,
        duration: 3000,
        dismissible: true,
      });
    };
    document.addEventListener(ERROR_NOTIFICATION_EVENT, listener);

    return () => {
      document.removeEventListener(ERROR_NOTIFICATION_EVENT, listener);
    };
  }, [addToast]);

  const value: ToastContextType = useMemo(
    () => ({
      toasts: state.toasts,
      addToast,
      removeToast,
      clearAllToasts,
    }),
    [state.toasts, addToast, removeToast, clearAllToasts]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export { ToastContext };
