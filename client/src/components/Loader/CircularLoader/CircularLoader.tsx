import { Size } from "../../../utils/enums";

interface CircularLoaderProps {
  size?: Size | "xs";
  className?: string;
}

const CircularLoader = ({ size = Size.md, className = "" }: CircularLoaderProps) => {
  const sizeClasses = {
    xs: "h-4 w-4 border",
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
        mx-auto 
        animate-spin
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    />
  );
};

export default CircularLoader;
