export enum Size {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

export enum StatusType {
  all = "all",
  active = "active",
  completed = "completed",
  backlog = "backlog",
}

export enum ApiResponseStatus {
  success = "success",
  failed = "failed",
}

export enum TaskStatus {
  backlog = "backlog",
  todo = "todo",
  inprogress = "inprogress",
  completed = "completed",
}

export enum TaskStatusLabel {
  backlog = "Backlog",
  todo = "To Do",
  inprogress = "In Progress",
  completed = "Completed",
}

export enum OtpPurpose {
  REGISTRATION = "registration",
  PASSWORD_RESET = "password_reset",
}

export enum ForgotPasswordStage {
  REQUEST = "REQUEST",
  VERIFY = "VERIFY",
  RESET = "RESET",
  DONE = "DONE",
}

export interface RelativeDateResult {
  dateString: string;
  timeString: string;
  dateTimeString: string;
  timeComparison: -1 | 0 | 1; // -1: past, 0: current date, 1: future
}

/**
 * Common breakpoints for responsive design
 */
export enum Breakpoints {
  MOBILE = 768,
  TABLET = 1024,
  DESKTOP = 1280,
  LARGE_DESKTOP = 1536,
}

/**
 * Device type enum
 */
export enum DeviceType {
  HANDHELD = "handheld",
  DESKTOP = "desktop",
  DESKTOP_WITH_TOUCH = "desktop-with-touch",
}
