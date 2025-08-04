import React from "react";
import { Size } from "../../utils/enums";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: Size;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

const sizeStyles = {
  [Size.sm]: {
    track: "h-5 w-9",
    thumb: "h-3 w-3",
    translate: "translate-x-5",
  },
  [Size.md]: {
    track: "h-6 w-11",
    thumb: "h-4 w-4",
    translate: "translate-x-6",
  },
  [Size.lg]: {
    track: "h-7 w-12",
    thumb: "h-5 w-5",
    translate: "translate-x-6",
  },
};

const variantStyles = {
  primary: {
    checked: "bg-blue-600",
    unchecked: "bg-gray-200 dark:bg-gray-700",
  },
  secondary: {
    checked: "bg-gray-600",
    unchecked: "bg-gray-200 dark:bg-gray-700",
  },
  success: {
    checked: "bg-green-600",
    unchecked: "bg-gray-200 dark:bg-gray-700",
  },
  warning: {
    checked: "bg-yellow-500",
    unchecked: "bg-gray-200 dark:bg-gray-700",
  },
  danger: {
    checked: "bg-red-600",
    unchecked: "bg-gray-200 dark:bg-gray-700",
  },
};

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  size = Size.md,
  variant = "primary",
  className = "",
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const styles = sizeStyles[size];
  const colors = variantStyles[variant];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
        ${styles.track}
        ${checked ? colors.checked : colors.unchecked}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <span
        className={`
          inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
          ${styles.thumb}
          ${checked ? styles.translate : "translate-x-1"}
        `}
      />
    </button>
  );
};

export default Toggle;
