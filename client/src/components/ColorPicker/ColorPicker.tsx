interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  // Row 1: Blues
  "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB",
  // Row 2: Reds
  "#FECACA", "#FCA5A5", "#F87171", "#EF4444", "#DC2626",
  // Row 3: Greens
  "#A7F3D0", "#6EE7B7", "#34D399", "#10B981", "#059669",
  // Row 4: Yellows/Oranges
  "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706",
  // Row 5: Purples
  "#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED",
];

function ColorPicker({
  selectedColor,
  onColorChange,
  disabled = false,
  label = "Color",
  className = "",
}: ColorPickerProps) {
  return (
    <div className={`mx-1 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 block mb-2">
          {label}
        </span>
      )}
      <div className="grid grid-cols-5 gap-2">
        {DEFAULT_COLORS.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 inner-shadow-glossy ${
              selectedColor === color
                ? "ring-2 ring-gray-400 ring-offset-1"
                : "hover:scale-105"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            style={{ backgroundColor: color }}
            onClick={() => !disabled && onColorChange(color)}
            disabled={disabled}
            aria-label={`Select color ${color}`}
            title={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
