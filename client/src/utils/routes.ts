/**
 * Application route constants
 * Following industry standards for centralized route management
 */

// Authentication Routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

// Main Application Routes
export const APP_ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  CATEGORIES: "/categories",
  NOT_FOUND: "*",
} as const;

// Task Related Routes
export const TASK_ROUTES = {
  // Task listing with status filtering
  TASKS_BY_STATUS: "/tasks/:statusType",
  TASKS_ALL: "/tasks/all",
  TASKS_ACTIVE: "/tasks/active",
  TASKS_BACKLOG: "/tasks/backlog",
  TASKS_COMPLETED: "/tasks/completed",

  // Individual task operations
  TASK_VIEW: "/task/:taskId",
  TASK_NEW: "/task/new",
} as const;

// Helper functions to generate dynamic routes
export const ROUTE_BUILDERS = {
  /**
   * Generate task view route with specific task ID
   */
  taskView: (taskId: string) => `/task/${taskId}`,

  /**
   * Generate tasks listing route with specific status
   */
  tasksByStatus: (status: string) => `/tasks/${status}`,

  /**
   * Generate verify email route with email parameter
   */
  verifyEmail: (email?: string, generate?: boolean) => {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    if (generate) params.set("generate", "1");
    const queryString = params.toString();
    return `${AUTH_ROUTES.VERIFY_EMAIL}${queryString ? `?${queryString}` : ""}`;
  },
} as const;

// All routes combined for easy access
export const ROUTES = {
  ...AUTH_ROUTES,
  ...APP_ROUTES,
  ...TASK_ROUTES,
} as const;

// Type for route values
export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
