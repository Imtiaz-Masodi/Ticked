interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-md",
};

function Badge({
  children,
  variant = "primary",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
