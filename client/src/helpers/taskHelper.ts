import { Task } from "../types/Task";

export interface ChecklistProgress {
  totalItems: number;
  completedItems: number;
  progress: number;
}

/**
 * Calculate checklist progress for a task
 * @param task - The task object containing checklist items
 * @returns Object containing total items, completed items, and progress percentage
 */
export function calculateChecklistProgress(task: Task): ChecklistProgress {
  const checklistItems = task.checklistItems || [];
  const totalItems = checklistItems.length;
  const completedItems = checklistItems.filter((item) => item.completed).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalItems,
    completedItems,
    progress,
  };
}
