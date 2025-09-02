import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { Checkbox } from "../Checkbox";
import ChecklistItemInput from "../ChecklistItemInput";
import { Size } from "../../utils";

type ChecklistItemProps = {
  item: ChecklistItemType;
  onUpdate: (itemId: string, updates: Partial<ChecklistItemType>) => Promise<void>;
  onDelete: (itemId: string) => Promise<void>;
  isUpdating?: boolean;
  isDeleting?: boolean;
};

function ChecklistItem({ item, onUpdate, onDelete, isUpdating = false, isDeleting = false }: ChecklistItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = async () => {
    await onUpdate(item._id, { completed: !item.completed });
  };

  const handleSaveEdit = async (text: string) => {
    if (text.trim() && text.trim() !== item.text) {
      await onUpdate(item._id, { text: text.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(item._id);
  };

  return (
    <div className="py-1">
      {isEditing ? (
        <ChecklistItemInput
          initialValue={item.text}
          placeholder="Edit checklist item..."
          isLoading={isUpdating}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="flex items-center gap-3 group">
          <div className="flex-grow">
            <Checkbox
              label={item.text}
              checked={item.completed}
              onChange={handleToggleComplete}
              disabled={isUpdating || isDeleting}
              checkboxSize={Size.sm}
              name={item._id}
            />
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isUpdating || isDeleting}
              className="p-1"
              title="Edit item"
            >
              <Icon
                name={Icons.edit}
                className="w-3 h-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              />
            </button>

            <button
              onClick={handleDelete}
              disabled={isUpdating || isDeleting}
              className="p-1 transition-colors"
              title="Delete item"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon
                  name={Icons.delete}
                  className="w-3 h-3 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChecklistItem;
