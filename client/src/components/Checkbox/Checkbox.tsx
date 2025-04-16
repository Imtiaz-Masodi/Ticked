import React, { useCallback } from "react";
import { Size } from "../../utils/enums";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  checkboxSize?: Size;
};

const sizeStyles = Object.freeze({
  [Size.sm]: "size-4 text-sm rounded-sm",
  [Size.md]: "size-5 text-base rounded-sm",
  [Size.lg]: "size-6 text-lg rounded-md",
});

const Checkbox = ({ label, name, disabled, checkboxSize = Size.md, checked, onChange }: CheckboxProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(e);
    },
    [disabled, onChange]
  );

  return (
    <div className="flex flex-row justify-start items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        id={name}
        className={`
            appearance-none peer size-4 
            border border-gray-300 rounded-sm bg-transparent shrink-0 
            checked:bg-primary checked:border-none 
            disabled:border-gray-300 disabled:checked:bg-gray-300 disabled:cursor-not-allowed
            ${checkboxSize && sizeStyles[checkboxSize]}
        `}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <Icon
        name={Icons.check}
        className={`
            absolute hidden justify-center items-center size-4 text-white
            peer-checked:flex peer-checked:text-2xl pointer-events-none cursor-pointer
            ${checkboxSize && sizeStyles[checkboxSize]}
        `}
      />
      <label
        htmlFor={name}
        className={`
            cursor-pointer peer-disabled:text-gray-400 peer-disabled:cursor-not-allowed whitespace-nowrap
            text-zinc-700 ${checkboxSize && sizeStyles[checkboxSize]} size-auto
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
