import { Size } from "../../utils/enums";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type CheckboxProps = {
  label: string;
  name: string;
  size?: Size;
  disabled?: boolean;
};

const sizeStyles = Object.freeze({
  [Size.sm]: "size-4 text-sm rounded-sm",
  [Size.md]: "size-5 text-base rounded-sm",
  [Size.lg]: "size-6 text-lg rounded-md",
});

const Checkbox = ({ label, name, disabled, size }: CheckboxProps) => {
  return (
    <div className="flex flex-row justify-start items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        id={name}
        className={`
            appearance-none peer size-4 
            border border-primary rounded-sm bg-white shrink-0 
            checked:bg-primary checked:border-none 
            disabled:border-gray-300 disabled:checked:bg-gray-300 disabled:cursor-not-allowed
            ${size && sizeStyles[size]}
        `}
        disabled={disabled}
      />
      <Icon
        name={Icons.check}
        className={`
            absolute hidden justify-center items-center size-4 text-white
            peer-checked:flex peer-checked:text-2xl pointer-events-none cursor-pointer
            ${size && sizeStyles[size]}
        `}
      />
      <label
        htmlFor={name}
        className={`
            cursor-pointer peer-disabled:text-gray-400 peer-disabled:cursor-not-allowed whitespace-nowrap
            ${size && sizeStyles[size]} size-auto
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
