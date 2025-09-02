import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import ChecklistItemInput from "../ChecklistItemInput";

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
    <div className="py-px">
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
            <div className="relative flex flex-row justify-start items-center gap-2">
              <input
                type="checkbox"
                name={item._id}
                id={item._id}
                className={`
                  appearance-none peer size-4 
                  border border-gray-300 dark:border-gray-600 rounded-full bg-transparent shrink-0 
                  checked:bg-emerald-500 checked:border-emerald-500 
                  disabled:border-gray-300 disabled:checked:bg-gray-300 disabled:cursor-not-allowed
                  dark:disabled:border-gray-600 dark:disabled:checked:bg-gray-600
                  cursor-pointer
                `}
                checked={item.completed}
                disabled={isUpdating || isDeleting}
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
                htmlFor={item._id}
                className={`
                  cursor-pointer peer-disabled:text-gray-400 dark:peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed 
                  whitespace-nowrap select-none  text-sm
                  ${
                    item.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-zinc-700 dark:text-gray-200"
                  }
                `}
              >
                {item.text}
              </label>
            </div>
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
