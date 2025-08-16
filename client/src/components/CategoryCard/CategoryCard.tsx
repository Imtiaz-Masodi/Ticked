import { useMemo, useRef, useState, useEffect } from "react";
import { useGetTasksQuery } from "../../store/api/taskApi";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../store/api/categoryApi";
import { Category } from "../../types/Category";
import { ApiResponseStatus } from "../../utils/enums";
import { Icons } from "../Icon/IconMap";
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
import CategoryTaskStats from "./CategoryTaskStats";

interface CategoryCardProps {
  category: Category;
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

  const { data: tasksByCategory, isLoading } = useGetTasksQuery({ categoryId: category._id });

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

  const menuItems = getCategoryMenuItems(category);

  const handleMenuItemClick = async (menuId: string) => {
    // Handle menu item actions here, e.g., edit or delete category
    if (menuId === "edit-category") {
      setIsEditing(true);
    } else if (menuId === "delete-category") {
      // ToDo: Show confirmation popup when deleting the category
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
    setIsMenuOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await updateCategory({ id: category._id, categoryName: editedName.trim(), categoryColorCode: editedColor }).unwrap();
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
    return (editedName !== category.name || editedColor !== category.categoryColorCode);
  }, [editedName, editedColor, category.name, category.categoryColorCode]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div
            className={`w-5 h-5 rounded-full flex-shrink-0 shadow-inner inner-shadow-glossy ${isEditing ? "cursor-pointer" : "cursor-default"}`}
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
              <h3 className="text-xl leading-tight text-zinc-700 dark:text-gray-200 select-none">
                {category.name}
              </h3>
              {category.updatedOn && (
                <p className="text-sm text-zinc-500 dark:text-gray-400 select-none">
                  Updated on {new Date(category.updatedOn).toLocaleDateString()}
                </p>
              )}
              {category.createdOn && !category.updatedOn && (
                <p className="text-sm text-zinc-500 dark:text-gray-400 select-none">
                  Created on {new Date(category.createdOn).toLocaleDateString()}
                </p>
              )}
            </>
          )}
        </div>
        {category.preDefined ? (
          <Tooltip content="System Defined Category" placement={isMobile ? "left" : "bottom"}>
            <Icon name={Icons.settings} className="text-zinc-400 dark:text-gray-500" />
          </Tooltip>
        ) : isEditing ? (
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
              className={isDeleting ? "opacity-50 cursor-not-allowed" : ""}
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
        )}
      </div>

      <CategoryTaskStats
        tasksByCategory={tasksByCategory}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CategoryCard;
