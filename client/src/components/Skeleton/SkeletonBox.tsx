interface SkeletonBoxProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

function SkeletonBox({
  width = "w-full",
  height = "h-4",
  className = "",
  rounded = "md",
}: SkeletonBoxProps) {
  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${roundedClass[rounded]} ${width} ${height} ${className}`}
    />
  );
}

export default SkeletonBox;
