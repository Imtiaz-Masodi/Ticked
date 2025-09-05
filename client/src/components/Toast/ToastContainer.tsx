import React from "react";
import { useToast } from "../../hooks/useToast";
import ToastItem from "./ToastItem";

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-screen-sm min-w-72 sm:w-auto p-4 fixed bottom-0 right-0 sm:top-0 sm:bottom-auto z-[100] space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={hideToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
