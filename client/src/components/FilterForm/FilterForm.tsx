import React, { useState, useEffect } from "react";
import { useSearchFilter, FilterOptions } from "../../hooks/useSearchFilter";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Priority, TaskStatus, TaskStatusLabel } from "../../utils/enums";
import { Button } from "../Button";
import { ButtonType } from "../Button/Button.enum";
import { Checkbox } from "../Checkbox";
import { Icons } from "../Icon/IconMap";
import { Category } from "../../types/Category";

interface FilterFormProps {
  onClose: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onClose }) => {
  const { state, updateFilters, clearFilters } = useSearchFilter();
  const { data: categoriesData } = useGetCategoriesQuery();

  const [localFilters, setLocalFilters] = useState<FilterOptions>(state.filters);
  const [dueDateStart, setDueDateStart] = useState(state.filters.dueDateRange?.start || "");
  const [dueDateEnd, setDueDateEnd] = useState(state.filters.dueDateRange?.end || "");

  const categories = categoriesData?.payload?.categories || [];

  useEffect(() => {
    setLocalFilters(state.filters);
    setDueDateStart(state.filters.dueDateRange?.start || "");
    setDueDateEnd(state.filters.dueDateRange?.end || "");
  }, [state.filters]);

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

  return (
    <div className="w-80 p-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-600 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-700 dark:text-gray-200">Filter Tasks</h3>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Categories</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {categories.map((category: Category) => (
              <div key={category._id} className="flex items-center">
                <Checkbox
                  label=""
                  name={`category-${category._id}`}
                  checked={localFilters.categories.includes(category._id)}
                  onChange={(e) => handleCategoryChange(category._id, e.target.checked)}
                />
                <div className="ml-2 flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.categoryColorCode }} />
                  <span className="text-sm text-slate-700 dark:text-gray-200">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Priority</h4>
          <div className="space-y-2">
            {Object.values(Priority).map((priority) => (
              <div key={priority} className="flex items-center">
                <Checkbox
                  label=""
                  name={`priority-${priority}`}
                  checked={localFilters.priorities.includes(priority)}
                  onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-gray-200">{priorityLabels[priority]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Status</h4>
          <div className="space-y-2">
            {Object.values(TaskStatus).map((status) => (
              <div key={status} className="flex items-center">
                <Checkbox
                  label=""
                  name={`status-${status}`}
                  checked={localFilters.statuses.includes(status)}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-gray-200">{TaskStatusLabel[status]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <h4 className="text-sm font-medium text-slate-600 dark:text-gray-300 mb-3">Due Date Range</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 dark:text-gray-400 mb-1">From</label>
              <input
                type="date"
                value={dueDateStart}
                onChange={(e) => setDueDateStart(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-gray-400 mb-1">To</label>
              <input
                type="date"
                value={dueDateEnd}
                onChange={(e) => setDueDateEnd(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-gray-600">
        <Button type={ButtonType.outline} onClick={handleClear} className="flex-1 text-sm">
          Clear All
        </Button>
        <Button type={ButtonType.solid} startIcon={Icons.check} onClick={handleApply} className="flex-1 text-sm">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;
