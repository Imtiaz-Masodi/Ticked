const TaskPriority = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
});

const TaskStatus = Object.freeze({
  BACKLOG: "backlog",
  TODO: "todo",
  IN_PROGRESS: "inprogress",
  COMPLETED: "completed",
});

const OtpPurpose = Object.freeze({
  REGISTRATION: "registration",
  PASSWORD_RESET: "password_reset",
});

module.exports = {
  TaskPriority,
  TaskStatus,
  OtpPurpose,
};
