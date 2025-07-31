import { useMemo, useRef, useState, useEffect } from "react";
import { useGetTasksByCategoryQuery } from "../../store/api/taskApi";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../store/api/categoryApi";
import { Category } from "../../types/Category";
import { ApiResponseStatus, TaskStatus } from "../../utils/enums";
import { Icons } from "../Icon/IconMap";
import { SkeletonBox, SkeletonGrid } from "../Skeleton";
import { Menu } from "../Menu";
import { Icon } from "../Icon";
import { getCategoryMenuItems } from "../../utils/menuConfig";
import { useToastContext } from "../../hooks/useToastContext";
import { NotificationType } from "../Notification";
import { Tooltip } from "../Tooltip";
import { useMobileDetect } from "../../hooks";
import { Input } from "../Input";
import { Button } from "../Button";
import { ButtonType } from "../Button/Button.enum";
import { ColorPickerPopup } from "../ColorPickerPopup";

interface CategoryCardProps {
  category: Category;
}

interface TaskStats {
  todo: number;
  inprogress: number;
  completed: number;
  backlog: number;
}

function CategoryCard({ category }: CategoryCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);
  const [editedColor, setEditedColor] = useState(category.categoryColorCode);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetect();

  const { addToast } = useToastContext();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const { data: tasksByCategory, isLoading } = useGetTasksByCategoryQuery({ categoryId: category._id });

  // Reset edited values when category changes
  useEffect(() => {
    setEditedName(category.name);
    setEditedColor(category.categoryColorCode);
  }, [category.name, category.categoryColorCode]);

  useEffect(() => {
    if (!isEditing) {
      setEditedName(category.name);
      setEditedColor(category.categoryColorCode);
    }
  }, [category.categoryColorCode, category.name, isEditing]);

  const taskStats: TaskStats = useMemo(() => {
    const tasksData = {
      todo: 0,
      inprogress: 0,
      completed: 0,
      backlog: 0,
    };
    tasksByCategory?.payload?.tasks.forEach((task) => {
      switch (task.status) {
        case TaskStatus.todo:
          tasksData.todo += 1;
          break;
        case TaskStatus.inprogress:
          tasksData.inprogress += 1;
          break;
        case TaskStatus.completed:
          tasksData.completed += 1;
          break;
        case TaskStatus.backlog:
          tasksData.backlog += 1;
          break;
        default:
          break;
      }
    });
    return tasksData;
  }, [tasksByCategory]);

  const totalTasks =
    taskStats.todo +
    taskStats.inprogress +
    taskStats.completed +
    taskStats.backlog;

  const menuItems = getCategoryMenuItems(category);

  const handleMenuItemClick = async (menuId: string) => {
    // Handle menu item actions here, e.g., edit or delete category
    if (menuId === "edit-category") {
      setIsEditing(true);
    } else if (menuId === "delete-category") {
      try {
        await deleteCategory(category._id);
        addToast({
          id: Date.now().toString(),
          message: `Category "${category.name}" deleted successfully`,
          type: NotificationType.SUCCESS,
          duration: 3000,
        });
      } catch (error) {
        console.error("Failed to delete category:", error);
        addToast({
          id: Date.now().toString(),
          message: "Failed to delete category. Please try again.",
          type: NotificationType.ERROR,
          duration: 5000,
        });
      }
    }
    setIsMenuOpen(false); // Close menu after action
  };

  const handleSaveEdit = async () => {
    try {
      const response = await updateCategory({
        id: category._id,
        categoryName: editedName.trim(),
        categoryColorCode: editedColor,
      }).unwrap();
      if (response.status === ApiResponseStatus.success) setIsEditing(false);
      addToast({
        id: Date.now().toString(),
        message: response.message,
        type: response.status === ApiResponseStatus.success ? NotificationType.SUCCESS : NotificationType.ERROR,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update category:", error);
      addToast({
        id: Date.now().toString(),
        message: "Failed to update category. Please try again.",
        type: NotificationType.ERROR,
        duration: 5000,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditedName(category.name);
    setEditedColor(category.categoryColorCode);
    setIsEditing(false);
  };

  const handleColorChange = (color: string) => {
    setEditedColor(color);
    setIsColorPickerOpen(false);
  };

  const categoryDetailsChanged = useMemo(() => {
    return editedName !== category.name || editedColor !== category.categoryColorCode;
  }, [editedName, editedColor, category.name, category.categoryColorCode]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div
            className={`w-5 h-5 rounded-full flex-shrink-0 ${isEditing ? "cursor-pointer" : "cursor-default"}`}
            style={{ backgroundColor: isEditing ? editedColor : category.categoryColorCode }}
            onClick={() => setIsColorPickerOpen(isEditing && true)}
            ref={colorButtonRef}
          />

          <ColorPickerPopup
            isOpen={isColorPickerOpen}
            onClose={() => setIsColorPickerOpen(false)}
            position="bottom"
            selectedColor={editedColor}
            onColorChange={handleColorChange}
            disabled={isLoading}
            triggerRef={colorButtonRef}
            label=""
          />
        </div>

        <div className="flex-grow">
          {isEditing ? (
            <Input
              name="categoryName"
              label=""
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Category name"
              className="text-xl"
              disabled={isUpdating}
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isUpdating) {
                  handleSaveEdit();
                } else if (e.key === "Escape" && !isUpdating) {
                  handleCancelEdit();
                }
              }}
            />
          ) : (
            <>
              <h3 className="text-xl leading-tight text-zinc-700">
                {category.name}
              </h3>
              {category.updatedOn && (
                <p className="text-sm text-zinc-500">
                  Updated on {new Date(category.updatedOn).toLocaleDateString()}
                </p>
              )}
              {category.createdOn && !category.updatedOn && (
                <p className="text-sm text-zinc-500">
                  Created on {new Date(category.createdOn).toLocaleDateString()}
                </p>
              )}
            </>
          )}
        </div>
        {category.preDefined ? (
          <Tooltip content="System Defined Category" placement={isMobile ? "left" : "bottom"}>
            <Icon name={Icons.settings} className="text-zinc-400" />
          </Tooltip>
        ) : ( isEditing ? (
            <div className="flex gap-2">
              <Button
                type={ButtonType.outline}
                startIcon={Icons.close}
                iconOnly={true}
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
                className="!p-2"
              />
              {!isLoading && editedName.trim() && categoryDetailsChanged && (
                <Button
                  type={ButtonType.solid}
                  startIcon={Icons.check}
                  iconOnly={true}
                  onClick={handleSaveEdit}
                  disabled={isLoading || !editedName.trim() || !categoryDetailsChanged}
                  className="!p-2"
                />
              )}
            </div>
          ) : (
            <div ref={menuTriggerRef} className="relative">
              <Icon
                name={Icons.menuDots}
                onClick={() => !isDeleting && !isUpdating && setIsMenuOpen(true)}
                className={ isDeleting ? "opacity-50 cursor-not-allowed" : "" }
              />
              <Menu
                isOpen={isMenuOpen && !isDeleting && !isUpdating}
                onClose={() => setIsMenuOpen(false)}
                onMenuItemClick={handleMenuItemClick}
                items={menuItems}
                triggerRef={menuTriggerRef}
                position="bottom"
              />
            </div>
          )
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mx-1">
          <span className="text-sm font-medium text-zinc-700">Total Tasks</span>
          {isLoading ? (
            <SkeletonBox width="w-5" height="h-5" />
          ) : (
            <span className="text-md font-semibold text-zinc-900">
              {totalTasks}
            </span>
          )}
        </div>

        {isLoading ? (
          <SkeletonGrid items={4} columns={2} itemHeight="h-10" />
        ) : totalTasks > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs font-medium text-blue-700">To Do</span>
              <span className="text-sm font-bold text-blue-900">
                {taskStats.todo}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-xs font-medium text-yellow-700">
                In Progress
              </span>
              <span className="text-sm font-bold text-yellow-900">
                {taskStats.inprogress}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-xs font-medium text-green-700">
                Completed
              </span>
              <span className="text-sm font-bold text-green-900">
                {taskStats.completed}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-xs font-medium text-red-700">Backlog</span>
              <span className="text-sm font-bold text-red-900">
                {taskStats.backlog}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-zinc-500 mt-4">
              No tasks in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
