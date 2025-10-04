import { RTKQueryError } from "../../utils/errorUtils";

export type ApiErrorStateProps = {
  error: RTKQueryError; // The RTK Query error object
  title?: string; // Custom title for the error state
  message?: string; // Custom message for the error state
  onRetry?: () => void; // Custom retry function
  showBackButton?: boolean; // Whether to show the back button - default true
  showHomeButton?: boolean; // Whether to show the home button - default true
  className?: string; // Custom CSS classes
  showRetryButton?: boolean; // Whether to show the retry button - default true
};
