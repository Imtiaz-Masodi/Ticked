import { NotificationType } from "../components/Notification";

/**
 * Configuration for controlling error notifications in RTK Query
 */
export interface ErrorNotificationConfig {
  /**
   * Whether to show error notifications for this request
   * @default false
   */
  showErrorToast?: boolean;

  /**
   * Custom error message to show instead of the default
   */
  customErrorMessage?: string;

  /**
   * Toast type for error notifications
   * @default NotificationType.ERROR
   */
  errorToastType?: NotificationType;

  /**
   * Whether to show notification for HTTP errors (non-200 status codes)
   * @default true
   */
  showHttpErrors?: boolean;

  /**
   * Whether to show notification for API failures (status: "failed" in response body)
   * @default true
   */
  showApiFailures?: boolean;

  /**
   * Custom callback to handle errors instead of showing toast
   */
  onError?: (error: unknown, errorMessage: string) => void;
}

/**
 * Extended query/mutation meta with error notification configuration
 */
export interface QueryMetaWithErrorNotification {
  meta?: {
    errorNotification?: ErrorNotificationConfig;
  };
}

/**
 * Default error notification configuration
 */
export const DEFAULT_ERROR_NOTIFICATION_CONFIG: Required<Omit<ErrorNotificationConfig, "onError">> &
  Pick<ErrorNotificationConfig, "onError"> = {
  showErrorToast: false,
  customErrorMessage: "",
  errorToastType: NotificationType.ERROR,
  showHttpErrors: true,
  showApiFailures: true,
};
