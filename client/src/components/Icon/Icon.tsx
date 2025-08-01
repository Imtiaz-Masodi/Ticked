import { useMemo } from "react";
import { IconMap, Icons } from "./IconMap";

type IconProps = {
  name: Icons;
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Icon = ({ name, className = "", disabled = false, onClick }: IconProps) => {
  const IconComponent = useMemo(() => IconMap[name], [name]);
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  return (
    <div
      className={`${disabled && "text-zinc-400 dark:text-gray-500"} ${Boolean(onClick) && "cursor-pointer"} ${className}`}
      onClick={handleOnClick}
    >
      <IconComponent />
    </div>
  );
};

export default Icon;
