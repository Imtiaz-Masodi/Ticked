import { MenuItem } from "../components/Menu";
import { Icons } from "../components/Icon/IconMap";
import { Category } from "../types/Category";

/**
 * Configuration for category-related menu items
 */
export const getCategoryMenuItems = (category: Category): MenuItem[] => [
  {
    menuId: "edit-category",
    label: "Edit",
    icon: Icons.edit,
    itemPayload: { categoryId: category._id },
  },
  {
    menuId: "delete-category",
    label: "Delete",
    icon: Icons.delete,
    variant: "danger",
    itemPayload: { categoryId: category._id },
  },
];
