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
        <label
          className={`block mb-2 ml-1 text-sm font-medium text-slate-700 dark:text-gray-300 select-none`}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div
        className={`
          flex items-center border rounded-lg w-full
          focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1
          focus-within:shadow-lg focus-within:shadow-slate-200/30 dark:focus-within:shadow-gray-900/20 text-slate-700 dark:text-gray-200 
          bg-slate-50/50 dark:bg-gray-700 backdrop-blur-sm transition-all duration-200
          hover:bg-slate-50 dark:hover:bg-gray-600/80
          ${
            errorMessage
              ? "border-red-500 dark:border-red-500 focus-within:outline-red-400 dark:focus-within:outline-red-400 bg-red-50/30 dark:bg-red-900/10"
              : "border-slate-200 dark:border-gray-600 focus-within:outline-slate-400 dark:focus-within:outline-white/40 hover:border-slate-300 dark:hover:border-gray-500"
          }
          ${disabled && "bg-slate-100 dark:bg-gray-600 opacity-60"}
        `}
      >
        <input
          name={name}
          value={value}
          className={`w-full bg-transparent px-3 py-2.5 rounded-lg text-slate-700 dark:text-gray-200 text-sm focus-visible:outline-none disabled:cursor-not-allowed dark:[color-scheme:dark] [color-scheme:light] placeholder:text-slate-400 dark:placeholder:text-gray-500 ${className}`}
          type={type === InputTypes.password ? (displayPassword ? InputTypes.text : InputTypes.password) : type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleOnChange}
          onKeyDown={onKeyDown}
          {...rest}
        />
        {type === InputTypes.password && (
          <div
            className={`cursor-pointer pr-3 ${disabled && "hover:cursor-not-allowed"}`}
            onClick={handleTogglePasswordVisibility}
          >
            <Icon name={displayPassword ? Icons.hidden : Icons.visible} disabled={disabled} />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="mt-1 ml-1 text-sm text-red-600 dark:text-red-400 select-none">{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
