import { TaskFormValues } from "./TaskForm.types";

export function validateTaskForm(values: TaskFormValues) {
  const errors: Partial<Record<keyof TaskFormValues, string>> = {};
  const { title, category, priority, dueDate, dueTime } = values;

  if (!title) {
    errors.title = "Title is required";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }
  if (category === null) {
    errors.category = "Category is required";
  }
  if (priority === null) {
    errors.priority = "Priority is required";
  }

  // If dueDate has a value, validate both date and time
  if (dueDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      errors.dueDate = "Due date must be in YYYY-MM-DD format";
    }
    if (!dueTime) {
      errors.dueTime = "Due time is required when due date is set";
    } else if (!/^\d{2}:\d{2}$/.test(dueTime)) {
      errors.dueTime = "Due time must be in HH:MM format";
    }
  }

  // If dueTime has a value but no dueDate, require dueDate
  if (dueTime && !dueDate) {
    errors.dueDate = "Due date is required when due time is set";
  }

  return errors;
}
