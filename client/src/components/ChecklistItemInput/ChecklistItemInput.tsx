import { useState, useEffect } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { CircularLoader } from "../Loader";

type ChecklistItemInputProps = {
  initialValue?: string;
  placeholder?: string;
  isLoading?: boolean;
  onSave: (text: string) => Promise<void> | void;
  onCancel: () => void;
  autoFocus?: boolean;
  showCancelButton?: boolean;
};

function ChecklistItemInput({
  initialValue = "",
  placeholder = "Enter checklist item...",
  isLoading = false,
  onSave,
  onCancel,
  autoFocus = true,
  showCancelButton = true,
}: ChecklistItemInputProps) {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    if (text.trim()) {
      await onSave(text.trim());
    }
  };

  const handleCancel = () => {
    setText(initialValue);
    onCancel();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const isSaveDisabled = isLoading || !text.trim() || text.trim() === initialValue;

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="w-0 h-full flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        autoFocus={autoFocus}
        disabled={isLoading}
      />

      <button
        onClick={handleSave}
        disabled={isSaveDisabled}
        className={`w-8 h-8 rounded-lg transition-colors flex items-center justify-center ${
          isSaveDisabled
            ? "border text-slate-400 dark:text-slate-500 border-gray-300 dark:border-gray-600 cursor-not-allowed"
            : "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-600 hover:bg-green-200 dark:hover:bg-green-900/70 cursor-pointer"
        }`}
        title="Save"
      >
        {isLoading ? (
          <CircularLoader size="xs" className="text-gray-400 dark:text-gray-500" />
        ) : (
          <Icon name={Icons.check} className="w-4 h-4" />
        )}
      </button>

      {showCancelButton && (
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          title="Cancel"
        >
          <Icon name={Icons.close} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </div>
  );
}

export default ChecklistItemInput;
