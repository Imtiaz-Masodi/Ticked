import { NavigationItem } from "../components/NavigationDrawer";
import { Icons } from "../components/Icon/IconMap";
import { TASK_ROUTES, APP_ROUTES } from "./routes";

export const NAV_ITEMS: readonly NavigationItem[] = Object.freeze([
  { name: "Create Task", path: TASK_ROUTES.TASK_NEW, icon: Icons.newTask },
  { name: "All Tasks", path: TASK_ROUTES.TASKS_ALL, queryParams: { applyFilter: "1" }, icon: Icons.task },
  { name: "Active Tasks", path: TASK_ROUTES.TASKS_ACTIVE, queryParams: { applyFilter: "1" }, icon: Icons.taskActive },
  { name: "Backlogs", path: TASK_ROUTES.TASKS_BACKLOG, queryParams: { applyFilter: "1" }, icon: Icons.archive },
  { name: "Completed", path: TASK_ROUTES.TASKS_COMPLETED, queryParams: { applyFilter: "1" }, icon: Icons.taskDone },
  { name: "Categories", path: APP_ROUTES.CATEGORIES, icon: Icons.category },
  { name: "Settings", path: APP_ROUTES.SETTINGS, icon: Icons.settings },
]);
