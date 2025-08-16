import { Icons } from "../../components/Icon/IconMap";
import { TaskStatus, TaskStatusLabel } from "../../utils/enums";
import { Task } from "../../types/Task";

// Type for grouped tasks
export type GroupedTasks = {
  active: Task[];
  completed: Task[];
  backlog: Task[];
};

// Helper function to group tasks by status in a single loop
export const groupTasksByStatus = (tasks: Task[]): GroupedTasks => {
  return tasks.reduce(
    (groups, task) => {
      switch (task.status) {
        case TaskStatus.todo:
        case TaskStatus.inprogress:
          groups.active.push(task);
          break;
        case TaskStatus.completed:
          groups.completed.push(task);
          break;
        case TaskStatus.backlog:
          groups.backlog.push(task);
          break;
      }
      return groups;
    },
    {
      active: [] as Task[],
      completed: [] as Task[],
      backlog: [] as Task[],
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
        icon: Icons.task,
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

// Determine the title based on status if not provided
export const getTitleByStatus = (status?: string | string[]) => {
  if (!status || status.length === 0) return "All Tasks";
  if (status.includes(TaskStatus.todo) || status.includes(TaskStatus.inprogress)) return "Active Tasks";
  if (status.includes(TaskStatus.completed)) return "Completed Tasks";
  if (status.includes(TaskStatus.backlog)) return "Backlog Tasks";
  return "Tasks";
};
