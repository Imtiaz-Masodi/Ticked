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
  getLabel: (option: T) => string;
  onChange?: (name: string, value: T) => void;
};

function Dropdown<T>({ name, label, value, options, disabled = false, errorMessage, getLabel, onChange }: DropdownProps<T>) {
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
      <label className="block mb-1 ml-1 text-xs font-semibold text-zinc-600 dark:text-gray-300 select-none">{label}</label>
      <button
        className={`w-full flex items-center justify-between rounded-md border px-3 py-2 bg-white dark:bg-gray-700 focus-visible:outline-offset-2 focus-visible:outline-black/40 dark:focus-visible:outline-white/40 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${
          errorMessage 
            ? "border-red-700 dark:border-red-500" 
            : "border-zinc-300 dark:border-gray-600"
        }`}
        onClick={() => {
          if (disabled) return;
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
      >
        <span className="text-sm text-zinc-700 dark:text-gray-200 select-none">{value ? getLabel(value) : ""}</span>
        <Icon name={Icons.down} className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {!disabled && isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-zinc-300 dark:border-gray-600 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto m-2">
            {options.map((option: T) => (
              <li
                key={getLabel(option)}
                className={`px-3 py-2 text-sm text-zinc-800 dark:text-gray-200 hover:bg-zinc-100 dark:hover:bg-gray-600 cursor-pointer select-none`}
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
      {errorMessage && <div className="m-1 text-sm text-red-700 dark:text-red-400 select-none">{errorMessage}</div>}
    </div>
  );
}

export default Dropdown;
