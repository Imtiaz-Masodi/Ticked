import { PriorityType } from "../types/PriorityType";
import { Priority, TaskStatus, TaskStatusLabel } from "./enums";

export const priorityOptions: readonly PriorityType[] = Object.freeze([
  { label: "Low", value: Priority.low },
  { label: "Medium", value: Priority.medium },
  { label: "High", value: Priority.high },
]);

export const statusOptions = Object.freeze([
  { label: TaskStatusLabel.backlog, value: TaskStatus.backlog },
  { label: TaskStatusLabel.todo, value: TaskStatus.todo },
  { label: TaskStatusLabel.inprogress, value: TaskStatus.inprogress },
  { label: TaskStatusLabel.completed, value: TaskStatus.completed },
]);

export const priorityColorMap: Record<Priority, string> = Object.freeze({
  [Priority.low]: "#4CAF50", // Green
  [Priority.medium]: "#FF9800", // Orange
  [Priority.high]: "#F44336", // Red
});

export const statusColorMap: Record<TaskStatus, string> = Object.freeze({
  [TaskStatus.backlog]: "#6B7280", // Gray
  [TaskStatus.todo]: "#3B82F6", // Blue
  [TaskStatus.inprogress]: "#F59E0B", // Yellow/Orange
  [TaskStatus.completed]: "#10B981", // Green
});

export const statusBadgeClasses: Record<TaskStatus, string> = Object.freeze({
  [TaskStatus.backlog]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  [TaskStatus.todo]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  [TaskStatus.inprogress]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  [TaskStatus.completed]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
});
