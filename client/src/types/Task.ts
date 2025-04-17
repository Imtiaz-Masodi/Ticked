import { Priority } from "../utils/enums";
import { User } from "./User";

export type Task = {
  title: string;
  description: string;
  completed: boolean;
  createdOn: Date;
  updatedOn?: Date;
  dueDate?: Date;
  priority: Priority;
  categoryId: string;
  user: User;
};
