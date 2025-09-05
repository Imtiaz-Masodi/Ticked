import { useState, useRef } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import ChecklistItemInput from "../ChecklistItemInput";
import { Menu, MenuItem } from "../Menu";
import { CircularLoader } from "../Loader";
import { useMobileDetect } from "../../hooks/useMediaQuery";
import {
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
  useUpdateTaskStatusMutation,
} from "../../store/api/taskApi";
import { ApiResponseStatus, Size, TaskStatus } from "../../utils/enums";
import { useApiToast } from "../../utils/toastUtils";

type ChecklistItemProps = {
  taskId: string;
  checklistItem: ChecklistItemType;
  taskCurrentStatus?: TaskStatus;
  disabled?: boolean;
};

function ChecklistItem({ checklistItem, taskId, disabled = false, taskCurrentStatus }: ChecklistItemProps) {
  const toast = useApiToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMobileDetect();

  // API hooks
  const [updateChecklistItem] = useUpdateChecklistItemMutation();
  const [deleteChecklistItem] = useDeleteChecklistItemMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const handleUpdateChecklistItem = async (itemId: string, updates: Partial<ChecklistItemType>) => {
    setIsUpdating(true);
    try {
      const response = await updateChecklistItem({ taskId, itemId, updates });
      if (response.data?.status !== ApiResponseStatus.success) {
        toast.apiError("Failed to update checklist item");
      }
    } catch (error) {
      console.error("Failed to update checklist item:", error);
      toast.apiError("Failed to update checklist item");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteChecklistItem = async (itemId: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteChecklistItem({ taskId, itemId });
      if (response.data?.status !== ApiResponseStatus.success) {
        toast.apiError("Failed to delete checklist item");
      }
    } catch (error) {
      console.error("Failed to delete checklist item:", error);
      toast.apiError("Failed to delete checklist item");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleComplete = async () => {
    const updatedChecklistItemStatus = !checklistItem.completed;

    // Update the checklist item first
    await handleUpdateChecklistItem(checklistItem._id, { completed: updatedChecklistItemStatus });

    // If the checklist item is being completed (checked) and the task is in todo or backlog status,
    // update the task status to inprogress
    if (
      updatedChecklistItemStatus &&
      taskCurrentStatus &&
      (taskCurrentStatus === TaskStatus.todo || taskCurrentStatus === TaskStatus.backlog)
    ) {
      try {
        await updateTaskStatus({
          taskId,
          taskStatus: TaskStatus.inprogress,
        });
      } catch (error) {
        console.error("Failed to update task status:", error);
        // Don't show error toast as the main action (checking item) succeeded
      }
    }
  };

  const handleSaveEdit = async (text: string) => {
    if (text.trim() && text.trim() !== checklistItem.text) {
      await handleUpdateChecklistItem(checklistItem._id, { text: text.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await handleDeleteChecklistItem(checklistItem._id);
  };

  const handleMenuItemClick = (menuId: string) => {
    setIsMenuOpen(false); // Close menu immediately when action is selected
    switch (menuId) {
      case "edit":
        setIsEditing(true);
        break;
      case "delete":
        handleDelete();
        break;
    }
  };

  const menuItems: MenuItem[] = [
    {
      menuId: "edit",
      label: "Edit",
      icon: Icons.edit,
    },
    {
      menuId: "delete",
      label: "Delete",
      icon: Icons.delete,
      variant: "danger" as const,
    },
  ].filter((item) => {
    // Hide delete option if currently deleting to prevent confusion
    if (item.menuId === "delete" && isDeleting) return false;
    return true;
  });

  return (
    <div className="py-px">
      {isEditing && !disabled ? (
        <ChecklistItemInput
          initialValue={checklistItem.text}
          placeholder="Edit checklist item..."
          isLoading={isUpdating}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="flex items-center gap-3 group">
          <div className="flex-grow">
            <div className="relative flex flex-row justify-start items-center gap-2">
              <input
                type="checkbox"
                name={checklistItem._id}
                id={checklistItem._id}
                className={`
                  appearance-none peer size-4 
                  border border-gray-300 dark:border-gray-600 rounded-full bg-transparent shrink-0 
                  checked:bg-emerald-500 checked:border-emerald-500 dark:checked:border-emerald-500 
                  disabled:border-gray-300 disabled:checked:bg-gray-300 disabled:cursor-not-allowed
                  dark:disabled:border-gray-600 dark:disabled:checked:bg-gray-600
                  cursor-pointer
                `}
                checked={checklistItem.completed}
                disabled={isUpdating || isDeleting || disabled}
                onChange={handleToggleComplete}
              />
              <Icon
                name={Icons.check}
                className={`
                  absolute hidden justify-center items-center size-4 text-white
                  peer-checked:flex peer-checked:text-sm pointer-events-none
                `}
              />
              <label
                htmlFor={checklistItem._id}
                className={`
                  cursor-pointer peer-disabled:text-gray-400 dark:peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed 
                  whitespace-nowrap select-none  text-sm
                  ${
                    checklistItem.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-zinc-700 dark:text-gray-200"
                  }
                `}
              >
                {checklistItem.text}
              </label>
            </div>
          </div>

          {!disabled && (
            <div className="flex items-center gap-1 relative">
              {isMobile ? (
                <>
                  <button
                    ref={menuTriggerRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    disabled={isUpdating || isDeleting}
                    className={`p-1 -mr-2 transition-colors ${isMenuOpen ? "text-gray-600 dark:text-gray-300" : ""}`}
                    title="More actions"
                  >
                    {isUpdating || isDeleting ? (
                      <CircularLoader size="xs" className="text-gray-400 dark:text-gray-500" />
                    ) : (
                      <Icon
                        name={Icons.menuDots}
                        className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      />
                    )}
                  </button>
                  <Menu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    onMenuItemClick={handleMenuItemClick}
                    items={menuItems}
                    triggerRef={menuTriggerRef}
                    className="!top-0"
                    position="bottom"
                  />
                </>
              ) : (
                <>
                  {isUpdating || isDeleting ? (
                    <div className="opacity-100 flex items-center justify-center">
                      <CircularLoader size={Size.sm} className="text-gray-400 dark:text-gray-500" />
                    </div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        disabled={isUpdating || isDeleting}
                        className={`
                          flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium
                          transition-all duration-200 hover:scale-105 active:scale-95
                          bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                          text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                          shadow-sm hover:shadow-md
                        `}
                        title="Edit checklist item"
                      >
                        <Icon name={Icons.edit} className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={handleDelete}
                        disabled={isUpdating || isDeleting}
                        className={`
                          flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium
                          transition-all duration-200 hover:scale-105 active:scale-95
                          bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50
                          text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                          shadow-sm hover:shadow-md
                        `}
                        title="Delete checklist item"
                      >
                        <Icon name={Icons.delete} className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChecklistItem;
