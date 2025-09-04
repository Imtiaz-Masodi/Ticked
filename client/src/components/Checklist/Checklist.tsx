import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import ChecklistItem from "../ChecklistItem";
import ChecklistItemInput from "../ChecklistItemInput";
import { useAddChecklistItemMutation } from "../../store/api/taskApi";
import { ApiResponseStatus } from "../../utils/enums";
import { useApiToast } from "../../utils/toastUtils";

type ChecklistProps = {
  taskId: string;
  items: ChecklistItemType[];
  disabled?: boolean;
};

function Checklist({ taskId, items, disabled = false }: ChecklistProps) {
  const [showAddInput, setShowAddInput] = useState(false);

  const toast = useApiToast();

  // Checklist API hooks
  const [addChecklistItem, { isLoading: isAddingChecklistItem }] = useAddChecklistItemMutation();

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

  const handleAddItem = async (text: string, showAddInput = false) => {
    await handleAddChecklistItem(text);
    setShowAddInput(showAddInput);
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
            <ChecklistItem key={item._id} item={item} taskId={taskId} disabled={disabled} />
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
      {!showAddInput && !disabled && (
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
