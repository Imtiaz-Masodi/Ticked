import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type DropdownProps<T> = {
  name: string;
  label?: string;
  value?: T;
  errorMessage?: string;
  disabled?: boolean;
  options: ReadonlyArray<T>;
  getLabel: (option: T) => string | React.ReactNode;
  getLabelKey?: (option: T) => string;
  onChange?: (name: string, value: T) => void;
};

function Dropdown<T>({ name, label, value, options, disabled = false, errorMessage, getLabel, getLabelKey, onChange }: DropdownProps<T>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block mb-2 ml-1 text-sm font-medium text-slate-700 dark:text-gray-300 select-none">{label}</label>
      <button
        className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 
          bg-slate-50/50 dark:bg-gray-700 backdrop-blur-sm transition-all duration-200
          hover:bg-slate-50 dark:hover:bg-gray-600/80 hover:border-slate-300 dark:hover:border-gray-500
          focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:focus-visible:outline-white/40 
          disabled:bg-slate-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-60 ${
          errorMessage 
            ? "border-red-500 dark:border-red-500 bg-red-50/30 dark:bg-red-900/10" 
            : "border-slate-200 dark:border-gray-600"
        }`}
        onClick={() => {
          if (disabled) return;
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
      >
        <span className="text-sm text-slate-700 dark:text-gray-200 select-none">{value ? getLabel(value) : ""}</span>
        <Icon name={Icons.down} className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {!disabled && isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm border border-slate-200 dark:border-gray-600 rounded-lg shadow-xl shadow-slate-200/30 dark:shadow-gray-900/30">
          <ul className="max-h-60 overflow-auto m-2">
            {options.map((option: T) => (
              <li
                key={getLabelKey ? getLabelKey(option) : getLabel(option) as string}
                className={`px-3 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-600 cursor-pointer select-none rounded-md transition-colors`}
                onClick={() => {
                  onChange?.(name, option);
                  setIsOpen(false);
                }}
              >
                {getLabel(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {errorMessage && <div className="mt-1 ml-1 text-sm text-red-600 dark:text-red-400 select-none">{errorMessage}</div>}
    </div>
  );
}

export default Dropdown;
