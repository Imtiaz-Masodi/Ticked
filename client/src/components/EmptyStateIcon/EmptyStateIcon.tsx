import { Icons } from "../Icon/IconMap";
import { Icon } from "../Icon";

interface EmptyStateIconProps {
  icon: Icons;
  iconClassName?: string;
  borderColor?: string;
  bgColor?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: {
    container: "w-16 h-16",
    inner: "w-8 h-8",
    icon: "text-sm",
  },
  md: {
    container: "w-20 h-20",
    inner: "w-10 h-10",
    icon: "text-md",
  },
  lg: {
    container: "w-24 h-24",
    inner: "w-12 h-12",
    icon: "text-lg",
  },
};

function EmptyStateIcon({
  icon,
  iconClassName = "text-zinc-400 dark:text-gray-500",
  borderColor = "border-zinc-300 dark:border-gray-600",
  bgColor = "bg-zinc-200 dark:bg-gray-700",
  size = "lg",
}: EmptyStateIconProps) {
  const styles = sizeStyles[size];

  return (
    <div className="relative">
      <div
        className={`${styles.container} rounded-full border-4 border-dashed ${borderColor} flex items-center justify-center`}
      >
        <div className={`${styles.inner} rounded-full ${bgColor} flex items-center justify-center`}>
          <Icon name={icon} className={`${styles.icon} ${iconClassName}`} />
        </div>
      </div>
    </div>
  );
}

export default EmptyStateIcon;
