import { NotificationType } from "../components/Notification";

export interface Toast {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number; // in milliseconds, 0 means manual dismiss only
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastOptions {
  type?: NotificationType;
  title?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}
