import {
  DEFAULT_ERROR_NOTIFICATION_CONFIG,
  ErrorNotificationConfig,
  QueryMetaWithErrorNotification,
} from "../types/ApiErrorNotification";

/**
 * Utility functions for configuring error notifications in RTK Query endpoints
 */

export function withErrorNotification(config: Partial<ErrorNotificationConfig> = {}): QueryMetaWithErrorNotification {
  return {
    meta: {
      errorNotification: {
        ...DEFAULT_ERROR_NOTIFICATION_CONFIG,
        ...config,
        showErrorToast: true,
      } as ErrorNotificationConfig,
    },
  };
}
