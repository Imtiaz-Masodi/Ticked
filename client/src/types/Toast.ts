import { NotificationType } from "../components/Notification";

export interface Toast {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // in milliseconds, 0 means manual dismiss only
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: (id: string) => void;
  };
}

export interface ToastOptions {
  type?: NotificationType;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: (id: string) => void;
  };
}
