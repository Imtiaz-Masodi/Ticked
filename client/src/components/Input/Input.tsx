import { useCallback, useState } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { InputTypes } from "./Input.enum";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
};

const Input = ({
  name,
  label,
  value = "",
  type = InputTypes.text,
  placeholder = "",
  className = "",
  disabled = false,
  errorMessage,
  labelProps = {},
  onChange,
  onKeyDown,
  ...rest
}: InputProps) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    if (disabled) return;
    setDisplayPassword(!displayPassword);
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(e);
    },
    [disabled, onChange]
  );

  return (
    <div className="flex-grow">
      {label && (
        <label className={`block mb-1 ml-1 text-xs font-semibold text-zinc-600 dark:text-gray-300`} {...labelProps}>
          {label}
        </label>
      )}
      <div
        className={`
          flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 w-full
          focus-within:outline-2 focus-within:outline focus-within:outline-black/40 dark:focus-within:outline-white/40 focus-within:-outline-offset-1
          focus-within:shadow-md text-zinc-800 dark:text-gray-200 bg-white dark:bg-gray-700
          ${errorMessage ? "border-red-700 dark:border-red-500 focus-visible:text-black dark:focus-visible:text-white" : ""}
          ${disabled && "bg-gray-200 dark:bg-gray-600"}
        `}
      >
        <input
          name={name}
          value={value}
          className={`w-full bg-transparent text-zinc-700 dark:text-gray-200 text-sm focus-visible:outline-none disabled:cursor-not-allowed dark:[color-scheme:dark] [color-scheme:light] ${className}`}
          type={type === InputTypes.password ? (displayPassword ? InputTypes.text : InputTypes.password) : type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleOnChange}
          onKeyDown={onKeyDown}
          {...rest}
        />
        {type === InputTypes.password && (
          <div
            className={`cursor-pointer ${disabled && "hover:cursor-not-allowed"}`}
            onClick={handleTogglePasswordVisibility}
          >
            <Icon name={displayPassword ? Icons.hidden : Icons.visible} disabled={disabled} />
          </div>
        )}
      </div>
      {errorMessage && <div className="m-1 text-sm text-red-700 dark:text-red-400">{errorMessage}</div>}
    </div>
  );
};

export default Input;
