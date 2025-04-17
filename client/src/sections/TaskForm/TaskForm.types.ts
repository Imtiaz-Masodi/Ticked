import { Category } from "../../types/Category";
import { FormikFormProps } from "../../types/FormikFormProps";
import { PriorityType } from "../../types/PriorityType";

export type TaskFormValues = {
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  priority: PriorityType;
  category?: Category;
};

export type TaskFormProps = FormikFormProps<TaskFormValues>;
