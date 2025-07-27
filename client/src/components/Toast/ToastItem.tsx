import React, { useEffect, useRef, useState, useCallback } from "react";
import { Toast as ToastType } from "../../types/Toast";
import { NotificationType } from "../Notification";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

interface ToastItemProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const typeStyles = Object.freeze({
  [NotificationType.SUCCESS]: {
    container: "bg-green-50 border-green-200 text-green-800",
    icon: "text-green-500",
    iconName: Icons.check,
  },
  [NotificationType.ERROR]: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: "text-red-500",
    iconName: Icons.error,
  },
  [NotificationType.WARNING]: {
    container: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: "text-yellow-500",
    iconName: Icons.warning,
  },
  [NotificationType.INFO]: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
    iconName: Icons.info,
  },
});

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<HTMLDivElement>(null);

  const styles = typeStyles[toast.type];

  const handleDismiss = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 300); // Match exit animation duration
  }, [toast.id, onDismiss]);

  useEffect(() => {
    // Start entrance animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10);

    // Set up auto-dismiss timer
    if (toast.duration && toast.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, toast.duration);
    }

    return () => {
      clearTimeout(enterTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [toast.duration, handleDismiss]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (toast.duration && toast.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, 1000); // Give 1 second after mouse leave
    }
  };

  return (
    <div
      className={`
        relative max-w-sm w-full border rounded-lg shadow-lg p-4 mb-3
        transform transition-all duration-300 ease-in-out box-border
        ${styles.container}
        ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100 scale-100"
            : isExiting
            ? "translate-x-full opacity-0 scale-95"
            : "translate-x-full opacity-0 scale-95"
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Progress bar for auto-dismiss */}
      {toast.duration && toast.duration > 0 ? (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b-lg overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-current opacity-30 animate-toast-progress"
            style={{
              animationDuration: `${toast.duration}ms`,
              animationPlayState: isExiting ? "paused" : "running",
            }}
          />
        </div>
      ) : null}

      <div className="flex items-start">
        {/* Icon */}
        <div className={`flex-shrink-0 ${styles.icon}`}>
          <Icon name={styles.iconName} />
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {toast.title && (
            <h4 className="font-medium text-sm mb-1">{toast.title}</h4>
          )}
          <p className="text-sm">{toast.message}</p>

          {/* Action button */}
          {toast.action && (
            <div className="mt-2">
              <button
                onClick={toast.action.onClick}
                className="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close button */}
        {toast.dismissible && (
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="rounded-md inline-flex text-current hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current p-1"
              aria-label="Dismiss notification"
            >
              <Icon name={Icons.close} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastItem;
