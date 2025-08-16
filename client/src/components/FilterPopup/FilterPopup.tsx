import React, { useState, useEffect, useRef } from "react";
import { useSearchFilter, FilterOptions } from "../../hooks/useSearchFilter";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Priority, Size, TaskStatus, TaskStatusLabel } from "../../utils/enums";
import { Button } from "../Button";
import { ButtonType, ButtonVariant } from "../Button/Button.enum";
import { Checkbox } from "../Checkbox";
import { Icons } from "../Icon/IconMap";
import { Icon } from "../Icon";
import { Category } from "../../types/Category";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, triggerRef }) => {
  const { state, updateFilters, clearFilters } = useSearchFilter();
  const { data: categoriesData } = useGetCategoriesQuery();
  const popupRef = useRef<HTMLDivElement>(null);

  const [localFilters, setLocalFilters] = useState<FilterOptions>(state.filters);
  const [dueDateStart, setDueDateStart] = useState(state.filters.dueDateRange?.start || "");
  const [dueDateEnd, setDueDateEnd] = useState(state.filters.dueDateRange?.end || "");
  const [position, setPosition] = useState({ top: 0, left: 0, opacity: 0 });

  const categories = categoriesData?.payload?.categories || [];

  // Calculate position based on trigger element
  useEffect(() => {
    if (isOpen && triggerRef.current && popupRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();

      let top = triggerRect.bottom + 8; // 8px below the trigger
      let left = triggerRect.right - 320; // Align right edge with some offset (320px is popup width)

      // Ensure popup stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < 16) {
        left = 16; // Minimum 16px from left edge
      }
      if (left + 320 > viewportWidth) {
        left = viewportWidth - 320 - 16; // Minimum 16px from right edge
      }
      if (top + popupRect.height > viewportHeight) {
        top = triggerRect.top - popupRect.height - 8; // Show above if no space below
      }

      setPosition({ top, left, opacity: 1 });
    }
  }, [isOpen, triggerRef]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  // Sync with context state
  useEffect(() => {
    setLocalFilters(state.filters);
    setDueDateStart(state.filters.dueDateRange?.start || "");
    setDueDateEnd(state.filters.dueDateRange?.end || "");
  }, [state.filters]);

  // Update date range when dates change
  useEffect(() => {
    setLocalFilters((prev: FilterOptions) => ({
      ...prev,
      dueDateRange:
        dueDateStart || dueDateEnd
          ? {
              start: dueDateStart || undefined,
              end: dueDateEnd || undefined,
            }
          : undefined,
    }));
  }, [dueDateStart, dueDateEnd]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setLocalFilters((prev: FilterOptions) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter((id: string) => id !== categoryId),
    }));
  };

  const handlePriorityChange = (priority: Priority, checked: boolean) => {
    setLocalFilters((prev: FilterOptions) => ({
      ...prev,
      priorities: checked ? [...prev.priorities, priority] : prev.priorities.filter((p: Priority) => p !== priority),
    }));
  };

  const handleStatusChange = (status: TaskStatus, checked: boolean) => {
    setLocalFilters((prev: FilterOptions) => ({
      ...prev,
      statuses: checked ? [...prev.statuses, status] : prev.statuses.filter((s: TaskStatus) => s !== status),
    }));
  };

  const handleApply = () => {
    updateFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    clearFilters();
    setLocalFilters({
      categories: [],
      priorities: [],
      statuses: [],
      dueDateRange: undefined,
    });
    setDueDateStart("");
    setDueDateEnd("");
  };

  const priorityLabels = {
    [Priority.low]: "Low",
    [Priority.medium]: "Medium",
    [Priority.high]: "High",
  };

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="fixed z-[100] w-80 transition-opacity duration-200"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: position.opacity,
      }}
    >
      {/* Content */}
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-700 dark:text-gray-200">Filter Tasks</h3>
          <Icon
            name={Icons.close}
            onClick={onClose}
            className="text-lg text-slate-700 dark:text-gray-200 hover:text-slate-700 dark:hover:text-gray-200 transition-colors"
          />
        </div>

        <div className="space-y-6 max-h-96 overflow-y-auto p-0.5">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Categories</h4>
            <div className="space-y-2 pl-1.5">
              {categories.map((category: Category) => (
                <Checkbox
                  key={category._id}
                  name={`category-${category._id}`}
                  checked={localFilters.categories.includes(category._id)}
                  onChange={(e) => handleCategoryChange(category._id, e.target.checked)}
                  label={
                    <div className="ml-1 flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-1.5"
                        style={{ backgroundColor: category.categoryColorCode }}
                      />
                      <span>{category.name}</span>
                    </div>
                  }
                  checkboxSize={Size.sm}
                />
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Priority</h4>
            <div className="space-y-2 pl-1.5">
              {Object.values(Priority).map((priority) => (
                <Checkbox
                  key={priority}
                  name={`priority-${priority}`}
                  checked={localFilters.priorities.includes(priority)}
                  onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                  label={priorityLabels[priority]}
                  checkboxSize={Size.sm}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Status</h4>
            <div className="space-y-2 pl-1.5">
              {Object.values(TaskStatus).map((status) => (
                <Checkbox
                  key={status}
                  name={`status-${status}`}
                  checked={localFilters.statuses.includes(status)}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                  label={TaskStatusLabel[status]}
                  checkboxSize={Size.sm}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-gray-600">
          <Button
            type={ButtonType.outline}
            size={Size.sm}
            variant={ButtonVariant.secondary}
            onClick={handleClear}
            className="flex-1 text-sm"
          >
            Clear All
          </Button>
          <Button type={ButtonType.solid} size={Size.sm} onClick={handleApply} className="flex-1 text-sm">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
