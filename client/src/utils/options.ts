import { PriorityType } from "../types/PriorityType";
import { Priority } from "./enums";

export const priorityOptions: readonly PriorityType[] = Object.freeze([
  { label: "Low", value: Priority.low },
  { label: "Medium", value: Priority.medium },
  { label: "High", value: Priority.high },
]);
