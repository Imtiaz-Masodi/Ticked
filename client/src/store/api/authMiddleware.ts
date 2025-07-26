import { authHelper } from "../../helpers/authHelper";
import { EVENT_AUTH_EXPIRED } from "../../utils/constants";

// This is a utility to handle authentication redirects
// It will be called from customBaseQuery when a 401 error occurs
export const handleAuthenticationError = () => {
  // Clear the stored token
  authHelper.removeUserToken();

  // Create a custom event with session expiry information
  const event = new CustomEvent(EVENT_AUTH_EXPIRED, {
    detail: {
      message: "Your session has expired. Please login again.",
      timestamp: new Date().toISOString(),
    },
  });

  // Dispatch the event to notify the app
  window.dispatchEvent(event);
};
