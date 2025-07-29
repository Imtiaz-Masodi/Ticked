import { useState, useEffect, useRef } from "react";
import { useCreateCategoryMutation } from "../../store/api/categoryApi";
import { useToast } from "../../hooks/useToast";
import { NotificationType } from "../Notification";
import Button from "../Button/Button";
import { ButtonType } from "../Button/Button.enum";
import { Icons } from "../Icon/IconMap";

interface CreateCategoryCardProps {
  onCancel: () => void;
  onSuccess: () => void;
}

function CreateCategoryCard({ onCancel, onSuccess }: CreateCategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3B82F6"); // Default blue color
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { showToast } = useToast();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const predefinedColors = [
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#6B7280", // Gray
  ];

  const handleSave = async () => {
    if (!categoryName.trim()) {
      showToast("Category name is required", {
        type: NotificationType.ERROR,
        title: "Validation Error",
      });
      return;
    }

    try {
      await createCategory({
        name: categoryName.trim(),
        categoryColorCode: categoryColor,
      }).unwrap();
      showToast("Category created successfully", {
        type: NotificationType.SUCCESS,
        title: "Success",
      });
      onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message ||
            "Failed to create category"
          : "Failed to create category";

      showToast(errorMessage, {
        type: NotificationType.ERROR,
        title: "Error",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div ref={cardRef} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-5 h-5 rounded-full flex-shrink-0 border-2 border-gray-300"
          style={{ backgroundColor: categoryColor }}
        />
        <div className="flex-grow">
          <input
            name="categoryName"
            value={categoryName}
            placeholder="Enter category name..."
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-xl font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none border-none"
            disabled={isLoading}
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <Button
            type={ButtonType.outline}
            startIcon={Icons.close}
            iconOnly={true}
            onClick={onCancel}
            disabled={isLoading}
            className="!p-2"
          />
          <Button
            type={ButtonType.solid}
            startIcon={Icons.check}
            iconOnly={true}
            onClick={handleSave}
            disabled={isLoading || !categoryName.trim()}
            className="!p-2"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="mx-1">
          <span className="text-sm font-medium text-zinc-700">
            Category Color
          </span>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  categoryColor === color
                    ? "border-gray-900 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setCategoryColor(color)}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-sm text-zinc-500">
            Enter a name and choose a color for your new category
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateCategoryCard;
