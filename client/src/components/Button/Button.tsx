import { Size } from "../../utils/enums";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { ButtonType, ButtonVariant } from "./Button.enum";
import PulseLoader from "../Loader/PulseLoader/PulseLoader";

type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  size?: Size;
  disabled?: boolean;
  startIcon?: Icons;
  endIcon?: Icons;
  iconOnly?: boolean;
  className?: string;
  isLoading?: boolean;
};

const sizeStyles = Object.freeze({
  [Size.sm]: "px-4 py-2 rounded-sm text-sm",
  [Size.md]: "px-8 py-2 rounded-md text-base",
  [Size.lg]: "px-16 py-3 rounded-md text-lg",
});

// Base type styles
const baseTypeStyles = Object.freeze({
  [ButtonType.solid]: "shadow-slate-500 hover:shadow-lg",
  [ButtonType.outline]: "bg-transparent border shadow-slate-500 hover:shadow-lg",
  [ButtonType.link]: "underline underline-offset-2 w-min px-0 py-0 hover:no-underline",
});

// Variant color styles
const variantColorStyles = Object.freeze({
  [ButtonVariant.primary]: {
    solid: "bg-primary hover:bg-primary-dark text-slate-100 active:bg-primary",
    outline: "border-primary text-primary hover:bg-primary hover:text-slate-100 active:bg-primary-dark active:border-primary-dark",
    link: "text-primary hover:text-primary-light",
  },
  [ButtonVariant.secondary]: {
    solid: "bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-500",
    outline: "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 active:border-gray-600",
    link: "text-gray-500 hover:text-gray-600",
  },
  [ButtonVariant.success]: {
    solid: "bg-emerald-600 hover:bg-emerald-700 text-white active:bg-emerald-600",
    outline: "border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white active:bg-emerald-700 active:border-emerald-700",
    link: "text-emerald-600 hover:text-emerald-700",
  },
  [ButtonVariant.danger]: {
    solid: "bg-rose-600 hover:bg-rose-700 text-white active:bg-rose-600",
    outline: "border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white active:bg-rose-700 active:border-rose-700",
    link: "text-rose-600 hover:text-rose-700",
  },
  [ButtonVariant.warning]: {
    solid: "bg-yellow-500 hover:bg-yellow-600 text-white active:bg-yellow-500",
    outline: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white active:bg-yellow-600 active:border-yellow-600",
    link: "text-yellow-500 hover:text-yellow-600",
  },
  [ButtonVariant.info]: {
    solid: "bg-sky-600 hover:bg-sky-700 text-white active:bg-sky-600",
    outline: "border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white active:bg-sky-700 active:border-sky-700",
    link: "text-sky-600 hover:text-sky-700",
  },
});

// Disabled styles
const disabledStyles = Object.freeze({
  [ButtonType.solid]: "disabled:bg-gray-400 disabled:text-gray-100 dark:disabled:bg-gray-600 dark:disabled:text-gray-400",
  [ButtonType.outline]: "disabled:hover:bg-transparent disabled:text-gray-400 disabled:border-gray-300 dark:disabled:text-gray-500 dark:disabled:border-gray-600",
  [ButtonType.link]: "disabled:text-gray-400 disabled:hover:underline dark:disabled:text-gray-500",
});

// Helper function to get combined styles
const getButtonStyles = (variant: ButtonVariant, type: ButtonType): string => {
  const baseStyles = baseTypeStyles[type];
  const variantStyles = variantColorStyles[variant][type];
  const disabledStyle = disabledStyles[type];
  
  return `${baseStyles} ${variantStyles} ${disabledStyle}`;
};

const Button = ({
  children,
  startIcon,
  endIcon,
  size = Size.md,
  type = ButtonType.solid,
  variant = ButtonVariant.primary,
  disabled = false,
  iconOnly = false,
  isLoading = false,
  className,
  onClick,
}: ButtonProps) => {
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick();
  };

  return (
    <button
      className={`
        transition-all flex justify-center items-center gap-2 text-nowrap select-none
        disabled:hover:shadow-none disabled:cursor-not-allowed
        ${sizeStyles[size]}
        ${getButtonStyles(variant, type)}
        ${iconOnly ? "ps-2 pe-2" : ""}
        ${isLoading ? "cursor-not-allowed" : ""}
        ${className}
      `}
      type="button"
      onClick={handleOnClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="py-2">
          <PulseLoader />
        </div>
      ) : (
        <>
          {startIcon && <Icon name={startIcon} disabled={disabled} />}
          {children}
          {endIcon && <Icon name={endIcon} disabled={disabled} />}
        </>
      )}
    </button>
  );
};

export default Button;
