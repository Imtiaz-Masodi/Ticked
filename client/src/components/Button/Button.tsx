import { Size } from "../../utils/enums";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { ButtonType } from "./Button.enum";

type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
  size?: Size;
  disabled?: boolean;
  startIcon?: keyof typeof Icons;
  endIcon?: keyof typeof Icons;
  iconOnly?: boolean;
  className?: string;
};

const sizeStyles = Object.freeze({
  [Size.sm]: "px-4 py-2 rounded-sm text-sm",
  [Size.md]: "px-8 py-2 rounded-sm text-base",
  [Size.lg]: "px-16 py-3 rounded-sm text-lg",
});

const typeStyles = Object.freeze({
  [ButtonType.solid]: `
    bg-primary hover:bg-primary-dark text-slate-100
    shadow-slate-500 hover:shadow-lg active:bg-primary
    disabled:bg-gray-400 disabled:text-gray-100
  `,
  [ButtonType.outline]: `
    bg-transparent border border-primary text-primary
    shadow-slate-500 hover:shadow-lg hover:bg-primary
    hover:text-slate-100 active:bg-primary-dark active:border-primary-dark
    disabled:hover:bg-transparent disabled:text-gray-400 disabled:border-gray-300
  `,
  [ButtonType.link]: `
    text-primary underline underline-offset-2 w-min px-0 py-0
    hover:text-primary-light hover:no-underline disabled:text-gray-400 disabled:hover:underline
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
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`
        transition-all flex justify-center items-center gap-2 text-nowrap
        disabled:hover:shadow-none disabled:cursor-not-allowed
        ${sizeStyles[size]} ${typeStyles[type]} ${iconOnly && "ps-2 pe-2"} ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <Icon name={startIcon} disabled={disabled} />}
      {children}
      {endIcon && <Icon name={endIcon} disabled={disabled} />}
    </button>
  );
};

export default Button;
