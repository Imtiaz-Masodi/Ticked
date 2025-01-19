import { useState } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { InputTypes } from "./Input.enum";

type InputProps = {
  name: string;
  label: string;
  type?: InputTypes;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  onChange: () => void;
};

const Input = ({
  name,
  label,
  type = InputTypes.text,
  placeholder = "",
  className = "",
  disabled = false,
  errorMessage,
}: InputProps) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    if (disabled) return;
    setDisplayPassword(!displayPassword);
  };

  return (
    <div>
      <label className="block m-1 text-stone-700">{label}</label>
      <div
        className={`
          flex items-center border border-gray-300 rounded-sm px-2 py-1 w-full
          focus-within:outline-2 focus-within:outline focus-within:outline-primary-light focus-within:-outline-offset-1
          ${errorMessage ? "border-red-700 focus-visible:text-black" : ""}
          ${disabled && "bg-gray-200"}
        `}
      >
        <input
          name={name}
          className={`w-full bg-transparent focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed ${className}`}
          type={type === InputTypes.password ? (displayPassword ? InputTypes.text : InputTypes.password) : type}
          placeholder={placeholder}
          disabled={disabled}
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
      {errorMessage && <div className="m-1 text-sm text-red-700">{errorMessage}</div>}
    </div>
  );
};

export default Input;
