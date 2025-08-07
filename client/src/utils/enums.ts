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

/**
 * Common breakpoints for responsive design
 */
export enum Breakpoints {
  MOBILE = 768,
  TABLET = 1024,
  DESKTOP = 1280,
  LARGE_DESKTOP = 1536,
}
