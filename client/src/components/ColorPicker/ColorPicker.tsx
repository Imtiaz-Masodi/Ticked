interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  // Row 1: Gray
  "#E5E7EB", "#D1D5DB", "#6B7280", "#4B5563", "#374151",
  // Row 3: Pink
  "#FBCFE8", "#F9A8D4", "#EC4899", "#DB2777", "#BE185D",
  // Row 4: Rose
  "#FECDD3", "#FDA4AF", "#F43F5E", "#E11D48", "#BE123C",
  // Row 2: Red
  "#FECACA", "#FCA5A5", "#EF4444", "#DC2626", "#B91C1C",
  // Row 5: Orange
  "#FED7AA", "#FDBA74", "#F97316", "#EA580C", "#C2410C",
  // Row 6: Amber
  "#FDE68A", "#FCD34D", "#F59E0B", "#D97706", "#B45309",
  // Row 7: Yellow
  "#FEF08A", "#FEE047", "#EAB308", "#CA8A04", "#A16207",
  // Row 8: Lime
  "#D9F99D", "#BEF264", "#65A30D", "#57A310", "#4D7C0F",
  // Row 9: Green
  "#BBF7D0", "#86EFAC", "#22C55E", "#16A34A", "#15803D",
  // Row 10: Emerald
  "#A7F3D0", "#6EE7B7", "#10B981", "#059669", "#047857",
  // Row 11: Teal
  "#99F6E4", "#5EEAD4", "#14B8A6", "#0D9488", "#0F766E",
  // Row 12: Cyan
  "#A5F3FC", "#67E8F9", "#06B6D4", "#0891B2", "#0E7490",
  // Row 13: Sky
  "#BAE6FD", "#7DD3FC", "#0EA5E9", "#0284C7", "#0369A1",
  // Row 14: Blue
  "#BFDBFE", "#93C5FD", "#3B82F6", "#2563EB", "#1D4ED8",
  // Row 15: Indigo
  "#C7D2FE", "#A5B4FC", "#6366F1", "#4F46E5", "#4338CA",
  // Row 16: Violet
  "#DDD6FE", "#C4B5FD", "#8B5CF6", "#7C3AED", "#6D28D9",
  // Row 17: Purple
  "#E9D5FF", "#D8B4FE", "#A855F7", "#9333EA", "#581C87",
  // Row 18: Fuchsia
  "#F5D0FE", "#F0ABFC", "#D946EF", "#C026D3", "#A21CAF",
];

function ColorPicker({
  selectedColor,
  onColorChange,
  disabled = false,
  label = "Color",
  className = "",
}: ColorPickerProps) {
  return (
    <div className={`p-4 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-gray-200 block mb-2 select-none">
          {label}
        </span>
      )}
      <div className="grid grid-cols-5 gap-1.5 max-h-40 overflow-y-auto overscroll-contain scrollbar-hide">
        {DEFAULT_COLORS.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800 inner-shadow-glossy ${
              selectedColor === color
                ? "ring-2 ring-gray-400 dark:ring-gray-500 ring-offset-1 dark:ring-offset-gray-800"
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
