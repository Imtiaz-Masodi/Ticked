import { useCallback } from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  errorMessage?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  maxLength?: number;
};

const TextArea = ({
  name,
  label,
  value = "",
  placeholder = "",
  className = "",
  disabled = false,
  errorMessage,
  labelProps = {},
  rows = 3,
  maxLength,
  onChange,
  ...rest
}: TextAreaProps) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          flex border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2.5 w-full
          focus-within:outline-2 focus-within:outline focus-within:outline-slate-400 dark:focus-within:outline-white/40 focus-within:-outline-offset-1
          focus-within:shadow-lg focus-within:shadow-slate-200/30 dark:focus-within:shadow-gray-900/20 text-slate-700 dark:text-gray-200 
          bg-slate-50/50 dark:bg-gray-700 backdrop-blur-sm transition-all duration-200
          hover:bg-slate-50 dark:hover:bg-gray-600/80 hover:border-slate-300 dark:hover:border-gray-500
          ${
            errorMessage
              ? "border-red-500 dark:border-red-500 focus-within:outline-red-400 dark:focus-within:outline-red-400 bg-red-50/30 dark:bg-red-900/10"
              : ""
          }
          ${disabled && "bg-slate-100 dark:bg-gray-600 opacity-60"}
        `}
      >
        <textarea
          name={name}
          value={value}
          className={`w-full bg-transparent text-slate-700 dark:text-gray-200 text-sm focus-visible:outline-none disabled:cursor-not-allowed dark:[color-scheme:dark] [color-scheme:light] placeholder:text-slate-400 dark:placeholder:text-gray-500 resize-none ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          onChange={handleOnChange}
          maxLength={maxLength}
          {...rest}
        />
      </div>
      {maxLength && (
        <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2 ${disabled ? "opacity-60" : ""}`}>
          {value?.toString().length || 0}/{maxLength} characters
        </p>
      )}
      {errorMessage && (
        <div className="mt-1 ml-1 text-sm text-red-600 dark:text-red-400 select-none">{errorMessage}</div>
      )}
    </div>
  );
};

export default TextArea;
