import { NavigationItem } from "../components/NavigationDrawer";
import { Icons } from "../components/Icon/IconMap";

export const NAV_ITEMS: readonly NavigationItem[] = Object.freeze([
  { name: "Create Task", path: "/task/new", icon: Icons.newTask },
  { name: "All Tasks", path: "/", icon: Icons.task },
  { name: "Backlogs", path: "/backlogs", icon: Icons.archive },
  { name: "Completed", path: "/completed", icon: Icons.taskDone },
  { name: "Categories", path: "/categories", icon: Icons.category },
  { name: "Settings", path: "/settings", icon: Icons.settings },
]);
