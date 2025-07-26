import { AUTH_TOKEN } from "../utils/constants";

function getUserToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN);
}

function saveUserToken(token: string = ""): void {
  localStorage.setItem(AUTH_TOKEN, token);
}

function removeUserToken(): void {
  localStorage.removeItem(AUTH_TOKEN);
}

function isUserLoggedIn(): boolean {
  const token = localStorage.getItem(AUTH_TOKEN);
  return !!token && !isTokenExpired(token);
}

function isTokenExpired(token: string): boolean {
  if (!token) {
    return true; // No token means expired/invalid
  }

  try {
    // Decode JWT token payload (without verification)
    const base64Payload = token.split(".")[1];
    if (!base64Payload) {
      return true; // Invalid token format
    }

    const payload = JSON.parse(atob(base64Payload));

    // Check if token has expiration time
    if (!payload.exp) {
      return false; // No expiration time, assume valid
    }

    // Compare expiration time with current time
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    // If there's any error decoding the token, consider it expired
    return true;
  }
}

export const authHelper = {
  getUserToken,
  saveUserToken,
  removeUserToken,
  isUserLoggedIn,
  isTokenExpired,
};
