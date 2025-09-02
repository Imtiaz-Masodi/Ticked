import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import ChecklistItem from "../ChecklistItem";
import ChecklistItemInput from "../ChecklistItemInput";
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

  const handleAddItem = async (text: string) => {
    await handleAddChecklistItem(text);
    setShowAddInput(false);
  };

  const handleCancelAdd = () => {
    setShowAddInput(false);
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
        <ChecklistItemInput
          placeholder="Enter checklist item..."
          isLoading={isAddingChecklistItem}
          onSave={handleAddItem}
          onCancel={handleCancelAdd}
        />
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
