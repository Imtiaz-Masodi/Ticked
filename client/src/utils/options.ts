import { PriorityType } from "../types/PriorityType";
import { Priority } from "./enums";

export const priorityOptions: readonly PriorityType[] = Object.freeze([
  { label: "Low", value: Priority.low },
  { label: "Medium", value: Priority.medium },
  { label: "High", value: Priority.high },
]);

export const priorityColorMap: Record<Priority, string> = Object.freeze({
  [Priority.low]: "#4CAF50", // Green
  [Priority.medium]: "#FF9800", // Orange
  [Priority.high]: "#F44336", // Red
});
