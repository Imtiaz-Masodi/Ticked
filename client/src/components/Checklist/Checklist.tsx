import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import ChecklistItem from "../ChecklistItem";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import {
  useAddChecklistItemMutation,
  useUpdateChecklistItemMutation,
  useDeleteChecklistItemMutation,
} from "../../store/api/taskApi";
import { ApiResponseStatus } from "../../utils/enums";
import { useApiToast } from "../../utils/toastUtils";

type ChecklistProps = {
  taskId: string;
  items: ChecklistItemType[];
};

function Checklist({ taskId, items }: ChecklistProps) {
  const [newItemText, setNewItemText] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | undefined>();
  const [deletingItemId, setDeletingItemId] = useState<string | undefined>();

  const toast = useApiToast();

  // Checklist API hooks
  const [addChecklistItem, { isLoading: isAddingChecklistItem }] = useAddChecklistItemMutation();
  const [updateChecklistItem] = useUpdateChecklistItemMutation();
  const [deleteChecklistItem] = useDeleteChecklistItemMutation();

  // Checklist handlers
  const handleAddChecklistItem = async (text: string) => {
    try {
      const response = await addChecklistItem({ taskId, text });
      if (response.data?.status !== ApiResponseStatus.success) {
        toast.apiError("Unable to add checklist item");
      }
    } catch (error) {
      console.error("Failed to add checklist item:", error);
      toast.apiError("Failed to add checklist item");
    }
  };

  const handleUpdateChecklistItem = async (itemId: string, updates: Partial<ChecklistItemType>) => {
    setUpdatingItemId(itemId);
    try {
      const response = await updateChecklistItem({ taskId, itemId, updates });
      if (response.data?.status !== ApiResponseStatus.success) {
        toast.apiError("Failed to update checklist item");
      }
    } catch (error) {
      console.error("Failed to update checklist item:", error);
      toast.apiError("Failed to update checklist item");
    } finally {
      setUpdatingItemId(undefined);
    }
  };

  const handleDeleteChecklistItem = async (itemId: string) => {
    setDeletingItemId(itemId);
    try {
      const response = await deleteChecklistItem({ taskId, itemId });
      if (response.data?.status !== ApiResponseStatus.success) {
        toast.apiError("Failed to delete checklist item");
      }
    } catch (error) {
      console.error("Failed to delete checklist item:", error);
      toast.apiError("Failed to delete checklist item");
    } finally {
      setDeletingItemId(undefined);
    }
  };

  const handleAddItem = async () => {
    if (newItemText.trim()) {
      await handleAddChecklistItem(newItemText.trim());
      setNewItemText("");
      setShowAddInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    } else if (e.key === "Escape") {
      setNewItemText("");
      setShowAddInput(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Checklist items */}
      {items.length > 0 && (
        <div className="space-y-1">
          {items.map((item) => (
            <ChecklistItem
              key={item._id}
              item={item}
              onUpdate={handleUpdateChecklistItem}
              onDelete={handleDeleteChecklistItem}
              isUpdating={updatingItemId === item._id}
              isDeleting={deletingItemId === item._id}
            />
          ))}
        </div>
      )}

      {/* Add new item input */}
      {showAddInput && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter checklist item..."
            className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            autoFocus
          />
          <div
            onClick={handleAddItem}
            className={`w-8 h-8 rounded-lg transition-colors flex items-center justify-center ${
              isAddingChecklistItem || !newItemText.trim()
                ? "border text-slate-400 dark:text-slate-500 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                : "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-600 hover:bg-green-200 dark:hover:bg-green-900/70 cursor-pointer"
            }`}
            title="Add item"
          >
            {isAddingChecklistItem ? (
              <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon name={Icons.check} className="w-4 h-4" />
            )}
          </div>
          <div
            onClick={() => {
              setNewItemText("");
              setShowAddInput(false);
            }}
            className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center"
            title="Cancel"
          >
            <Icon name={Icons.close} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      )}

      {/* Add item link */}
      {!showAddInput && (
        <div>
          <button
            onClick={() => setShowAddInput(true)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {items.length === 0 ? "+ Create Checklist" : "+ Add Item"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checklist;
