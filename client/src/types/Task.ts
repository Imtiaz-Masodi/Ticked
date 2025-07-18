import { Priority, TaskStatus } from "../utils/enums";
import { User } from "./User";

export type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdOn: string;
  updatedOn?: string;
  dueDate?: string;
  priority: Priority;
  categoryId: string;
  status: TaskStatus;
  user: User;
};
