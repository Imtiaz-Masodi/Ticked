import { AUTH_TOKEN } from "../utils/constants";

function getUserToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN);
}

function saveUserToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN, token);
}

function removeUserToken(): void {
  localStorage.removeItem(AUTH_TOKEN);
}

function isUserLoggedIn(): boolean {
  const token = localStorage.getItem(AUTH_TOKEN);
  return !!token;
}

export const authHelper = {
  getUserToken,
  saveUserToken,
  removeUserToken,
  isUserLoggedIn,
};
