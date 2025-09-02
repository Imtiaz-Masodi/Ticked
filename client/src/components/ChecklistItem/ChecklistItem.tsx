import { useState } from "react";
import { ChecklistItem as ChecklistItemType } from "../../types/Task";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { Checkbox } from "../Checkbox";
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
  const [editText, setEditText] = useState(item.text);

  const handleToggleComplete = async () => {
    await onUpdate(item._id, { completed: !item.completed });
  };

  const handleSaveEdit = async () => {
    if (editText.trim() && editText.trim() !== item.text) {
      await onUpdate(item._id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(item.text);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onDelete(item._id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex items-center gap-3 py-1 group">
      <Checkbox
        label={isEditing ? "" : item.text}
        checked={item.completed}
        onChange={handleToggleComplete}
        disabled={isUpdating || isDeleting}
        checkboxSize={Size.sm}
        name={item._id}
      />

      <div className="flex-1 min-w-0">
        {isEditing && (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSaveEdit}
            className="w-full px-3 py-1 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700/50 focus:border-blue-400 dark:focus:border-blue-500 text-slate-700 dark:text-gray-300 transition-colors"
            autoFocus
          />
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <>
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
          </>
        )}

        {isEditing && (
          <>
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating}
              className="p-1 transition-colors"
              title="Save changes"
            >
              <Icon
                name={Icons.check}
                className="w-3 h-3 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              />
            </button>

            <button onClick={handleCancelEdit} className="p-1 transition-colors" title="Cancel">
              <Icon
                name={Icons.close}
                className="w-3 h-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChecklistItem;
