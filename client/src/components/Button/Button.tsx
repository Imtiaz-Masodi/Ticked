import { Size } from "../../utils/enums";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { ButtonType } from "./Button.enum";
import PulseLoader from "../Loader/PulseLoader/PulseLoader";

type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
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

const typeStyles = Object.freeze({
  [ButtonType.solid]: `
    bg-primary hover:bg-primary-dark text-slate-100
    shadow-slate-500 hover:shadow-lg active:bg-primary
    disabled:bg-gray-400 disabled:text-gray-100 dark:disabled:bg-gray-600 dark:disabled:text-gray-400
  `,
  [ButtonType.outline]: `
    bg-transparent border border-primary text-primary
    shadow-slate-500 hover:shadow-lg hover:bg-primary
    hover:text-slate-100 active:bg-primary-dark active:border-primary-dark
    disabled:hover:bg-transparent disabled:text-gray-400 disabled:border-gray-300
    dark:disabled:text-gray-500 dark:disabled:border-gray-600
  `,
  [ButtonType.link]: `
    text-primary underline underline-offset-2 w-min px-0 py-0
    hover:text-primary-light hover:no-underline disabled:text-gray-400 disabled:hover:underline
    dark:disabled:text-gray-500
  `,
});

const Button = ({
  children,
  startIcon,
  endIcon,
  size = Size.md,
  type = ButtonType.solid,
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
        ${typeStyles[type]}
        ${iconOnly ? "ps-2 pe-2" : ""}
        ${isLoading ? "cursor-not-allowed" : ""}
        ${className}
      `}
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
