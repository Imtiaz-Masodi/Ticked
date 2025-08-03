import { Size } from "../../../utils/enums";

interface CircularLoaderProps {
  size?: Size;
  className?: string;
}

const CircularLoader = ({ size = Size.md, className = "" }: CircularLoaderProps) => {
  const sizeClasses = {
    [Size.sm]: "h-6 w-6 border-2",
    [Size.md]: "h-8 w-8 border-4",
    [Size.lg]: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        aspect-square 
        rounded-full 
        border-t-[currentColor] 
        m-auto 
        animate-spin
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    />
  );
};

export default CircularLoader;
