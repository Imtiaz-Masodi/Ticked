import { useState } from "react";
import { Task } from "../../types/Task";
import ChecklistItem from "../ChecklistItem";
import ChecklistItemInput from "../ChecklistItemInput";
import { useAddChecklistItemMutation } from "../../store/api/taskApi";
import { ApiResponseStatus, TaskStatus } from "../../utils/enums";
import { useApiToast } from "../../utils/toastUtils";

type ChecklistProps = {
  task: Task;
};

function Checklist({ task }: ChecklistProps) {
  const toast = useApiToast();
  const [showAddInput, setShowAddInput] = useState(false);
  const { _id: taskId, checklistItems, status: taskStatus } = task;
  const taskCompleted = taskStatus === TaskStatus.completed;

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
      {checklistItems.length > 0 && (
        <div className="space-y-1">
          {checklistItems.map((checklistItem) => (
            <ChecklistItem
              key={checklistItem._id}
              taskId={taskId}
              checklistItem={checklistItem}
              taskCurrentStatus={task.status}
              disabled={taskCompleted}
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
      {!showAddInput && !taskCompleted && (
        <div>
          <button
            onClick={() => setShowAddInput(true)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {checklistItems.length === 0 ? "+ Create Checklist" : "+ Add Item"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checklist;
