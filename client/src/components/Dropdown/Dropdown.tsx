import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type DropdownProps = {
  name: string;
  label?: string;
  value?: string;
  errorMessage?: string;
  disabled?: boolean;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange?: (name: string, value: string) => void;
};

function Dropdown({ name, label, value, options, disabled = false, onChange }: DropdownProps) {
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
      <label className="block mb-1 ml-1 text-xs font-medium text-zinc-700">{label}</label>
      <button
        className="w-full flex items-center justify-between rounded-md border border-zinc-300 px-3 py-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
        onClick={() => {
          if (disabled) return;
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
      >
        <span className="text-sm font-light text-zinc-800">{value}</span>
        <Icon name={Icons.down} className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      {!disabled && isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-zinc-300 rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto m-2">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100 cursor-pointer`}
                onClick={() => {
                  onChange?.(name, option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
