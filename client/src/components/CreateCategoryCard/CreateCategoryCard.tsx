import { useState, useEffect, useRef } from "react";
import { useCreateCategoryMutation } from "../../store/api/categoryApi";
import { useToast } from "../../hooks/useToast";
import { NotificationType } from "../Notification";
import Button from "../Button/Button";
import { ButtonType } from "../Button/Button.enum";
import { Icons } from "../Icon/IconMap";
import { ApiResponseStatus } from "../../utils/enums";
import { ColorPickerPopup } from "../ColorPickerPopup";

interface CreateCategoryCardProps {
  onCancel: () => void;
  onSuccess: () => void;
}

function CreateCategoryCard({ onCancel, onSuccess }: CreateCategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3B82F6"); // Default blue color
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { showToast } = useToast();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      showToast("Category name is required", {
        type: NotificationType.ERROR,
        title: "Validation Error",
      });
      return;
    }

    try {
      const response = await createCategory({ categoryName: categoryName.trim(), categoryColorCode: categoryColor }).unwrap();
      showToast(response.message, {
        type: response.status === ApiResponseStatus.success ? NotificationType.SUCCESS : NotificationType.ERROR,
        title: response.status === ApiResponseStatus.success ? "Success" : "Error",
      });
      if (response.status === ApiResponseStatus.success) onSuccess();
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

  const handleColorChange = (color: string) => {
    setCategoryColor(color);
    setIsColorPickerOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <button
            ref={colorButtonRef}
            className="w-5 h-5 rounded-full flex-shrink-0 border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
            style={{ backgroundColor: categoryColor }}
            onClick={() => setIsColorPickerOpen(true)}
            disabled={isLoading}
            aria-label="Choose category color"
            title="Click to choose color"
          />
          <ColorPickerPopup
            isOpen={isColorPickerOpen}
            onClose={() => setIsColorPickerOpen(false)}
            position="bottom"
            selectedColor={categoryColor}
            onColorChange={handleColorChange}
            disabled={isLoading}
            triggerRef={colorButtonRef}
            label=""
          />
        </div>
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
