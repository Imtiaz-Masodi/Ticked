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

module.exports = {
  TaskPriority,
  TaskStatus,
};
