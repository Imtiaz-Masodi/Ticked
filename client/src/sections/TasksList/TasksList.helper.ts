import { Icons } from "../../components/Icon/IconMap";
import { TaskStatus, TaskStatusLabel, StatusType } from "../../utils/enums";
import { Task } from "../../types/Task";
import { FilterOptions } from "../../contexts/SearchFilterContext";

// Type for grouped tasks
export type GroupedTasks = {
  active: Task[];
  completed: Task[];
  backlog: Task[];
  totalTasksCount: number;
};

// Helper function to group tasks by status in a single loop
export const groupTasksByStatus = (tasks: Task[]): GroupedTasks => {
  return tasks.reduce(
    (groups, task) => {
      switch (task.status) {
        case TaskStatus.todo:
        case TaskStatus.inprogress:
          groups.active.push(task);
          groups.totalTasksCount++;
          break;
        case TaskStatus.completed:
          groups.completed.push(task);
          groups.totalTasksCount++;
          break;
        case TaskStatus.backlog:
          groups.backlog.push(task);
          groups.totalTasksCount++;
          break;
      }
      return groups;
    },
    {
      active: [] as Task[],
      completed: [] as Task[],
      backlog: [] as Task[],
      totalTasksCount: 0,
    }
  );
};

// Helper function to generate swipe background content based on task status
export const getSwipeBackgroundContent = (action: TaskStatus) => {
  switch (action) {
    case TaskStatus.completed:
      return {
        text: TaskStatusLabel.completed,
        icon: Icons.taskDone,
        themeColorClasses: "bg-green-500",
        status: TaskStatus.completed,
      };
    case TaskStatus.todo:
      return {
        text: TaskStatusLabel.todo,
        icon: Icons.task,
        themeColorClasses: "bg-blue-500",
        status: TaskStatus.todo,
      };
    case TaskStatus.inprogress:
      return {
        text: TaskStatusLabel.inprogress,
        icon: Icons.taskActive,
        themeColorClasses: "bg-yellow-500",
        status: TaskStatus.inprogress,
      };
    case TaskStatus.backlog:
      return {
        text: TaskStatusLabel.backlog,
        icon: Icons.archive,
        themeColorClasses: "bg-red-500",
        status: TaskStatus.backlog,
      };
    default:
      return undefined;
  }
};

// Helper function to get swipe actions based on current task status
export const getSwipeActionsForTask = (currentStatus: TaskStatus) => {
  switch (currentStatus) {
    case TaskStatus.todo:
      return {
        leftAction: getSwipeBackgroundContent(TaskStatus.completed),
        rightAction: getSwipeBackgroundContent(TaskStatus.backlog),
      };
    case TaskStatus.inprogress:
      return {
        leftAction: getSwipeBackgroundContent(TaskStatus.completed),
        rightAction: getSwipeBackgroundContent(TaskStatus.backlog),
      };
    case TaskStatus.completed:
      return {
        leftAction: getSwipeBackgroundContent(TaskStatus.inprogress),
        rightAction: getSwipeBackgroundContent(TaskStatus.todo),
      };
    case TaskStatus.backlog:
      return {
        leftAction: getSwipeBackgroundContent(TaskStatus.todo),
        rightAction: undefined, // No right action for backlog
      };
    default:
      return {
        leftAction: undefined,
        rightAction: undefined,
      };
  }
};

// Determine the title based on status if not provided
export const getTitleByStatus = (status?: string | string[]) => {
  if (!status || status.length === 0) return "All Tasks";
  if (status.includes(TaskStatus.todo) || status.includes(TaskStatus.inprogress)) return "Active Tasks";
  if (status.includes(TaskStatus.completed)) return "Completed Tasks";
  if (status.includes(TaskStatus.backlog)) return "Backlog Tasks";
  return "Tasks";
};

/**
 * Helper function to get the expected route-specific filters based on the current URL
 */
export const getRouteSpecificFilters = (statusType?: StatusType): Partial<FilterOptions> => {
  switch (statusType) {
    case StatusType.active:
      return {
        statuses: [TaskStatus.todo, TaskStatus.inprogress],
        categories: [],
        priorities: [],
        dueDateRange: undefined,
      };
    case StatusType.completed:
      return {
        statuses: [TaskStatus.completed],
        categories: [],
        priorities: [],
        dueDateRange: undefined,
      };
    case StatusType.backlog:
      return {
        statuses: [TaskStatus.backlog],
        categories: [],
        priorities: [],
        dueDateRange: undefined,
      };
    case StatusType.all:
    default:
      return {
        categories: [],
        priorities: [],
        statuses: [],
        dueDateRange: undefined,
      };
  }
};

/**
 * Helper function to check if current filters are only route-specific filters
 */
export const hasOnlyRouteSpecificFilters = (
  currentFilters: FilterOptions,
  routeSpecificFilters: Partial<FilterOptions>,
  searchQuery: string
): boolean => {
  // If there's a search query, it's not just route-specific
  if (searchQuery.trim() !== "") {
    return false;
  }

  // Compare each filter type
  const categoriesMatch =
    JSON.stringify(currentFilters.categories.sort()) === JSON.stringify((routeSpecificFilters.categories || []).sort());

  const prioritiesMatch =
    JSON.stringify(currentFilters.priorities.sort()) === JSON.stringify((routeSpecificFilters.priorities || []).sort());

  const statusesMatch =
    JSON.stringify(currentFilters.statuses.sort()) === JSON.stringify((routeSpecificFilters.statuses || []).sort());

  const dueDateMatch =
    JSON.stringify(currentFilters.dueDateRange) === JSON.stringify(routeSpecificFilters.dueDateRange);

  return categoriesMatch && prioritiesMatch && statusesMatch && dueDateMatch;
};
