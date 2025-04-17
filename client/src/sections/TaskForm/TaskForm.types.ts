import { FormikFormProps } from "../../types/FormikFormProps";
import { Priority } from "../../utils/enums";

export type TaskFormValues = {
  title: string;
  description?: string;
  dueDate?: string;
  dueTime?: string;
  priority: Priority;
  categoryId: string;
};

export type TaskFormProps = FormikFormProps<TaskFormValues>;
