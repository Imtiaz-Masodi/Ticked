import { Task } from "../types/Task";
import { SearchFilterState } from "../contexts/SearchFilterContext";

export const filterTasks = (tasks: Task[], state: SearchFilterState): Task[] => {
  let filteredTasks = [...tasks];

  // Apply text search
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    filteredTasks = filteredTasks.filter(
      (task) => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    );
  }

  // Apply filters
  const { filters } = state;

  // Filter by categories
  if (filters.categories.length > 0) {
    filteredTasks = filteredTasks.filter((task) => filters.categories.includes(task.categoryId));
  }

  // Filter by priorities
  if (filters.priorities.length > 0) {
    filteredTasks = filteredTasks.filter((task) => filters.priorities.includes(task.priority));
  }

  // Filter by statuses
  if (filters.statuses.length > 0) {
    filteredTasks = filteredTasks.filter((task) => filters.statuses.includes(task.status));
  }

  // Filter by due date range
  if (filters.dueDateRange) {
    const { start, end } = filters.dueDateRange;

    filteredTasks = filteredTasks.filter((task) => {
      if (!task.dueDate) return false; // Only include tasks with due dates when date filter is applied

      const taskDate = new Date(task.dueDate);
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      if (startDate && taskDate < startDate) return false;
      if (endDate && taskDate > endDate) return false;

      return true;
    });
  }

  return filteredTasks;
};

export const hasActiveSearchOrFilter = (state: SearchFilterState): boolean => {
  return state.searchQuery.trim() !== "" || state.isFilterActive;
};
