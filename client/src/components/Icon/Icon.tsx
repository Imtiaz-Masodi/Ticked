import { useMemo } from "react";
import { IconMap, Icons } from "./IconMap";

type IconProps = {
  name: Icons;
  disabled?: boolean;
  className?: string;
  darkMode?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Icon = ({ name, className = "", darkMode = false, disabled = false, onClick }: IconProps) => {
  const IconComponent = useMemo(() => IconMap[name], [name]);
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  };

  const getIconCssClasses = () => {
    const classNames = [];
    if (disabled) {
      classNames.push("text-zinc-400");
    } else if (darkMode) {
      classNames.push("text-zinc-100");
    } else {
      classNames.push("text-zinc-700");
    }

    if (onClick && disabled) {
      classNames.push("cursor-not-allowed");
    } else if (onClick) {
      classNames.push("cursor-pointer");
    }
    return classNames.join(" ");
  };

  return (
    <div className={`${getIconCssClasses()} ${className}`} onClick={handleOnClick}>
      <IconComponent />
    </div>
  );
};

export default Icon;
