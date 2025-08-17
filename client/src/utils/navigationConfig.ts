import { NavigationItem } from "../components/NavigationDrawer";
import { Icons } from "../components/Icon/IconMap";
import { TASK_ROUTES, APP_ROUTES } from "./routes";

export const NAV_ITEMS: readonly NavigationItem[] = Object.freeze([
  { name: "Create Task", path: TASK_ROUTES.TASK_NEW, icon: Icons.newTask },
  { name: "All Tasks", path: TASK_ROUTES.TASKS_ALL, icon: Icons.task },
  { name: "Active Tasks", path: TASK_ROUTES.TASKS_ACTIVE, icon: Icons.taskActive },
  { name: "Backlogs", path: TASK_ROUTES.TASKS_BACKLOG, icon: Icons.archive },
  { name: "Completed", path: TASK_ROUTES.TASKS_COMPLETED, icon: Icons.taskDone },
  { name: "Categories", path: APP_ROUTES.CATEGORIES, icon: Icons.category },
  { name: "Settings", path: APP_ROUTES.SETTINGS, icon: Icons.settings },
]);
